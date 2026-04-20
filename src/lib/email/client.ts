import { Resend } from 'resend'

// Instancia única de Resend. Se instancia sólo si está configurado
// (permite que la app arranque en dev sin API key — los envíos loguean a consola).
const apiKey = process.env.RESEND_API_KEY
export const resend = apiKey ? new Resend(apiKey) : null

export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ?? 'CBI Viale <no-reply@cbiviale.com.ar>'
export const EMAIL_REPLY_TO = process.env.RESEND_REPLY_TO

/** Verifica al boot si está configurado; útil para loggear en dev. */
export function isEmailConfigured() {
  return !!apiKey
}
