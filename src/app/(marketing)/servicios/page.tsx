import { buildMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { ServiceGrid } from '@/components/marketing/ServiceGrid'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export const metadata = buildMetadata({
  title: 'Servicios — Seis áreas de análisis',
  description:
    'Análisis clínico humano, veterinario, agro-alimentario, ambiental, medicina regenerativa y genética. Todo en un mismo laboratorio en Viale, Entre Ríos.',
  path: '/servicios',
})

export default function ServiciosPage() {
  return (
    <>
      <section className="section border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                Servicios
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
              Seis áreas.
              <br />
              <span className="italic text-gold-800">Un mismo estándar.</span>
            </h1>
            <p className="mt-8 text-lg text-ink-muted leading-relaxed">
              Desde clínica humana hasta controles ambientales. Cada área está atendida por
              profesionales dedicados, con equipamiento calibrado y protocolos de calidad
              vigentes. Explorá cada servicio abajo.
            </p>
          </div>
        </Container>
      </section>

      <ServiceGrid showHeading={false} />
      <FinalCTA />
    </>
  )
}
