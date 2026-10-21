import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const Terminals: CollectionConfig = {
  slug: 'terminals',
  labels: { singular: 'Терминал', plural: 'Терминалы' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'address', '_status'],
    group: 'Объекты',
  },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    { name: 'name', label: 'Название', type: 'text', required: true, localized: true },
    {
      name: 'type',
      label: 'Тип объекта',
      type: 'select',
      required: true,
      options: [
        { label: 'Складской терминал', value: 'warehouse' },
        { label: 'Контейнерный терминал', value: 'container' },
      ],
    },
    { name: 'slug', label: 'Короткий идентификатор', type: 'text', required: true, unique: true, index: true },
    { name: 'description', label: 'Описание', type: 'textarea', localized: true },
    {
      name: 'address',
      label: 'Адрес и расположение',
      type: 'group',
      fields: [
        { name: 'street', label: 'Адрес', type: 'text', localized: true },
        { name: 'city', label: 'Город / район', type: 'text', localized: true },
        { name: 'mapUrl', label: 'Ссылка на карту', type: 'text' },
        { name: 'directions', label: 'Как добраться', type: 'textarea', localized: true },
      ],
    },
    { name: 'schedule', label: 'Режим работы', type: 'textarea', localized: true },
    { name: 'contactPhone', label: 'Телефон терминала', type: 'text' },
    { name: 'contactEmail', label: 'Почта терминала', type: 'email' },
    {
      name: 'photos',
      label: 'Фотографии объекта',
      type: 'array',
      fields: [
        { name: 'image', label: 'Фото', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Подпись', type: 'text', localized: true },
        { name: 'checkedAt', label: 'Дата проверки фото', type: 'date' },
      ],
    },
  ],
}
