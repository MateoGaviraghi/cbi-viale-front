import { apiFetch } from '../client'
import type {
  CreateAgroFoodDto,
  CreateClinicalDto,
  CreateEnvironmentalDto,
  CreateGeneticDto,
  CreateUrocultureDto,
  CreateVaginalExudateDto,
  CreateVeterinaryDto,
  FormSubmission,
} from '../types'

/**
 * Cliente para los 7 formularios públicos del sitio (FRONTEND_FORMS.md del back).
 *
 * Endpoints públicos (sin auth). Rate limit del back: 10 req/min por IP.
 * Errores típicos: 400 (validación), 404 (parentSubmissionId), 429 (rate limit).
 */
export const publicSubmissionsApi = {
  /**
   * POST /submissions/clinical — Análisis clínico humano.
   *
   * Requiere subir antes la foto del pedido médico a Cloudinary
   * (ver `uploads.signMedicalOrder` + `uploadMedicalOrder` en `@/lib/cloudinary-upload`).
   */
  createClinical(dto: CreateClinicalDto) {
    return apiFetch<FormSubmission>('/submissions/clinical', {
      method: 'POST',
      body: dto,
    })
  },

  /**
   * POST /submissions/uroculture — Subform de Clínica Humana.
   *
   * Si va linkeado al CLINICAL padre, mandar `parentSubmissionId` (email/phone
   * son opcionales y se heredan). Si va standalone, email/phone son obligatorios.
   */
  createUroculture(dto: CreateUrocultureDto) {
    return apiFetch<FormSubmission>('/submissions/uroculture', {
      method: 'POST',
      body: dto,
    })
  },

  /**
   * POST /submissions/vaginal-exudate — Subform de Clínica Humana.
   *
   * Idem urocultivo: con parentSubmissionId hereda name/email/phone del CLINICAL.
   */
  createVaginalExudate(dto: CreateVaginalExudateDto) {
    return apiFetch<FormSubmission>('/submissions/vaginal-exudate', {
      method: 'POST',
      body: dto,
    })
  },

  /** POST /submissions/veterinary */
  createVeterinary(dto: CreateVeterinaryDto) {
    return apiFetch<FormSubmission>('/submissions/veterinary', {
      method: 'POST',
      body: dto,
    })
  },

  /** POST /submissions/agro-food */
  createAgroFood(dto: CreateAgroFoodDto) {
    return apiFetch<FormSubmission>('/submissions/agro-food', {
      method: 'POST',
      body: dto,
    })
  },

  /** POST /submissions/environmental */
  createEnvironmental(dto: CreateEnvironmentalDto) {
    return apiFetch<FormSubmission>('/submissions/environmental', {
      method: 'POST',
      body: dto,
    })
  },

  /** POST /submissions/genetic */
  createGenetic(dto: CreateGeneticDto) {
    return apiFetch<FormSubmission>('/submissions/genetic', {
      method: 'POST',
      body: dto,
    })
  },
}
