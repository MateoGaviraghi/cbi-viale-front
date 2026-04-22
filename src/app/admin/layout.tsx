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
    if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 403)) {
      redirect('/login')
    }
    throw err
  }
}
