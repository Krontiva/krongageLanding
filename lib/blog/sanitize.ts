import sanitizeHtml from 'sanitize-html';

const BLOB_HOST = '.public.blob.vercel-storage.com';

/** Cleans editor HTML so only safe formatting and our own uploaded images survive. */
export function cleanContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'hr', 'code', 'pre', 'img', 'span'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
      p: ['style'],
      h2: ['style'],
      h3: ['style'],
      h4: ['style'],
      li: ['style'],
      blockquote: ['style'],
      span: ['style'],
    },
    // Only the formatting the editor offers: alignment, a few font families and pixel font sizes.
    allowedStyles: {
      '*': {
        'text-align': [/^(left|right|center|justify)$/],
        'font-size': [/^\d{1,3}(\.\d+)?px$/],
        'font-family': [/^[A-Za-z ,]{1,80}$/],
      },
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowedSchemesByTag: { img: ['https'] },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow', target: '_blank' }),
    },
    exclusiveFilter: (frame) => frame.tag === 'img' && !(frame.attribs.src ?? '').includes(BLOB_HOST),
  });
}

/** Plain-text version of the HTML, used for read-time and empty checks. */
export function plainText(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, ' ').trim();
}
