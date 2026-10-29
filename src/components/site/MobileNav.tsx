'use client'

import { useRef } from 'react'
import Link from 'next/link'

type MobileNavLink = {
  href: string
  label: string
}

export function MobileNav({ links }: { links: MobileNavLink[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const closeMenu = () => {
    if (detailsRef.current) detailsRef.current.open = false
  }

  return (
    <details ref={detailsRef} className="mobile-nav">
      <summary aria-label="Открыть меню"><span className="menu-icon" aria-hidden="true"><i /><i /></span></summary>
      <nav aria-label="Мобильная навигация">
        {links.map((link) => <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}</Link>)}
        <Link className="mobile-nav__cta" href="/contacts#request" onClick={closeMenu}>Оставить заявку <span aria-hidden="true">↗</span></Link>
      </nav>
    </details>
  )
}
