import config from '@/payload.config'
import { getPayload } from 'payload'

export type PageContent = {
  slug: string
  title: string
  eyebrow?: string | null
  heroTitle?: string | null
  intro?: string | null
  seoTitle?: string | null
  seoDescription?: string | null
}

export type MediaRecord = { id: number; url?: string | null; alt?: string | null }
export type TerminalPhoto = { image?: MediaRecord | number | null; caption?: string | null }
export type TerminalRecord = {
  id?: number
  name: string
  slug: 'warehouse' | 'container' | string
  type: 'warehouse' | 'container'
  description?: string | null
  address?: { street?: string | null; city?: string | null; mapUrl?: string | null; directions?: string | null } | null
  schedule?: string | null
  contactPhone?: string | null
  contactEmail?: string | null
  photos?: TerminalPhoto[] | null
}

export type ServiceRecord = {
  id: number
  title: string
  slug: string
  category: 'warehouse' | 'container' | 'transport'
  description?: string | null
  requirements?: string | null
  sortOrder?: number | null
}

export type FleetRecord = {
  id: number
  title: string
  category?: string | null
  quantity?: number | null
  payload?: number | null
  payloadUnit?: string | null
  volume?: number | null
  volumeUnit?: string | null
  description?: string | null
  photo?: MediaRecord | number | null
}

export type RouteRecord = { id: number; from: string; to: string; service?: string | null; limitations?: string | null }
export type TariffRecord = { id: number; title: string; category: 'warehouse' | 'container' | 'transport'; amount: number; currency: string; unit: string; terms?: string | null; validFrom: string; validUntil?: string | null }
export type SiteSettingsRecord = {
  companyName?: string | null
  tagline?: string | null
  warehousePhone?: string | null
  transportPhone?: string | null
  publicPhone?: string | null
  publicEmail?: string | null
  additionalEmail?: string | null
  companyDetails?: {
    legalName?: string | null
    legalAddress?: string | null
    postalAddress?: string | null
    directorName?: string | null
    inn?: string | null
    kpp?: string | null
    ogrn?: string | null
    okpo?: string | null
    edoId?: string | null
  } | null
  socialLinks?: { label: string; url: string }[] | null
  footerNote?: string | null
}

const fallbackPages: Record<string, PageContent> = {
  home: {
    slug: 'home', title: 'Главная', eyebrow: 'ООО «ГЕРА» · ТЕРМИНАЛЫ И ПЕРЕВОЗКИ',
    heroTitle: 'Складской и контейнерный терминалы. Автоперевозки.',
    intro: 'Выберите направление и опишите задачу. Менеджер уточнит параметры груза и подготовит предложение.',
  },
  terminals: { slug: 'terminals', title: 'Терминалы', eyebrow: 'ДВА ОТДЕЛЬНЫХ ОБЪЕКТА', heroTitle: 'Терминалы для разных задач груза.', intro: 'Складской комплекс и отдельный контейнерный терминал. Возможности каждого объекта описываются отдельно.' },
  warehouse: { slug: 'warehouse', title: 'Складской терминал', eyebrow: 'СКЛАДСКОЙ ТЕРМИНАЛ', heroTitle: 'Хранение и обработка грузов.', intro: 'Расскажите, какой груз нужно принять, хранить или подготовить к отгрузке. Актуальные условия уточнит менеджер.' },
  container: { slug: 'container', title: 'Контейнерный терминал', eyebrow: 'КОНТЕЙНЕРНЫЙ ТЕРМИНАЛ', heroTitle: 'Отдельный терминал для контейнеров.', intro: 'Опишите контейнер и нужную операцию. Условия и технические возможности подтвердит сотрудник терминала.' },
  'warehouse-services': { slug: 'warehouse-services', title: 'Складские услуги', eyebrow: 'СКЛАДСКОЙ ТЕРМИНАЛ', heroTitle: 'Складские услуги под задачу.', intro: 'Состав работ и условия зависят от параметров груза. Отправьте запрос, чтобы получить актуальную информацию.' },
  transport: { slug: 'transport', title: 'Автоперевозки', eyebrow: 'АВТОМОБИЛЬНЫЕ ГРУЗОПЕРЕВОЗКИ', heroTitle: 'Перевозки на собственных седельных тягачах.', intro: 'Опишите маршрут, груз и желаемую дату. Менеджер подтвердит доступность перевозки и подходящий формат.' },
  fleet: { slug: 'fleet', title: 'Автопарк', eyebrow: 'СОБСТВЕННЫЙ АВТОПАРК', heroTitle: 'Техника для автомобильных перевозок.', intro: 'Сведения о категориях техники, параметрах и фотографиях публикуются после проверки.' },
  about: { slug: 'about', title: 'О компании', eyebrow: 'ООО «ГЕРА»', heroTitle: 'Три направления логистики.', intro: 'Складской терминал, отдельный контейнерный терминал и автомобильные грузоперевозки на собственных седельных тягачах.' },
  contacts: { slug: 'contacts', title: 'Контакты', eyebrow: 'СВЯЗЬ С КОМАНДОЙ', heroTitle: 'Опишите задачу — подскажем следующий шаг.', intro: 'Оставьте заявку с контактным телефоном или email. Менеджер свяжется с вами по указанному каналу.' },
}

