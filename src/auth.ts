// Config completa de NextAuth — Node-only (Prisma + bcrypt).
// Se usa desde Server Actions, handlers, layouts; el middleware usa auth.config.
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { authConfig } from './auth.config'
import type { UserRole } from '@prisma/client'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Cast necesario — versiones de @auth/core divergen entre next-auth@5-beta y @auth/prisma-adapter.
  // Issue conocido: https://github.com/nextauthjs/next-auth/issues/9493
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })
        if (!user || !user.passwordHash || !user.active) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions as Record<string, boolean>,
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: UserRole }).role
        token.permissions = (user as { permissions: Record<string, boolean> }).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole
        session.user.permissions = token.permissions as Record<string, boolean>
      }
      return session
    },
  },
})
