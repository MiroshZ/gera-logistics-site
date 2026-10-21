import { EmailTestButton } from '@/components/site/EmailTestButton'

export const metadata = { title: 'Проверка почты | ООО «ГЕРА»', robots: { index: false, follow: false } }

export default function EmailTestPage() {
  return (
    <main className="site-page inner-page">
      <section className="page-intro page-intro--simple">
        <div className="page-intro__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />ИНСТРУМЕНТ ДЛЯ СОТРУДНИКОВ</p>
          <h1>Проверка почтовых уведомлений.</h1>
          <p>Сначала войдите в админ-панель как администратор и заполните получателя в разделе «Уведомления по email». SMTP-параметры находятся в локальном файле .env.</p>
          <EmailTestButton />
        </div>
      </section>
    </main>
  )
}
