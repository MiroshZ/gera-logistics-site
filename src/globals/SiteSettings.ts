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
