import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import {
  FlaskConical,
  Gem,
  AlertTriangle,
  Bug,
  Droplets,
  Factory,
  Dna,
  ClipboardList,
  PackageOpen,
  Thermometer,
} from 'lucide-react'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { AnalysisList, type AnalysisItem } from '@/components/marketing/AnalysisList'
import { PreparationSteps, type PreparationStep } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'agro-alimentos' as const
const C = SERVICE_CONTENT[SLUG]

const PREPARATION: PreparationStep[] = [
  { label: 'Muestra mínima según análisis — consultar previamente.', icon: ClipboardList },
  { label: 'Envasar en bolsa limpia, identificada con fecha, lote y origen.', icon: PackageOpen },
  { label: 'Mantener refrigerada si la muestra es perecedera.', icon: Thermometer },
]

const ANALYSES: AnalysisItem[] = [
  { label: 'Análisis proximal (humedad, proteína, grasa, fibra, cenizas)', icon: FlaskConical },
  { label: 'Minerales mayores y menores', icon: Gem },
  { label: 'Aflatoxinas y micotoxinas', icon: AlertTriangle },
  { label: 'Carga microbiana total y específica (E. coli, Salmonella, coliformes)', icon: Bug },
  { label: 'Análisis de agua para uso animal', icon: Droplets },
  { label: 'Control de calidad de materias primas', icon: Factory },
  { label: 'Perfil de aminoácidos', icon: Dna },
]

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

      <AnalysisList
        items={ANALYSES}
        gridImage="/servicios/agro-alimentos/catalogo.jpg"
        gridImageAlt="Materias primas y cereales — CBI Viale"
        gridImageColSpan={2}
      />

      <PreparationSteps
        steps={PREPARATION}
        eyebrow="Envío de muestras"
        title={
          <>
            Cómo enviar tu <span className="italic text-gold-800">muestra</span>.
          </>
        }
        image="/servicios/agro-alimentos/preparacion.jpg"
        imageAlt="Muestra identificada con lote y fecha — CBI Viale"
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
