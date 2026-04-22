// Configuración del cliente API.
//
// En el browser las URLs son relativas → las captura el rewrite de next.config.mjs
// y las reenvía al back (mismo origen desde el punto de vista del browser, por lo
// que las cookies HttpOnly fluyen sin CORS ni SameSite cross-site).
//
// En server-side (Server Components, Route Handlers, etc.) se va directo al back
// via la env API_URL interna (sin pasar por el rewrite de Next).

export const API_BASE_PATH = '/api/v1'

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '' // browser → rewrite
  }
  return process.env.API_URL ?? 'http://localhost:3001'
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl()
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${API_BASE_PATH}${clean}`
}
