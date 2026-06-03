import { apiFetch } from '../client'
import type {
  Appointment,
  AppointmentStatus,
  FormSubmission,
  FormStatus,
  AdminConsent,
  AdminStats,
  AuditLogEntry,
} from '../types'

export const adminApi = {
  /** GET /admin/appointments — lista paginada de turnos. */
  listAppointments(cookieHeader?: string, page = 1, pageSize = 50) {
    return apiFetch<Appointment[]>('/admin/appointments', {
      query: { page, pageSize },
      cookieHeader,
    })
  },

  /** PATCH /admin/appointments/:id — actualiza estado y/o notas de un turno. */
  updateAppointment(id: string, dto: { status?: AppointmentStatus; notes?: string }) {
    return apiFetch<Appointment>(`/admin/appointments/${id}`, {
      method: 'PATCH',
      body: dto,
    })
  },

  /** GET /admin/submissions — lista paginada de formularios enviados. */
  listSubmissions(cookieHeader?: string, page = 1, pageSize = 50) {
    return apiFetch<FormSubmission[]>('/admin/submissions', {
      query: { page, pageSize },
      cookieHeader,
    })
  },

  /** PATCH /admin/submissions/:id — actualiza estado de una consulta. */
  updateSubmission(id: string, dto: { status?: FormStatus; answeredBy?: string }) {
    return apiFetch<FormSubmission>(`/admin/submissions/${id}`, {
      method: 'PATCH',
      body: dto,
    })
  },

  /** GET /admin/consents — lista paginada de consentimientos firmados. */
  listConsents(cookieHeader?: string, page = 1, pageSize = 50) {
    return apiFetch<AdminConsent[]>('/admin/consents', {
      query: { page, pageSize },
      cookieHeader,
    })
  },

  /** GET /admin/stats — métricas rápidas del panel. */
  getStats(cookieHeader?: string) {
    return apiFetch<AdminStats>('/admin/stats', { cookieHeader })
  },

  /**
   * GET /admin/audit-logs — registro de auditoría paginado (permiso viewAuditLog).
   * El back ya escribe el AuditLog; este endpoint de lectura está pendiente (la
   * página /admin/auditoria maneja el 404 hasta que exista).
   */
  listAuditLogs(params: { page?: number; pageSize?: number } = {}, cookieHeader?: string) {
    return apiFetch<AuditLogEntry[]>('/admin/audit-logs', {
      query: { page: params.page ?? 1, pageSize: params.pageSize ?? 100 },
      cookieHeader,
    })
  },
}
