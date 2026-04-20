import * as React from 'react'
import { cn } from '@/lib/utils'

// Container editorial — max-width generoso, padding consistente.
// Se usa en TODAS las secciones para ritmo horizontal uniforme.
export function Container({
  className,
  as: Component = 'div',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12', className)}
      {...props}
    />
  )
}
