import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { SERVICE_SLUGS, SERVICES } from '@/lib/constants'
import { ServiceIcon } from '@/components/marketing/ServiceIcon'

export const metadata = buildMetadata({
  title: 'Reservar turno',
  description:
    'Elegí el servicio y coordiná tu turno online. Sin llamadas, en minutos, con confirmación automática.',
  path: '/turnos',
})

// Paso 1 del flujo de booking — elegir servicio.
// Los pasos 2-5 (calendario, horario, datos, confirmación) se construyen en Fase 2.
export default function TurnosPage() {
  return (
    <section className="section">
      <Container>
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Reserva online · Paso 1 de 5
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
            Elegí el tipo
            <br />
            <span className="italic text-gold-800">de análisis.</span>
          </h1>
          <p className="mt-8 text-lg text-ink-muted leading-relaxed">
            Seleccioná el servicio para ver días y horarios disponibles.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {SERVICE_SLUGS.map((slug, idx) => {
            const svc = SERVICES[slug]
            const num = String(idx + 1).padStart(2, '0')
            return (
              <Link
                key={slug}
                href={`/turnos/${slug}/fecha`}
                className="group bg-white p-8 transition-colors duration-500 hover:bg-beige/60"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-gold-700">
                    {num}
                  </span>
                  <ArrowRight
                    width={18}
                    height={18}
                    strokeWidth={1.25}
                    className="text-ink/40 transition-all duration-500 group-hover:text-gold-700 group-hover:translate-x-1"
                  />
                </div>
                <ServiceIcon slug={slug} size={32} strokeWidth={1} className="mb-6" />
                <h2 className="font-serif text-xl tracking-tight text-ink group-hover:text-gold-800 transition-colors">
                  {svc.name}
                </h2>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{svc.short}</p>
                <p className="mt-6 text-xs text-ink-muted">~{svc.duration} min</p>
              </Link>
            )
          })}
        </div>

      </Container>
    </section>
  )
}
