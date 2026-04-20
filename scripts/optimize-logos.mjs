#!/usr/bin/env node
/**
 * Optimiza los PNGs extraídos por extract-logos.mjs.
 *
 * - Redimensiona el ícono ADN a 512px (venía a 2174px, 2.3 MB).
 * - Recomprime los logos a PNG optimizado.
 * - Genera favicon.ico derivado del logo-transparent.
 *
 * Requiere sharp — se corre después de `npm install`.
 * Uso: node scripts/optimize-logos.mjs
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '..', 'public')

async function optimize() {
  // Ícono ADN — bajar a 512px PNG + variante 1024.
  const iconSrc = path.join(PUBLIC, 'icon-adn.png')
  if (await exists(iconSrc)) {
    await sharp(iconSrc)
      .resize({ width: 512, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(PUBLIC, 'icon-adn-512.png'))
    await sharp(iconSrc)
      .resize({ width: 1024, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC, 'icon-adn-1024.png'))
    console.log('  ✓ icon-adn → 512 + 1024')
  }

  // Logo CBI (con fondo blanco) — recomprimir.
  const logoSrc = path.join(PUBLIC, 'logo-cbi.png')
  if (await exists(logoSrc)) {
    await sharp(logoSrc)
      .resize({ width: 800, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC, 'logo-cbi-800.png'))
    console.log('  ✓ logo-cbi → 800')
  }

  // Logo transparente — recomprimir + generar favicon a 32 y apple a 180.
  const logoTr = path.join(PUBLIC, 'logo-cbi-transparent.png')
  if (await exists(logoTr)) {
    await sharp(logoTr)
      .resize({ width: 800, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLIC, 'logo-cbi-transparent-800.png'))
    // favicon 32 PNG (si se quiere .ico se convierte luego)
    await sharp(logoTr)
      .resize({ width: 64, height: 64, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC, 'favicon-64.png'))
    // apple touch 180
    await sharp(logoTr)
      .resize({
        width: 180,
        height: 180,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(path.join(PUBLIC, 'apple-touch-icon.png'))
    console.log('  ✓ logo-transparent → 800 + favicon + apple-touch-icon')
  }

  console.log('\n✅ Optimización completada.')
}

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

optimize().catch((err) => {
  console.error(err)
  process.exit(1)
})
