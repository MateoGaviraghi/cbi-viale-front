import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 5, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'flex w-full bg-transparent px-4 py-3',
          'border border-line text-base text-ink placeholder:text-ink-soft',
          'transition-colors duration-500 ease-editorial resize-y',
          'focus:outline-none focus:border-gold-700',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-[invalid=true]:border-danger',
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'
