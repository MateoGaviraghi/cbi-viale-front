import { buildMetadata } from '@/lib/seo/metadata'
import { ServicePage } from '@/components/marketing/ServicePage'
import { SERVICE_CONTENT } from '@/lib/service-content'

const SLUG = 'agro-alimentos' as const

export const metadata = buildMetadata({
  title: 'Agro y Alimentos — Análisis bromatológicos en Viale',
  description: SERVICE_CONTENT[SLUG].intro,
  path: `/servicios/${SLUG}`,
})

export default function Page() {
  return <ServicePage slug={SLUG} />
}
