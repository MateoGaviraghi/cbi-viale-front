import { apiFetch } from '../client'
import type { Appointment, CreateAppointmentDto, PublicAvailabilityMonth } from '../types'

export const appointmentsApi = {
  /**
   * GET /appointments/availability/:serviceSlug?month=YYYY-MM
   * Devuelve días del mes con sus slots libres (HH:MM local ARG).
   */
  getAvailability(serviceSlug: string, month: string) {
    return apiFetch<PublicAvailabilityMonth>(
      `/appointments/availability/${encodeURIComponent(serviceSlug)}`,
      { query: { month } },
    )
  },

  /**
   * POST /appointments — crea un turno (PENDING), valida slot,
   * encola email de confirmación.
   */
  create(dto: CreateAppointmentDto) {
    return apiFetch<Appointment>('/appointments', {
      method: 'POST',
      body: dto,
    })
  },
}
