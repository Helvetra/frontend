# Helvetra Frontend

Web app and marketing site for [Helvetra](https://helvetra.ch), a privacy-first Swiss translation app.

The same Nuxt app serves both the translation tool and the marketing/SEO pages (landing, pricing, FAQ, about, comparison articles, the `/developers` B2B surface, etc.).

## Features

### Translation UI
- Real-time auto-translate with debouncing
- Auto-detect source language, with abstain logic when target language is a close runner-up to avoid wrong-language flips on short text
- Swiss German dialect selector (Zurich, Bern, Basel, Luzern, St. Gallen, Wallis)
- Formality toggle (du/Sie, tu/vous, tu/Lei)
- Like/dislike feedback with optional comment

### Accounts
- Email + password registration
- Sign in with Apple
- HttpOnly+Secure+SameSite=Strict refresh-token cookies — never stored in `localStorage`
- Silent session restore on page reload via `/refresh`
- CSRF protection via `csrf_token` cookie + `X-CSRF-Token` header on cookie-authenticated requests

### B2B (`/developers`)
- API landing page with pricing table and code examples
- Customer dashboard with plan status, usage progress bar, API key management (create/rotate/revoke with one-time plaintext display), and Stripe Customer Portal link
- Public API quickstart at `/developers/docs` (the OpenAPI Swagger/ReDoc lives on the backend)

### Marketing & SEO
- Comparison articles: vs DeepL, vs Google Translate, vs Supertext, best translation apps in Switzerland, Swiss German tools
- About, FAQ, Pricing, Privacy, Terms, Support, Impressum
- Schema.org JSON-LD (Organization, WebSite, Service, BreadcrumbList)
- Full hreflang setup (de-CH, fr-CH, it-CH, en-GB, x-default) via `@nuxtjs/i18n`
- Auto-generated sitemap with transactional pages excluded
- Open Graph + Twitter Card metadata

### Internationalisation
- Four UI locales: English, Deutsch, Français, Italiano
- Strategy: `prefix_except_default` (English at `/`, others at `/de`, `/fr`, `/it`)

### Privacy
- Self-hosted Matomo (cookieless, IP-anonymised, Do-Not-Track honoured) at `analyze.helvetra.ch`
- No third-party trackers or analytics SDKs

## Tech Stack

- **Framework:** Nuxt 3 / Vue 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** @nuxtjs/i18n
- **Sitemap:** @nuxtjs/sitemap
- **Language detection:** franc (client-side, abstains on ambiguity)
- **Auth:** JWT access token (memory) + HttpOnly refresh-token cookie + CSRF header
- **Payments:** Stripe Checkout + Customer Portal (redirected from the backend)
- **Analytics:** Self-hosted Matomo via a client-only plugin

## Setup

```bash
# Requires Node 22+
nvm use 22
npm install

# Configure
cp .env.example .env
# Set NUXT_PUBLIC_API_BASE to your backend URL.
# Optional: NUXT_PUBLIC_MATOMO_URL + NUXT_PUBLIC_MATOMO_SITE_ID to enable
# tracking (left blank = no tracking).

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Lint
npm run lint
```

## Project Structure

```
app/
├── app.vue
├── components/         # Reusable UI components
├── composables/        # useAuth, useTranslation, useFeedback, ...
├── layouts/
├── middleware/         # Route middleware (auth)
├── pages/              # File-based routing
│   ├── compare/        # Comparison/SEO articles
│   ├── developers/     # B2B surface (landing, dashboard, docs)
│   └── pricing/
├── plugins/            # auth.client.ts, matomo.client.ts
└── assets/css/

i18n/
└── locales/            # en.json, de.json, fr.json, it.json
```

## Deployment

The app runs as a non-root container in production behind nginx. The same image serves both the translation tool and the marketing pages — they share the Nuxt build. See the parent project's infra repo for the Docker Compose stack.

## License

MIT
