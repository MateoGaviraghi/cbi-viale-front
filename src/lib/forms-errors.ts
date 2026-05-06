import { ApiError } from '@/lib/api'

/**
 * Convierte un error del cliente API en un mensaje en español claro para mostrar
 * al usuario. Maneja específicamente 400 (validación), 404 (parent inexistente),
 * 429 (rate limit) y errores de red.
 */
export function getFormErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.statusCode === 429) {
      return 'Demasiadas solicitudes en los últimos 60 segundos. Probá de nuevo en un minuto.'
    }
    if (err.statusCode === 404) {
      return 'No pudimos vincular este formulario al pedido principal. Intentalo otra vez.'
    }
    if (err.statusCode === 400) {
      // El back devuelve el mensaje específico ("DNI inválido", etc.)
      return err.message || 'Hay un problema con los datos enviados. Revisá los campos marcados.'
    }
    if (err.statusCode >= 500) {
      return 'El servidor tuvo un problema procesando tu solicitud. Intentá de nuevo en unos minutos.'
    }
    return err.message
  }

  if (err instanceof TypeError) {
    // Errores de red (sin conexión, CORS, etc.)
    return 'No pudimos conectar con el servidor. Revisá tu conexión y volvé a intentar.'
  }

  if (err instanceof Error) {
    return err.message
  }

  return 'Ocurrió un error inesperado al enviar el formulario.'
}
