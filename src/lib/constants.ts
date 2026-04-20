// =============================================================================
// Constantes globales del proyecto.
// Los valores reales se completan en CONTENT.md y luego acá.
// =============================================================================

export const SITE = {
  name: 'CBI Viale',
  legalName: 'Centro Bioquímico Integral',
  tagline: 'Donde la ciencia y el cuidado se encuentran.',
  description:
    'Centro Bioquímico Integral en Viale, Entre Ríos. Análisis clínicos, veterinarios, agro-alimentos, ambiental, medicina regenerativa y genética. Recibimos todas las obras sociales sin adicionales.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'es_AR',
  phases: 4,
} as const

export const CONTACT = {
  address: {
    // Dirección oficial — la que se muestra en todo el sitio
    street: 'Manuel Belgrano 594',
    // Referencia de la esquina (útil para texto descriptivo / SEO local)
    streetAlt: 'Esquina de Belgrano y Gregoria Pérez',
    city: 'Viale',
    region: 'Entre Ríos',
    country: 'Argentina',
    postalCode: 'E3109',
    // coordenadas reales — resueltas desde el share link del cliente
    lat: -31.8717846,
    lng: -60.0041719,
    // ID de lugar en Google Maps para construir embeds con pin exacto
    mapsPlaceId: '0x95b40e3fdfa3cc5d:0x2bfffb759f20248c',
    mapsShareUrl: 'https://maps.app.goo.gl/uj58evs4WLJQRG3u5',
  },
  // Datos públicos — hardcoded (evita mismatch SSR/cliente con env vars).
  // Los env vars BUSINESS_* se usan sólo en server actions (notificaciones internas).
  phone: '3433020527',
  whatsapp: '543433020527',
  email: 'contacto@cbiviale.com.ar',
  instagram: 'https://www.instagram.com/cbi_viale',
  hours: [
    // horarios confirmados desde material oficial de IG del cliente
    { day: 'Lunes a viernes', range: '07:00 – 12:00  ·  14:00 – 18:00' },
    { day: 'Sábados', range: '08:00 – 12:00' },
    { day: 'Domingos', range: 'Cerrado' },
  ],
  // beneficios destacados confirmados por el cliente
  features: [
    'Recibimos todas las obras sociales',
    'Sin cobro de adicionales',
    'Extracciones a domicilio · Particulares',
  ],
} as const

// Los 6 servicios — slugs en kebab-case para URLs
export const SERVICE_SLUGS = [
  'clinica-humana',
  'veterinaria',
  'agro-alimentos',
  'ambiental',
  'medicina-regenerativa',
  'genetica',
] as const
export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const SERVICES: Record<
  ServiceSlug,
  { name: string; short: string; duration: number; consent: boolean }
> = {
  'clinica-humana': {
    name: 'Clínica Humana',
    short: 'Rutina, hormonales, serológicos, vitaminas, prequirúrgicos.',
    duration: 30,
    consent: false,
  },
  veterinaria: {
    name: 'Veterinaria',
    short: 'Estudios para salud y nutrición animal.',
    duration: 30,
    consent: false,
  },
  'agro-alimentos': {
    name: 'Agro y Alimentos',
    short:
      'Microbiológicos, composición de alimentos balanceados, nutrientes, calidad de materias primas.',
    duration: 45,
    consent: false,
  },
  ambiental: {
    name: 'Ambiental',
    short: 'Control de agua y efluentes.',
    duration: 30,
    consent: false,
  },
  'medicina-regenerativa': {
    name: 'Medicina Regenerativa',
    short: 'Plasma Rico en Plaquetas (PRP).',
    duration: 60,
    consent: true,
  },
  genetica: {
    name: 'Genética',
    short: 'Estudios de paternidad.',
    duration: 30,
    consent: true,
  },
}

// orden de las landings en navegación / grid
export const SERVICE_ORDER: readonly ServiceSlug[] = SERVICE_SLUGS
