import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'
import { UsersManager } from './UsersManager'

export const dynamic = 'force-dynamic'

export default async function UsuariosPage() {
  const cookieHeader = cookies().toString()

  const [users, me] = await Promise.all([
    api.users.list({ pageSize: 100 }, cookieHeader),
    api.auth.me(cookieHeader),
  ])

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Equipo y accesos
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          <span className="italic text-gold-800">Usuarios</span>.
        </h1>
        <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-xl">
          Gestioná el equipo del laboratorio: roles, permisos granulares y accesos al panel.
        </p>
      </div>

      <UsersManager initialUsers={users.data} currentUserId={me.data.id} />
    </div>
  )
}
