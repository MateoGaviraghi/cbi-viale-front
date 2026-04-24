import { buildMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export const metadata = buildMetadata({
  title: 'Nosotros — Centro Bioquímico Integral',
  description:
    'Conocé al equipo del Centro Bioquímico Integral de Viale, Entre Ríos. Bioquímica especializada en endocrinología, bacteriología clínica y cosmetología regenerativa.',
  path: '/nosotros',
})

export default function NosotrosPage() {
  return (
    <>
      {/* Hero intro */}
      <section className="section border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  El equipo
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
                Un equipo humano.
                <br />
                <span className="italic text-gold-800">Un trabajo</span> preciso.
              </h1>
              <p className="mt-8 text-lg text-ink-muted leading-relaxed max-w-2xl">
                Fundado en 2025 en Viale, Entre Ríos, CBI nació de la decisión de brindar un
                servicio bioquímico de calidad en la comunidad. Ciencia, responsabilidad y
                atención personalizada en cada análisis.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Perfil Nahir Gastaldi */}
      <section className="section border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Visual / datos de perfil */}
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="bg-beige/50 border border-line p-8 sticky top-24">
                  <div className="flex items-center gap-3 mb-6">
                    <GoldRule />
                    <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                      Fundadora
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl tracking-tightest text-ink">
                    Nahir Gastaldi
                  </h2>
                  <p className="mt-1 font-sans text-sm text-gold-800">
                    Bioquímica · M.N. [pendiente]
                  </p>

                  <div className="mt-8 space-y-4 divide-y divide-line">
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
              </FadeIn>
            </div>

            {/* Bio */}
            <div className="lg:col-span-8">
              <FadeIn delay={0.08}>
                <div className="flex items-center gap-4 mb-10">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Sobre mí
                  </span>
                </div>

                <div className="space-y-6 text-ink-muted leading-relaxed text-lg">
                  <p>
                    Desde el inicio supe que quería dedicarme a las ciencias de la salud. Dudé
                    entre medicina y bioquímica, y finalmente elegí este camino casi por
                    azar… pero hoy puedo decir con total certeza que fue la decisión correcta.
                  </p>

                  <p>
                    Durante mi formación descubrí una profunda vocación por el diagnóstico:
                    entender qué ocurre en el cuerpo, interpretar procesos biológicos y, sobre
                    todo, poder ayudar a las personas desde un enfoque científico y preciso.
                  </p>

                  <p>
                    Cursé la carrera de Bioquímica entre 2019 y 2024, completando no solo la
                    formación académica sino también prácticas y pasantías intensivas en el
                    Hospital Cullen y el Sanatorio Santa Fe. Elegí transitar esta etapa de
                    manera exigente, lo que me permitió adquirir experiencia clínica en un
                    corto tiempo.
                  </p>

                  <p>
                    Al finalizar, decidí dar un paso distinto: viajé al exterior y trabajé en
                    Estados Unidos. Esta experiencia, aunque alejada del ámbito profesional, me
                    permitió desarrollar independencia, disciplina y reunir los recursos
                    necesarios para concretar mi proyecto personal: regresar, recibirme y crear
                    mi propio espacio.
                  </p>

                  <p>
                    En mayo de 2025 obtuve mi título y, poco tiempo después, junto a mi equipo,
                    fundamos el laboratorio en Viale, mi lugar de origen. Este proyecto no solo
                    representa un crecimiento profesional, sino también una apuesta por brindar
                    un servicio de calidad en la comunidad donde crecí.
                  </p>
                </div>

                {/* Especialización */}
                <div className="mt-12 border-t border-line pt-10">
                  <div className="flex items-center gap-4 mb-6">
                    <GoldRule />
                    <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                      Especialización
                    </span>
                  </div>
                  <div className="space-y-6 text-ink-muted leading-relaxed text-lg">
                    <p>
                      Actualmente continúo mi formación con una fuerte orientación científica y
                      clínica. Me especializo en bioquímica endocrinológica y soy miembro de la
                      Sociedad Argentina de Endocrinología y Metabolismo (SAEM). Además, inicié
                      la especialización en bacteriología clínica, consolidando un perfil
                      integral dentro del laboratorio.
                    </p>
                    <p>
                      Paralelamente, desarrollé mi formación en cosmetología profesional y
                      bioquímica regenerativa, un área que me apasiona profundamente. Este
                      enfoque permite aplicar principios científicos al cuidado de la piel y la
                      regeneración tisular, utilizando herramientas como el plasma autólogo y
                      formulaciones personalizadas.
                    </p>
                    <p>
                      Recientemente desarrollé una línea de cosméticos personalizados basada en
                      un enfoque bioquímico y regenerativo. Cada formulación se realiza de
                      manera individual, con selección de activos y ajuste de concentraciones
                      según las necesidades de cada piel, con la posibilidad de incorporar
                      plasma autólogo como componente biológico propio.
                    </p>
                  </div>
                </div>

                {/* Cita cierre */}
                <blockquote className="mt-12 border-l-2 border-gold-700 pl-6">
                  <p className="font-serif text-xl italic text-ink leading-relaxed">
                    &ldquo;Mi objetivo es claro: trabajar con precisión, responsabilidad y base
                    científica, ofreciendo soluciones reales y personalizadas, tanto en el
                    diagnóstico clínico como en el cuidado integral de la salud.&rdquo;
                  </p>
                  <footer className="mt-4 font-sans text-sm text-ink-muted">
                    — Nahir Gastaldi, Bioquímica · CBI Viale
                  </footer>
                </blockquote>
              </FadeIn>
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
