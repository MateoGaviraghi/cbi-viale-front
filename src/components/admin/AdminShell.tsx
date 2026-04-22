import Link from 'next/link'
import type { AuthUser } from '@/lib/api/types'
import { Sidebar } from './Sidebar'
import { LogoutButton } from './LogoutButton'

// Shell visual del panel admin — sidebar fijo a la izquierda en desktop, stack en mobile.
// Es Server Component — no usa hooks, solo renderiza UI + pasa `user` a los hijos client.
interface Props {
  user: AuthUser
  children: React.ReactNode
}

export function AdminShell({ user, children }: Props) {
  return (
    <div className="min-h-dvh bg-beige/20 flex flex-col md:flex-row">
      <aside className="md:w-64 md:flex-shrink-0 md:min-h-dvh bg-white border-b md:border-b-0 md:border-r border-line flex flex-col">
        <div className="px-6 py-8 border-b border-line">
          <Link
            href="/admin"
            className="font-serif text-xl tracking-tight text-ink hover:text-gold-800 transition-colors"
          >
            CBI · <span className="italic text-gold-800">Admin</span>
          </Link>
          <p className="mt-2 font-sans text-[11px] uppercase tracking-widest text-ink-muted">
            Panel de gestión
          </p>
        </div>

        <div className="flex-1 px-3 py-6">
          <Sidebar user={user} />
        </div>

        <div className="px-6 py-5 border-t border-line">
          <p className="font-sans text-[11px] uppercase tracking-widest text-ink-muted">
            {user.role === 'ADMIN' ? 'Administrador' : 'Empleado'}
          </p>
          <p className="mt-1 text-sm text-ink truncate">{user.name}</p>
          <p className="text-xs text-ink-muted truncate">{user.email}</p>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="flex-1 px-6 py-10 md:px-12 md:py-16 max-w-5xl">{children}</main>
    </div>
  )
}
