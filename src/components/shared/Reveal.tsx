'use client'

import { motion, type Variants } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

// Reveal — wrapper flexible de framer-motion.
// Reemplaza FadeIn con direcciones: up (default), down, left, right, scale, blur.
// Pensado para usarse por secciones del sitio con timing editorial.

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'none'

interface Props {
  children: React.ReactNode
  as?: React.ElementType
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
  amount?: number
}

const makeVariants = (dir: Direction, distance: number): Variants => {
  const hidden: Record<Direction, Record<string, number | string>> = {
    up: { opacity: 0, y: distance },
    down: { opacity: 0, y: -distance },
    left: { opacity: 0, x: distance },
    right: { opacity: 0, x: -distance },
    scale: { opacity: 0, scale: 0.96 },
    blur: { opacity: 0, filter: 'blur(12px)' },
    none: { opacity: 0 },
  }
  return {
    hidden: hidden[dir],
    visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' },
  }
}

export function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 24,
  className,
  once = true,
  amount = 0.2,
}: Props) {
  const Component = motion[as as keyof typeof motion] as typeof motion.div
  const variants = React.useMemo(() => makeVariants(direction, distance), [direction, distance])

  return (
    <Component
      className={className ? cn(className) : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
