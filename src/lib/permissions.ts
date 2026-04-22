import type { AuthUser, Permission } from './api/types'

// Chequeo client-side de permisos granulares del back.
// IMPORTANTE: el check fuerte vive en el back (PermissionsGuard) — el del front
// es UX, no seguridad. Un EMPLOYEE no debería ver un botón que no puede ejecutar.

/** ¿Puede este usuario ejecutar esta acción? */
export function can(user: AuthUser | null | undefined, perm: Permission): boolean {
  if (!user) return false
  if (user.role === 'ADMIN') return true
  if (perm === 'manageUsers') return false // manageUsers es exclusivo de ADMIN
  return user.permissions?.[perm] === true
}

/** Permisos por defecto al crear un EMPLOYEE desde el panel admin. */
export function defaultEmployeePermissions(): Record<Permission, boolean> {
  return {
    manageAppointments: true,
    manageSubmissions: true,
    manageAvailability: false,
    manageUsers: false,
    viewAuditLog: false,
    exportData: false,
    viewAnalytics: false,
  }
}
