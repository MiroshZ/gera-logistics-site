import React from 'react'
import type { Metadata } from 'next'
import { siteUrl } from '@/lib/seo'
import './styles.css'

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim()

export const metadata: Metadata = {
  metadataBase: siteUrl,
  description: 'Складской терминал, отдельный контейнерный терминал и автомобильные грузоперевозки ООО «ГЕРА».',
  title: {
    default: 'Терминалы и автоперевозки для бизнеса',
    template: '%s | ГЕРА',
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
}
