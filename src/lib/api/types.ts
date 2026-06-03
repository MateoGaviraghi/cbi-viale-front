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

export type FormType =
  | 'CONTACT_GENERAL'
  | 'SERVICE_INQUIRY'
  | 'CONSENT'
  | 'CUSTOM'
  | 'CLINICAL'
  | 'UROCULTURE'
  | 'VAGINAL_EXUDATE'
  | 'VETERINARY'
  | 'AGRO_FOOD'
  | 'ENVIRONMENTAL'
  | 'GENETIC'
export type FormStatus = 'PENDING' | 'ANSWERED' | 'ARCHIVED'

// ---------------------------------------------------------------------------
//  Enums de los formularios públicos (FRONTEND_FORMS.md del back)
//  Listas cerradas validadas server-side. Cualquier cambio requiere coordinar
//  con el back. Veterinaria/Agro/Ambiental/Genética están "propuestos" — el
//  cliente puede pedir ajustes, en cuyo caso solo cambia el array de opciones.
// ---------------------------------------------------------------------------

export const VET_SPECIES = [
  'Canino',
  'Felino',
  'Equino',
  'Bovino',
  'Porcino',
  'Ovino',
  'Caprino',
  'Aves',
  'Otros',
] as const
export type VetSpecies = (typeof VET_SPECIES)[number]

export const VET_SAMPLE_TYPES = [
  'Sangre',
  'Suero',
  'Orina',
  'Materia fecal',
  'Hisopado',
  'Tejido',
  'Líquido sinovial',
  'Otros',
] as const
export type VetSampleType = (typeof VET_SAMPLE_TYPES)[number]

export const AGRO_ANALYSIS_TYPES = [
  'Microbiológico',
  'Fisicoquímico',
  'Composición nutricional',
  'Detección de contaminantes',
  'Pesticidas / agroquímicos',
  'Micotoxinas',
  'Otros',
] as const
export type AgroAnalysisType = (typeof AGRO_ANALYSIS_TYPES)[number]

export const ENV_SAMPLE_TYPES = [
  'Agua potable',
  'Agua de pozo',
  'Agua de red',
  'Efluente cloacal',
  'Efluente industrial',
  'Aire',
  'Suelo',
  'Otros',
] as const
export type EnvSampleType = (typeof ENV_SAMPLE_TYPES)[number]

export const ENV_ANALYSIS_TYPES = [
  'Bacteriológico',
  'Fisicoquímico',
  'Metales pesados',
  'Detección de coliformes',
  'Otros',
] as const
export type EnvAnalysisType = (typeof ENV_ANALYSIS_TYPES)[number]

export const GENETIC_STUDY_TYPES = [
  'Filiación / paternidad',
  'Identificación forense',
  'Estudio molecular / mutaciones',
  'Cariotipo',
  'Estudio oncológico',
  'Otros',
] as const
export type GeneticStudyType = (typeof GENETIC_STUDY_TYPES)[number]

export const UROCULTURE_SAMPLE_TYPES = [
  'Sonda',
  'Punción Suprapúbica',
  'Chorro medio',
] as const
export type UrocultureSampleType = (typeof UROCULTURE_SAMPLE_TYPES)[number]

// ---------------------------------------------------------------------------
//  DTOs de creación
// ---------------------------------------------------------------------------

export interface CreateAppointmentDto {
  serviceSlug: string
  /** ISO 8601 con timezone explícita, ej: "2026-05-10T09:00:00.000-03:00" */
  date: string
  patientName: string
  patientDni: string
  patientEmail: string
  patientPhone: string
  notes?: string
  consentGiven?: boolean
  /** URL Cloudinary de la firma del paciente (solo servicios con requiresConsent). */
  signatureUrl?: string
}

export interface CreateSubmissionDto {
  type: FormType
  name: string
  email: string
  message: string
  phone?: string
  subject?: string
  /** kebab-case slug del servicio. Requerido si type === 'SERVICE_INQUIRY'. */
  serviceSlug?: string
  extraData?: Record<string, unknown>
}

