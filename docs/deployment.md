# Setup & Deployment

Everything needed to run this portfolio locally, make it your own, and deploy it.
The hosting platform is **Firebase App Hosting** (on Google Cloud); the contact
form uses **Resend** to send and **Cloudflare Email Routing** to receive.

For the email pipeline specifically, see [contact.md](./contact.md). For how the
code is organised, see [architecture.md](./architecture.md).

---

## Prerequisites

- **Node 22 LTS** and npm. Newer odd releases (e.g. Node 25) break the Firebase
  CLI — stick to 22.
- Only if deploying to **Firebase App Hosting** (the platform used here — you can
  use any host, see [Deployment](#deployment--firebase-app-hosting)): the
  **Firebase CLI** (`npm install -g firebase-tools`, then `firebase login`) and a
  **Google / Firebase account** with a project on the Blaze (pay-as-you-go) plan.
- Only for a working contact form: a **Resend** account and a **domain with
  Cloudflare DNS**.

---

## 1. Clone and install

```bash
git clone https://github.com/gurlivleenkainth2000/gsk-portfolio.git
cd gsk-portfolio
npm install
```

## 2. Configure environment

The only runtime config is the contact form. Copy the template and fill it in:

```bash
cp .env.example .env.local   # .env*.local is gitignored
```

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key (https://resend.com/api-keys) |
| `CONTACT_FROM_EMAIL` | Verified sender on your Resend domain (not a free gmail/outlook) |
| `CONTACT_TO_EMAIL` | Where submissions are delivered |

Without these, the site runs fine — only the contact form returns an error.
Full email setup is in [contact.md](./contact.md).

## 3. Run locally

```bash
npm run dev      # http://localhost:3000  (Next.js + Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint --fix
```

---

## Make it yours (forking checklist)

If you cloned this to build your own portfolio, these are the things to change:

1. **Identity** — `config/site.ts` (`siteConfig`): name, title, description, `url`,
   email, location, and all social links. This is the single source of truth;
   most of the site reads from it.
2. **Content** — `data/*.ts`: `experience`, `education`, `projects`, `skills`.
   Project case-study pages are generated from `data/projects.ts`.
3. **SEO** — `metadata/*.ts`: per-route descriptions and keyword lists, and the
   `Person` / project schema in `metadata/structured-data.ts`. See [seo.md](./seo.md).
4. **Assets** — `public/`: `resume.pdf`, `og-home.jpg` (1200x630 social card),
   `favicon.ico`, `apple-touch-icon.png`.
5. **Deployment identifiers** — see the next section: the Firebase project alias,
   the App Hosting backend ID, and the secret name all reference this project and
   must be changed to yours.
6. **License** — replace `LICENSE` with your own.

---

## Deployment — Firebase App Hosting

The app is deployed on Firebase App Hosting, which builds and serves the Next.js
app from the repo.

> **Forking? You can host this anywhere.** This is a standard Next.js App Router
> app, so it deploys to any Next.js-capable platform — Vercel, Netlify,
> Cloudflare Pages/Workers, or a self-hosted Node server — with no code changes.
> Only the contact form needs attention: set `RESEND_API_KEY` and the two
> `CONTACT_*` values however your host manages env vars / secrets. The
> Firebase-specific files (`firebase.json`, `.firebaserc`, `apphosting.yaml`) are
> only used by App Hosting and can be ignored or deleted elsewhere. The rest of
> this section documents the Firebase setup used here as one worked example.

Three files configure it:

### `firebase.json`

Defines the App Hosting backend and what to ignore on upload.

```json
{
  "apphosting": {
    "backendId": "gsk-portfolio",
    "rootDir": "/",
    "ignore": ["node_modules", ".git", "firebase-debug.log", "firebase-debug.*.log", "functions"]
  }
}
```

### `.firebaserc`

The default Firebase project alias.

```json
{ "projects": { "default": "gurlivleen-singh-kainth" } }
```

### `apphosting.yaml`

Runtime sizing and environment variables for the running server.

```yaml
runConfig:
  minInstances: 0      # scales to zero when idle
  maxInstances: 2

env:
  - variable: RESEND_API_KEY
    secret: gsk-portfolio-resend-api-key   # pulled from Cloud Secret Manager
    availability: [RUNTIME]
  - variable: CONTACT_FROM_EMAIL
    value: "Portfolio Contact <contact@gurlivleen.dev>"   # plain config, safe to commit
    availability: [RUNTIME]
  - variable: CONTACT_TO_EMAIL
    value: contact@gurlivleen.dev
    availability: [RUNTIME]
```

`secret:` entries pull from Cloud Secret Manager (the value is never committed);
`value:` entries are plain config.

### First-time setup

1. **Create the backend.** In the Firebase Console, create an App Hosting backend
   and connect it to your GitHub repository. Choose the branch to deploy from
   (`main` here) — App Hosting then rebuilds and deploys on every push to it.
2. **Set the secret** (only if using the contact form):

   ```bash
   firebase apphosting:secrets:set gsk-portfolio-resend-api-key
   ```

   Paste the Resend API key when prompted. Use your own secret name and update
   the reference in `apphosting.yaml`.
3. **Update the identifiers** to yours: the `default` project in `.firebaserc`,
   `backendId` in `firebase.json`, and the secret name in `apphosting.yaml`.

### Deploying

With GitHub integration, **push to `main`** and App Hosting builds and deploys
automatically. The integration branch flow is `feature → development → main`
(see [CLAUDE.md](../CLAUDE.md#git-branch-strategy)), so production deploys happen
when `development` is merged into `main`.

> Run any local Firebase CLI commands with **Node 22 LTS** — Node 24+ removed
> `SlowBuffer` and crashes the CLI.

---

## Custom domain and DNS

`gurlivleen.dev` is registered with DNS on **Cloudflare**.

- Add the custom domain to the App Hosting backend (Firebase Console → App
  Hosting → your backend → custom domain), then create the DNS records it gives
  you in Cloudflare.
- Email for the domain (`contact@gurlivleen.dev` → Gmail) is handled by
  **Cloudflare Email Routing**, independent of hosting — see [contact.md](./contact.md).

---

## Notes

- App Hosting requires the Firebase **Blaze** plan; a scale-to-zero portfolio
  costs little, but a billing account must be attached.
- Never commit secrets. `RESEND_API_KEY` lives only in `.env.local` (local) and
  Cloud Secret Manager (production); the `CONTACT_*` values are not secrets.
- Considering a future move to Cloudflare Pages/Workers — the app avoids
  Firebase-specific server APIs to keep that option open.
