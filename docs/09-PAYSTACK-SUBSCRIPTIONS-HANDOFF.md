# krongage.io → Paystack Subscriptions — Checkout Handoff

_Added 2026-07-15. Prerequisite for recurring billing + monthly non-payment suspension
([../gating/BILLING-RENEWAL-SUSPENSION.md](../gating/BILLING-RENEWAL-SUSPENSION.md))._

> **STATUS (2026-07-15): subscriptions are created SERVER-SIDE** in `provisioning-api`
> (on the first `charge.success`, using the reusable card authorization) — see
> `BILLING-RENEWAL-SUSPENSION.md §1a`. The plan-code approach below is the alternative and
> is NOT used. **The one checkout change still required is for the FREE-TRIAL model —
> see §0 below.**
>
> ## 0. Free-trial checkout change (REQUIRED for the chosen 14-day free-trial model)
>
> Decision (2026-07-16): paid signups get a **free 14-day trial — no charge at signup,
> first charge on day 14**. Paystack only issues a reusable card authorization *after a
> successful charge*, so a true free trial needs the checkout to **tokenize the card with
> a small charge instead of charging the full plan price**:
>
> 1. At checkout, charge a **small tokenization amount** (e.g. GHS 1) instead of the full
>    plan price. (Refund it if you wish — the authorization persists.)
> 2. Relay the resulting `charge.success` as usual. It carries the reusable
>    `authorization` + `customer`, and a small `amount`.
>
> **Exact amount contract (agreed with the platform team 2026-07-16):** the tokenization
> charge is an **exact constant — GHS 1** (platform `BILLING_TOKENIZATION_GHS`, default 1).
> Both sides key off this:
> - **Checkout `verifyPaidAmount`:** accept **exactly the tokenization amount (GHS 1)** OR
>   **≈ full plan price**; **reject everything in between** (tampering).
> - **Platform (now also enforces this, defense-in-depth):** the signup endpoint verifies the
>   settled amount is `≤ GHS 1 (+GHS 1 tolerance)` OR `≥ 70% of full price` (70% floor
>   tolerates FX drift between checkout and verify); an in-between amount is **rejected (402)**.
>   So there are now **two independent amount guards** — a checkout bug can't silently
>   provision a full plan for a partial payment.
> - **Trial detection:** `maybeAutoSubscribe()` uses the same tokenization constant — charge
>   ≈ GHS 1 → **free trial** (`start_date` = signup + `trial_days`, first real charge day 14);
>   charge ≈ full price → charge-now (renew one period out).
>
> **No further platform change or signal is needed** — flip the checkout to the GHS 1
> tokenization and the trial model activates automatically; until then the current
> full-charge checkout keeps working as charge-now (no double-billing either way).

## Why this exists

The KronGage platform's billing lifecycle (past_due → suspended, reconciler backstop)
**reacts to Paystack subscription events**. Those events only fire if a real Paystack
**subscription** is created at checkout. Today the krongage.io checkout does a **one-time
charge** (`PaystackCheckout.tsx` passes `amount` but **no `plan`/`plan_code`**), so:

- Paystack never attempts a month-2 charge,
- `invoice.payment_failed` / `subscription.disable` never fire,
- monthly billing and suspension **cannot happen**.

Verified two ways: the checkout code has no `plan_code`, and `GET /subscription` on the
Paystack account returns **0 subscriptions**.

## Platform side — DONE, no changes needed

`gw-provisioning` already handles the full subscription lifecycle (webhook +
daily reconciler). Once real subscriptions exist, it works with **zero further code
changes**. Events it acts on:

| Paystack event | Platform action |
|---|---|
| `subscription.create`, `charge.success`, `invoice.payment_succeeded` | activate (+ capture `subscription_code`) |
| `invoice.payment_failed` | past_due (grace = `BILLING_GRACE_DAYS`, default 3) |
| `subscription.disable`, `subscription.not_renew` | suspend |

## What krongage.io must do

### 1. Create Paystack Plans (one-time setup, per mode)

Create a Plan per billable tier × cadence. Prices come from the **live catalog** (source
of truth), not hard-coded:

| Tier | Monthly | Annual (−12%) | Trial |
|---|---|---|---|
| Growth | $59/mo | $623.04/yr | 14 days |
| Professional | $129/mo | $1,362.24/yr | 14 days |

`POST https://api.paystack.co/plan` with `{ name, amount, interval: "monthly"|"annually", currency }`.
Keep the returned `plan_code` per tier×cadence.

> **⚠️ Finance decision required — fixed amount + currency.** A Paystack Plan has a
> **fixed** `amount` + `currency`. The current one-time checkout converts USD→GHS *live at
> checkout*; a subscription **cannot** do per-charge FX. Decide either (a) bill the
> subscription in **USD** (if the Paystack account supports USD charges), or (b) fix a
> **GHS** amount per plan and accept it drifts from USD as FX moves. This must be settled
> before creating live Plans.

### 2. Pass the plan code at checkout + defer the first charge to trial-end

In `PaystackCheckout.tsx`, add `plan` to the config (that alone makes Paystack create a
subscription instead of a one-time charge), and start it after the 14-day trial so the
**first charge is at trial end**, then recurs each period:

```ts
const config = {
  reference, email, publicKey, currency: 'GHS',
  plan: PLAN_CODE_FOR[tier][cadence],           // ← the ONE change that flips it to a subscription
  start_date: new Date(Date.now() + 14 * 864e5).toISOString(), // first charge at trial end
  metadata: { custom_fields: [...] },
};
```

(With `plan` set, `amount` is taken from the Plan — don't also send a conflicting amount.)

### 3. Keep relaying webhooks (already in place)

Continue forwarding Paystack's events (signature preserved) to
`POST https://admin.krongage.io/api/billing/paystack/webhook`. No change — the platform
already consumes the subscription events listed above.

## Signup payload (optional nicety)

`POST /provision/signup` still works unchanged (it verifies the one-time trial/first
transaction reference). The platform captures the `subscription_code` automatically from
the first `subscription.create`/`charge.success` webhook, so no signup-payload change is
required. If convenient, krongage.io MAY include `paystack.subscription_code` in the
signup body and we can persist it immediately.

## Test recipe (Paystack test mode)

1. Create test-mode Plans (step 1) → get `plan_code`s.
2. Point the checkout at a test plan code + deploy the `plan` change.
3. Run a test signup → confirm a subscription appears: `GET /subscription`.
4. In the Paystack dashboard, use a test card that fails renewal (or disable the
   subscription) → confirm the tenant flips to `past_due`/`suspended` in the admin console
   Billing view + event log, and recovers on a successful charge.

The platform's `POST /admin/billing/reconcile` (admin console → Billing → **Run
reconciliation**) will then scan the live subscription and report real status.
