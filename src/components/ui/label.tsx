'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

// Label editorial — visible, en uppercase con tracking amplio.
// Nunca depender sólo de placeholder: cada input lleva label explícito.
export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'block mb-2 font-sans text-[11px] uppercase tracking-widest text-ink-muted',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  >
    {children}
    {required && <span className="text-gold-700 ml-1">*</span>}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName
