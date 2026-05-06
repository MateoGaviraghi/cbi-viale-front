import { buildMetadata } from '@/lib/seo/metadata'
import { RequestFormPage } from '@/components/forms'
import { AgroFoodForm } from './AgroFoodForm'

const SLUG = 'agro-alimentos'

export const metadata = buildMetadata({
  title: 'Solicitar análisis agro y alimentos · CBI Viale',
  description:
    'Cargá los datos de tu empresa, el producto y el análisis solicitado para iniciar la gestión de la muestra.',
  path: `/servicios/${SLUG}/solicitar`,
})

export default function Page() {
  return (
    <RequestFormPage
      serviceSlug={SLUG}
      serviceName="Agro y Alimentos"
      intro="Completá los datos de la empresa, el producto y el análisis. Te respondemos en breve para coordinar la recepción de la muestra y los próximos pasos."
    >
      <AgroFoodForm />
    </RequestFormPage>
  )
}
