import Image from 'next/image'
import Link from 'next/link'
import { PageIntro } from '@/components/site/PageIntro'
import { LeadForm } from '@/components/site/LeadForm'
import { getFleet, getPage } from '@/lib/content'

export const dynamic = 'force-dynamic'

function mediaUrl(value: unknown): string | null {
  return typeof value === 'object' && value && 'url' in value && typeof value.url === 'string' ? value.url : null
}

export default async function FleetPage() {
  const [page, fleet] = await Promise.all([getPage('fleet'), getFleet()])
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      {fleet.length ? <section className="fleet-grid">{fleet.map((item, index) => { const photo = mediaUrl(item.photo); return <article className="fleet-card" key={item.id}><div className="fleet-card__image">{photo ? <Image src={photo} alt={item.title} fill sizes="(max-width: 760px) 100vw, 50vw" /> : <div className="fleet-card__placeholder" aria-hidden="true">ГЕРА</div>}</div><div className="fleet-card__body"><span className="direction-card__index">КАТЕГОРИЯ / {String(index + 1).padStart(2, '0')}</span><h2>{item.title}</h2>{item.category ? <p>{item.category}</p> : null}{item.quantity && item.quantity > 0 ? <p>Количество: {item.quantity}</p> : null}{item.payload && item.payload > 0 ? <p>Грузоподъёмность: {item.payload.toLocaleString('ru-RU')} {item.payloadUnit || 'кг'}</p> : null}{item.volume && item.volume > 0 ? <p>Объём: {item.volume.toLocaleString('ru-RU')} {item.volumeUnit || 'м³'}</p> : null}{item.description ? <p>{item.description}</p> : null}</div></article> })}</section> : <section className="empty-state"><span className="empty-state__marker">—</span><div><h2>Состав автопарка уточняется.</h2><p>Здесь будут категории собственных седельных тягачей, типы полуприцепов и подтверждённые параметры. Фото складских или сторонних машин не выдаются за фото автопарка ГЕРЫ.</p><Link className="inline-link" href="/transport">Об автоперевозках <span aria-hidden="true">→</span></Link></div></section>}
      <LeadForm defaultServices={['transport']} sourcePage="/fleet" />
    </main>
  )
}
