# provisioning-api — `POST /provision/signup` Implementation Guide

**For:** Backend developer on provisioning-api  
**Date:** June 2026  
**Status:** Ready to implement  
**Contact:** krongage.io team for questions on the sending side

---

## Overview

When a user completes payment on **krongage.io**, the Next.js app signs and POSTs a webhook payload
to `provisioning-api` at `POST /provision/signup`.

Your job is to receive that payload, verify it, and run the existing provisioning sequence:

```
krongage.io  →  POST /provision/signup  →  Keycloak user
                                        →  krongage.tenants row
                                        →  LiteLLM team + key
                                        →  KronGate plan limits
```

All four downstream steps use services **you already have running**. This document covers only
the new endpoint that triggers them.

---

## 1. Incoming request

### Headers

| Header | Example | Purpose |
|---|---|---|
| `Content-Type` | `application/json` | Always JSON |
| `X-KronGage-Signature` | `sha256=a3f9c2...` | HMAC-SHA256 signature |
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
    "amount": 5000,
    "currency": "USD"
  },
  "timestamp": "2026-06-08T12:34:56.789Z",
  "source": "krongage-web"
}
```

### Plan IDs you will receive

| `plan.id` | `plan.billing` | Monthly amount |
|---|---|---|
| `growth` | `monthly` or `annual` | $5,000 / $4,400 |
| `professional` | `monthly` or `annual` | $6,000 / $5,280 |

> `free` and `enterprise` plans do **not** go through this endpoint.
> Free users are handled separately; Enterprise is a manual process.

---

## 2. HMAC verification (do this first, reject everything else)

The signature is computed over the raw request body string (not re-serialised JSON).

**Algorithm:** `sha256 = HMAC-SHA256(key=WEBHOOK_SECRET, message="${timestamp}.${rawBody}")`

### Python

```python
import hmac
import hashlib
import time

