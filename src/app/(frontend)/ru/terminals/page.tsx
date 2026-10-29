import Link from 'next/link'
import Image from 'next/image'
import { PageIntro } from '@/components/site/PageIntro'
import { getPage, getTerminals } from '@/lib/content'
import { getContainerPhotos } from '@/lib/terminal-photos'

export const dynamic = 'force-dynamic'

export default async function TerminalsPage() {
  const [page, terminals] = await Promise.all([getPage('terminals'), getTerminals()])
  const warehouse = terminals.find((terminal) => terminal.slug === 'warehouse')
  const container = terminals.find((terminal) => terminal.slug === 'container')
  const containerPhoto = getContainerPhotos(container)[0]
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} />
      <section className="terminal-list">
        <article className="terminal-feature">
          <div className="terminal-feature__image"><Image src="/images/warehouse/loading-bay.jpg" alt="Погрузочная зона складского терминала" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="terminal-feature__content"><span className="direction-card__index">ОБЪЕКТ / 01</span><h2>{warehouse?.name || 'Складской терминал'}</h2><p>{warehouse?.description || 'Складское хранение и обработка грузов. Параметры объекта публикуются после проверки.'}</p><Link className="button button--dark" href="/terminals/warehouse">Подробнее <span aria-hidden="true">↗</span></Link></div>
        </article>
        <article className="terminal-feature terminal-feature--container">
          <div className="terminal-feature__image"><Image src={containerPhoto.src} alt={containerPhoto.alt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <div className="terminal-feature__content"><span className="direction-card__index">ОБЪЕКТ / 02</span><h2>{container?.name || 'Контейнерный терминал'}</h2><p>{container?.description || 'Отдельный объект, предназначенный только для работы с контейнерами. Условия и операции уточняются по запросу.'}</p><Link className="button button--dark" href="/terminals/container">Подробнее <span aria-hidden="true">↗</span></Link></div>
        </article>
      </section>
      <section className="split-note"><p className="eyebrow"><span className="eyebrow__dot" />ВАЖНО</p><p>Площади, режимы, адреса, фотографии и операции привязаны к конкретному объекту. Сведения одного терминала не переносятся на другой.</p></section>
    </main>
  )
}
