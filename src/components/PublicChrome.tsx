'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

// Wrapper que decide si renderizar el "chrome" público (Navbar + Footer + FloatingActions).
// Lo oculta en rutas de auth y admin — ese layout es editorial, sin navegación pública.
//
// Se usa como envoltorio en app/layout.tsx. Recibe los componentes ya instanciados
// como props (no como imports) para que puedan ser Server Components aunque este
// wrapper sea Client — Next permite pasar server components vía props a clients.

interface Props {
  navbar: ReactNode
  footer: ReactNode
  floating: ReactNode
  children: ReactNode
}

const HIDDEN_PREFIXES = ['/login', '/admin']

export function PublicChrome({ navbar, footer, floating, children }: Props) {
  const pathname = usePathname()
  const hideChrome = HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (hideChrome) return <>{children}</>

  return (
    <>
      {navbar}
      {children}
      {footer}
      {floating}
    </>
  )
}
