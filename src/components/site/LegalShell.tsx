import Link from 'next/link'
import type { ReactNode } from 'react'
import { LEGAL_REVISION, LEGAL_REVISION_LABEL } from '@/lib/legal'

const documents = [
  { href: '/ru/privacy', label: 'Политика обработки данных' },
  { href: '/ru/consent', label: 'Согласие на обработку данных' },
  { href: '/ru/terms', label: 'Использование сайта' },
] as const

export function LegalShell({ current, title, lead, children }: { current: string; title: string; lead: string; children: ReactNode }) {
  return (
    <main className="site-page inner-page">
      <section className="page-intro page-intro--simple legal-hero">
        <div className="page-intro__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />ДОКУМЕНТЫ САЙТА</p>
          <h1>{title}</h1>
          <p className="page-intro__lead">{lead}</p>
          <p className="legal-revision">Редакция от <time dateTime={LEGAL_REVISION}>{LEGAL_REVISION_LABEL}</time></p>
        </div>
      </section>
      <div className="legal-layout">
        <nav className="legal-nav" aria-label="Юридические документы">
          {documents.map((document) => <Link key={document.href} href={document.href} aria-current={current === document.href ? 'page' : undefined}>{document.label}<span aria-hidden="true">↗</span></Link>)}
        </nav>
        <article className="legal-document">{children}</article>
      </div>
    </main>
  )
}
