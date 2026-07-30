# krongage.io — Stripe Checkout Handoff (replaces the Paystack build)

> **Audience:** the krongage.io (marketing / front-door) team.
> **Added 2026-07-29.** This **replaces** [05-KRONGAGE-IO-HANDOFF.md](./05-KRONGAGE-IO-HANDOFF.md)
> and [09-PAYSTACK-SUBSCRIPTIONS-HANDOFF.md](./09-PAYSTACK-SUBSCRIPTIONS-HANDOFF.md) for the paid
> signup flow. Everything Paystack-related in those two docs is obsolete.
> **Background (optional reading):** [11-STRIPE-MIGRATION.md](./11-STRIPE-MIGRATION.md).

---

## TL;DR

**Your side gets dramatically smaller.** You are deleting roughly everything you built for
Paystack and replacing it with one API call and a redirect.

```
BEFORE (Paystack)                         AFTER (Stripe)
─────────────────                         ──────────────
PaystackCheckout.tsx (inline SDK)     →   ✂ delete
GET /api/exchange-rate (USD→GHS)      →   ✂ delete
amount = usd × rate × 100 (pesewas)   →   ✂ delete
TOKENIZATION_GHS constant             →   ✂ delete
verifyPaidAmount() guard              →   ✂ delete
/api/paystack/webhook (provision      →   ✂ delete
   + relay, in the right order)
plan → plan_code mapping              →   ✂ delete
Paystack public key on Vercel         →   ✂ delete (no payment key at all now)

                                          ✅ POST for a checkout URL, then redirect
                                          ✅ two return pages
                                          ✅ keep reading GET /api/pricing/plans
```

**You will not hold a Stripe key of any kind.** Payment pages are hosted by Stripe; we create the
session server-side. Nothing secret lives on Vercel anymore.

> ⏳ **Status:** the endpoint in §2 is **not deployed yet** — it's next in our build queue. Read
> this now, plan against it, but **don't delete your Paystack code until we confirm cutover**
> (§7). We'll tell you the day it's live in test mode.

---

## 1. Confirmed pricing (2026-07-29)

These are final and now match our live catalog. The **$5,000 / $6,000** figures in the older docs
were stale — **ignore them.**

| Plan id | Display | Monthly (USD) | Annual (12% off) | Trial | Self-serve |
|---|---|---|---|---|---|
| `starter` | Starter | **$0** | $0 | — | yes, no payment |
| `growth` | Growth | **$59 / mo** | **$623.04 / yr** ($51.92/mo equiv.) | 14 days | **yes — via you** |
| `professional` | Professional | **$129 / mo** | **$1,362.24 / yr** ($113.52/mo equiv.) | 14 days | **yes — via you** |
| `enterprise` | Enterprise | Custom | Custom | — | no — contract-sold |

**Currency is USD, everywhere.** Our Stripe account is US-registered and charges in USD. There is
**no more currency conversion** — no FX call, no GHS, no pesewas, no `amount` arithmetic on your
side at all. Display USD, charge USD.

**Still don't hardcode them.** Keep reading `GET /api/pricing/plans` so an admin price change in
our console flows to your page with no redeploy (§4). The only thing that changed is that the
numbers are smaller and there's no conversion step.

---

## 2. The one endpoint you call

```http
POST https://admin.krongage.io/api/billing/checkout-session
Authorization: Bearer <WEBHOOK_SECRET>
Content-Type: application/json
```

```json
{
  "plan": { "id": "growth", "billing": "monthly" },
  "user": {
    "firstName": "Ama",
    "lastName":  "Mensah",
    "email":     "ama@acme.com",
    "company":   "Acme Ltd",
    "phone":     "+233201234567"
  },
  "source": "krongage-web"
}
```

| Field | Required | Notes |
|---|---|---|
| `plan.id` | ✅ | `growth` \| `professional` only. `starter` uses §3; `enterprise` is not self-serve. |
| `plan.billing` | ✅ | `monthly` \| `annual` |
| `user.email` | ✅ | **This becomes the login identity and the Stripe customer email.** Lowercase it. |
| `user.firstName`, `user.lastName` | ✅ | Used for the Keycloak user + welcome email |
| `user.company` | recommended | Becomes the workspace/tenant name; falls back to the person's name |
| `user.phone` | optional | Stored on the tenant |
| `source` | optional | Free-text, for our event log |

