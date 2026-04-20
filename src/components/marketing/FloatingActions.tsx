'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

// Cluster flotante bottom-right — 100% paleta CBI (ink + dorado).
//   · Scroll to top — aparece al scrollear > 400px
//   · WhatsApp — siempre visible, fondo ink con borde dorado, etiqueta expande al hover
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex flex-col items-end gap-3">
      {/* Scroll to top — mismo lenguaje visual que WhatsApp */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="scroll-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative inline-flex h-14 w-14 items-center justify-center bg-ink text-gold-300 border border-gold/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] transition-all duration-500 ease-editorial hover:bg-gold-700 hover:text-white hover:border-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <ArrowUp
              width={18}
              height={18}
              strokeWidth={1.5}
              className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5"
            />
            <span className="sr-only">Volver arriba</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp — fondo ink, ícono dorado, etiqueta aparece al hover */}
      {CONTACT.whatsapp && (
        <a
          href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hola CBI Viale, quisiera hacer una consulta.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar por WhatsApp"
          className="group relative inline-flex items-center h-14 overflow-hidden bg-ink border border-gold/40 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] transition-all duration-500 ease-editorial hover:bg-gold-700 hover:border-gold-700 hover:shadow-[0_10px_28px_-10px_rgba(184,147,90,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          {/* Cuadrado del ícono */}
          <span className="shrink-0 inline-flex h-14 w-14 items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="text-gold-300 transition-all duration-500 ease-editorial group-hover:text-white group-hover:scale-110"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
          </span>

          {/* Etiqueta que se expande a la izquierda al hover */}
          <span className="max-w-0 group-hover:max-w-[140px] overflow-hidden transition-[max-width] duration-700 ease-editorial">
            <span className="inline-block pr-6 font-sans text-xs uppercase tracking-[0.22em] text-white whitespace-nowrap">
              WhatsApp
            </span>
          </span>
        </a>
      )}
    </div>
  )
}
