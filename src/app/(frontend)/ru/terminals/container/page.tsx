import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getContainerSpecs, getPage, getTerminal } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function ContainerTerminalPage() {
  const [page, terminal] = await Promise.all([getPage('container'), getTerminal('container')])
  const address = terminal?.address
  const specs = await getContainerSpecs(terminal?.id)
  const operations = specs?.operations?.map((operation) => operation.name).filter((name): name is string => Boolean(name)) || []
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="container-page-hero">
        <div className="container-page-hero__art container-art" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div>
        <div className="container-page-hero__copy"><p className="eyebrow"><span className="eyebrow__dot" />ОТДЕЛЬНЫЙ ОБЪЕКТ</p><h2>{terminal?.name || 'Контейнерный терминал'}</h2><p>{terminal?.description || 'Самостоятельный терминал компании, предназначенный только для работы с контейнерами.'}</p></div>
      </section>
      {operations.length || specs?.containerTypes || specs?.equipment || specs?.limitations ? (
        <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />АКТУАЛЬНЫЕ СВЕДЕНИЯ</p><h2>Условия терминала.</h2></div><div className="spec-grid">{operations.length ? <article><span>ОПЕРАЦИИ</span><ul>{operations.map((item) => <li key={item}>{item}</li>)}</ul></article> : null}{specs?.containerTypes ? <article><span>ТИПЫ КОНТЕЙНЕРОВ</span><p>{specs.containerTypes}</p></article> : null}{specs?.equipment ? <article><span>ОБОРУДОВАНИЕ</span><p>{specs.equipment}</p></article> : null}{specs?.limitations ? <article><span>УСЛОВИЯ И ОГРАНИЧЕНИЯ</span><p>{specs.limitations}</p></article> : null}</div></section>
      ) : <section className="split-note"><p className="eyebrow"><span className="eyebrow__dot" />АКТУАЛЬНЫЕ СВЕДЕНИЯ</p><p>Операции, типы контейнеров, адрес и режим работы появятся после проверки. Для уточнения оставьте запрос с типом и количеством контейнеров, если эта информация известна.</p></section>}
      {address?.street || address?.city || terminal?.schedule ? <section className="contact-data-grid">{address?.street || address?.city ? <article><span>РАСПОЛОЖЕНИЕ</span><p>{[address?.street, address?.city].filter(Boolean).join(', ')}</p>{address?.mapUrl ? <a href={address.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a> : null}</article> : null}{terminal?.schedule ? <article><span>РЕЖИМ РАБОТЫ</span><p>{terminal.schedule}</p></article> : null}</section> : null}
      <LeadForm defaultServices={['container']} sourcePage="/ru/terminals/container" />
    </main>
  )
}
