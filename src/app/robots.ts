import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin/', '/api/graphql', '/api/graphql-playground', '/email-test'],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
