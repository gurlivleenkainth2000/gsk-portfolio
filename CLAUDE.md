# CLAUDE.md — AI Assistant Guide for gsk-portfolio

This file provides context for AI assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

**gsk-portfolio** is the personal portfolio website of Gurlivleen Singh Kainth, a software engineer based in Melbourne, Australia. It is a Next.js 16 App Router project using HeroUI, Tailwind CSS, and Framer Motion, deployed on Firebase App Hosting.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Runtime | Node 22 LTS (newer odd releases break the Firebase CLI) |
| UI Components | HeroUI v2 (30+ packages) |
| Styling | Tailwind CSS 4, Tailwind Variants, Emotion |
| Animations | Framer Motion |
| Theming | next-themes (light / dark via CSS class) |
| Icons | Custom SVGs in `components/icons/` + MUI Icons (re-exported via `icons/material.ts`) |
| Fonts | Inter (sans) + Fira Code (mono) via Google Fonts |
| Forms / Email | react-hook-form + Resend (contact form) |
| Linting | ESLint 9 flat config + Prettier |
| Hosting | Firebase App Hosting (`apphosting.yaml`) |
| Package Manager | npm (package-lock.json present) |

---

## Repository Structure

```
gsk-portfolio/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout — Navbar, Fonts, Providers, JSON-LD
│   ├── page.tsx            # Home page (hero section)
│   ├── providers.tsx       # HeroUIProvider + NextThemesProvider
│   ├── error.tsx           # Error boundary
│   ├── (about)/            # Route group (no URL segment): resume, skills, achievements
│   │   ├── resume/         # /resume   (page.tsx client + layout.tsx metadata)
│   │   ├── skills/         # /skills
│   │   └── achievements/   # /achievements
│   ├── about/              # About page (narrative + timeline + explore cards)
│   ├── contact/            # /contact — form page (client) + layout.tsx metadata
│   ├── api/contact/        # route.ts — POST handler, sends via Resend
│   ├── blog/               # Blog page (stub)
│   ├── projects/           # Projects index + [slug] detail pages
│   ├── sitemap.ts          # Next.js sitemap route
│   └── robots.ts           # Next.js robots route
├── components/             # Shared React components
│   ├── navbar.tsx          # Sticky responsive navigation bar
│   ├── footer.tsx          # Footer (currently commented out in layout)
│   ├── theme-switch.tsx    # Light/dark mode toggle (client component)
│   ├── motion.ts           # Shared Framer Motion variants (stagger / fade)
│   ├── primitives.ts       # Tailwind Variants style primitives
│   ├── page-background.tsx # Decorative background
│   ├── icons/              # Icon module: logo / brand / ui (custom SVGs) + material (MUI re-exports) + index barrel
│   ├── json-ld.tsx         # <script type="application/ld+json"> emitter (server component)
│   ├── explore-card/  projects/  timeline/  # feature component groups
│   └── linkedin-badge.tsx  # Dynamic-import LinkedIn badge (SSR disabled)
├── config/                 # App configuration — tunable settings only
│   ├── site.ts             # Single source of truth: name, links, nav items
│   └── fonts.ts            # Google Font definitions + CSS variables
├── data/                   # Domain content records (arrays of entries)
│   ├── experience.ts  education.ts  projects.ts  skills.ts
├── metadata/               # Per-route SEO — keywords + Next.js Metadata, one file per route
│   ├── shared.ts           # baseUrl, ogImage(), baseKeywords, dedupe()
│   ├── root.ts             # homeKeywords + rootMetadata (site-wide defaults)
│   ├── about.ts  contact.ts  blog.ts  projects.ts  resume.ts  skills.ts  achievements.ts
│   ├── structured-data.ts  # JSON-LD builders: personSchema, breadcrumbSchema(), projectSchema()
│   └── index.ts            # Barrel — import from "@/metadata"
├── types/                  # TypeScript interfaces — one file per domain
│   ├── index.ts            # Shared utility types (e.g. IconSvgProps)
│   └── experience.ts  education.ts  project.ts  skills.ts  explore-card.ts  contact.ts
├── styles/globals.css      # Tailwind CSS entry point (@import "tailwindcss")
├── public/                 # Static assets, robots.txt, sitemap.xml
├── apphosting.yaml         # Firebase App Hosting config (runConfig + env)
├── firebase.json           # App Hosting backend definition
├── .firebaserc             # Default Firebase project alias
├── .env.example            # Contact form env var template
├── next.config.js  tailwind.config.js  tsconfig.json  eslint.config.mjs  postcss.config.js
```

