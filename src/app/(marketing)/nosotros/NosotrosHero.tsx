'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { ProfilePhoto } from './ProfilePhoto'
import { GonzaloPhoto } from './GonzaloPhoto'

// ---------------------------------------------------------------------------
//  Hero de /nosotros — split editorial: texto + composición de las dos
//  fotos del equipo. Parallax sutil opuesto en cada foto al scroll para
//  dar movimiento sin perder el aire premium.
// ---------------------------------------------------------------------------

export function NosotrosHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax suave en direcciones opuestas para las dos fotos.
  const y1 = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section ref={ref} className="section border-b border-line overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Texto */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Reveal direction="up" duration={0.6}>
              <div className="flex items-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  El equipo
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1} duration={0.7}>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
                Un equipo humano.
                <br />
                <span className="italic text-gold-800">Un trabajo</span> preciso.
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2} duration={0.6}>
              <p className="mt-8 text-lg text-ink-muted leading-relaxed max-w-xl">
                Fundado en 2025 en Viale, Entre Ríos, CBI nació de la decisión de brindar un
                servicio bioquímico de calidad en la comunidad. Ciencia, responsabilidad y
                atención personalizada en cada análisis.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3} duration={0.5}>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-10 max-w-md border-t border-line pt-8">
                <Stat n="2" label="Bioquímicos matriculados" />
                <Stat n="2025" label="Año de fundación" />
              </div>
            </Reveal>
          </div>

          {/* Composición de fotos — Nahir + Gonzalo, parallax opuesto */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Reveal direction="left" duration={0.9}>
                <motion.div style={{ y: y1 }} className="relative">
                  <ProfilePhoto />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-gold-700">
                    Nahir Gastaldi
                  </p>
                </motion.div>
              </Reveal>

              <Reveal direction="right" duration={0.9} delay={0.1}>
                <motion.div style={{ y: y2 }} className="relative mt-8 sm:mt-12">
                  <GonzaloPhoto />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-gold-700">
                    Gonzalo Alvarez
                  </p>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-3xl md:text-4xl text-gold-800 tracking-tight leading-none">
        {n}
      </p>
      <p className="mt-2 text-xs text-ink-muted leading-relaxed">{label}</p>
    </div>
  )
}
