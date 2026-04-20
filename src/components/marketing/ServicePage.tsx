import type { ServiceSlug } from '@/lib/constants'
import { SERVICES } from '@/lib/constants'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from './ServiceHero'
import { ServiceDescription } from './ServiceDescription'
import { AnalysisList } from './AnalysisList'
import { PreparationSteps } from './PreparationSteps'
import { RelatedServices } from './RelatedServices'
import { FinalCTA } from './FinalCTA'

// Composición completa de una landing de servicio.
// Cada page.tsx individual sólo pasa el slug — el layout es el mismo.
export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const content = SERVICE_CONTENT[slug]
  const svc = SERVICES[slug]

  return (
    <>
      <ServiceHero slug={slug} eyebrow={content.eyebrow} intro={content.intro} />
      <ServiceDescription
        paragraphs={content.description}
        audience={content.audience}
        includes={content.includes}
      />
      <AnalysisList items={content.analyses} />
      <PreparationSteps steps={content.preparation} />
      <RelatedServices currentSlug={slug} />
      <FinalCTA />

      {/* Schema.org MedicalProcedure */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: svc.name,
            description: content.intro,
          }),
        }}
      />
    </>
  )
}
