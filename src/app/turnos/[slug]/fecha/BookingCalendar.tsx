'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'
import { ChevronLeft, ChevronRight, ArrowLeft, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import type { PublicAvailabilityMonth } from '@/lib/api'
import { cn } from '@/lib/utils'

const TZ = 'America/Argentina/Buenos_Aires'
const MAX_MONTHS_AHEAD = 2

function nowInAR() {
  return toZonedTime(new Date(), TZ)
}

interface Props {
  serviceSlug: string
}

export function BookingCalendar({ serviceSlug }: Props) {
  const router = useRouter()
  const today = startOfDay(nowInAR())

  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(today))
  const [availability, setAvailability] = useState<PublicAvailabilityMonth | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const maxMonth = startOfMonth(addMonths(today, MAX_MONTHS_AHEAD))

  const monthKey = format(currentMonth, 'yyyy-MM')

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.appointments.getAvailability(serviceSlug, monthKey)
      setAvailability(data)
    } catch {
      setError('No pudimos cargar la disponibilidad. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [serviceSlug, monthKey])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  // Build a Set of dates with available slots for O(1) lookup
  const availableDates = new Set(
    availability?.days.filter((d) => d.slots.length > 0).map((d) => d.date) ?? [],
  )

  function selectDate(date: Date) {
    const dateStr = format(date, 'yyyy-MM-dd')
    // Store availability in sessionStorage for step 3
    if (availability) {
      sessionStorage.setItem('turnos_availability', JSON.stringify(availability))
    }
    router.push(`/turnos/${serviceSlug}/horario?date=${dateStr}`)
  }

  function canGoPrev() {
    return isSameMonth(currentMonth, today)
      ? false
      : !isBefore(subMonths(currentMonth, 1), startOfMonth(today))
  }

  function canGoNext() {
    return !isBefore(maxMonth, addMonths(currentMonth, 1))
  }

  // Calendar grid helpers
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  // Offset: Monday = 0, Sunday = 6 (getDay returns 0=Sun, so shift)
  const firstDayOffset = (getDay(startOfMonth(currentMonth)) + 6) % 7

  return (
    <div className="mt-10">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          disabled={!canGoPrev()}
          aria-label="Mes anterior"
          className="p-3 border border-line text-ink-muted transition-colors hover:border-gold-700 hover:text-gold-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        <h2 className="font-serif text-xl text-ink capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>

        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          disabled={!canGoNext()}
          aria-label="Mes siguiente"
          className="p-3 border border-line text-ink-muted transition-colors hover:border-gold-700 hover:text-gold-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map((d) => (
          <div
            key={d}
            className="py-2 text-center font-sans text-[10px] uppercase tracking-widest text-ink-muted"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-ink-muted gap-2">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Cargando disponibilidad…</span>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchAvailability}
            className="text-sm text-gold-700 underline underline-offset-2"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-px bg-line border border-line">
          {/* Empty offset cells */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white" />
          ))}

          {daysInMonth.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const isPast = isBefore(startOfDay(day), today)
            const hasSlots = availableDates.has(dateStr)
            const isCurrentDay = isToday(day)
            const isDisabled = isPast || !hasSlots || !isSameMonth(day, currentMonth)

            return (
              <button
                key={dateStr}
                onClick={() => !isDisabled && selectDate(day)}
                disabled={isDisabled}
                aria-label={`${format(day, 'd MMMM', { locale: es })}${hasSlots ? ' — disponible' : ' — sin turnos'}`}
                className={cn(
                  'relative bg-white aspect-square flex flex-col items-center justify-center gap-0.5 transition-colors duration-200',
                  'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-inset',
                  isDisabled
                    ? 'cursor-not-allowed text-ink-muted/40'
                    : 'cursor-pointer hover:bg-gold-700 hover:text-white active:bg-gold-800',
                  isCurrentDay && !isDisabled && 'ring-1 ring-inset ring-gold-700',
                )}
              >
                <span className="font-sans text-sm leading-none">{format(day, 'd')}</span>
                {!isPast && hasSlots && (
                  <span className="w-1 h-1 rounded-full bg-gold-700 group-hover:bg-white" />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Legend */}
      {!loading && !error && (
        <div className="mt-4 flex items-center gap-6 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold-700 inline-block" />
            Turnos disponibles
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-line inline-block" />
            Sin disponibilidad
          </span>
        </div>
      )}

      {/* Back link */}
      <div className="mt-10 border-t border-line pt-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver a elegir servicio
        </button>
      </div>
    </div>
  )
}
