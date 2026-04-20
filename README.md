# CBI Viale — Sitio Web

Sitio web oficial y panel de gestión del **Centro Bioquímico Integral** de Viale, Entre Ríos.

Desarrollado por [Nodo](https://nodotech.dev).

---

## Stack

- **Next.js 14** · App Router · TypeScript estricto
- **Tailwind CSS** + primitives Radix-based custom (radius 0)
- **Framer Motion** · animaciones sobrias editoriales
- **Prisma** + **Neon PostgreSQL**
- **NextAuth v5** · autenticación con roles
- **Resend** + React Email · emails transaccionales
- **Recharts** · dashboard admin
- **Vercel** · hosting y cron

## Setup local

```bash
# 1. Dependencias
npm install

# 2. Variables de entorno
cp .env.example .env.local
# editar .env.local con valores reales

# 3. Extraer logos desde los SVG originales (PNGs embebidos)
npm run logos:extract

# 4. Prisma: generar cliente + push del schema a Neon
npm run db:generate
npm run db:push

# 5. Seed (servicios + admin inicial)
npm run db:seed

# 6. Dev server
npm run dev
```

Abrir http://localhost:3000

## Scripts

| Comando                  | Acción                                           |
|--------------------------|--------------------------------------------------|
| `npm run dev`            | Servidor de desarrollo                           |
| `npm run build`          | Build de producción                              |
| `npm run start`          | Correr build de producción                       |
| `npm run lint`           | ESLint                                           |
| `npm run format`         | Prettier write                                   |
| `npm run type-check`     | `tsc --noEmit`                                   |
| `npm run db:generate`    | Generar cliente Prisma                           |
| `npm run db:push`        | Push del schema sin migración (dev)              |
| `npm run db:migrate`     | Crear migración nueva                            |
| `npm run db:seed`        | Seed servicios + admin                           |
| `npm run db:studio`      | Prisma Studio (GUI de la DB)                     |
| `npm run logos:extract`  | Extrae PNG de los SVG del cliente a `public/`    |

## Estructura

Ver `CONTENT.md` para el estado de contenidos pendientes del cliente.

```
src/
├── app/                # App Router
├── components/         # UI + marketing + booking + admin
├── lib/                # db, auth, email, seo, utils
├── server/actions/     # Server Actions
├── styles/             # tokens.css
└── types/
prisma/                 # schema + seed + migraciones
public/                 # estáticos y logos
scripts/                # utilidades (extracción de logos, etc.)
```

## Reglas de diseño innegociables

- `border-radius: 0` en todo (botones, cards, inputs, imágenes).
- Sin sombras flotantes, sin gradientes, colores planos.
- Tipografía mínima 17px en body (público 60+).
- Mobile-first · WCAG AA · Core Web Vitals en verde.
- Animaciones: solo opacity + transform, 500ms ease-editorial.

## Derechos

© 2026 CBI Viale · Código propiedad de nodotech.dev hasta pago final; luego derechos de uso completo al cliente.
