import 'dotenv/config'
import path from 'node:path'
import config from '../src/payload.config'
import { getPayload } from 'payload'

const payload = await getPayload({ config: await config })

const replacements = [
  {
    index: 1,
    alt: 'Ричстакер на контейнерном терминале',
    caption: 'Ричстакер',
    file: 'reachstacker.webp',
  },
  {
    index: 2,
    alt: 'Малые погрузчики на контейнерном терминале',
    caption: 'Погрузчики',
    file: 'small-forklifts.webp',
  },
] as const

const mediaIds = new Map<number, number>()

for (const replacement of replacements) {
  const found = await payload.find({
    collection: 'media',
    where: { alt: { equals: replacement.alt } },
    limit: 1,
    overrideAccess: true,
  })

  const media = found.docs[0] || await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: { alt: replacement.alt },
    filePath: path.resolve(process.cwd(), 'public/images/container', replacement.file),
  })

  mediaIds.set(replacement.index, Number(media.id))
}

const foundTerminals = await payload.find({
  collection: 'terminals',
  where: { slug: { equals: 'container' } },
  locale: 'ru',
  limit: 1,
  depth: 1,
  overrideAccess: true,
})

const terminal = foundTerminals.docs[0]
if (!terminal) throw new Error('Не найден контейнерный терминал в Payload CMS.')
if (!terminal.photos || terminal.photos.length < 3) {
  throw new Error(`В галерее терминала найдено меньше трёх фото (${terminal.photos?.length ?? 0}).`)
}

const photos = terminal.photos.map((photo, index) => {
  const imageId = typeof photo.image === 'object' && photo.image ? photo.image.id : photo.image
  const replacement = replacements.find((item) => item.index === index)

  return {
    image: replacement ? mediaIds.get(index) : imageId,
    caption: replacement?.caption ?? photo.caption ?? undefined,
    checkedAt: photo.checkedAt ?? undefined,
  }
})

await payload.update({
  collection: 'terminals',
  id: terminal.id,
  locale: 'ru',
  overrideAccess: true,
  data: { photos },
})

console.info('Обновлены фотографии терминала №2 и №3.')
await payload.destroy()
