import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { FadeIn } from '@/components/shared/FadeIn'

/** Simple: número + texto */
type SimpleItem = string

/** Compacto: ícono en círculo + texto (una línea) */
type CompactItem = { label: string; icon?: LucideIcon }

/** Rico: ícono bare + número en esquina + título serif + descripción opcional — igual a clínica humana */
type RichItem = { num: string; icon: LucideIcon; title: string; body?: string }

export type AnalysisItem = SimpleItem | CompactItem | RichItem

function isRich(item: AnalysisItem): item is RichItem {
  return typeof item === 'object' && 'title' in item
}

interface Props {
  items: AnalysisItem[]
  gridImage?: string
  gridImageAlt?: string
  gridImageColSpan?: 1 | 2
}

export function AnalysisList({ items, gridImage, gridImageAlt, gridImageColSpan = 2 }: Props) {
  const rich = items.length > 0 && isRich(items[0]!)

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
          <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
            {items.map((item, idx) => {
              if (isRich(item)) {
                const Icon = item.icon
                return (
                  <li key={item.num}>
                    <FadeIn delay={idx * 0.04}>
                      <div className="group bg-white p-5 sm:p-6 lg:p-7 h-full transition-colors duration-500 hover:bg-beige/40">
                        <div className="flex items-start justify-between mb-4 sm:mb-5">
                          <Icon
                            width={24}
                            height={24}
                            strokeWidth={1.25}
                            className="text-gold-700 transition-transform duration-500 group-hover:scale-110"
                            aria-hidden
                          />
                          <span className="font-mono text-[11px] uppercase tracking-widest text-gold-700">
                            {item.num}
                          </span>
                        </div>
                        <h3 className="font-serif text-base sm:text-lg tracking-tight text-ink mb-2">
                          {item.title}
                        </h3>
                        {item.body && (
                          <p className="text-[13px] sm:text-sm text-ink-muted leading-relaxed">
                            {item.body}
                          </p>
                        )}
                      </div>
                    </FadeIn>
                  </li>
                )
              }

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
                    ? `${rich ? 'hidden sm:block sm:col-span-1 lg:col-span-2' : 'md:col-span-1 lg:col-span-2'} relative min-h-[200px] overflow-hidden bg-beige`
                    : 'relative min-h-[200px] overflow-hidden bg-beige'
                }
              >
                <Image
                  src={gridImage}
                  alt={gridImageAlt ?? ''}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 0px, (max-width: 1024px) 50vw, 66vw"
                />
              </li>
            )}
          </ul>
        </FadeIn>
      </Container>
    </section>
  )
}