---

## Documentation

Long-form guides live in [`docs/`](./docs) (single source of truth — this file
links to them rather than duplicating):

- [docs/architecture.md](./docs/architecture.md) — rendering model, directory
  responsibilities, config/data/metadata separation, icons module, theming.
- [docs/routing.md](./docs/routing.md) — route tree, route groups, client-page
  metadata pattern, dynamic `[slug]` routes, navigation source.
- [docs/seo.md](./docs/seo.md) — metadata + inheritance gotcha, keywords, JSON-LD,
  sitemap / robots, Search Console.
- [docs/contact.md](./docs/contact.md) — contact-form / email setup (Resend + Cloudflare).
- [docs/deployment.md](./docs/deployment.md) — setup, fork checklist, Firebase App Hosting config.

Dated design records are in [`docs/specs/`](./docs/specs).

---

## Development Workflows

### Environment setup
```bash
cp .env.example .env.local   # fill RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL
```
`.env*.local` is gitignored. See `docs/contact.md` for full contact-form setup.

### Start dev server
```bash
npm run dev       # Next.js + Turbopack (fast HMR)
```

### Production build
```bash
npm run build
npm run start
```

### Linting (with auto-fix)
```bash
npm run lint      # runs: eslint --fix
```

> There are no test scripts currently configured in `package.json`.

### Deployment (Firebase App Hosting)
- Config lives in `apphosting.yaml` (`runConfig` + `env`) and `firebase.json`.
- `RESEND_API_KEY` is a Cloud Secret Manager secret named `gsk-portfolio-resend-api-key`:
  ```bash
  firebase apphosting:secrets:set gsk-portfolio-resend-api-key
  ```
- `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` are committed as plain `value:` entries.
- Use **Node 22 LTS** for the Firebase CLI; Node 24+ removed `SlowBuffer` and crashes the CLI.

---

## Key Conventions

### Component rules
- All components are **functional** — no class components.
- Interactive components must have `"use client"` at the top.
- Server components (layouts, static pages) omit the directive.
- Heavy client-only widgets (e.g. LinkedIn badge) use `next/dynamic` with `{ ssr: false }`.

### Naming conventions
| Artifact | Convention | Example |
|----------|-----------|---------|
| Component files | kebab-case | `theme-switch.tsx` |
| Component exports | PascalCase | `ThemeSwitch` |
| Config/util files | camelCase | `siteConfig` |
| TypeScript types | PascalCase | `IconSvgProps` |
| CSS classes | Tailwind utilities | `text-4xl sm:text-5xl` |

### Styling approach
- Use **Tailwind utility classes** directly on JSX elements — avoid inline `style` objects.
- Use **Tailwind Variants** (`tv()`) from `components/primitives.ts` for component style variants.
- Dark mode is class-based (`darkMode: "class"` in Tailwind config). Use `dark:` prefixes, never check `window.theme` manually.
- **Emotion** is used internally by HeroUI; do not use it for custom components.

### Configuration vs data vs metadata — separation
- `config/` = tunable app settings (name, URL, fonts, nav routes). `data/` = domain content records with a matching `types/` interface. `metadata/` = per-route SEO + JSON-LD.
- Test: would this still exist if the design changed? If yes → `data/`. If no → `config/` (or `metadata/` for search / social presentation).
- `sitemap.ts` / `robots.ts` are file-convention routes in `app/`, not `metadata/`. Full detail: [docs/architecture.md](./docs/architecture.md) and [docs/seo.md](./docs/seo.md).

### Configuration as single source of truth
- All personal info, navigation links, and social URLs live in `config/site.ts` (`siteConfig`). Do **not** hardcode names, emails, or links in components — import from `siteConfig`.
- SEO lives in `metadata/` (one file per route, exporting a keyword array + `Metadata`), imported via `@/metadata`. See [docs/seo.md](./docs/seo.md).

