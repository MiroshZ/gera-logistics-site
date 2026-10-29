import Link from 'next/link'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getPublicTariffs, getServices } from '@/lib/content'
import { createPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({
  title: 'Складские услуги',
  description: 'Услуги складского терминала ООО «ГЕРА»: доступные работы и опубликованные тарифы. Актуальные условия можно запросить с учётом параметров груза.',
  path: '/services',
})

const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 })

export default async function WarehouseServicesPage() {
  const [page, services, visibleTariffs] = await Promise.all([getPage('warehouse-services'), getServices('warehouse'), getPublicTariffs('warehouse')])
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      {services.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />СКЛАДСКОЙ ТЕРМИНАЛ</p><h2>Опубликованные услуги.</h2></div><div className="service-list">{services.map((service, index) => <article className="service-row" key={service.id}><span className="service-row__index">{String(index + 1).padStart(2, '0')}</span><div><h3>{service.title}</h3>{service.description ? <p>{service.description}</p> : null}{service.requirements ? <small>Для расчёта: {service.requirements}</small> : null}</div><Link aria-label={`Запросить условия: ${service.title}`} href="/contacts#request">↗</Link></article>)}</div></section> : <section className="empty-state"><span className="empty-state__marker">—</span><div><h2>Параметры работ уточняются.</h2><p>Актуальный перечень складских операций публикуется сотрудником после проверки. Опишите задачу — мы уточним, какие условия доступны.</p><Link className="inline-link" href="/contacts#request">Запросить условия <span aria-hidden="true">→</span></Link></div></section>}
      {visibleTariffs.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />ОПУБЛИКОВАННЫЕ ТАРИФЫ</p><h2>Текущие условия расчёта.</h2></div><div className="tariff-list">{visibleTariffs.map((tariff) => <article key={tariff.id}><div><h3>{tariff.title}</h3>{tariff.terms ? <p>{tariff.terms}</p> : null}</div><strong>{money.format(tariff.amount)} {tariff.currency}<small> / {tariff.unit}</small></strong></article>)}</div></section> : null}
      <LeadForm defaultServices={['warehouse']} sourcePage="/services" />
    </main>
  )
}
