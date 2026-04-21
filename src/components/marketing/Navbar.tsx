'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/shared/Container'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'

// Navbar cinematográfico con doble estado:
//  · At top  → transparente, texto blanco (sobre hero photo oscura)
//  · Scrolled → blanco translúcido + blur + texto oscuro
// Transición suave de 600ms entre los dos modos.
export function Navbar() {
  const pathname = usePathname()
  // En la home hay un hero con foto oscura → navbar arranca transparente sobre la foto.
  // En otras rutas el fondo es claro → navbar arranca en modo "scrolled" (texto oscuro).
  const isHome = pathname === '/'

  const [scrolledState, setScrolledState] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // si no es home, siempre tratar como scrolled para que el texto sea legible
  const scrolled = isHome ? scrolledState : true

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolledState(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (!mobileOpen) return
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-editorial',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]'
            : 'bg-transparent border-b border-white/10',
        )}
      >
        {/* thin gold progress bar — se dibuja al scrollear */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
              aria-hidden
            />
          )}
        </AnimatePresence>

        <Container className="flex h-[76px] items-center justify-between lg:h-20">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              aria-label="CBI Viale — ir al inicio"
              className="group flex items-center gap-3 focus-visible:outline-none"
            >
              <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
                {/* next/image: optimiza automático a AVIF/WebP en el tamaño exacto → nítido en retina */}
                <Image
                  src="/logo-cbi-transparent.png"
                  alt=""
                  width={96}
                  height={96}
                  priority
                  className={cn(
                    'h-full w-full object-contain transition-[filter] duration-500',
                    !scrolled && 'brightness-0 invert',
                  )}
                />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span
                  className={cn(
                    'font-serif text-[19px] tracking-tight transition-colors duration-500',
                    scrolled
                      ? 'text-ink group-hover:text-gold-800'
                      : 'text-white group-hover:text-gold-300',
                  )}
                >
                  CBI <span className={cn(scrolled ? 'italic text-gold-800' : 'italic text-gold-300')}>Viale</span>
                </span>
                <span
                  className={cn(
                    'mt-1 text-[9px] uppercase tracking-[0.24em] transition-colors duration-500',
                    scrolled ? 'text-ink-muted' : 'text-white/60',
                  )}
                >
                  Centro Bioquímico
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Links desktop */}
          <motion.nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
            }}
          >
            <NavLink href="/" scrolled={scrolled}>
              Inicio
            </NavLink>
            <motion.div variants={navItem}>
              <MegaMenu scrolled={scrolled} />
            </motion.div>
            <NavLink href="/nosotros" scrolled={scrolled}>
              Nosotros
            </NavLink>
            <NavLink href="/contacto" scrolled={scrolled}>
              Contacto
            </NavLink>
          </motion.nav>

          {/* CTA desktop */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center"
          >
            <Link
              href="/turnos"
              className="group tap-min relative inline-flex h-11 items-center overflow-hidden bg-gold-700 px-6 font-sans text-xs uppercase tracking-widest text-white transition-colors duration-500 hover:bg-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-[-2px]">
                Sacar turno
              </span>
              <span
                aria-hidden
                className="relative z-10 ml-2 inline-block transition-all duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>

          {/* Hamburguesa mobile */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              'tap-min lg:hidden -mr-2 inline-flex items-center justify-center transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700',
              scrolled ? 'text-ink' : 'text-white',
            )}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
          >
            <Menu width={24} height={24} strokeWidth={1.25} />
          </motion.button>
        </Container>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer — sólo en rutas que NO son la home.
          En la home el hero se extiende debajo del navbar (efecto cinematográfico). */}
      {!isHome && <div className="h-[76px] lg:h-20" aria-hidden />}
    </>
  )
}

const navItem = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function NavLink({
  href,
  children,
  scrolled,
}: {
  href: string
  children: React.ReactNode
  scrolled: boolean
}) {
  return (
    <motion.div variants={navItem}>
      <Link
        href={href}
        className={cn(
          'group relative px-4 py-3 font-sans text-sm transition-colors duration-500 focus-visible:outline-none',
          scrolled
            ? 'text-ink hover:text-gold-700 focus-visible:text-gold-700'
            : 'text-white/90 hover:text-gold-300 focus-visible:text-gold-300',
        )}
      >
        {children}
        <span
          aria-hidden
          className="absolute left-4 right-4 bottom-2 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </Link>
    </motion.div>
  )
}