### Metadata on client-component pages
- A `"use client"` page **cannot** export `metadata`; a sibling `layout.tsx` exports it instead (see `app/about/layout.tsx`). The `(about)` group holds `resume` / `skills` / `achievements`. Detail: [docs/routing.md](./docs/routing.md#metadata-on-client-pages).

### Structured data (JSON-LD)
- JSON-LD builders in `metadata/structured-data.ts` render via `<JsonLd data={...} />` (`components/json-ld.tsx`). `personSchema` is site-wide (`app/layout.tsx`); `/projects/[slug]` adds `projectSchema(project)` (a `CreativeWork`, **not** `SoftwareApplication`) + a breadcrumb. Detail: [docs/seo.md](./docs/seo.md#structured-data-json-ld).

### Contact form / email
- `/contact` (`app/contact/page.tsx`, client) posts JSON to `app/api/contact/route.ts`.
- The route re-validates server-side, drops honeypot (`company`) submissions silently, and sends via **Resend** with `replyTo` set to the sender. It reads `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` from env and returns 400 / 500 / 502 on bad input / missing config / send failure.
- Sending is Resend; **receiving** (`contact@gurlivleen.dev` → Gmail) is handled by Cloudflare Email Routing, not Resend. Full setup is in `docs/contact.md`.

### Types
- One file per domain: `types/experience.ts`, `types/education.ts`, etc.
- `types/index.ts` is reserved for cross-cutting utility types (e.g. `IconSvgProps`).
- Always import with `import type { ... } from "@/types/..."` to keep them erased at runtime.

### Animations
- Use **Framer Motion** (`motion.div`, `variants`, `initial`/`animate`) for all entrance animations.
- Follow the `hidden → visible` stagger pattern from `app/page.tsx` for new sections.
- Do not add CSS keyframe animations when Framer Motion already exists in the bundle.

### Icons
- Icons live in `components/icons/` (barrel `index.ts`); import from `@/components/icons`. Custom SVGs in `logo` / `brand` (social) / `ui`; MUI icons re-exported one-per-path in `material.ts` (**never** `export * from "@mui/icons-material"`).
- Custom SVGs use `IconSvgProps` + `currentColor`; one canonical icon per brand (e.g. `LinkedinIcon` is the custom glyph, matching `GithubIcon`). Detail: [docs/architecture.md](./docs/architecture.md#icons-module).

### Path alias
- `@/` maps to the repository root (configured in `tsconfig.json`).
- Always import using `@/` rather than relative paths that cross directories.

---

## Important Notes for AI Assistants

- **Do not remove the `"use client"` directive** from files that use hooks, browser APIs, or event handlers.
- **Do not introduce new UI libraries.** HeroUI + Tailwind covers all needs; adding shadcn/ui, Radix, etc. creates conflicts.
- **Do not add `console.log`** statements; ESLint is configured to warn on them.
- **Do not modify `package-lock.json` manually;** always use `npm install`.
- **Footer is intentionally commented out** in `app/layout.tsx` — do not uncomment unless asked.
- `app/blog` is a stub page, hidden from the navbar (`config/site.ts`) and the sitemap until it has real content; Home, About, Contact, Projects (+ `[slug]`), Resume, Skills, and Achievements are built.
- **Never commit secrets.** `RESEND_API_KEY` lives only in `.env.local` (local) and Cloud Secret Manager (prod). Email addresses are not secrets.
- ESLint uses **v9 flat config** (`eslint.config.mjs`). Legacy `.eslintrc.*` files are not supported.
- The project targets **ES5** output (`tsconfig.json`) — avoid browser-specific APIs without polyfills.
- `@/*` path alias is available everywhere; prefer it over deep relative imports.

---

## Git Branch Strategy

- **`main`** — production branch. **`development`** — integration branch.
- Flow: `<feat|docs|...>/<scope>` → `development` (via PR) → `main` (via PR only).
- Branch off `development`; sync a branch from `development` just-in-time (before resuming or merging it), not all branches up front.
- Conventional Commit types (`feat`, `fix`, `docs`, `chore`, …), imperative and lower-case (e.g. `feat: add contact form`). No em dashes in commit messages.
- The author commits in their editor — assistants draft messages, they do not run `git commit` / `git push`.
