import { SiteLayout } from '@/components/site/SiteLayout'

export const dynamic = 'force-dynamic'

export default function RussianSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>
}
