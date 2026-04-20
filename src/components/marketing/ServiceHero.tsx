'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import type { ServiceSlug } from '@/lib/constants'
import { SERVICES, CONTACT } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { ServiceIcon } from './ServiceIcon'

interface Props {
  slug: ServiceSlug
  eyebrow: string
  intro: string
}

export function ServiceHero({ slug, eyebrow, intro }: Props) {
  const svc = SERVICES[slug]

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 border-b border-line">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-12 text-xs uppercase tracking-widest text-ink-muted">
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
            <li className="text-gold-700">{svc.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Texto */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tightest text-ink"
            >
              {svc.name}.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-xl text-lg text-ink-muted leading-relaxed"
            >
              {intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href={`/turnos?servicio=${slug}`}
                className="tap-min inline-flex h-14 items-center justify-center gap-2 bg-gold-700 px-8 font-sans text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-gold-800 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                Reservar turno
                <ArrowRight width={16} height={16} strokeWidth={1.5} />
              </Link>
              {CONTACT.whatsapp && (
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hola, quisiera consultar por ${svc.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-min inline-flex h-14 items-center justify-center gap-2 border border-ink bg-transparent px-8 font-sans text-sm uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  <MessageCircle width={16} height={16} strokeWidth={1.5} />
                  WhatsApp
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-line grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg text-sm"
            >
              <Metadata label="Duración" value={`~${svc.duration} min`} />
              <Metadata
                label="Consentimiento"
                value={svc.consent ? 'Requiere firma' : 'No aplica'}
              />
              <Metadata label="Informe" value="Digital + impreso" />
            </motion.div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative aspect-[4/5] w-full bg-beige overflow-hidden"
            >
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-800/70 font-sans">
                <span>{SERVICES[slug].name.split(' ')[0]}</span>
                <span>Servicio · CBI</span>
              </div>
              <div className="absolute inset-x-6 top-12 h-px bg-gold/40" aria-hidden />

              <div className="absolute inset-0 flex items-center justify-center">
                <ServiceIcon slug={slug} size={180} strokeWidth={0.5} className="opacity-60" />
              </div>

              <div className="absolute right-[-40%] bottom-[-30%] opacity-20 pointer-events-none">
                <Image
                  src="/icon-adn-512.png"
                  alt=""
                  width={500}
                  height={500}
                  className="mix-blend-multiply"
                />
              </div>

              <div className="absolute inset-x-6 bottom-6">
                <div className="mb-3 h-px bg-gold/40" aria-hidden />
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gold-800/70 font-sans">
                  <span>[Foto del servicio — pendiente]</span>
                  <span>CBI</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Metadata({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</p>
      <p className="mt-1 text-ink">{value}</p>
    </div>
  )
}
