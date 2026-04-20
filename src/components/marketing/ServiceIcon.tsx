import {
  Stethoscope,
  PawPrint,
  Wheat,
  Droplets,
  HeartPulse,
  Dna,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceSlug } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Mapa slug → ícono Lucide.
// Cuando llegue el folleto original del cliente, reemplazar por SVG custom
// manteniendo la misma interfaz del componente.
const ICON_MAP: Record<ServiceSlug, LucideIcon> = {
  'clinica-humana': Stethoscope,
  veterinaria: PawPrint,
  'agro-alimentos': Wheat,
  ambiental: Droplets,
  'medicina-regenerativa': HeartPulse,
  genetica: Dna,
}

interface Props {
  slug: ServiceSlug
  className?: string
  strokeWidth?: number
  size?: number
}

export function ServiceIcon({ slug, className, strokeWidth = 1, size = 32 }: Props) {
  const Icon = ICON_MAP[slug]
  return (
    <Icon
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={cn('text-gold-700 transition-colors duration-500', className)}
      aria-hidden="true"
    />
  )
}
