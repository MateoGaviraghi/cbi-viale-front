'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Clock } from 'lucide-react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Field } from './Field'

/**
 * Time picker editorial — reemplazo del `<input type="time">` nativo.
 * Internamente trabaja con string `HH:MM` (24h) compatible con el zod `timeSchema`.
 *
 * Permite (a) tipear hora libre en formato HH:MM y (b) elegir de slots cada 15 min.
 */

interface TimeFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  error?: string
  hint?: string
  placeholder?: string
  /** Slot inicial (default 06:00). */
  startHour?: number
  /** Slot final (default 22:00). */
  endHour?: number
  /** Salto entre slots en minutos (default 15). */
  step?: number
  className?: string
}

export function TimeField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  error,
  hint,
  placeholder = '08:00',
  startHour = 6,
  endHour = 22,
  step = 15,
  className,
}: TimeFieldProps<T>) {
  const slots = React.useMemo(() => buildSlots(startHour, endHour, step), [startHour, endHour, step])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = typeof field.value === 'string' ? field.value : ''
        return (
          <Field label={label} required={required} error={error} hint={hint} className={className}>
            <Popover.Root>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="^[0-2][0-9]:[0-5][0-9]$"
                  value={value}
                  onChange={(e) => field.onChange(formatTimeInput(e.target.value))}
                  onBlur={field.onBlur}
                  placeholder={placeholder}
                  aria-label={label}
                  className={cn(
                    'w-full border bg-white px-4 py-3 pr-12 font-sans text-base text-ink min-h-[44px]',
                    'placeholder:text-ink-muted/60 transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
                    error ? 'border-danger' : 'border-line',
                  )}
                />
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Abrir selector de hora"
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center text-gold-700 hover:bg-beige transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-700"
                  >
                    <Clock size={16} strokeWidth={1.5} />
                  </button>
                </Popover.Trigger>
              </div>
              <Popover.Portal>
                <Popover.Content
                  align="end"
                  sideOffset={6}
                  className={cn(
                    'z-50 border border-line bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-3 px-1">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                      Horarios
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-ink-muted">
                      cada {step} min
                    </span>
                  </div>
                  <div className="grid max-h-64 w-56 grid-cols-3 gap-1 overflow-y-auto pr-1">
                    {slots.map((slot) => {
                      const selected = slot === value
                      return (
                        <Popover.Close key={slot} asChild>
                          <button
                            type="button"
                            onClick={() => field.onChange(slot)}
                            className={cn(
                              'h-9 w-full inline-flex items-center justify-center text-sm font-sans transition-colors',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-700',
                              selected
                                ? 'bg-gold-700 text-white hover:bg-gold-800'
                                : 'text-ink hover:bg-beige',
                            )}
                          >
                            {slot}
                          </button>
                        </Popover.Close>
                      )
                    })}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </Field>
        )
      }}
    />
  )
}

function buildSlots(start: number, end: number, step: number): string[] {
  const slots: string[] = []
  for (let h = start; h <= end; h++) {
    for (let m = 0; m < 60; m += step) {
      if (h === end && m > 0) break
      slots.push(`${pad(h)}:${pad(m)}`)
    }
  }
  return slots
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

/** Auto-formatea mientras el usuario tipea: "830" → "08:30", "0830" → "08:30". */
function formatTimeInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}:${digits.slice(2)}`
}
