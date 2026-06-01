import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api, ApiError } from '@/lib/api'
import { AdminShell } from '@/components/admin/AdminShell'

// Layout del panel admin. Server Component — valida la sesión forwardeando
// las cookies HttpOnly al back via GET /auth/me. Si 401 → redirect a /login.
//
// force-dynamic porque cada request depende de las cookies del usuario.
// No hay forma de prerender este layout en build.
export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const res = await api.auth.me(cookies().toString())
    return <AdminShell user={res.data}>{children}</AdminShell>
  } catch (err) {
    // 401/403 (sin sesión / sin permiso) y 429 (rate-limit del back, p.ej. flood
    // a /auth/me sin token) → enviar a login en vez de propagar un 500 del panel.
    if (err instanceof ApiError && [401, 403, 429].includes(err.statusCode)) {
      redirect('/login')
    }
    throw err
  }
}
