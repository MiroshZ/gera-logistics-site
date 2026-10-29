import Link from 'next/link'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getSiteSettings, getTerminals } from '@/lib/content'
import { createPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({
  title: 'Контакты и адреса терминалов',
  description: 'Контакты ООО «ГЕРА», телефоны и адреса терминалов, подтверждённые компанией. Оставьте заявку, чтобы обсудить условия услуги.',
  path: '/contacts',
})

export default async function ContactsPage() {
  const [page, settings, terminals] = await Promise.all([getPage('contacts'), getSiteSettings(), getTerminals()])
  const withAddress = terminals.filter((terminal) => terminal.address?.street || terminal.address?.city)
  const warehousePhone = settings.warehousePhone || terminals.find((terminal) => terminal.slug === 'warehouse')?.contactPhone
  const phoneCards: { label: string; phone: string }[] = []
  if (warehousePhone) phoneCards.push({ label: 'ТЕЛЕФОН · СКЛАДСКОЙ ТЕРМИНАЛ', phone: warehousePhone })
  if (settings.transportPhone) phoneCards.push({ label: 'ТЕЛЕФОН · АВТОПЕРЕВОЗКИ', phone: settings.transportPhone })
  if (settings.publicPhone && !phoneCards.some((card) => card.phone === settings.publicPhone)) {
    phoneCards.push({ label: 'ОБЩИЙ ТЕЛЕФОН', phone: settings.publicPhone })
  }
  const details = settings.companyDetails
  const companyRows = [
    { label: 'Полное название', value: details?.legalName, wide: true },
    { label: 'Юридический адрес', value: details?.legalAddress, wide: true },
    { label: 'Почтовый адрес', value: details?.postalAddress, wide: true },
    { label: 'Руководитель', value: details?.directorName },
    { label: 'ИНН', value: details?.inn },
    { label: 'КПП', value: details?.kpp },
    { label: 'ОГРН', value: details?.ogrn },
    { label: 'ОКПО', value: details?.okpo },
    { label: 'Идентификатор ЭДО', value: details?.edoId },
  ].filter((row) => row.value?.trim())
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="contact-overview">
        <div><p className="eyebrow"><span className="eyebrow__dot" />КАНАЛЫ СВЯЗИ</p><h2>Удобный способ<br />связаться.</h2><p>Оставьте телефон или email в форме — сотрудник свяжется с вами по указанному каналу.</p></div>
        <div className="contact-details">
          {phoneCards.map((card) => <a key={card.label} href={`tel:${card.phone.replace(/[^+\d]/g, '')}`}><span>{card.label}</span><strong>{card.phone}</strong><small>Нажмите, чтобы позвонить ↗</small></a>)}
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}><span>ПОЧТА</span><strong>{settings.publicEmail}</strong><small>Написать письмо ↗</small></a> : null}
          {settings.additionalEmail ? <a href={`mailto:${settings.additionalEmail}`}><span>ДОПОЛНИТЕЛЬНАЯ ПОЧТА</span><strong>{settings.additionalEmail}</strong><small>Написать письмо ↗</small></a> : null}
          {!phoneCards.length && !settings.publicEmail && !settings.additionalEmail ? <div className="contact-unset"><span>КОНТАКТЫ</span><p>Публичные телефон и email будут добавлены после подтверждения компанией.</p></div> : null}
        </div>
      </section>
      <section className="contact-locations"><div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow__dot" />ТЕРМИНАЛЫ</p><h2>Расположение<br />объектов.</h2></div><p>Адреса и схемы проезда показываются отдельно для каждого терминала.</p></div>{withAddress.length ? <div className="contact-data-grid">{withAddress.map((terminal) => <article key={terminal.slug}><span>{terminal.type === 'warehouse' ? 'СКЛАДСКОЙ ТЕРМИНАЛ' : 'КОНТЕЙНЕРНЫЙ ТЕРМИНАЛ'}</span><h3>{terminal.name}</h3><p>{[terminal.address?.street, terminal.address?.city].filter(Boolean).join(', ')}</p>{terminal.address?.directions ? <p>{terminal.address.directions}</p> : null}{terminal.address?.mapUrl ? <a href={terminal.address.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a> : null}</article>)}</div> : <div className="availability-note"><span className="availability-note__mark">i</span><p>Адреса объектов не опубликованы до проверки актуальных данных. Оставьте запрос, если важно уточнить расположение.</p></div>}</section>
      {companyRows.length ? <section className="company-requisites" aria-labelledby="company-requisites-title">
        <div className="section-heading section-heading--split company-requisites__heading">
          <div><p className="eyebrow"><span className="eyebrow__dot" />ООО «ГЕРА»</p><h2 id="company-requisites-title">Реквизиты<br />компании.</h2></div>
          <p>Юридические и регистрационные данные компании.</p>
        </div>
        <dl className="company-requisites__list">
          {companyRows.map((row) => <div className={row.wide ? 'company-requisites__item company-requisites__item--wide' : 'company-requisites__item'} key={row.label}>
            <dt>{row.label}</dt><dd>{row.value}</dd>
          </div>)}
        </dl>
      </section> : null}
      <LeadForm defaultServices={[]} sourcePage="/contacts" />
      <p className="contact-privacy-note">При отправке заявки действует <Link href="/consent">согласие на обработку персональных данных</Link>. Порядок работы с ними описан в <Link href="/privacy">Политике обработки персональных данных</Link>.</p>
    </main>
  )
}
