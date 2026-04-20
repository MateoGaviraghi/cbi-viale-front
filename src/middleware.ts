import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Middleware edge-safe — usa authConfig sin Prisma ni bcrypt.
// La auth real (credentials, adapter) vive en src/auth.ts.
export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  // Protegemos /admin — /login queda excluido para evitar loop.
  // Las rutas públicas (/, /servicios, /turnos, /nosotros, /contacto) no pasan.
  matcher: ['/admin/:path*'],
}
