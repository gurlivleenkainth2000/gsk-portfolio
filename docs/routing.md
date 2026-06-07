# Routing

Route layout, the conventions that aren't obvious from the file tree (route
groups, client-page metadata, dynamic routes), and where navigation comes from.

---

## Route tree

```
app/
  layout.tsx            # root layout — Navbar, fonts, providers, personSchema
  page.tsx              # /              (home / hero)
  (about)/              # route group — no URL segment
    resume/             # /resume        (client page.tsx + layout.tsx metadata)
    skills/             # /skills
    achievements/       # /achievements
  about/                # /about         (client page.tsx + layout.tsx metadata)
  contact/              # /contact       (client page.tsx + layout.tsx metadata)
  api/contact/route.ts  # POST handler — sends via Resend
  blog/                 # /blog          (stub — hidden from nav + sitemap)
  projects/             # /projects      (index)
    [slug]/             # /projects/<slug> (detail, statically generated)
  sitemap.ts  robots.ts # file-convention routes
```

---

## Route groups

`(about)` is a **route group**: the parentheses mean it adds no URL segment, so
its children resolve to `/resume`, `/skills`, `/achievements` (not
`/about/resume`). It groups the three "about-adjacent" pages so they can share
structure without nesting their URLs.

---

## Metadata on client pages

A page with `"use client"` **cannot** export `metadata` (it's a server-only
export). The pattern: wrap it with a sibling `layout.tsx` that exports the
metadata instead.

```
app/about/layout.tsx   →  export const metadata = aboutMetadata
app/about/page.tsx     →  "use client"
```

The same applies to `contact/` and each page inside the `(about)` group. Static
(server) pages like `/projects` export `metadata` directly. See
[seo.md](./seo.md) for what goes in those objects.

---

## Dynamic routes — `/projects/[slug]`

`app/projects/[slug]/page.tsx` is statically generated:

- `generateStaticParams()` returns one entry per project slug from
  `data/projects.ts`, so all detail pages are built at compile time.
- `generateMetadata({ params })` builds per-project title, description,
  keywords, canonical, and OG/Twitter from the `ProjectEntry`.
- The page looks up the project with `getProjectBySlug`, calls `notFound()` if
  missing, computes prev/next neighbours, and renders `<ProjectDetail>`.
- It also emits page-level JSON-LD: `projectSchema(project)` plus a
  `breadcrumbSchema(...)` (see [seo.md](./seo.md#structured-data-json-ld)).

---

## File-convention routes

`sitemap.ts` and `robots.ts` live in `app/` (Next.js file conventions), not in
`metadata/`. They generate `/sitemap.xml` and `/robots.txt` at build time. See
[seo.md](./seo.md#sitemap-and-robots).

---

## Navigation source

The navbar is driven entirely by `config/site.ts`:

- `navItems` — primary links (Home, Projects, About, Resume, Contact). Shown in
  the desktop bar and the primary group of the mobile menu.
- `navMenuItems` — secondary links (Achievements, Skills). Shown only in the
  mobile menu's "More" group.

`components/navbar.tsx` maps these arrays; it's a client component (active-route
highlighting via `usePathname`, controlled mobile-menu open state). Blog is
intentionally omitted from `navItems` until it has content.

---

## Checklist: adding a route

1. Create the route folder + `page.tsx` under `app/` (use a route group if it
   shouldn't add a URL segment).
2. Wire metadata: static page exports `metadata`; client page gets a sibling
   `layout.tsx`. Add the `metadata/<route>.ts` file ([seo.md](./seo.md)).
3. Add the path to `app/sitemap.ts`.
4. Add a `navItems` / `navMenuItems` entry in `config/site.ts` if user-facing.
5. Add page-specific JSON-LD if warranted.
