import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Button editorial — esquinas rectas (radius 0), tipografía Inter con tracking.
// Tamaños cumplen min 44x44 para accesibilidad pública 60+.
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-sans font-medium tracking-wide uppercase text-xs',
    'transition-[background,color,opacity] duration-500 ease-editorial',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    'tap-min',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-gold-700 text-white hover:bg-gold-800',
        secondary: 'bg-ink text-white hover:bg-ink/90',
        outline:
          'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
        ghost: 'bg-transparent text-ink hover:bg-beige',
        link: 'bg-transparent text-gold-700 hover:text-gold-800 underline underline-offset-4 px-0 py-0',
        danger: 'bg-danger text-white hover:opacity-90',
      },
      size: {
        sm: 'h-11 px-5 text-[11px]',
        md: 'h-12 px-7 text-xs',
        lg: 'h-14 px-9 text-sm tracking-widest',
        icon: 'h-11 w-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
