import 'dotenv/config'
import path from 'node:path'
import config from '../src/payload.config'
import { getPayload } from 'payload'
import type { Page, SiteSetting, Terminal } from '../src/payload-types'

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

const containerPhotoSpecs = [
  { alt: 'Ричстакер и площадка контейнерного терминала', file: 'terminal-overview.webp', caption: 'Площадка терминала' },
  { alt: 'Работа на площадке контейнерного терминала', file: 'workyard.webp', caption: 'Работа на площадке' },
  { alt: 'Малые погрузчики на территории терминала', file: 'forklifts.webp', caption: 'Погрузчики' },
  { alt: 'Кран на территории терминала', file: 'crane.webp', caption: 'Подъёмная техника' },
]
const containerMediaRecords: { id: number; caption: string }[] = []

for (const item of containerPhotoSpecs) {
  const found = await payload.find({ collection: 'media', where: { alt: { equals: item.alt } }, limit: 1, overrideAccess: true })
  const record = found.docs[0] || await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: { alt: item.alt },
    filePath: path.resolve(process.cwd(), 'public/images/container', item.file),
  })
  containerMediaRecords.push({ id: Number(record.id), caption: item.caption })
}

const terminalSpecs = [
  { name: 'Складской терминал', slug: 'warehouse', type: 'warehouse', description: 'Складское хранение и обработка грузов.', address: { street: 'ул. Заречная, д. 47, пом. 3', city: '690054, Приморский край, г. Владивосток' }, contactPhone: '8-914-690-07-20', contactEmail: 'truck.gera@mail.ru', photos: mediaRecords.map((media) => ({ image: media.id, caption: media.caption })) },
  { name: 'Контейнерный терминал', slug: 'container', type: 'container', description: 'Отдельный объект компании, предназначенный только для работы с контейнерами.', photos: containerMediaRecords.map((media) => ({ image: media.id, caption: media.caption })) },
] satisfies Pick<Terminal, 'name' | 'slug' | 'type' | 'description' | 'photos' | 'address' | 'contactPhone' | 'contactEmail'>[]

for (const terminal of terminalSpecs) {
  const found = await payload.find({ collection: 'terminals', where: { slug: { equals: terminal.slug } }, limit: 1, overrideAccess: true })
  if (!found.docs.length) {
    await payload.create({ collection: 'terminals', locale: 'ru', overrideAccess: true, data: { ...terminal, _status: 'published' } })
    console.info(`Создан терминал: ${terminal.name}`)
  } else {
    const existing = found.docs[0]
    const update: Partial<Terminal> = {}
    if (terminal.photos?.length && !existing.photos?.length) update.photos = terminal.photos
    if (terminal.slug === 'warehouse') {
      const address = existing.address ?? {}
      if (!address.street || !address.city) update.address = { ...address, ...terminal.address }
      if (!existing.contactPhone) update.contactPhone = terminal.contactPhone
      if (!existing.contactEmail) update.contactEmail = terminal.contactEmail
    }
    if (Object.keys(update).length) {
      await payload.update({ collection: 'terminals', id: existing.id, locale: 'ru', overrideAccess: true, data: update })
      console.info(`Обновлены данные терминала: ${terminal.name}`)
    }
  }
}

const siteSettings = await payload.findGlobal({ slug: 'site-settings', locale: 'ru', overrideAccess: true })
const companyDetailsDefaults = {
  legalName: 'Общество с ограниченной ответственностью «Гера»',
  legalAddress: '690054, Россия, Приморский край, г. Владивосток, ул. Заречная, д. 47, пом. 3',
  postalAddress: '690021, Россия, Приморский край, г. Владивосток, ул. Запорожская, д. 77, блок 840',
  directorName: 'Корец Юрий Павлович',
  inn: '2543031372',
  ogrn: '1132543015527',
  okpo: '28806130',
  edoId: '2AE134BEA92-DCE7-4CCE-89DA-F620B7D08BEC',
} satisfies NonNullable<SiteSetting['companyDetails']>
const currentCompanyDetails = siteSettings.companyDetails ?? {}
const companyDetailsToSave = Object.fromEntries(
  Object.entries(companyDetailsDefaults).filter(([key]) => !currentCompanyDetails[key as keyof typeof companyDetailsDefaults]),
) as NonNullable<SiteSetting['companyDetails']>
const settingsUpdate: Partial<SiteSetting> = {}
if (!siteSettings.companyName) settingsUpdate.companyName = 'ГЕРА'
if (!siteSettings.tagline) settingsUpdate.tagline = 'Терминалы и перевозки для бизнеса'
if (!siteSettings.warehousePhone) settingsUpdate.warehousePhone = siteSettings.publicPhone || '8-914-690-07-20'
if (!siteSettings.publicPhone) settingsUpdate.publicPhone = '8-914-690-07-20'
if (!siteSettings.publicEmail) settingsUpdate.publicEmail = 'truck.gera@mail.ru'
if (!siteSettings.additionalEmail) settingsUpdate.additionalEmail = '4232708800@mail.ru'
if (Object.keys(companyDetailsToSave).length) settingsUpdate.companyDetails = { ...currentCompanyDetails, ...companyDetailsToSave }
if (Object.keys(settingsUpdate).length) {
  await payload.updateGlobal({ slug: 'site-settings', locale: 'ru', overrideAccess: true, data: settingsUpdate })
}

console.info('Локальный контент подготовлен. Тарифы, маршруты, характеристики контейнерного терминала и режим работы не заполнены без подтверждения.')
await payload.destroy()
process.exit(0)
