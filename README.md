# KronGage Landing

Marketing site and self-serve signup/billing flow for **KronGage**, an enterprise AI customer engagement platform by Krontiva.

Built with [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The dev server uses Turbopack and supports hot reload.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment Variables

Create a `.env.local` file for the API routes that need them:

| Variable | Used by |
|----------|---------|
| `RESEND_API_KEY` | Contact form and starter signup emails |
| `WEBHOOK_SECRET` | Checkout/pricing webhook signature verification |
| `WEBHOOK_URL` | Starter signup webhook forwarding |
| `NEXT_PUBLIC_APP_URL` | Absolute URLs for checkout/signup redirects |
| `MTLS_CLIENT_CERT`, `MTLS_CLIENT_KEY` | Mutual TLS client for provisioning API calls |
| `KEYCLOAK_TOKEN_URL`, `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET` | Keycloak service-account token for provisioning |

None of these are required to browse the marketing pages — only the checkout, signup, and contact API routes depend on them.

## Project Structuree

See [STRUCTURE.md](./STRUCTURE.md) for the full directory layout, page map, and component inventory.

Integration handoff docs (Stripe, Paystack, provisioning API, design system) live in [docs/](./docs).
