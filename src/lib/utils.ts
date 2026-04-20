import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge condicional de clases Tailwind con deduplicación. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatea un número como string "es-AR" con separadores locales. */
export function formatNumber(n: number) {
  return new Intl.NumberFormat('es-AR').format(n)
}
