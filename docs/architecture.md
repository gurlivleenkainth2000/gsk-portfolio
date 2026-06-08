# Architecture

How the app is put together: the rendering model, what each top-level directory
owns, and the cross-cutting systems (icons, structured data, theming,
animation, email). For routes specifically, see [routing.md](./routing.md); for
search/social, see [seo.md](./seo.md).

---

## Rendering model

Next.js 16 App Router with React Server Components.

- Components are **server components by default**. Add `"use client"` only when a
  file uses hooks, browser APIs, or event handlers.
- Layouts and static content pages stay server components.
- Heavy client-only widgets (e.g. the LinkedIn badge) are loaded with
  `next/dynamic` and `{ ssr: false }`.
- A server component can render a client component, and can pass it serializable
  props — but **not** functions/components as props. (Passing `NextLink` as an
  `as={...}` prop from a server component throws; render `NextLink` directly
  instead.)

---

## Directory responsibilities

| Directory | Owns |
|-----------|------|
| `app/` | Routes, layouts, the API route, and the `sitemap.ts` / `robots.ts` file-convention routes. See [routing.md](./routing.md). |
| `components/` | Shared, reusable UI. Feature groups in subfolders (`projects/`, `timeline/`, `explore-card/`). |
| `config/` | Tunable app settings only — `site.ts` (single source of truth, incl. `CDN_URL` + the `asset()` helper) and `fonts.ts`. |
| `data/` | Domain content records — arrays of entries (experience, education, projects, skills). |
| `metadata/` | Per-route SEO + JSON-LD builders. See [seo.md](./seo.md). |
| `types/` | TypeScript interfaces, one file per domain. |
| `styles/`, `public/` | Global CSS entry; `public/` holds only same-origin icons (`favicon.ico`, `apple-touch-icon.png`). Binary assets live on the CDN — see [Assets (CDN)](#assets-cloudflare-r2--cdn). |

### config vs data vs metadata — the separation test

The dividing line is: **would this still exist if the design changed?**

- **Yes → `data/`.** Domain records that represent things in the world (jobs,
  courses, projects, skills). These have a matching type in `types/`.
- **No → `config/`** (how the app behaves: name, URL, fonts, nav routes) **or
  `metadata/`** (how it presents to search / social).

All personal info, navigation links, and social URLs live in `config/site.ts`
(`siteConfig`). Never hardcode names, emails, or links in components — import
from `siteConfig`.

---

## Assets (Cloudflare R2 + CDN)

Binary assets — project images, the résumé PDF, and all Open Graph cards — are
**not** committed to the repo. They live in a Cloudflare R2 bucket
(`gurlivleen-dev`) and are served over the custom domain `cdn.gurlivleen.dev`,
which is automatically edge-cached by Cloudflare (R2 has free egress, so there's
no per-GB delivery cost and no separate CDN product to wire up).

Everything routes through one place: `config/site.ts` exports `CDN_URL` and an
`asset(path)` helper.

```ts
export const CDN_URL = "https://cdn.gurlivleen.dev";
export const asset = (path: string): string =>
  `${CDN_URL}${path.startsWith("/") ? path : `/${path}`}`;
```

- **Project images / résumé:** `data/projects.ts` and the resume page build URLs
  with `asset("/projects/…")` / `asset("/resume.pdf")`.
- **OG images:** built via `asset()` too — pages use `asset("/og/<route>.png")`,
  project detail pages use `` asset(`/og/projects/${slug}.png`) ``. See
  [seo.md](./seo.md#canonical-urls-and-images).
- **`next/image`:** remote hosts must be whitelisted, so `next.config.js` lists
  `cdn.gurlivleen.dev` in `images.remotePatterns`. Forgetting this makes remote
  images fail to render.
- **Stays local:** `favicon.ico` and `apple-touch-icon.png` remain in `public/`
  on purpose — tiny, and browsers / SEO expect them same-origin.

To change the CDN host, edit `CDN_URL` in one place. (It's a public, non-secret,
stable value, so it lives in `config/site.ts` rather than env — keeping all
tunable non-secret config in one file.)

---

## Icons module

Icons live in `components/icons/`, re-exported through the `index.ts` barrel.
Import everything from `@/components/icons`.

- `logo.tsx` — the brand mark.
- `brand.tsx` — social glyphs (GitHub, LinkedIn, Discord, Twitter) as custom SVGs.
- `ui.tsx` — UI glyphs (search, theme sun/moon).
- `material.ts` — every MUI icon used in the app, re-exported one per path
  (`export { default as XIcon } from "@mui/icons-material/X"`) so tree-shaking is
  preserved. **Never** `export * from "@mui/icons-material"` — it pulls the whole
  library into the bundle.

Conventions: custom SVGs accept `size` / `width` / `height` and spread `...props`
(see `IconSvgProps` in `types/index.ts`) and use `currentColor` so they inherit
text colour. There is one canonical icon per brand — e.g. `LinkedinIcon` is a
custom glyph in `brand.tsx` (not the MUI one) so it optically matches
`GithubIcon`.

---

## Structured data

JSON-LD builders in `metadata/structured-data.ts` render through
`<JsonLd data={...} />`. `personSchema` is site-wide; project pages add a
`CreativeWork` and breadcrumbs. Full detail in [seo.md](./seo.md#structured-data-json-ld).

---

## Theming

`next-themes`, class-based light/dark (`darkMode: "class"`). Use `dark:`
prefixes; never read `window.theme` manually. The toggle is
`components/theme-switch.tsx` (a client component).

---

## Animation

Framer Motion only. Shared variants live in `components/motion.ts`
(`staggerContainer*` parents, `fade*` children). Follow the `hidden → visible`
stagger pattern from `app/page.tsx` for new sections. Don't add CSS keyframe
animations when Framer Motion is already in the bundle.

---

## Email / contact pipeline

`/contact` posts to `app/api/contact/route.ts`, which validates server-side,
drops honeypot submissions, and **sends** via Resend. **Receiving**
(`contact@gurlivleen.dev` → Gmail) is handled by Cloudflare Email Routing, not
Resend. Full setup, env vars, and the production secret are in
[contact.md](./contact.md).

---

## Deployment

Firebase App Hosting (`apphosting.yaml` + `firebase.json`). `RESEND_API_KEY` is a
Cloud Secret Manager secret; the other contact env vars are plain values. Use
**Node 22 LTS** for the Firebase CLI (newer odd releases break it). See the
[README](../README.md#deployment) and [contact.md](./contact.md).
