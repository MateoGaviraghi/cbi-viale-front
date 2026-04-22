# CBI Viale — Frontend · Plan de Acción y Handoff

> **Cómo usar este archivo:** este es el contexto de arranque para un chat nuevo dedicado al frontend. Pegalo o abrí el archivo y arrancá con la frase del final ("Para arrancar este chat"). Está pensado para que el agente entienda TODO sin necesidad de leer otras conversaciones.

---

## 1. Cliente y proyecto

- **Cliente:** CBI — Centro Bioquímico Integral (empresa reciente, evitar referencias tipo "desde 2009").
- **Ubicación:** Manuel Belgrano 594 (esquina Gregoria Pérez), Viale, Entre Ríos, Argentina.
- **Tagline:** "Donde la ciencia y el cuidado se encuentran."
- **Contacto:** Tel/WhatsApp 543433020527 · IG @cbi_viale · Lun-Vie 07:00–12:00 y 14:00–18:00, Sáb 08:00–12:00.
- **Coordenadas (Maps):** lat -31.8717846, lng -60.0041719.
- **6 servicios** (URL kebab-case):
  1. `clinica-humana` (30 min)
  2. `veterinaria` (30 min)
  3. `agro-alimentos` (45 min)
  4. `ambiental` (30 min)
  5. `medicina-regenerativa` (60 min, requiere consentimiento)
  6. `genetica` (30 min, requiere consentimiento)
- **Beneficios destacados:** recibe todas las obras sociales · sin adicionales · extracciones a domicilio para particulares.
- **Repo back (separado):** `~/Desktop/cbi_viale_back` — NestJS 10 + Fastify + Prisma + Neon. Expone API en `/api/v1/*` con cookies HttpOnly. Dev en `:3001`, Swagger en `/api/docs`.

---

## 2. Stack del front

### Lo que SÍ vive en el front

- **Next.js 14.2.15** App Router + **TypeScript 5.5.4** estricto (`noUncheckedIndexedAccess`, sin `any`)
- **Tailwind CSS 3.4** + tokens custom (gold, beige, ink, line, danger) en `tailwind.config.ts`
- **shadcn-like primitives** custom (sin `border-radius`)
- **Framer Motion 11** — única librería de animación
- **Radix UI** (dialog, dropdown, popover, select, tabs, toast, tooltip)
- **React Hook Form 7** + `@hookform/resolvers` + **Zod 3.23**
- **date-fns 3** + `date-fns-tz` (timezone America/Argentina/Cordoba)
- **Lucide React** — iconografía
- **sharp** — optimización de imágenes (dev)
- **Vercel** — deploy
- **tsx** — scripts locales (`logos:extract`, `logos:optimize`)

### Lo que NO vive en el front (eliminado intencionalmente)

- ❌ **Prisma / `@prisma/client`** — DB es del back.
- ❌ **NextAuth** — auth la hace el back con JWT en cookies HttpOnly.
- ❌ **Resend / `@react-email/*`** — emails los envía el back via BullMQ.
- ❌ **bcrypt** — el front nunca ve passwords más allá del form login.
- ❌ **Middleware edge de auth** — la protección de `/admin/*` se hace en `app/admin/layout.tsx` (Server Component) via fetch a `/auth/me`.

Si la tarea pide instalar algo de esto, **PARAR** y revisar — probablemente la lógica va al back.

---

## 3. Estado actual

### ✅ Hecho (sitio público funcionando estático)

- Home, Servicios (lista), 6 landings de servicio, Nosotros, Contacto, Turnos (paso 1: selección de servicio), Robots, Sitemap, Not-found.
- 16 rutas estáticas, First Load JS ~87 KB.
- Sistema de diseño completo: paleta dorado/beige/blanco, Fraunces serif + Inter sans, componentes sin radius, animaciones opacity+transform.
- Mobile responsive: imágenes por breakpoint, FAB WhatsApp, anti iOS auto-detect, grids ajustados.
- Logo CBI dorado con SVG + fallback PNG.
- SEO: metadata por página, schema.org MedicalBusiness + LocalBusiness, sitemap.xml automático.
- **Cliente API** en `src/lib/api/`:
  - `config.ts` — `getApiBaseUrl()`, `apiUrl()`, `API_BASE_PATH`
  - `client.ts` — `apiFetch<T>()` + `ApiError`
  - `types.ts` — enums + interfaces espejo del back
  - `endpoints/auth.ts` · `endpoints/services.ts` · `endpoints/availability.ts`
  - `index.ts` — barrel: `api.auth.*`, `api.services.*`, `api.availability.*`
