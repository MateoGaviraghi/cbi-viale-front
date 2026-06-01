'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'
import { format, parse, isValid } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Field } from './Field'

/**
 * Date picker editorial — reemplazo del `<input type="date">` nativo (feo y lento).
 * Usa react-day-picker v9 dentro de un Radix Popover, estilizado con tokens del DS.
 *
 * Internamente trabaja con string `YYYY-MM-DD` para compatibilidad con los
 * schemas zod (`isoDateSchema`). El usuario ve fecha formateada en español
 * ("15 de mayo de 2026"), pero el form guarda el ISO date.
 */

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  error?: string
  hint?: string
  /** Texto del botón cuando no hay fecha. */
  placeholder?: string
  /** Limites del calendario (default: 1900..hoy+5años). */
  fromYear?: number
  toYear?: number
  /** Si es birthdate, usá `defaultMonth={new Date(2000, 0)}` para no arrancar en 2026. */
  defaultMonth?: Date
  className?: string
}

export function DateField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  error,
  hint,
  placeholder = 'Seleccionar fecha',
  fromYear = 1900,
  toYear = new Date().getFullYear() + 5,
  defaultMonth,
  className,
}: DateFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected = parseIsoDate(field.value)
        const buttonText = selected
          ? format(selected, "d 'de' MMMM yyyy", { locale: es })
          : placeholder
        return (
          <Field label={label} required={required} error={error} hint={hint} className={className}>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    'tap-min flex w-full items-center justify-between border bg-white px-4 py-3',
                    'font-sans text-base text-ink min-h-[44px] transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
                    'hover:border-gold-700/60',
                    error ? 'border-danger' : 'border-line',
                    !selected && 'text-ink-muted/70',
                  )}
                  aria-label={label}
                >
                  <span className="truncate">{buttonText}</span>
                  <Calendar size={16} className="ml-2 shrink-0 text-gold-700" strokeWidth={1.5} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align="start"
                  sideOffset={6}
                  className={cn(
                    'z-50 w-[19rem] border border-line bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
                  )}
                >
                  <DayPicker
                    mode="single"
                    locale={es}
                    selected={selected}
                    onSelect={(date) => {
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                    }}
                    captionLayout="dropdown"
                    startMonth={new Date(fromYear, 0)}
                    endMonth={new Date(toYear, 11)}
                    defaultMonth={selected ?? defaultMonth ?? new Date()}
                    weekStartsOn={1}
                    showOutsideDays
                    components={{
                      Chevron: ({ orientation }) =>
                        orientation === 'left' ? (
                          <ChevronLeft size={16} strokeWidth={1.5} />
                        ) : (
                          <ChevronRight size={16} strokeWidth={1.5} />
                        ),
                    }}
                    classNames={{
                      root: 'rdp-cbi font-sans text-sm text-ink',
                      months: 'flex flex-col gap-4',
                      month: 'relative flex flex-col gap-3',
                      // Caption ocupa el ancho centrado; padding lateral deja espacio a los chevrons absolutos
                      month_caption: 'flex items-center justify-center min-h-[36px] px-10',
                      // El label se renderiza con dropdown layout — lo escondemos visualmente (sigue accesible)
                      caption_label: 'sr-only',
                      dropdowns: 'flex items-center gap-2',
                      months_dropdown:
                        'border border-line bg-white px-2 py-1.5 text-sm font-sans text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-700 hover:border-gold-700/60 transition-colors',
                      years_dropdown:
                        'border border-line bg-white px-2 py-1.5 text-sm font-sans text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-700 hover:border-gold-700/60 transition-colors',
                      // Nav absoluto sobre el caption — chevrons en los extremos
                      nav: 'absolute top-0 left-0 right-0 flex items-center justify-between h-9 pointer-events-none',
                      button_previous:
                        'pointer-events-auto h-8 w-8 inline-flex items-center justify-center text-ink hover:bg-beige transition-colors disabled:opacity-30 disabled:pointer-events-none',
                      button_next:
                        'pointer-events-auto h-8 w-8 inline-flex items-center justify-center text-ink hover:bg-beige transition-colors disabled:opacity-30 disabled:pointer-events-none',
                      month_grid: 'w-full border-collapse mt-1',
                      weekdays: 'flex',
                      weekday:
                        'flex-1 text-[10px] uppercase tracking-widest text-ink-muted font-sans py-2 text-center',
                      week: 'flex',
                      day: 'flex-1 aspect-square p-0',
                      day_button: cn(
                        'h-9 w-9 inline-flex items-center justify-center mx-auto',
                        'text-sm font-sans text-ink transition-colors duration-150',
                        'hover:bg-beige focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-700',
                        'disabled:text-ink-muted/40 disabled:pointer-events-none',
                      ),
                      selected:
                        '[&_button]:bg-gold-700 [&_button]:text-white [&_button]:hover:bg-gold-800',
                      today:
                        '[&_button]:border [&_button]:border-gold-700/60 [&_button]:font-medium',
                      outside: '[&_button]:text-ink-muted/40',
                      disabled: '[&_button]:text-ink-muted/30 [&_button]:line-through',
                    }}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </Field>
        )
      }}
    />
  )
}

function parseIsoDate(value: unknown): Date | undefined {
  if (typeof value !== 'string' || value === '') return undefined
  const d = parse(value, 'yyyy-MM-dd', new Date())
  return isValid(d) ? d : undefined
}
