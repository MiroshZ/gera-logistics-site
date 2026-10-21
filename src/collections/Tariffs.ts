import type { CollectionConfig } from 'payload'
import { hasRole, publicTariffsOrStaff } from '@/access/roles'

export const Tariffs: CollectionConfig = {
  slug: 'tariffs',
  labels: { singular: 'Тариф', plural: 'Тарифы' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'amount', 'currency', 'publiclyVisible', '_status'], group: 'Тарифы' },
  access: {
    read: publicTariffsOrStaff,
    create: hasRole('admin'),
    update: hasRole('admin'),
    delete: hasRole('admin'),
  },
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    { name: 'title', label: 'Услуга', type: 'text', required: true, localized: true },
    { name: 'category', label: 'Направление', type: 'select', required: true, options: [{ label: 'Складской терминал', value: 'warehouse' }, { label: 'Контейнерный терминал', value: 'container' }, { label: 'Автоперевозки', value: 'transport' }] },
    { name: 'service', label: 'Связанная услуга', type: 'relationship', relationTo: 'services' },
    { name: 'amount', label: 'Ставка', type: 'number', min: 0, required: true },
    { name: 'currency', label: 'Валюта', type: 'select', options: ['RUB', 'CNY', 'USD'], required: true, defaultValue: 'RUB' },
    { name: 'unit', label: 'Единица расчёта', type: 'text', required: true, localized: true },
    { name: 'terms', label: 'Условия', type: 'textarea', localized: true },
    { name: 'validFrom', label: 'Действует с', type: 'date', required: true },
    { name: 'validUntil', label: 'Действует до', type: 'date' },
    { name: 'publiclyVisible', label: 'Разрешён публичный показ', type: 'checkbox', defaultValue: false },
    { name: 'verifiedAt', label: 'Дата проверки', type: 'date' },
  ],
}
