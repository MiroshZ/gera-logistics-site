import type { CollectionConfig } from 'payload'
import { hasRole, hasRoleField } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Сотрудник', plural: 'Сотрудники' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
    group: 'Доступ',
  },
  auth: { maxLoginAttempts: 5, lockTime: 10 * 60 * 1000 },
  access: {
    read: hasRole('admin'),
    create: hasRole('admin'),
    update: hasRole('admin'),
    delete: hasRole('admin'),
  },
  fields: [
    { name: 'name', label: 'Имя', type: 'text', required: true },
    {
      name: 'role',
      label: 'Роль',
      type: 'select',
      required: true,
      defaultValue: 'manager',
      saveToJWT: true,
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Редактор', value: 'editor' },
        { label: 'Менеджер заявок', value: 'manager' },
      ],
      access: { update: hasRoleField('admin') },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && !req.user) {
          const users = await req.payload.count({ collection: 'users' })
          data.role = users.totalDocs === 0 ? 'admin' : 'manager'
        }
        return data
      },
    ],
  },
}
