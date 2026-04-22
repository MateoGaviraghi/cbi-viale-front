# CBI Viale — Tareas pendientes V1 (front + back)

> **Propósito:** backlog compartido para dividir trabajo entre vos y tu socio. Cada tarea tiene tiempo estimado, dependencias, archivos involucrados y criterio de "hecho". Actualizar a medida que se completan.

---

## Estado al corte (2026-04-22 post-push)

### ✅ Front (en `main`)
- Sitio público completo (home, 6 landings, nosotros, contacto, turnos paso 1)
- Cliente API tipado (`src/lib/api/`) con envelope `{data, meta}` + `ApiError`
- Login funcional + panel admin con guard server-side (Server Component → `/auth/me`)
- Dashboard stub + sidebar filtrado por permisos + logout
- `PLAN.md` con handoff

### ✅ Back (en `main`)
- Skeleton + Auth + Services + AvailabilityModule (CRUD admin + lectura pública)

### ⏳ Back local pendiente push
- **AppointmentsModule** (7 endpoints, algoritmo slots ARG-tz, concurrency Serializable) — 16/16 tests OK
- **EmailsModule stub** (log + EmailLog SENT, contrato estable para reemplazar con Resend real)

---

## Tareas pendientes — BACK

### B-PUSH · Push sesión 2 · 10 min · sin dependencias
Commit + push de AppointmentsModule + EmailsModule stub que ya están en local del repo `cbi_viale_back`.
- Criterio: `origin/main` tiene el commit, Railway deployó OK.

### B-1 · EmailsModule real · 3-4 hs · depende de B-PUSH
Reemplaza el stub por implementación completa sin tocar callsites.
- BullMQ queue `emails` + worker
- 5 templates con React Email: `AppointmentConfirmation`, `AppointmentCancelled`, `AppointmentReprogrammed`, `FormSubmissionReceipt`, `InternalNotification`
- Worker: render → `resend.emails.send()` → actualizar `EmailLog` (SENT o FAILED)
- Fallback: si `RESEND_API_KEY` vacío → log a consola + marcar SENT (modo dev)
- Env: `REDIS_URL` (addon Railway)
- Criterio: turno real → email llega a inbox de prueba + `EmailLog.status = SENT`.

### B-2 · SubmissionsModule · 2-3 hs · depende de B-1
Formularios públicos del sitio (contacto + consulta por servicio).
- `POST /api/v1/submissions` público (throttle 10/min strict), body: `type`, `name`, `email`, `phone?`, `subject?`, `message`, `serviceId?`, `extraData?`
- `GET /api/v1/submissions` admin (`manageSubmissions`) con filtros `type/status/serviceSlug/dateFrom/dateTo/q` + paginación
- `GET /api/v1/submissions/:id` admin
- `PATCH /api/v1/submissions/:id` admin — cambiar `status` a ANSWERED/ARCHIVED + `answeredBy` + `answeredAt`
- Dispara 2 emails por submission: receipt al remitente + notificación interna a `BUSINESS_NOTIFICATION_EMAIL`
- Audit log en mutaciones admin
- Criterio: submission pública persiste + admin gestiona + ambos emails llegan.

### B-3 · UsersModule endpoints admin · 2 hs · sin dependencias (paralelo a B-2)
Gestión de empleados desde el panel admin.
- `GET /api/v1/users` (ADMIN only) con paginación
- `GET /users/:id` (ADMIN, o EMPLOYEE leyendo su propio perfil)
- `POST /users` (ADMIN) — crea EMPLOYEE con `defaultEmployeePermissions()`, bcrypt 10 rounds
- `PATCH /users/:id` (ADMIN) — `name`, `permissions`, `active`
- `DELETE /users/:id` (ADMIN) — soft delete (`active: false`)
- `passwordHash` NUNCA en responses (`select` explícito o interceptor)
- Cleanup: eliminar modelos `Account`, `Session`, `VerificationToken` del schema + migration
- Criterio: admin crea EMPLOYEE, ese EMPLOYEE loguea y entra con sus permisos.

---

## Tareas pendientes — FRONT

### F-1 · Cliente API appointments + submissions + users + availability admin · 45 min · sin dependencias
Extender `src/lib/api/endpoints/` con los módulos faltantes.
- `endpoints/appointments.ts` — `getAvailability(slug, month)`, `create(dto)`, `list(filters)`, `get(id)`, `patch(id, dto)`, `cancel(id, dto)`, `reprogram(id, dto)`
- `endpoints/submissions.ts` — `create(dto)`, `list(filters)`, `get(id)`, `patch(id, dto)`
- `endpoints/users.ts` — `list()`, `get(id)`, `create(dto)`, `patch(id, dto)`, `remove(id)`
- `endpoints/availability.ts` — sumar CRUD admin (list/create/patch/delete rules y blocked-dates)
- Tipos nuevos en `types.ts`: `MonthlyAvailability`, `Appointment`, `CreateAppointmentDto`, `Submission`, `CreateSubmissionDto`, etc.
- Registrar en `api.appointments`, `api.submissions`, `api.users`
- Criterio: `npm run type-check && npm run build` limpios.

### F-2 · Stubs "Próximamente" en 6 sub-rutas admin · 15 min · sin dependencias
Evitar 404s cuando se navega desde el sidebar.
- `src/app/admin/turnos/page.tsx`, `consultas/page.tsx`, `disponibilidad/page.tsx`, `usuarios/page.tsx`, `auditoria/page.tsx`, `metricas/page.tsx`
- Cada uno renderiza un placeholder con GoldRule + título + "En construcción · Fase X"
- Criterio: sin 404s, navegación visual del admin completa.

