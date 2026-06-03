'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, KeyRound, ShieldCheck } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { AdminUser, Permission, Role } from '@/lib/api/types'

// manageUsers se excluye: es exclusivo de ADMIN, no se asigna a un EMPLOYEE.
const ASSIGNABLE_PERMISSIONS: { key: Permission; label: string }[] = [
  { key: 'manageAppointments', label: 'Gestionar turnos' },
  { key: 'manageAvailability', label: 'Gestionar disponibilidad' },
  { key: 'manageSubmissions', label: 'Gestionar consultas' },
  { key: 'viewAuditLog', label: 'Ver auditoría' },
  { key: 'exportData', label: 'Exportar datos' },
  { key: 'viewAnalytics', label: 'Ver métricas' },
]

const inputCls =
  'mt-1.5 w-full h-12 border border-line bg-white px-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1'

interface Props {
  initialUsers: AdminUser[]
  currentUserId: string
}

export function UsersManager({ initialUsers, currentUserId }: Props) {
  // undefined = cerrado · null = crear · objeto = editar
  const [dialog, setDialog] = useState<AdminUser | null | undefined>(undefined)

  const users = [...initialUsers].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-3 mb-5">
        <h2 className="font-serif text-2xl text-ink">Equipo</h2>
        <Button type="button" variant="primary" size="sm" onClick={() => setDialog(null)}>
          <Plus width={14} height={14} strokeWidth={2} aria-hidden />
          Agregar usuario
        </Button>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-ink-muted py-6">No hay usuarios cargados.</p>
      ) : (
        <div className="border border-line divide-y divide-line">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-serif text-base text-ink leading-tight">
                  {u.name}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-gold-700">
                      vos
                    </span>
                  )}
                </p>
                <p className="font-sans text-xs text-ink-muted truncate">{u.email}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`border px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest ${
                    u.role === 'ADMIN'
                      ? 'bg-gold-100/50 text-gold-800 border-gold-700/30'
                      : 'bg-beige text-ink-muted border-line'
                  }`}
                >
                  {u.role === 'ADMIN' ? 'Admin' : 'Empleado'}
                </span>
                {!u.active && (
                  <span className="border border-danger/30 bg-danger/5 px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-danger">
                    Inactivo
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setDialog(u)}
                  className="tap-min inline-flex h-8 w-8 items-center justify-center border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                  aria-label={`Editar a ${u.name}`}
                >
                  <Pencil width={13} height={13} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {dialog !== undefined && (
        <UserDialog
          user={dialog}
          isSelf={dialog?.id === currentUserId}
          onClose={() => setDialog(undefined)}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/*  Dialog de alta / edición de usuario                                      */
/* ------------------------------------------------------------------------- */

function UserDialog({
  user,
  isSelf,
  onClose,
}: {
  user: AdminUser | null
  isSelf: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>(user?.role ?? 'EMPLOYEE')
  const [active, setActive] = useState(user?.active ?? true)
  const [perms, setPerms] = useState<Partial<Record<Permission, boolean>>>(
    user?.permissions ?? {},
  )
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function handleSave() {
    if (name.trim().length < 2) return setError('El nombre es muy corto.')
    if (!email.includes('@')) return setError('Email inválido.')
    if (!user && password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.')

    setSaving(true)
    setError(null)
    try {
      if (user) {
        await api.users.update(user.id, { name, email, role, active })
        if (role === 'EMPLOYEE') await api.users.updatePermissions(user.id, perms)
      } else {
        await api.users.create({
          name,
          email,
          password,
          role,
          permissions: role === 'EMPLOYEE' ? perms : undefined,
        })
      }
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos guardar. Revisá los datos.')
      setSaving(false)
    }
  }

  async function handleResetPassword() {
    if (!user) return
    if (newPassword.length < 8) return setError('La nueva contraseña debe tener al menos 8 caracteres.')
    setSaving(true)
    setError(null)
    setNotice(null)
    try {
      await api.users.updatePassword(user.id, newPassword)
      setNewPassword('')
      setNotice('Contraseña actualizada.')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos cambiar la contraseña.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!user) return
    setSaving(true)
    setError(null)
    try {
      await api.users.softDelete(user.id)
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos desactivar el usuario.')
      setSaving(false)
    }
  }

  return (
    <AdminDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={user ? 'Editar usuario' : 'Nuevo usuario'}
      description={user ? user.email : 'Datos de acceso y permisos del nuevo integrante.'}
    >
      <div className="space-y-5">
        <div>
          <Label htmlFor="u-name">Nombre</Label>
          <input id="u-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <Label htmlFor="u-email">Email</Label>
          <input id="u-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>

        {!user && (
          <div>
            <Label htmlFor="u-pass">Contraseña inicial</Label>
            <input
              id="u-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className={inputCls}
            />
          </div>
        )}

        <div>
          <Label htmlFor="u-role">Rol</Label>
          <select id="u-role" value={role} onChange={(e) => setRole(e.target.value as Role)} className={inputCls}>
            <option value="EMPLOYEE">Empleado</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        {role === 'EMPLOYEE' && (
          <div className="border border-line bg-beige/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck width={14} height={14} strokeWidth={1.5} className="text-gold-700" aria-hidden />
              <span className="font-sans text-[11px] uppercase tracking-widest text-ink-muted">
                Permisos
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ASSIGNABLE_PERMISSIONS.map((p) => (
                <label key={p.key} className="flex items-center gap-2.5 cursor-pointer text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={perms[p.key] === true}
                    onChange={(e) => setPerms((prev) => ({ ...prev, [p.key]: e.target.checked }))}
                    className="h-4 w-4 shrink-0 accent-gold-700 border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {user && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              disabled={isSelf}
              onChange={(e) => setActive(e.target.checked)}
              className="h-5 w-5 shrink-0 accent-gold-700 border border-line disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            />
            <span className="text-sm text-ink">
              Activo (puede iniciar sesión){isSelf && ' — no podés desactivarte a vos mismo'}
            </span>
          </label>
        )}

        {/* Reset de contraseña (solo en edición) */}
        {user && (
          <div className="border-t border-line pt-4">
            <Label htmlFor="u-newpass">
              <span className="inline-flex items-center gap-1.5">
                <KeyRound width={12} height={12} strokeWidth={1.5} aria-hidden />
                Resetear contraseña
              </span>
            </Label>
            <div className="mt-1.5 flex gap-2">
              <input
                id="u-newpass"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña (mín. 8)"
                className="h-12 flex-1 border border-line bg-white px-3 font-sans text-sm text-ink placeholder:text-ink-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResetPassword}
                disabled={saving || newPassword.length < 8}
              >
                Cambiar
              </Button>
            </div>
          </div>
        )}

        {notice && <p className="text-xs text-gold-800">{notice}</p>}
        {error && (
          <p role="alert" className="border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-xs">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          {user && !isSelf ? (
            confirmDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-danger hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Confirmar baja
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink-muted hover:text-danger transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Desactivar
              </button>
            )
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>
    </AdminDialog>
  )
}
