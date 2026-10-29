import type { TerminalRecord } from '@/lib/content'

export type DisplayPhoto = { src: string; alt: string; caption: string }

const containerFallbackPhotos: DisplayPhoto[] = [
  { src: '/images/container/reachstacker.webp', alt: 'Ричстакер на контейнерном терминале', caption: 'Ричстакер' },
  { src: '/images/container/small-forklifts.webp', alt: 'Малые погрузчики на контейнерном терминале', caption: 'Погрузчики' },
  { src: '/images/container/crane.webp', alt: 'Кран на территории терминала', caption: 'Подъёмная техника' },
]

export function getContainerPhotos(terminal?: TerminalRecord | null): DisplayPhoto[] {
  const publishedPhotos = terminal?.photos?.flatMap((item) => {
    const image = typeof item.image === 'object' ? item.image : null
    if (!image?.url) return []
    return [{
      src: image.url,
      alt: image.alt || item.caption || 'Контейнерный терминал',
      caption: item.caption || image.alt || 'Контейнерный терминал',
    }]
  }) ?? []

  return publishedPhotos.length ? publishedPhotos : containerFallbackPhotos
}
