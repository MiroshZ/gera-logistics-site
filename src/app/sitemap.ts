import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

const publicPages = [
  '/',
  '/services',
  '/fleet',
  '/contacts',
  '/about',
  '/terminals',
  '/terminals/warehouse',
  '/terminals/container',
  '/transport',
  '/privacy',
  '/consent',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((path) => ({ url: new URL(path, siteUrl).toString() }))
}
