import { apiFetch } from '../client'
import type {
  AdminUser,
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPermissionsDto,
} from '../types'

// Endpoints del módulo users (panel admin).
// Lectura/edición básica requiere `manageUsers`; crear, permisos, reset de
// password y baja son exclusivos de ADMIN (validado en el back).
export const usersApi = {
  /** GET /users — lista paginada con filtros. */
  list(
    params: {
      page?: number
      pageSize?: number
      role?: string
      active?: boolean
      q?: string
    } = {},
    cookieHeader?: string,
  ) {
    return apiFetch<AdminUser[]>('/users', {
      query: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 100,
        role: params.role,
        active: params.active,
        q: params.q,
      },
      cookieHeader,
    })
  },

  /** POST /users — crea un usuario (ADMIN). */
  create(dto: CreateUserDto) {
    return apiFetch<AdminUser>('/users', { method: 'POST', body: dto })
  },

  /** PATCH /users/:id — name, email, role, active (soft delete con active=false). */
  update(id: string, dto: UpdateUserDto) {
    return apiFetch<AdminUser>(`/users/${id}`, { method: 'PATCH', body: dto })
  },

  /** PATCH /users/:id/permissions — reemplaza el mapa de permisos (ADMIN). */
  updatePermissions(id: string, permissions: UpdateUserPermissionsDto) {
    // El back espera el mapa envuelto en { permissions }.
    return apiFetch<AdminUser>(`/users/${id}/permissions`, {
      method: 'PATCH',
      body: { permissions },
    })
  },

  /** PATCH /users/:id/password — reset de password (ADMIN). */
  updatePassword(id: string, newPassword: string) {
    return apiFetch<{ ok: boolean }>(`/users/${id}/password`, {
      method: 'PATCH',
      body: { newPassword },
    })
  },

  /** DELETE /users/:id — soft delete (active=false; nunca el último ADMIN). */
  softDelete(id: string) {
    return apiFetch<AdminUser>(`/users/${id}`, { method: 'DELETE' })
  },
}
