import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/metadata'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Acceso',
    description: 'Ingreso al panel de gestión de CBI Viale.',
    path: '/login',
  }),
  robots: { index: false, follow: false },
}

// Login editorial — fondo limpio, card centrado. Sin Navbar ni Footer (PublicChrome los oculta).
export default function LoginPage() {
  return (
    <section className="min-h-dvh flex items-center justify-center bg-beige/40 py-16">
      <Container>
        <div className="max-w-md mx-auto bg-white border border-line p-10 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Panel de gestión
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl tracking-tighter leading-[1.05] text-ink mb-3">
            Acceso <span className="italic text-gold-800">restringido</span>
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed mb-10">
            Ingresá con tus credenciales para administrar turnos, consultas y disponibilidad de
            CBI.
          </p>

          <LoginForm />

          <div className="mt-10 pt-6 border-t border-line">
            <Link
              href="/"
              className="font-sans text-[11px] uppercase tracking-widest text-ink-muted hover:text-gold-700 transition-colors"
            >
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
