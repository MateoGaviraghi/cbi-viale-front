import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/shared/FadeIn'

interface Props {
  steps: string[]
}

// Lista editorial de pasos de preparación — cada paso es una fila con número mono.
export function PreparationSteps({ steps }: Props) {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Cómo prepararse"
          title={
            <>
              Antes de tu <span className="italic text-gold-800">turno</span>.
            </>
          }
        />

        <div className="mt-16 max-w-3xl">
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="flex items-start gap-6 py-6 border-b border-line">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-700 shrink-0 pt-1 w-8">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-lg text-ink leading-relaxed">{step}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
