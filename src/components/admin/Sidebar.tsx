'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  MessageSquare,
  Clock,
  Users,
  ScrollText,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AuthUser, Permission } from '@/lib/api/types'
import { can } from '@/lib/permissions'

// Nav del admin — items filtrados por permisos del back.
// El check fuerte vive en el back; este es solo UX (ocultar lo que no puede hacer).
interface NavItem {
  href: string
  label: string
  icon: typeof Calendar
  permission: Permission | null // null = visible para todos los autenticados
  phase?: string
}

const ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, permission: null },
  { href: '/admin/turnos', label: 'Turnos', icon: Calendar, permission: 'manageAppointments', phase: 'Fase 2' },
  { href: '/admin/consultas', label: 'Consultas', icon: MessageSquare, permission: 'manageSubmissions', phase: 'Fase 2' },
  { href: '/admin/disponibilidad', label: 'Disponibilidad', icon: Clock, permission: 'manageAvailability' },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users, permission: 'manageUsers', phase: 'Fase 2' },
  { href: '/admin/auditoria', label: 'Auditoría', icon: ScrollText, permission: 'viewAuditLog', phase: 'Fase 2' },
  { href: '/admin/metricas', label: 'Métricas', icon: BarChart3, permission: 'viewAnalytics', phase: 'Fase 3' },
]

interface Props {
  user: AuthUser
}

export function Sidebar({ user }: Props) {
  const pathname = usePathname()

  const visibleItems = ITEMS.filter((item) => item.permission === null || can(user, item.permission))

  return (
    <nav aria-label="Navegación del panel" className="space-y-1">
      {visibleItems.map((item) => {
        const Icon = item.icon
        const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5',
              'font-sans text-sm transition-colors duration-500 ease-editorial',
              'tap-min',
              active
                ? 'bg-beige text-gold-800'
                : 'text-ink-muted hover:bg-beige/60 hover:text-ink',
            )}
          >
            <Icon width={16} height={16} strokeWidth={1.5} aria-hidden />
            <span className="flex-1">{item.label}</span>
            {item.phase && (
              <span className="font-sans text-[10px] uppercase tracking-widest text-ink-soft">
                {item.phase}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
