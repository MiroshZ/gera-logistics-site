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
          <Link className="brand brand--light" href="/" aria-label="GERA — на главную">
            <Brand />
          </Link>
          <p>{settings.footerNote || 'Складской терминал, контейнерный терминал и автоперевозки.'}</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Направления</span>
          <Link href="/terminals/warehouse">Складской терминал</Link>
          <Link href="/terminals/container">Контейнерный терминал</Link>
          <Link href="/transport">Автоперевозки</Link>
        </div>
        <div className="footer-links">
          <span className="footer-label">Компания</span>
          <Link href="/about">О компании</Link>
          <Link href="/fleet">Автопарк</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/privacy">Политика обработки данных</Link>
          <Link href="/consent">Согласие на обработку данных</Link>
          <Link href="/terms">Использование сайта</Link>
        </div>
        <div className="footer-contact">
          <span className="footer-label">Связаться</span>
          {departmentPhones.map(({ label, number }) => <div className="footer-contact__phone" key={label}><span>{label}</span><a href={`tel:${number.replace(/[^+\d]/g, '')}`}>{number}</a></div>)}
          {generalPhone ? <div className="footer-contact__phone"><span>Общий телефон</span><a href={`tel:${generalPhone.replace(/[^+\d]/g, '')}`}>{generalPhone}</a></div> : null}
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}>{settings.publicEmail}</a> : null}
          {settings.additionalEmail ? <a href={`mailto:${settings.additionalEmail}`}>{settings.additionalEmail}</a> : null}
          <Link className="footer-contact__link" href="/contacts#request">Написать нам <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ООО «{name}». Все права защищены.<br /><small>Копирование материалов без разрешения запрещено.</small></span>
        <span>Информация на сайте обновляется компанией</span>
        <Link href="/admin">Вход для сотрудников <span aria-hidden="true">↗</span></Link>
      </div>
    </footer>
  )
}
