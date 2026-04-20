import { buildMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export const metadata = buildMetadata({
  title: 'Nosotros — Centro Bioquímico Integral',
  description:
    'Conocé al equipo del Centro Bioquímico Integral de Viale, Entre Ríos. Más de 15 años acompañando la salud de la comunidad.',
  path: '/nosotros',
})

export default function NosotrosPage() {
  return (
    <>
      <section className="section border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                Nuestra historia
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
              Un equipo humano.
              <br />
              <span className="italic text-gold-800">Un trabajo</span> preciso.
            </h1>
            <p className="mt-8 text-lg text-ink-muted leading-relaxed">
              [Historia del centro — pendiente de completar por el cliente. Ver CONTENT.md]
            </p>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              Esta página se va a completar con la historia real de CBI, la presentación de cada
              profesional del equipo, los valores del centro y una galería del laboratorio.
            </p>

            <p className="mt-10 text-xs uppercase tracking-widest text-gold-700">
              En construcción · Fase 2
            </p>
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  )
}
