import Image from 'next/image'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getTerminal, getWarehouseDetails } from '@/lib/content'
import { createPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({
  title: 'Складской терминал и хранение грузов',
  description: 'Складской терминал ООО «ГЕРА»: хранение и обработка грузов. Запросите актуальные условия с учётом параметров и задачи по грузу.',
  path: '/terminals/warehouse',
})

export default async function WarehousePage() {
  const [page, terminal] = await Promise.all([getPage('warehouse'), getTerminal('warehouse')])
  const details = await getWarehouseDetails(terminal?.id)
  const photos = terminal?.photos?.length ? terminal.photos : [
    { image: { id: 0, url: '/images/warehouse/loading-bay-enhanced.webp', alt: 'Погрузочная зона складского терминала' }, caption: 'Погрузочная зона' },
    { image: { id: 0, url: '/images/warehouse/racking-enhanced.webp', alt: 'Стеллажи складского терминала' }, caption: 'Стеллажи' },
    { image: { id: 0, url: '/images/warehouse/storage-floor.jpg', alt: 'Помещение складского терминала' }, caption: 'Складское помещение' },
  ]
  const publishedFacts = [
    details?.totalArea && details.totalArea > 0 ? { label: 'Площадь', value: `${details.totalArea.toLocaleString('ru-RU')} ${details.areaUnit || 'м²'}` } : null,
    details?.totalVolume && details.totalVolume > 0 ? { label: 'Объём', value: `${details.totalVolume.toLocaleString('ru-RU')} ${details.volumeUnit || 'м³'}` } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="terminal-detail-overview">
        <div><p className="eyebrow"><span className="eyebrow__dot" />СКЛАДСКОЙ ТЕРМИНАЛ</p><h2>Хранение и обработка грузов.</h2><p>{terminal?.description || 'Расскажите, какой груз нужно принять, хранить или подготовить к отгрузке. Актуальные условия уточнит менеджер.'}</p></div>
        {publishedFacts.length > 0 ? <div className="fact-list">{publishedFacts.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div> : <div className="availability-note"><span className="availability-note__mark">i</span><p>Площадь, параметры зон и график не заполнены. Актуальные сведения появятся после проверки и публикации ответственным сотрудником.</p></div>}
      </section>
      {details?.infrastructure ? <section className="content-slab"><p className="eyebrow"><span className="eyebrow__dot" />ИНФРАСТРУКТУРА</p><p className="content-slab__copy">{details.infrastructure}</p></section> : null}
      {details?.zones?.length ? <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />ЗОНЫ ХРАНЕНИЯ</p><h2>Параметры по зонам.</h2></div><div className="data-grid">{details.zones.filter((zone) => zone.name).map((zone, index) => <article className="data-card" key={`${zone.name}-${index}`}><span className="data-card__index">ЗОНА / {String(index + 1).padStart(2, '0')}</span><h3>{zone.name}</h3>{zone.area && zone.area > 0 ? <p>{zone.area.toLocaleString('ru-RU')} {zone.areaUnit || 'м²'}</p> : null}{zone.volume && zone.volume > 0 ? <p>{zone.volume.toLocaleString('ru-RU')} {zone.volumeUnit || 'м³'}</p> : null}{zone.temperature ? <p>{zone.temperature}</p> : null}{zone.notes ? <p>{zone.notes}</p> : null}</article>)}</div></section> : null}
      <section className="gallery-section"><div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow__dot" />ФОТОГРАФИИ</p><h2>Рабочая среда<br />складского терминала.</h2></div><p>Погрузочная зона и стеллажи показаны на обновлённых фотографиях складского терминала.</p></div><div className="warehouse-gallery">{photos.map((item, index) => { const image = item.image; const url = typeof image === 'object' && image ? image.url || '/images/warehouse/loading-bay-enhanced.webp' : '/images/warehouse/loading-bay-enhanced.webp'; const alt = typeof image === 'object' && image ? image.alt || item.caption || 'Складской терминал' : item.caption || 'Складской терминал'; return <figure className={`warehouse-gallery__item warehouse-gallery__item--${index + 1}`} key={`${index}-${alt}`}><div><Image src={url} alt={alt} fill sizes="(max-width: 760px) 100vw, 40vw" /></div><figcaption><span>{item.caption || alt}</span><span>0{index + 1}</span></figcaption></figure> })}</div></section>
      <LeadForm defaultServices={['warehouse']} sourcePage="/terminals/warehouse" />
    </main>
  )
}
