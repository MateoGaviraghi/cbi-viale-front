import { apiFetch } from '../client'
import type {
  PublicAvailability,
  Weekday,
  AvailabilityRule,
  CreateAvailabilityRuleDto,
  UpdateAvailabilityRuleDto,
  BlockedDate,
  CreateBlockedDateDto,
  UpdateBlockedDateDto,
} from '../types'

// Endpoints del módulo availability del back.
// El público alimenta el calendario de reserva; el resto es CRUD del panel
// admin (/admin/disponibilidad), protegido por el permiso `manageAvailability`.
export const availabilityApi = {
  /**
   * GET /availability/public/:serviceSlug — set de reglas efectivas (override
   * por servicio) + bloqueos futuros. Base del calendario del flujo de reserva.
   */
  publicBySlug(urlSlug: string, cookieHeader?: string) {
    return apiFetch<PublicAvailability>(
      `/availability/public/${encodeURIComponent(urlSlug)}`,
      { cookieHeader },
    )
  },

  // ── Admin · reglas de horario ──────────────────────────────────────────

  /** GET /availability/rules — lista paginada de reglas. */
  listRules(
    params: {
      page?: number
      pageSize?: number
      weekday?: Weekday
      serviceSlug?: string
      active?: boolean
    } = {},
    cookieHeader?: string,
  ) {
    return apiFetch<AvailabilityRule[]>('/availability/rules', {
      query: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 100,
        weekday: params.weekday,
        serviceSlug: params.serviceSlug,
        active: params.active,
      },
      cookieHeader,
    })
  },

  createRule(dto: CreateAvailabilityRuleDto) {
    return apiFetch<AvailabilityRule>('/availability/rules', {
      method: 'POST',
      body: dto,
    })
  },

  updateRule(id: string, dto: UpdateAvailabilityRuleDto) {
    return apiFetch<AvailabilityRule>(`/availability/rules/${id}`, {
      method: 'PATCH',
      body: dto,
    })
  },

  deleteRule(id: string) {
    return apiFetch<{ ok: boolean }>(`/availability/rules/${id}`, {
      method: 'DELETE',
    })
  },

  // ── Admin · bloqueos por fecha ─────────────────────────────────────────

  /** GET /availability/blocked-dates — lista paginada de bloqueos. */
  listBlockedDates(
    params: {
      page?: number
      pageSize?: number
      from?: string
      to?: string
      serviceSlug?: string
    } = {},
    cookieHeader?: string,
  ) {
    return apiFetch<BlockedDate[]>('/availability/blocked-dates', {
      query: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 100,
        from: params.from,
        to: params.to,
        serviceSlug: params.serviceSlug,
      },
      cookieHeader,
    })
  },

  createBlockedDate(dto: CreateBlockedDateDto) {
    return apiFetch<BlockedDate>('/availability/blocked-dates', {
      method: 'POST',
      body: dto,
    })
  },

  updateBlockedDate(id: string, dto: UpdateBlockedDateDto) {
    return apiFetch<BlockedDate>(`/availability/blocked-dates/${id}`, {
      method: 'PATCH',
      body: dto,
    })
  },

  deleteBlockedDate(id: string) {
    return apiFetch<{ ok: boolean }>(`/availability/blocked-dates/${id}`, {
      method: 'DELETE',
    })
  },
}
