'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Crea un consentimiento de prueba usando el endpoint de urocultivo,
// que es el formulario público con menos campos requeridos y acepta consentGiven.
// Solo expone los campos identificatorios; el resto se auto-completa con valores neutros.
export function NuevoConsentimientoModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    age: '',
    notes: '',
  })

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleClose(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen && success) {
      setSuccess(false)
      setError(null)
      setForm({ name: '', dni: '', email: '', phone: '', age: '', notes: '' })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await api.publicSubmissions.createUroculture({
        name: form.name,
        dni: form.dni,
        email: form.email || undefined,
        phone: form.phone || undefined,
        age: parseInt(form.age, 10) || 30,
        collectionTime: '08:00',
        collectionDate: format(new Date(), 'yyyy-MM-dd'),
        symptoms: form.notes || 'Consentimiento creado manualmente desde el panel de administración.',
        previousAntibiotics: 'Ninguno',
        baselinePathology: 'Ninguna',
        consentGiven: true,
      })
      setSuccess(true)
      router.refresh()
    } catch (err) {
      if (err instanceof ApiError) {
        // El back devuelve mensajes de validación como array
        const msg = Array.isArray(err.message) ? err.message.join(' · ') : err.message
        setError(msg)
      } else {
        setError('No se pudo crear el consentimiento. Verificá que el servidor esté activo.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Plus width={14} height={14} strokeWidth={1.5} aria-hidden />
        Nuevo consentimiento
      </Button>

      <AdminDialog
        open={open}
        onOpenChange={handleClose}
        title="Nuevo consentimiento"
        description="Registrá un consentimiento informado de forma manual para generar el PDF."
      >
        {success ? (
          <div className="space-y-6">
            <div className="border border-gold-700/30 bg-gold-700/5 px-4 py-4">
              <p className="font-sans text-sm text-gold-800 leading-relaxed">
                Consentimiento creado correctamente. Ya aparece en la lista — descargá el PDF desde
                ahí.
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="primary" size="sm" onClick={() => handleClose(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="nc-name" required>
                  Nombre completo del paciente
                </Label>
                <Input
                  id="nc-name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                  autoFocus
                  placeholder="Apellido, Nombre"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="nc-dni" required>
                  DNI
                </Label>
                <Input
                  id="nc-dni"
                  value={form.dni}
                  onChange={(e) => set('dni', e.target.value)}
                  required
                  placeholder="12345678"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="nc-age" required>
                  Edad
                </Label>
                <Input
                  id="nc-age"
                  type="number"
                  min={1}
                  max={120}
                  value={form.age}
                  onChange={(e) => set('age', e.target.value)}
                  required
                  placeholder="35"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="nc-email">Email</Label>
                <Input
                  id="nc-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="paciente@email.com"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="nc-phone">Teléfono</Label>
                <Input
                  id="nc-phone"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="3435 000000"
                  className="mt-1.5"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="nc-notes">Notas / motivo</Label>
                <Textarea
                  id="nc-notes"
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={2}
                  placeholder="Motivo de consulta, observaciones…"
                  className="mt-1.5"
                />
              </div>
            </div>

            {error && (
              <div className="border border-danger/40 bg-danger/5 px-4 py-3">
                <p className="font-sans text-xs text-danger leading-relaxed">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleClose(false)}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={saving}>
                {saving ? 'Creando…' : 'Crear consentimiento'}
              </Button>
            </div>
          </form>
        )}
      </AdminDialog>
    </>
  )
}
