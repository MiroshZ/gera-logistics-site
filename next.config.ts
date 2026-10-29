import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/ru', destination: '/', permanent: true },
      { source: '/ru/admin/email-test', destination: '/email-test', permanent: true },
      { source: '/ru/:path*', destination: '/:path*', permanent: true },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/services', destination: '/ru/services' },
        { source: '/fleet', destination: '/ru/fleet' },
        { source: '/contacts', destination: '/ru/contacts' },
        { source: '/privacy', destination: '/ru/privacy' },
        { source: '/consent', destination: '/ru/consent' },
        { source: '/terms', destination: '/ru/terms' },
        { source: '/about', destination: '/ru/about' },
        { source: '/terminals', destination: '/ru/terminals' },
        { source: '/terminals/:path*', destination: '/ru/terminals/:path*' },
        { source: '/transport', destination: '/ru/transport' },
        { source: '/email-test', destination: '/ru/admin/email-test' },
      ],
    }
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/warehouse/**',
      },
      {
        pathname: '/images/container/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
