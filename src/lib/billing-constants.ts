/**
 * Card-tokenization charge for the 14-day free-trial signup flow.
 *
 * Paystack only issues a reusable card `authorization` AFTER a successful
 * charge, so a "no real charge at signup" trial charges this tiny fixed amount
 * purely to save the card. The platform (provisioning-api) auto-detects a
 * charge of this exact size and sets up a free trial — first real charge on
 * day 14 — instead of charging the full plan price now.
 *
 * MUST stay in lockstep with the platform's `BILLING_TOKENIZATION_GHS`
 * (default 1). Both sides enforce the same amount allowlist (accept exactly
 * this tokenization amount OR ≈ full plan price; reject everything in between),
 * so changing this without changing the platform's value will make every trial
 * signup fail one of the two guards.
 *
 * See docs/09-PAYSTACK-SUBSCRIPTIONS-HANDOFF.md §0.
 */
export const TOKENIZATION_GHS = 1;

/** Tokenization charge in pesewas (Paystack charges GHS in its smallest unit). */
export const TOKENIZATION_PESEWAS = TOKENIZATION_GHS * 100;

/** Free-trial length before the first real charge. */
export const TRIAL_DAYS = 14;
