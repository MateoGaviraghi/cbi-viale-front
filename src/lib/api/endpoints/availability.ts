import { apiFetch } from '../client'
import type { PublicAvailability } from '../types'

// Endpoints del módulo availability del back.
// Solo exponemos el público por ahora — admin CRUD se agrega en Fase 2
// cuando empecemos el panel /admin/availability.
export const availabilityApi = {
  /**
   * GET /availability/public/:serviceSlug — devuelve el set de reglas
   * efectivas (con override semántico: si un servicio tiene reglas propias,
   * reemplazan a las globales) + los bloqueos futuros del servicio.
   *
   * Base para el calendario del flujo de reserva.
   */
  publicBySlug(urlSlug: string, cookieHeader?: string) {
    return apiFetch<PublicAvailability>(
      `/availability/public/${encodeURIComponent(urlSlug)}`,
      { cookieHeader },
    )
  },
}