- **Permisos** en `src/lib/permissions.ts` — `can(user, perm)` para UX (check fuerte vive en el back).
- **`next.config.mjs`** — `rewrites()` proxyea `/api/v1/:path*` → `${API_URL}/api/v1/:path*`.
- **`.env`** — solo 2 vars: `NEXT_PUBLIC_SITE_URL`, `API_URL`.

### 🔴 Pendiente

Ver sección 5 (Plan de fases). Algunas dependen del back.

---

## 4. Lo que pasó en sesión 2026-04-21 (alineación con el back)

El front venía mal armado: tenía instalados NextAuth + Prisma + Resend como si fuera un monolito. Esto se debía a que el prompt original asumía un solo repo. Cuando el back se hizo separado (NestJS), quedó la dualidad.

**Cirugía hecha en esta sesión:**

- **Eliminados** del front: `prisma/`, `src/auth.ts`, `src/auth.config.ts`, `src/middleware.ts`, `src/lib/db.ts`, `src/lib/auth-permissions.ts`, `src/lib/email/`, `src/types/next-auth.d.ts`, `src/app/api/auth/`.
- **Eliminados** del `package.json`: `next-auth`, `@auth/prisma-adapter`, `bcryptjs`, `@types/bcryptjs`, `@prisma/client`, `prisma`, `resend`, `@react-email/components`, `@react-email/render`. Scripts `db:*` y `postinstall`.
- **Eliminados** del `.env`: `AUTH_SECRET`, `DATABASE_URL`, `DIRECT_URL`, `RESEND_*`, `BUSINESS_*`, `CRON_SECRET`, `SEED_*`. Cero secretos en el front.
- **Creado:** `src/lib/api/` (cliente HTTP tipado) + `src/lib/permissions.ts` + `.env.example` + `next.config.mjs` con rewrites + memoria del proyecto actualizada (`project_api_integration.md` nuevo, `project_stack_decisions.md` y `project_deployment.md` reescritos).
- **Probado end-to-end:** ambos servers levantados (`localhost:3000` y `localhost:3001`), `curl http://localhost:3000/api/v1/services` devolvió 6 servicios desde el back via rewrite, login inválido devolvió 401 con shape correcto.

**Implicancia:** desde acá el front consume al back via `import { api } from '@/lib/api'`. Cualquier dato persistido (servicios, turnos, formularios, usuarios) viene del back. El contenido editorial (copy de landings) sigue hardcoded en `src/lib/constants.ts` y `src/lib/service-content.ts` por decisión del cliente.

---

## 5. PLAN FRONT · Fases

### F1 — Migrar home y grilla de servicios al back ⭐ *(no depende de nada nuevo)*

**Endpoints que consume:** `GET /services`, `GET /services/:slug` — ya existen.

- Crear `src/lib/data/services.ts` con `getServices()` y `getServiceBySlug(slug)` que llaman a `api.services.*` desde Server Components con `revalidate: 3600` (ISR 1h).
- Fallback: si el back está caído, usar `SERVICES` de `constants.ts`.
- Reemplazar las lecturas de `constants.ts` en:
  - `src/components/marketing/ServiceGrid.tsx`
  - `src/app/(marketing)/servicios/page.tsx`
  - `src/app/(marketing)/servicios/[slug]/page.tsx` (las 6 landings)
- **Mantener** `src/lib/service-content.ts` como fuente del copy editorial (analyses, audience, preparation, includes) — el back no lo tiene.
- El back sí tiene: `id`, `slug`, `name`, `shortDescription`, `longDescription`, `heroImage`, `iconName`, `durationMinutes`, `requiresConsent`, `active`, `order`. Usar estos para los datos dinámicos.

**Criterio terminado:** home y landings renderizan con datos del back, degradan a estático si el back está down. `npm run build` limpio.

---

### F2 — Login + admin layout (guard server-side)

**Endpoints que consume:** `/auth/login`, `/auth/me`, `/auth/logout` — ya existen.

