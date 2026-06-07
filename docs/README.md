# Documentation

Project documentation for **gsk-portfolio**. Evergreen guides live here. Dated,
point-in-time design records live in `specs/`, which is local-only (gitignored)
and not part of the published repo.

## Guides

- [architecture.md](./architecture.md) — rendering model, directory
  responsibilities, the config/data/metadata separation, icons module, theming,
  animation, and the email pipeline.
- [routing.md](./routing.md) — route tree, route groups, the client-page
  metadata pattern, dynamic `[slug]` routes, and where navigation comes from.
- [seo.md](./seo.md) — per-route metadata + the Next.js inheritance gotcha,
  keyword strategy, JSON-LD structured data, `sitemap` / `robots`, and Search
  Console verification.
- [contact.md](./contact.md) — contact-form delivery (Resend) and email routing
  (Cloudflare), env vars, and the production secret.
- [deployment.md](./deployment.md) — local setup, the fork/clone checklist, and
  Firebase App Hosting deployment with its config files.

## Elsewhere

- [`../README.md`](../README.md) — project overview, getting started, scripts,
  deployment.
- [`../CLAUDE.md`](../CLAUDE.md) — concise conventions / rules for AI assistants;
  links here for the long-form detail.

## Writing docs here

- One H1 per file; kebab-case filenames.
- Document the **why** and cross-cutting concerns, not a field-by-field restating
  of code.
- One home per topic. Cross-link rather than copy, so there's a single source of
  truth.
- Evergreen guides go in `docs/`; dated, one-off design notes go in
  `docs/specs/` with an ISO-date prefix.
