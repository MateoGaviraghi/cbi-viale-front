import { buildMetadata } from '@/lib/seo/metadata'
import { RequestFormPage } from '@/components/forms'
import { GeneticForm } from './GeneticForm'

const SLUG = 'genetica'

export const metadata = buildMetadata({
  title: 'Solicitar estudio genético · CBI Viale',
  description:
    'Cargá tus datos, el tipo de estudio y los antecedentes clínicos para iniciar tu solicitud de estudio genético.',
  path: `/servicios/${SLUG}/solicitar`,
})

export default function Page() {
  return (
    <RequestFormPage
      serviceSlug={SLUG}
      serviceName="Genética"
      intro="Completá tus datos, el detalle del estudio y los antecedentes clínicos. Toda la información viaja cifrada y se procesa con el consentimiento que confirmás al final del formulario."
    >
      <GeneticForm />
    </RequestFormPage>
  )
}