- `src/app/login/page.tsx` — Server Component con `<LoginForm />` Client Component:
  - Form RHF + Zod (`email`, `password` min 1).
  - On submit → `api.auth.login(email, password)`.
  - On success → `router.push('/admin')`.
  - On error 401 → toast "Credenciales inválidas".
  - On error 429 → toast "Demasiados intentos, esperá 1 minuto".
- `src/app/admin/layout.tsx` (Server Component):
  ```ts
  import { cookies } from 'next/headers'
  import { redirect } from 'next/navigation'
  import { api, ApiError } from '@/lib/api'
  
  const me = await api.auth.me(cookies().toString()).catch((e) => {
    if (e instanceof ApiError && e.statusCode === 401) redirect('/login')
    throw e
  })
  ```
- `src/app/admin/page.tsx` — dashboard stub: "Bienvenido {me.name}" + sidebar.
- `src/components/admin/Sidebar.tsx` — items filtrados por `can(user, perm)` de `@/lib/permissions`.
- `src/components/admin/LogoutButton.tsx` — Client Component que llama a `api.auth.logout()` y redirige a `/login`.

**Criterio terminado:** `/login` funciona, `/admin` está protegido (redirige si no hay sesión), logout limpia y redirige.

---

### F3 — Turnero pasos 2-5 🔴 *bloqueado por B1 (AppointmentsModule del back)*

**Endpoints que consume (cuando estén):**
- `GET /appointments/availability/:serviceSlug?month=YYYY-MM` — días + slots disponibles.
- `POST /appointments` — crear turno público.

**Pasos:**
- **Paso 2:** calendario visual del mes (component `<MonthCalendar />`) con días deshabilitados los que no tienen slots. `react-big-calendar` o custom con date-fns.
- **Paso 3:** seleccionar horario del día clickeado — lista de slots como botones.
- **Paso 4:** form con datos del paciente (RHF + Zod): `nombre`, `dni` (regex `^\d{7,8}$`), `email`, `telefono`, `notas` opcional. Si `service.requiresConsent` → checkbox "Acepto el consentimiento".
- **Paso 5:** confirmación con resumen del turno + botón "Agregar a Google Calendar" (genera link `https://www.google.com/calendar/render?...`).
- `POST /appointments` al confirmar paso 5. Mostrar toast "Turno reservado, te enviamos un email".

**Mientras B1 no exista:** maquetar con fixtures en `src/lib/api/mocks/` para no bloquear diseño.

**Criterio terminado:** flujo end-to-end con turnos reales persistiendo + email de confirmación recibido.

---

### F4 — Formularios del sitio 🔴 *bloqueado por B3 (SubmissionsModule del back)*

**Endpoints que consume:**
- `POST /submissions` — público.
- `GET /submissions` — admin (`manageSubmissions`).

**Pantallas:**
- `/contacto` — form general → `POST /submissions` con `type: 'CONTACT_GENERAL'`.
- En cada landing de servicio: botón "Consultar por WhatsApp" + botón "Enviar consulta" que abre modal con form → `POST /submissions` con `type: 'SERVICE_INQUIRY'` y `serviceSlug`.
- `/admin/consultas` — lista paginada de submissions con filtros (tipo, estado, servicio, fecha, búsqueda). Detalle con cambio de estado a ANSWERED/ARCHIVED.

**Criterio terminado:** formularios públicos persisten + email recibe el negocio + admin puede gestionar.

---

### F5 — Panel admin completo 🔴 *bloqueado por B1, B3, B4*

- `/admin/turnos` — lista + calendario + acciones (confirmar, cancelar, reprogramar).
- `/admin/disponibilidad` — CRUD availability rules + blocked dates (back ya lo tiene).
- `/admin/usuarios` — CRUD empleados (requiere B4).
- `/admin/metricas` — dashboards Recharts (requiere analytics del back, Fase 3).
- `/admin/audit-logs` — lectura del audit log (requiere B5).

---

## 6. Reglas para no pisar al back

