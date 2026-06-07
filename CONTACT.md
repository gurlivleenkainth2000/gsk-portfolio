# Contact form setup

The contact page (`/contact`) posts to `app/api/contact/route.ts`, which sends
the message through [Resend](https://resend.com). Three env vars drive it:
`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` (see `.env.example`).

## 1. Resend account + API key

1. Sign up at <https://resend.com> (free tier: 3,000 emails/mo, 100/day).
2. Create an API key under **API Keys** → copy it into `RESEND_API_KEY`.

## 2. Verify `gurlivleen.dev` as a sending domain (Cloudflare DNS)

Resend will not let you send from `contact@gurlivleen.dev` until the domain is
verified. Your DNS is on Cloudflare, so:

1. In Resend → **Domains** → **Add Domain** → enter `gurlivleen.dev`.
2. Resend shows DNS records to add (an `MX` + `TXT` for the bounce subdomain,
   and `TXT` records for **DKIM** and **SPF**).
3. In the Cloudflare dashboard → **DNS** → add each record exactly as shown.
   Set those records to **DNS only** (grey cloud), not proxied.
4. Back in Resend, click **Verify**. Propagation is usually minutes.

Once verified, set `CONTACT_FROM_EMAIL="Portfolio Contact <contact@gurlivleen.dev>"`.

## 3. Receive replies at `contact@gurlivleen.dev` (Cloudflare Email Routing)

Sending and receiving are separate. To actually receive mail at that address
(and reply from it):

1. Cloudflare dashboard → **Email** → **Email Routing** → enable it.
2. Add a route: `contact@gurlivleen.dev` → forward to your Gmail.
3. (Optional) In Gmail, **Settings → Accounts → Send mail as** to reply from it.

Cloudflare Email Routing adds its own `MX`/`TXT` records — keep them alongside
the Resend ones.

## 4. Local development

```bash
cp .env.example .env.local   # then fill in the three values
npm run dev
```

Until the domain is verified, Resend only lets you send to your own account
email. Use that address in `CONTACT_TO_EMAIL` for the first test.

## 5. Production (Firebase App Hosting)

Do **not** commit real keys. Store them as secrets and reference them from
`apphosting.yaml`:

```bash
firebase apphosting:secrets:set gsk-portfolio-resend-api-key
```

```yaml
# apphosting.yaml
env:
  - variable: RESEND_API_KEY              # env var the app reads
    secret: gsk-portfolio-resend-api-key  # Secret Manager resource name
  - variable: CONTACT_FROM_EMAIL
    value: "Portfolio Contact <contact@gurlivleen.dev>"
  - variable: CONTACT_TO_EMAIL
    value: contact@gurlivleen.dev   # forwarded to Gmail via Cloudflare routing
```

## Spam protection

The form includes a hidden honeypot field (`company`). If a bot fills it, the
API returns `200` but sends nothing — so bots get no signal that they failed.
For higher volume, add Cloudflare Turnstile later.
