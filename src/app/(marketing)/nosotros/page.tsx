import { buildMetadata } from '@/lib/seo/metadata'
import { ProfilePhoto } from './ProfilePhoto'
import { GonzaloPhoto } from './GonzaloPhoto'
import { DanielaPhoto } from './DanielaPhoto'
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
//  Timeline de Gonzalo Álvarez
// ---------------------------------------------------------------------------

const GONZALO_TIMELINE: { year: string; title: string; body: string }[] = [
  {
    year: '2018 – 2023',
    title: 'Formación · Bioquímico',
    body: 'Realicé mi formación en la FBCB · UNL, transitando una etapa intensa de aprendizaje académico y formación práctica. Durante la carrera adquirí experiencia en diferentes áreas del laboratorio clínico, desarrollando una mirada integral y resolutiva de la bioquímica aplicada a la salud.',
  },
  {
    year: '2023',
    title: 'Título de Bioquímico',
    body: 'Obtuve el título oficial de Bioquímico en la Facultad de Bioquímica y Ciencias Biológicas · UNL. El cierre de esta etapa marcó el comienzo del verdadero desafío: llevar todo lo aprendido a la práctica profesional.',
  },
  {
    year: '2023 – 2024',
    title: 'Experiencia profesional · Santa Fe y Reconquista',
    body: 'Inicié mi desarrollo profesional en instituciones de referencia: Hospital de Niños Dr. Orlando Alassia y CEMAFE en Santa Fe, fortaleciendo mi formación en áreas clínicas y hospitalarias. Posteriormente me desempeñé en el Hospital Central de Reconquista, experiencia que amplió mi capacidad de trabajo en contextos de alta demanda.',
  },
  {
    year: '2025',
    title: 'Hospital Jaime Ferré · Rafaela',
    body: 'Comencé a realizar guardias bioquímicas en el Hospital Jaime Ferré, incorporando experiencia en resolución diagnóstica, urgencias y trabajo interdisciplinario.',
  },
  {
    year: '2025',
    title: 'Hospital Joseph Lister · Seguí',
    body: 'Inicié actividades en el Hospital Joseph Lister. El trabajo constante, la responsabilidad diaria y el desafío de sostener largas jornadas fortalecieron aún más mi compromiso con la profesión.',
  },
  {
    year: 'En curso',
    title: 'Formación continua',
    body: 'Continúo capacitándome en bioquímica clínica y microbiología: Aspectos de la Microbiología en Pediatría, SISA (Sistema Integrado de Información Sanitaria Argentina) y formación continua en diagnóstico bioquímico y laboratorio hospitalario.',
  },
]

// ---------------------------------------------------------------------------
//  Timeline de Daniela Barboza
// ---------------------------------------------------------------------------

const DANIELA_TIMELINE: { year: string; title: string; body: string }[] = [
  {
    year: 'Formación',
    title: 'Técnica en Análisis Clínicos · UADER',
    body: 'Egresada de la Facultad de Ciencias de la Vida y la Salud – UADER. Durante mi formación adquirí experiencia práctica en distintas áreas del laboratorio clínico: procesamiento de muestras, química clínica, hematología, microbiología y manejo de equipamiento automatizado.',
  },
  {
    year: 'Experiencia',
    title: 'Instituciones hospitalarias de Entre Ríos',
    body: 'Me desempeñé realizando suplencias en el Hospital Dr. Castilla Mira, el Hospital Gral. Francisco Ramírez y el Hospital Santa Rosa. Cada experiencia fortaleció mis habilidades técnicas y mi vocación por esta profesión.',
  },
  {
    year: 'Actualidad',
    title: 'CBI Viale',
    body: 'Integro el equipo del Centro Bioquímico Integral aportando dedicación, responsabilidad y calidez humana en cada tarea. Disfruto aprender constantemente y crecer profesionalmente dentro de un entorno donde el compromiso y el trabajo en equipo son esenciales.',
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
                      <ProfileRow label="Título" value="Bioquímico — FBCB · UNL (2023)" />
                      <ProfileRow label="Especialización" value="Genética · Estudios de filiación y ADN" />
                      <ProfileRow label="Formación clínica" value="H. Orlando Alassia · CEMAFE · H. Reconquista" />
                      <ProfileRow label="Guardias" value="Hospital Jaime Ferré · Hospital Joseph Lister" />
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
                  Mi <span className="italic text-gold-800">historia</span>.
                </h3>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-12">
                  Desde el inicio supe que quería dedicarme a las ciencias de la salud. Elegí la
                  bioquímica porque encontré en ella una combinación entre ciencia, análisis y
                  compromiso humano. Con el paso de los años confirmé que había elegido el camino
                  correcto.
                </p>
              </FadeIn>

              <Timeline items={GONZALO_TIMELINE} ringColor="ring-beige/30" />

              <Reveal direction="up" delay={0.1}>
                <blockquote className="mt-16 border-l-2 border-gold-700 pl-6">
                  <p className="font-serif text-xl italic text-ink leading-relaxed">
                    &ldquo;Entiendo la bioquímica como una herramienta fundamental para mejorar la
                    calidad de vida de las personas. Mi objetivo es trabajar con responsabilidad,
                    precisión y criterio científico, manteniendo siempre una atención humana y
                    comprometida.&rdquo;
                  </p>
                  <footer className="mt-4 font-sans text-sm text-ink-muted">
                    — Gonzalo Omar Alvarez · Bioquímico · CBI Viale
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          PERFIL · DANIELA BARBOZA — Técnica en Análisis Clínicos
          ============================================================ */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <div className="lg:col-span-4">
              <FadeIn>
                <div className="bg-beige/50 border border-line overflow-hidden sticky top-24">
                  <DanielaPhoto />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-5">
                      <GoldRule />
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                        Equipo
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl tracking-tightest text-ink">
                      Daniela Barboza
                    </h2>
                    <p className="mt-1 font-sans text-sm text-gold-800">
                      Técnica en Análisis Clínicos
                    </p>
                    <div className="mt-7 space-y-4 divide-y divide-line">
                      <ProfileRow label="Institución" value="UADER — Fac. Ciencias de la Vida y la Salud" />
                      <ProfileRow label="Áreas" value="Química clínica · Hematología · Microbiología" />
                      <ProfileRow label="Experiencia" value="H. Castilla Mira · H. Ramírez · H. Santa Rosa" />
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
                  Mi <span className="italic text-gold-800">historia</span>.
                </h3>
                <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mb-12">
                  Elegí el camino de los análisis clínicos porque siempre me interesó el trabajo en
                  el área de la salud y el rol fundamental que cumple el laboratorio en el cuidado
                  de las personas.
                </p>
              </FadeIn>

              <Timeline items={DANIELA_TIMELINE} ringColor="ring-white" />

              <Reveal direction="up" delay={0.1}>
                <blockquote className="mt-16 border-l-2 border-gold-700 pl-6">
                  <p className="font-serif text-xl italic text-ink leading-relaxed">
                    &ldquo;Me considero una persona responsable, organizada y comprometida con
                    brindar un trabajo de calidad, siempre con disposición para seguir aprendiendo
                    y aportar de manera positiva al equipo.&rdquo;
                  </p>
                  <footer className="mt-4 font-sans text-sm text-ink-muted">
                    — Daniela Barboza · Técnica en Análisis Clínicos · CBI Viale
                  </footer>
                </blockquote>
              </Reveal>
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
