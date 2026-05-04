import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/shared/FadeIn'

export type AnalysisItem = string | { label: string; icon?: LucideIcon }

interface Props {
  items: AnalysisItem[]
  /** Imagen que ocupa los huecos vacíos del último row dentro de la grilla */
  gridImage?: string
  gridImageAlt?: string
  /** Cuántas columnas vacías ocupa la imagen en lg (por defecto 2) */
  gridImageColSpan?: 1 | 2
}

export function AnalysisList({ items, gridImage, gridImageAlt, gridImageColSpan = 2 }: Props) {
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
            {items.map((item, idx) => {
              const label = typeof item === 'string' ? item : item.label
              const Icon = typeof item === 'string' ? undefined : item.icon

              return (
                <li key={idx} className="bg-white p-6 md:p-8 flex items-start gap-4">
                  {Icon ? (
                    <span className="shrink-0 mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-gold-700/30 bg-gold-50/60">
                      <Icon size={16} strokeWidth={1.5} className="text-gold-700" />
                    </span>
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-widest text-gold-700 mt-1 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                  <span className="text-ink leading-relaxed">{label}</span>
                </li>
              )
            })}

            {gridImage && (
              <li
                className={
                  gridImageColSpan === 2
                    ? 'md:col-span-1 lg:col-span-2 relative min-h-[200px] overflow-hidden bg-beige'
                    : 'relative min-h-[200px] overflow-hidden bg-beige'
                }
              >
                <Image
                  src={gridImage}
                  alt={gridImageAlt ?? ''}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                />
              </li>
            )}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
