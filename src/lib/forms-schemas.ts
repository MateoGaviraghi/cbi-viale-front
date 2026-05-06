import { z } from 'zod'

/**
 * Schemas zod reusables que matchean las validaciones server-side del back
 * (FRONTEND_FORMS.md). Validan en cliente para UX — el back valida igual
 * y devuelve 400 con el mensaje exacto si algo no pasa.
 */

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Mínimo 2 caracteres')
  .max(120, 'Máximo 120 caracteres')

export const longNameSchema = z
  .string()
  .trim()
  .min(2, 'Mínimo 2 caracteres')
  .max(200, 'Máximo 200 caracteres')

export const emailSchema = z.string().trim().email('Email inválido')

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?\d{8,15}$/, 'Teléfono inválido (8-15 dígitos, "+" opcional)')

export const dniSchema = z
  .string()
  .trim()
  .regex(/^\d{7,9}$/, 'DNI inválido (7-9 dígitos)')

export const cuitSchema = z
  .string()
  .trim()
  .regex(/^\d{2}-?\d{8}-?\d{1}$/, 'CUIT inválido (11 dígitos)')

export const dniOrCuitSchema = z
  .string()
  .trim()
  .refine(
    (v) => /^\d{7,9}$/.test(v) || /^\d{2}-?\d{8}-?\d{1}$/.test(v),
    'Ingresá DNI (7-9 dígitos) o CUIT (11 dígitos, con o sin guiones)',
  )

/** YYYY-MM-DD (input type=date devuelve este formato siempre). */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida')

/** HH:MM 24h (input type=time). */
export const timeSchema = z
  .string()
  .regex(/^\d{2}:\d{2}$/, 'Hora inválida (HH:MM)')

/** Boolean que debe ser true (consentimientos). */
export const mustBeTrue = (msg = 'Tenés que aceptar para continuar') =>
  z.literal(true, { errorMap: () => ({ message: msg }) })

/** Texto libre con max chars y trim. */
export const text = (max: number, opts?: { required?: boolean; min?: number }) => {
  const min = opts?.min ?? (opts?.required === false ? 0 : 1)
  let s = z.string().trim().max(max, `Máximo ${max} caracteres`)
  if (opts?.required !== false) {
    s = s.min(min || 1, 'Este campo es obligatorio')
  }
  return s
}
