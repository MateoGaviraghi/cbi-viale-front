'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  trigger?: React.ReactNode
}

// Modal editorial reutilizable para el panel de administración.
export function AdminDialog({ open, onOpenChange, title, description, children, trigger }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] animate-in fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white border border-line shadow-2xl focus:outline-none animate-in fade-in-0 zoom-in-95"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-start justify-between border-b border-line px-7 py-6">
            <div>
              <Dialog.Title className="font-serif text-xl tracking-tight text-ink">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-1 font-sans text-xs text-ink-muted leading-relaxed">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close className="ml-4 shrink-0 text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1">
              <X width={18} height={18} strokeWidth={1.5} aria-hidden />
              <span className="sr-only">Cerrar</span>
            </Dialog.Close>
          </div>
          <div className="px-7 py-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
