import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ServiceSlug } from '@/lib/constants'
import { SERVICES } from '@/lib/constants'
import { ServiceIcon } from './ServiceIcon'

interface Props {
  slug: ServiceSlug
  index: number
}

// Card compacta — 6 caben en un viewport de 1080px junto con heading.
// Animaciones de entrada: StaggerGroup del padre. Hover: acá.
export function ServiceCard({ slug, index }: Props) {
  const svc = SERVICES[slug]
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/servicios/${slug}`}
      className="group relative flex flex-col h-full border border-transparent bg-white p-5 md:p-6 transition-all duration-700 ease-editorial hover:bg-beige/70 hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
    >
      {/* línea dorada izquierda en hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 bg-gold transition-transform duration-700 ease-editorial group-hover:scale-y-100"
      />

      {/* Número + arrow */}
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gold-700">
          {num} / 06
        </span>
        <ArrowUpRight
          width={16}
          height={16}
          strokeWidth={1.25}
          className="text-ink/40 transition-all duration-700 ease-editorial group-hover:text-gold-700 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>

      {/* Ícono */}
      <div className="mb-4 inline-flex">
        <ServiceIcon
          slug={slug}
          size={28}
          strokeWidth={1.1}
          className="transition-transform duration-700 ease-editorial group-hover:scale-[1.1] group-hover:-rotate-[4deg]"
        />
      </div>

      {/* Nombre */}
      <div className="relative">
        <h3 className="font-serif text-xl md:text-[22px] tracking-tight leading-tight text-ink transition-colors duration-500 group-hover:text-gold-900">
          {svc.name}
        </h3>
        <span
          aria-hidden
          className="block mt-2 h-px w-10 bg-gold transition-all duration-700 ease-editorial group-hover:w-20"
        />
      </div>

      {/* Descripción */}
      <p className="mt-3 text-ink-muted text-[13.5px] leading-relaxed flex-1 line-clamp-3">
        {svc.short}
      </p>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
        <span className="text-[11px] text-ink-muted">~{svc.duration} min</span>
        <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700 transition-all duration-500 group-hover:text-gold-800 group-hover:tracking-[0.22em]">
          Ver →
        </span>
      </div>
    </Link>
  )
}
