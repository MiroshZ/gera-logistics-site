'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const revealTargets = [
  '.section-heading',
  '.direction-card',
  '.process-section__title',
  '.process-steps > article',
  '.photo-story__image',
  '.photo-story__copy',
  '.photo-story__index',
  '.last-cta > div',
  '.terminal-detail-overview > *',
  '.container-page-hero',
  '.service-row',
  '.tariff-list > article',
  '.route-list > article',
  '.fleet-card',
  '.about-manifesto',
  '.about-principles > article',
  '.contact-overview > *',
  '.contact-details > a',
  '.request-section__intro',
  '.request-section .lead-form',
  '.empty-state',
  '.legal-document > section',
].join(',')

export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealTargets))
    if (elements.length === 0) return

    document.documentElement.classList.add('motion-enhanced')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })

    const revealOrder = new Map<Element, number>()
    elements.forEach((element) => {
      element.dataset.scrollReveal = ''

      const group = element.parentElement ?? element
      const order = revealOrder.get(group) ?? 0
      revealOrder.set(group, order + 1)
      element.style.setProperty('--reveal-delay', `${Math.min(order, 3) * 85}ms`)

      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add('is-visible')
      } else {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
