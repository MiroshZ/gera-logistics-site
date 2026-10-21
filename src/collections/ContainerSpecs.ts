import type { CollectionConfig } from 'payload'
import { hasRole, publishedOrAuthenticated } from '@/access/roles'

export const ContainerSpecs: CollectionConfig = {
  slug: 'container-specs',
  labels: { singular: 'Параметры контейнерного терминала', plural: 'Параметры контейнерного терминала' },
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
    { name: 'terminal', label: 'Контейнерный терминал', type: 'relationship', relationTo: 'terminals', required: true },
    {
      name: 'operations',
      label: 'Подтверждённые операции',
      type: 'array',
      fields: [{ name: 'name', label: 'Операция', type: 'text', required: true, localized: true }],
    },
    { name: 'containerTypes', label: 'Принимаемые типы контейнеров', type: 'textarea', localized: true },
    { name: 'equipment', label: 'Оборудование', type: 'textarea', localized: true },
    { name: 'limitations', label: 'Ограничения и условия', type: 'textarea', localized: true },
    { name: 'verifiedAt', label: 'Дата проверки параметров', type: 'date' },
  ],
}
