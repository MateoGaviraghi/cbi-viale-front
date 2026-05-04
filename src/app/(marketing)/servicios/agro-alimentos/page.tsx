import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { AnalysisList } from '@/components/marketing/AnalysisList'
import { PreparationSteps } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'agro-alimentos' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Análisis agroalimentarios — Control de calidad en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

export default function Page() {
  return (
    <>
      <ServiceHero
        slug={SLUG}
        eyebrow={C.eyebrow}
        intro={C.intro}
        ctaPrimaryLabel="Solicitar análisis"
        ctaConsultLabel="Consultar muestra"
      />

      <ServiceDescription
        paragraphs={C.description}
        audience={C.audience}
        includes={C.includes}
      />

      <AnalysisList items={C.analyses} />

      <PreparationSteps
        steps={C.preparation}
        eyebrow="Envío de muestras"
        title={
          <>
            Cómo enviar tu <span className="italic text-gold-800">muestra</span>.
          </>
        }
      />

      <RelatedServices currentSlug={SLUG} />
      <FinalCTA />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Análisis agroalimentarios',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
