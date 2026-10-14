# KronGage Web — Site Structure

Marketing site and self-serve signup/billing flow for KronGage, an enterprise AI customer engagement platform by Krontiva. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Deployed on Vercel.

---

## Directory Layout

```
krongageLanding/
├── app/                      # Next.js App Router — pages + API routes
│   ├── layout.tsx            # Root layout — renders shared <Nav /> and <Footer />
│   ├── page.tsx               # Homepage
│   ├── (marketing pages)/     # about, contact, platform/*, solutions/*, blog/*, legal, sitemap
│   ├── pricing/, checkout/, signup/   # Billing & signup flow
│   └── api/                   # Route handlers (checkout, contact, pricing, signup)
├── components/                # Shared React components
│   ├── Nav.tsx, Footer.tsx, Hero.tsx, DashboardDemo.tsx
│   ├── blog/                  # Animated graphics used on blog listing + articles
│   ├── solutions/             # Industry hero + demo widgets used on homepage + /solutions/*
│   └── platform/              # Feature demo widgets used on /platform/*
├── src/lib/                    # Server-side helpers (pricing, checkout sessions, webhook security, mTLS fetch)
├── public/
│   ├── assets/                 # Static images only (logos, screenshots)
│   └── Krongage-Logo.png, hero-video.mp4
├── docs/                       # Integration handoff docs (Stripe, Paystack, provisioning API)
├── vercel.json                 # Deployment config (clean URLs, no trailing slash)
└── STRUCTURE.md                 # This file
```

> There are no `.html` files anywhere in the source tree. Every page and every animated widget is a React component; nothing is embedded via `<iframe>`.

---

## Page Map

### Top-Level Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage — hero (`components/Hero.tsx`), problem section, platform features, industry tabs, live dashboard demo (`components/DashboardDemo.tsx`) |
| `/about` | Company overview, team, mission |
| `/contact` | Contact form (`components/ContactForm.tsx`) |
| `/sitemap` | HTML sitemap |

### Platform Pages

| URL | Feature |
|-----|---------|
| `/platform` | Platform overview hub |
| `/platform/customer-data` | Customer 360 |
| `/platform/omnichannel-inbox` | Omnichannel inbox |
| `/platform/campaign-management` | Campaign management |
| `/platform/ai-automation` | AI & automation |
| `/platform/social-media` | Social media publishing |
| `/platform/social-intelligence` | Social listening & analytics |
| `/platform/analytics` | Analytics & BI |
| `/platform/security` | Security & compliance |

### Solutions Pages

| URL | Industry |
|-----|----------|
| `/solutions` | Solutions hub — industry cards, tab previews |
| `/solutions/banking` | Banking & Finance |
| `/solutions/telecom` | Telecommunications |
| `/solutions/fmcg` | FMCG & Retail |
| `/solutions/healthcare` | Healthcare |
| `/solutions/insurance` | Insurance |
| `/solutions/government` | Government & Public Sector |

### Blog

| URL | Description |
|-----|-------------|
| `/blog` | Listing of published posts (featured + grid; empty state when none) |
| `/blog/[slug]` | Single published post, with a Share on LinkedIn button |

### Staff area (`/admin`, not indexed)

Posts live in a Neon Postgres database (Vercel Storage) and images in Vercel Blob. Staff sign in with email + password (`lib/blog/auth.ts`, signed cookie using `AUTH_SECRET`).

| URL | Description |
|-----|-------------|
| `/admin/login`, `/admin/change-password` | Sign in; first-login password change |
| `/admin` | Dashboard: my posts; admins also see the review queue and all posts |
| `/admin/posts/new`, `/admin/posts/[id]` | Rich-text editor, preview, review panel, history |
| `/admin/people` | Admin only: add people, set roles, reset passwords, deactivate |
| `POST /api/admin/upload` | Image upload to Vercel Blob (signed-in staff only) |

Workflow: Draft → In review → Published (or Changes requested → back to the writer). Everyone can write; only admins can approve/publish, and nobody can approve their own post. One-off setup (`scripts/blog-setup.mjs`) creates the tables and first accounts during a build, only when `BLOG_SETUP=1` is set (never on normal builds); accounts need `BLOG_SEED_PASSWORD`, and everyone must change it at first sign-in.

### Billing & Signup

| URL | Description |
|-----|-------------|
| `/pricing` | Plan comparison (`components/PricingPage.tsx`) |
| `/checkout` | Embedded Stripe Checkout (`components/EmbeddedCheckoutClient.tsx`) |
| `/signup/complete` | Post-signup landing |
| `/signup/cancelled` | Checkout-cancelled landing |

### Legal & Utility

`/privacy-policy`, `/terms-of-service`, `/data-protection`

### API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/checkout` | Creates a Stripe Checkout session |
| `POST /api/contact` | Handles the contact form submission |
| `GET /api/pricing` | Serves pricing data |
| `POST /api/signup/starter` | Free-starter plan signup (handles 409 on duplicate signup) |

---

## Component Library

Every animated widget that used to be a standalone `.html` file embedded via `<iframe>` is now a self-contained React component (own scoped CSS in a `<style>` tag, own `useEffect`-driven animation logic). They accept an optional `className` prop and fill `100%` of their parent's width/height.

### `components/solutions/`

