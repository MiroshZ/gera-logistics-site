import Link from 'next/link'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getPublicTariffs, getRoutes, getServices } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function TransportPage() {
  const [page, routes, services, tariffs] = await Promise.all([getPage('transport'), getRoutes(), getServices('transport'), getPublicTariffs('transport')])
  const today = new Date().toISOString().slice(0, 10)
  const currentTariffs = tariffs.filter((tariff) => !tariff.validUntil || tariff.validUntil.slice(0, 10) >= today)
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="transport-intro">
        <div className="transport-intro__graphic" aria-hidden="true"><span>ГЕРА</span><svg viewBox="0 0 320 132" role="presentation"><path d="M20 83h179V34h55l41 49v26h-31a24 24 0 0 0-48 0H103a24 24 0 0 0-48 0H20z" /><circle cx="79" cy="109" r="14" /><circle cx="240" cy="109" r="14" /><path d="M207 48h43l26 35h-69z" /></svg><i /></div>
        <div className="transport-intro__copy"><p className="eyebrow"><span className="eyebrow__dot" />ОТДЕЛЬНОЕ НАПРАВЛЕНИЕ</p><h2>Автомобильные грузоперевозки на собственных седельных тягачах.</h2><p>Напишите, откуда и куда нужно доставить груз. Маршрут, сроки, доступность и подходящий тип техники сотрудник подтвердит перед расчётом.</p><Link className="inline-link" href="/fleet">Посмотреть автопарк <span aria-hidden="true">→</span></Link></div>
      </section>
      {services.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />ВОЗМОЖНОСТИ</p><h2>Подтверждённые форматы.</h2></div><div className="data-grid">{services.map((service) => <article className="data-card" key={service.id}><span className="data-card__index">УСЛУГА</span><h3>{service.title}</h3>{service.description ? <p>{service.description}</p> : null}</article>)}</div></section> : null}
      {routes.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />ГЕОГРАФИЯ</p><h2>Проверенные направления.</h2></div><div className="route-list">{routes.map((route) => <article key={route.id}><span>{route.from}</span><span className="route-arrow" aria-hidden="true">→</span><span>{route.to}</span>{route.service ? <small>{route.service}</small> : null}{route.limitations ? <p>{route.limitations}</p> : null}</article>)}</div></section> : <section className="split-note"><p className="eyebrow"><span className="eyebrow__dot" />МАРШРУТЫ</p><p>География перевозок не указана до подтверждения. Отправьте маршрут — менеджер проверит возможность доставки.</p></section>}
      {currentTariffs.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />ОПУБЛИКОВАННЫЕ ТАРИФЫ</p><h2>Текущие условия.</h2></div><div className="tariff-list">{currentTariffs.map((tariff) => <article key={tariff.id}><div><h3>{tariff.title}</h3>{tariff.terms ? <p>{tariff.terms}</p> : null}</div><strong>{tariff.amount.toLocaleString('ru-RU')} {tariff.currency}<small> / {tariff.unit}</small></strong></article>)}</div></section> : null}
      <LeadForm defaultServices={['transport']} sourcePage="/transport" />
    </main>
  )
}
