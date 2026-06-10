/**
 * KronGage Webhook Security — HMAC-SHA256 signing & verification
 *
 * Sending side  (this file, used by /api/webhook/route.ts):
 *   - Signs every outbound payload with HMAC-SHA256 using WEBHOOK_SECRET
 *   - Adds X-KronGage-Signature and X-KronGage-Timestamp headers
 *   - Timestamp prevents replay attacks on your server
 *
 * Receiving side (your PostgreSQL server):
 *   - Validate using verifyWebhookSignature() — reference implementation below
 *   - Reject if timestamp is > 5 minutes old
 *   - Reject if HMAC does not match (constant-time comparison)
 *
 * Never transmit WEBHOOK_SECRET in plain text — it is only used as the HMAC key.
 */

import { createHmac, timingSafeEqual } from 'crypto';

/** Build an HMAC-SHA256 signature over `${timestamp}.${body}` */
function sign(body: string, secret: string, timestamp: number): string {
  return createHmac('sha256', secret)
    .update(`${timestamp}.${body}`)
    .digest('hex');
}

/**
 * Build the full set of security headers for an outbound webhook POST.
 * Call this with the serialised JSON body string before sending.
 */
export function buildSecureHeaders(body: string): Record<string, string> {
  const timestamp = Math.floor(Date.now() / 1000); // Unix seconds
  const secret = process.env.WEBHOOK_SECRET;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-KronGage-Timestamp': String(timestamp),
    'User-Agent': 'KronGage-Webhook/1.0',
  };

  if (secret) {
    // Format: "sha256=<hex>" — mirrors Stripe / GitHub webhook convention
    headers['X-KronGage-Signature'] = `sha256=${sign(body, secret, timestamp)}`;
  }

  return headers;
}

/**
 * ────────────────────────────────────────────────────────────────────
 * REFERENCE VALIDATOR — copy this to your PostgreSQL-backed server
 * ────────────────────────────────────────────────────────────────────
 *
 * Express/Fastify example:
 *
 *   import { verifyWebhookSignature } from './webhook-security';
 *
 *   app.post('/api/ingest', express.text({ type: '*\/*' }), (req, res) => {
 *     const ok = verifyWebhookSignature(
 *       req.body,                              // raw body string
 *       req.headers['x-krongage-signature'],   // "sha256=<hex>"
 *       req.headers['x-krongage-timestamp'],   // Unix seconds string
 *       process.env.WEBHOOK_SECRET,
 *     );
 *     if (!ok) return res.status(401).json({ error: 'Invalid signature' });
 *     const data = JSON.parse(req.body);
 *     // insert data.user into Postgres ...
 *   });
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | string[] | undefined,
  timestamp: string | string[] | undefined,
  secret: string,
  toleranceSeconds = 300,
): boolean {
  if (!signature || !timestamp || !secret) return false;

  const sig = Array.isArray(signature) ? signature[0] : signature;
  const ts = Array.isArray(timestamp) ? timestamp[0] : timestamp;
  const tsNum = parseInt(ts, 10);

  // Reject stale requests (replay-attack guard)
  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - tsNum);
  if (ageSeconds > toleranceSeconds) return false;

  const expected = `sha256=${sign(rawBody, secret, tsNum)}`;

  // Constant-time comparison — prevents timing-oracle attacks
  try {
    return timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(sig, 'utf8'));
  } catch {
    return false; // lengths differ → not equal
  }
}