| Component | Used In | Description |
|-----------|---------|-------------|
| `HeroBanking.tsx` | `/`, `/solutions/banking` | Shield/fraud-detection stat cards |
| `HeroTelecom.tsx` | `/`, `/solutions/telecom` | Phone mockup with feature grid |
| `HeroFmcg.tsx` | `/`, `/solutions/fmcg` | Customer profile → product recommendation → WhatsApp delivery sequence |
| `HeroHealthcare.tsx` | `/`, `/solutions/healthcare` | Patient appointment journey timeline |
| `HeroInsurance.tsx` | `/`, `/solutions/insurance` | Policy card + renewal reminder sequence |
| `HeroGovernment.tsx` | `/`, `/solutions/government` | CitizenConnect portal, cycling notifications |
| `AiTelecomSupport.tsx` | `/solutions/{banking,telecom,fmcg,healthcare,government}` | AI support resolution metrics, animated counters |
| `Customer360.tsx` | `/solutions`, `/solutions/{banking,telecom,fmcg,healthcare,government}`, `/platform`, `/platform/customer-data` | Rotating customer profile card with animated score bars |
| `InsuranceIdentity360.tsx` | `/solutions/insurance` | 360° Policyholder Identity — 5 orbit nodes around a center profile, cycles 3 policyholder profiles |

### `components/platform/`

| Component | Used In | Description |
|-----------|---------|-------------|
| `HeroChatbot.tsx` | `/`, `/solutions`, `/platform`, `/platform/ai-automation` | AI chatbot conversation with typing indicators |
| `HeroChannels.tsx` | `/solutions`, `/platform/omnichannel-inbox` | Channel chips orbiting a hub, animated SVG connectors |
| `InboxDemo.tsx` | `/platform` | Interactive multi-channel inbox — pick a conversation, send a message |
| `SocialPublishing.tsx` | `/platform`, `/platform/social-media` | Content calendar grid |
| `SocialMediaMgmt.tsx` | `/platform`, `/platform/social-intelligence` | Sentiment analysis tabs across channels |
| `KnowledgeBase.tsx` | `/platform` | Knowledge center cards + semantic chunk browser |
| `SecurityDemo.tsx` | `/platform`, `/platform/security` | Animated hex/security visual |
| `CampaignManagement.tsx` | `/`, `/solutions`, `/platform`, `/platform/campaign-management` | Team chips, campaign progress, filterable activity timeline |
| `AnalyticsBi.tsx` | `/platform/analytics` | Canvas-drawn engagement trend chart with range/segment selectors |

### Other shared components

| Component | Purpose |
|-----------|---------|
| `Nav.tsx` | Sticky top nav with Platform/Solutions mega-menus — rendered once in `app/layout.tsx` |
| `Footer.tsx` | 4-column footer |
| `Hero.tsx` | Homepage hero — orbiting channel icons |
| `DashboardDemo.tsx` | Full platform dashboard — 9 switchable views (Dashboard, Inbox, Social Publishing, Campaigns, Social Intelligence, Customer 360, Knowledge, Settings, Usage). Used once, on the homepage. |
| `PricingPage.tsx`, `CheckoutModal.tsx`, `EmbeddedCheckoutClient.tsx`, `StarterSignupModal.tsx`, `ContactForm.tsx` | Billing/signup and contact flows |

---

## Page Layout Pattern

Every marketing page follows the same structure:

```
<Nav />        Sticky top nav (from layout.tsx) — logo, links with mega-menus, "Start Free Trial" CTA
<main>
  <section.hero>            Light or dark gradient hero, headline, subtext, CTA buttons — often with an embedded demo component
  <section.*>                2–5 content sections (use-cases, feature blocks, stats strip, etc.)
  <section.cta-section>      Dark CTA strip at the bottom
</main>
<Footer />     4-column footer — brand + link columns, legal strip
```

### Hero Variants

| Style | Background | Used On |
|-------|-----------|---------|
| Light | `#EEF5FD` / light gradient | Most solution/platform pages |
| Dark | `linear-gradient(135deg, #0f172a, #0D47A1)` | `/platform/ai-automation`, `/platform/omnichannel-inbox`, `/solutions` |
| Video/animated | `hero-video.mp4` or `<Hero />`'s orbit animation | Homepage |

### Hero with an Embedded Demo Component

Pages that show a widget in the hero use a 2-column grid, with the widget rendered directly as a component (no iframe):

```tsx
<section className="hero">
  <div className="hero-layout">
    <div className="hero-text">…</div>
    <div className="hero-visual">
      <HeroBanking />
    </div>
  </div>
</section>
```

### Mega Menu

Two mega menus in `Nav.tsx` — Platform and Solutions:

- **Platform**: Overview + Customer 360 / Inbox links | Featured Capabilities | Featured Channels
- **Solutions**: Industry list | Featured highlight card

---

## Design Tokens

Defined in `app/globals.css` as CSS custom properties:

| Token | Value | Usage |
|-------|-------|-------|
| `--kg-blue` | `#0D47A1` | Buttons, links, accents |
| `--kg-blue-dark` | `#0a3680` | Button hover state |
| `--kg-navy` | `#0f172a` | Dark hero backgrounds, footer, body text color |
| `--kg-bg` | `#EEF5FD` | Light hero backgrounds, icon fills |
| Font | Manrope (500/600/700/800) | All pages |

---

## Deployment

Deployed on Vercel. Config in `vercel.json` (`cleanUrls: true`, `trailingSlash: false`). Push to `main` triggers automatic deployment. See `docs/` for the Stripe and Paystack billing integration handoffs and the provisioning-API signup endpoint spec.
