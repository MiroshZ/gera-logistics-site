import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const Routes: CollectionConfig = {
  slug: 'routes',
  labels: { singular: 'Маршрут', plural: 'Маршруты' },
  admin: { useAsTitle: 'from', defaultColumns: ['from', 'to', 'service', '_status'], group: 'Перевозки' },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'from', label: 'Откуда', type: 'text', required: true, localized: true },
    { name: 'to', label: 'Куда / регион', type: 'text', required: true, localized: true },
    { name: 'service', label: 'Формат перевозки', type: 'text', localized: true },
    { name: 'limitations', label: 'Ограничения', type: 'textarea', localized: true },
    { name: 'verifiedAt', label: 'Дата проверки', type: 'date' },
  ],
}
