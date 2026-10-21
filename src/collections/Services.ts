import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Услуга', plural: 'Услуги' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', '_status'], group: 'Контент' },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'title', label: 'Название', type: 'text', required: true, localized: true },
    { name: 'slug', label: 'Короткий адрес', type: 'text', required: true, unique: true },
    {
      name: 'category',
      label: 'Направление',
      type: 'select',
      required: true,
      options: [
        { label: 'Складской терминал', value: 'warehouse' },
        { label: 'Контейнерный терминал', value: 'container' },
        { label: 'Автоперевозки', value: 'transport' },
      ],
    },
    { name: 'terminal', label: 'Терминал', type: 'relationship', relationTo: 'terminals' },
    { name: 'description', label: 'Описание', type: 'textarea', localized: true },
    { name: 'requirements', label: 'Что сообщить для расчёта', type: 'textarea', localized: true },
    { name: 'image', label: 'Фото', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', label: 'Порядок показа', type: 'number', defaultValue: 0 },
  ],
}
