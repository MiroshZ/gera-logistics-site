import Link from 'next/link'
import type { SiteSettingsRecord } from '@/lib/content'

export function Footer({ settings }: { settings: SiteSettingsRecord }) {
  const name = settings.companyName || 'ГЕРА'
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand brand--light" href="/ru">
            <span className="brand__mark">Г</span><span className="brand__word">{name}</span>
          </Link>
          <p>{settings.footerNote || 'Складской терминал, контейнерный терминал и автоперевозки.'}</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Направления</span>
          <Link href="/ru/terminals/warehouse">Складской терминал</Link>
          <Link href="/ru/terminals/container">Контейнерный терминал</Link>
          <Link href="/ru/transport">Автоперевозки</Link>
        </div>
        <div className="footer-links">
          <span className="footer-label">Компания</span>
          <Link href="/ru/about">О компании</Link>
          <Link href="/ru/fleet">Автопарк</Link>
          <Link href="/ru/contacts">Контакты</Link>
          <Link href="/ru/privacy">Обработка данных</Link>
        </div>
        <div className="footer-contact">
          <span className="footer-label">Связаться</span>
          {settings.publicPhone ? <a href={`tel:${settings.publicPhone.replace(/[^+\d]/g, '')}`}>{settings.publicPhone}</a> : null}
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}>{settings.publicEmail}</a> : null}
          <Link className="footer-contact__link" href="/ru/contacts#request">Написать нам <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© ООО «{name}»</span>
        <span>Информация на сайте обновляется компанией</span>
        <Link href="/admin">Вход для сотрудников <span aria-hidden="true">↗</span></Link>
      </div>
    </footer>
  )
}
