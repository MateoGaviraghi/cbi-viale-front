import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// Input editorial — borde inferior no-radius, estado focus con línea dorada.
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-12 w-full bg-transparent px-4 py-3',
          'border border-line text-base text-ink placeholder:text-ink-soft',
          'transition-colors duration-500 ease-editorial',
          'focus-visible:outline-none focus-visible:border-gold-700 focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-[invalid=true]:border-danger',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
