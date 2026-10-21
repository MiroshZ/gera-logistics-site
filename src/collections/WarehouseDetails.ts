import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const WarehouseDetails: CollectionConfig = {
  slug: 'warehouse-details',
  labels: { singular: 'Параметры склада', plural: 'Параметры склада' },
  admin: { useAsTitle: 'title', group: 'Объекты' },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', label: 'Внутреннее название записи', type: 'text', required: true },
    { name: 'terminal', label: 'Складской терминал', type: 'relationship', relationTo: 'terminals', required: true },
    { name: 'totalArea', label: 'Общая площадь', type: 'number', min: 0 },
    { name: 'areaUnit', label: 'Единица площади', type: 'select', options: ['м²', 'га'] },
    { name: 'totalVolume', label: 'Общий объём', type: 'number', min: 0 },
    { name: 'volumeUnit', label: 'Единица объёма', type: 'select', options: ['м³', 'л'] },
    { name: 'infrastructure', label: 'Инфраструктура', type: 'textarea', localized: true },
    {
      name: 'zones',
      label: 'Зоны хранения',
      type: 'array',
      fields: [
        { name: 'name', label: 'Название зоны', type: 'text', required: true, localized: true },
        { name: 'area', label: 'Площадь', type: 'number', min: 0 },
        { name: 'areaUnit', label: 'Единица площади', type: 'select', options: ['м²', 'га'] },
        { name: 'volume', label: 'Объём', type: 'number', min: 0 },
        { name: 'volumeUnit', label: 'Единица объёма', type: 'select', options: ['м³', 'л'] },
        { name: 'temperature', label: 'Температурные условия', type: 'text', localized: true },
        { name: 'notes', label: 'Описание и ограничения', type: 'textarea', localized: true },
        { name: 'available', label: 'Доступна для заявок', type: 'checkbox', defaultValue: true },
      ],
    },
    { name: 'verifiedAt', label: 'Дата проверки параметров', type: 'date' },
  ],
}
