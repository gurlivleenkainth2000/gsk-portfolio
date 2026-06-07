# gsk-portfolio

Personal portfolio of **Gurlivleen Singh Kainth** — a Melbourne-based backend /
full-stack software engineer. Built with Next.js (App Router) and HeroUI, and
deployed on Firebase App Hosting.

**Live:** [gurlivleen.dev](https://gurlivleen.dev)

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| UI | HeroUI v2 + Tailwind CSS 4 + Tailwind Variants |
| Animation | Framer Motion |
| Theming | next-themes (class-based light / dark) |
| Email | Resend (contact form delivery) |
| Forms | react-hook-form |
| Hosting | Firebase App Hosting |
| DNS / email routing | Cloudflare |

---

## Features

- **Home, About, Projects** (with per-project detail pages), and an `(about)`
  route group for **Resume, Skills, Achievements**.
- **Contact form** (`/contact`) with client-side validation, a hidden honeypot,
  and server-side delivery via Resend (see [CONTACT.md](./CONTACT.md)).
- **Per-route SEO** — every route owns its keywords + Next.js `Metadata`, plus
  `sitemap.ts`, `robots.ts`, and schema.org `Person` JSON-LD.
- Light / dark theming, responsive navbar, and Framer Motion entrance
  animations throughout.

---

## Getting started

```bash
# 1. install
npm install

# 2. configure env (contact form)
cp .env.example .env.local   # then fill in the values

# 3. run
npm run dev                  # http://localhost:3000
```

### Environment variables

The contact form needs three variables (documented in `.env.example`):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key used to send mail |
| `CONTACT_FROM_EMAIL` | Verified sender on `gurlivleen.dev` |
| `CONTACT_TO_EMAIL` | Where submissions are delivered |

Full setup (Resend domain verification, Cloudflare Email Routing, and the
production secret) is documented in **[CONTACT.md](./CONTACT.md)**.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint with `--fix` |

> Use **Node 22 LTS**. Newer odd releases (e.g. Node 25) break the Firebase CLI.

---

## Project structure

```
app/                 # App Router routes
  (about)/           # route group: resume, skills, achievements
  about/  contact/  blog/  projects/[slug]/
  api/contact/       # contact form route handler (Resend)
  sitemap.ts  robots.ts
components/           # shared UI (navbar, footer, motion, primitives, icons, …)
config/              # tunable settings (site.ts = single source of truth, fonts.ts)
data/                # domain content records (experience, education, projects, skills)
metadata/            # per-route SEO (keywords + Metadata), imported via @/metadata
types/               # TypeScript interfaces, one file per domain
styles/  public/
apphosting.yaml      # Firebase App Hosting config
```

See [CLAUDE.md](./CLAUDE.md) for detailed conventions.

---

## Deployment

Deployed on **Firebase App Hosting** (`apphosting.yaml` + `firebase.json`).
`RESEND_API_KEY` is stored in Cloud Secret Manager; the other env vars are plain
values. See [CONTACT.md](./CONTACT.md) for the secret-setup command.

---

## License

Personal project. Code may be referenced for learning; content and branding are
© Gurlivleen Singh Kainth.
