# Pricing, Checkout & Signup — Rebuild Spec

This is a behavior/data spec, not an implementation guide — no JSX, no CSS. It exists so the pricing → checkout → signup flow can be rebuilt from scratch in a new repo without re-deriving the business rules, which are the actual hard-won part of this feature. The current implementation (`components/PricingPage.tsx`, `components/CheckoutModal.tsx`, `components/StarterSignupModal.tsx`, `components/EmbeddedCheckoutClient.tsx`, `app/api/checkout`, `app/api/signup/starter`, `app/api/pricing`) can be used as a reference for exact wording if needed, but should not be copy-pasted — its inline-style approach is exactly what's being left behind.

## Source of truth

- **admin.krongage.io is the single source of truth for prices.** This site holds no hardcoded prices. `GET /api/pricing` proxies `admin.krongage.io/api/pricing/plans` server-side (bearer-authed with `WEBHOOK_SECRET`), revalidated every 60s, so the pricing page's first paint already reflects admin-set prices.
- If admin is unreachable, plans render without a price (`—`), never a stale cached number.
- Plan *content* (name, tagline, feature list, CTA copy) is static/hardcoded in the frontend; only *prices* are live from admin.

## The four plans

| id | name | free | enterprise | featured | CTA | CTA behavior |
|---|---|---|---|---|---|---|
| `starter` | Free | yes | no | no | "Get Started Free" | Opens the **Starter signup modal** (no payment) |
| `growth` | Growth | no | no | yes ("Most Popular" badge) | "Start Growth Plan" | Opens the **Checkout modal** |
| `professional` | Professional | no | no | no | "Start Professional Plan" | Opens the **Checkout modal** |
| `enterprise` | Enterprise | no | yes | no | "Contact Sales" | Links to `/contact` — never goes through checkout |

Each plan has a static feature list (bullet points) and the comparison table has its own separate row data (`COMPARISON_ROWS` in the current code) — both are marketing copy, reproduce from the current `PricingPage.tsx` verbatim if keeping the same plan structure, or rewrite for the new product positioning.

## Price fields (from admin, per plan)

```
monthlyPrice          number | null   — headline "/mo" figure, monthly billing
annualPrice           number | null   — DEPRECATED, superseded by annualPricePerMonth
annualPricePerMonth   number | null   — headline "/mo" figure when annual is selected
annualTotal           number | null   — what Stripe actually charges for the year
trialDays             number | null   — free-trial length; falls back to 14 if omitted
currency              string          — always "USD" today; no currency conversion anywhere
```

**Critical rule: `annualTotal` is never derived by multiplying `annualPricePerMonth × 12`.** Admin sends the exact figure because monthly-equivalent pricing doesn't multiply cleanly (e.g. $51.92/mo × 12 = $623.04, not the rounded $624 a naive display would show). A customer shown $624 and charged $623.04 doesn't notice; a customer shown $51.92 "per month" and then charged $623.04 in one shot without warning disputes it. Always compute and display the annual total from the field admin sends, and always state it explicitly in trial/checkout copy — never let a customer infer the annual charge from the monthly figure.

**Price formatting:** whole numbers render without decimals (`$59`), anything with cents renders with exactly two (`$623.04`, never `$623.1`).

## Free plan signup (`starter`)

No payment, no Stripe involvement at all.

