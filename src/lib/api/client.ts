import { apiUrl } from './config'
import type { ApiErrorShape, ApiSuccess } from './types'

/**
 * Error tipado emitido por el cliente cuando el back responde con status != 2xx.
 * Consumidores pueden hacer `if (err instanceof ApiError && err.statusCode === 401)`.
 */
export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errorCode?: string,
    public readonly path?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestOpts extends Omit<RequestInit, 'body'> {
  body?: unknown
  query?: Record<string, string | number | boolean | undefined | null>
  /**
   * En Server Components el fetch no hereda las cookies del browser.
   * Pasar el header Cookie manualmente desde `cookies().toString()`.
   */
  cookieHeader?: string
}

function buildQuery(query?: RequestOpts['query']): string {
  if (!query) return ''
  const entries = Object.entries(query).filter(
    ([, v]) => v !== undefined && v !== null,
  ) as [string, string | number | boolean][]
  if (entries.length === 0) return ''
  const qs = new URLSearchParams(entries.map(([k, v]) => [k, String(v)]))
  return `?${qs.toString()}`
}

/**
 * Hace una request al back y devuelve el envelope `{ data, meta }` del
 * TransformInterceptor. Si el back responde con error, lanza ApiError.
 */
export async function apiFetch<T>(
  path: string,
  opts: RequestOpts = {},
): Promise<ApiSuccess<T>> {
  const { body, query, cookieHeader, headers, ...rest } = opts

  const finalUrl = apiUrl(path) + buildQuery(query)

  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(headers as Record<string, string>),
  }
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json'
  if (cookieHeader) finalHeaders['Cookie'] = cookieHeader

  const res = await fetch(finalUrl, {
    credentials: 'include',
    cache: 'no-store',
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let payload: Partial<ApiErrorShape> = {}
    try {
      payload = (await res.json()) as Partial<ApiErrorShape>
    } catch {
      // body no JSON (ej: 502 del edge) — mantenemos el statusText
    }
    const msg = Array.isArray(payload.message)
      ? payload.message.join(', ')
      : (payload.message ?? res.statusText)
    throw new ApiError(res.status, msg, payload.error, payload.path)
  }

  if (res.status === 204) {
    return { data: undefined as T }
  }

  return (await res.json()) as ApiSuccess<T>
}