// ---------------------------------------------------------------------------
//  DTOs de los formularios públicos (1 endpoint POST por form, ver FRONTEND_FORMS.md)
//  Todos retornan 201 con `{ data: FormSubmission }`. Errores: 400 (validación),
//  404 (parentSubmissionId inválido), 429 (rate limit).
// ---------------------------------------------------------------------------

export interface CreateClinicalDto {
  name: string
  dni: string
  email: string
  /** YYYY-MM-DD o ISO 8601 */
  birthDate: string
  /** 8-15 dígitos, "+" opcional */
  phone: string
  healthInsurance?: string
  requestingDoctor?: string
  observations?: string
  /** Debe ser true */
  consentGiven: boolean
  /** URL Cloudinary devuelta por uploadMedicalOrder() */
  medicalOrderUrl: string
  /** URL Cloudinary de la firma del paciente (folder cbi-viale/consent-signatures). Opcional a nivel API; requerido por negocio cuando hay consentimiento. */
  signatureUrl?: string
}

export interface CreateUrocultureDto {
  /** Si se setea, email/phone son opcionales (heredados del CLINICAL padre). */
  parentSubmissionId?: string
  name: string
  dni: string
  email?: string
  phone?: string
  age: number
  /** "HH:MM" 24h */
  collectionTime: string
  /** YYYY-MM-DD o ISO */
  collectionDate: string
  sampleType?: UrocultureSampleType
  symptoms: string
  pregnancy?: boolean
  /** "Ninguno" si no aplica */
  previousAntibiotics: string
  /** "Ninguna" si no aplica */
  baselinePathology: string
  consentGiven: boolean
}

export interface CreateVaginalExudateDto {
  /** Si se setea, name/email/phone son opcionales (heredados del CLINICAL padre). */
  parentSubmissionId?: string
  name?: string
  dni?: string
  email?: string
  phone?: string
  age: number
  /** YYYY-MM-DD o ISO */
  lastMenstruationDate: string
  symptoms: string
  pregnancies: number
  flowCharacteristics: string
  /** "Ninguno" si no usa */
  contraceptiveUse: string
  /** "Ninguno" si no tiene */
  vaginalInfectionHistory: string
  abortionCount: number
  consentGiven: boolean
}

export interface CreateVeterinaryDto {
  ownerName: string
  /** DNI (7-9 dígitos) o CUIT (11 dígitos, con o sin guiones) */
  dniOrCuit: string
  phone: string
  email: string
  animalName: string
  species: VetSpecies
  breed: string
  animalAge: number
  requestingVet: string
  sampleType: VetSampleType
  /** YYYY-MM-DD o ISO */
  collectionDate: string
  observations?: string
}

export interface CreateAgroFoodDto {
  companyName: string
  /** 11 dígitos, con o sin guiones */
  cuit: string
  phone: string
  email: string
  productType: string
  batch?: string
  /** YYYY-MM-DD o ISO */
  productionDate?: string
  analysisType: AgroAnalysisType
  /** Texto libre con unidad, ej: "500g", "1L" */
  sampleQuantity: string
  /** YYYY-MM-DD o ISO */
  collectionDate: string
  origin?: string
  observations?: string
}

export interface CreateEnvironmentalDto {
  companyName: string
  cuit: string
  phone: string
  email: string
  sampleType: EnvSampleType
  samplingPoint: string
  location: string
  /** YYYY-MM-DD o ISO */
  collectionDate: string
  /** "HH:MM" */
  collectionTime?: string
  analysisType: EnvAnalysisType
  samplingResponsible?: string
  observations?: string
}

export interface CreateGeneticDto {
  name: string
  dni: string
  phone: string
  email: string
  studyType: GeneticStudyType
  studyReason: string
  sampleRelationship?: string
  sampleCount: number
  /** YYYY-MM-DD o ISO */
  collectionDate: string
  requestingProfessional?: string
  observations?: string
  consentGiven: boolean
  ethnicity: string
  diseaseStatus?: string
  boneMarrowTransplant?: boolean
  studyDetail: string
  previousGeneticStudies?: string
  /** URL Cloudinary de la firma del paciente. */
  signatureUrl?: string
}

