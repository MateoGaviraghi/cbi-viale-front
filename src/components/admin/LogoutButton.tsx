'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await api.auth.logout()
    } catch {
      // Incluso si falla (ej: 500), limpiamos el lado del front y vamos al login.
      // El peor caso es una cookie huérfana en el back con TTL 15min.
    } finally {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className="w-full"
    >
      <LogOut width={14} height={14} strokeWidth={1.5} />
      {loading ? 'Saliendo…' : 'Cerrar sesión'}
    </Button>
  )
}
