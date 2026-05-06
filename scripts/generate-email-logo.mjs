// @ts-check
/**
 * Genera el logo de los emails CBI en dos formatos:
 *  - PNG en `public/email-logo-cbi-viale.png` (para hosting público / debug)
 *  - Base64 en `cbi_viale_back/src/emails/templates/components/logo.ts`
 *    (lo que efectivamente se embebe en cada email enviado)
 *
 * El base64 garantiza que el logo aparece en cualquier cliente (Gmail, Outlook,
 * móvil) sin depender de URLs externas o resolución de localhost.
 *
 * Re-ejecutar cuando cambie el SVG fuente:
 *   node scripts/generate-email-logo.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SVG_PATH = resolve(ROOT, 'public/logo-sin-fondo-cbi-viale.svg')
const PNG_PATH = resolve(ROOT, 'public/email-logo-cbi-viale.png')
const TS_PATH = resolve(
  ROOT,
  '..',
  'cbi_viale_back/src/emails/templates/components/logo.ts',
)

async function main() {
  const svg = readFileSync(SVG_PATH)

  const pngBuffer = await sharp(svg, { density: 192 })
    .resize({ width: 360 })
    .png({ compressionLevel: 9, quality: 90 })
    .toBuffer()

  writeFileSync(PNG_PATH, pngBuffer)

  const b64 = pngBuffer.toString('base64')
  const tsContent = `/* Auto-generated from public/email-logo-cbi-viale.png — re-run \`node scripts/generate-email-logo.mjs\` to update */
export const LOGO_BASE64 = 'data:image/png;base64,${b64}'
`
  writeFileSync(TS_PATH, tsContent)

  console.log(`✓ PNG: ${pngBuffer.length} bytes → ${PNG_PATH}`)
  console.log(`✓ TS:  ${b64.length} b64 chars → ${TS_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
