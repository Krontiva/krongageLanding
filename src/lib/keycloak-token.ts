/**
 * Keycloak client-credentials token cache.
 *
 * Fetches a short-lived token from Keycloak and caches it in module scope
 * (warm-lambda reuse). Re-fetches 30 s before expiry so callers never see
 * an expired token.
 *
 * Required env vars:
 *   KEYCLOAK_TOKEN_URL  — full token endpoint URL
 *                         e.g. https://web.krongage.io/realms/krongage/protocol/openid-connect/token
 *   KEYCLOAK_CLIENT_ID  — e.g. krongage-provisioning
 *   KEYCLOAK_CLIENT_SECRET — from KronGage (keep in Vercel env, never commit)
 */

let cachedToken: string | null = null;
let expiresAt = 0; // Unix seconds

export async function getProvisioningToken(): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);

  // Return cached token if it has > 30 s of life left
  if (cachedToken && nowSeconds < expiresAt - 30) {
    return cachedToken;
  }

  const url = process.env.KEYCLOAK_TOKEN_URL;
  const clientId = process.env.KEYCLOAK_CLIENT_ID;
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

  if (!url || !clientId || !clientSecret) {
    throw new Error('Keycloak env vars not configured (KEYCLOAK_TOKEN_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET)');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Keycloak token fetch failed ${res.status}: ${detail}`);
  }

  const json = await res.json();
  cachedToken = json.access_token as string;
  expiresAt = nowSeconds + (json.expires_in as number);
  return cachedToken;
}
