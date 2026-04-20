// Config edge-safe de NextAuth (sin Prisma ni bcrypt).
// El middleware importa SOLO desde acá para poder correr en el edge runtime.
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ request, auth }) {
      const isAdmin = request.nextUrl.pathname.startsWith('/admin')
      if (isAdmin) return !!auth?.user
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
