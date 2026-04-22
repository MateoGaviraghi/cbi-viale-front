import { apiFetch } from '../client'
import type { AuthUser } from '../types'

// Endpoints del módulo auth del back (src/auth/auth.controller.ts en cbi_viale_back).
// Todos setean/leen cookies HttpOnly — NO pasar tokens manuales, lo maneja el back.
export const authApi = {
  /** POST /auth/login — valida credentials, setea access_token + refresh_token. */
  login(email: string, password: string) {
    return apiFetch<AuthUser>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  },

  /** POST /auth/logout — limpia cookies. */
  logout() {
    return apiFetch<{ ok: true }>('/auth/logout', { method: 'POST' })
  },

  /** POST /auth/refresh — emite nuevos tokens usando refresh_token. */
  refresh(cookieHeader?: string) {
    return apiFetch<{ ok: true }>('/auth/refresh', { method: 'POST', cookieHeader })
  },

  /**
   * GET /auth/me — devuelve el usuario autenticado.
   * En Server Components hay que forwardear las cookies manualmente:
   *   const cookieHeader = cookies().toString()
   *   const res = await api.auth.me(cookieHeader)
   */
  me(cookieHeader?: string) {
    return apiFetch<AuthUser>('/auth/me', { cookieHeader })
  },
}
