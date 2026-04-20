import type { UserRole } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

// Extiende los tipos de NextAuth con role + permissions.
// Se declaran opcionales en User para ser compatibles con AdapterUser
// (que extiende User y lo crea sin esos campos antes de que corra authorize()).

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      permissions: Record<string, boolean>
    } & DefaultSession['user']
  }

  interface User {
    role?: UserRole
    permissions?: Record<string, boolean>
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole
    permissions?: Record<string, boolean>
  }
}