1. **Nada de DB ni Prisma en el front.** Cualquier lectura/escritura de datos persistidos = endpoint del back.
2. **Si necesitás un dato que el back no expone**, parar y coordinar — el back agrega el endpoint primero. NO improvisar Server Actions que toquen DB.
3. **Mantener `src/lib/api/types.ts` sincronizado** con cambios del back. Si el back cambia un shape, actualizar acá en el mismo ciclo.
4. **Cookies HttpOnly:** no intentes leerlas con JS. Para saber si el usuario está logueado, hacé `api.auth.me()` (devuelve 401 si no hay sesión válida).
5. **No hardcodees URLs del back.** Siempre via `api.xxx.yyy()` — el cliente maneja la base URL según contexto (browser via rewrite, server-side via `API_URL`).
6. **Los emails los manda el back.** No instales Resend en el front por más práctico que parezca.
7. **Los permisos los chequea el back.** El `can(user, perm)` del front es solo UX (mostrar/ocultar) — el back rechaza con 403 si EMPLOYEE intenta una acción no permitida, y eso debe manejarse con un toast amable.

---

## 7. Convenciones de código y diseño

### Código
- **TypeScript estricto, sin `any`.** Usar `unknown` + type guards.
- **Paths absolutos con `@/`** (ej: `@/lib/api`, `@/components/shared/Container`).
- **Server Components por default.** `'use client'` solo si usa hooks, event handlers o framer-motion.
- **Datos públicos del negocio:** hardcoded en `src/lib/constants.ts` (phone, hours, address) — evita SSR/client mismatch.
- **Comentarios:** solo cuando el WHY no es obvio. NO comentar el QUÉ (eso lo dice el código).

### Diseño (innegociable)
- `border-radius: 0` en TODO. Reset global en `src/styles/tokens.css`.
- Sin sombras bootstrap, sin gradientes de color, whitespace generoso (≥120px entre secciones).
- Animaciones solo opacity + transform, 500-700ms, easing editorial.
- Mobile-first obligatorio. WCAG AA mínimo (tap-min 44px, focus ring dorado, contraste alto).
- Tipografía body ≥17px (público va de jóvenes a 60+).
- Labels visibles en todo input (no solo placeholders).

### Git
- **Commits en español**, Conventional Commits.
- **NO push sin OK explícito del usuario.**
- **Sin co-authored-by.**

### Trabajo
- **Plan ANTES de código.** Mostrar al usuario qué se va a tocar y cómo. Esperar OK.
- **Después de cada fase:** `npm run type-check && npm run build` + screenshot/descripción de lo que cambió. Esperar OK antes de seguir.
- **Documentar siempre.** Tras cada cambio significativo:
  - Actualizar memoria en `.claude/projects/C--Users-mateo-Desktop-cbi-viale-front/memory/` (especialmente `project_api_integration.md` si cambia algo del contrato con el back).

---

## 8. Comandos útiles

```bash
# Desarrollo
npm run dev            # next dev en :3000
npm run type-check
npm run lint
npm run build
npm run start          # producción local

# Assets
npm run logos:extract
npm run logos:optimize
```

**Env vars (`.env`):** solo `NEXT_PUBLIC_SITE_URL` y `API_URL`. NO agregar más sin justificación fuerte.

**Para probar localmente con el back:** levantar el back en otra terminal con `npm --prefix ~/Desktop/cbi_viale_back run start:dev` (corre en `:3001`).

---

## 9. Mapeo contra reuniones del presupuesto

| Reunión | Estado del front |
|---|---|
| **Día 15** | F1 completo, F2 en curso |
| **Día 30** | F1, F2, F3 completos — sitio público + login + turnero funcionando |
| **Día 45** | F4 completo, F5 en curso |
| **Día 60** | F5 completo, producción en `cbiviale.com.ar` |

---

## 10. Para arrancar este chat

> Leé `PLAN.md` completo (este archivo). Después leé la memoria del proyecto en `~/.claude/projects/C--Users-mateo-Desktop-cbi-viale-front/memory/` (`MEMORY.md` y archivos referenciados, especialmente `project_api_integration.md` para entender el contrato con el back). Después confirmame que entendiste el estado y propone arrancar por **F1 (migrar home y servicios al back)**: mostrame qué archivos vas a tocar, qué Server Components nuevos, cómo manejás el fallback si el back está down, y esperá mi OK antes de escribir código. Recordá: commits en español, NO push sin OK, plan antes de código, border-radius 0 en todo, mobile-first, NUNCA agregar Prisma/NextAuth/Resend al front.
