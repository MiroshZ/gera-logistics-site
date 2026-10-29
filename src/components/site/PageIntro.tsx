import Link from 'next/link'
import type { PageContent } from '@/lib/content'

export function PageIntro({ page, action = true }: { page: PageContent; action?: boolean }) {
  return (
    <section className="page-intro">
      <div className="page-intro__copy">
        <p className="eyebrow"><span className="eyebrow__dot" />{page.eyebrow || 'ООО «ГЕРА» · ТЕРМИНАЛЫ И ПЕРЕВОЗКИ'}</p>
        <h1>{page.heroTitle || page.title}</h1>
        {page.intro ? <p className="page-intro__lead">{page.intro}</p> : null}
        {action ? <Link className="button button--dark" href="/contacts#request">Обсудить задачу <span aria-hidden="true">↗</span></Link> : null}
      </div>
      <div className="page-intro__aside" aria-hidden="true">
        <span className="page-intro__aside-index">ГЕРА / 01</span>
        <span className="page-intro__aside-rule" />
        <span className="page-intro__aside-note">ТЕРМИНАЛЬНАЯ<br />ИНФРАСТРУКТУРА<br />И ПЕРЕВОЗКИ</span>
      </div>
    </section>
  )
}
