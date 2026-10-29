import Image from 'next/image'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getContainerSpecs, getPage, getTerminal } from '@/lib/content'
import { getContainerPhotos } from '@/lib/terminal-photos'

export const dynamic = 'force-dynamic'

export default async function ContainerTerminalPage() {
  const [page, terminal] = await Promise.all([getPage('container'), getTerminal('container')])
  const address = terminal?.address
  const specs = await getContainerSpecs(terminal?.id)
  const operations = specs?.operations?.map((operation) => operation.name).filter((name): name is string => Boolean(name)) || []
  const [heroPhoto, ...galleryPhotos] = getContainerPhotos(terminal)
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="container-page-hero">
        <div className="container-page-hero__photo"><Image src={heroPhoto.src} alt={heroPhoto.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="container-page-hero__copy"><p className="eyebrow"><span className="eyebrow__dot" />ОТДЕЛЬНЫЙ ОБЪЕКТ</p><h2>{terminal?.name || 'Контейнерный терминал'}</h2><p>{terminal?.description || 'Самостоятельный терминал компании, предназначенный только для работы с контейнерами.'}</p></div>
      </section>
      {galleryPhotos.length ? <section className="gallery-section"><div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow__dot" />ФОТОГРАФИИ</p><h2>Площадка и техника<br />терминала.</h2></div><p>Реальные снимки объекта: общий вид, рабочие зоны и техника на территории.</p></div><div className="container-gallery">{galleryPhotos.map((photo, index) => <figure className={`container-gallery__item container-gallery__item--${index + 1}`} key={`${photo.src}-${index}`}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 40vw" /></div><figcaption><span>{photo.caption}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption></figure>)}</div></section> : null}
      {operations.length || specs?.containerTypes || specs?.equipment || specs?.limitations ? (
        <section className="section section--compact"><div className="section-heading"><p className="eyebrow"><span className="eyebrow__dot" />АКТУАЛЬНЫЕ СВЕДЕНИЯ</p><h2>Условия терминала.</h2></div><div className="spec-grid">{operations.length ? <article><span>ОПЕРАЦИИ</span><ul>{operations.map((item) => <li key={item}>{item}</li>)}</ul></article> : null}{specs?.containerTypes ? <article><span>ТИПЫ КОНТЕЙНЕРОВ</span><p>{specs.containerTypes}</p></article> : null}{specs?.equipment ? <article><span>ОБОРУДОВАНИЕ</span><p>{specs.equipment}</p></article> : null}{specs?.limitations ? <article><span>УСЛОВИЯ И ОГРАНИЧЕНИЯ</span><p>{specs.limitations}</p></article> : null}</div></section>
      ) : <section className="split-note"><p className="eyebrow"><span className="eyebrow__dot" />АКТУАЛЬНЫЕ СВЕДЕНИЯ</p><p>Операции, типы контейнеров, адрес и режим работы появятся после проверки. Для уточнения оставьте запрос с типом и количеством контейнеров, если эта информация известна.</p></section>}
      {address?.street || address?.city || terminal?.schedule ? <section className="contact-data-grid">{address?.street || address?.city ? <article><span>РАСПОЛОЖЕНИЕ</span><p>{[address?.street, address?.city].filter(Boolean).join(', ')}</p>{address?.mapUrl ? <a href={address.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a> : null}</article> : null}{terminal?.schedule ? <article><span>РЕЖИМ РАБОТЫ</span><p>{terminal.schedule}</p></article> : null}</section> : null}
      <LeadForm defaultServices={['container']} sourcePage="/terminals/container" />
    </main>
  )
}
