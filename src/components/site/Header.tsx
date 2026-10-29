import Link from 'next/link'
import { Brand } from '@/components/site/Brand'
import { MobileNav } from '@/components/site/MobileNav'

const links = [
  { href: '/terminals', label: 'Терминалы' },
  { href: '/services', label: 'Складские услуги' },
  { href: '/transport', label: 'Автоперевозки' },
  { href: '/fleet', label: 'Автопарк' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="GERA — на главную">
        <Brand />
      </Link>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="header-cta" href="/contacts#request">
        Оставить заявку <span aria-hidden="true">↗</span>
      </Link>
      <MobileNav links={links} />
    </header>
  )
}