def verify_signature(raw_body: bytes, signature: str, timestamp: str, secret: str) -> bool:
    try:
        ts = int(timestamp)
        # Reject requests older than 5 minutes (replay attack guard)
        if abs(time.time() - ts) > 300:
            return False

        message = f"{ts}.{raw_body.decode('utf-8')}"
        expected = "sha256=" + hmac.new(
            secret.encode("utf-8"),
            message.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()

        # Constant-time comparison — prevents timing oracle attacks
        return hmac.compare_digest(expected, signature)
    except Exception:
        return False
```

### Node.js / TypeScript

```typescript
import { createHmac, timingSafeEqual } from 'crypto';

function verifySignature(rawBody: string, signature: string, timestamp: string, secret: string): boolean {
  try {
    const ts = parseInt(timestamp, 10);
    if (Math.abs(Date.now() / 1000 - ts) > 300) return false;

    const expected = `sha256=${createHmac('sha256', secret)
      .update(`${ts}.${rawBody}`)
      .digest('hex')}`;

    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}
```

### Go

```go
func verifySignature(rawBody []byte, signature, timestamp, secret string) bool {
    ts, err := strconv.ParseInt(timestamp, 10, 64)
    if err != nil || math.Abs(float64(time.Now().Unix()-ts)) > 300 {
        return false
    }
    message := fmt.Sprintf("%d.%s", ts, rawBody)
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(message))
    expected := "sha256=" + hex.EncodeToString(mac.Sum(nil))
    return hmac.Equal([]byte(expected), []byte(signature))
}
```

### Environment variable

```bash
WEBHOOK_SECRET=<same value set on Vercel — get this from the krongage.io team>
```

**Critical:** Parse the raw body bytes before any JSON deserialisation. If your framework
auto-parses JSON before your middleware runs, the HMAC will not match.

---

## 3. Idempotency

Check `paystack.reference` before doing any work. Paystack can fire the same webhook more
than once on retries.

```sql
SELECT id FROM krongage.tenants WHERE paystack_reference = $1
```

If a row exists → return `200 { "ok": true, "idempotent": true }` immediately.

---

## 4. Provisioning sequence

Run these in order. If any step fails, return a 500 so krongage.io can retry.
Do not partially provision — use a transaction or compensating rollback where possible.

### 4.1 Create Keycloak user

Use your existing Keycloak admin client to create a user in the `krongage` realm.

Required fields:
```
email       → user.email
firstName   → user.firstName
lastName    → user.lastName
enabled     → true
emailVerified → false  (Keycloak will send verification email)
```

Store the returned `keycloak_user_id` — you need it for the tenant row.

---

### 4.2 Insert `krongage.tenants` row

```sql
INSERT INTO krongage.tenants (
  name,
  plan,
  status,
  billing,
  modules_enabled,
  owner_keycloak_id,
  paystack_reference,
  created_at
) VALUES (
  $1,   -- user.company
  $2,   -- plan.id  ('growth' | 'professional')
  'active',
  $3,   -- plan.billing  ('monthly' | 'annual')
  $4,   -- modules_enabled  (see §4.2a below)
  $5,   -- keycloak_user_id from step 4.1
  $6,   -- paystack.reference  (idempotency key)
  NOW()
)
RETURNING id
```

#### 4.2a — `modules_enabled` per plan

Hosted plans **must never** include `listening` or `knowledge` — these are Enterprise/on-prem only
(see `01-ARCHITECTURE.md §0 governing principle 2`).

| `plan.id` | `modules_enabled` |
|---|---|
| `growth` | `["kronchat", "social_publishing", "campaigns", "ai_workflows", "analytics"]` |
| `professional` | `["kronchat", "social_publishing", "campaigns", "ai_workflows", "analytics", "customer_360"]` |

---

### 4.3 Create LiteLLM team + virtual key

Use your existing LiteLLM admin client.

```
team_id     → tenant_id from step 4.2
team_alias  → user.company
max_budget  → per plan (see gate/plans.ts for limits)
```

Store the generated `litellm_key` back on the tenant row if your schema has that column.

---

### 4.4 Stamp KronGate plan limits

Call your existing `gate/check` / entitlement engine to assign the canonical plan limits
for this tenant.

```
tenant_id  → from step 4.2
plan       → plan.id
```

This wires the hard/soft/overage gates. The limits are defined in `gate/plans.ts`
(or the `gate_plans` + `gate_plan_limits` DB tables if already migrated).

---

## 5. Response

### Success

```json
HTTP 200
{
  "ok": true,
  "tenant_id": "uuid-here"
}
```

### Idempotent repeat

```json
HTTP 200
{
  "ok": true,
  "idempotent": true,
  "tenant_id": "uuid-here"
}
```

### Signature invalid / timestamp expired

```json
HTTP 401
{ "error": "Invalid signature" }
```

### Any provisioning failure

```json
HTTP 500
{ "error": "Provisioning failed", "detail": "..." }
```

> Return 500 (not 200) on failure so that krongage.io logs it and can retry or alert.

---

## 6. Security requirements

| Layer | Requirement |
|---|---|
| **HMAC** | Verify `X-KronGage-Signature` on every request before doing any work |
| **Timestamp** | Reject if `abs(now - X-KronGage-Timestamp) > 300s` |
| **HTTPS** | Endpoint must be behind nginx/TLS — never accept over plain HTTP in production |
| **IP allowlist** | Restrict to Vercel egress IPs + your own ops IP only |
| **Rate limit** | Max ~20 req/min on this endpoint |
| **Idempotency** | Check `paystack_reference` before any DB/Keycloak writes |

Vercel egress IP ranges: https://vercel.com/docs/security/deployment-protection/methods-to-protect-all-deployments/vercel-firewall#vercel-ip-ranges

---

## 7. Testing the endpoint

### 7.1 Reject bad signature (expect 401)

```bash
curl -X POST http://localhost:4050/provision/signup \
  -H "Content-Type: application/json" \
  -H "X-KronGage-Timestamp: $(date +%s)" \
  -H "X-KronGage-Signature: sha256=invalidsignature" \
  -d '{"user":{"email":"test@test.com"}}'
```

### 7.2 Valid signed request (expect 200 + tenant created)

```bash
SECRET="your-webhook-secret-here"
TS=$(date +%s)
BODY='{"user":{"firstName":"Test","lastName":"User","email":"test@acme.com","company":"Acme","phone":""},"plan":{"id":"growth","name":"Growth","billing":"monthly"},"paystack":{"reference":"TEST-REF-001","status":"success","amount":5000,"currency":"USD"},"source":"krongage-web"}'
SIG="sha256=$(printf '%s' "${TS}.${BODY}" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"

curl -X POST http://localhost:4050/provision/signup \
  -H "Content-Type: application/json" \
  -H "X-KronGage-Timestamp: $TS" \
  -H "X-KronGage-Signature: $SIG" \
  -d "$BODY"
```

### 7.3 Confirm tenant in Postgres

```bash
docker exec <postgres-container> psql -U postgres -c \
  "SELECT id, name, plan, status, modules_enabled FROM krongage.tenants ORDER BY created_at DESC LIMIT 1;"
```

### 7.4 Confirm Keycloak user exists

Check the `krongage` realm in the Keycloak admin console at `:8080`, or via API:

```bash
curl http://localhost:8080/admin/realms/krongage/users?email=test@acme.com \
  -H "Authorization: Bearer <admin-token>"
```

### 7.5 Test idempotency (send same reference twice — expect same tenant_id both times)

Run the curl from 7.2 twice with the same `paystack.reference`. Second call should return
`"idempotent": true` and **not** create a second Keycloak user or tenant row.

---

## 8. What krongage.io sends you (summary)

- Every successful Paystack payment for `growth` or `professional` plans
- Payload is HMAC-signed using the shared `WEBHOOK_SECRET`
- Annual billing sends `plan.billing: "annual"` — provision identically, just record billing cadence
- `paystack.reference` is globally unique per transaction — safe idempotency key
- `source` is always `"krongage-web"` — useful for filtering if other sources are added later

---

## 9. Questions / contact

Reach out to the krongage.io team for:
- The `WEBHOOK_SECRET` value to set in your environment
- Paystack test card numbers for end-to-end testing
- Confirmation of the final `WEBHOOK_URL` to point at your endpoint
