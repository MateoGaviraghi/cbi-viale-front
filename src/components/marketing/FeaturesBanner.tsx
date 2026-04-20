'use client'

import { ShieldCheck, HomeIcon, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'

// Franja institucional de beneficios — 3 diferenciadores confirmados por el
// cliente: obras sociales sin adicionales, sin cargos extras, domicilio.
const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Todas las obras sociales',
    body: 'Recibimos a todos los afiliados. Trabajamos con las principales coberturas de la región.',
  },
  {
    icon: Sparkles,
    title: 'Sin cobro de adicionales',
    body: 'Tu estudio no tiene costos ocultos. Lo que corresponde por tu cobertura es lo que pagás.',
  },
  {
    icon: HomeIcon,
    title: 'Extracciones a domicilio',
    body: 'Para pacientes particulares: coordinamos la extracción en tu casa por WhatsApp.',
  },
] as const

export function FeaturesBanner() {
  return (
    <section className="py-16 md:py-20 bg-beige/40 border-y border-line">
      <Container>
        <div className="flex items-center gap-4 mb-10 md:mb-14 justify-center">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">
            Beneficios CBI
          </span>
          <GoldRule />
        </div>

        <StaggerGroup
          stagger={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line"
        >
          {FEATURES.map((f) => (
            <StaggerItem key={f.title} className="bg-white p-8 md:p-10">
              <div className="inline-flex mb-6 p-3 border border-line">
                <f.icon width={22} height={22} strokeWidth={1.2} className="text-gold-700" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl tracking-tight text-ink leading-tight mb-3">
                {f.title}
              </h3>
              <p className="text-ink-muted text-[15px] leading-relaxed">{f.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}
