import Link from 'next/link'
import { Brand } from '@/components/site/Brand'

const links = [
  { href: '/ru/terminals', label: 'Терминалы' },
  { href: '/ru/services', label: 'Складские услуги' },
  { href: '/ru/transport', label: 'Автоперевозки' },
  { href: '/ru/fleet', label: 'Автопарк' },
  { href: '/ru/about', label: 'О компании' },
  { href: '/ru/contacts', label: 'Контакты' },
]

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/ru" aria-label="GERA — на главную">
        <Brand />
      </Link>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/ru/contacts#request">
        Оставить заявку <span aria-hidden="true">↗</span>
      </Link>
      <details className="mobile-nav">
        <summary aria-label="Открыть меню"><span className="menu-icon" aria-hidden="true"><i /><i /></span></summary>
        <nav aria-label="Мобильная навигация">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link className="mobile-nav__cta" href="/ru/contacts#request">Оставить заявку <span aria-hidden="true">↗</span></Link>
        </nav>
      </details>
    </header>
  )
}
