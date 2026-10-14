import { neon } from '@neondatabase/serverless';

let client: ReturnType<typeof neon> | null = null;

/** Runs a parameterised query and returns the rows. */
export async function query<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not configured');
    client = neon(url);
  }
  return (await client.query(text, params)) as T[];
}
