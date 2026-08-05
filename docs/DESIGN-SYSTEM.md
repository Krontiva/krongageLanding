# KronGage Design System

Extracted from the current site so a rebuild can start from real tokens and component conventions instead of hand-rolled inline styles per page. This describes the *visual language*, not the current code — the current code is inline-`style`-heavy and per-page duplicated, which is exactly what a fresh repo should avoid from day one.

## Recommended stack (proven working in this repo already)

- **Next.js App Router + TypeScript + Tailwind CSS v4** (CSS-based config, no `tailwind.config.js` needed).
- **shadcn/ui**, `"radix-maia"` style, unified `radix-ui` package (not the older per-component `@radix-ui/react-*` packages), `iconLibrary: "phosphor"` (set this in `components.json` at `init` time — it makes every generated primitive import from `@phosphor-icons/react` automatically instead of `lucide-react`).
- **react-hook-form + zod** (`@hookform/resolvers/zod`) for all form state/validation. Note: this shadcn style/registry does **not** ship a `Form` wrapper component — compose forms directly from `Label`/`Input`/`Select`/etc. + RHF's own `register`/`Controller`. This is simpler than the classic shadcn `Form` wrapper anyway.
- `npx shadcn@latest add <component>` can pull in far more files than requested (this registry bundles extras). Check `components/ui/` after every `add` and delete anything not actually needed — don't let unused primitives accumulate.

Build the whole UI on Tailwind utility classes + shadcn primitives from the first component. **Do not** reach for a scoped `<style>{...}` block or an inline `style={{}}` object as the default — that pattern is how the current repo ended up with ~30 pages of duplicated, unmaintainable CSS. Inline style is acceptable only for truly one-off, data-driven values (e.g. a progress-bar width computed at render time) that Tailwind's arbitrary-value syntax can't express cleanly.

## Color tokens

| Token | Hex | Usage |
|---|---|---|
| `--kg-blue` (primary) | `#0D47A1` | Buttons, links, active states, brand accent |
| `--kg-blue-dark` | `#0a3680` | Primary button hover |
| `--kg-navy` | `#0f172a` | Headings, dark hero/footer backgrounds, body text base |
| `--kg-bg` | `#EEF5FD` | Light hero backgrounds, icon-tile fills, subtle section backgrounds |
| Border | `#e2e8f0` | Card/input borders, dividers |
| Body text (secondary) | `#475569` | Paragraph text on light backgrounds |
| Body text (muted) | `#64748b` | Captions, secondary copy |
| Placeholder/faint | `#94a3b8` | Placeholder text, disabled states, timestamps |
| Success | `#16a34a` text / `#dcfce7` bg / `#22c55e` dot | Confirmations, "active" status dots, positive deltas |
| Error | `#dc2626` / `#ef4444` text, `#fee2e2` / `#fff1f2` bg, `#f87171` border | Validation errors, destructive states |
| Warning | `#f59e0b` / `#fbbf24` | Caution badges, pending states |

Map these into shadcn's CSS-variable theme at `init` time: `--primary: var(--kg-blue)`, `--primary-foreground: white`, and leave the rest of shadcn's neutral scale as defaults unless the new product needs a different neutral. Keep the raw `--kg-*` custom properties too (don't only rely on the renamed `--primary` etc.) — they're useful for one-off inline needs and make the source of the brand color traceable.

## Typography

- **Font:** Manrope (Google Font), weights 400/500/600/700/800. Load once via `next/font/google` with `variable: '--font-sans'` so it feeds both Tailwind's `font-sans` utility and any raw `var(--font-sans)` usage — don't load it twice under two different CSS variable names (that's a real bug this repo hit).
- **Headings:** 800 weight, tight line-height (1.1–1.2), often with slight negative letter-spacing on large display text (`-0.5px` to `-1px` at 40px+).
- **Body:** 500–600 weight for UI labels, 400 for longer paragraph copy, line-height 1.6–1.75 for readability.
- **Scale in use:** 11px (eyebrow/overline labels, uppercase, letter-spacing ~0.1em), 12–13px (captions, form labels), 14–15px (body/buttons), 18–22px (card/modal titles), 28–52px (page headings, scaling down at breakpoints).

## Shape & spacing

- **Buttons & pills:** fully rounded (`border-radius: 50px` / Tailwind `rounded-full`). This applies to primary CTAs, toggle switches, badges — the pill is the dominant shape language of the brand.
- **Cards / modals:** 12–20px radius. Modals specifically: 20px.
- **Inputs / small controls:** 8–10px radius — deliberately *less* rounded than buttons, so the two read as distinct control types.
- **Shadows:** soft and colored, not neutral-gray. Pattern: `0 <y>px <blur>px rgba(13,71,161,<alpha>)` for blue-tinted elevation (cards, toggles), `rgba(0,0,0,<alpha>)` for true overlays (modal backdrops). Modal card shadow: `0 24px 64px rgba(0,0,0,.18)`. Toggle/pill shadow: `0 2px 8px rgba(13,71,161,.07)`.
- **Spacing scale:** consistently steps of 4 — 4, 8, 12, 16, 20, 24, 28, 32px for gaps/padding, with larger sections at 60, 80, 90, 100+ for page-level padding.

## Component conventions

**Buttons** — three variants seen throughout: primary (solid `#0D47A1` bg, white text, 700–800 weight), outline (2px `#0D47A1` border, transparent bg, fills solid on hover), ghost/text (no bg/border, underline on hover). All pill-shaped, 13–15px font, generous horizontal padding (24–32px).

**Inputs** — white background, 1.5px `#e2e8f0` border, 8–10px radius, border turns `#0D47A1` on focus (optionally with a soft `rgba(13,71,161,.1)` focus ring). Labels are separate block-level elements above the field, 12–13px, 600–700 weight, `#374151`/`#475569`.

**Modals/dialogs** — centered overlay, `rgba(15,23,42,0.6)` backdrop with blur, white card (max-width ~440px for forms), 20px radius, colored header band (`#0D47A1` bg, white text) for anything transactional (checkout, signup), with a semi-transparent circular close button (`rgba(255,255,255,.15)` bg) inset in the header rather than the default popover-style close button.

**Status pills/badges** — small, fully-rounded, colored-tint background with matching darker text (e.g. success: `#dcfce7` bg / `#16a34a` text). Used for plan badges ("Most Popular"), status indicators, trial callouts.

**Toggle switches (segmented control)** — pill-shaped outer container (white bg, 1.5px border, small shadow), inner buttons are also pill-shaped, active state gets solid `#0D47A1` bg + white text + shadow; inactive state is transparent with muted text.

## What to avoid repeating

- Don't define page-specific CSS classes in a `<style>` block per route. Every one of the ~30 pages in the current repo does this and it's the single biggest source of duplication.
- Don't hand-roll dialogs/overlays — use the shadcn `Dialog` primitive (Radix under the hood) for focus-trap, Escape-to-close, and ARIA wiring for free.
- Don't hand-roll form validation with `useState` + a manual `validate()` function per form — use zod schemas + react-hook-form, and share a schema across forms that collect the same fields (the current repo's checkout and free-signup forms collect identical fields and should share one schema).