### F-3 · Turnero pasos 2-5 · 2-3 hs · depende de B-PUSH + F-1
Flujo público end-to-end de reserva de turno.
- Paso 2: calendario del mes (`<MonthCalendar />`) con days deshabilitados si no tienen slots. Usa `api.appointments.getAvailability(slug, 'YYYY-MM')`
- Paso 3: botones de slots del día elegido
- Paso 4: form RHF + Zod (`nombre`, `dni` regex `^\d{7,8}$`, `email`, `teléfono`, `notas?`). Si `service.requiresConsent` → checkbox obligatorio
- Paso 5: confirmación con resumen + botón "Agregar a Google Calendar"
- `POST /appointments` al confirmar. Toast de éxito o error (409 slot tomado, 400 validaciones)
- Criterio: paciente reserva turno real, ve confirmación, back tiene el registro.

### F-4 · `/admin/turnos` lista + acciones · 2 hs · depende de F-1
Gestión admin de turnos.
- Lista paginada con filtros (`status`, `serviceSlug`, `dateFrom`, `dateTo`, `q`)
- Detalle de turno
- Acciones: confirmar (PATCH status=CONFIRMED), cancelar (POST cancel), reprogramar (POST reprogram con nuevo slot)
- Reemplaza stub de F-2 en `/admin/turnos`
- Criterio: admin gestiona turnos reales.

### F-5 · `/admin/disponibilidad` CRUD · 2 hs · depende de F-1
Edición de horarios y bloqueos.
- Tabla de reglas por weekday con toggle activo + botones editar/eliminar
- Form de crear regla (weekday, startTime, endTime, serviceId?)
- Tabla de blocked dates con crear/editar/eliminar
- Validaciones matcheando back (HH:MM, end > start, endDate >= startDate)
- Reemplaza stub de F-2
- Criterio: admin edita horarios y se refleja en el turnero público.

### F-6 · Formularios públicos · 1-2 hs · depende de B-2 + F-1
Contacto + consulta por servicio.
- `/contacto`: form público → `api.submissions.create({ type: 'CONTACT_GENERAL', ... })`
- Modal "Enviar consulta" en cada landing → `api.submissions.create({ type: 'SERVICE_INQUIRY', serviceId, ... })`
- Botón "Consultar por WhatsApp" en cada landing (link directo, no requiere back)
- Criterio: envío funciona, admin recibe email interno, remitente recibe receipt.

### F-7 · `/admin/consultas` · 1-2 hs · depende de B-2 + F-1
Bandeja de submissions.
- Lista con filtros (`type`, `status`, `serviceSlug`, `dateFrom`, `dateTo`, `q`)
- Detalle con cambio de estado (PENDING → ANSWERED → ARCHIVED)
- Reemplaza stub de F-2
- Criterio: admin gestiona consultas.

### F-8 · `/admin/usuarios` · 1-2 hs · depende de B-3 + F-1
CRUD de empleados.
- Lista de users con role + active + permissions
- Form crear EMPLOYEE (nombre, email, password inicial)
- Editar permisos individuales (checkboxes por permiso)
- Desactivar (soft delete)
- Solo visible si `user.role === 'ADMIN'`
- Reemplaza stub de F-2
- Criterio: admin crea EMPLOYEE, ese EMPLOYEE loguea y entra con sus permisos.

---

## Grafo de dependencias

```
B-PUSH ──┬─► F-3 (turnero) ──► listo
         └─► (desbloquea back, nada más)

B-1 ──► B-2 ──┬─► F-6 (formularios públicos) ──► listo
              └─► F-7 (/admin/consultas) ──► listo

B-3 ──► F-8 (/admin/usuarios) ──► listo

F-1 (cliente API) ──► F-4, F-5, F-7, F-8 (todas las páginas admin)

F-2 (stubs) ──► independiente, puede ir ya

Tiempo total estimado: ~12-18 hs distribuidas
```

---

## Cómo dividir con el socio

### Opción A — vertical (uno back, otro front)
- **Back:** B-PUSH + B-1 + B-2 + B-3 (~8 hs)
- **Front:** F-1 + F-2 + F-3 + F-4 + F-5 + F-6 + F-7 + F-8 (~12 hs)

### Opción B — horizontal por feature
- **Persona 1 (turnos + disponibilidad):** B-PUSH, F-1, F-2, F-3, F-4, F-5
- **Persona 2 (consultas + usuarios + emails):** B-1, B-2, B-3, F-6, F-7, F-8

### Opción C — visible vs infra
- **Visible (UI pública):** F-2, F-3, F-6, F-4, F-5, F-7, F-8
- **Infra (back + cliente API):** B-1, B-2, B-3, F-1

---

## Reglas de coordinación

- **Contrato:** `src/lib/api/types.ts` (front) ↔ `prisma/schema.prisma` + DTOs (back). Si el back cambia un shape → front actualiza `types.ts` en el mismo ciclo.
- **Commits en español**, Conventional Commits, sin `Co-Authored-By`.
- **NO push sin OK explícito.** Excepto cuando el owner dice "dale push" en el chat.
- **Envelope uniforme:** success = `{data, meta?}`, error = `{statusCode, message, error, path, timestamp}`.
- **Audit log:** toda mutación admin sensible se loguea (hoy inline, Fase 2 se migra a AuditLogModule helper).

---

## Comandos rápidos

```bash
# Front
cd ~/Desktop/cbi-viale-front
npm run dev          # localhost:3000
npm run type-check
npm run build

# Back
cd ~/Desktop/cbi_viale_back
npm run start:dev    # localhost:3001
npm run type-check
npm run build

# Credenciales dev admin del seed del back
# email: admin@cbiviale.com.ar
# password: cbi-admin-2026
```
