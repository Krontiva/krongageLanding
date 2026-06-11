# provisioning-api — `POST /provision/signup` (CORRECTED, canonical)

> **This supersedes** the earlier draft generated on the krongage.io side. That draft was
> topologically right but conflicts with the live system in several places that would make it
> **fail at the first DB insert**. This document is the version **both applications implement
> against** — krongage.io (sender) and provisioning-api (receiver).
>
> **For:** Backend dev on `provisioning-api` (port 4050) + the krongage.io webhook sender.
> **Date:** 2026‑06‑11 · **Companions:** 01-ARCHITECTURE.md, 02-MILESTONE-PLAN.md, 03-PRICING-UNDERSTANDING.md.

---

## 0. What was wrong with the draft (read first)

The draft was checked against the live code. These are the corrections this document bakes in:

| # | Draft said | Reality (verified in code) | Fix here |
|---|---|---|---|
| 1 | `plan.id` = `growth` / `professional` | Tenant CHECK was `starter\|growth\|enterprise`; migration 004 changed it to `free\|…`. **Neither allows `professional` + the canonical $0 tier is being set to `starter`.** | Canonical vocab is **`starter\|growth\|professional\|enterprise`**; ship the migration in §2 first. |
| 2 | INSERT uses `billing`, `owner_keycloak_id`, `paystack_reference` | **None of these columns exist** on `krongage.tenants`. | §2 migration adds them. |
| 3 | `modules_enabled` hardcoded as `["kronchat","social_publishing","ai_workflows",…]` | Real module IDs are `inbox / social / campaigns / analytics / customer360 / social-listening / knowledge / llm`. **There is no `social_publishing`, no `ai_workflows` (decommissioned 2026‑04‑10), no `kronchat` id.** | §4.2 stamps modules **from the catalog**, not a hardcoded list. |
| 4 | Prices `amount: 5000 / 6000` ambiguous | Engine seed already has Growth $5,000/mo, Professional $6,000/mo. | §1 fixes the amount semantics (cents). |
| 5 | Security = HMAC + timestamp + IP only | Architecture §7 / milestone **M4** require **mTLS + OAuth2 client‑credentials JWT (Keycloak)**. HMAC alone under‑secures the crown‑jewel endpoint. | §6 — HMAC is the interim floor; **prod is M4‑gated.** |
| 6 | Create Keycloak user `emailVerified:false`, no password | No way for the paid user to actually log in. | §4.1 sets a Keycloak **required action** (set‑password / verify‑email) email. |
| 7 | Endpoint exists | **It does not.** Only `/provision/tenant` exists, and it provisions **Knowledge unconditionally**. | §4 builds `/provision/signup` and **gates Knowledge/Listening off for hosted**. |

---

## 1. Incoming request

`krongage.io` → `POST /provision/signup` after a confirmed Paystack payment.

### Headers

| Header | Example | Purpose |
|---|---|---|
| `Content-Type` | `application/json` | Always JSON |
| `Authorization` | `Bearer <JWT>` | **OAuth2 client-credentials JWT from Keycloak** (M4 — see §6) |
| `X-KronGage-Signature` | `sha256=a3f9c2…` | HMAC-SHA256 over the raw body |
| `X-KronGage-Timestamp` | `1749123456` | Unix seconds — replay guard |
| `User-Agent` | `KronGage-Webhook/1.0` | Identification |

### Payload

```json
{
  "user": {
    "firstName": "Anderson",
    "lastName": "Mensah",
    "email": "anderson@acme.com",
    "company": "Acme Corp",
    "phone": "+233 20 000 0000"
  },
  "plan": {
    "id": "growth",
    "name": "Growth",
    "billing": "monthly"
  },
  "paystack": {
    "reference": "KG-growth-1749123456789",
    "status": "success",
    "amount": 500000,
    "currency": "USD"
  },
  "timestamp": "2026-06-08T12:34:56.789Z",
  "source": "krongage-web"
}
```

### Plan IDs you will receive

| `plan.id` | `plan.billing` | Monthly | Annual (12% off, **admin-editable**) | `paystack.amount` (cents) |
|---|---|---|---|---|
| `growth` | `monthly` | $5,000 | — | `500000` |
| `growth` | `annual` | — | $52,800/yr ($4,400/mo eq.) | `5280000` |
| `professional` | `monthly` | $6,000 | — | `600000` |
| `professional` | `annual` | — | $63,360/yr ($5,280/mo eq.) | `6336000` |

> `paystack.amount` is in the **smallest currency unit (cents)** — Paystack convention. `500000` = $5,000.00.
> The **annual discount is 12%**, and like every price it is **read from the catalog** (admin-editable in
> the Platform Admin Console), not hardcoded. All paid plans carry a **14‑day trial**.
>
> **`starter`** ($0) does **not** go through this endpoint — it has a separate no‑payment signup path
> (milestone M2). **`enterprise`** is contract-sold and never self-serve.

---

