import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/shared/FadeIn'

interface Props {
  items: string[]
}

// Lista numerada de estudios / análisis cubiertos por el servicio.
// Grid editorial con bordes sutiles y numeración mono.
export function AnalysisList({ items }: Props) {
  return (
    <section className="section bg-beige/40 border-y border-line">
      <Container>
        <SectionHeading
          eyebrow="Estudios que realizamos"
          title={
            <>
              Catálogo <span className="italic text-gold-800">completo</span>.
            </>
          }
          lead="Cada análisis se procesa con equipamiento calibrado y protocolos de control de calidad vigentes."
        />

        <FadeIn delay={0.1}>
          <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {items.map((item, idx) => (
              <li key={idx} className="bg-white p-6 md:p-8 flex items-start gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-700 mt-1 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
