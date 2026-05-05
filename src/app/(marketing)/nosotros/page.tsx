import { buildMetadata } from '@/lib/seo/metadata'
import { ProfilePhoto } from './ProfilePhoto'
import { GonzaloPhoto } from './GonzaloPhoto'
import { NosotrosHero } from './NosotrosHero'
import { Timeline } from './Timeline'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'
import { Reveal } from '@/components/shared/Reveal'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export const metadata = buildMetadata({
  title: 'Nosotros — Centro Bioquímico Integral',
  description:
    'Conocé al equipo del Centro Bioquímico Integral de Viale, Entre Ríos. Bioquímica especializada en endocrinología, bacteriología clínica y medicina regenerativa.',
  path: '/nosotros',
})

// ---------------------------------------------------------------------------
//  Timeline de Nahir Gastaldi — orden cronológico de su trayectoria.
//  Cada hito anima al entrar en viewport (stagger via Reveal).
// ---------------------------------------------------------------------------

const NAHIR_TIMELINE: { year: string; title: string; body: string }[] = [
  {
    year: '2019 – 2024',
    title: 'Formación · Bioquímica',
    body:
      'Cursé la carrera entre 2019 y 2024 en la FBCB · UNL, completando prácticas y pasantías intensivas en el Hospital Cullen y el Sanatorio Santa Fe. Elegí transitar esta etapa de manera exigente — adquirí experiencia clínica real en poco tiempo.',
  },
  {
    year: '2024',
    title: 'Experiencia internacional',
    body:
      'Después de la cursada viajé a Estados Unidos. Una experiencia alejada del ámbito profesional pero clave: me dio independencia, disciplina y los recursos para concretar el proyecto personal de volver y crear mi propio espacio.',
  },
  {
    year: 'Mayo 2025',
    title: 'Título de Bioquímica',
    body:
      'Obtuve el título oficial en la FBCB · UNL. Cierre de un ciclo y arranque del próximo: regresar a Viale y dar el siguiente paso.',
  },
  {
    year: '2025',
    title: 'Fundación de CBI Viale',
    body:
      'Junto al equipo abrimos el Centro Bioquímico Integral en Viale, mi lugar de origen. Una apuesta por brindar un servicio de calidad en la comunidad donde crecí.',
  },
  {
    year: 'En curso',
    title: 'Especializaciones',
    body:
      'Continúo mi formación con orientación clínica: bioquímica endocrinológica (miembro SAEM — Sociedad Argentina de Endocrinología y Metabolismo), bacteriología clínica y cosmetología regenerativa.',
  },
  {
    year: '2025',
    title: 'Línea biológica',
    body:
      'Desarrollo de una línea de cosméticos personalizados (Sérum Biológico, Loción Capilar Biológica, Crema Biológica) formulada con plasma autólogo y activos seleccionados según cada piel.',
  },
]

// ---------------------------------------------------------------------------
//  Timeline de Gonzalo Álvarez — pendiente de info completa del cliente.
// ---------------------------------------------------------------------------

const GONZALO_TIMELINE: { year: string; title: string; body: string }[] = [
  {
    year: 'Actualidad',
    title: 'Genética y filiación en CBI Viale',
    body:
      'Bioquímico (MP 1178). Especialización en estudios genéticos de filiación y análisis de ADN. Su participación garantiza el respaldo profesional y técnico en los estudios de paternidad y diagnóstico genético.',
  },
]

// ---------------------------------------------------------------------------
//  Page
// ---------------------------------------------------------------------------

export default function NosotrosPage() {
  return (
    <>
      {/* ============================================================
          HERO — split editorial con texto a la izquierda y composición
          de las dos fotos del equipo a la derecha (parallax sutil).
          ============================================================ */}
      <NosotrosHero />

      {/* ============================================================
          PERFIL · NAHIR GASTALDI — card sticky + timeline cronológico
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Card sticky de perfil */}
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="bg-beige/50 border border-line overflow-hidden sticky top-24">
                  <ProfilePhoto />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <GoldRule />
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                        Fundadora
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl tracking-tightest text-ink">
                      Nahir Gastaldi
                    </h2>
                    <p className="mt-1 font-sans text-sm text-gold-800">Bioquímica</p>
                    <div className="mt-7 space-y-4 divide-y divide-line">
                      <ProfileRow label="Título" value="Bioquímica — FBCB · UNL (2025)" />
                      <ProfileRow label="Especialización" value="Bioquímica endocrinológica" />
                      <ProfileRow label="Sociedad" value="SAEM — Endocrinología y Metabolismo" />
                      <ProfileRow
                        label="Formación adicional"
                        value="Bacteriología clínica · Cosmetología profesional"
                      />
                      <ProfileRow label="Prácticas" value="Hospital Cullen · Sanatorio Santa Fe" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Timeline cronológico */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.06}>
                <div className="flex items-center gap-4 mb-4">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Trayectoria
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                  Mi <span className="italic text-gold-800">historia</span>.
                </h3>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-12">
                  Desde el inicio supe que quería dedicarme a las ciencias de la salud. Dudé entre
                  medicina y bioquímica, y elegí este camino casi por azar — hoy puedo decir con
                  total certeza que fue la decisión correcta.
                </p>
              </FadeIn>

              {/* Timeline scroll-linked: línea dorada con progress fill +
                  cada item interpola opacity/translateY al scroll del bbox. */}
              <Timeline items={NAHIR_TIMELINE} ringColor="ring-white" />

              {/* Cita de cierre */}
              <Reveal direction="up" delay={0.1}>
                <blockquote className="mt-16 border-l-2 border-gold-700 pl-6">
                  <p className="font-serif text-xl italic text-ink leading-relaxed">
                    &ldquo;Mi objetivo es claro: trabajar con precisión, responsabilidad y base
                    científica, ofreciendo soluciones reales y personalizadas, tanto en el
                    diagnóstico clínico como en el cuidado integral de la salud.&rdquo;
                  </p>
                  <footer className="mt-4 font-sans text-sm text-ink-muted">
                    — Nahir Gastaldi, Bioquímica · CBI Viale
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          PERFIL · GONZALO ÁLVAREZ — misma estructura, timeline corto
          (pendiente info completa del cliente).
          ============================================================ */}
      <section className="section border-b border-line bg-beige/30">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <div className="lg:col-span-4">
              <FadeIn>
                <div className="bg-white border border-line overflow-hidden sticky top-24">
                  <GonzaloPhoto />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <GoldRule />
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                        Equipo
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl tracking-tightest text-ink">
                      Gonzalo Alvarez
                    </h2>
                    <p className="mt-1 font-sans text-sm text-gold-800">
                      Bioquímico · MP 1178
                    </p>
                    <div className="mt-7 space-y-4 divide-y divide-line">
                      <ProfileRow
                        label="Especialización"
                        value="Genética · Estudios de filiación y ADN"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-8">
              <FadeIn delay={0.06}>
                <div className="flex items-center gap-4 mb-4">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Trayectoria
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest text-ink mb-6">
                  Sobre <span className="italic text-gold-800">Gonzalo</span>.
                </h3>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-12">
                  Bioquímico con orientación específica en genética. Aporta el respaldo profesional
                  y técnico de los estudios de filiación y análisis de ADN que ofrece CBI.
                </p>
              </FadeIn>

              <Timeline items={GONZALO_TIMELINE} ringColor="ring-beige/30" />
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="pt-4 first:pt-0">
      <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-1">{label}</p>
      <p className="text-sm text-ink leading-relaxed">{value}</p>
    </div>
  )
}
