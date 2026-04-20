'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { SplitText } from '@/components/shared/SplitText'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} className="section bg-beige/40 border-y border-line relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Visual con parallax */}
          <Reveal direction="left" duration={0.9} className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full bg-white overflow-hidden border border-line">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-800/70 font-sans">
                <span>N° 02</span>
                <span>Equipo · Nosotros</span>
              </div>
              <div className="absolute inset-x-6 top-12 h-px bg-gold/40" aria-hidden />

              <motion.div style={{ y: imageY }} className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/icon-adn-512.png"
                  alt=""
                  width={320}
                  height={320}
                  className="w-[55%] opacity-60 mix-blend-multiply"
                />
              </motion.div>

              <div className="absolute inset-x-6 bottom-6">
                <div className="mb-3 h-px bg-gold/40" aria-hidden />
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-800/70 font-sans">
                  <span>[Foto equipo real — pendiente]</span>
                  <span>CBI</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">
                  Acerca de CBI
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.05] text-ink">
                <SplitText inView staggerChildren={0.07} duration={0.8}>
                  Un equipo humano
                </SplitText>
                <br />
                <span className="text-ink">
                  <SplitText inView delay={0.3} staggerChildren={0.06} duration={0.8}>
                    detrás de cada
                  </SplitText>
                </span>{' '}
                <span className="italic text-gold-800">
                  <SplitText inView delay={0.55} staggerChildren={0.06} duration={0.8}>
                    análisis.
                  </SplitText>
                </span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-8 max-w-xl text-lg text-ink-muted leading-relaxed">
                Somos un centro bioquímico integral con presencia consolidada en Viale. Nuestro
                compromiso es simple — acompañar a cada paciente y cada profesional con rigor
                científico y trato cercano.
              </p>
            </Reveal>

            <StaggerGroup stagger={0.12} className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 border-t border-line pt-10">
              <Stat n="+15" label="Años de trayectoria" />
              <Stat n="+10.000" label="Análisis realizados" />
              <Stat n="6" label="Áreas especializadas" />
            </StaggerGroup>

            <Reveal direction="up" delay={0.4}>
              <Link
                href="/nosotros"
                className="group mt-12 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.25em] text-gold-700 transition-all duration-500 ease-editorial hover:gap-4 hover:text-gold-800"
              >
                Conocer al equipo
                <ArrowRight
                  width={16}
                  height={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <StaggerItem>
      <dt className="font-mono text-4xl md:text-5xl text-gold-800 tracking-tight leading-none">
        {n}
      </dt>
      <dd className="mt-3 text-sm text-ink-muted leading-relaxed max-w-[14ch]">{label}</dd>
    </StaggerItem>
  )
}
