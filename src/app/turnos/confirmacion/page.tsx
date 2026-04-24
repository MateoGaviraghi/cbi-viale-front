import { buildMetadata } from '@/lib/seo/metadata'
import { ConfirmationScreen } from './ConfirmationScreen'

export const metadata = buildMetadata({
  title: 'Turno confirmado',
  description: 'Tu turno fue reservado exitosamente en CBI Viale.',
  path: '/turnos/confirmacion',
})

export default function ConfirmacionPage() {
  return <ConfirmationScreen />
}
