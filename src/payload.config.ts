import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Terminals } from './collections/Terminals'
import { WarehouseDetails } from './collections/WarehouseDetails'
import { ContainerSpecs } from './collections/ContainerSpecs'
import { Services } from './collections/Services'
import { FleetItems } from './collections/FleetItems'
import { Routes } from './collections/Routes'
import { Tariffs } from './collections/Tariffs'
import { Leads } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { EmailSettings } from './globals/EmailSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Terminals,
    WarehouseDetails,
    ContainerSpecs,
    Services,
    FleetItems,
    Routes,
    Tariffs,
    Leads,
  ],
  globals: [SiteSettings, EmailSettings],
  localization: {
    locales: [
      { label: 'Русский', code: 'ru' },
      { label: '简体中文', code: 'zh-CN' },
    ],
    defaultLocale: 'ru',
    fallback: false,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
