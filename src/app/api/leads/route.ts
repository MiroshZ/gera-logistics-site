import { NextResponse, type NextRequest } from 'next/server'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { createTransport } from 'nodemailer'
import { randomUUID } from 'node:crypto'
import { CONSENT_VERSION } from '@/lib/legal'

export const runtime = 'nodejs'

const allowedServices = ['warehouse', 'container', 'transport'] as const
type LeadService = (typeof allowedServices)[number]
const allowedServiceSet: ReadonlySet<string> = new Set(allowedServices)
const attemptsByClient = new Map<string, { times: number[]; cleanup: ReturnType<typeof setTimeout> }>()
const limitWindowMs = 10 * 60 * 1000
const maxAttempts = 5

function text(value: unknown, max = 300): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function limitClient(client: string, now: number): boolean {
  const previous = attemptsByClient.get(client)
  if (previous) clearTimeout(previous.cleanup)
  const recent = (previous?.times || []).filter((time) => now - time < limitWindowMs)
  const cleanup = setTimeout(() => attemptsByClient.delete(client), limitWindowMs)
  cleanup.unref()
  if (recent.length >= maxAttempts) {
    attemptsByClient.set(client, { times: recent, cleanup })
    return false
  }
  recent.push(now)
  attemptsByClient.set(client, { times: recent, cleanup })
  return true
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  const requestHost = request.headers.get('host')
  if (origin && requestHost) {
    try {
      if (new URL(origin).host !== requestHost) return NextResponse.json({ error: 'Не удалось проверить отправителя запроса.' }, { status: 403 })
    } catch {
      return NextResponse.json({ error: 'Некорректный источник запроса.' }, { status: 403 })
    }
  }

  const client = (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || 'local-client'
  if (!limitClient(client, Date.now())) return NextResponse.json({ error: 'Слишком много попыток. Попробуйте позже.' }, { status: 429 })

  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Проверьте заполнение формы.' }, { status: 400 })
  }

  // Honeypot: return a generic success for automated submissions without storing them.
  if (text(body.website, 200)) return NextResponse.json({ ok: true, notificationStatus: 'not-configured' }, { status: 201 })

  const name = text(body.name, 100)
  const company = text(body.company, 140)
  const phone = text(body.phone, 40)
  const email = text(body.email, 180).toLowerCase()
  const description = text(body.description, 3000)
  const submissionId = text(body.submissionId, 64)
  const services: LeadService[] = Array.isArray(body.services)
    ? [...new Set(body.services.filter((value): value is LeadService => typeof value === 'string' && allowedServiceSet.has(value)))]
    : []

  if (!name || services.length === 0 || !description || description.length < 8 || body.consentAccepted !== 'true' || !/^[\da-f-]{36}$/i.test(submissionId)) {
    return NextResponse.json({ error: 'Заполните обязательные поля и выберите направление.' }, { status: 400 })
  }

  const payload = await getPayload({ config: await config })
  const existing = await payload.find({ collection: 'leads', where: { submissionId: { equals: submissionId } }, limit: 1, overrideAccess: true })
  if (existing.docs[0]) {
    const duplicate = existing.docs[0]
    return NextResponse.json({ ok: true, id: duplicate.id, reference: String(duplicate.id), notificationStatus: duplicate.notificationStatus }, { status: 200 })
  }
  if ((!phone && !email) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json({ error: 'Укажите корректный телефон или email для ответа.' }, { status: 400 })
  }

  const lead = await payload.create({
    collection: 'leads',
    overrideAccess: true,
    data: {
      name,
      submissionId: submissionId || randomUUID(),
      company,
      phone,
      email,
      services,
      warehouseOperation: text(body.warehouseOperation),
      storagePeriod: text(body.storagePeriod, 100),
      containerOperation: text(body.containerOperation),
      containerType: text(body.containerType, 100),
      containerStatus: text(body.containerStatus, 40),
      containerQuantity: text(body.containerQuantity, 30),
      origin: text(body.origin, 160),
      destination: text(body.destination, 160),
      cargoType: text(body.cargoType, 160),
      cargoDimensions: text(body.cargoDimensions, 120),
      temperature: text(body.temperature, 100),
      desiredDate: text(body.desiredDate, 80),
      description,
      consentAccepted: true,
      consentVersion: CONSENT_VERSION,
      sourcePage: text(body.sourcePage, 180) || '/ru/contacts',
      locale: 'ru',
      notificationStatus: 'pending',
      notificationAttempts: 0,
    },
  })

  const smtpHost = text(process.env.SMTP_HOST, 200)
  const smtpUser = text(process.env.SMTP_USER, 200)
  const smtpPassword = process.env.SMTP_PASSWORD || ''
  const from = text(process.env.SMTP_FROM, 200) || smtpUser
  let recipient = ''
  try {
    const settings = await payload.findGlobal({ slug: 'email-settings', overrideAccess: true })
    recipient = text(settings.recipientEmail, 200)
  } catch {
    // Email settings are optional while the site is being prepared locally.
  }

  if (!smtpHost || !from || !recipient) {
    await payload.update({ collection: 'leads', id: lead.id, overrideAccess: true, data: { notificationStatus: 'not-configured' } })
    return NextResponse.json({ ok: true, id: lead.id, reference: String(lead.id), notificationStatus: 'not-configured' }, { status: 201 })
  }

  const serviceNames: Record<string, string> = { warehouse: 'Складской терминал', container: 'Контейнерный терминал', transport: 'Автоперевозки' }
  const details = [
    ['Имя', name], ['Компания', company], ['Телефон', phone], ['Email', email],
    ['Направления', services.map((service) => serviceNames[service]).join(', ')],
    ['Операция на складе', text(body.warehouseOperation)], ['Срок хранения', text(body.storagePeriod, 100)],
    ['Операция с контейнером', text(body.containerOperation)], ['Тип контейнера', text(body.containerType, 100)],
    ['Количество контейнеров', text(body.containerQuantity, 30)], ['Маршрут', [text(body.origin, 160), text(body.destination, 160)].filter(Boolean).join(' → ')],
    ['Тип груза', text(body.cargoType, 160)], ['Вес / объём / габариты', text(body.cargoDimensions, 120)],
    ['Температурные условия', text(body.temperature, 100)], ['Желаемая дата', text(body.desiredDate, 80)],
    ['Комментарий', description], ['Страница', text(body.sourcePage, 180)],
  ].filter(([, value]) => Boolean(value))

  try {
    const port = Number(process.env.SMTP_PORT || 587)
    const transporter = createTransport({
      host: smtpHost,
      port: Number.isFinite(port) ? port : 587,
      secure: process.env.SMTP_SECURE === 'true',
      ...(smtpUser || smtpPassword ? { auth: { user: smtpUser, pass: smtpPassword } } : {}),
    })
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: email || undefined,
      subject: `Заявка с сайта ГЕРА №${lead.id} — ${services.map((service) => serviceNames[service]).join(', ')}`,
      text: details.map(([label, value]) => `${label}: ${value}`).join('\n'),
    })
    await payload.update({ collection: 'leads', id: lead.id, overrideAccess: true, data: { notificationStatus: 'sent', notificationAttempts: 1, notificationError: '' } })
    return NextResponse.json({ ok: true, id: lead.id, reference: String(lead.id), notificationStatus: 'sent' }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 1000) : 'Неизвестная ошибка отправки email.'
    await payload.update({ collection: 'leads', id: lead.id, overrideAccess: true, data: { notificationStatus: 'failed', notificationAttempts: 1, notificationError: message } })
    return NextResponse.json({ ok: true, id: lead.id, reference: String(lead.id), notificationStatus: 'failed' }, { status: 201 })
  }
}
