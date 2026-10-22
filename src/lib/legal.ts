import type { SiteSettingsRecord } from '@/lib/content'

export const LEGAL_REVISION = '2026-10-23'
export const LEGAL_REVISION_LABEL = '23 октября 2026 года'
export const CONSENT_VERSION = LEGAL_REVISION

export function getLegalOperator(settings: SiteSettingsRecord) {
  return {
    name: settings.companyDetails?.legalName?.trim() || 'Общество с ограниченной ответственностью «Гера»',
    address: settings.companyDetails?.legalAddress?.trim() || '690054, Россия, Приморский край, г. Владивосток, ул. Заречная, д. 47, пом. 3',
    inn: settings.companyDetails?.inn?.trim() || '2543031372',
    ogrn: settings.companyDetails?.ogrn?.trim() || '1132543015527',
    email: settings.publicEmail?.trim() || 'truck.gera@mail.ru',
  }
}
