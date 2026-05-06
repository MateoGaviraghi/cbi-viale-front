import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'

interface Props {
  serviceSlug: string
  serviceName: string
  /** Eyebrow encima del título (default: "Solicitar análisis"). */
  eyebrow?: string
  /** Título principal de la página (default: "Solicitud de {serviceName}"). */
  title?: string
  /** Párrafo introductorio bajo el título. */
  intro: string
  children: React.ReactNode
}

/**
 * Shell visual para las páginas /servicios/[slug]/solicitar.
 * Mantiene el lenguaje editorial (breadcrumb, eyebrow + GoldRule, h1 serif).
 */
export function RequestFormPage({
  serviceSlug,
  serviceName,
  eyebrow = 'Solicitar análisis',
  title,
  intro,
  children,
}: Props) {
  return (
    <main className="bg-white">
      <Container className="py-14 md:py-20 lg:py-24">
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="mb-10 text-xs uppercase tracking-widest text-ink-muted"
        >
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" className="hover:text-gold-700 transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/servicios" className="hover:text-gold-700 transition-colors">
                Servicios
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link
                href={`/servicios/${serviceSlug}`}
                className="hover:text-gold-700 transition-colors"
              >
                {serviceName}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-gold-700">Solicitar</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              {eyebrow}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tightest text-ink">
            {title ?? `Solicitud de ${serviceName}`}
          </h1>

          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-2xl">{intro}</p>
        </header>

        <div className="mt-12 max-w-3xl">{children}</div>
      </Container>
    </main>
  )
}

interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

/**
 * Agrupador visual dentro de un formulario largo. Separa "Datos del paciente",
 * "Datos del estudio", etc.
 */
export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="space-y-5">
      <header className="border-b border-line pb-3">
        <h2 className="font-serif text-2xl text-ink">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">{description}</p>
        )}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  )
}
