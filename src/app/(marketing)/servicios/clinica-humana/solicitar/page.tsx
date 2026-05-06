import { buildMetadata } from '@/lib/seo/metadata'
import { RequestFormPage } from '@/components/forms'
import { ClinicalForm } from './ClinicalForm'

const SLUG = 'clinica-humana'

export const metadata = buildMetadata({
  title: 'Solicitar análisis clínicos · CBI Viale',
  description:
    'Subí la foto del pedido médico y completá tus datos para iniciar la solicitud. Si el pedido incluye urocultivo o exudado vaginal, podés agregarlos en el mismo formulario.',
  path: `/servicios/${SLUG}/solicitar`,
})

export default function Page() {
  return (
    <RequestFormPage
      serviceSlug={SLUG}
      serviceName="Clínica Humana"
      intro="Subí una foto del pedido médico, cargá tus datos y, si corresponde, marcá los estudios complementarios. Te respondemos en breve para coordinar la toma de muestras."
    >
      <ClinicalForm />
    </RequestFormPage>
  )
}
