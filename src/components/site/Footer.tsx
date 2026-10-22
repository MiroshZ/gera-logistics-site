import Link from 'next/link'
import { Brand } from '@/components/site/Brand'
import type { SiteSettingsRecord } from '@/lib/content'

export function Footer({ settings }: { settings: SiteSettingsRecord }) {
  const name = settings.companyName || 'ГЕРА'
  const departmentPhones = [
    { label: 'Складской терминал', number: settings.warehousePhone },
    { label: 'Автоперевозки', number: settings.transportPhone },
  ].filter((phone): phone is { label: string; number: string } => Boolean(phone.number))
  const generalPhone = settings.publicPhone && !departmentPhones.some((phone) => phone.number === settings.publicPhone)
    ? settings.publicPhone
    : null
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand brand--light" href="/ru" aria-label="GERA — на главную">
            <Brand />
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
          {departmentPhones.map(({ label, number }) => <div className="footer-contact__phone" key={label}><span>{label}</span><a href={`tel:${number.replace(/[^+\d]/g, '')}`}>{number}</a></div>)}
          {generalPhone ? <div className="footer-contact__phone"><span>Общий телефон</span><a href={`tel:${generalPhone.replace(/[^+\d]/g, '')}`}>{generalPhone}</a></div> : null}
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}>{settings.publicEmail}</a> : null}
          {settings.additionalEmail ? <a href={`mailto:${settings.additionalEmail}`}>{settings.additionalEmail}</a> : null}
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