## 2. Prerequisite migration (must land before the endpoint can run)

The endpoint cannot insert a tenant until the schema is reconciled. Ship this **first**:

```sql
-- 015-saas-signup.sql — vocabulary rename + signup columns

-- (a) Canonical plan vocabulary: starter | growth | professional | enterprise
ALTER TABLE krongage.tenants DROP CONSTRAINT IF EXISTS tenants_plan_check;
UPDATE krongage.tenants SET plan = 'starter' WHERE plan = 'free';
ALTER TABLE krongage.tenants
  ADD CONSTRAINT tenants_plan_check
  CHECK (plan IN ('starter', 'growth', 'professional', 'enterprise'));
ALTER TABLE krongage.tenants ALTER COLUMN plan SET DEFAULT 'starter';

-- (b) Columns the signup flow writes:
ALTER TABLE krongage.tenants ADD COLUMN IF NOT EXISTS paystack_reference TEXT UNIQUE;
ALTER TABLE krongage.tenants ADD COLUMN IF NOT EXISTS owner_keycloak_id  TEXT;
ALTER TABLE krongage.tenants ADD COLUMN IF NOT EXISTS billing_cadence    TEXT
  CHECK (billing_cadence IN ('monthly', 'annual'));
```

> The engine seed `gate/plans.ts` must also rename its `free` plan → **`starter`** (display name "Starter")
> so the catalog and tenant CHECK agree. This is part of M1.

---

## 3. HMAC verification (do this first, reject everything else)

Signature is computed over the **raw request body string** (not re-serialised JSON).

**Algorithm:** `sha256 = HMAC-SHA256(key=WEBHOOK_SECRET, message="${timestamp}.${rawBody}")`

```typescript
import { createHmac, timingSafeEqual } from 'crypto';

function verifySignature(rawBody: string, signature: string, timestamp: string, secret: string): boolean {
  try {
    const ts = parseInt(timestamp, 10);
    if (Math.abs(Date.now() / 1000 - ts) > 300) return false;
    const expected = `sha256=${createHmac('sha256', secret).update(`${ts}.${rawBody}`).digest('hex')}`;
    const a = Buffer.from(expected), b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}
```

> **Critical:** capture the raw body **before** any JSON body-parser runs
> (`express.raw({type:'application/json'})` on this route, or a `verify` hook).
> If the framework auto-parses JSON first, the HMAC will not match.

`WEBHOOK_SECRET` is shared with krongage.io and lives in the secrets manager — **never in source** (M4).

---

## 4. Provisioning sequence

Run in order. On any failure return **500** (so krongage.io retries/alerts) and run compensating
rollback — mirror the existing pattern in `provisioning-api/src/index.ts`.

**Idempotency first** — Paystack retries fire the same webhook more than once:

```sql
SELECT id FROM krongage.tenants WHERE paystack_reference = $1;
```

If a row exists → return `200 { "ok": true, "idempotent": true, "tenant_id": "…" }` and do nothing else.

### 4.1 Create Keycloak user (with a login path)

```
email           → user.email
firstName       → user.firstName
lastName        → user.lastName
enabled         → true
emailVerified   → false
requiredActions → ["VERIFY_EMAIL", "UPDATE_PASSWORD"]
```

Trigger Keycloak's `execute-actions-email` so the user receives a set-password / verify-email link.
**Without this the paid user has no way to log in.** Store `owner_keycloak_id`.

### 4.2 Insert the tenant row — modules come **from the catalog**

Resolve the plan from the live catalog (`engine.resolvePlan(plan.id)`) and stamp **its** `modules_enabled`
— do **not** hardcode a module list here:

```sql
INSERT INTO krongage.tenants
  (name, plan, status, billing_cadence, modules_enabled, owner_keycloak_id, paystack_reference, created_at)
VALUES
  ($1,       -- user.company
   $2,       -- plan.id  ('growth' | 'professional')
   'trial',  -- 14-day trial; flips to 'active' on trial end / first successful charge
   $3,       -- plan.billing  ('monthly' | 'annual')
   $4,       -- resolvePlan(plan.id).modules_enabled  ← from catalog
   $5,       -- owner_keycloak_id from 4.1
   $6,       -- paystack.reference  (idempotency key)
   NOW())
RETURNING id;
```

#### Canonical `modules_enabled` per plan (real module IDs)

| `plan.id` | `modules_enabled` (catalog-resolved) |
|---|---|
| `starter` | `["inbox","social","campaigns","analytics","llm"]` |
| `growth` | `["inbox","social","campaigns","analytics","llm"]` |
| `professional` | `["inbox","social","campaigns","analytics","customer360","llm"]` |
| `enterprise` *(not via this endpoint)* | `["inbox","social","campaigns","analytics","customer360","social-listening","knowledge","llm"]` |

Module ID → product name: `inbox`=KronChat · `social`=Social · `campaigns`=KronCampaign ·
`analytics`=Analytics · `customer360`=Customer 360 · `social-listening`=Listening · `knowledge`=Knowledge ·
`llm`=Usage & Limits.

