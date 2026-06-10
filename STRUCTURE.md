# KronGage Web — Site Structure

Static multi-page marketing site for KronGage, an enterprise AI customer engagement platform by Krontiva. No framework, no build tool — pure HTML, CSS, and vanilla JS, deployed via Vercel.

---

## Directory Layout

```
kronGage web/
├── index.html                    # Homepage
├── about.html / about/           # About page (duplicate entry points)
├── contact.html / contact/       # Contact page
├── solutions.html / solutions/   # Solutions overview + industry sub-pages
├── platform.html / platform/     # Platform overview + feature sub-pages
├── blog/                         # Blog listing + articles
├── assets/                       # Component library — all embedded widgets
├── privacy-policy/               # Legal
├── terms-of-service/             # Legal
├── data-protection/              # Legal
├── sitemap/                      # HTML sitemap
├── Krongage-Logo.png             # Brand logo
├── hero-video.mp4                # Homepage hero background video
├── vercel.json                   # Vercel deployment config
└── STRUCTURE.md                  # This file
```

> **Note:** Several pages have both a root `.html` file and a matching `/directory/index.html`. The directory form is the canonical URL; the `.html` root files are legacy and may be removed.

---

## Page Map

### Top-Level Pages

| URL | File | Description |
|-----|------|-------------|
| `/` | `index.html` | Homepage — hero video, orbit animation, features, stats, CTA |
| `/about/` | `about/index.html` | Company overview, team, mission |
| `/contact/` | `contact/index.html` | Contact form and office details |

### Platform Pages

| URL | File | Description |
|-----|------|-------------|
| `/platform/` | `platform/index.html` | Platform overview hub |
| `/platform/customer-data/` | `platform/customer-data/index.html` | Customer 360 feature |
| `/platform/omnichannel-inbox/` | `platform/omnichannel-inbox/index.html` | Omnichannel inbox — dark gradient hero |
| `/platform/campaign-management/` | `platform/campaign-management/index.html` | Campaign management |
| `/platform/ai-automation/` | `platform/ai-automation/index.html` | AI & automation — dark gradient hero |
| `/platform/social-media/` | `platform/social-media/index.html` | Social media management |
| `/platform/social-intelligence/` | `platform/social-intelligence/index.html` | Social listening & analytics |
| `/platform/analytics/` | `platform/analytics/index.html` | Analytics & BI |
| `/platform/security/` | `platform/security/index.html` | Security & compliance |

### Solutions Pages

| URL | File | Description |
|-----|------|-------------|
| `/solutions/` | `solutions/index.html` | Solutions hub — dark hero, industry cards, tab previews |
| `/solutions/banking/` | `solutions/banking/index.html` | Banking & Finance |
| `/solutions/telecom/` | `solutions/telecom/index.html` | Telecommunications |
| `/solutions/fmcg/` | `solutions/fmcg/index.html` | FMCG & Retail |
| `/solutions/healthcare/` | `solutions/healthcare/index.html` | Healthcare |
| `/solutions/insurance/` | `solutions/insurance/index.html` | Insurance — embeds `insurance-360.html` widget |
| `/solutions/government/` | `solutions/government/index.html` | Government & Public Sector |

### Blog

| URL | File | Description |
|-----|------|-------------|
| `/blog/` | `blog/index.html` | Blog listing — featured article + sidebar posts |
| `/blog/retention-gap/` | `blog/retention-gap/index.html` | Article: "The Retention Gap: Why Success Teams Struggle" |

### Legal & Utility

| URL | File |
|-----|------|
| `/privacy-policy/` | `privacy-policy/index.html` |
| `/terms-of-service/` | `terms-of-service/index.html` |
| `/data-protection/` | `data-protection/index.html` |
| `/sitemap/` | `sitemap/index.html` |

---

## Component Library — `/assets/`

All animated UI widgets live in `assets/`. They are self-contained HTML files (no external dependencies) designed to be embedded as `<iframe>` elements in page hero sections or feature blocks. Browse them all at `/assets/` (component library index).

### Dashboard Views

| File | Description |
|------|-------------|
| `dashboard-demo.html` | Full platform dashboard — 9 switchable views (Inbox, Social Publishing, Campaigns, Social Intelligence, Customer 360, Knowledge, Settings, Usage) |

### Industry Heroes — embedded in solution page heroes

| File | Used In | Description |
|------|---------|-------------|
| `hero-banking.html` | `/solutions/banking/` | Transaction alerts, balance cards, notification feed |
| `hero-telecom.html` | `/solutions/telecom/` | Subscriber portal, data bundle, recharge prompts |
| `hero-fmcg.html` | `/solutions/fmcg/` | Loyalty points, promo campaigns, purchase journey |
| `hero-healthcare.html` | `/solutions/healthcare/` | Appointment reminder chat, confirmation CTA |
| `hero-insurance.html` | `/solutions/insurance/` | Policy onboarding card, shield animation, progress bar |
| `hero-government.html` | `/solutions/government/` | CitizenConnect portal, permit status, tax deadline feed |

