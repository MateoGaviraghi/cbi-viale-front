import { buildMetadata } from '@/lib/seo/metadata'
import { RequestFormPage } from '@/components/forms'
import { EnvironmentalForm } from './EnvironmentalForm'

const SLUG = 'ambiental'

export const metadata = buildMetadata({
  title: 'Solicitar análisis ambiental · CBI Viale',
  description:
    'Cargá los datos de tu empresa, la muestra y el análisis solicitado para iniciar la gestión.',
  path: `/servicios/${SLUG}/solicitar`,
})

export default function Page() {
  return (
    <RequestFormPage
      serviceSlug={SLUG}
      serviceName="Ambiental"
      intro="Completá los datos de la empresa, la muestra y el análisis solicitado. Te respondemos en breve para coordinar la recepción y la trazabilidad del estudio."
    >
      <EnvironmentalForm />
    </RequestFormPage>
  )
}
