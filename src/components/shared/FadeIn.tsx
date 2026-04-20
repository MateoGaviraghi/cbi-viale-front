'use client'

import { motion, type Variants } from 'framer-motion'
import * as React from 'react'

// Wrapper de framer-motion para fade-up consistente:
// opacity 0→1, translateY 12px→0, 500ms ease editorial, trigger por viewport.
// Respeta prefers-reduced-motion automáticamente (framer-motion lo maneja).

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

interface Props {
  children: React.ReactNode
  as?: React.ElementType
  delay?: number
  className?: string
  once?: boolean
}

export function FadeIn({ children, as = 'div', delay = 0, className, once = true }: Props) {
  const Component = motion[as as keyof typeof motion] as typeof motion.div
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={variants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
