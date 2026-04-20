'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { SERVICE_SLUGS, SERVICES, CONTACT } from '@/lib/constants'
import { ServiceIcon } from './ServiceIcon'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
}

// Overlay full-screen para mobile — links principales + grid de servicios compacto.
// Bloquea el scroll del body mientras está abierto.
export function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      className={cn(
        'lg:hidden fixed inset-0 z-50 bg-white transition-all duration-500 ease-editorial',
        open
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5 sm:px-6">
          <span className="font-serif text-xl tracking-tight text-ink">CBI Viale</span>
          <button
            type="button"
            onClick={onClose}
            className="tap-min -mr-2 inline-flex items-center justify-center text-ink"
            aria-label="Cerrar menú"
          >
            <X width={24} height={24} strokeWidth={1.25} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-5 py-8 sm:px-6" aria-label="Navegación">
          <ul className="space-y-1">
            <MobileLink href="/" onClick={onClose}>
              Inicio
            </MobileLink>
            <li>
              <div className="mb-2 mt-6 flex items-center gap-3">
                <span className="block h-px w-8 bg-gold" aria-hidden />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Servicios
                </span>
              </div>
              <ul className="border-t border-line">
                {SERVICE_SLUGS.map((slug) => (
                  <li key={slug} className="border-b border-line">
                    <Link
                      href={`/servicios/${slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 py-4 text-ink"
                    >
                      <ServiceIcon slug={slug} size={20} strokeWidth={1.25} />
                      <span className="font-serif text-lg tracking-tight">
                        {SERVICES[slug].name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <MobileLink href="/nosotros" onClick={onClose} topMargin>
              Nosotros
            </MobileLink>
            <MobileLink href="/contacto" onClick={onClose}>
              Contacto
            </MobileLink>
          </ul>

          <Link
            href="/turnos"
            onClick={onClose}
            className="mt-10 tap-min flex h-14 items-center justify-center bg-gold-700 font-sans text-sm uppercase tracking-widest text-white hover:bg-gold-800"
          >
            Sacar turno →
          </Link>
        </nav>

        {/* Footer del menú */}
        <div className="border-t border-line px-5 py-6 sm:px-6">
          <p className="text-sm text-ink-muted">
            {CONTACT.address.street}
            <br />
            {CONTACT.address.city}, {CONTACT.address.region}
          </p>
          <div className="mt-4 flex items-center gap-5 text-sm">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-gold-700 transition-colors"
            >
              Instagram
            </a>
            {CONTACT.whatsapp && (
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-gold-700 transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileLink({
  href,
  onClick,
  children,
  topMargin,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
  topMargin?: boolean
}) {
  return (
    <li className={cn(topMargin && 'mt-6')}>
      <Link
        href={href}
        onClick={onClick}
        className="block py-3 font-serif text-3xl tracking-tight text-ink hover:text-gold-800 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
