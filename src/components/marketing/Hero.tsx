'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { SplitText } from '@/components/shared/SplitText'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'

// Hero compacto — TODO el contenido entra en 100vh sin scroll interno.
// Foto de recepción CBI como fondo full-bleed con overlay suave (la foto
// tiene que verse claramente). Parallax sutil al scroll.
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax suave — poco zoom, poco desplazamiento.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  return (
    <section
      ref={ref}
      className="relative isolate h-screen min-h-[640px] max-h-[960px] overflow-hidden bg-ink"
    >
      {/* ========= CAPA 1: Foto de fondo con parallax.
           Dos variantes:
             · Mobile (< md): imagen portrait de la sala completa
             · Desktop (>= md): imagen landscape de la recepción
           Se usan dos <Image> con breakpoints para que cada una cargue la óptima. ========= */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 w-full h-[108%]"
      >
        {/* Mobile portrait */}
        <Image
          src="/hero-recepcion-mobile.jpg"
          alt="Recepción del laboratorio CBI en Viale, Entre Ríos"
          fill
          priority
          quality={88}
          sizes="(max-width: 768px) 100vw, 0px"
          className="md:hidden object-cover object-center"
        />
        {/* Desktop landscape */}
        <Image
          src="/hero-recepcion.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="(max-width: 768px) 0px, 100vw"
          className="hidden md:block object-cover object-[center_40%]"
        />
      </motion.div>

      {/* ========= CAPA 2: Overlay tenue general — la foto se ve ========= */}
      <div className="absolute inset-0 bg-ink/35" aria-hidden />

      {/* ========= CAPA 3: Gradiente lateral — refuerza lectura del texto a la izquierda ========= */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent md:from-ink/75 md:via-ink/30 md:to-transparent"
        aria-hidden
      />

      {/* ========= CAPA 4: Vignette muy sutil abajo para hint del scroll ========= */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/50 to-transparent pointer-events-none"
        aria-hidden
      />

      {/* ========= Contenido — distribuido en 100vh ========= */}
      <motion.div style={{ y: textY }} className="relative z-10 h-full">
        <Container className="flex h-full flex-col pt-28 pb-20 lg:pt-32 lg:pb-16">
          {/* Top: eyebrow con GoldRule */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <GoldRule length="long" />
            <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold">
              Viale · Entre Ríos · Argentina
            </span>
          </motion.div>

          {/* Centro: título + subtítulo + CTAs */}
          <div className="my-auto max-w-5xl pt-6 lg:pt-0">
            <h1 className="font-serif text-[clamp(2.25rem,7vw,6rem)] leading-[0.98] tracking-[-0.035em] text-white">
              <SplitText delay={0.3} staggerChildren={0.08} duration={0.85}>
                Análisis con
              </SplitText>
              <br />
              <span className="inline-flex items-baseline flex-wrap gap-x-[0.18em]">
                <SplitText delay={0.6} staggerChildren={0.08} duration={0.85}>
                  precisión
                </SplitText>
                <em className="not-italic text-gold-300">
                  <SplitText delay={0.95} staggerChildren={0.06} duration={0.8}>
                    científica.
                  </SplitText>
                </em>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 lg:mt-8 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
            >
              Rigor clínico y atención humana en el corazón de Viale. Seis áreas, un mismo
              estándar.
            </motion.p>

            <StaggerGroup
              stagger={0.1}
              delay={1.6}
              whileInView={false}
              className="mt-7 lg:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <StaggerItem>
                <Link
                  href="/turnos"
                  className="group relative tap-min inline-flex h-12 md:h-13 items-center justify-center gap-2 overflow-hidden bg-gold-700 px-8 font-sans text-xs uppercase tracking-[0.22em] text-white transition-all duration-500 hover:bg-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <span className="relative z-10 transition-transform duration-700 ease-editorial group-hover:-translate-x-1">
                    Sacar turno
                  </span>
                  <ArrowRight
                    width={15}
                    height={15}
                    strokeWidth={1.5}
                    className="relative z-10 transition-all duration-700 ease-editorial group-hover:translate-x-1.5"
                  />
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link
                  href="/servicios"
                  className="tap-min inline-flex h-12 md:h-13 items-center justify-center border border-white/70 bg-transparent px-8 font-sans text-xs uppercase tracking-[0.22em] text-white transition-colors duration-500 hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Conocer servicios
                </Link>
              </StaggerItem>
            </StaggerGroup>
          </div>

          {/* Abajo: stats. En mobile sólo 3 (el último se oculta — evita overlap con el FAB de WhatsApp).
              Padding derecho extra en mobile para dejar respirar al FAB. */}
          <StaggerGroup
            stagger={0.12}
            delay={1.9}
            whileInView={false}
            className="mt-auto flex items-end justify-between gap-6 md:gap-8 border-t border-white/20 pt-6 pr-20 md:pr-0"
          >
            <StatInline n="15+" label="Años" />
            <StatInline n="10k+" label="Análisis" />
            <StatInline n="6" label="Áreas" />
            <div className="hidden sm:block">
              <StatInline n="100%" label="Viale · E.R." />
            </div>
          </StaggerGroup>
        </Container>
      </motion.div>

    </section>
  )
}

function StatInline({ n, label }: { n: string; label: string }) {
  return (
    <StaggerItem>
      <div>
        <p className="font-mono text-xl md:text-2xl lg:text-3xl text-gold-300 tracking-tight leading-none">
          {n}
        </p>
        <p className="mt-1.5 text-[10px] md:text-xs uppercase tracking-widest text-white/60">
          {label}
        </p>
      </div>
    </StaggerItem>
  )
}
