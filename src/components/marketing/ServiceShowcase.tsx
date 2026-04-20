'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { SplitText } from '@/components/shared/SplitText'
import { cn } from '@/lib/utils'

// ServiceShowcase — banda visual única por servicio.
// Variantes de layout para evitar que las landings se vean idénticas.
//
//  · default  — hero panorámico con bloque overlay de texto a la izquierda
//  · split    — columnas asimétricas 7/5 con imagen grande + tres highlights
//  · quote    — bloque centrado con imagen + cita editorial grande
//  · tiles    — 2x2 grid de conceptos + una imagen principal

type Variant = 'default' | 'split' | 'quote' | 'tiles'

interface Highlight {
  title: string
  body: string
}

interface Props {
  variant?: Variant
  eyebrow: string
  headline: string
  lead?: string
  image?: string
  imageAlt?: string
  highlights?: Highlight[]
  quote?: { text: string; author?: string }
}

export function ServiceShowcase({
  variant = 'default',
  eyebrow,
  headline,
  lead,
  image,
  imageAlt,
  highlights = [],
  quote,
}: Props) {
  if (variant === 'split') return <SplitVariant {...{ eyebrow, headline, lead, image, imageAlt, highlights }} />
  if (variant === 'quote') return <QuoteVariant {...{ eyebrow, headline, image, imageAlt, quote }} />
  if (variant === 'tiles') return <TilesVariant {...{ eyebrow, headline, lead, image, imageAlt, highlights }} />
  return <DefaultVariant {...{ eyebrow, headline, lead, image, imageAlt }} />
}

// -------- VARIANT 1: DEFAULT — editorial con texto overlay ----------
function DefaultVariant({ eyebrow, headline, lead, image, imageAlt }: Omit<Props, 'variant'>) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative py-16 md:py-24 lg:py-28 bg-ink text-white overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 opacity-25">
        {image ? (
          <Image src={image} alt={imageAlt ?? ''} fill className="object-cover" sizes="100vw" />
        ) : (
          <DecorativePattern />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden />

      <Container className="relative">
        <Reveal direction="up">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule length="long" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
          </div>
        </Reveal>

        <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] max-w-4xl">
          <SplitText inView staggerChildren={0.06} duration={0.8}>
            {headline}
          </SplitText>
        </h3>

        {lead && (
          <Reveal direction="up" delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  )
}

// -------- VARIANT 2: SPLIT — imagen grande + highlights ----------
function SplitVariant({ eyebrow, headline, lead, image, imageAlt, highlights }: Omit<Props, 'variant'>) {
  return (
    <section className="section bg-beige/40 border-y border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <Reveal direction="left" className="lg:col-span-7">
            <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden border border-line bg-ink">
              {image ? (
                <Image src={image} alt={imageAlt ?? ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
              ) : (
                <DecorativePattern dark />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-white/70">
                <span>[Foto real del servicio · pendiente]</span>
                <span>CBI</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-6">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">{eyebrow}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.03em] text-ink">
                <SplitText inView staggerChildren={0.06} duration={0.75}>
                  {headline}
                </SplitText>
              </h3>
            </Reveal>

            {lead && (
              <Reveal direction="up" delay={0.2}>
                <p className="mt-6 text-ink-muted leading-relaxed">{lead}</p>
              </Reveal>
            )}

            {highlights && highlights.length > 0 && (
              <ul className="mt-10 space-y-6 border-t border-line pt-8">
                {highlights.map((h, i) => (
                  <Reveal key={i} direction="up" delay={0.3 + i * 0.08}>
                    <li>
                      <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700 mb-1.5">
                        {String(i + 1).padStart(2, '0')} · {h.title}
                      </p>
                      <p className="text-ink leading-relaxed">{h.body}</p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

// -------- VARIANT 3: QUOTE — imagen + cita ----------
function QuoteVariant({ eyebrow, headline, image, imageAlt, quote }: Omit<Props, 'variant'>) {
  return (
    <section className="section bg-white border-y border-line">
      <Container>
        <Reveal direction="up" className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">{eyebrow}</span>
            <GoldRule />
          </div>
          <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.03em] text-ink text-center">
            <SplitText inView staggerChildren={0.06} duration={0.8}>
              {headline}
            </SplitText>
          </h3>
        </Reveal>

        <div className="mt-16 max-w-5xl mx-auto">
          <Reveal direction="up" delay={0.2}>
            <div className="relative aspect-[16/8] w-full overflow-hidden border border-line bg-beige">
              {image ? (
                <Image src={image} alt={imageAlt ?? ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 80vw" />
              ) : (
                <DecorativePattern />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/30" aria-hidden />
            </div>
          </Reveal>

          {quote && (
            <Reveal direction="up" delay={0.35}>
              <blockquote className="mt-12 max-w-3xl mx-auto text-center">
                <p className="font-serif italic text-xl md:text-2xl text-ink leading-snug">
                  “{quote.text}”
                </p>
                {quote.author && (
                  <footer className="mt-6 font-sans text-xs uppercase tracking-[0.28em] text-gold-700">
                    — {quote.author}
                  </footer>
                )}
              </blockquote>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}

// -------- VARIANT 4: TILES — 2x2 de highlights + imagen ----------
function TilesVariant({ eyebrow, headline, lead, image, imageAlt, highlights }: Omit<Props, 'variant'>) {
  return (
    <section className="section bg-beige/30 border-y border-line">
      <Container>
        <Reveal direction="up" className="max-w-3xl mb-14">
          <div className="flex items-center gap-4 mb-6">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">{eyebrow}</span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-[-0.03em] text-ink">
            <SplitText inView staggerChildren={0.06} duration={0.75}>
              {headline}
            </SplitText>
          </h3>
          {lead && <p className="mt-6 text-ink-muted leading-relaxed text-lg">{lead}</p>}
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-line border border-line">
          {/* imagen lado izquierdo ocupa 2 filas */}
          <Reveal direction="scale" className="lg:col-span-7 lg:row-span-2 bg-white">
            <div className="relative aspect-[4/5] lg:h-full w-full overflow-hidden bg-ink">
              {image ? (
                <Image src={image} alt={imageAlt ?? ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
              ) : (
                <DecorativePattern dark />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-white/70">
                <span>[Foto pendiente]</span>
                <span>CBI</span>
              </div>
            </div>
          </Reveal>

          {(highlights ?? []).slice(0, 4).map((h, i) => (
            <Reveal key={i} direction="up" delay={0.1 + i * 0.08} className={cn('lg:col-span-5 bg-white p-8')}>
              <p className="font-mono text-xs uppercase tracking-widest text-gold-700 mb-4">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="font-serif text-xl md:text-2xl tracking-tight text-ink mb-3">
                {h.title}
              </h4>
              <p className="text-ink-muted text-[15px] leading-relaxed">{h.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

// -------- patrón decorativo fallback cuando no hay imagen ----------
function DecorativePattern({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn('relative h-full w-full', dark ? 'bg-ink' : 'bg-beige')}>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <Image
          src="/icon-adn-512.png"
          alt=""
          width={420}
          height={420}
          className={cn('w-[55%] max-w-[420px]', dark && 'invert brightness-75')}
        />
      </div>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: dark
            ? 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)'
            : 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />
    </div>
  )
}
