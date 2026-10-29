import { HomePage } from '@/components/site/HomePage'
import { SiteLayout } from '@/components/site/SiteLayout'

export const dynamic = 'force-dynamic'

export default function RootPage() {
  return <SiteLayout><HomePage /></SiteLayout>
}
