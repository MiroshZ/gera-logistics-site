import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Страница', plural: 'Страницы сайта' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: publishedOrAuthenticated,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  fields: [
    {
      name: 'slug',
      label: 'Раздел сайта',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Главная', value: 'home' },
        { label: 'Терминалы', value: 'terminals' },
        { label: 'Складской терминал', value: 'warehouse' },
        { label: 'Контейнерный терминал', value: 'container' },
        { label: 'Складские услуги', value: 'warehouse-services' },
        { label: 'Автоперевозки', value: 'transport' },
        { label: 'Автопарк', value: 'fleet' },
        { label: 'О компании', value: 'about' },
        { label: 'Контакты', value: 'contacts' },
      ],
    },
    { name: 'title', label: 'Название', type: 'text', required: true, localized: true },
    { name: 'eyebrow', label: 'Надзаголовок', type: 'text', localized: true },
    { name: 'heroTitle', label: 'Заголовок первого экрана', type: 'text', localized: true },
    { name: 'intro', label: 'Короткое описание', type: 'textarea', localized: true },
    { name: 'seoTitle', label: 'SEO-заголовок', type: 'text', localized: true },
    { name: 'seoDescription', label: 'SEO-описание', type: 'textarea', localized: true },
  ],
}
