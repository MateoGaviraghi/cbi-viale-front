import { api } from '@/lib/api'
import type { MedicalOrderUploadSignature } from '@/lib/api/types'

/**
 * Upload del pedido médico a Cloudinary (formulario Clínica Humana).
 *
 * Flujo (3 pasos):
 *   1. Validar archivo cliente (tamaño + extensión).
 *   2. Pedir firma al back (POST /uploads/medical-order/sign).
 *   3. POST multipart directo a Cloudinary con la firma.
 *
 * Devuelve `secure_url` para mandar como `medicalOrderUrl` en CreateClinicalDto.
 */

export const MEDICAL_ORDER_MAX_BYTES = 10 * 1024 * 1024 // 10 MB
export const MEDICAL_ORDER_ALLOWED_EXT = [
  'jpg',
  'jpeg',
  'png',
  'pdf',
  'webp',
  'heic',
  'heif',
] as const
export type MedicalOrderExt = (typeof MEDICAL_ORDER_ALLOWED_EXT)[number]

export const MEDICAL_ORDER_ACCEPT =
  '.jpg,.jpeg,.png,.pdf,.webp,.heic,.heif,image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf'

export class MedicalOrderValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MedicalOrderValidationError'
  }
}

/**
 * Valida un File contra los requisitos del back.
 * Lanza MedicalOrderValidationError si no cumple.
 */
export function validateMedicalOrderFile(file: File): void {
  if (file.size > MEDICAL_ORDER_MAX_BYTES) {
    throw new MedicalOrderValidationError(
      'El archivo supera los 10 MB. Probá con una imagen más liviana.',
    )
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!MEDICAL_ORDER_ALLOWED_EXT.includes(ext as MedicalOrderExt)) {
    throw new MedicalOrderValidationError(
      'Formato no permitido. Subí un .jpg, .png, .pdf, .webp o .heic.',
    )
  }
}

interface CloudinaryUploadResponse {
  secure_url?: string
  error?: { message?: string }
}

/**
 * Sube el archivo a Cloudinary usando una firma generada por el back.
 * Útil cuando ya tenés la firma (ej: para no pedirla dos veces si retry).
 */
export async function uploadMedicalOrderWithSignature(
  file: File,
  sig: MedicalOrderUploadSignature,
): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('api_key', sig.apiKey)
  fd.append('timestamp', String(sig.timestamp))
  fd.append('folder', sig.folder)
  fd.append('upload_preset', sig.uploadPreset)
  fd.append('signature', sig.signature)

  const res = await fetch(sig.uploadUrl, {
    method: 'POST',
    body: fd,
  })

  let json: CloudinaryUploadResponse = {}
  try {
    json = (await res.json()) as CloudinaryUploadResponse
  } catch {
    // body no JSON
  }

  if (!res.ok || !json.secure_url) {
    const msg = json.error?.message ?? `Cloudinary respondió ${res.status}`
    throw new Error(`Error subiendo el pedido médico: ${msg}`)
  }

  return json.secure_url
}

/**
 * Flow completo: valida → pide firma → sube a Cloudinary → devuelve secure_url.
 *
 * Lanza MedicalOrderValidationError si la validación cliente falla,
 * ApiError si el back falla pidiendo firma,
 * Error genérico si Cloudinary rechaza el upload.
 */
export async function uploadMedicalOrder(file: File): Promise<string> {
  validateMedicalOrderFile(file)
  const { data: sig } = await api.uploads.signMedicalOrder()
  return uploadMedicalOrderWithSignature(file, sig)
}
