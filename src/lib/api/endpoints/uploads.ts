import { apiFetch } from '../client'
import type { MedicalOrderUploadSignature, SignatureUploadSignature } from '../types'

/**
 * Endpoints de upload firmado al storage del back (Cloudinary).
 * Rate limit del back: 5 req/min por IP. La firma vence en 1 hora —
 * pedirla justo antes de subir el archivo.
 */
export const uploadsApi = {
  /**
   * POST /uploads/medical-order/sign
   *
   * Devuelve credenciales firmadas para subir la foto del pedido médico
   * directo a Cloudinary. El front valida cliente (≤10 MB, ext permitida)
   * antes de hacer el upload — ver `@/lib/cloudinary-upload`.
   */
  signMedicalOrder() {
    return apiFetch<MedicalOrderUploadSignature>('/uploads/medical-order/sign', {
      method: 'POST',
    })
  },

  /**
   * POST /uploads/signature/sign
   *
   * Devuelve credenciales firmadas para subir la firma del paciente
   * (canvas exportado a PNG) directo a Cloudinary. Ver `@/lib/signature-upload`.
   * Body `{}` para no enviar body vacío con Content-Type application/json.
   */
  signSignature() {
    return apiFetch<SignatureUploadSignature>('/uploads/signature/sign', {
      method: 'POST',
      body: {},
    })
  },
}
