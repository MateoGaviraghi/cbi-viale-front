'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { SERVICE_SLUGS, SERVICES } from '@/lib/constants'
import { ServiceIcon } from './ServiceIcon'
import { cn } from '@/lib/utils'

// Mega menú de Servicios — panel dropdown a full-width con los 6 servicios.
// Abre por hover + focus, cierra con escape o click fuera.
// Recibe `scrolled` para adaptar el color del botón al estado del navbar.
export function MegaMenu({ scrolled = true }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // click fuera
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  // escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'group inline-flex items-center gap-1.5 px-4 py-3 font-sans text-sm transition-colors duration-500 focus-visible:outline-none',
          scrolled
            ? 'text-ink hover:text-gold-700 focus-visible:text-gold-700'
            : 'text-white/90 hover:text-gold-300 focus-visible:text-gold-300',
        )}
      >
        <span className="relative">
          Servicios
          <span
            aria-hidden
            className={cn(
              'absolute left-0 right-0 -bottom-2 h-px origin-left bg-gold transition-transform duration-500 ease-editorial',
              open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
            )}
          />
        </span>
        <ChevronDown
          width={14}
          height={14}
          strokeWidth={1.5}
          className={cn(
            'transition-transform duration-500 ease-editorial',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Panel */}
      <div
        aria-hidden={!open}
        className={cn(
          'absolute left-1/2 top-full z-50 -translate-x-1/2 w-[min(90vw,880px)] pt-2',
          'transition-all duration-500 ease-editorial',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <div className="bg-white border border-line shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {SERVICE_SLUGS.map((slug) => {
              const svc = SERVICES[slug]
              return (
                <Link
                  key={slug}
                  href={`/servicios/${slug}`}
                  className="group flex items-start gap-5 bg-white p-6 transition-colors duration-500 hover:bg-beige focus-visible:bg-beige focus-visible:outline-none"
                >
                  <div className="shrink-0 border border-line p-3 transition-colors duration-500 group-hover:border-gold-700">
                    <ServiceIcon slug={slug} size={20} strokeWidth={1.25} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-lg text-ink tracking-tight leading-snug transition-colors duration-500 group-hover:text-gold-800">
                      {svc.name}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-muted line-clamp-2">
                      {svc.short}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center justify-between bg-beige/60 px-6 py-4 border-t border-line">
            <p className="text-xs font-sans uppercase tracking-widest text-ink-muted">
              Seis áreas, un mismo estándar
            </p>
            <Link
              href="/servicios"
              className="text-xs font-sans uppercase tracking-widest text-gold-700 hover:text-gold-800 transition-colors"
            >
              Ver todos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
