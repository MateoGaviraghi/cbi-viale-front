import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Droplet,
  FlaskConical,
  Heart,
  Activity,
  Bone,
  Stethoscope,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  MessageCircle,
  QrCode,
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

const SLUG = 'medicina-regenerativa' as const
const C = SERVICE_CONTENT[SLUG]
const SVC = SERVICES[SLUG]

export const metadata = buildMetadata({
  title: 'Medicina Regenerativa — Sérum, Loción Capilar y Crema Biológica con PRP',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// ---------------------------------------------------------------------------
//  Línea Biológica — 3 productos confirmados de la cosmética personalizada
//  con plasma autólogo (PRP) y activos de grado profesional.
// ---------------------------------------------------------------------------

const LINEA_BIOLOGICA: { num: string; icon: typeof Sparkles; title: string; volume: string; body: string }[] = [
  {
    num: '01',
    icon: Sparkles,
    title: 'Sérum Biológico',
    volume: '30 ml',
    body: 'Sérum facial con plasma rico en plaquetas y activos de grado profesional. Hidratación profunda, luminosidad y estímulo regenerativo.',
  },
  {
    num: '02',
    icon: Droplet,
    title: 'Loción Capilar Biológica',
    volume: '30 ml',
    body: 'Formulación con PRP para cuero cabelludo. Estimula los folículos pilosos y prolonga los efectos del tratamiento capilar con plasma.',
  },
  {
    num: '03',
    icon: FlaskConical,
    title: 'Crema Biológica',
    volume: '50 ml',
    body: 'Crema facial con base biológica y principios activos seleccionados según el diagnóstico de cada piel.',
  },
]

// ---------------------------------------------------------------------------
//  Aplicaciones del PRP — 4 áreas terapéuticas del plasma autólogo.
// ---------------------------------------------------------------------------

const APLICACIONES: { num: string; icon: typeof Heart; title: string; body: string }[] = [
  {
    num: '01',
    icon: Heart,
    title: 'Estética facial',
    body: 'Rejuvenecimiento, tratamiento de manchas, regeneración dérmica y mesoterapia con plasma autólogo.',
  },
  {
    num: '02',
    icon: Activity,
    title: 'Capilar · alopecia',
    body: 'Infiltraciones de PRP en cuero cabelludo para estimular el crecimiento del cabello y frenar la caída.',
  },
  {
    num: '03',
    icon: Bone,
    title: 'Traumatología y deporte',
    body: 'Lesiones articulares, musculares y tendinosas. Infiltraciones de rodilla, hombro, codo y tendones.',
  },
  {
    num: '04',
    icon: Stethoscope,
    title: 'Odontología e implantes',
    body: 'Acelera la osteointegración en implantes y reduce los tiempos de cicatrización en cirugías de encía.',
  },
]

// ---------------------------------------------------------------------------
//  Preparación previa al procedimiento — derivada de service-content.ts
// ---------------------------------------------------------------------------

const PREPARACION: string[] = C.preparation

// ---------------------------------------------------------------------------
//  Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      {/* ============================================================
          HERO — split editorial 50/50. Foto IMG_1321 (Sérum Biológico
          con pétalos de rosa) en lado derecho con mask gradient.
          ============================================================ */}
      <section className="relative bg-white border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[640px]">

          <div
            className="relative order-first lg:order-last aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-full bg-beige"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
            }}
          >
            <Image
              src="/servicios/medicina-regenerativa/IMG_1321.JPG"
              alt="Sérum Biológico con pétalos de rosa — línea CBI Viale"
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
              <h1 className="font-serif text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.98] tracking-tightest text-ink">
                Medicina<br />
                <span className="italic text-gold-800">regenerativa</span>.
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
                  href="/contacto"
                  className="tap-min inline-flex h-14 items-center justify-center gap-2 bg-gold-700 px-7 sm:px-8 font-sans text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-gold-800 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
                >
                  Coordinar consulta
                  <ArrowRight width={16} height={16} strokeWidth={1.5} />
                </Link>

                {CONTACT.whatsapp && (
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hola, quisiera consultar por la línea biológica y los tratamientos con PRP.')}`}
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
                <Meta label="Tanda" value="Limitada" />
              </dl>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ============================================================
          DESCRIPCIÓN — texto + 2 cards (audience / includes)
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
                Cosmética que respeta la{' '}
                <span className="italic text-gold-800">biología individual</span> de cada paciente.
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
          MANIFIESTO — quote editorial sobre la línea personalizada.
          Cita literal del cliente, eje de la marca de la línea biológica.
          ============================================================ */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Manifiesto · Línea biológica
                </span>
                <GoldRule />
              </div>
              <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest leading-[1.1] text-ink">
                No todo el mundo necesita lo mismo.<br />
                Por eso{' '}
                <span className="italic text-gold-800">
                  no todo está hecho para todos
                </span>.
              </blockquote>
              <p className="mt-8 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
                Creamos serums, lociones capilares y cremas personalizadas con tu propio plasma
                rico en plaquetas y activos de grado profesional. Cada formulación es única,
                ajustada a tu piel o cuero cabelludo.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================================
          LÍNEA BIOLÓGICA — 3 productos confirmados (Sérum, Loción
          Capilar, Crema). Cards numeradas con icono + volumen + body.
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                Productos personalizados
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-3">
              La <span className="italic text-gold-800">línea biológica</span>.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
              Tres formulaciones a partir de tu propio plasma autólogo y principios activos
              seleccionados. Etiquetadas con tu nombre — creadas exclusivamente para vos.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {LINEA_BIOLOGICA.map((p, i) => {
              const Icon = p.icon
              return (
                <FadeIn key={p.num} delay={i * 0.06}>
                  <div className="group bg-white p-6 sm:p-7 lg:p-8 h-full transition-colors duration-500 hover:bg-beige/40">
                    <div className="flex items-start justify-between mb-5">
                      <Icon
                        width={28}
                        height={28}
                        strokeWidth={1.25}
                        className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                        aria-hidden
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700">
                        {p.num}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-ink mb-1">
                      {p.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-gold-700 mb-4">
                      {p.volume} · creado exclusivamente para vos
                    </p>
                    <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed">{p.body}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          {/* Aviso de presentación de la línea (cajas regalo + QR) */}
          <FadeIn delay={0.24}>
            <div className="mt-8 border-l-4 border-gold-700 bg-gold-50/60 px-5 sm:px-6 py-5 flex items-start gap-3 sm:gap-4">
              <QrCode
                width={20}
                height={20}
                strokeWidth={1.5}
                className="text-gold-800 shrink-0 mt-0.5"
                aria-hidden
              />
              <div>
                <p className="font-sans text-[12px] sm:text-sm font-semibold uppercase tracking-widest text-gold-800 mb-1">
                  Presentación
                </p>
                <p className="text-sm sm:text-base text-ink leading-relaxed">
                  Cada producto se entrega en caja premium con moño dorado e incluye una
                  tarjeta personal con QR de beneficios exclusivos. Tanda limitada.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================================
          APLICACIONES DEL PRP — 4 cards (Estética, Capilar, Trauma,
          Odonto) en col-7 + foto vertical IMG_1322 (PRP) en col-5.
          ============================================================ */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <FadeIn>
                <div className="flex items-center gap-4 mb-4">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Aplicaciones del PRP
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-4">
                  El plasma autólogo en{' '}
                  <span className="italic text-gold-800">cuatro frentes</span>.
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
                  Concentramos las plaquetas de tu propia sangre para liberar factores de
                  crecimiento que estimulan la regeneración tisular. Mismo principio biológico,
                  cuatro aplicaciones clínicas.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
                {APLICACIONES.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <FadeIn key={a.num} delay={i * 0.05}>
                      <div className="group bg-white p-6 sm:p-7 h-full transition-colors duration-500 hover:bg-beige/60">
                        <div className="flex items-start justify-between mb-5">
                          <Icon
                            width={26}
                            height={26}
                            strokeWidth={1.25}
                            className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                            aria-hidden
                          />
                          <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700">
                            {a.num}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl tracking-tight text-ink mb-2">
                          {a.title}
                        </h3>
                        <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                          {a.body}
                        </p>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>

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
                      Las aplicaciones traumatológicas, odontológicas y dermatológicas se
                      coordinan con el médico tratante. CBI provee el plasma; la infiltración
                      la realiza el profesional.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-5 order-1 lg:order-2" delay={0.08}>
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-beige">
                <Image
                  src="/servicios/medicina-regenerativa/IMG_1322.JPG"
                  alt="Extracción de sangre para procesamiento de plasma autólogo (PRP) — CBI Viale"
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
          PREPARACIÓN — pasos previos al procedimiento. Layout 5/7.
          ============================================================ */}
      <section
        id="preparacion"
        className="section border-b border-line scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Preparación
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Cómo prepararte para tu{' '}
                <span className="italic text-gold-800">turno con PRP</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                El PRP requiere una pequeña extracción de sangre. Estas indicaciones aseguran
                la calidad del plasma y la mejor experiencia el día del procedimiento.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {PREPARACION.map((step, idx) => (
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

      <FinalCTA />
      <RelatedServices currentSlug={SLUG} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Medicina Regenerativa',
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