**Note there is no `amount`, no `currency`, and no `plan_code`.** We resolve the Stripe Price from
our live catalog ourselves. That's deliberate: it makes it impossible for a tampered browser
request to buy Professional at Starter prices, which is why the Paystack flow needed two separate
amount guards.

### Responses

| Status | Body | What you do |
|---|---|---|
| **200** | `{ "url": "https://checkout.stripe.com/c/pay/cs_test_…", "session_id": "cs_test_…" }` | `window.location.href = url` |
| 400 | `{ "error": "user.email and plan.id are required" }` / `{ "error": "plan 'x' is not self-serve" }` | Fix the request; show a generic form error |
| **409** | `{ "error": "email already has an account", "login_url": "https://web.krongage.io" }` | Show *"You already have a KronGage account — sign in instead"* + link. **Handle this one properly**, it's a real user path. |
| 401 | `{ "error": "unauthorized" }` | Wrong/missing `WEBHOOK_SECRET` |
| 429 | `{ "error": "Too many requests" }` | Rate limited per IP — back off |
| 503 | `{ "error": "billing not configured" }` | Our side is misconfigured; show "please try again shortly" and alert us |

> **Call this from your server, not the browser.** `WEBHOOK_SECRET` must never reach client-side
> JavaScript. A Next.js route handler / server action that proxies to us is the right shape.

The 409 is new and worth calling out: under Paystack, a repeat signup on an already-registered
email got **charged first** and was only caught afterwards as a probable duplicate needing a
refund. Now we catch it **before** any payment page is shown.

---

## 3. Free `starter` signup — unchanged

Exactly as today: a signed `POST /provision/signup` with `plan.id: "starter"` and **no payment
block**. Keep your existing HMAC signing for this one call.

```json
{
  "user": { "firstName": "…", "lastName": "…", "email": "…", "company": "…", "phone": "…" },
  "plan": { "id": "starter" },
  "timestamp": "2026-07-29T12:34:56.789Z",
  "source": "krongage-web"
}
```

Headers: `X-KronGage-Timestamp` (unix seconds, within 5 min) and
`X-KronGage-Signature: sha256=<HMAC-SHA256 of "${timestamp}.${rawBody}" keyed with WEBHOOK_SECRET>`.
Sign the exact bytes you send. Idempotent per email. Contract:
[04-PROVISIONING-SIGNUP-ENDPOINT.md](./04-PROVISIONING-SIGNUP-ENDPOINT.md).

**For paid plans you no longer call `/provision/signup` at all** — we call it ourselves from the
Stripe webhook.

---

## 4. Pricing display — unchanged

```http
GET https://admin.krongage.io/api/pricing/plans
Authorization: Bearer <WEBHOOK_SECRET>
```

```json
{ "plans": [
  { "id": "starter",      "monthlyPrice": 0,   "annualPrice": 0,   "currency": "USD" },
  { "id": "growth",       "monthlyPrice": 59,  "annualPrice": 52,  "currency": "USD" },
  { "id": "professional", "monthlyPrice": 129, "annualPrice": 114, "currency": "USD" }
] }
```

`annualPrice` is the **discounted monthly-equivalent** (show it as "×12, billed annually").
`enterprise` is omitted — render "Custom". Keep your local defaults for anything we don't send,
and keep treating a non-200 as "use my hardcoded fallback".

---

## 5. Two return pages you own

We set these server-side (configurable in our admin console), so you don't pass them in the
request — you just need the routes to exist. Confirm these exact paths or tell us different ones:

| Purpose | Default URL | What it should say |
|---|---|---|
| **Success** | `https://krongage.io/signup/complete` | *"Your account is being set up. Check your email — the address you signed up with — for your login details."* + a **Log in** button → `https://web.krongage.io` |
| **Cancelled** | `https://krongage.io/signup/cancelled` | *"No charge was made."* + a link back to pricing so they can retry |

Two things about the success page:

1. **Don't promise instant access.** Provisioning is driven by Stripe's webhook and normally
   completes in seconds, but it is asynchronous. "Check your email" is the correct message; "your
   workspace is ready, click here" is not.
2. **Don't treat landing here as proof of payment.** It's just a redirect — anyone can visit the
   URL. Payment truth lives in the webhook we receive. Don't unlock anything based on it.