async function getPayloadClient() {
  try {
    return await getPayload({ config: await config })
  } catch {
    return null
  }
}

export async function getPage(slug: string): Promise<PageContent> {
  const fallback = fallbackPages[slug] ?? { slug, title: 'ГЕРА', heroTitle: 'Логистические услуги для бизнеса.' }
  const payload = await getPayloadClient()
  if (!payload) return fallback
  try {
    const result = await payload.find({
      collection: 'pages',
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
      locale: 'ru',
      fallbackLocale: false,
      limit: 1,
      overrideAccess: false,
    })
    return result.docs[0] ? { ...fallback, ...(result.docs[0] as unknown as PageContent) } : fallback
  } catch {
    return fallback
  }
}

export async function getTerminals(): Promise<TerminalRecord[]> {
  const fallback: TerminalRecord[] = [
    { name: 'Складской терминал', slug: 'warehouse', type: 'warehouse', description: 'Складское хранение и обработка грузов.' },
    { name: 'Контейнерный терминал', slug: 'container', type: 'container', description: 'Отдельный объект для работы с контейнерами.' },
  ]
  const payload = await getPayloadClient()
  if (!payload) return fallback
  try {
    const result = await payload.find({ collection: 'terminals', where: { _status: { equals: 'published' } }, locale: 'ru', fallbackLocale: false, limit: 20, depth: 2, overrideAccess: false })
    return result.docs.length ? result.docs as unknown as TerminalRecord[] : fallback
  } catch { return fallback }
}

export async function getTerminal(slug: string): Promise<TerminalRecord | null> {
  const terminals = await getTerminals()
  return terminals.find((terminal) => terminal.slug === slug) ?? null
}

export async function getWarehouseDetails(terminalId?: number) {
  const payload = await getPayloadClient()
  if (!payload || !terminalId) return null
  try {
    const result = await payload.find({ collection: 'warehouse-details', where: { and: [{ terminal: { equals: terminalId } }, { _status: { equals: 'published' } }] }, locale: 'ru', fallbackLocale: false, limit: 1, overrideAccess: false })
    return result.docs[0] as unknown as { totalArea?: number; areaUnit?: string; totalVolume?: number; volumeUnit?: string; infrastructure?: string; zones?: { name?: string; area?: number; areaUnit?: string; volume?: number; volumeUnit?: string; temperature?: string; notes?: string }[] } | undefined
  } catch { return null }
}

export async function getContainerSpecs(terminalId?: number) {
  const payload = await getPayloadClient()
  if (!payload || !terminalId) return null
  try {
    const result = await payload.find({ collection: 'container-specs', where: { and: [{ terminal: { equals: terminalId } }, { _status: { equals: 'published' } }] }, locale: 'ru', fallbackLocale: false, limit: 1, overrideAccess: false })
    return result.docs[0] as unknown as { operations?: { name?: string }[]; containerTypes?: string; equipment?: string; limitations?: string } | undefined
  } catch { return null }
}

export async function getServices(category: ServiceRecord['category']): Promise<ServiceRecord[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const result = await payload.find({ collection: 'services', where: { and: [{ category: { equals: category } }, { _status: { equals: 'published' } }] }, locale: 'ru', fallbackLocale: false, limit: 40, sort: 'sortOrder', depth: 1, overrideAccess: false })
    return result.docs as unknown as ServiceRecord[]
  } catch { return [] }
}

export async function getFleet(): Promise<FleetRecord[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const result = await payload.find({ collection: 'fleet-items', where: { _status: { equals: 'published' } }, locale: 'ru', fallbackLocale: false, limit: 40, depth: 1, overrideAccess: false })
    return result.docs as unknown as FleetRecord[]
  } catch { return [] }
}

export async function getRoutes(): Promise<RouteRecord[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const result = await payload.find({ collection: 'routes', where: { _status: { equals: 'published' } }, locale: 'ru', fallbackLocale: false, limit: 40, overrideAccess: false })
    return result.docs as unknown as RouteRecord[]
  } catch { return [] }
}

export async function getPublicTariffs(category?: TariffRecord['category']): Promise<TariffRecord[]> {
  const payload = await getPayloadClient()
  if (!payload) return []
  try {
    const today = new Date().toISOString().slice(0, 10)
    const result = await payload.find({
      collection: 'tariffs',
      where: { and: [{ _status: { equals: 'published' } }, { publiclyVisible: { equals: true } }, { validFrom: { less_than_equal: today } }, ...(category ? [{ category: { equals: category } }] : [])] },
      locale: 'ru', fallbackLocale: false, limit: 40, overrideAccess: false,
    })
    return (result.docs as unknown as TariffRecord[]).filter((tariff) => !tariff.validUntil || tariff.validUntil.slice(0, 10) >= today)
  } catch { return [] }
}

export async function getSiteSettings(): Promise<SiteSettingsRecord> {
  const fallback: SiteSettingsRecord = { companyName: 'ГЕРА', tagline: 'Терминалы и перевозки для бизнеса' }
  const payload = await getPayloadClient()
  if (!payload) return fallback
  try {
    const result = await payload.findGlobal({ slug: 'site-settings', locale: 'ru', fallbackLocale: false, overrideAccess: false })
    return { ...fallback, ...result } as SiteSettingsRecord
  } catch { return fallback }
}
