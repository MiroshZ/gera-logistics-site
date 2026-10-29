import type { Metadata } from 'next'

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const siteUrl = new URL(new URL(configuredSiteUrl).origin)

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  }
}
