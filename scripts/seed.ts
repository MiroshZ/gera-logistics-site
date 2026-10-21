import 'dotenv/config'
import path from 'node:path'
import config from '../src/payload.config'
import { getPayload } from 'payload'
import type { Page, Terminal } from '../src/payload-types'

const payload = await getPayload({ config: await config })

const pages = [
  { slug: 'home', title: 'Главная', eyebrow: 'ООО «ГЕРА» · ТЕРМИНАЛЫ И ПЕРЕВОЗКИ', heroTitle: 'Складской и контейнерный терминалы. Автоперевозки.', intro: 'Выберите направление и опишите задачу. Менеджер уточнит параметры груза и подготовит предложение.' },
  { slug: 'terminals', title: 'Терминалы', eyebrow: 'ДВА ОТДЕЛЬНЫХ ОБЪЕКТА', heroTitle: 'Терминалы для разных задач груза.', intro: 'Складской комплекс и отдельный контейнерный терминал. Возможности каждого объекта описываются отдельно.' },
  { slug: 'warehouse', title: 'Складской терминал', eyebrow: 'СКЛАДСКОЙ ТЕРМИНАЛ', heroTitle: 'Хранение и обработка грузов.', intro: 'Расскажите, какой груз нужно принять, хранить или подготовить к отгрузке. Актуальные условия уточнит менеджер.' },
  { slug: 'container', title: 'Контейнерный терминал', eyebrow: 'КОНТЕЙНЕРНЫЙ ТЕРМИНАЛ', heroTitle: 'Отдельный терминал для контейнеров.', intro: 'Опишите контейнер и нужную операцию. Условия и технические возможности подтвердит сотрудник терминала.' },
  { slug: 'warehouse-services', title: 'Складские услуги', eyebrow: 'СКЛАДСКОЙ ТЕРМИНАЛ', heroTitle: 'Складские услуги под задачу.', intro: 'Состав работ и условия зависят от параметров груза. Отправьте запрос, чтобы получить актуальную информацию.' },
  { slug: 'transport', title: 'Автоперевозки', eyebrow: 'АВТОМОБИЛЬНЫЕ ГРУЗОПЕРЕВОЗКИ', heroTitle: 'Перевозки на собственных седельных тягачах.', intro: 'Опишите маршрут, груз и желаемую дату. Менеджер подтвердит доступность перевозки и подходящий формат.' },
  { slug: 'fleet', title: 'Автопарк', eyebrow: 'СОБСТВЕННЫЙ АВТОПАРК', heroTitle: 'Техника для автомобильных перевозок.', intro: 'Сведения о категориях техники, параметрах и фотографиях публикуются после проверки.' },
  { slug: 'about', title: 'О компании', eyebrow: 'ООО «ГЕРА»', heroTitle: 'Три направления логистики.', intro: 'Складской терминал, отдельный контейнерный терминал и автомобильные грузоперевозки на собственных седельных тягачах.' },
  { slug: 'contacts', title: 'Контакты', eyebrow: 'СВЯЗЬ С КОМАНДОЙ', heroTitle: 'Опишите задачу — подскажем следующий шаг.', intro: 'Оставьте заявку с контактным телефоном или email. Менеджер свяжется с вами по указанному каналу.' },
] satisfies Pick<Page, 'slug' | 'title' | 'eyebrow' | 'heroTitle' | 'intro'>[]

for (const page of pages) {
  const found = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, locale: 'ru', limit: 1, overrideAccess: true })
  if (!found.docs.length) {
    await payload.create({ collection: 'pages', locale: 'ru', overrideAccess: true, data: { ...page, _status: 'published' } })
    console.info(`Создана страница: ${page.title}`)
  }
}

const mediaSpecs = [
  { alt: 'Погрузочная зона складского терминала', file: 'loading-bay.jpg', caption: 'Погрузочная зона' },
  { alt: 'Стеллажи складского терминала', file: 'racking.jpg', caption: 'Стеллажи' },
  { alt: 'Складское помещение терминала', file: 'storage-floor.jpg', caption: 'Складское помещение' },
]
const mediaRecords: { id: number; caption: string }[] = []

for (const item of mediaSpecs) {
  const found = await payload.find({ collection: 'media', where: { alt: { equals: item.alt } }, limit: 1, overrideAccess: true })
  const record = found.docs[0] || await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: { alt: item.alt },
    filePath: path.resolve(process.cwd(), 'public/images/warehouse', item.file),
  })
  mediaRecords.push({ id: Number(record.id), caption: item.caption })
}

const terminalSpecs = [
  { name: 'Складской терминал', slug: 'warehouse', type: 'warehouse', description: 'Складское хранение и обработка грузов.', photos: mediaRecords.map((media) => ({ image: media.id, caption: media.caption })) },
  { name: 'Контейнерный терминал', slug: 'container', type: 'container', description: 'Отдельный объект компании, предназначенный только для работы с контейнерами.' },
] satisfies Pick<Terminal, 'name' | 'slug' | 'type' | 'description' | 'photos'>[]

for (const terminal of terminalSpecs) {
  const found = await payload.find({ collection: 'terminals', where: { slug: { equals: terminal.slug } }, limit: 1, overrideAccess: true })
  if (!found.docs.length) {
    await payload.create({ collection: 'terminals', locale: 'ru', overrideAccess: true, data: { ...terminal, _status: 'published' } })
    console.info(`Создан терминал: ${terminal.name}`)
  }
}

const siteSettings = await payload.findGlobal({ slug: 'site-settings', locale: 'ru', overrideAccess: true })
if (!siteSettings.companyName) {
  await payload.updateGlobal({ slug: 'site-settings', locale: 'ru', overrideAccess: true, data: { companyName: 'ГЕРА', tagline: 'Терминалы и перевозки для бизнеса' } })
}

console.info('Локальный контент подготовлен. Тарифы, маршруты, параметры и контакты не заполнены неподтверждёнными данными.')
await payload.destroy()
process.exit(0)
