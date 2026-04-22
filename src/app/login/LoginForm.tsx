'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { api, ApiError } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
})

type FormData = z.infer<typeof schema>

type Feedback = { type: 'error' | 'success'; msg: string } | null

export function LoginForm() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<Feedback>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: FormData) {
    setFeedback(null)
    try {
      await api.auth.login(data.email, data.password)
      setFeedback({ type: 'success', msg: 'Ingresaste. Redirigiendo…' })
      router.push('/admin')
      router.refresh() // re-evalúa el layout guard con la cookie recién seteada
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          setFeedback({ type: 'error', msg: 'Email o contraseña incorrectos.' })
        } else if (err.statusCode === 429) {
          setFeedback({
            type: 'error',
            msg: 'Demasiados intentos. Esperá un minuto e intentá de nuevo.',
          })
        } else {
          setFeedback({ type: 'error', msg: err.message || 'Error inesperado.' })
        }
      } else {
        setFeedback({
          type: 'error',
          msg: 'No se pudo conectar al servidor. Verificá tu conexión.',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          aria-invalid={!!errors.email}
          disabled={isSubmitting}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-danger">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" required>
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          disabled={isSubmitting}
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-2 text-xs text-danger">{errors.password.message}</p>
        )}
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className={
            feedback.type === 'error'
              ? 'border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-sm'
              : 'border border-gold-700/40 bg-gold-700/5 text-gold-800 px-4 py-3 text-sm'
          }
        >
          {feedback.msg}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Ingresando…' : 'Ingresar'}
      </Button>
    </form>
  )
}
