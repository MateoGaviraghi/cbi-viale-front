import { apiFetch } from '../client'
import type { CreateSubmissionDto, FormSubmission } from '../types'

export const submissionsApi = {
  /**
   * POST /submissions — recibe un formulario (contacto, consulta, consentimiento).
   * Encola 2 emails (al paciente + al staff).
   */
  create(dto: CreateSubmissionDto) {
    return apiFetch<FormSubmission>('/submissions', {
      method: 'POST',
      body: dto,
    })
  },
}
