// Tipos TS espejo del backend CBI Viale (repo: cbi_viale_back).
// Fuente de verdad: prisma/schema.prisma + DTOs del Nest.
// Mantener sincronizado manualmente. Si el back crece, migrar a openapi-typescript
// contra /api/docs-json para autogenerar.

// ---------------------------------------------------------------------------
//  Enums
// ---------------------------------------------------------------------------

export type Role = 'ADMIN' | 'EMPLOYEE'

export const SERVICE_SLUG_ENUMS = [
  'CLINICA_HUMANA',
  'VETERINARIA',
  'AGRO_ALIMENTOS',
  'AMBIENTAL',
  'MEDICINA_REGENERATIVA',
  'GENETICA',
] as const
export type ServiceSlugEnum = (typeof SERVICE_SLUG_ENUMS)[number]

export type Weekday =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW'

export type FormType = 'CONTACT_GENERAL' | 'SERVICE_INQUIRY' | 'CONSENT' | 'CUSTOM'
export type FormStatus = 'PENDING' | 'ANSWERED' | 'ARCHIVED'

// ---------------------------------------------------------------------------
//  Permisos granulares (User.permissions JSON en el back)
// ---------------------------------------------------------------------------

export const PERMISSIONS = [
  'manageAppointments',
  'manageAvailability',
  'manageSubmissions',
  'manageUsers',
  'viewAuditLog',
  'exportData',
  'viewAnalytics',
] as const
export type Permission = (typeof PERMISSIONS)[number]

// ---------------------------------------------------------------------------
//  Entidades
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  permissions: Partial<Record<Permission, boolean>>
}

export interface ServiceImage {
  id: string
  serviceId: string
  url: string
  alt: string
  order: number
}

export interface ServiceAnalysis {
  id: string
  serviceId: string
  name: string
  description: string | null
  order: number
}

export interface Service {
  id: string
  slug: ServiceSlugEnum
  name: string
  shortDescription: string
  longDescription: string
  heroImage: string | null
  iconName: string | null
  durationMinutes: number
  requiresConsent: boolean
  active: boolean
  order: number
  images?: ServiceImage[]
  analyses?: ServiceAnalysis[]
}

export interface AvailabilityRule {
  id: string
  weekday: Weekday
  startTime: string // "HH:MM"
  endTime: string // "HH:MM"
  serviceId: string | null
  active: boolean
  createdAt: string // ISO
}

export interface BlockedDate {
  id: string
  startDate: string // ISO
  endDate: string // ISO
  reason: string | null
  serviceId: string | null
  createdBy: string
  createdAt: string
}

export interface PublicAvailability {
  service: Service
  rules: AvailabilityRule[]
  blockedDates: BlockedDate[]
}

// ---------------------------------------------------------------------------
//  Envelope de respuestas (TransformInterceptor del back)
// ---------------------------------------------------------------------------

export interface ApiMeta {
  total?: number
  page?: number
  pageSize?: number
  totalPages?: number
}

export interface ApiSuccess<T> {
  data: T
  meta?: ApiMeta
}

export interface ApiErrorShape {
  statusCode: number
  message: string | string[]
  error: string
  path?: string
  timestamp?: string
}

// ---------------------------------------------------------------------------
//  Mapeo slug URL (kebab-case) ↔ enum (UPPERCASE)
//  El back expone el endpoint con kebab-case (`/services/clinica-humana`)
//  y ServicesService.SLUG_MAP hace la conversión interna. El front mantiene
//  kebab-case en las URLs del sitio — este mapeo sirve para trabajar con el
//  enum cuando haga falta (ej: tipar un Service.slug en respuestas del back).
// ---------------------------------------------------------------------------

export const SLUG_URL_TO_ENUM: Record<string, ServiceSlugEnum> = {
  'clinica-humana': 'CLINICA_HUMANA',
  veterinaria: 'VETERINARIA',
  'agro-alimentos': 'AGRO_ALIMENTOS',
  ambiental: 'AMBIENTAL',
  'medicina-regenerativa': 'MEDICINA_REGENERATIVA',
  genetica: 'GENETICA',
}

export const SLUG_ENUM_TO_URL: Record<ServiceSlugEnum, string> = {
  CLINICA_HUMANA: 'clinica-humana',
  VETERINARIA: 'veterinaria',
  AGRO_ALIMENTOS: 'agro-alimentos',
  AMBIENTAL: 'ambiental',
  MEDICINA_REGENERATIVA: 'medicina-regenerativa',
  GENETICA: 'genetica',
}
