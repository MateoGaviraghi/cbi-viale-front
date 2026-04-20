import { cn } from '@/lib/utils'

// Línea dorada decorativa — uso editorial (separador antes de un título,
// marca de ítem en lista, delimitador de sección).
export function GoldRule({
  className,
  length = 'short',
}: {
  className?: string
  length?: 'short' | 'long'
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'block h-px bg-gold',
        length === 'short' ? 'w-12' : 'w-24',
        className,
      )}
    />
  )
}
