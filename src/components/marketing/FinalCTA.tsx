'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { SplitText } from '@/components/shared/SplitText'

// CTA final — bloque beige limpio sin decoración de esquinas.
export function FinalCTA() {
  return (
    <section className="relative bg-beige overflow-hidden">
      <Container className="py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal direction="up" duration={0.7}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-800">
                Solicitar análisis
              </span>
              <GoldRule />
            </div>
          </Reveal>

          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tightest text-ink">
            <SplitText inView staggerChildren={0.08} duration={0.9}>
              Tu solicitud,
            </SplitText>
            <br />
            <span className="italic text-gold-800">
              <SplitText inView delay={0.3} staggerChildren={0.08} duration={0.9}>
                en línea.
              </SplitText>
            </span>
          </h2>

          <Reveal direction="up" delay={0.6}>
            <p className="mt-8 max-w-xl mx-auto text-lg text-ink-muted leading-relaxed">
              Elegí tu área de análisis, completá los datos del estudio y mandá la solicitud.
              Te respondemos para coordinar la toma de muestras y los próximos pasos.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.8}>
            <div className="mt-12">
              <Link
                href="/servicios"
                className="group tap-min inline-flex h-16 items-center gap-3 bg-gold-700 px-12 font-sans text-sm uppercase tracking-[0.25em] text-white transition-all duration-700 ease-editorial hover:bg-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <span className="transition-transform duration-700 group-hover:-translate-x-1">
                  Ver servicios
                </span>
                <ArrowRight
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  className="transition-all duration-700 ease-editorial group-hover:translate-x-2"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
