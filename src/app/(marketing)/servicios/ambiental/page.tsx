import { buildMetadata } from '@/lib/seo/metadata'
import { ServicePage } from '@/components/marketing/ServicePage'
import { SERVICE_CONTENT } from '@/lib/service-content'

const SLUG = 'ambiental' as const

export const metadata = buildMetadata({
  title: 'Ambiental — Análisis de aguas y efluentes en Viale',
  description: SERVICE_CONTENT[SLUG].intro,
  path: `/servicios/${SLUG}`,
})

export default function Page() {
  return <ServicePage slug={SLUG} />
}
