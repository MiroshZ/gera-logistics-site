import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const FleetItems: CollectionConfig = {
  slug: 'fleet-items',
  labels: { singular: 'Категория техники', plural: 'Автопарк' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', '_status'], group: 'Перевозки' },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', label: 'Категория техники', type: 'text', required: true, localized: true },
    { name: 'category', label: 'Тип тягача / полуприцепа', type: 'text', localized: true },
    { name: 'quantity', label: 'Количество единиц', type: 'number', min: 0 },
    { name: 'payload', label: 'Допустимая масса груза', type: 'number', min: 0 },
    { name: 'payloadUnit', label: 'Единица массы', type: 'select', options: ['кг', 'т'] },
    { name: 'volume', label: 'Объём', type: 'number', min: 0 },
    { name: 'volumeUnit', label: 'Единица объёма', type: 'select', options: ['м³', 'л'] },
    { name: 'description', label: 'Описание и ограничения', type: 'textarea', localized: true },
    { name: 'photo', label: 'Фото собственной техники', type: 'upload', relationTo: 'media' },
    { name: 'verifiedAt', label: 'Дата проверки', type: 'date' },
  ],
}
