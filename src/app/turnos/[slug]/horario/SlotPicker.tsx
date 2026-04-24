'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import type { PublicAvailabilityMonth } from '@/lib/api'
import { cn } from '@/lib/utils'

interface Props {
  serviceSlug: string
  date: string // YYYY-MM-DD
}

export function SlotPicker({ serviceSlug, date }: Props) {
  const router = useRouter()
  const [slots, setSlots] = useState<string[] | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try sessionStorage first (data already fetched in step 2)
    const cached = sessionStorage.getItem('turnos_availability')
    if (cached) {
      try {
        const availability: PublicAvailabilityMonth = JSON.parse(cached)
        const day = availability.days.find((d) => d.date === date)
        if (day) {
          setSlots(day.slots)
          setLoading(false)
          return
        }
      } catch {
        // fall through to fetch
      }
    }

    // Fallback: fetch for the month of the selected date
    const month = date.slice(0, 7) // YYYY-MM
    api.appointments
      .getAvailability(serviceSlug, month)
      .then(({ data }) => {
        sessionStorage.setItem('turnos_availability', JSON.stringify(data))
        const day = data.days.find((d) => d.date === date)
        setSlots(day?.slots ?? [])
      })
      .catch(() => setError('No pudimos cargar los horarios. Intentá de nuevo.'))
      .finally(() => setLoading(false))
  }, [serviceSlug, date])

  function handleContinue() {
    if (!selected) return
    router.push(`/turnos/${serviceSlug}/datos?date=${date}&time=${selected}`)
  }

  const formattedDate = format(parseISO(date), "EEEE d 'de' MMMM", { locale: es })

  return (
    <div className="mt-10">
      <p className="font-sans text-[11px] uppercase tracking-widest text-ink-muted mb-6 capitalize">
        {formattedDate}
      </p>

      {loading && (
        <div className="flex items-center gap-2 py-12 text-ink-muted">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Cargando horarios…</span>
        </div>
      )}

      {error && (
        <div className="py-8 text-center">
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-gold-700 underline underline-offset-2"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && slots !== null && (
        <>
          {slots.length === 0 ? (
            <div className="py-8 border border-line bg-beige/40 text-center">
              <p className="text-ink-muted">No hay turnos disponibles para este día.</p>
              <button
                onClick={() => router.back()}
                className="mt-4 text-sm text-gold-700 underline underline-offset-2"
              >
                Elegir otra fecha
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelected(slot)}
                  aria-pressed={selected === slot}
                  className={cn(
                    'min-h-[44px] px-3 py-3 border font-mono text-sm transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1',
                    selected === slot
                      ? 'bg-gold-700 border-gold-700 text-white'
                      : 'bg-white border-line text-ink hover:border-gold-700 hover:text-gold-700',
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}

          {slots.length > 0 && (
            <button
              onClick={handleContinue}
              disabled={!selected}
              className="mt-8 tap-min inline-flex h-14 w-full items-center justify-center gap-3 bg-gold-700 px-8 font-sans text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-gold-800 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            >
              Continuar
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          )}
        </>
      )}

      {/* Back */}
      <div className="mt-8 border-t border-line pt-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver al calendario
        </button>
      </div>
    </div>
  )
}
