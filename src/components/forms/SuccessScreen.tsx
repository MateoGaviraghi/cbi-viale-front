'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { GoldRule } from '@/components/shared/GoldRule'

interface Props {
  /** Título grande (default: "Recibimos tu solicitud"). */
  title?: string
  /** Cuerpo explicativo. Personalizar por servicio si hace falta. */
  message?: string
  /** Email donde el back manda confirmación, si aplica mostrarlo. */
  email?: string
  /** Slug del servicio para el botón "Volver al servicio". */
  serviceSlug?: string
  /** Override del label del botón secundario. */
  secondaryLabel?: string
}

/**
 * Pantalla post-submit (201 Created) compartida por todos los forms públicos.
 * Reemplaza al toast del ContactForm — los forms son largos y merece feedback visual contundente.
 */
export function SuccessScreen({
  title = 'Recibimos tu solicitud',
  message = 'Te contactaremos a la brevedad para coordinar la próxima etapa.',
  email,
  serviceSlug,
  secondaryLabel = 'Volver al servicio',
}: Props) {
  return (
    <div className="border border-line bg-white p-8 md:p-12 text-center animate-in fade-in duration-500">
      <div className="flex justify-center mb-6">
        <CheckCircle size={48} className="text-gold-700" strokeWidth={1.25} />
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <GoldRule />
        <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
          Solicitud enviada
        </span>
        <GoldRule />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">{title}</h2>

      <p className="text-base text-ink-muted leading-relaxed max-w-md mx-auto">
        {message}
        {email && (
          <>
            {' '}Te enviamos una confirmación a <span className="text-ink">{email}</span>.
          </>
        )}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="font-sans text-[11px] uppercase tracking-widest text-ink-muted hover:text-ink transition-colors"
        >
          Volver al inicio
        </Link>
        {serviceSlug && (
          <Link
            href={`/servicios/${serviceSlug}`}
            className="font-sans text-[11px] uppercase tracking-widest text-gold-700 hover:text-gold-800 transition-colors"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
