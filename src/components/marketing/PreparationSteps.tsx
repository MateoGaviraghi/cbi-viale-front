import type React from 'react'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/shared/FadeIn'

export type PreparationStep = string | { label: string; icon?: LucideIcon }

interface Props {
  steps: PreparationStep[]
  eyebrow?: string
  title?: React.ReactNode
  image?: string
  imageAlt?: string
}

function StepRow({ step, idx }: { step: PreparationStep; idx: number }) {
  const label = typeof step === 'string' ? step : step.label
  const Icon = typeof step === 'string' ? undefined : step.icon

  return (
    <FadeIn delay={idx * 0.05}>
      <div className="flex items-start gap-5 py-6 border-b border-line">
        {Icon ? (
          <span className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-gold-700/30 bg-gold-50/60">
            <Icon size={16} strokeWidth={1.5} className="text-gold-700" />
          </span>
        ) : (
          <span className="font-mono text-xs uppercase tracking-widest text-gold-700 shrink-0 pt-1 w-8">
            {String(idx + 1).padStart(2, '0')}
          </span>
        )}
        <p className="text-lg text-ink leading-relaxed">{label}</p>
      </div>
    </FadeIn>
  )
}

export function PreparationSteps({ steps, eyebrow, title, image, imageAlt }: Props) {
  const defaultTitle = (
    <>
      Antes de tu <span className="italic text-gold-800">turno</span>.
    </>
  )

  if (image) {
    return (
      <section className="section border-t border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <SectionHeading
                eyebrow={eyebrow ?? 'Cómo prepararse'}
                title={title ?? defaultTitle}
              />
              <div className="mt-12">
                {steps.map((step, idx) => (
                  <StepRow key={idx} step={step} idx={idx} />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
                <Image
                  src={image}
                  alt={imageAlt ?? ''}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={eyebrow ?? 'Cómo prepararse'}
          title={title ?? defaultTitle}
        />
        <div className="mt-16 max-w-3xl">
          {steps.map((step, idx) => (
            <StepRow key={idx} step={step} idx={idx} />
          ))}
        </div>
      </Container>
    </section>
  )
}
