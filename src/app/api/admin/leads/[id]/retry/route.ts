import { NextResponse, type NextRequest } from 'next/server'
import { createTransport } from 'nodemailer'
import config from '@/payload.config'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

function text(value: unknown, max = 1000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || !['admin', 'manager'].includes(String(user.role))) return NextResponse.json({ error: 'Недостаточно прав.' }, { status: 403 })

  const { id } = await context.params
  const lead = await payload.findByID({ collection: 'leads', id, overrideAccess: true })
  if (lead.notificationStatus === 'sent') return NextResponse.json({ error: 'Уведомление уже отправлено.' }, { status: 409 })
  if (lead.notificationStatus === 'sending') return NextResponse.json({ error: 'Уведомление уже отправляется.' }, { status: 409 })
  const attempts = Number(lead.notificationAttempts || 0)
  if (attempts >= 4) return NextResponse.json({ error: 'Достигнут лимит повторных попыток. Проверьте SMTP и обратитесь к администратору.' }, { status: 429 })

  const settings = await payload.findGlobal({ slug: 'email-settings', overrideAccess: true })
  const recipient = text(settings.recipientEmail, 200)
  const host = text(process.env.SMTP_HOST, 200)
  const from = text(process.env.SMTP_FROM, 200) || text(process.env.SMTP_USER, 200)
  const password = process.env.SMTP_PASSWORD || ''
  const userName = text(process.env.SMTP_USER, 200)
  if (!recipient || !host || !from) return NextResponse.json({ error: 'Почта не настроена. Проверьте адрес получателя и SMTP в локальной конфигурации.' }, { status: 400 })

  await payload.update({ collection: 'leads', id, overrideAccess: true, data: { notificationStatus: 'sending' } })
  const leadData = lead as unknown as Record<string, unknown>
  const serviceNames: Record<string, string> = { warehouse: 'Складской терминал', container: 'Контейнерный терминал', transport: 'Автоперевозки' }
  const services = Array.isArray(lead.services) ? lead.services.map((item) => serviceNames[String(item)] || String(item)).join(', ') : ''
  const rows: [string, unknown][] = [
    ['Номер заявки', lead.id], ['Создана', lead.createdAt], ['Направления', services], ['Имя', lead.name],
    ['Компания', lead.company], ['Телефон', lead.phone], ['Email', lead.email], ['Операция на складе', leadData.warehouseOperation],
    ['Срок хранения', lead.storagePeriod], ['Операция с контейнером', leadData.containerOperation], ['Тип контейнера', lead.containerType],
    ['Количество контейнеров', leadData.containerQuantity], ['Откуда', lead.origin], ['Куда', lead.destination], ['Тип груза', lead.cargoType],
    ['Вес / объём / габариты', leadData.cargoDimensions], ['Температурные условия', lead.temperature], ['Желаемая дата', lead.desiredDate],
    ['Комментарий', lead.description], ['Страница', lead.sourcePage],
  ]
  const textBody = rows.filter(([, value]) => value !== null && value !== undefined && value !== '').map(([label, value]) => `${label}: ${String(value)}`).join('\n')

  try {
    const port = Number(process.env.SMTP_PORT || 587)
    const transporter = createTransport({ host, port: Number.isFinite(port) ? port : 587, secure: process.env.SMTP_SECURE === 'true', ...(userName || password ? { auth: { user: userName, pass: password } } : {}) })
    await transporter.sendMail({ from, to: recipient, replyTo: text(lead.email, 180) || undefined, subject: `Повтор: заявка ГЕРА №${lead.id} — ${services}`, text: textBody })
    await payload.update({ collection: 'leads', id, overrideAccess: true, data: { notificationStatus: 'sent', notificationAttempts: attempts + 1, notificationError: '' } })
    return NextResponse.json({ ok: true, message: 'Уведомление отправлено.' })
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 1000) : 'Ошибка отправки.'
    await payload.update({ collection: 'leads', id, overrideAccess: true, data: { notificationStatus: 'failed', notificationAttempts: attempts + 1, notificationError: message } })
    return NextResponse.json({ error: `Не удалось отправить email: ${message}` }, { status: 502 })
  }
}
