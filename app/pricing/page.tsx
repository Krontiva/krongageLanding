import type { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing – KronGage',
  description: 'Simple, transparent pricing for teams of all sizes. Start free, scale as you grow.',
};

export default function Page() {
  return <PricingPage />;
}
