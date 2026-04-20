#!/usr/bin/env node
/**
 * Extrae los PNG embebidos en base64 de los "SVG" entregados por el cliente.
 *
 * Los tres archivos public/*.svg son en realidad PNGs wrapeados en un SVG.
 * Este script los convierte en PNGs reales para usar con next/image.
 *
 * Uso: npm run logos:extract
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')

const TARGETS = [
  { in: 'logo-cbi-viale.svg', out: 'logo-cbi.png' },
  { in: 'logo-sin-fondo-cbi-viale.svg', out: 'logo-cbi-transparent.png' },
  { in: 'logo-adn-cbi-viale.svg', out: 'icon-adn.png' },
]

// Matcher tolerante a whitespace y mayúsculas en el mimetype.
const BASE64_RE = /data:image\/(png|jpe?g);base64,\s*([A-Za-z0-9+/=\s]+?)(?=["'\s)])/i

let ok = 0
let fail = 0

for (const t of TARGETS) {
  const src = path.join(PUBLIC, t.in)
  const dst = path.join(PUBLIC, t.out)

  if (!fs.existsSync(src)) {
    console.warn(`  ⚠ no existe: ${t.in} — salto`)
    fail++
    continue
  }

  const raw = fs.readFileSync(src, 'utf8')
  const m = raw.match(BASE64_RE)
  if (!m) {
    console.error(`  ✗ sin base64 embebido: ${t.in}`)
    fail++
    continue
  }

  const cleaned = m[2].replace(/\s+/g, '')
  const buf = Buffer.from(cleaned, 'base64')
  fs.writeFileSync(dst, buf)
  const kb = (buf.length / 1024).toFixed(1)
  console.log(`  ✓ ${t.in} → ${t.out} (${kb} KB)`)
  ok++
}

console.log(`\nExtraídos: ${ok} · Fallos: ${fail}`)
if (fail > 0) process.exit(1)
