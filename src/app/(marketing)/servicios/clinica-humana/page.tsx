import Image from 'next/image'
import Link from 'next/link'
import {
  Stethoscope,
  Droplet,
  Activity,
  Zap,
  Atom,
  FlaskConical,
  Pill,
  Beaker,
  Microscope,
  ShieldCheck,
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
import { ServiceInquiryModal } from '@/components/marketing/ServiceInquiryModal'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'clinica-humana' as const
const C = SERVICE_CONTENT[SLUG]
const SVC = SERVICES[SLUG]

export const metadata = buildMetadata({
  title: 'Clínica Humana — Análisis clínicos en Viale',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// ---------------------------------------------------------------------------
//  Catálogo de estudios — 10 categorías editoriales que agrupan ~24 análisis
//  declarados en service-content.ts. Mantiene el formato visual de ambiental.
// ---------------------------------------------------------------------------

const CATEGORIES: { num: string; icon: typeof Stethoscope; title: string; body: string }[] = [
  {
    num: '01',
    icon: Stethoscope,
    title: 'Chequeo de rutina',
    body: 'Perfil integral con función renal, hepática, metabolismo y hematología en un solo estudio.',
  },
  {
    num: '02',
    icon: Droplet,
    title: 'Hematología',
    body: 'Hemograma completo, VSG, hierro, ferritina, transferrina y porcentaje de saturación.',
  },
  {
    num: '03',
    icon: Activity,
    title: 'Perfil lipídico',
    body: 'Colesterol total, HDL, LDL y triglicéridos para evaluación cardiovascular.',
  },
  {
    num: '04',
    icon: Zap,
    title: 'Diabetes y metabolismo',
    body: 'Glucemia, insulina basal, HbA1c, índice HOMA, curva de tolerancia oral y fructosamina.',
  },
  {
    num: '05',
    icon: Atom,
    title: 'Hormonal tiroideo',
    body: 'TSH, T4 libre y T3 libre — perfil completo de función tiroidea.',
  },
  {
    num: '06',
    icon: FlaskConical,
    title: 'Hormonal pro',
    body: 'Testosterona total y libre, SHBG, cortisol, prolactina, LH, FSH, estradiol, DHEA-S e IGF-1.',
  },
  {
    num: '07',
    icon: Pill,
    title: 'Vitamínico',
    body: 'Vitamina D, vitamina B12 y ácido fólico — control de déficits nutricionales y suplementación.',
  },
  {
    num: '08',
    icon: Beaker,
    title: 'Renal y electrolitos',
    body: 'Urea, creatinina, ácido úrico, ionograma completo (Na, K, Cl, Ca, Mg y P).',
  },
  {
    num: '09',
    icon: Microscope,
    title: 'Microbiología',
    body: 'Orina completa, urocultivo, exudados vaginales y rectales, hisopados y cultivos específicos.',
  },
  {
    num: '10',
    icon: ShieldCheck,
    title: 'Serología y especiales',
    body: 'HIV, hepatitis B y C, sífilis, dengue, celiaquía y screening neonatal — "prueba del piecito".',
  },
]

// ---------------------------------------------------------------------------
//  Indicaciones de toma de muestra — fuente: instructivos oficiales del cliente
//  (Urocultivo, Micológico, Exudado vaginal y Espermograma).
// ---------------------------------------------------------------------------

const INDICACIONES_UROCULTIVO: string[] = [
  'Lavarse muy bien las manos. Realizar higiene meticulosa de los genitales con agua tibia y jabón (preferentemente neutro).',
  'Mujeres y niñas: separar los labios mayores y limpiar de adelante hacia atrás, enjuagando bien.',
  'Hombres y niños: retraer suavemente el prepucio y limpiar el glande, enjuagando bien.',
  'Adultos · chorro medio: comenzar a orinar en el inodoro y descartar la primera parte de la micción para arrastrar las bacterias de la uretra.',
  'Sin interrumpir la micción, acercar el frasco estéril sin tocar el interior ni los bordes y recolectar la porción media hasta la mitad.',
  'Terminar de orinar el resto en el inodoro. Cerrar el frasco herméticamente, sin tocar los bordes.',
  'Bebés · al acecho: retirar el pañal tras la limpieza. Mantener al bebé despierto y, si es posible, ofrecer agua o leche para estimular la micción.',
  'Dejar caer las primeras gotas fuera del frasco y recoger la porción media directamente en el frasco estéril. Cerrar inmediatamente.',
  'Llevar la muestra al laboratorio lo antes posible (idealmente antes de 1 hora) o mantenerla refrigerada si se va a demorar.',
]

const INDICACIONES_MICOLOGICO: string[] = [
  'No lavar la zona durante al menos 24 hs previas al estudio.',
  'No aplicar cremas, ungüentos ni antimicóticos durante los 3 días anteriores.',
  'Para uñas: no cortar ni limar durante los 5 días previos.',
  'Para cuero cabelludo: no lavar con shampoo durante las 48 hs previas.',
  'Acudir al laboratorio sin haber manipulado la zona el día del estudio.',
]

const INDICACIONES_EXUDADO: string[] = [
  'No mantener relaciones sexuales durante las 48 horas previas al estudio.',
  'No utilizar óvulos, cremas, lubricantes ni duchas vaginales durante al menos 72 horas.',
  'No estar menstruando el día del estudio.',
  'Realizar higiene genital externa únicamente con agua y jabón neutro el día del estudio.',
  'Evitar el uso de talcos o desodorantes íntimos.',
]

const INDICACIONES_ESPERMOGRAMA: string[] = [
  'Mantener abstinencia sexual entre 2 y 7 días — ideal entre 3 y 5 días.',
  'Lavar cuidadosamente manos y genitales con agua y jabón neutro, enjuagar bien y secar con toalla limpia.',
  'Recolectar exclusivamente por masturbación, directamente en el frasco estéril entregado por el laboratorio.',
  'No utilizar preservativos, lubricantes ni saliva durante la recolección.',
  'Procurar recolectar toda la muestra — las primeras gotas son las más importantes.',
  'Entregar al laboratorio dentro de los 30 minutos posteriores, manteniendo el frasco a temperatura ambiente o abrigado (bufanda o bolsillo interior).',
  'No presentar fiebre ni infección urinaria o genital activa. Informar tratamientos antibióticos recientes (esperar 7–10 días tras la última dosis, salvo indicación médica).',
  'Rotular el frasco con nombre completo, fecha y hora exacta de la toma.',
]

// ---------------------------------------------------------------------------
//  Page
// ---------------------------------------------------------------------------

export default function Page() {
  return (
    <>
      {/* ============================================================
          HERO — split editorial 50/50. Foto 1.png (microscopio + pipeta)
          en lado derecho con mask gradient que difumina el borde
          izquierdo (desktop) y el borde inferior (mobile).
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
              src="/servicios/clinica-humana/1.png"
              alt="Bioquímica trabajando con micropipeta y microscopio — laboratorio CBI Viale"
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
                Clínica Humana.
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
                  Reservar turno
                  <ArrowRight width={16} height={16} strokeWidth={1.5} />
                </Link>

                <ServiceInquiryModal serviceSlug={SLUG} label="Consultar" />

                {CONTACT.whatsapp && (
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hola, quisiera consultar por análisis clínicos.')}`}
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

      {/* ============================================================
          DESCRIPCIÓN — texto + 2 cards horizontales (audience / includes)
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
                Cobertura clínica completa con{' '}
                <span className="italic text-gold-800">trazabilidad bioquímica</span>.
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
          CATÁLOGO — 10 categorías numeradas + foto editorial 2.png que
          rellena 2 celdas de la última fila (sm:1, lg:2).
          ============================================================ */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                Estudios que realizamos
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-3">
              Catálogo <span className="italic text-gold-800">clínico</span>.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
              Cubrimos todo el espectro de estudios básicos y especializados con equipamiento
              calibrado, personal bioquímico matriculado y protocolos internacionales de
              verificación.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {CATEGORIES.map((s, i) => {
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

            {/* Imagen editorial: rellena 1 celda en sm (par) o 2 celdas en lg (10 cards en grid de 3 = 12 cells, deja 2). */}
            <FadeIn className="hidden sm:block sm:col-span-1 lg:col-span-2" delay={0.42}>
              <div className="relative h-full min-h-[220px] bg-white overflow-hidden">
                <Image
                  src="/servicios/clinica-humana/2.png"
                  alt="Procesamiento de muestra clínica — laboratorio CBI Viale"
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
          TOMA DE MUESTRA CORRECTA — 4 cards (Urocultivo, Micológico,
          Exudado, Espermograma) + foto microbiología 4.png lateral.
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
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
                  Cómo preparar tu <span className="italic text-gold-800">muestra</span>.
                </h2>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-10 sm:mb-12">
                  Para asegurar resultados confiables es fundamental seguir el protocolo de toma
                  según el tipo de estudio. Elegí el instructivo correspondiente.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
                <InstructivoCard
                  href="#indicaciones-urocultivo"
                  icon={Droplet}
                  title="Urocultivo"
                  body="Recolección por chorro medio en adultos · al acecho en bebés."
                />
                <InstructivoCard
                  href="#indicaciones-micologico"
                  icon={Layers}
                  title="Micológico"
                  body="Piel, uñas y cuero cabelludo. Sin tratamientos previos en la zona."
                />
                <InstructivoCard
                  href="#indicaciones-exudado"
                  icon={ShieldCheck}
                  title="Exudado vaginal"
                  body="Higiene específica · sin relaciones, óvulos ni duchas vaginales."
                />
                <InstructivoCard
                  href="#indicaciones-espermograma"
                  icon={Microscope}
                  title="Espermograma"
                  body="Abstinencia 2–7 días · entrega dentro de los 30 minutos."
                />
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
                      Las muestras que no respetan el protocolo de toma pueden generar resultados
                      no representativos o requerir nueva extracción.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn className="lg:col-span-5 order-1 lg:order-2" delay={0.08}>
              <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-[5/6] bg-beige">
                <Image
                  src="/servicios/clinica-humana/4.png"
                  alt="Antibiograma en placa de cultivo — laboratorio CBI Viale"
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
          INDICACIONES · UROCULTIVO — 9 pasos + imagen 3.png lateral
          ============================================================ */}
      <section
        id="indicaciones-urocultivo"
        className="section border-b border-line scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Indicaciones · Urocultivo
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Toma de muestra para{' '}
                <span className="italic text-gold-800">urocultivo</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                Aplica para detección de infecciones urinarias en adultos y bebés. La técnica
                correcta es clave para evitar contaminación y resultados falsos positivos.
              </p>

              <div className="relative aspect-[4/3] bg-beige">
                <Image
                  src="/servicios/clinica-humana/3.png"
                  alt="Frascos de urocultivo y tirilla de orina — CBI Viale"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_UROCULTIVO.map((step, idx) => (
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
          INDICACIONES · MICOLÓGICO — 5 pasos
          ============================================================ */}
      <section
        id="indicaciones-micologico"
        className="section border-b border-line bg-beige/30 scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Indicaciones · Micológico
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Estudio micológico de{' '}
                <span className="italic text-gold-800">piel, uñas o cuero cabelludo</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                La preparación condiciona el resultado: cualquier tratamiento o lavado reciente
                puede interferir con el cultivo. Respetar los días sin manipulación es clave.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_MICOLOGICO.map((step, idx) => (
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
          INDICACIONES · EXUDADO VAGINAL — 5 pasos
          ============================================================ */}
      <section
        id="indicaciones-exudado"
        className="section border-b border-line scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Indicaciones · Exudado vaginal
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Toma de muestra de{' '}
                <span className="italic text-gold-800">exudado vaginal</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Para detección de infecciones vaginales y screening en embarazo (Streptococcus
                grupo B, semanas 35–37). Las indicaciones aplican para ambos tipos de estudio.
              </p>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_EXUDADO.map((step, idx) => (
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
          INDICACIONES · ESPERMOGRAMA — 8 pasos + imagen 5.png lateral
          ============================================================ */}
      <section
        id="indicaciones-espermograma"
        className="section border-b border-line bg-beige/30 scroll-mt-24"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Indicaciones · Espermograma
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                Toma de muestra para{' '}
                <span className="italic text-gold-800">espermograma</span>.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                Estudio de fertilidad masculina. La temperatura y el tiempo entre la recolección
                y el procesamiento son determinantes para la viabilidad espermática.
              </p>

              <div className="relative aspect-[4/3] bg-beige">
                <Image
                  src="/servicios/clinica-humana/5.png"
                  alt="Centrífuga y tirilla de análisis de orina — CBI Viale"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {INDICACIONES_ESPERMOGRAMA.map((step, idx) => (
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
            name: 'Análisis clínicos humanos',
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

function InstructivoCard({
  href,
  icon: Icon,
  title,
  body,
}: {
  href: string
  icon: typeof Droplet
  title: string
  body: string
}) {
  return (
    <Link
      href={href}
      className="group bg-white p-6 sm:p-7 transition-colors duration-500 hover:bg-beige/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-inset"
    >
      <div className="flex items-start justify-between mb-5">
        <Icon
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
        {title}
      </h3>
      <p className="mt-2 text-[13px] sm:text-sm text-ink-muted leading-relaxed">{body}</p>
    </Link>
  )
}
