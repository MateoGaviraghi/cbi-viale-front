'use client'

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingLabel?: string
  /** Texto mostrado en estado idle (children como fallback). */
  label?: string
}

/**
 * Submit principal de los formularios públicos.
 * Mismo visual que el ContactForm (gold-700, h-14, full width, tracking).
 */
export const SubmitButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ loading, loadingLabel = 'Enviando…', label, children, disabled, className, ...rest }, ref) => (
    <button
      ref={ref}
      type="submit"
      disabled={loading || disabled}
      className={cn(
        'group tap-min inline-flex h-14 w-full items-center justify-center gap-3',
        'bg-gold-700 px-8 font-sans text-sm uppercase tracking-[0.25em] text-white',
        'transition-all duration-500 hover:bg-gold-800',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label ?? children
      )}
    </button>
  ),
)
SubmitButton.displayName = 'SubmitButton'
