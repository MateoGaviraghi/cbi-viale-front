import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { Dna, Users, Baby, GitMerge, Clock, Fingerprint, CalendarCheck, Droplet, Coffee, FileCheck, CreditCard } from 'lucide-react'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { AnalysisList, type AnalysisItem } from '@/components/marketing/AnalysisList'
import { PreparationSteps, type PreparationStep } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'genetica' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Genética — Estudios de paternidad y filiación en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

const PREPARATION: PreparationStep[] = [
  { label: 'Avisar con anticipación para coordinar el turno.', icon: CalendarCheck },
  { label: 'Se extrae 3 mL de sangre de cada parte y se toma muestra de hisopado bucal — rápido e indoloro.', icon: Droplet },
  { label: 'No requiere ayunas.', icon: Coffee },
  { label: 'Horarios de toma de muestra: 7 a 13 hs y de 16 a 20 hs.', icon: Clock },
  { label: 'La madre y el presunto padre deben firmar el consentimiento informado.', icon: FileCheck },
  { label: 'Presentar documento de identidad original de cada participante. En menores: acompañados por el adulto a cargo con documentación.', icon: CreditCard },
]

const ANALYSES: AnalysisItem[] = [
  { label: 'Filiación paternidad padre-hijo/a', icon: Users },
  { label: 'Maternidad biológica', icon: Baby },
  { label: 'Parentesco entre hermanos', icon: GitMerge },
  { label: 'Estudios de filiación post-mortem', icon: Clock },
  { label: 'Identificación genética individual', icon: Fingerprint },
  { label: 'Análisis de ADN — certeza >99,99 %', icon: Dna },
]

export default function Page() {
  return (
    <>
      <ServiceHero slug={SLUG} eyebrow={C.eyebrow} intro={C.intro} />
      <ServiceDescription
        paragraphs={C.description}
        audience={C.audience}
        includes={C.includes}
      />
      <AnalysisList items={ANALYSES} />
      <PreparationSteps steps={PREPARATION} />
      <RelatedServices currentSlug={SLUG} />
      <FinalCTA />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Genética — Estudios de paternidad y filiación',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
