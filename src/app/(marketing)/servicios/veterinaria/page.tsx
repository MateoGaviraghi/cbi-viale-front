import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { CONTACT, SERVICES } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'
import { Reveal } from '@/components/shared/Reveal'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'veterinaria' as const
const C = SERVICE_CONTENT[SLUG]
const SVC = SERVICES[SLUG]

export const metadata = buildMetadata({
  title: 'Veterinaria — Diagnóstico por derivación · CBI Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// ---------------------------------------------------------------------------
//  Perfiles diagnósticos
// ---------------------------------------------------------------------------

const PROFILES: { label: string; items: string[] }[] = [
  {
    label: 'Básico',
    items: ['Hemograma completo', 'Bioquímica general (urea, creatinina, glucosa, enzimas)'],
  },
  {
    label: 'Renal',
    items: ['Urea', 'Creatinina', 'Fósforo', 'Ionograma'],
  },
  {
    label: 'Hepático',
    items: ['ALT (GPT)', 'FA', 'Bilirrubina', 'Albúmina'],
  },
  {
    label: 'Pancreático',
    items: ['Amilasa', 'Lipasa', 'Glucosa'],
  },
  {
    label: 'Endocrino',
    items: ['Perfil tiroideo', 'Perfil adrenal'],
  },
  {
    label: 'Infeccioso · Serología',
    items: ['Leptospirosis', 'Brucelosis', 'Ehrlichiosis', 'Toxoplasmosis'],
  },
  {
    label: 'Digestivo',
    items: ['Coprológico', 'Parasitológico'],
  },
  {
    label: 'Microbiología',
    items: ['Cultivos', 'Antibiograma'],
  },
  {
    label: 'Reproductivo',
    items: ['Progesterona', 'Citología vaginal'],
  },
  {
    label: 'Geriátrico',
    items: ['Perfil completo adaptado a edad'],
  },
]

// ---------------------------------------------------------------------------
//  Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      {/* ============================================================
          HERO — split editorial 50/50, mismo patrón que clínica humana.
          Imagen hero.jpg en lado derecho con mask gradient (fade-left
          desktop · fade-bottom mobile).
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
              src="/servicios/veterinaria/hero.jpg"
              alt="Laboratorio veterinario CBI Viale — procesamiento de muestras derivadas"
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
                  href={`/servicios/${SLUG}/solicitar`}
                  className="tap-min inline-flex h-14 items-center justify-center gap-2 bg-gold-700 px-7 sm:px-8 font-sans text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-gold-800 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
                >
                  Solicitar análisis
                  <ArrowRight width={16} height={16} strokeWidth={1.5} />
                </Link>

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

      {/* Bloque posicionamiento */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-7 space-y-8">
              <FadeIn>
                <div className="flex items-center gap-4 mb-6">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Soporte diagnóstico
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tightest leading-tight text-ink">
                  Soporte diagnóstico para el médico veterinario.
                </h2>
                <p className="mt-6 text-lg text-ink-muted leading-relaxed">
                  Nuestra área veterinaria está orientada exclusivamente al procesamiento y análisis
                  de muestras derivadas. Trabajamos en conjunto con el profesional tratante,
                  brindando resultados confiables con valores de referencia específicos por especie.
                </p>
                <p className="mt-4 text-lg text-ink-muted leading-relaxed">
                  Procesamos muestras con criterios de calidad equivalentes a la clínica humana,
                  adaptando cada análisis a la especie.
                </p>
              </FadeIn>

              {/* Callout: no extracción en animales */}
              <FadeIn delay={0.06}>
                <div className="border-l-4 border-gold-700 bg-gold-50/60 px-6 py-5">
                  <p className="font-sans text-sm font-semibold uppercase tracking-widest text-gold-800 mb-1">
                    Importante
                  </p>
                  <p className="text-base text-ink leading-relaxed">
                    No realizamos toma de muestras en animales. Las muestras son recibidas por
                    derivación veterinaria para su procesamiento en laboratorio.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Imagen lateral */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.1}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
                  <Image
                    src="/servicios/veterinaria/tubos.jpg"
                    alt="Muestras de laboratorio veterinario — CBI Viale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </section>

      {/* Perfiles diagnósticos */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                Perfiles diagnósticos
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tightest text-ink mb-3">
              Perfiles diagnósticos veterinarios.
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed max-w-2xl mb-12">
              Organizamos los estudios en perfiles para facilitar la evaluación clínica y optimizar
              la interpretación de resultados.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-line">
            {PROFILES.map((profile, i) => (
              <FadeIn key={profile.label} delay={i * 0.04}>
                <div className="bg-white p-6 h-full">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-3">
                    {profile.label}
                  </p>
                  <ul className="space-y-1.5">
                    {profile.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-700/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Recepción de muestras */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Imagen */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <FadeIn>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
                  <Image
                    src="/servicios/veterinaria/cultivos.jpg"
                    alt="Procesamiento de muestras en laboratorio — CBI Viale"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Pasos */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.06}>
                <div className="flex items-center gap-4 mb-6">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Recepción de muestras
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tightest text-ink mb-3">
                  Cómo trabajamos.
                </h2>
                <p className="text-lg text-ink-muted leading-relaxed mb-10">
                  Recibimos muestras derivadas desde clínicas veterinarias o profesionales
                  independientes, garantizando condiciones adecuadas de procesamiento y conservación.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      num: '01',
                      title: 'Derivación',
                      body: 'Las muestras deben ser remitidas por el médico veterinario tratante.',
                    },
                    {
                      num: '02',
                      title: 'Identificación',
                      body: 'Rotular correctamente con datos del paciente, especie y estudio solicitado.',
                    },
                    {
                      num: '03',
                      title: 'Conservación',
                      body: 'Mantener condiciones adecuadas según el tipo de muestra hasta su recepción.',
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-6">
                      <span className="font-serif text-2xl text-gold-700/40 leading-none pt-0.5 w-8 shrink-0">
                        {step.num}
                      </span>
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-widest text-ink mb-1">
                          {step.title}
                        </p>
                        <p className="text-base text-ink-muted leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </Container>
      </section>

      {/* Informes */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Informes
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tightest text-ink mb-6">
                Informes claros y adaptados.
              </h2>
              <p className="text-lg text-ink-muted leading-relaxed">
                Cada resultado se entrega con valores de referencia específicos por especie, junto
                con la posibilidad de consulta bioquímica ante hallazgos relevantes.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Tagline cierre */}
      <section className="section border-b border-line">
        <Container>
          <FadeIn>
            <blockquote className="border-l-2 border-gold-700 pl-8 max-w-2xl">
              <p className="font-serif text-2xl md:text-3xl italic text-ink leading-relaxed">
                Rigurosidad de laboratorio clínico aplicada al diagnóstico veterinario.
              </p>
              <footer className="mt-4 font-sans text-sm text-ink-muted">
                — CBI Viale · Centro Bioquímico Integral
              </footer>
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      <RelatedServices currentSlug={SLUG} />
      <FinalCTA />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Veterinaria — Diagnóstico por derivación',
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