### Industry Widgets — embedded in solution page feature sections

| File | Used In | Description |
|------|---------|-------------|
| `insurance-360.html` | `/solutions/insurance/` | **360° Policyholder Identity** — interactive orbit widget. 5 nodes (Claims, Telematics, Support, Billing, Behavioral) orbit a center profile node. Cycles through 3 policyholder profiles (Sarah Chen / Marcus Webb / Aisha Okafor) with predictive health pills. Clickable nodes switch the live feed panel. Light mode. |

### Platform Feature Heroes — embedded in platform page heroes

| File | Used In | Description |
|------|---------|-------------|
| `hero-chatbot.html` | `/platform/ai-automation/` | AI chatbot conversation with typing indicators |
| `hero-channels.html` | `/platform/omnichannel-inbox/` | 8 channel chips orbiting KronGage hub with SVG connectors |

### Platform Feature Demos — embedded in platform feature sections

| File | Used In | Description |
|------|---------|-------------|
| `inbox-demo.html` | `/platform/omnichannel-inbox/` | Live inbox with multi-channel conversations, agent routing |
| `social-publishing.html` | `/platform/social-media/` | Content scheduler, channel selector, engagement preview |
| `social-media-mgmt.html` | `/platform/social-intelligence/` | Brand monitoring, sentiment analysis, mention tracking |
| `knowledge-base.html` | `/platform/` | RAG-powered knowledge base, doc management, self-service |
| `security-demo.html` | `/platform/security/` | SSO, MFA, RBAC controls, audit log feed |
| `analytics-bi.html` | `/platform/analytics/` | BI dashboard, KPI cards, custom report builder |
| `campaign-management.html` | `/platform/campaign-management/` | Journey builder, audience targeting, A/B test results |
| `customer-360.html` | `/platform/customer-data/` | Unified profiles, segmentation, timeline, intelligence scores |
| `channel-orbit.html` | `index.html` | Channels orbiting KronGage logo — homepage hero |
| `fragmented-tools.html` | `index.html` | Disconnected tools visualisation — problem section |

### Blog Graphics

| File | Used In | Description |
|------|---------|-------------|
| `blog-retention-gap.html` | `/blog/retention-gap/` | Abstract SVG line graph showing the "retention gap" — expected vs actual engagement paths with animated gap fill |

---

## Page Layout Pattern

Every marketing page follows the same structure:

```
<nav>          Sticky top nav — logo, links with mega-menus, "Get Started" CTA button
<main>
  <section.hero>            Dark gradient or light gradient hero with headline, subtext, CTA buttons
  <section.*>               2–5 content sections (use-cases, feature blocks, stats strip, etc.)
  <section.cta-section>     Dark CTA strip at the bottom
</main>
<footer>       4-column footer — brand + 3 link columns, legal strip
```

### Hero Variants

| Style | Background | Used On |
|-------|-----------|---------|
| Light | `linear-gradient(135deg, #EEF5FD, #f8fafc)` | Most solution/platform pages |
| Dark | `linear-gradient(135deg, #0f172a, #0D47A1)` | `/platform/ai-automation/`, `/platform/omnichannel-inbox/`, `/solutions/` |
| Video | `hero-video.mp4` background | Homepage |

### Hero with Embedded Widget

Pages that embed a widget in the hero use a 2-column grid layout:

```html
<section class="hero">
  <div class="hero-layout">          <!-- grid: 1fr 1fr -->
    <div class="hero-text">…</div>
    <div class="hero-visual">
      <iframe src="/assets/[component].html" loading="lazy"></iframe>
    </div>
  </div>
</section>
```

### Mega Menu

Two mega menus — Platform (cols-3 layout) and Solutions (cols-3b layout):

- **Platform** (`cols-3`): Brand intro + Customer 360 / Inbox links | Feature rows | Channel rows
- **Solutions** (`cols-3b`): Industry list | Use cases | Blog article preview

The blog article preview in the Solutions mega menu links to `/blog/retention-gap/` and is present across all pages.

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary blue | `#0D47A1` | Buttons, links, accents |
| Dark navy | `#0f172a` | Dark hero backgrounds, footer |
| Light blue bg | `#EEF5FD` | Light hero backgrounds, icon fills |
| Sky accent | `#93c5fd` | Text on dark backgrounds |
| Body text | `#475569` | Paragraph text |
| Heading | `#0f172a` | Section headings |
| Border | `#e2e8f0` | Card borders, dividers |
| Font | Manrope (800/700/600/500) | All pages |

---

## Deployment

Deployed on Vercel. Config in `vercel.json` — static site, no rewrites required. Push to `main` triggers automatic deployment.
