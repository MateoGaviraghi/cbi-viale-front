// Barrel + cliente unificado del API del back de CBI Viale.
// Uso típico:
//   import { api } from '@/lib/api'
//   const { data: services } = await api.services.list()

export { apiFetch, ApiError } from './client'
export { apiUrl, API_BASE_PATH, getApiBaseUrl } from './config'
export * from './types'

import { authApi } from './endpoints/auth'
import { servicesApi } from './endpoints/services'
import { availabilityApi } from './endpoints/availability'
import { appointmentsApi } from './endpoints/appointments'
import { submissionsApi } from './endpoints/submissions'

export const api = {
  auth: authApi,
  services: servicesApi,
  availability: availabilityApi,
  appointments: appointmentsApi,
  submissions: submissionsApi,
}
