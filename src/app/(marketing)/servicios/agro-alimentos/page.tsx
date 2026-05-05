import Image from 'next/image'
import Link from 'next/link'
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
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { CONTACT, SERVICES } from '@/lib/constants'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { ServiceInquiryModal } from '@/components/marketing/ServiceInquiryModal'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { AnalysisList, type AnalysisItem } from '@/components/marketing/AnalysisList'
import { PreparationSteps, type PreparationStep } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'agro-alimentos' as const
const C = SERVICE_CONTENT[SLUG]
const SVC = SERVICES[SLUG]

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
      {/* ============================================================
          HERO — split editorial 50/50, mismo patrón que clínica humana.
          Imagen hero-agro-alimentos.png en lado derecho con mask gradient
          (fade-left desktop · fade-bottom mobile).
          ============================================================ */}
      <section className="relative bg-white border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[640px]">

          {/* Imagen */}
          <div
            className="relative order-first lg:order-last aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full bg-beige"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
            }}
          >
            <Image
              src="/servicios/agro-alimentos/hero-agro-alimentos.png"
              alt="Análisis agroalimentarios — laboratorio CBI Viale"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div
              aria-hidden
              className="hidden lg:block absolute inset-0 bg-white pointer-events-none"
              style={{
                maskImage:
                  'linear-gradient(to right, white 0%, white 12%, transparent 32%)',
                WebkitMaskImage:
                  'linear-gradient(to right, white 0%, white 12%, transparent 32%)',
              }}
            />
          </div>

          {/* Texto */}
          <div className="relative z-10 bg-white flex flex-col justify-center px-5 sm:px-6 md:px-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-12 xl:pr-16 py-10 sm:py-12 lg:py-20">
            <nav
              aria-label="breadcrumb"
              className="mb-8 lg:mb-10 text-[11px] uppercase tracking-widest text-ink-muted"
            >
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link href="/" className="hover:text-gold-700 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <Link href="/servicios" className="hover:text-gold-700 transition-colors">
                    Servicios
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li className="text-gold-700">{SVC.name}</li>
              </ol>
            </nav>

            <Reveal direction="up" duration={0.6}>
              <div className="flex items-center gap-4 mb-6 lg:mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  {C.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1} duration={0.7}>
              <h1 className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.98] tracking-tightest text-ink">
                {SVC.name}.
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2} duration={0.6}>
              <p className="mt-6 lg:mt-8 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
                {C.intro}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3} duration={0.5}>
              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <Link
                  href={`/turnos/${SLUG}/fecha`}
                  className="tap-min inline-flex h-14 items-center justify-center gap-2 bg-gold-700 px-7 sm:px-8 font-sans text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-gold-800 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
                >
                  Solicitar análisis
                  <ArrowRight width={16} height={16} strokeWidth={1.5} />
                </Link>

                <ServiceInquiryModal serviceSlug={SLUG} label="Consultar muestra" />

                {CONTACT.whatsapp && (
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hola, quisiera consultar por ${SVC.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-min inline-flex h-14 items-center justify-center gap-2 border border-line bg-transparent px-7 sm:px-8 font-sans text-sm uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    <MessageCircle width={16} height={16} strokeWidth={1.5} />
                    WhatsApp
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.4} duration={0.5}>
              <dl className="mt-10 lg:mt-12 pt-8 border-t border-line grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
                <Meta label="Duración" value={`~${SVC.duration} min`} />
                <Meta label="Consentimiento" value={SVC.consent ? 'Requiere firma' : 'No aplica'} />
                <Meta label="Informe" value="Digital + impreso" />
              </dl>
            </Reveal>
          </div>

        </div>
      </section>

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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm sm:text-base text-ink leading-tight">{value}</dd>
    </div>
  )
}
