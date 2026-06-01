'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { SplitText } from '@/components/shared/SplitText'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'
import { AboutCarousel } from './AboutCarousel'

export function AboutPreview() {
  return (
    <section className="section bg-beige/40 border-y border-line relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Carousel editorial — rota entre las áreas con foto */}
          <Reveal direction="left" duration={0.9} className="lg:col-span-5">
            <AboutCarousel />
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-800">
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

            {/* Solo datos verificables — el volumen real de análisis queda
                pendiente del cliente. "+60 estudios" suma los catálogos
                de las 6 áreas (24+12+7+7+6+5=61). */}
            <StaggerGroup stagger={0.12} className="mt-12 grid grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 border-t border-line pt-10">
              <Stat n="6" label="Áreas especializadas" />
              <Stat n="+60" label="Estudios disponibles" />
              <Stat n="Lun · Sáb" label="Atención presencial" />
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
      <dt className="font-mono text-3xl md:text-4xl lg:text-5xl text-gold-800 tracking-tight leading-none whitespace-nowrap">
        {n}
      </dt>
      <dd className="mt-3 text-xs md:text-sm text-ink-muted leading-relaxed">{label}</dd>
    </StaggerItem>
  )
}
