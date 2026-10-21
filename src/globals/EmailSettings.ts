import type { GlobalConfig } from 'payload'
import { hasRole } from '@/access/roles'

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: 'Уведомления по email',
  access: { read: hasRole('admin'), update: hasRole('admin') },
  fields: [
    { name: 'recipientEmail', label: 'Куда отправлять заявки', type: 'email', required: true },
    { name: 'lastTestedAt', label: 'Последняя проверка', type: 'date', admin: { readOnly: true } },
    { name: 'lastTestStatus', label: 'Результат проверки', type: 'text', admin: { readOnly: true } },
  ],
}
