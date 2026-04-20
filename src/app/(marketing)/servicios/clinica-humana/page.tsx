import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { ServiceShowcase } from '@/components/marketing/ServiceShowcase'
import { AnalysisList } from '@/components/marketing/AnalysisList'
import { PreparationSteps } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'clinica-humana' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Clínica Humana — Análisis clínicos en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// Composición propia — variante "default" (banda oscura hero) para remarcar
// rigor clínico + bloque de destacados antes de la lista de estudios.
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
        variant="default"
        eyebrow="Rigor clínico · Equipamiento calibrado"
        headline="Cada análisis pasa por el mismo control de calidad."
        lead="Desde la extracción hasta el informe: trazabilidad completa, personal bioquímico matriculado y protocolos internacionales de verificación."
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
            name: 'Clínica Humana',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
