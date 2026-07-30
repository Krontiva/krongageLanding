import EmbeddedCheckoutClient from '@/components/EmbeddedCheckoutClient';

/**
 * /checkout — embedded Stripe Checkout, hosted inside our own nav and layout.
 *
 * This route exists only for the embedded flow. With
 * NEXT_PUBLIC_CHECKOUT_MODE unset, the pricing modal redirects to
 * checkout.stripe.com and nobody ever arrives here.
 *
 * The page is a thin server shell on purpose: the session lives in
 * sessionStorage and Stripe.js is browser-only, so everything real happens in
 * the client component. Keeping metadata here means the tab reads correctly
 * from the first paint.
 *
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §2 + admin's embedded addendum.
 */

export const metadata = {
  title: 'Complete your signup — KronGage',
  // A checkout page with no session is meaningless to a search visitor, and
  // indexing it would strand people on the "start from pricing" state.
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <EmbeddedCheckoutClient />;
}