// ---------------------------------------------------------------------------
//  Cloudinary — firma de upload del pedido médico (Clínica Humana)
// ---------------------------------------------------------------------------

export interface MedicalOrderUploadSignature {
  cloudName: string
  apiKey: string
  timestamp: number
  folder: string
  uploadPreset: string
  signature: string
  uploadUrl: string
}

/**
 * Firma de upload para la firma de consentimiento del paciente (canvas → PNG).
 * Shape idéntico a MedicalOrderUploadSignature; el back usa otro folder
 * (cbi-viale/consent-signatures) pero el front no lo distingue.
 */
export type SignatureUploadSignature = MedicalOrderUploadSignature

// ---------------------------------------------------------------------------
//  Respuesta del endpoint de disponibilidad de turnos
// ---------------------------------------------------------------------------

export interface PublicAvailabilitySlot {
  time: string // "HH:MM"
}

export interface PublicAvailabilityDay {
  date: string // "YYYY-MM-DD"
  slots: string[] // ["HH:MM", ...]
}

export interface PublicAvailabilityMonth {
  serviceSlug: string
  durationMinutes: number
  month: string // "YYYY-MM"
  days: PublicAvailabilityDay[]
}

// ---------------------------------------------------------------------------
//  Disponibilidad — admin (reglas de horario + bloqueos por fecha)
// ---------------------------------------------------------------------------

/** Regla de horario de atención. serviceId null = aplica a todos los servicios. */
export interface AvailabilityRule {
  id: string
  weekday: Weekday
  startTime: string // "HH:MM" 24h
  endTime: string // "HH:MM" 24h
  serviceId: string | null
  active: boolean
  createdAt: string
}

export interface CreateAvailabilityRuleDto {
  weekday: Weekday
  startTime: string
  endTime: string
  /** cuid del servicio; null/omitido = regla global. */
  serviceId?: string | null
  active?: boolean
}

export type UpdateAvailabilityRuleDto = Partial<CreateAvailabilityRuleDto>

/** Bloqueo de fechas (feriados, vacaciones). serviceId null = bloquea todos. */
export interface BlockedDate {
  id: string
  startDate: string // ISO 8601
  endDate: string // ISO 8601
  reason: string | null
  serviceId: string | null
  createdBy: string
  createdAt: string
}

export interface CreateBlockedDateDto {
  startDate: string // ISO 8601
  endDate: string // ISO 8601
  reason?: string | null
  serviceId?: string | null
}

export type UpdateBlockedDateDto = Partial<CreateBlockedDateDto>

// ---------------------------------------------------------------------------
//  Entidades Appointment y FormSubmission
// ---------------------------------------------------------------------------

export interface Appointment {
  id: string
  serviceId: string
  date: string // ISO 8601
  patientName: string
  patientDni: string
  patientEmail: string
  patientPhone: string
  notes: string | null
  consentGiven: boolean
  status: AppointmentStatus
  createdAt: string
  updatedAt: string
}

export interface FormSubmission {
  id: string
  type: FormType
  status: FormStatus
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  serviceId: string | null
  extraData: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
  /** Sólo presente para los forms públicos nuevos (CLINICAL, etc). */
  parentSubmissionId?: string | null
  /** Idem. */
  consentGiven?: boolean
  answeredAt?: string | null
  answeredBy?: string | null
}

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
//  Admin — entidades del panel de gestión
// ---------------------------------------------------------------------------

export interface AdminConsent {
  id: string
  submissionId: string
  patientName: string
  patientDni: string
  serviceSlug: string | null
  formType: FormType
  consentText: string | null
  createdAt: string
}

export interface AdminStats {
  appointments: { total: number; pending: number; confirmed: number; cancelled: number }
  submissions: { total: number; pending: number }
  consents: { total: number }
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