---

## 6. What you must NOT do (carried over — these still bite)

1. **Do not send any welcome / "set your password" / account-created email.** We email the user a
   temporary password from `info@krontiva.com` and force a password change on first login. A
   second email from you means two conflicting messages.
2. **Do not build a password-creation screen.** You never collect or set passwords.
3. **Do not integrate the Stripe SDK, and don't ask us for a Stripe key.** Hosted Checkout only.
   If you think you need Stripe Elements or embedded Checkout, talk to us first — the redirect
   flow is deliberate.
4. **Keep `user.email` as the single source of identity.** It's the login, the Stripe customer
   email, and the key we match billing events on. Don't let a user type one email in your form and
   a different one on the Stripe page — Stripe Checkout is pre-filled from what you send us, so
   this is handled as long as you send the right value.
5. **Don't build a webhook handler.** Stripe talks to us directly now. If you still have
   `/api/paystack/webhook`, it gets deleted at cutover (§7).

## 6a. Free 14-day trial — how it actually behaves

Worth understanding so your copy is accurate:

- The customer **enters a card at signup** but is **charged $0**. Stripe shows this clearly on the
  Checkout page.
- The **first charge is on day 14**, automatically, at the plan price.
- If they cancel before day 14, they're never charged.

So your pricing page copy should be *"14-day free trial — card required, cancel anytime before day
14 and you won't be charged"*, **not** "no credit card required". The Paystack flow charged a
token GHS 1 to fake this; Stripe does it natively.

---

## 7. Cutover — don't delete anything yet

Both rails will briefly coexist. Sequence:

| Step | Who | What |
|---|---|---|
| 1 | us | Deploy the Stripe endpoints in **test** mode; we confirm to you |
| 2 | you | Build against §2 behind a flag/env, test with Stripe test cards (§8) |
| 3 | both | Joint end-to-end test on test keys |
| 4 | us | Switch our billing to Stripe **live** |
| 5 | you | Flip the flag → all new paid signups go through Stripe |
| 6 | you | **Then** delete the Paystack code (checkout component, FX call, webhook relay, keys) |
| 7 | us | Migrate the 2 existing paying tenants, retire Paystack |

**Keep your Paystack path working until step 5.** If Stripe checkout is broken at go-live we want
a one-flag rollback, and that only exists if you haven't deleted the old code.

Please also **don't remove the Paystack keys from your Vercel env** until we say step 7 is done.

---

## 8. Secrets

| Secret | Who holds it | Used for |
|---|---|---|
| `WEBHOOK_SECRET` | **both** — unchanged, same value you already have | Bearer token for `/billing/checkout-session`, `/pricing/plans`; HMAC key for the free-starter `/provision/signup` |
| Stripe keys | **us only** | You need none. |
| ~~Paystack secret / public key~~ | — | Retired at step 7 |

Before we go live with real money, the previously-agreed **M4** hardening still applies to your
server→our server calls: an IP allowlist of your Vercel egress ranges, plus optionally a Keycloak
client-credentials JWT. **Send us your current egress IP ranges** if they've changed since the
Paystack work.

---

## 9. Test recipe (Stripe test mode)

Once we confirm step 1:

1. `POST /billing/checkout-session` for `growth` / `monthly` → you get a `checkout.stripe.com` URL.
2. Open it, pay with **`4242 4242 4242 4242`**, any future expiry, any CVC, any postcode.
3. You land on `/signup/complete`. Within a few seconds the user gets our welcome email and can
   log in at `web.krongage.io`.
4. Cancel out of the Checkout page instead → you land on `/signup/cancelled`, no charge, no account.
5. Repeat step 1 with the **same email** → expect **409** with `login_url`. Render that state.
6. Card requiring 3-D Secure: **`4000 0000 0000 3220`** — Stripe handles the challenge in its own
   page; nothing extra from you.
7. Free tier: signed `/provision/signup` with `plan.id: "starter"` → instant active account.

We can watch each step land on our side (admin console → Billing → event log) and confirm in
real time, same as we did for the Paystack tests.

---

## 10. Questions we need answered

1. **Confirm the two return paths** in §5 (`/signup/complete`, `/signup/cancelled`) — or give us
   yours, and we'll configure them.
