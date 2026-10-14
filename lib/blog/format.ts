// Small, dependency-free helpers that are safe to use in both server and browser code.

export function formatDate(value: string | Date | null): string {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Estimated reading time in minutes, from the post's HTML. */
export function readMinutes(html: string): number {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
