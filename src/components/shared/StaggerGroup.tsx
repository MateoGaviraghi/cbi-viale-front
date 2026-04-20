'use client'

import { motion, type Variants } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

// StaggerGroup — anima hijos con stagger. Cada hijo debe ser <StaggerItem>.
// Usado para secuencias de CTAs, items, cards.

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

interface GroupProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  once?: boolean
  amount?: number
  whileInView?: boolean
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  whileInView: useInView = true,
}: GroupProps) {
  return (
    <motion.div
      className={className ? cn(className) : undefined}
      initial="hidden"
      animate={useInView ? undefined : 'visible'}
      whileInView={useInView ? 'visible' : undefined}
      viewport={useInView ? { once, amount } : undefined}
      variants={containerVariants(stagger, delay)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}) {
  const Component = motion[as as keyof typeof motion] as typeof motion.div
  return (
    <Component className={className ? cn(className) : undefined} variants={itemVariants}>
      {children}
    </Component>
  )
}
