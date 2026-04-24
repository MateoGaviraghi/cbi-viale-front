import { api } from '../index'

export interface ServiceOperationalData {
  id: string
  slug: string
  durationMinutes: number
  requiresConsent: boolean
  active: boolean
}

/**
 * Obtiene los metadatos operativos de un servicio por su slug URL (kebab-case).
 * Usado por el turnero (slots + consentimiento) y el form de consulta (serviceSlug).
 */
export async function getServiceOperationalData(
  urlSlug: string,
  cookieHeader?: string,
): Promise<ServiceOperationalData> {
  const { data } = await api.services.bySlug(urlSlug, cookieHeader)
  return {
    id: data.id,
    slug: data.slug,
    durationMinutes: data.durationMinutes,
    requiresConsent: data.requiresConsent,
    active: data.active,
  }
}