1. Modal collects: firstName, lastName, email, company, phone (optional). All except phone are required.
2. `POST /api/signup/starter` with `{ user: {...} }`.
3. Server builds `{ user, plan: { id: 'starter', billing: 'monthly' }, timestamp, source: 'krongage-web' }`, signs it (`buildSecureHeaders`), and POSTs to the provisioning webhook (`WEBHOOK_URL` env var — **must** point at the provisioning endpoint, not the billing endpoint; the server actively guards against this misconfiguration and refuses to provision if `WEBHOOK_URL` looks like a billing URL).
4. Starter is provisioned **immediately** (`status=active`) since there's no payment step.
5. Success contract: `{ ok: true, tenant_id }`. A 200 without `tenant_id` is treated as a failure, not a success — don't send the welcome email or redirect on an ambiguous response.
6. On confirmed success: fire-and-forget a welcome email via Resend (`RESEND_API_KEY`), then redirect to `/signup/complete?plan=Starter&billing=free&type=free`.
7. **409 conflict** (already registered) is a *real user path*, not an error — render three possible reasons differently:
   - `active_account` — "you already have an account, sign in instead."
   - `subscription_inactive` — "your account exists but your plan lapsed; sign in to reactivate it yourself via the Customer Portal" (don't send a lapsed customer to a dead-end plain sign-in).
   - `duplicate_purchase` — admin's double-submit guard; render identically to `active_account`.
   - `login_url` in the 409 response is **opaque** — some variants carry a path. Redirect to exactly what the API returns; never reconstruct it from a base URL.

## Paid plan checkout (`growth`, `professional`)

Two modes, chosen by the `NEXT_PUBLIC_CHECKOUT_MODE` env var:

- **Redirect (default)** — form → `POST /api/checkout` (no `ui_mode`) → response has `{ url }` → `window.location.href = url` → Stripe-hosted checkout.stripe.com.
- **Embedded** (`NEXT_PUBLIC_CHECKOUT_MODE=embedded`) — form → `POST /api/checkout` with `ui_mode: 'embedded'` → response has `{ client_secret, publishable_key, session_id }` → stash in `sessionStorage` → navigate to our own `/checkout` route → mount Stripe's Embedded Checkout iframe there.

Default mode exists so a missing/mistyped env var fails back to the flow that's already proven, rather than silently breaking checkout.

**Why sessionStorage, not the URL, for the embedded handoff:** a client secret in a query string ends up in browser history, in any `Referer` header, and in analytics that record paths. `sessionStorage` is tab-scoped, survives a refresh of `/checkout`, and dies with the tab. Neither the client secret (single-session-scoped) nor the publishable key (publishable by definition) is a real secret — `WEBHOOK_SECRET` is the only real one, and it never leaves the server route.

Embedded-mode specifics:
- No `cancel_url` — the customer never leaves the site, so "cancelled" is an in-page state, not a redirect to `/signup/cancelled`.
- On completion, Stripe navigates to a `return_url` (`/signup/complete?session_id=…`), which is **not proof of payment** — provisioning happens off Stripe's webhook to admin, not off the customer reaching this page.
- Clear the stashed session `onComplete` (Stripe fires this just before navigating away), not on mount — so a mid-flow page refresh re-mounts the same live session instead of dead-ending, but a spent session doesn't linger to cause a confusing Stripe expiry error on a later visit.

### Checkout form

Collects: firstName, lastName, email, company, phone (optional) — identical shape/rules to the Starter modal, so one shared schema/validation can serve both.

### Trial & charge copy (get this exact — it's the part that prevents chargebacks)

- The trial length is `trialDays` from admin, falling back to 14 if omitted.
- State explicitly, in one place: **"Start your N-day free trial ($0 today)"**, that a card is required, the date the trial ends, and the *exact* amount charged then — **on annual, that's `annualTotal` (the full year), never the "/mo" figure** shown elsewhere on the same screen. Compute the trial-end date as `today + trialDays` and format it as a full date (e.g. "12 August 2026"), not a relative "in 14 days."
- The self-serve plan IDs (`growth`, `professional` today) are enforced server-side — the checkout API rejects any plan id not on that allowlist. No amount, currency, or price ID is ever sent from the browser; the server resolves the Stripe Price from the plan ID against admin's live catalog. This is what makes it impossible for a tampered request to buy a higher plan at a lower price, and why the checkout route needs no separate amount-verification step.

### 409 conflict (paid checkout)

Same shape as Starter's, but only two reasons (no `duplicate_purchase` here): `active_account` and `subscription_inactive`, same UX treatment as above.

## Server-side contract notes (for whoever builds the new backend proxy)

- `POST /api/checkout` is a thin, server-only proxy to `admin.krongage.io/api/billing/checkout-session`, authenticated with `WEBHOOK_SECRET` as a bearer token. This must never be callable from client-side code directly — the secret can't reach the browser.
- Timeout the upstream call (15s is what's used today) and fail into a visible "try again" state rather than leaving a spinner running forever — a hung admin host shouldn't look like a frozen page.
- A 200 response without the fields the current mode needs (`url` for redirect, `client_secret`+`publishable_key` for embedded) is treated as an upstream failure (502), not forwarded as success — never redirect a browser to `undefined`.
- 429 from upstream → pass through as 429 with a generic rate-limit message.
- Any other non-2xx/non-409 → generic "could not start checkout" message to the customer; log the real status/body server-side. None of those cases (bad payload, secret mismatch, admin misconfigured) are the customer's fault or something they can fix by retrying differently.

## Environment variables involved

| Var | Used by | Purpose |
|---|---|---|
| `WEBHOOK_SECRET` | `/api/checkout`, `/api/pricing` | Bearer auth to admin's billing/pricing endpoints |
| `WEBHOOK_URL` | `/api/signup/starter` | Provisioning webhook — must be the `/provision/signup` endpoint, not a billing endpoint |
| `RESEND_API_KEY` | `/api/signup/starter` | Welcome email after confirmed Starter provisioning |
| `NEXT_PUBLIC_CHECKOUT_MODE` | client + `/api/checkout` | `'embedded'` opts into the embedded flow; anything else (including unset) is the redirect flow |
| `NEXT_PUBLIC_APP_URL` | both signup paths | Fallback login URL when a 409 response omits one |

## What NOT to carry over

- The inline-`style={{}}` presentation layer in every current component — rebuild on the new design system (see `DESIGN-SYSTEM.md`).
- Any hardcoded price — always fetch live.