2. **Your Vercel egress IP ranges** (for the allowlist before live keys).
3. Any objection to the 200/409 contract in §2, or anything you need added to the response body
   for your UI.
4. Rough ETA for your side once we confirm step 1, so we can plan the joint test.

---

## 11. Summary of the whole flow

```
 you                                    us                                  Stripe
 ───                                    ──                                  ──────
 user picks Growth / monthly
 server → POST /billing/checkout-session ─▶ resolve Price from live catalog
   { plan, user }  Bearer SECRET           + stamp signup data in metadata
                                           + create/reuse Stripe Customer ──▶ create Checkout
                                                                               Session (14d trial)
 window.location = url ◀───── { url } ◀────┘                              ◀───┘
        │
        └──────────────────────────────────────────────────────────────────▶ hosted Checkout
                                                                            (card, $0 today, 3DS)
                                            ┌──────────────────────────────  checkout.session
                                            ▼                                 .completed
                                    provision: Keycloak user + tenant
                                    + modules + limits + welcome email
                                            │
 /signup/complete ◀──── redirect ───────────┘
 "check your email"

 day 14 onward: Stripe charges automatically; we handle renewals, dunning,
 past-due warnings and suspension. Nothing further from you, ever.
```

That last line is the point: after signup, **you are completely out of the billing path.**

---

## 12. Addendum — answers confirmed by admin, 2026-07-29

Transcribed from admin's replies to §10. Where this section disagrees with the text
above, **this section wins**. Admin's own copy of the doc now carries a §2a with the
full 409 contract — **request that file** rather than relying on this summary.

**Paystack is hard-stopped on both sides.** Admin made the same call we did: no
dual rail, no flag, `git revert` only. Do **not** re-point the Paystack dashboard
webhook — nothing on their side would process the events. They are disabling both
Paystack subscriptions at the dashboard so no charges land on an unmonitored rail.
The 2 remaining tenants are internal test accounts moving to Stripe wholesale, so
there is **no billing continuity to preserve**. Our relay is deleted permanently.

**`POST /billing/checkout-session` is still not deployed** — the 404 is expected.
Admin is blocked on their own Stripe test credentials, sequenced behind SDK/config,
a schema migration and price sync. They will confirm a firm date and ping us the day
it is live in test mode.

**Rate limiting was a defect, now fixed on their side.** It was 20 req/60s per IP,
which throttled our entire signup flow as a single client because we call
server-to-server. They are re-keying the checkout limiter on `user.email` with a
high per-IP ceiling as an abuse backstop only. Nothing for us to change.

**Exact prices — render the annual figure from `annualTotal`.** Double-rounding was
also a defect. `/api/pricing/plans` gains exact fields while keeping the old keys:

```json
{ "id": "growth", "currency": "USD",
  "monthlyPriceCents": 5900, "monthlyPrice": 59,
  "annualTotalCents": 62304, "annualTotal": 623.04,
  "annualPricePerMonth": 51.92, "trialDays": 14 }
```

Still **do not hardcode** — an admin price change must reach the page with no
redeploy. `src/lib/pricing.ts` and `mergeLivePlans` read the exact fields and fall
back to the rounded ones, so an out-of-order deploy degrades instead of breaking.

**The 409 has two states** (`login_url` is exact, and **opaque** — redirect to
whatever is sent; the inactive variant carries a path):

| `reason` | What we render |
|---|---|
| `active_account` | "You already have a KronGage account" → **Sign in** |
| `subscription_inactive` | "You already have a KronGage account, but your plan isn't active. Sign in to reactivate it — you can add a card and restart your plan yourself." → **Sign in to reactivate** |

Reactivation is fully self-serve, no sales contact. It depends on admin's Customer
Portal work, which is now a launch dependency rather than a follow-up.

**Return URLs confirmed.** Admin configures `/signup/complete` and
`/signup/cancelled` server-side and will likely append
`?session_id={CHECKOUT_SESSION_ID}` to the success URL **for support traceability
only** — never depend on it, and the redirect is never proof of payment. Nothing is
appended to the cancel URL.

**IP allowlist is not a blocker.** If Vercel Enterprise Secure Compute isn't
available, the Keycloak client-credentials JWT is sufficient alone — the allowlist
was defence-in-depth, and a short-lived JWT is strictly stronger than the static
shared secret we use today. `src/lib/keycloak-token.ts` already exists, unwired.

