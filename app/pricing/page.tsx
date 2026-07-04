import type { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';
import { getLivePlans } from '@/src/lib/pricing';

export const metadata: Metadata = {
  title: 'Pricing – KronGage',
  description: 'Simple, transparent pricing for teams of all sizes. Start free, scale as you grow.',
};

export default async function Page() {
  const livePlans = await getLivePlans();
  return <PricingPage initialLivePlans={livePlans} />;
}
