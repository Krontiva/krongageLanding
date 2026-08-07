import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import AiTelecomSupport from '@/components/solutions/AiTelecomSupport';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'FMCG & Retail — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="FMCG & Retail"
      eyebrow="FMCG & Retail"
      title="Reinvent the End-to-End Consumer Experience Across Every Global Point of Sale"
      description="KronGage scales brand-to-consumer relationships, integrating seamless path-to-purchase communication, AI-driven personalisation, and global supply-chain transparency into a single intelligent ecosystem."
      hideHero
      impactStats={[
        { title: '4.2x', description: 'higher engagement with AI-optimised content vs manual' },
        { title: '78%', description: 'of consumers discover products through social media' },
        { title: '35%', description: 'increase in brand loyalty with consistent omnichannel presence' },
      ]}
      capabilities={[
        {
          eyebrow: 'Omnichannel Service',
          headline: 'Every Channel',
          title: 'Omnichannel Global FMCG & Retail Service',
          description: 'Orchestrate the end-to-end shopper journey through a single engagement centre, ensuring a seamless brand experience across global retail channels and fragmented digital touchpoints.',
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'Conversational Commerce',
          headline: 'Shop & Chat',
          title: 'AI-Driven Conversational Commerce',
          description: 'Integrate autonomous AI to resolve high-volume consumer enquiries, freeing specialists to leverage intelligent shopper insights for complex fulfilment challenges and loyalty-tier escalations.',
          visual: <AiTelecomSupport />,
        },
        {
          eyebrow: 'Customer 360',
          headline: 'Shopper Insight',
          title: 'Customer 360 & Predictive Intelligence',
          description: 'Synchronise fragmented commerce data into a unified consumer identity, providing real-time visibility into the global shopper journey and brand-to-consumer relationship.',
          visual: <Customer360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'ShoppingCart', title: 'Order Journey Tracking', description: 'Follow every purchase from discovery to delivery across channels.' },
        { icon: 'Megaphone', title: 'Campaign Personalisation', description: 'Tailor promotions to shopper behaviour and purchase history automatically.' },
        { icon: 'Star', title: 'Loyalty Programme Integration', description: 'Connect loyalty tiers and rewards directly into customer conversations.' },
        { icon: 'ChartBar', title: 'Cross-Channel Analytics', description: 'Measure campaign performance across social, in-store, and e-commerce.' },
        { icon: 'Truck', title: 'Supply Chain Visibility', description: 'Give support teams real-time delivery and stock status during conversations.' },
        { icon: 'Sparkle', title: 'AI Content Generation', description: 'Generate on-brand promotional content and product messaging at scale.' },
      ]}
      faqs={[
        { question: 'Can KronGage connect to our e-commerce platform?', answer: 'Yes, KronGage integrates with major e-commerce and POS systems to keep order and customer data in sync.' },
        { question: 'Does KronGage support influencer and social commerce campaigns?', answer: 'Yes, social publishing and campaign tools work together to launch and measure social-led commerce campaigns.' },
        { question: 'Can we personalise promotions per customer segment?', answer: 'Yes, campaigns can be targeted using purchase history, loyalty tier, or behavioural segments.' },
        { question: 'How does KronGage handle high-volume seasonal traffic?', answer: 'The platform scales automatically to handle seasonal spikes in customer enquiries without added infrastructure.' },
      ]}
    />
  );
}
