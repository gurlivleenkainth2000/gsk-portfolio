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
| Deployment | Vercel (inferred from .gitignore) |

---

## Repository Structure

```
gsk-portfolio/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — adds Navbar, Fonts, Providers
│   ├── page.tsx            # Home page (hero section)
│   ├── providers.tsx       # HeroUIProvider + NextThemesProvider
│   ├── error.tsx           # Error boundary
│   ├── about/              # Placeholder About page
│   ├── blog/               # Placeholder Blog page
│   ├── docs/               # Placeholder Docs page
│   ├── pricing/            # Placeholder Pricing page
│   └── resume/             # Resume page (Google Docs iframe embed)
├── components/             # Shared React components
│   ├── navbar.tsx          # Sticky responsive navigation bar
│   ├── footer.tsx          # Footer (currently commented out in layout)
│   ├── theme-switch.tsx    # Light/dark mode toggle (client component)
│   ├── primitives.ts       # Tailwind Variants style primitives
│   ├── icons.tsx           # All SVG icon components
│   ├── counter.tsx         # Example client component with useState
│   └── linkedin-badge.tsx  # Dynamic-import LinkedIn badge (SSR disabled)
├── config/
│   ├── site.ts             # Single source of truth: name, links, nav items
│   ├── fonts.ts            # Google Font definitions + CSS variables
│   ├── keywords.ts         # SEO keyword array (170+ terms)
│   └── root-metadata.ts    # OpenGraph, Twitter Card, robots metadata
├── types/
│   └── index.ts            # Shared TypeScript types (e.g. IconSvgProps)
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

### Configuration as single source of truth
- All personal info, navigation links, and social URLs live in `config/site.ts` (`siteConfig`).
- Do **not** hardcode names, emails, or links in components — import from `siteConfig`.
- SEO metadata is centralised in `config/root-metadata.ts` and `config/keywords.ts`.

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

- **`main`** — production branch, deployed to Vercel.
- Feature branches are created from `main` and merged via pull requests.
- Commit messages are imperative, lower-case (e.g. `feat: add about section`).