**The trial applies to BOTH cadences — and the annual copy must name the annual
total.** An annual trialist is charged **$623.04 / $1,362.24** on day 14, not a
monthly amount. State the figure and the date on the annual card: someone who
believes they are trialling a $51.92 plan and then sees $623.04 leave their account
will dispute it. Implemented in `PricingPage.tsx` (CTA note) and
`CheckoutModal.tsx` (header).

### 12a. Second round — verified by admin against live Stripe, 2026-07-30

**Welcome email.** The call existed but every failure was swallowed into a log
warning, so a customer who never received their temporary password looked identical
to a healthy signup. Now logged to the signup event log as `welcome_email_sent` /
`_failed` / `_skipped` — `_skipped` is legitimate and means the email already had a
Keycloak identity, so no password was issued. Still non-fatal by design. **Only a
completed checkout proves delivery.**

**Customer Portal is live** (`bpc_1Tyfl6…`, active + default): payment-method update,
cancel at period end, invoice history, and plan switch with prorations. So the
`subscription_inactive` reactivation path we render is real and self-serve.

**Duplicate purchase was a live double-charge bug, now fixed.** Idempotency was keyed
on session id, so two sessions for one email both provisioned — and because the
Customer is reused by email, the second session attached a *second active
subscription* plus an orphan workspace. Fixed in `/provision/signup` with a
`pg_try_advisory_lock` on the billing email (no unique index could catch it: the rows
carry different `billing_reference`s). A detected duplicate is refunded, cancelled,
tombstoned, and returns **409 `duplicate_purchase`**; the webhook treats that as
terminal. Proven live: `{ cancelled: true, refunded: 5900 }`.

> **Consequence for us:** `/provision/signup` can now answer **409**. We only call it
> for free `starter`, where `app/api/signup/starter/route.ts` currently maps any
> non-2xx to a generic 502 "Signup failed". A double-submit would show a failure
> instead of "you already have an account" — worth handling.

**Return URLs are NOT per-mode.** `success_url`, `cancel_url` and
`portal_return_url` are shared across test and live, unlike keys and prices. Pointing
test at a Vercel preview points **live** at it too. Harmless while live is inactive;
at go-live, someone must change it back or paying customers get redirected to a
preview deployment. Admin offered to scope them per mode — **we asked them to.**

**Merchant name is unset** — business name, statement descriptor and dashboard display
name are all null, which is why checkout renders "Server Room Test sandbox". That
string appears at checkout *and on bank statements*. Dashboard-only fix:
Settings → Business → Public details.

**Rate limiter is deployed and re-keyed:** 6/min per email, 300/min per IP as an abuse
backstop. Our 429 copy ("Too many attempts — please wait a moment") matches.

**JWT instead of the IP allowlist** (recommended — Vercel egress IPs drift):

- Token URL: `https://web.krongage.io/realms/krongage/protocol/openid-connect/token`
- `grant_type=client_credentials`, expected client `krongage-provisioning`
- `azp` is verified and the signature checked against Keycloak's JWKS
- Client secret is issued from Keycloak and sent out of band
- `ip_allowlist` and `require_jwt` are independent console toggles and compose

`src/lib/keycloak-token.ts` already implements the token fetch + cache but is unwired.
**Open question:** whether the JWT replaces the `WEBHOOK_SECRET` bearer or travels in
its own header alongside it.

**Still unproven end to end:** no hosted checkout has ever been completed — all 25
sandbox sessions are open. The duplicate guard's *trigger* is proven only by
construction, and welcome-email delivery is unproven. Both need one completed
checkout, which needs our pages deployed first (§12b).

### 12b. Blocker on our side, found 2026-07-30

None of the signup flow is in production. `main` contains no pricing page, no signup
pages and no API routes — it all lives on `preview/pricing`. Verified live:
`/signup/complete` returns **200 but serves the homepage**, `/signup/cancelled`
**404s**, and `POST /api/checkout` is absent. Until this branch is merged and
deployed, a completed Stripe checkout cannot land anywhere useful, because admin's
`success_url` points at production. Also confirm the production Vercel project has
`WEBHOOK_SECRET`, `WEBHOOK_URL` and `NEXT_PUBLIC_APP_URL` — no API route has ever run
on `main`, so they may only be set on the preview environment.
