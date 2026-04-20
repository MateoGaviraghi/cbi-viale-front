import * as React from 'react'
import { cn } from '@/lib/utils'
import { GoldRule } from './GoldRule'

// Encabezado de sección con ritmo editorial:
//   eyebrow (mono uppercase)  +  title (serif)  +  lead opcional
interface Props {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', className }: Props) {
  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-6 flex items-center gap-4',
            align === 'center' && 'justify-center',
          )}
        >
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.02]">
        {title}
      </h2>
      {lead && <p className="mt-6 text-lg text-ink-muted max-w-2xl">{lead}</p>}
    </header>
  )
}
