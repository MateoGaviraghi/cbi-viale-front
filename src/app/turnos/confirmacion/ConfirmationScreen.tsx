'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { SERVICES } from '@/lib/constants'
import type { ServiceSlug } from '@/lib/constants'

interface ConfirmationData {
  appointmentId: string
  serviceName: string
  date: string   // YYYY-MM-DD
  time: string   // HH:MM
  patientName: string
  patientEmail: string
}

function isServiceSlug(slug: string): slug is ServiceSlug {
  return slug in SERVICES
}

export function ConfirmationScreen() {
  const router = useRouter()
  const [data, setData] = useState<ConfirmationData | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('turnos_confirmation')
    if (!raw) {
      // No confirmation data — prevent arriving here directly
      router.replace('/turnos')
      return
    }
    try {
      setData(JSON.parse(raw) as ConfirmationData)
      // Clear so a hard refresh redirects to step 1
      sessionStorage.removeItem('turnos_confirmation')
      sessionStorage.removeItem('turnos_availability')
    } catch {
      router.replace('/turnos')
      return
    }
    setReady(true)
  }, [router])

  if (!ready || !data) return null

  const formattedDate = format(parseISO(data.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })

  // Derive duration from constants if slug is available
  let durationLabel = ''
  for (const [slug, svc] of Object.entries(SERVICES)) {
    if (svc.name === data.serviceName && isServiceSlug(slug)) {
      durationLabel = `~${svc.duration} min`
      break
    }
  }

  return (
    <section className="section">
      <Container>
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Reserva confirmada
            </span>
          </div>

          {/* Icon */}
          <div className="flex items-center gap-4 mb-8">
            <CheckCircle size={40} strokeWidth={1.25} className="text-gold-700 shrink-0" />
            <h1 className="font-serif text-4xl md:text-5xl tracking-tightest leading-[1.02] text-ink">
              ¡Listo!
            </h1>
          </div>

          <p className="text-ink-muted leading-relaxed mb-10">
            Te enviamos la confirmación por email a{' '}
            <span className="text-ink font-sans">{data.patientEmail}</span>.
          </p>

          {/* Summary card */}
          <div className="border border-line bg-beige/40 p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={16} strokeWidth={1.25} className="text-gold-700 shrink-0" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                Resumen del turno
              </span>
            </div>

            <SummaryRow label="Servicio" value={data.serviceName} />
            <SummaryRow label="Fecha" value={<span className="capitalize">{formattedDate}</span>} />
            <SummaryRow label="Horario" value={data.time} mono />
            {durationLabel && <SummaryRow label="Duración" value={durationLabel} />}
            <SummaryRow label="Paciente" value={data.patientName} />
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="tap-min inline-flex h-14 flex-1 items-center justify-center gap-2 border border-line bg-white px-6 font-sans text-sm uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Volver al inicio
            </Link>
            <Link
              href="/turnos"
              className="tap-min inline-flex h-14 flex-1 items-center justify-center gap-2 bg-gold-700 px-6 font-sans text-sm uppercase tracking-widest text-white transition-all duration-500 hover:bg-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            >
              Sacar otro turno
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-line/60 last:border-b-0">
      <span className="text-[10px] uppercase tracking-widest text-ink-muted shrink-0">{label}</span>
      <span className={mono ? 'font-mono text-sm text-ink' : 'text-sm text-ink text-right'}>
        {value}
      </span>
    </div>
  )
}
