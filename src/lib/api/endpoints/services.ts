import { apiFetch } from '../client'
import type { Service } from '../types'

// Endpoints del módulo services del back. Todos públicos.
export const servicesApi = {
  /** GET /services — lista los 6 servicios activos. */
  list(cookieHeader?: string) {
    return apiFetch<Service[]>('/services', { cookieHeader })
  },

  /**
   * GET /services/:slug — detalle por slug (kebab-case en la URL).
   * El back hace el mapeo kebab-case → enum Prisma internamente.
   */
  bySlug(urlSlug: string, cookieHeader?: string) {
    return apiFetch<Service>(`/services/${encodeURIComponent(urlSlug)}`, { cookieHeader })
  },
}
