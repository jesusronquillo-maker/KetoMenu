# Checkpoint — VibeFast boilerplate, Fase 0 completa

**Última actualización**: sesión interrumpida por disco lleno en `/private/tmp/claude-501` (no había espacio para correr `yarn install`).

## Estado actual

**Fase 0 (Andamiaje) está 100% completa en código** — solo falta verificar que `yarn dev` levanta sin errores. Esto no se pudo automatizar porque el tmp de Claude estaba lleno.

### Tareas completadas

- [x] #1 Bootstrap monorepo (yarn workspaces, root package.json, .gitignore, .editorconfig, README)
- [x] #2 Scaffold Next.js 15 en `/web` (App Router + JavaScript + Tailwind 4 + DaisyUI 5)
- [x] #3 `web/config.js` central (branding, features, copy de landing)
- [x] #4 Landing modular (Hero, Features, FAQ, Waitlist, Navbar, Footer) — todo lee de config.js
- [x] #5 Ruta `/docs` MDX con sidebar auto-generada del filesystem + componentes especiales (PromptBox, Callout, Checkpoint, StackBadge, VideoLoom)
- [x] #6 Esqueleto `docs-content/` con 31 archivos MDX (3 intro, 3 setup, 11 tutoriales semanales, 10 features, 2 componentes, 4 recetas, 3 deploy, 1 troubleshooting)
- [x] #7 Verificación — **pendiente manual por ti** (ver abajo)

### Archivos críticos creados

- `package.json` (root, workspaces)
- `web/config.js` ← el más importante
- `web/app/layout.js`, `web/app/(marketing)/layout.js`, `web/app/(marketing)/page.js`
- `web/app/(marketing)/docs/layout.js`, `docs/page.js`, `docs/[[...slug]]/page.js`
- `web/lib/docs.js` (walk del filesystem para sidebar)
- `web/components/landing/*` (4 archivos)
- `web/components/docs/*` (9 archivos)
- `docs-content/**/*.mdx` (31 archivos)

## Cómo retomar

### 1. Libera espacio

```bash
# El cuello de botella era /private/tmp/claude-501
sudo rm -rf /private/tmp/claude-501

# (Opcional) más limpieza
brew cleanup -s
yarn cache clean
```

Reinicia la Mac.

### 2. Verifica que Fase 0 corre

```bash
cd ~/VibeFast
yarn install         # ~1-2 min la primera vez
yarn dev
```

Abre:
- `http://localhost:3000` → landing con título "VibeFast"
- `http://localhost:3000/docs` → índice de docs con sidebar de 8 secciones
- `http://localhost:3000/docs/tutoriales/semana-1-landing` → tutorial con PromptBox

Edita `web/config.js`:
- Cambia `app.name` → recarga, debe reflejarse en navbar y footer
- Cambia `brand.primary` (un hex distinto) → recarga, el color de botones cambia

Si algo falla → revisa `docs-content/troubleshooting/errores-comunes.mdx` o avísame.

### 3. Retoma con Claude Code

Desde la terminal, en `~/VibeFast`:

```bash
claude --continue
```

O alternativamente:

```bash
cd ~/VibeFast
claude
# y dentro: /resume
```

Cuando arranque la nueva sesión, dime: **"retoma desde el checkpoint, continúa con Fase 1"** y yo arrancaré con:

- **Fase 1** (1 semana de trabajo equivalente):
  - Migrations Supabase 001-003 + 007 (RLS)
  - Cliente Supabase (browser + server)
  - Google Auth end-to-end (`/login`, callback, logout, middleware con refresh de sesión)
  - Layout `(app)` con guard + UserMenu
  - `/dashboard` con CRUD genérico de `core_items`
  - Conectar el form de waitlist al stub `/api/waitlist` con Supabase real

El plan completo de todas las fases (1-7) está en:
`/Users/ampersand/.claude/plans/users-ampersand-downloads-temario-v2-cu-rippling-owl.md`

## Notas importantes para retomar

- **No corras `npm install`** — todo es yarn 1.x con workspaces. Si te equivocas, borra `node_modules/` y `package-lock.json` y haz `yarn install`.
- **El monorepo tiene Root Directory en `web`** — cuando deployes a Vercel, esa config es crítica (ver `docs-content/deploy/vercel.mdx`).
- **`docs-content/` vive en la raíz del monorepo, no dentro de `/web`** — `web/lib/docs.js` lo resuelve con `path.join(process.cwd(), '..', 'docs-content')`. Si en algún momento mueves `/web` a otra profundidad, ajusta esa ruta.
- **`config.js` se evalúa en build** — cambios requieren re-deploy en producción (no es hot reload).

## Decisiones tomadas (para que no se pierda contexto)

- Alcance: **todo incluido día 1** (Auth, OpenAI, tool use, LangGraph, MCP, RAG, Resend, PostHog)
- Docs: **dentro del boilerplate** en `/docs` (MDX)
- Idioma: **español** (curso es para founders mexicanos)
- Estructura: **monorepo** con `/web` y `/firmware` (yarn workspaces)
- Stack: Next.js 15 + Tailwind 4 + DaisyUI 5 + Supabase + Google Auth + OpenAI + LangGraph.js + MCP + Resend + PostHog (opt) + yarn 1.x + JavaScript (no TS)
