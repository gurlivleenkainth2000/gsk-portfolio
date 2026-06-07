# SEO

How search and social presentation work in this repo: per-route metadata, the
Next.js inheritance model, keyword strategy, structured data, and the
`sitemap` / `robots` routes.

> Source of truth for the rules is this file. CLAUDE.md links here; don't
> duplicate the detail there.

---

## Metadata model

Every route owns its SEO. The pieces live in `metadata/` and are imported via
the `@/metadata` barrel:

- `metadata/root.ts` — `rootMetadata` (site-wide defaults) + `homeKeywords`.
  Applied once in `app/layout.tsx`.
- `metadata/<route>.ts` — one file per route, each exporting **both** a keyword
  array and a Next.js `Metadata` object (e.g. `aboutKeywords` + `aboutMetadata`).
- `metadata/shared.ts` — `baseUrl`, `ogImage()`, `baseKeywords`, `dedupe()`.
- `metadata/structured-data.ts` — JSON-LD builders (see [Structured data](#structured-data-json-ld)).

A static page sets `export const metadata = <route>Metadata`. A `"use client"`
page can't export metadata, so a sibling `layout.tsx` does it instead — see
[routing.md](./routing.md#metadata-on-client-pages).

---

## The inheritance gotcha (read this before "adding missing fields")

Next.js **shallow-merges** metadata down the route tree, root to leaf. The
practical consequences:

**Top-level fields are inherited.** Set once in `rootMetadata`, every route gets
them unless it overrides: `metadataBase`, the `title` template, `applicationName`,
`authors`, `creator`, `publisher`, `icons`, `robots`, `category`,
`classification`. Do **not** repeat these in per-route files — it's redundant and
creates drift.

**`openGraph` and `twitter` are replaced, not deep-merged.** When a route defines
`openGraph`, it overwrites root's entirely; sub-fields it omits are not inherited.
That's why every route repeats the full block (type, url, title, description,
`siteName`, `images`, `locale`). This is required, not duplication.

**`keywords` is also replaced, not merged.** Each route builds its list from
`baseKeywords` via `dedupe(...)` rather than relying on inheritance.

**`title` uses the root template.** Root sets `template: "%s | <name>"`; routes
set a short string like `"About"`, which renders as `About | Gurlivleen Singh
Kainth`.

So "rootMetadata has more fields than the others" is by design — the extras are
inherited. The only fields that must be per-route are `title`, `description`,
`keywords`, `alternates.canonical`, `openGraph`, and `twitter`.

---

## Keyword strategy

- `baseKeywords` (in `shared.ts`) is the core identity / role / location set
  reused everywhere.
- Each route layers its own terms on top with `dedupe(baseKeywords, [...])`,
  which flattens and removes duplicates while preserving order.
- Per-project keywords live on each `ProjectEntry` in `data/projects.ts` and are
  combined with auto-derived terms (name, domain, tech) by `projectKeywords()`
  in `metadata/projects.ts`.

Note: meta `keywords` carry little weight with Google today, but they're cheap
and harmless, and the lists double as a content checklist.

---

## Canonical URLs and images

- Every route sets `alternates.canonical` to its absolute URL.
- OG / Twitter images use the `ogImage()` helper (defaults to `/og-home.jpg`,
  1200x630). Replace per route by passing a path.

---

## Structured data (JSON-LD)

Builders live in `metadata/structured-data.ts` and render through
`<JsonLd data={...} />` (`components/json-ld.tsx`, a server component that emits
a `<script type="application/ld+json">`). `data` accepts one object or an array.

- **`personSchema`** — the site owner as a `Person`. Emitted once in
  `app/layout.tsx`, so it applies site-wide. Its `sameAs` links (GitHub,
  LinkedIn, Twitter) are the strongest signal tying the domain to the name.
- **`projectSchema(project)`** — a `CreativeWork` per project case study.
  Emitted in the `/projects/[slug]` server component.
- **`breadcrumbSchema(crumbs)`** — a `BreadcrumbList` from `{ name, path }[]`
  (the site URL is prefixed automatically). Emitted on `/projects` and
  `/projects/[slug]`.

**Why `CreativeWork` and not `SoftwareApplication`:** the page is a case study,
and `SoftwareApplication` requires `offers` / `aggregateRating` to produce a rich
result. Without those it only generates Search Console warnings, so `CreativeWork`
is the accurate, warning-free choice.

Validate any URL with Google's Rich Results Test after a build.

---

## sitemap and robots

`app/sitemap.ts` and `app/robots.ts` are Next.js file-convention routes (they
live in `app/`, not `metadata/`).

- **`sitemap.ts`** generates `/sitemap.xml` at build time from a `routes` array,
  plus one entry per project detail page. `lastModified` is set per build.
  - `/contact` is included. `/blog` is commented out until the page has real
    content (a thin/stub page in the sitemap hurts SEO).
  - Add a new public route to the `routes` array when you ship it.
- **`robots.ts`** allows everything except `/api/`, `/_next/`, `/static/`, and
  points crawlers at the sitemap.

---

## Google Search Console

`gurlivleen.dev` is verified in GSC as a **Domain property** via a DNS TXT
record. That's why `rootMetadata` has **no** `verification` field — a meta tag
would be redundant.

---

## Checklist: adding a new route

1. Create `metadata/<route>.ts` exporting `<route>Keywords` and `<route>Metadata`
   (start keywords from `baseKeywords` via `dedupe`).
2. Export both from `metadata/index.ts`.
3. Wire the page's metadata (static page: `export const metadata`; client page:
   sibling `layout.tsx`).
4. Add the path to `app/sitemap.ts`.
5. Add it to `config/site.ts` nav if it's user-facing.
6. Add page-specific JSON-LD if the route type warrants it (e.g. a breadcrumb).
