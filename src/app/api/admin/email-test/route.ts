import { NextResponse, type NextRequest } from 'next/server'
import { createTransport } from 'nodemailer'
import config from '@/payload.config'
import { getPayload } from 'payload'

export const runtime = 'nodejs'

function text(value: unknown, max = 200): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config: await config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Войдите в админ-панель с ролью администратора.' }, { status: 401 })

  let recipient = ''
  try {
    const settings = await payload.findGlobal({ slug: 'email-settings', overrideAccess: true })
    recipient = text(settings.recipientEmail)
  } catch {
    return NextResponse.json({ error: 'Сначала укажите email получателя в админ-панели.' }, { status: 400 })
  }

  const smtpHost = text(process.env.SMTP_HOST)
  const smtpUser = text(process.env.SMTP_USER)
  const from = text(process.env.SMTP_FROM) || smtpUser
  const smtpPassword = process.env.SMTP_PASSWORD || ''
  if (!smtpHost || !from || !recipient) {
    return NextResponse.json({ error: 'Заполните SMTP_HOST, SMTP_FROM и email получателя. Перезапустите локальный сервер после изменения .env.' }, { status: 400 })
  }

  const testedAt = new Date().toISOString()
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
      subject: 'Проверка email-уведомлений сайта ГЕРА',
      text: `Тестовое письмо отправлено из локальной админ-панели сайта ГЕРА.\nВремя: ${testedAt}`,
    })
    await payload.updateGlobal({ slug: 'email-settings', overrideAccess: true, data: { lastTestedAt: testedAt, lastTestStatus: 'Успешно' } })
    return NextResponse.json({ ok: true, message: `Тестовое письмо отправлено на ${recipient}.` })
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 400) : 'Ошибка отправки.'
    await payload.updateGlobal({ slug: 'email-settings', overrideAccess: true, data: { lastTestedAt: testedAt, lastTestStatus: `Ошибка: ${message}` } })
    return NextResponse.json({ error: `Письмо не отправлено: ${message}` }, { status: 502 })
  }
}
