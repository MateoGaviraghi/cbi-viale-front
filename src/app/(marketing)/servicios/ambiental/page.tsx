import Image from 'next/image'
import Link from 'next/link'
import {
  Droplet,
  FlaskConical,
  Activity,
  Beaker,
  Atom,
  Waves,
  Layers,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { CONTACT, SERVICES } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'
import { Reveal } from '@/components/shared/Reveal'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'ambiental' as const
const C = SERVICE_CONTENT[SLUG]
const SVC = SERVICES[SLUG]

export const metadata = buildMetadata({
  title: 'Ambiental — Análisis de aguas y efluentes en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// ---------------------------------------------------------------------------
//  Catálogo de estudios — 7 cards numeradas con íconos editoriales
// ---------------------------------------------------------------------------

const STUDIES: { num: string; icon: typeof Droplet; title: string; body: string }[] = [
  {
    num: '01',
    icon: Droplet,
    title: 'Físico-químico de agua potable',
    body: 'Parámetros de aptitud según el Código Alimentario Argentino y normativas provinciales.',
  },
  {
    num: '02',
    icon: FlaskConical,
    title: 'Bacteriológico',
    body: 'Coliformes totales y fecales, Escherichia coli, Pseudomonas y otros microorganismos.',
  },
  {
    num: '03',
    icon: Activity,
    title: 'Dureza, alcalinidad, pH y conductividad',
    body: 'Parámetros básicos para evaluar calidad y aptitud de uso del agua.',
  },
  {
    num: '04',
    icon: Beaker,
    title: 'Nitratos, nitritos y amonio',
    body: 'Indicadores de contaminación por actividad agrícola, ganadera o cloacal.',
  },
  {
    num: '05',
    icon: Atom,
    title: 'Metales pesados',
    body: 'Determinación de plomo, arsénico, mercurio, cromo y otros metales en agua.',
  },
  {
    num: '06',
    icon: Waves,
    title: 'DBO y DQO en efluentes',
    body: 'Demanda biológica y química de oxígeno en efluentes industriales o cloacales.',
  },
  {
    num: '07',
    icon: Layers,
    title: 'Sólidos totales y suspendidos',
    body: 'Carga sólida en agua y efluentes para presentación ante organismos de contralor.',
  },
]

// ---------------------------------------------------------------------------
//  Indicaciones de toma de muestra — fuente: instructivos del cliente
// ---------------------------------------------------------------------------

const INDICACIONES_AGUA: string[] = [
  'Limpiar la canilla con un paño limpio o algodón embebido en alcohol.',
  'Dejar correr el agua durante 5 minutos.',
  'Elegir una botella de 1 L, bien limpia, y enjuagar 3 veces con el agua a analizar.',
  'Llenar el recipiente en su totalidad lentamente, evitando la formación de burbujas y sin dejar cámara de aire.',
  'Cerrar herméticamente.',
  'Dejar la muestra en heladera (2–8 °C) y remitirla al laboratorio refrigerada en lo posible.',
  'Indicar tipo de agua, lugar, fecha y hora de recolección.',
  'Para análisis microbiológico recolectar otra botella aparte, de 500 mL, con las mismas indicaciones y rotularla.',
]

const INDICACIONES_EFLUENTES: string[] = [
  'Descargar el instructivo correspondiente (agua o efluentes).',
  'Utilizar un recipiente limpio (botella plástica o de vidrio).',
  'Tomar la muestra según indicaciones del instructivo.',
  'Entregar la muestra dentro de las 24 hs o según lo indicado.',
]

// ---------------------------------------------------------------------------
//  Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      {/* ============================================================
          HERO — split editorial 50/50. Imagen lado derecho con mask
          gradient que difumina el borde izquierdo (desktop) y el
          borde inferior (mobile), fundiéndose con el bloque de texto.
          ============================================================ */}
      <section className="relative bg-white border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[640px]">

          {/* Imagen — mobile: arriba 4/3 con fade-bottom. desktop: derecha con fade-left */}
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
              src="/servicios/ambiental/phmetro.png"
              alt="Medición de pH en muestra de agua — laboratorio CBI Viale"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Overlay desktop: fade desde la izquierda hacia la imagen */}
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

          {/* Texto — padding-left calculado matchea container del sitio en desktop */}
          <div className="relative z-10 bg-white flex flex-col justify-center px-5 sm:px-6 md:px-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-12 xl:pr-16 py-10 sm:py-12 lg:py-20">
              {/* Breadcrumb sutil */}
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
                  Ambiental.
                </h1>
              </Reveal>

              <Reveal direction="up" delay={0.2} duration={0.6}>
                <p className="mt-6 lg:mt-8 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
                  {C.intro}
                </p>
              </Reveal>

              {/* CTAs — mobile: 2 filas (Reservar full + 2 chips). desktop: una fila */}
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
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hola, quisiera consultar por análisis ambientales.')}`}
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

              {/* Metadatos */}
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

      {/* ============================================================
          DESCRIPCIÓN — sin foto. Solo texto + 2 cards horizontales.
          Densidad informativa alta sin duplicar la única foto.
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Descripción del servicio
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest leading-[1.05] text-ink">
                Resultados aptos para presentar ante{' '}
                <span className="italic text-gold-800">organismos de contralor</span>.
              </h2>
            </FadeIn>

            <div className="lg:col-span-7 space-y-6">
              <FadeIn delay={0.06}>
                <div className="space-y-4 text-base sm:text-lg text-ink-muted leading-relaxed">
                  {C.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </FadeIn>

              {/* 2 cards: "para quién" / "qué incluye" */}
              <FadeIn delay={0.12}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
                  <div className="bg-white p-6 sm:p-7">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-3">
                      ¿Para quién es?
                    </p>
                    <p className="text-sm sm:text-[15px] text-ink leading-relaxed">{C.audience}</p>
                  </div>
                  <div className="bg-white p-6 sm:p-7">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-3">
                      ¿Qué incluye?
                    </p>
                    <p className="text-sm sm:text-[15px] text-ink leading-relaxed">{C.includes}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          CATÁLOGO — 7 cards numeradas con íconos. Mobile: 1 col padding
          reducido. Tablet: 2 cols. Desktop: 3 cols.
          ============================================================ */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-800">
                Estudios que realizamos
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-3">
              Catálogo <span className="italic text-gold-800">completo</span>.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
              Cada análisis se procesa con equipamiento calibrado y protocolos de control de calidad
              vigentes según norma local e internacional.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {STUDIES.map((s, i) => {
              const Icon = s.icon
              return (
                <FadeIn key={s.num} delay={i * 0.04}>
                  <div className="group bg-white p-5 sm:p-6 lg:p-7 h-full transition-colors duration-500 hover:bg-beige/40">
                    <div className="flex items-start justify-between mb-4 sm:mb-5">
                      <Icon
                        width={24}
                        height={24}
                        strokeWidth={1.25}
                        className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                        aria-hidden
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700">
                        {s.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg tracking-tight text-ink mb-2">
                      {s.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed">{s.body}</p>
                  </div>
                </FadeIn>
              )
            })}

            {/* Imagen editorial que rellena el hueco del grid:
                en sm (2 cols) ocupa la celda vacía de la última fila;
                en lg (3 cols) ocupa las 2 celdas vacías junto a la card 07.
                Se oculta en mobile (1 col) — ahí no hay hueco que llenar. */}
            <FadeIn className="hidden sm:block sm:col-span-1 lg:col-span-2" delay={0.32}>
              <div className="relative h-full min-h-[220px] bg-white overflow-hidden">
                <Image
                  src="/servicios/ambiental/wmremove-transformed.png"
                  alt="Análisis ambientales — laboratorio CBI Viale"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 0px, (max-width: 1024px) 50vw, 66vw"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================================
          TOMA DE MUESTRA CORRECTA — 2 botones que linkean a indicaciones
          inline + callout dorado clave.
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
          {/* Layout 7/5: header + cards + callout en col izquierda, foto vertical en
              col derecha. La foto arranca al nivel del eyebrow para emparejar visualmente. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <FadeIn>
                <div className="flex items-center gap-4 mb-4">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Toma de muestra correcta
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-4">
                  Cómo tomar tu <span className="italic text-gold-800">muestra</span>.
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
                  Para asegurar resultados confiables es fundamental seguir el protocolo de toma según
                  el tipo de análisis. Elegí el instructivo correspondiente.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
                <Link
                  href="#indicaciones-agua"
                  className="group bg-white p-6 sm:p-7 transition-colors duration-500 hover:bg-beige/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-inset"
                >
                  <div className="flex items-start justify-between mb-5">
                    <Droplet
                      width={26}
                      height={26}
                      strokeWidth={1.25}
                      className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                      aria-hidden
                    />
                    <ArrowDown
                      width={16}
                      height={16}
                      strokeWidth={1.5}
                      className="text-ink/40 transition-all duration-500 group-hover:text-gold-700 group-hover:translate-y-1"
                      aria-hidden
                    />
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                    Instructivo
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-ink group-hover:text-gold-800 transition-colors">
                    Agua
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                    Incluye análisis microbiológico y físico-químico.
                  </p>
                </Link>

                <Link
                  href="#indicaciones-efluentes"
                  className="group bg-white p-6 sm:p-7 transition-colors duration-500 hover:bg-beige/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-inset"
                >
                  <div className="flex items-start justify-between mb-5">
                    <Waves
                      width={26}
                      height={26}
                      strokeWidth={1.25}
                      className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                      aria-hidden
                    />
                    <ArrowDown
                      width={16}
                      height={16}
                      strokeWidth={1.5}
                      className="text-ink/40 transition-all duration-500 group-hover:text-gold-700 group-hover:translate-y-1"
                      aria-hidden
                    />
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                    Instructivo
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-ink group-hover:text-gold-800 transition-colors">
                    Efluentes
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                    Indicaciones generales para muestras industriales o cloacales.
                  </p>
                </Link>
              </div>

              {/* Aviso clave — dentro de la col izquierda, llena el alto al lado
                  de la foto vertical sin dejar espacio muerto. */}
              <FadeIn delay={0.1}>
                <div className="mt-8 border-l-4 border-gold-700 bg-gold-50/60 px-5 sm:px-6 py-5 flex items-start gap-3 sm:gap-4">
                  <AlertTriangle
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                    className="text-gold-800 shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <div>
                    <p className="font-sans text-[12px] sm:text-sm font-semibold uppercase tracking-widest text-gold-800 mb-1">
                      Importante
                    </p>
                    <p className="text-sm sm:text-base text-ink leading-relaxed">
                      Las muestras que no cumplan con las condiciones recomendadas pueden generar
                      resultados no representativos.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-5 order-1 lg:order-2" delay={0.08}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-beige">
                <Image
                  src="/servicios/ambiental/IMG_0160.PNG"
                  alt="Toma de muestra de agua para análisis ambiental — CBI Viale"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================================
          INDICACIONES · AGUA — 8 pasos transcriptos, layout 5/7
          ============================================================ */}
      <section
        id="indicaciones-agua"
        className="section border-b border-line scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Indicaciones · Agua
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Toma de muestra para análisis de{' '}
                <span className="italic text-gold-800">agua</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Aplica para análisis microbiológico y físico-químico. Seguí cada paso con cuidado
                para asegurar la representatividad de la muestra.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_AGUA.map((step, idx) => (
                  <FadeIn key={idx} delay={idx * 0.04}>
                    <li className="flex items-start gap-5 sm:gap-6 py-5 border-b border-line">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700 shrink-0 pt-1 w-7 sm:w-8">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm sm:text-base text-ink leading-relaxed">{step}</p>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          INDICACIONES · EFLUENTES — 4 pasos genéricos + nota chica
          ============================================================ */}
      <section
        id="indicaciones-efluentes"
        className="section border-b border-line bg-beige/30 scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-800">
                  Indicaciones · Efluentes
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Toma de muestra de{' '}
                <span className="italic text-gold-800">efluentes</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Indicaciones generales para efluentes industriales o cloacales. Si el análisis
                requiere envase específico te lo avisamos al coordinar el turno.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_EFLUENTES.map((step, idx) => (
                  <FadeIn key={idx} delay={idx * 0.04}>
                    <li className="flex items-start gap-5 sm:gap-6 py-5 border-b border-line">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700 shrink-0 pt-1 w-7 sm:w-8">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm sm:text-base text-ink leading-relaxed">{step}</p>
                    </li>
                  </FadeIn>
                ))}
              </ol>

              <FadeIn delay={0.2}>
                <p className="mt-6 text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                  No es necesario que el envase sea estéril, salvo indicación específica.
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
      <RelatedServices currentSlug={SLUG} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Análisis ambientales — Aguas y efluentes',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm sm:text-base text-ink leading-tight">{value}</dd>
    </div>
  )
}
