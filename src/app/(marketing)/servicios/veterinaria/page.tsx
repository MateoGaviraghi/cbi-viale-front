import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { ServiceShowcase } from '@/components/marketing/ServiceShowcase'
import { AnalysisList } from '@/components/marketing/AnalysisList'
import { PreparationSteps } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'veterinaria' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Veterinaria — Análisis veterinarios en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// Variante "split" con 3 highlights puntuales — refleja el trabajo en
// conjunto con el veterinario tratante.
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
        variant="split"
        eyebrow="En conjunto con el veterinario"
        headline="Diagnóstico que entiende a cada especie."
        lead="Procesamos muestras caninas, felinas, equinas y de animales de producción con valores de referencia específicos. Trabajamos en equipo con el profesional tratante."
        highlights={[
          {
            title: 'Valores por especie',
            body: 'Cada informe se entrega con rangos de referencia específicos según la especie analizada.',
          },
          {
            title: 'Derivación ágil',
            body: 'Recibimos muestras por derivación desde la clínica veterinaria — logística rápida, resultados en tiempo breve.',
          },
          {
            title: 'Consulta bioquímica',
            body: 'Ante valores atípicos, el bioquímico está disponible para consulta interpretativa sin cargo.',
          },
        ]}
      />

      <AnalysisList items={C.analyses} />
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
            name: 'Veterinaria',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
