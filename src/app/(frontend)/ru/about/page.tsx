import { PageIntro } from '@/components/site/PageIntro'
import Link from 'next/link'
import { getPage } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const page = await getPage('about')
  return (
    <main className="site-page inner-page">
      <PageIntro page={page} action={false} />
      <section className="about-manifesto"><span className="about-manifesto__number">01—03</span><h2>Разделяем объекты и показываем только проверенные сведения.</h2><p>Складской терминал, контейнерный терминал и автоперевозки — три самостоятельных направления. Параметры объектов, маршруты и характеристики техники публикуются из админ-панели после проверки ответственным сотрудником.</p><div className="about-links"><Link href="/ru/terminals/warehouse">Складской терминал ↗</Link><Link href="/ru/terminals/container">Контейнерный терминал ↗</Link><Link href="/ru/transport">Автоперевозки ↗</Link></div></section>
      <section className="about-principles"><article><span>01 / ТОЧНОСТЬ</span><h3>Не переносим данные между объектами.</h3><p>У каждого терминала собственные адрес, параметры, режим и фотографии.</p></article><article><span>02 / ОБНОВЛЕНИЕ</span><h3>Изменяемые сведения ведутся в админке.</h3><p>Площадь, тарифы, график и маршруты не вшиваются в исходный код.</p></article><article><span>03 / ЗАПРОС</span><h3>Условия подтверждаются до расчёта.</h3><p>Стоимость и сроки не обещаются, пока не известны параметры задачи.</p></article></section>
    </main>
  )
}
