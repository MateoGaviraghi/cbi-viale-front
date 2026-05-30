import { api } from '@/lib/api'
import type { SignatureUploadSignature } from '@/lib/api/types'

/**
 * Upload de la firma de consentimiento a Cloudinary.
 *
 * Flujo (3 pasos), clon de `@/lib/cloudinary-upload`:
 *   1. (validación trivial: el Blob ya viene del canvas, solo chequeamos que no esté vacío).
 *   2. Pedir firma al back (POST /uploads/signature/sign).
 *   3. POST multipart directo a Cloudinary con la firma.
 *
 * Devuelve `secure_url` para mandar como `signatureUrl` en el submit.
 */

export class SignatureUploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SignatureUploadError'
  }
}

interface CloudinaryUploadResponse {
  secure_url?: string
  error?: { message?: string }
}

/**
 * Sube el Blob PNG de la firma usando una firma ya generada por el back.
 * Separado para poder reintentar el upload sin volver a pedir la firma.
 */
export async function uploadSignatureWithSignature(
  blob: Blob,
  sig: SignatureUploadSignature,
): Promise<string> {
  const fd = new FormData()
  // Nombre de archivo explícito para que Cloudinary lo trate como imagen.
  fd.append('file', blob, 'firma.png')
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
    throw new SignatureUploadError(`Error subiendo la firma: ${msg}`)
  }

  return json.secure_url
}

/**
 * Flow completo: pide firma → sube el Blob a Cloudinary → devuelve secure_url.
 *
 * Lanza SignatureUploadError si el Blob está vacío o Cloudinary rechaza,
 * ApiError si el back falla pidiendo la firma.
 */
export async function uploadSignature(blob: Blob): Promise<string> {
  if (!blob || blob.size === 0) {
    throw new SignatureUploadError('La firma está vacía.')
  }
  const { data: sig } = await api.uploads.signSignature()
  return uploadSignatureWithSignature(blob, sig)
}
