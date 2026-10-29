import { HomePage } from '@/components/site/HomePage'
import { SiteLayout } from '@/components/site/SiteLayout'
import { createPageMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'
export const metadata = createPageMetadata({
  title: 'Складской терминал, контейнерный терминал и автоперевозки',
  description: 'ООО «ГЕРА»: складской и отдельный контейнерный терминалы, автомобильные грузоперевозки на собственных седельных тягачах. Условия уточняются по задаче.',
  path: '/',
})

export default function RootPage() {
  return <SiteLayout><HomePage /></SiteLayout>
}
