import 'dotenv/config'
import path from 'node:path'
import config from '../src/payload.config'
import { getPayload } from 'payload'
import type { Terminal } from '../src/payload-types'

const payload = await getPayload({ config: await config })

async function getOrCreateMedia(alt: string, file: string) {
  const found = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
    overrideAccess: true,
  })

  if (found.docs[0]) return Number(found.docs[0].id)

  const created = await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: { alt },
    filePath: path.resolve(process.cwd(), 'public/images', file),
  })

  return Number(created.id)
}

function toPhotoInput(photo: NonNullable<Terminal['photos']>[number]) {
  return {
    ...(photo.id ? { id: photo.id } : {}),
    image: typeof photo.image === 'object' ? photo.image.id : photo.image,
    ...(photo.caption ? { caption: photo.caption } : {}),
    ...(photo.checkedAt ? { checkedAt: photo.checkedAt } : {}),
  }
}

async function replacePhotoAt(
  terminal: Terminal,
  index: number,
  imageId: number,
  caption: string,
) {
  const photos = (terminal.photos ?? []).map(toPhotoInput)

  while (photos.length <= index) photos.push({ image: imageId, caption })
  photos[index] = { ...photos[index], image: imageId, caption }

  await payload.update({
    collection: 'terminals',
    id: terminal.id,
    locale: 'ru',
    overrideAccess: true,
    data: { photos },
  })
}

const [loadingBayId, rackingId, containerOverviewId] = await Promise.all([
  getOrCreateMedia(
    'Погрузочная зона складского терминала — обновлённое фото',
    'warehouse/loading-bay-enhanced.webp',
  ),
  getOrCreateMedia(
    'Стеллажи складского терминала — обновлённое фото',
    'warehouse/racking-enhanced.webp',
  ),
  getOrCreateMedia(
    'Площадка контейнерного терминала',
    'container/terminal-overview-enhanced.webp',
  ),
])

const terminals = await payload.find({
  collection: 'terminals',
  where: { slug: { in: ['warehouse', 'container'] } },
  locale: 'ru',
  limit: 10,
  overrideAccess: true,
})

const warehouse = terminals.docs.find((terminal) => terminal.slug === 'warehouse')
const container = terminals.docs.find((terminal) => terminal.slug === 'container')

if (warehouse) {
  await replacePhotoAt(warehouse, 0, loadingBayId, 'Погрузочная зона')
  await replacePhotoAt(warehouse, 1, rackingId, 'Стеллажи')
  console.info('Обновлены фото погрузочной зоны и стеллажей.')
} else {
  console.warn('Складской терминал не найден; его фото не обновлены.')
}

if (container) {
  await replacePhotoAt(container, 0, containerOverviewId, 'Площадка терминала')
  console.info('Обновлено фото общего вида контейнерного терминала.')
} else {
  console.warn('Контейнерный терминал не найден; его фото не обновлено.')
}

process.exit(0)
