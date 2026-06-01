'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Helpers compartidos por todos los formularios públicos del sitio.
 * Mantiene el visual del ContactForm (border-radius 0, focus dorado, sin sombras).
 */

export function inputCls(hasError: boolean, extra?: string) {
  return cn(
    'w-full border bg-white px-4 py-3 font-sans text-base text-ink placeholder:text-ink-muted/60',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-0',
    'transition-colors duration-200 min-h-[44px]',
    'disabled:bg-beige/40 disabled:text-ink-muted disabled:cursor-not-allowed',
    hasError ? 'border-danger' : 'border-line',
    extra,
  )
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
  className?: string
}

export function Field({ label, required, error, hint, children, className }: FieldProps) {
  const autoId = React.useId()
  const controlId =
    (React.isValidElement<{ id?: string }>(children) && children.props.id) || autoId
  const errorId = `${autoId}-error`
  const hintId = `${autoId}-hint`
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null].filter(Boolean).join(' ') || undefined

  // Asocia el control (input/textarea/select) con su label, error y hint para
  // tecnología asistiva: htmlFor↔id, aria-invalid y aria-describedby.
  const control = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        id: controlId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })
    : children

  return (
    <div className={className}>
      <label
        htmlFor={controlId}
        className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2"
      >
        {label}
        {required && <span className="text-gold-700 ml-1">*</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------------- */
/*  Primitives input nativos con el estilo unificado                        */
/* ----------------------------------------------------------------------- */

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}
export const TextInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ hasError, className, ...rest }, ref) => (
    <input ref={ref} className={inputCls(!!hasError, className)} {...rest} />
  ),
)
TextInput.displayName = 'TextInput'

interface BaseTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}
export const TextArea = React.forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
  ({ hasError, className, rows = 4, ...rest }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={inputCls(!!hasError, cn('resize-y', className))}
      {...rest}
    />
  ),
)
TextArea.displayName = 'TextArea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly string[]
  hasError?: boolean
  placeholder?: string
}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, options, placeholder, ...rest }, ref) => (
    <select
      ref={ref}
      className={inputCls(!!hasError, cn('appearance-none pr-10 bg-no-repeat', className))}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238A6D3F' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")",
        backgroundPosition: 'right 1rem center',
      }}
      {...rest}
    >
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
)
Select.displayName = 'Select'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode
  hint?: string
  error?: string
}
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, error, className, id, ...rest }, ref) => {
    const reactId = React.useId()
    const inputId = id ?? reactId
    return (
      <div className={className}>
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              'mt-0.5 h-5 w-5 shrink-0 cursor-pointer border border-line bg-white',
              'accent-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2',
              error && 'border-danger',
            )}
            aria-invalid={error ? true : undefined}
            {...rest}
          />
          <span className="text-sm leading-relaxed text-ink">{label}</span>
        </label>
        {hint && !error && <p className="mt-1.5 ml-8 text-xs text-ink-muted">{hint}</p>}
        {error && (
          <p role="alert" className="mt-1.5 ml-8 text-xs text-danger">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
