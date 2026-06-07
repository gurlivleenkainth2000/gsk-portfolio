# CLAUDE.md — AI Assistant Guide for gsk-portfolio

This file provides context for AI assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

**gsk-portfolio** is the personal portfolio website of Gurlivleen Singh Kainth, a software engineer based in Melbourne, Australia. It is a Next.js 15 App Router project using HeroUI, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.3.1 (App Router, Turbopack) |
| Language | TypeScript 5.6 (strict mode) |
| UI Components | HeroUI v2 (30+ packages) |
| Styling | Tailwind CSS 4, Tailwind Variants, Emotion |
| Animations | Framer Motion 11 |
| Theming | next-themes (light / dark via CSS class) |
| Icons | Custom SVGs in `components/icons.tsx` + MUI Icons |
| Fonts | Inter (sans) + Fira Code (mono) via Google Fonts |
| Linting | ESLint 9 flat config + Prettier |
| Package Manager | npm (package-lock.json present) |

---

## Repository Structure

```
gsk-portfolio/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — adds Navbar, Fonts, Providers
│   ├── page.tsx            # Home page (hero section)
│   ├── providers.tsx       # HeroUIProvider + NextThemesProvider
│   ├── error.tsx           # Error boundary
│   ├── about/              # About page (narrative + timeline + explore cards)
│   ├── blog/               # Placeholder Blog page
│   └── projects/           # Placeholder Projects page
├── components/             # Shared React components
│   ├── navbar.tsx          # Sticky responsive navigation bar
│   ├── footer.tsx          # Footer (currently commented out in layout)
│   ├── theme-switch.tsx    # Light/dark mode toggle (client component)
│   ├── primitives.ts       # Tailwind Variants style primitives
│   ├── icons.tsx           # All SVG icon components
│   ├── counter.tsx         # Example client component with useState
│   └── linkedin-badge.tsx  # Dynamic-import LinkedIn badge (SSR disabled)
├── config/                 # App configuration — tunable settings only
│   ├── site.ts             # Single source of truth: name, links, nav items
│   └── fonts.ts            # Google Font definitions + CSS variables
├── data/                   # Domain content records (arrays of entries)
│   ├── experience.ts       # Work history entries
│   ├── education.ts        # Education entries
│   ├── projects.ts         # Project entries (incl. per-project SEO keywords)
│   └── skills.ts           # Skill entries
├── metadata/               # Per-route SEO — keywords + Next.js Metadata, one file per route
│   ├── shared.ts           # baseUrl, ogImage(), baseKeywords, dedupe()
│   ├── root.ts             # homeKeywords + rootMetadata (site-wide defaults)
│   ├── projects.ts         # projectsKeywords + projectKeywords() + projectsMetadata
│   ├── about.ts … etc.     # <route>Keywords + <route>Metadata (blog, resume, skills, achievements)
│   └── index.ts            # Barrel — import from "@/metadata"
├── types/                  # TypeScript interfaces — one file per domain
│   ├── index.ts            # Shared utility types (e.g. IconSvgProps)
│   ├── experience.ts       # EmploymentType + ExperienceEntry
│   └── education.ts        # EducationEntry
├── styles/
│   └── globals.css         # Tailwind CSS entry point (@import "tailwindcss")
├── public/                 # Static assets, robots.txt, sitemap.xml
├── next.config.js          # Minimal Next.js config (defaults)
├── tailwind.config.js      # Tailwind + HeroUI plugin + dark mode class
├── tsconfig.json           # TypeScript config (strict, path alias @/*)
├── eslint.config.mjs       # ESLint v9 flat config
└── postcss.config.js       # @tailwindcss/postcss plugin
```

---

## Development Workflows

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
- `config/` is for **tunable app settings only** — site name, URL, fonts, nav route definitions. If it controls *how the app behaves*, it belongs here.
- `data/` is for **domain content records** — arrays of entries that represent things in the world (jobs, courses, projects, skills). If it would naturally have a corresponding type in `types/`, it belongs here.
- `metadata/` is for **per-route SEO** — each route's keyword list and Next.js `Metadata` object, co-located one file per route and imported via `@/metadata`. Per-project keyword *content* stays on each `ProjectEntry` in `data/projects.ts` and is combined by `projectKeywords()` in `metadata/projects.ts`.
- Test: would this still exist if the design changed? If yes → `data/`. If no → `config/` (or `metadata/` for search / social presentation).
- Note: `sitemap.ts` and `robots.ts` are Next.js file-convention routes and live in `app/`, not in `metadata/`.

### Configuration as single source of truth
- All personal info, navigation links, and social URLs live in `config/site.ts` (`siteConfig`).
- Do **not** hardcode names, emails, or links in components — import from `siteConfig`.
- SEO keywords + `Metadata` live in `metadata/` (one file per route; site-wide defaults in `metadata/root.ts`), imported via `@/metadata`. Each file exports both the route's keyword array and its `Metadata` object.

### Types
- One file per domain: `types/experience.ts`, `types/education.ts`, etc.
- `types/index.ts` is reserved for cross-cutting utility types (e.g. `IconSvgProps`).
- Always import with `import type { ... } from "@/types/..."` to keep them erased at runtime.

### Animations
- Use **Framer Motion** (`motion.div`, `variants`, `initial`/`animate`) for all entrance animations.
- Follow the `hidden → visible` stagger pattern from `app/page.tsx` for new sections.
- Do not add CSS keyframe animations when Framer Motion already exists in the bundle.

### Icons
- Add all new SVG icons to `components/icons.tsx` as named exports.
- Accept `size`, `width`, `height`, and spread `...props` (see `IconSvgProps` in `types/index.ts`).
- Use `currentColor` in SVG fills/strokes so icons inherit text colour.

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
- The `app/about`, `app/blog`, `app/docs`, and `app/pricing` pages are placeholder stubs — they are expected to be incomplete.
- ESLint uses **v9 flat config** (`eslint.config.mjs`). Legacy `.eslintrc.*` files are not supported.
- The project targets **ES5** output (`tsconfig.json`) — avoid browser-specific APIs without polyfills.
- `@/*` path alias is available everywhere; prefer it over deep relative imports.

---

## Git Branch Strategy

- **`main`** — production branch.
- Feature branches are created from `main` and merged via pull requests.
- Commit messages are imperative, lower-case (e.g. `feat: add about section`).
