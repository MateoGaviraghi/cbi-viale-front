'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Loader2, MessageSquare } from 'lucide-react'
import { api } from '@/lib/api'
import { toast } from '@/components/shared/Toaster'
import { GoldRule } from '@/components/shared/GoldRule'
import type { ServiceSlug } from '@/lib/constants'
import { SERVICES } from '@/lib/constants'

const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  mensaje: z.string().min(10, 'Mínimo 10 caracteres'),
})

type FormData = z.infer<typeof schema>

interface Props {
  serviceSlug: ServiceSlug
}

export function ServiceInquiryModal({ serviceSlug }: Props) {
  const [open, setOpen] = useState(false)
  const svc = SERVICES[serviceSlug]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      await api.submissions.create({
        type: 'SERVICE_INQUIRY',
        serviceSlug,
        name: data.nombre,
        email: data.email,
        phone: data.telefono || undefined,
        message: data.mensaje,
      })
      toast('Consulta enviada. Te respondemos pronto.', 'success')
      reset()
      setOpen(false)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al enviar la consulta'
      toast(msg, 'error')
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="tap-min inline-flex h-14 items-center justify-center gap-2 border border-line bg-transparent px-8 font-sans text-sm uppercase tracking-widest text-ink transition-colors duration-500 hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
          <MessageSquare width={16} height={16} strokeWidth={1.5} />
          Consultar
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 max-h-[90dvh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GoldRule />
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                  Consulta
                </span>
              </div>
              <Dialog.Title className="font-serif text-2xl text-ink">
                {svc.name}
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Cerrar"
                className="shrink-0 p-2 text-ink-muted hover:text-ink transition-colors"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <Field label="Nombre" error={errors.nombre?.message}>
              <input
                {...register('nombre')}
                type="text"
                autoComplete="name"
                placeholder="Tu nombre completo"
                className={inputCls(!!errors.nombre)}
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className={inputCls(!!errors.email)}
              />
            </Field>

            <Field label="Teléfono (opcional)" error={errors.telefono?.message}>
              <input
                {...register('telefono')}
                type="tel"
                autoComplete="tel"
                placeholder="+54 343 …"
                className={inputCls(!!errors.telefono)}
              />
            </Field>

            <Field label="Mensaje" error={errors.mensaje?.message}>
              <textarea
                {...register('mensaje')}
                rows={4}
                placeholder="¿Qué querés saber sobre este servicio?"
                className={inputCls(!!errors.mensaje)}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group tap-min inline-flex h-14 w-full items-center justify-center gap-3 bg-gold-700 px-8 font-sans text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-gold-800 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Enviando…
                </>
              ) : (
                'Enviar consulta'
              )}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full border bg-white px-4 py-3 font-sans text-base text-ink placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
    'transition-colors duration-200 min-h-[44px]',
    hasError ? 'border-red-400' : 'border-line',
  ].join(' ')
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
