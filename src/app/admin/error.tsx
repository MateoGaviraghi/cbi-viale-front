'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

// Error boundary para todo el panel admin.
// Los errores 401/403 redirigen al login; el resto ofrecen reintento.
export default function AdminError({ error, reset }: Props) {
  const router = useRouter()

  const isAuth =
    error.message.includes('inválida') ||
    error.message.includes('expirada') ||
    error.message.includes('Unauthorized') ||
    error.message.includes('Forbidden') ||
    error.message.includes('401') ||
    error.message.includes('403')

  useEffect(() => {
    if (isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  if (isAuth) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <p className="font-sans text-sm text-ink-muted">Sesión expirada. Redirigiendo…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
        Error del servidor
      </p>
      <h1 className="font-serif text-3xl tracking-tight text-ink">
        No se pudieron cargar los datos.
      </h1>
      <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
        {error.message || 'Ocurrió un error inesperado. Verificá que el servidor esté activo.'}
      </p>
      <div className="flex items-center gap-3">
        <Button variant="primary" size="sm" onClick={reset}>
          Reintentar
        </Button>
        <Link
          href="/admin"
          className="font-sans text-xs uppercase tracking-widest text-ink-muted hover:text-gold-700 transition-colors"
        >
          Ir al dashboard
        </Link>
      </div>
    </div>
  )
}
