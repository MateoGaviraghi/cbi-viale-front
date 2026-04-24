import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { CONTACT, SITE } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { FadeIn } from '@/components/shared/FadeIn'
import { ContactForm } from './ContactForm'

export const metadata = buildMetadata({
  title: 'Contacto — Reservá tu consulta',
  description:
    'Escribinos o visitanos en Manuel Belgrano 594, Viale, Entre Ríos. Horarios y canales de contacto.',
  path: '/contacto',
})

export default function ContactoPage() {
  return (
    <section className="section border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Bloque intro + canales */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <GoldRule />
                <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                  Contacto
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tightest leading-[1.02] text-ink">
                Hablemos.
                <br />
                <span className="italic text-gold-800">Estamos cerca.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-ink-muted leading-relaxed">
                Para consultas generales, derivaciones profesionales o reservar un turno, escribinos
                por el canal que prefieras.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <dl className="mt-12 space-y-6">
                <Channel
                  icon={<MapPin width={20} height={20} strokeWidth={1.25} />}
                  label="Dirección"
                  value={
                    <>
                      {CONTACT.address.street}
                      <br />
                      {CONTACT.address.city}, {CONTACT.address.region}
                    </>
                  }
                />
                {CONTACT.phone && (
                  <Channel
                    icon={<Phone width={20} height={20} strokeWidth={1.25} />}
                    label="Teléfono"
                    value={
                      <a href={`tel:${CONTACT.phone}`} className="hover:text-gold-700">
                        {CONTACT.phone}
                      </a>
                    }
                  />
                )}
                {CONTACT.whatsapp && (
                  <Channel
                    icon={<MessageCircle width={20} height={20} strokeWidth={1.25} />}
                    label="WhatsApp"
                    value={
                      <a
                        href={`https://wa.me/${CONTACT.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-700"
                      >
                        Chatear por WhatsApp
                      </a>
                    }
                  />
                )}
                {CONTACT.email && (
                  <Channel
                    icon={<Mail width={20} height={20} strokeWidth={1.25} />}
                    label="Email"
                    value={
                      <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-700">
                        {CONTACT.email}
                      </a>
                    }
                  />
                )}
              </dl>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-12 bg-beige/50 border border-line p-8">
                <div className="flex items-center gap-4 mb-6">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                    Horarios de atención
                  </span>
                </div>
                <ul className="divide-y divide-line/80">
                  {CONTACT.hours.map((h) => (
                    <li key={h.day} className="flex items-baseline justify-between py-3">
                      <span className="font-serif text-base text-ink">{h.day}</span>
                      <span className="font-mono text-sm text-ink-muted">{h.range}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.05}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>

        <p className="mt-20 text-xs text-ink-soft">
          {SITE.name} · {CONTACT.address.street}, {CONTACT.address.city}
        </p>
      </Container>
    </section>
  )
}

function Channel({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="border border-line p-3 text-gold-700 shrink-0">{icon}</div>
      <div>
        <dt className="text-[10px] uppercase tracking-widest text-ink-muted">{label}</dt>
        <dd className="mt-1 text-lg text-ink">{value}</dd>
      </div>
    </div>
  )
}
