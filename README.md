# Helvetra Frontend

Web application and marketing site for [Helvetra](https://helvetra.ch), a privacy-first Swiss translation app.

## Features

- Translation UI with real-time auto-translate (300ms debounce)
- Swiss German dialect selector
- Formality toggle (du/Sie, tu/vous, tu/Lei)
- Language auto-detection
- User accounts with Sign in with Apple
- Subscription management with Payrexx payments
- Marketing pages (landing, about, pricing, FAQ, comparisons)
- Full i18n support (EN, DE, FR, IT)
- SEO optimized with Schema.org structured data

## Tech Stack

- **Framework:** Nuxt 3 / Vue 3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** @nuxtjs/i18n
- **Auth:** JWT with cookie-based sessions

## Setup

```bash
# Requires Node 22+
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
```

## Environment

```bash
cp .env.example .env
# Set NUXT_PUBLIC_API_BASE to your backend URL
```

## License

MIT
