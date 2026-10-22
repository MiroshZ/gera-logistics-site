import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { ScrollReveal } from '@/components/site/ScrollReveal'
import { getSiteSettings, getTerminals } from '@/lib/content'

export async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, terminals] = await Promise.all([getSiteSettings(), getTerminals()])
  const warehousePhone = settings.warehousePhone || terminals.find((terminal) => terminal.slug === 'warehouse')?.contactPhone
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <Header />
      <div id="main">{children}</div>
      <ScrollReveal />
      <Footer settings={{ ...settings, warehousePhone }} />
    </>
  )
}