**HARD RULE:** `social-listening` and `knowledge` are **Enterprise-only** and must **never** appear on a
hosted plan, even if an admin toggles them.

### 4.3 Provision only the enabled sub-systems (gate Knowledge/Listening OFF)

The existing `/provision/tenant` calls `provisionKnowledgeCollection(…)` **unconditionally**. Gate every
sub-provision call by the resolved `modules_enabled`:

```
inbox            → provisionChatwoot      (always — hosted core)
social           → provisionPostiz        (always — hosted core)
campaigns        → provisionDittofeed     (always — hosted core)
customer360      → provision CDP          (professional only)
knowledge        → provisionKnowledge…    (SKIP on hosted — enterprise only)
social-listening → social-intel           (SKIP on hosted — enterprise only)
```

### 4.4 Create LiteLLM team + virtual key

```
team_id    → tenant_id (4.2)
team_alias → user.company
max_budget → from the catalog limits for plan.id (NOT a hardcoded number)
```

### 4.5 Stamp KronGate plan limits

```
tenant_id → from 4.2
plan      → plan.id
```

Limits come from the catalog (`gate_plans` + `gate_plan_limits`, seeded by `plans.ts`),
read by `engine.resolvePlan()`.

---

## 5. Response

| Case | HTTP | Body |
|---|---|---|
| Success | 200 | `{ "ok": true, "tenant_id": "uuid" }` |
| Idempotent repeat | 200 | `{ "ok": true, "idempotent": true, "tenant_id": "uuid" }` |
| Bad/expired signature or JWT | 401 | `{ "error": "Invalid signature" }` |
| Provisioning failure | 500 | `{ "error": "Provisioning failed", "detail": "…" }` |

Return **500 (not 200)** on failure so krongage.io logs and retries.

---

## 6. Security — the designed posture (not HMAC-only)

This is the **payment-confirmed → create-user** call: forge it and you mint free paid accounts.

| Layer | Status |
|---|---|
| **mTLS** | M4 — target for prod |
| **OAuth2 client-credentials JWT (Keycloak)** | M4 — target for prod |
| **HMAC body signature + timestamp** | **Interim floor — build now** |
| **IP allowlist** (Vercel egress + ops) | Build now |
| **Rate limit** (~20 req/min) | Build now |
| **Secrets manager** | M4 |

**Rule:** HMAC + IP + rate-limit + timestamp is the minimum to open the endpoint.
**Do not switch krongage.io to production Paystack keys until M4 (mTLS + JWT) is in place.**

---

## 7. Testing

```bash
# 7.1 reject bad signature → 401
curl -X POST http://localhost:4050/provision/signup \
  -H "Content-Type: application/json" \
  -H "X-KronGage-Timestamp: $(date +%s)" \
  -H "X-KronGage-Signature: sha256=bad" \
  -d '{"user":{"email":"t@t.com"}}'

# 7.2 valid signed request → 200 + tenant created
SECRET="your-webhook-secret"; TS=$(date +%s)
BODY='{"user":{"firstName":"Test","lastName":"User","email":"test@acme.com","company":"Acme","phone":""},"plan":{"id":"growth","name":"Growth","billing":"monthly"},"paystack":{"reference":"TEST-REF-001","status":"success","amount":500000,"currency":"USD"},"source":"krongage-web"}'
SIG="sha256=$(printf '%s' "${TS}.${BODY}" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"
curl -X POST http://localhost:4050/provision/signup \
  -H "Content-Type: application/json" \
  -H "X-KronGage-Timestamp: $TS" \
  -H "X-KronGage-Signature: $SIG" \
  -d "$BODY"

# 7.3 confirm tenant (plan='growth', modules must NOT contain social-listening/knowledge)
docker exec <pg> psql -U postgres -c \
  "SELECT id,name,plan,status,billing_cadence,modules_enabled FROM krongage.tenants ORDER BY created_at DESC LIMIT 1;"

# 7.4 idempotency — run 7.2 twice with same reference
# → second call returns idempotent:true, no second Keycloak user or tenant row created
```

---

## 8. What krongage.io sends (summary)

- One signed call per successful Paystack payment for **`growth`** or **`professional`** only.
- HMAC-signed with the shared `WEBHOOK_SECRET`; in prod also a Keycloak client-credentials JWT (M4).
- `plan.billing: "annual"` → provision identically, record `billing_cadence='annual'`.
- `paystack.reference` is globally unique → safe idempotency key.
- `paystack.amount` is in **cents** (`500000` = $5,000).

---

## 9. Contact / open items from krongage.io

- The `WEBHOOK_SECRET` value + Keycloak client-credentials client (M4)
- Paystack test cards for end-to-end testing
- Final `WEBHOOK_URL` to point at this endpoint
- Confirmation that krongage.io checkout prices match the catalog ($5,000 / $6,000; 12% annual)
