'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// ---------------------------------------------------------------------------
//  Timeline cronológico con animaciones scroll-linked.
//
//  · Línea vertical dorada que se "dibuja" de arriba a abajo a medida
//    que el usuario scrollea por la lista (progress fill real, no fade).
//  · Cada item interpola opacity/translateY ligado al scroll de su propio
//    bounding box — las cosas no aparecen de golpe, se materializan
//    gradualmente mientras pasan por el viewport.
//  · El dot del item escala suavemente al cruzar el centro del viewport.
//  · Respeta prefers-reduced-motion: cae a render estático sin transformaciones.
// ---------------------------------------------------------------------------

export type TimelineEntry = {
  year: string
  title: string
  body: string
}

interface TimelineProps {
  items: TimelineEntry[]
  /** Color del ring del dot. En sección con bg-beige usar ring-beige/30. */
  ringColor?: string
}

export function Timeline({ items, ringColor = 'ring-white' }: TimelineProps) {
  const containerRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()

  // La línea dorada progresa de 0 a 1 mientras la lista cruza el viewport.
  // Trigger un poco antes (start 70%) y completa antes del final (end 30%)
  // para que el efecto se complete dentro de la vista, sin requerir scroll
  // hasta el último píxel.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <ol ref={containerRef} className="relative pl-8 sm:pl-10 space-y-12">
      {/* Track sutil de fondo (siempre visible) */}
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-line/80" />

      {/* Línea progress dorada — scaleY ligado al scroll de la lista */}
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 w-px bg-gold-700"
          style={{ height: lineHeight }}
        />
      )}

      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          idx={idx}
          item={item}
          ringColor={ringColor}
          reduceMotion={!!reduceMotion}
        />
      ))}
    </ol>
  )
}

function TimelineItem({
  idx,
  item,
  ringColor,
  reduceMotion,
}: {
  idx: number
  item: TimelineEntry
  ringColor: string
  reduceMotion: boolean
}) {
  const fromLeft = idx % 2 === 0

  // Animación one-shot: cada item entra completo desde su lado al cruzar
  // el viewport, queda 100% visible para siempre. Esto evita ver varios
  // items "a medio renderizar" al mismo tiempo.
  // viewport.margin -25% asegura que el item entre cuando ya tenga
  // suficiente espacio visual (no muy temprano).
  const initial = reduceMotion
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: fromLeft ? -80 : 80 }

  return (
    <motion.li
      initial={initial}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -25% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute -left-[calc(2rem+0.4375rem)] sm:-left-[calc(2.5rem+0.4375rem)] top-2 h-[7px] w-[7px] bg-gold-700 ring-4 ${ringColor}`}
      />
      <p className="font-mono text-[11px] uppercase tracking-widest text-gold-700 mb-2">
        {item.year}
      </p>
      <h4 className="font-serif text-xl sm:text-2xl tracking-tight text-ink mb-3">
        {item.title}
      </h4>
      <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl">
        {item.body}
      </p>
    </motion.li>
  )
}
