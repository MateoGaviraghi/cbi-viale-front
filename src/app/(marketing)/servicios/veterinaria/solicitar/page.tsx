import { buildMetadata } from '@/lib/seo/metadata'
import { RequestFormPage } from '@/components/forms'
import { VeterinaryForm } from './VeterinaryForm'

const SLUG = 'veterinaria'

export const metadata = buildMetadata({
  title: 'Solicitar análisis veterinario · CBI Viale',
  description:
    'Cargá los datos del responsable, el animal y el estudio para iniciar tu solicitud de análisis veterinario.',
  path: `/servicios/${SLUG}/solicitar`,
})

export default function Page() {
  return (
    <RequestFormPage
      serviceSlug={SLUG}
      serviceName="Veterinaria"
      intro="Completá los datos del responsable, el animal y el estudio. Te respondemos a la brevedad para coordinar la entrega de la muestra."
    >
      <VeterinaryForm />
    </RequestFormPage>
  )
}
