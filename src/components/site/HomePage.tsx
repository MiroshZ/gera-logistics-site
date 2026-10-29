import Image from 'next/image'
import Link from 'next/link'
import { LeadForm } from '@/components/site/LeadForm'
import { getPage, getTerminals } from '@/lib/content'
import { getContainerPhotos } from '@/lib/terminal-photos'

function ImageUrl({ value, fallback }: { value?: unknown; fallback: string }) {
  if (typeof value === 'object' && value && 'url' in value && typeof value.url === 'string') return value.url
  return fallback
}

export async function HomePage() {
  const [page, terminals] = await Promise.all([getPage('home'), getTerminals()])
  const warehouse = terminals.find((terminal) => terminal.slug === 'warehouse')
  const container = terminals.find((terminal) => terminal.slug === 'container')
  const warehousePhoto = warehouse?.photos?.[0]?.image
  const heroImage = ImageUrl({ value: warehousePhoto, fallback: '/images/warehouse/loading-bay.jpg' })
  const rackingImage = '/images/warehouse/racking.jpg'
  const containerPhoto = getContainerPhotos(container)[0]

  return (
    <main className="site-page home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />{page.eyebrow || 'ООО «ГЕРА» · ТЕРМИНАЛЫ И ПЕРЕВОЗКИ'}</p>
          <h1>{page.heroTitle || 'Складской и контейнерный терминалы. Автоперевозки.'}</h1>
          <p className="home-hero__lead">{page.intro || 'Выберите направление и опишите задачу. Менеджер уточнит параметры груза и подготовит предложение.'}</p>
          <div className="home-hero__actions">
            <Link className="button button--accent" href="/contacts#request">Оставить заявку <span aria-hidden="true">↗</span></Link>
            <Link className="inline-link inline-link--light" href="/terminals">Выбрать направление <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-facts" aria-label="Направления компании">
            <div><span>01</span><p>Складской<br />терминал</p></div>
            <div><span>02</span><p>Контейнерный<br />терминал</p></div>
            <div><span>03</span><p>Автомобильные<br />перевозки</p></div>
          </div>
        </div>
        <div className="home-hero__visual">
          <Image src={heroImage} alt="Погрузочная зона складского терминала ООО ГЕРА" fill priority sizes="(max-width: 860px) 100vw, 54vw" className="home-hero__photo" />
          <div className="photo-caption"><span className="photo-caption__dot" /><span>Складской терминал</span><span>Реальное фото объекта</span></div>
          <span className="home-hero__vertical" aria-hidden="true">ЛОГИСТИКА · ООО ГЕРА</span>
        </div>
      </section>

      <section className="section section--services" id="directions">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow"><span className="eyebrow__dot" />ЧЕМ МОЖЕМ ПОМОЧЬ</p><h2>Три направления.<br />Отдельные возможности.</h2></div>
          <p>Сведения и фотографии каждого объекта относятся только к нему. Актуальные параметры уточняются и публикуются после проверки.</p>
        </div>
        <div className="direction-grid">
          <Link className="direction-card direction-card--warehouse" href="/terminals/warehouse">
            <div className="direction-card__photo"><Image src={rackingImage} alt="Стеллажи складского терминала" fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
            <div className="direction-card__body">
              <span className="direction-card__index">01 / ОБЪЕКТ</span>
              <h3>Складской<br />терминал</h3>
              <p>{warehouse?.description || 'Складское хранение и обработка грузов. Параметры объекта и свободные условия уточняются по запросу.'}</p>
              <span className="card-link">Подробнее <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
          <Link className="direction-card direction-card--container" href="/terminals/container">
            <div className="direction-card__photo"><Image src={containerPhoto.src} alt={containerPhoto.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
            <div className="direction-card__body">
              <span className="direction-card__index">02 / ОБЪЕКТ</span>
              <h3>Контейнерный<br />терминал</h3>
              <p>Самостоятельный объект только для работы с контейнерами. Его условия не смешиваются с данными складского терминала.</p>
              <span className="card-link">Подробнее <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
          <Link className="direction-card direction-card--transport" href="/transport">
            <div className="transport-art" aria-hidden="true"><span>ГЕРА</span><svg viewBox="0 0 240 100" role="presentation"><path d="M16 62h137V26h45l27 36v17h-22a19 19 0 0 0-38 0h-86a19 19 0 0 0-38 0H16z" /><circle cx="57" cy="82" r="10" /><circle cx="174" cy="82" r="10" /><path d="M154 37h35l17 25h-52z" /></svg></div>
            <div className="direction-card__body">
              <span className="direction-card__index">03 / ПЕРЕВОЗКИ</span>
              <h3>Автомобильные<br />грузоперевозки</h3>
              <p>Отдельное направление компании на собственных седельных тягачах. Маршрут и параметры подтверждаются по заявке.</p>
              <span className="card-link">Подробнее <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="process-section">
        <div className="process-section__title"><p className="eyebrow eyebrow--light"><span className="eyebrow__dot" />ПОНЯТНЫЙ ПОРЯДОК РАБОТЫ</p><h2>Сначала задача.<br />Затем решение.</h2><p>Запрос не обязывает к заказу. Стоимость и сроки называются после уточнения условий.</p></div>
        <div className="process-steps">
          <article><span className="process-step__number">01</span><h3>Опишите груз</h3><p>Укажите направление и известные параметры. Можно запросить несколько услуг вместе.</p></article>
          <article><span className="process-step__number">02</span><h3>Уточним детали</h3><p>Менеджер проверит, подходит ли задача терминалу или перевозке.</p></article>
          <article><span className="process-step__number">03</span><h3>Подготовим предложение</h3><p>Вы получите условия после согласования параметров и доступности услуги.</p></article>
        </div>
      </section>

      <section className="photo-story">
        <div className="photo-story__image"><Image src={rackingImage} alt="Стеллажи и рабочая зона складского терминала" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="photo-story__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />СКЛАДСКОЙ ТЕРМИНАЛ</p>
          <h2>Показываем объект таким, какой он есть.</h2>
          <p>Фотографии складского направления взяты из презентации компании. Параметры зон, площадь, температурные условия и режим работы появятся после проверки и публикации сотрудником.</p>
          <Link className="inline-link" href="/terminals/warehouse">О складском терминале <span aria-hidden="true">→</span></Link>
        </div>
        <div className="photo-story__index">ФОТО / 01</div>
      </section>

      <section className="last-cta">
        <div><p className="eyebrow"><span className="eyebrow__dot" />СЛЕДУЮЩИЙ ШАГ</p><h2>Соберём вводные<br />по вашему грузу.</h2></div>
        <div><p>Отметьте подходящие направления и оставьте контакты. Если части данных пока нет — это нормально.</p><Link className="button button--dark" href="/contacts#request">Оставить заявку <span aria-hidden="true">↗</span></Link></div>
      </section>
      <LeadForm defaultServices={[]} sourcePage="/" />
    </main>
  )
}
