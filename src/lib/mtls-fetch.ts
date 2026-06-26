/**
 * mTLS-capable drop-in fetch replacement.
 *
 * Node.js global fetch does not support client certificates. This module
 * uses the native https module with a custom Agent so the server presents
 * a client cert on every outbound TLS handshake.
 *
 * Required env vars (PEM strings — store in Vercel env, not in the repo):
 *   MTLS_CLIENT_CERT  — PEM-encoded client certificate
 *   MTLS_CLIENT_KEY   — PEM-encoded private key for the client cert
 *
 * If either var is absent the call is made without a client cert (plain TLS).
 * This lets you keep the same code path in environments where mTLS is not
 * yet required.
 */

import https from 'https';
import type { IncomingMessage } from 'http';

// Reuse the Agent across calls in the same lambda instance.
let _agent: https.Agent | undefined;

function getAgent(): https.Agent | undefined {
  if (_agent) return _agent;

  const cert = process.env.MTLS_CLIENT_CERT;
  const key = process.env.MTLS_CLIENT_KEY;

  if (cert && key) {
    _agent = new https.Agent({ cert, key, rejectUnauthorized: true });
  }
  return _agent;
}

export interface MtlsResponse {
  ok: boolean;
  status: number;
  text(): Promise<string>;
  json<T = unknown>(): Promise<T>;
}

export function mtlsFetch(
  url: string,
  options: { method: string; headers: Record<string, string>; body: string },
): Promise<MtlsResponse> {
  const agent = getAgent();
  const parsed = new URL(url);
  const bodyBuf = Buffer.from(options.body, 'utf8');

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port ? parseInt(parsed.port, 10) : 443,
        path: parsed.pathname + parsed.search,
        method: options.method,
        headers: {
          ...options.headers,
          'Content-Length': bodyBuf.byteLength,
        },
        agent,
      },
      (res: IncomingMessage) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          const status = res.statusCode ?? 0;
          resolve({
            ok: status >= 200 && status < 300,
            status,
            text: () => Promise.resolve(raw),
            json: <T>() => Promise.resolve(JSON.parse(raw) as T),
          });
        });
        res.on('error', reject);
      },
    );

    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}
