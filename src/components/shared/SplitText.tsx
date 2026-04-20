'use client'

import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

// SplitText: divide el texto en palabras y las anima con mask-reveal editorial.
// Cada palabra está dentro de un span con overflow:hidden; el inner span entra
// desde translateY(110%) a 0 con stagger. Efecto clásico de diarios/editoriales.

interface Props {
  children: string
  as?: React.ElementType
  className?: string
  delay?: number
  staggerChildren?: number
  duration?: number
  inView?: boolean
}

const container: Variants = {
  hidden: { opacity: 1 },
  visible: (custom: { delay: number; stagger: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
}

const word: Variants = {
  hidden: { y: '110%' },
  visible: (duration: number) => ({
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function SplitText({
  children,
  as = 'span',
  className,
  delay = 0,
  staggerChildren = 0.08,
  duration = 0.8,
  inView = false,
}: Props) {
  const words = children.split(/(\s+)/)
  const Component = motion[as as keyof typeof motion] as typeof motion.span

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      animate={inView ? undefined : 'visible'}
      whileInView={inView ? 'visible' : undefined}
      viewport={inView ? { once: true, amount: 0.3 } : undefined}
      variants={container}
      custom={{ delay, stagger: staggerChildren }}
    >
      {words.map((w, i) => {
        if (/\s+/.test(w)) return <span key={i}>{w}</span>
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: '0.12em', paddingTop: '0.02em' }}
          >
            <motion.span className="inline-block" variants={word} custom={duration}>
              {w}
            </motion.span>
          </span>
        )
      })}
    </Component>
  )
}
