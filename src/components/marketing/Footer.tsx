import Link from 'next/link'
import { Instagram, MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import { CONTACT, SERVICE_SLUGS, SERVICES, SITE } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'

// Footer compacto — un solo bloque con 4 columnas + baseline.
// Sin duplicaciones con navbar ni con FinalCTA que siempre va antes.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-line">
      <Container className="py-16 md:py-20">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Marca */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="Inicio" className="inline-flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-sin-fondo-cbi-viale.svg"
                alt=""
                className="h-11 w-11 object-contain transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              />
              <span className="font-serif text-2xl tracking-tight text-ink leading-none">
                CBI <span className="italic text-gold-800">Viale</span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm text-ink-muted leading-relaxed">
              {SITE.legalName}. Análisis bioquímicos con rigor científico en Viale, Entre Ríos.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <GoldRule />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-700">
                Viale · Entre Ríos
              </span>
            </div>
          </div>

          {/* Servicios */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-muted mb-5">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/servicios/${slug}`}
                    className="text-sm text-ink hover:text-gold-700 transition-colors"
                  >
                    {SERVICES[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-muted mb-5">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-ink">
              <li className="flex items-start gap-2.5">
                <MapPin
                  width={14}
                  height={14}
                  strokeWidth={1.5}
                  className="text-gold-700 shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">
                  {CONTACT.address.street}
                  <br />
                  <span className="text-ink-muted">
                    {CONTACT.address.city}, {CONTACT.address.region}
                  </span>
                </span>
              </li>
              {CONTACT.whatsapp && (
                <li className="flex items-start gap-2.5">
                  <MessageCircle
                    width={14}
                    height={14}
                    strokeWidth={1.5}
                    className="text-gold-700 shrink-0 mt-1"
                  />
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {CONTACT.email && (
                <li className="flex items-start gap-2.5">
                  <Mail
                    width={14}
                    height={14}
                    strokeWidth={1.5}
                    className="text-gold-700 shrink-0 mt-1"
                  />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="hover:text-gold-700 transition-colors break-all"
                  >
                    {CONTACT.email}
                  </a>
                </li>
              )}
              {CONTACT.phone && (
                <li className="flex items-start gap-2.5">
                  <Phone
                    width={14}
                    height={14}
                    strokeWidth={1.5}
                    className="text-gold-700 shrink-0 mt-1"
                  />
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="hover:text-gold-700 transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Instagram
                  width={14}
                  height={14}
                  strokeWidth={1.5}
                  className="text-gold-700 shrink-0 mt-1"
                />
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 hover:text-gold-700 transition-colors"
                >
                  @cbi_viale
                  <ArrowUpRight
                    width={11}
                    height={11}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div className="md:col-span-2">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-muted mb-5">
              Horarios
            </h3>
            <ul className="space-y-3 text-sm">
              {CONTACT.hours.map((h) => (
                <li key={h.day}>
                  <span className="block text-ink">{h.day}</span>
                  <span className="font-mono text-xs text-ink-muted">{h.range}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Baseline — línea delgada abajo */}
      <div className="border-t border-line">
        <Container className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-6">
          <p className="text-xs text-ink-soft">
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <a
            href="https://nodotech.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-gold-700 transition-colors"
          >
            Desarrollado por{' '}
            <span className="text-gold-700 group-hover:text-gold-800">nodotech.dev</span>
            <ArrowUpRight
              width={11}
              height={11}
              strokeWidth={1.5}
              className="text-gold-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Container>
      </div>
    </footer>
  )
}
