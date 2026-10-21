import Link from 'next/link'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getSiteSettings, getTerminals } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const [page, settings, terminals] = await Promise.all([getPage('contacts'), getSiteSettings(), getTerminals()])
  const withAddress = terminals.filter((terminal) => terminal.address?.street || terminal.address?.city)
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="contact-overview">
        <div><p className="eyebrow"><span className="eyebrow__dot" />КАНАЛЫ СВЯЗИ</p><h2>Удобный способ<br />связаться.</h2><p>Оставьте телефон или email в форме — сотрудник свяжется с вами по указанному каналу.</p></div>
        <div className="contact-details">
          {settings.publicPhone ? <a href={`tel:${settings.publicPhone.replace(/[^+\d]/g, '')}`}><span>ТЕЛЕФОН</span><strong>{settings.publicPhone}</strong><small>Нажмите, чтобы позвонить ↗</small></a> : null}
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}><span>ПОЧТА</span><strong>{settings.publicEmail}</strong><small>Написать письмо ↗</small></a> : null}
          {!settings.publicPhone && !settings.publicEmail ? <div className="contact-unset"><span>КОНТАКТЫ</span><p>Публичные телефон и email будут добавлены после подтверждения компанией.</p></div> : null}
        </div>
      </section>
      <section className="contact-locations"><div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow__dot" />ТЕРМИНАЛЫ</p><h2>Расположение<br />объектов.</h2></div><p>Адреса и схемы проезда показываются отдельно для каждого терминала.</p></div>{withAddress.length ? <div className="contact-data-grid">{withAddress.map((terminal) => <article key={terminal.slug}><span>{terminal.type === 'warehouse' ? 'СКЛАДСКОЙ ТЕРМИНАЛ' : 'КОНТЕЙНЕРНЫЙ ТЕРМИНАЛ'}</span><h3>{terminal.name}</h3><p>{[terminal.address?.street, terminal.address?.city].filter(Boolean).join(', ')}</p>{terminal.address?.directions ? <p>{terminal.address.directions}</p> : null}{terminal.address?.mapUrl ? <a href={terminal.address.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a> : null}</article>)}</div> : <div className="availability-note"><span className="availability-note__mark">i</span><p>Адреса объектов не опубликованы до проверки актуальных данных. Оставьте запрос, если важно уточнить расположение.</p></div>}</section>
      <LeadForm defaultServices={[]} sourcePage="/ru/contacts" />
      <p className="contact-privacy-note">Перед публичным запуском компании нужно добавить утверждённую политику обработки данных и окончательный текст согласия. <Link href="/ru/privacy">Статус страницы обработки данных ↗</Link></p>
    </main>
  )
}
