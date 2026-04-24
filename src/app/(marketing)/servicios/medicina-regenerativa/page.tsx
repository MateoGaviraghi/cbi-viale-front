import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { ServiceShowcase } from '@/components/marketing/ServiceShowcase'
import { AnalysisList } from '@/components/marketing/AnalysisList'
import { PreparationSteps } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'medicina-regenerativa' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Cosmetología Bioquímica Regenerativa — Plasma y cosméticos personalizados en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// Variante "quote" + "tiles" — doble showcase. El PRP es nuestro servicio
// más premium y merece una narrativa más extendida.
export default function Page() {
  return (
    <>
      <ServiceHero slug={SLUG} eyebrow={C.eyebrow} intro={C.intro} />
      <ServiceDescription
        paragraphs={C.description}
        audience={C.audience}
        includes={C.includes}
      />

      <ServiceShowcase
        variant="quote"
        eyebrow="¿Qué es la cosmetología bioquímica regenerativa?"
        headline="Ciencia aplicada al cuidado de la piel y la regeneración tisular."
        quote={{
          text:
            'Cada formulación se realiza de manera individual, con selección de activos y ajuste de concentraciones según las necesidades de cada piel, con la posibilidad de incorporar plasma autólogo como componente biológico propio.',
          author: 'Bioq. Nahir Gastaldi · CBI Viale',
        }}
      />

      <AnalysisList items={C.analyses} />

      <ServiceShowcase
        variant="tiles"
        eyebrow="Aplicaciones"
        headline="Un enfoque bioquímico en múltiples frentes de la salud."
        lead="El plasma autólogo y las formulaciones personalizadas se adaptan a cada indicación, con rigor científico en cada paso del proceso."
        highlights={[
          {
            title: 'Estética y piel',
            body:
              'Cosméticos personalizados con activos seleccionados y concentraciones ajustadas. Rejuvenecimiento facial, tratamiento de manchas y regeneración dérmica.',
          },
          {
            title: 'Capilar',
            body:
              'PRP para alopecia y pérdida de cabello. Estimulación de folículos pilosos con factores de crecimiento autólogos.',
          },
          {
            title: 'Traumatología y deporte',
            body:
              'Lesiones musculares, articulares y tendinosas. Infiltraciones de rodilla, hombro y codo para acelerar la reparación tisular.',
          },
          {
            title: 'Odontología e implantes',
            body:
              'Acelera la osteointegración en implantes y reduce tiempos de cicatrización en cirugías de encía.',
          },
        ]}
      />

      <PreparationSteps steps={C.preparation} />
      <RelatedServices currentSlug={SLUG} />
      <FinalCTA />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Cosmetología Bioquímica Regenerativa',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
