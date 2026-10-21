import type { GlobalConfig } from 'payload'
import { hasRole } from '@/access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: { read: () => true, update: hasRole('admin', 'editor') },
  fields: [
    { name: 'companyName', label: 'Название компании', type: 'text', defaultValue: 'ГЕРА' },
    { name: 'tagline', label: 'Короткое описание', type: 'text', localized: true },
    { name: 'publicPhone', label: 'Телефон для посетителей', type: 'text' },
    { name: 'publicEmail', label: 'Почта для посетителей', type: 'email' },
    { name: 'additionalEmail', label: 'Дополнительная почта', type: 'email' },
    {
      name: 'companyDetails',
      label: 'Реквизиты компании',
      type: 'group',
      fields: [
        { name: 'legalName', label: 'Полное юридическое название', type: 'text' },
        { name: 'legalAddress', label: 'Юридический адрес', type: 'textarea' },
        { name: 'postalAddress', label: 'Почтовый адрес', type: 'textarea' },
        { name: 'directorName', label: 'Руководитель', type: 'text' },
        { name: 'inn', label: 'ИНН', type: 'text' },
        { name: 'kpp', label: 'КПП', type: 'text' },
        { name: 'ogrn', label: 'ОГРН', type: 'text' },
        { name: 'okpo', label: 'ОКПО', type: 'text' },
        { name: 'edoId', label: 'Идентификатор ЭДО', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Публичные ссылки',
      type: 'array',
      fields: [
        { name: 'label', label: 'Название', type: 'text', required: true, localized: true },
        { name: 'url', label: 'Ссылка', type: 'text', required: true },
      ],
    },
    { name: 'footerNote', label: 'Подпись в подвале', type: 'text', localized: true },
  ],
}
