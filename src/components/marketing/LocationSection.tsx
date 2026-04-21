'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'
import { SplitText } from '@/components/shared/SplitText'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'
import { CONTACT } from '@/lib/constants'

// Link del cliente (share de Google Maps)
const MAPS_SHARE_URL = CONTACT.address.mapsShareUrl
// Embed con coordenadas EXACTAS → Google renderiza el pin rojo en el punto del negocio.
// Sin API key (legacy endpoint, funciona siempre).
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${CONTACT.address.lat},${CONTACT.address.lng}&t=&z=17&ie=UTF8&iwloc=B&output=embed`

// Asymmetric split 5/7 — info a la izquierda, mapa grande a la derecha.
// El mapa tiene parallax sutil al scroll y markers editoriales en sus esquinas.
export function LocationSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const mapY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={ref}
      className="relative bg-white border-t border-line overflow-hidden py-16 md:py-24 lg:py-28"
    >
      {/* Decoración esquina superior derecha */}
      <div
        className="absolute top-0 right-0 w-32 h-32 border-l border-b border-gold/20 pointer-events-none"
        aria-hidden
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ============ LEFT: info ============ */}
          <div className="lg:col-span-5">
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-8">
                <GoldRule length="long" />
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">
                  Donde encontrarnos
                </span>
              </div>
            </Reveal>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.02] text-ink">
              <SplitText inView staggerChildren={0.07} duration={0.8}>
                Manuel
              </SplitText>
              <br />
              <span className="italic text-gold-800">
                <SplitText inView delay={0.3} staggerChildren={0.07} duration={0.8}>
                  Belgrano 594.
                </SplitText>
              </span>
            </h2>

            <Reveal direction="up" delay={0.4}>
              <p className="mt-8 max-w-md text-lg text-ink-muted leading-relaxed">
                Esquina con Gregoria Pérez, en el corazón de Viale, Entre Ríos. Fácil acceso,
                estacionamiento en la zona.
              </p>
            </Reveal>

            <StaggerGroup
              stagger={0.1}
              delay={0.2}
              className="mt-12 space-y-5 border-t border-line pt-10"
            >
              <InfoRow icon={<MapPin size={16} strokeWidth={1.5} />} label="Dirección">
                {CONTACT.address.street}
                <br />
                <span className="text-ink-muted">
                  {CONTACT.address.city}, {CONTACT.address.region}
                </span>
              </InfoRow>
              <InfoRow icon={<Clock size={16} strokeWidth={1.5} />} label="Horarios">
                Lun–Vie 07:00–12:00 · 14:00–18:00
                <br />
                <span className="text-ink-muted">Sáb 08:00–12:00 · Dom cerrado</span>
              </InfoRow>
              {CONTACT.phone && (
                <InfoRow icon={<Phone size={16} strokeWidth={1.5} />} label="Teléfono">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-gold-700 transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </InfoRow>
              )}
            </StaggerGroup>

            <Reveal direction="up" delay={0.5}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group tap-min inline-flex h-12 md:h-[52px] items-center justify-center gap-2 bg-ink px-7 text-white font-sans text-xs uppercase tracking-[0.22em] hover:bg-gold-800 transition-colors duration-500"
                >
                  <span className="transition-transform duration-500 group-hover:-translate-x-1">
                    Cómo llegar
                  </span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                  />
                </a>
                <Link
                  href="/contacto"
                  className="tap-min inline-flex h-12 md:h-[52px] items-center justify-center px-7 border border-ink text-ink font-sans text-xs uppercase tracking-[0.22em] hover:bg-ink hover:text-white transition-colors duration-500"
                >
                  Más información
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ============ RIGHT: Map ============ */}
          <Reveal direction="right" duration={0.9} className="lg:col-span-7">
            {/* Strip superior editorial — FUERA del iframe */}
            <div className="flex items-center justify-between border border-line border-b-0 bg-white px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted">
              <span>N° 03 · Ubicación</span>
              <span>Viale · Entre Ríos</span>
            </div>

            {/* Mapa limpio */}
            <motion.div
              style={{ y: mapY }}
              className="group relative aspect-[5/4] lg:aspect-[4/3] w-full border-x border-line overflow-hidden bg-beige"
            >
              <iframe
                title="Ubicación CBI Viale en Google Maps"
                className="h-full w-full grayscale-[0.15] contrast-[1.02] transition-all duration-700 ease-editorial group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src={MAPS_EMBED_URL}
              />
            </motion.div>

            {/* Strip inferior editorial — FUERA del iframe */}
            <div className="flex items-center justify-between border border-line border-t-0 bg-white">
              <span className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink">
                CBI · Centro Bioquímico Integral
              </span>
              <a
                href={MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/abrir inline-flex h-full items-center gap-1.5 bg-gold-700 px-5 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-white hover:bg-gold-800 transition-colors duration-500"
              >
                Abrir en Maps
                <ArrowUpRight
                  size={11}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover/abrir:-translate-y-0.5 group-hover/abrir:translate-x-0.5"
                />
              </a>
            </div>

            {/* Pin info debajo del mapa */}
            <div className="mt-5 grid grid-cols-3 gap-4 lg:gap-6">
              <InlineFact
                label="Coordenadas"
                value={`${CONTACT.address.lat.toFixed(4)}, ${CONTACT.address.lng.toFixed(4)}`}
                mono
              />
              <InlineFact
                label="Código postal"
                value={CONTACT.address.postalCode}
                mono
              />
              <InlineFact label="Provincia" value={CONTACT.address.region} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <StaggerItem>
      <div className="flex items-start gap-4">
        <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center border border-line text-gold-700 mt-0.5">
          {icon}
        </span>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-1.5">{label}</p>
          <div className="text-ink leading-relaxed">{children}</div>
        </div>
      </div>
    </StaggerItem>
  )
}

function InlineFact({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="border-t border-line pt-4">
      <p className="text-[10px] uppercase tracking-widest text-ink-muted mb-1.5">{label}</p>
      <p className={`text-sm text-ink ${mono ? 'font-mono' : 'font-sans'}`}>{value}</p>
    </div>
  )
}
