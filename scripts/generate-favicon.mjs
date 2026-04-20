#!/usr/bin/env node
/**
 * Genera favicons nítidos desde el ícono ADN + fondo beige editorial.
 * Produce: favicon-16.png, favicon-32.png, favicon-64.png, favicon-180.png (apple-touch)
 *
 * Uso: node scripts/generate-favicon.mjs
 */

import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '..', 'public')

// Ícono de origen — el ADN helix recortado
const SRC = path.join(PUBLIC, 'icon-adn-512.png')

// Fondo beige sólido con el dorado del brand
const BG = { r: 245, g: 240, b: 232, alpha: 1 }

async function makeSquare(size, outName, opts = {}) {
  const padded = Math.round(size * 0.12) // 12% padding interno
  const iconSize = size - padded * 2

  // Extrae el ícono como buffer
  const icon = await sharp(SRC)
    .resize(iconSize, iconSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: opts.transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : BG,
    },
  })
    .composite([{ input: icon, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, outName))

  console.log(`  ✓ ${outName} (${size}x${size})`)
}

async function run() {
  await makeSquare(16, 'favicon-16.png')
  await makeSquare(32, 'favicon-32.png')
  await makeSquare(64, 'favicon-64.png')
  // Apple touch icon — sin fondo transparente (iOS no lo respeta) y redondeado por iOS auto
  await makeSquare(180, 'apple-touch-icon.png')

  // Optional: una versión transparente para contextos oscuros
  await makeSquare(512, 'icon-adn-solid-bg.png')

  console.log('\n✅ Favicons generados.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
