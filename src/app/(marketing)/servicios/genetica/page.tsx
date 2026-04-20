import { buildMetadata } from '@/lib/seo/metadata'
import { ServicePage } from '@/components/marketing/ServicePage'
import { SERVICE_CONTENT } from '@/lib/service-content'

const SLUG = 'genetica' as const

export const metadata = buildMetadata({
  title: 'Genética — Estudios de paternidad y filiación en Viale',
  description: SERVICE_CONTENT[SLUG].intro,
  path: `/servicios/${SLUG}`,
})

export default function Page() {
  return <ServicePage slug={SLUG} />
}
