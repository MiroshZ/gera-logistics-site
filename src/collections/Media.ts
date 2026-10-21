import type { CollectionConfig } from 'payload'
import { hasRole } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Файл', plural: 'Медиатека' },
  admin: { useAsTitle: 'alt', group: 'Контент' },
  access: {
    read: () => true,
    create: hasRole('admin', 'editor'),
    update: hasRole('admin', 'editor'),
    delete: hasRole('admin'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    imageSizes: [
      { name: 'card', width: 960, height: 720, fit: 'cover' },
      { name: 'thumbnail', width: 420, height: 320, fit: 'cover' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
