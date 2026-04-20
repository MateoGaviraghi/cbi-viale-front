import type { UserRole } from '@prisma/client'

// Catálogo de permisos granulares — se guardan como Json en User.permissions.
// ADMIN tiene todos por defecto. EMPLOYEE recibe los que el ADMIN active.
export const PERMISSIONS = [
  'manageAppointments',
  'manageSubmissions',
  'exportData',
  'editServices',
  'manageAvailability',
  'manageUsers', // reservado sólo para ADMIN
  'viewAuditLog',
] as const

export type Permission = (typeof PERMISSIONS)[number]

type UserLike = { role: UserRole; permissions: Record<string, boolean> }

/** ¿Puede este usuario ejecutar esta acción? */
export function can(user: UserLike | null | undefined, perm: Permission): boolean {
  if (!user) return false
  if (user.role === 'ADMIN') return true
  if (perm === 'manageUsers') return false
  return user.permissions?.[perm] === true
}

/** Permisos por defecto para un empleado nuevo. */
export function defaultEmployeePermissions(): Record<Permission, boolean> {
  return {
    manageAppointments: true,
    manageSubmissions: true,
    exportData: false,
    editServices: false,
    manageAvailability: false,
    manageUsers: false,
    viewAuditLog: false,
  }
}
