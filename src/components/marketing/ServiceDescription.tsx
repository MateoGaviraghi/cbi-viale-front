import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'

interface Props {
  paragraphs: string[]
  audience: string
  includes: string
}

// Bloque de descripción + columnas "¿para quién es?" y "qué incluye".
export function ServiceDescription({ paragraphs, audience, includes }: Props) {
  return (
    <section className="section">
      <Container>
        <FadeIn className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Descripción del servicio
            </span>
          </div>
          <div className="space-y-6 text-lg text-ink leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
            <div className="bg-white p-8 md:p-10">
              <p className="text-[11px] uppercase tracking-widest text-gold-700 mb-4">
                ¿Para quién es?
              </p>
              <p className="text-ink-muted leading-relaxed">{audience}</p>
            </div>
            <div className="bg-white p-8 md:p-10">
              <p className="text-[11px] uppercase tracking-widest text-gold-700 mb-4">
                ¿Qué incluye?
              </p>
              <p className="text-ink-muted leading-relaxed">{includes}</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
