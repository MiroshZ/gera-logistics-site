import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { getSiteSettings } from '@/lib/content'

export async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <Header />
      <div id="main">{children}</div>
      <Footer settings={settings} />
    </>
  )
}
