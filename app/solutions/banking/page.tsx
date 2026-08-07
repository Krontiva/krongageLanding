import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import AiTelecomSupport from '@/components/solutions/AiTelecomSupport';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Banking & Finance — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="Banking & Finance"
      eyebrow="Financial Services"
      title="Transform How Banks Connect with Customers Across Every Global Channel"
      description="KronGage delivers unified customer engagement for banks and financial institutions, combining omnichannel communication, AI-powered automation, and enterprise-grade compliance in one intelligent platform."
      hideHero
      impactStats={[
        { title: '3.5x', description: 'higher retention rates when banks deliver true omnichannel experiences' },
        { title: '40%', description: 'reduction in contact centre costs through AI-driven automation' },
        { title: '25%', description: 'increase in cross-sell revenue with unified customer data' },
      ]}
      capabilities={[
        {
          eyebrow: 'Omnichannel Service',
          headline: 'Every Channel',
          title: 'Omnichannel Global Banking Service',
          description: 'Manage all customer conversations from a single platform, regardless of geographical location or preferred channel.',
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'AI Support',
          headline: 'Always On',
          title: 'AI-Powered Banking Support',
          description: 'Deploy AI that handles routine enquiries while empowering agents with intelligent assistance for complex global interactions.',
          visual: <AiTelecomSupport />,
        },
        {
          eyebrow: 'Customer 360',
          headline: 'Full Picture',
          title: 'Customer 360 & Predictive Intelligence',
          description: "Break down data silos and gain a unified view of each customer's relationship with their bank across all regions.",
          visual: <Customer360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'ShieldCheck', title: 'Regulatory Compliance', description: 'Built-in controls for KYC, AML, and financial-sector data regulations.' },
        { icon: 'LockKey', title: 'Bank-Grade Security', description: 'AES-256 encryption and role-based access protect every customer interaction.' },
        { icon: 'Translate', title: 'Multilingual Support', description: 'Serve customers in their preferred language across every channel.' },
        { icon: 'ChartLineUp', title: 'Cross-Sell Intelligence', description: 'Surface the next-best product or service based on real customer behaviour.' },
        { icon: 'ClockCounterClockwise', title: 'Full Interaction History', description: 'Every branch, call, and digital interaction available in one customer record.' },
        { icon: 'UsersThree', title: 'Team Routing', description: 'Route enquiries to the right specialist team, from retail to corporate banking.' },
      ]}
      faqs={[
        { question: 'Does KronGage support KYC and AML compliance workflows?', answer: 'Yes, KronGage includes built-in consent management, audit trails, and role-based access aligned with financial-sector compliance requirements.' },
        { question: 'Can KronGage integrate with our core banking system?', answer: 'Yes, KronGage connects to core banking platforms and CRM systems so customer context is always up to date.' },
        { question: 'How does KronGage handle multi-region banking operations?', answer: 'KronGage supports multi-language, multi-currency, and region-specific compliance controls from a single platform.' },
        { question: 'What channels can banking customers reach us on?', answer: 'WhatsApp, SMS, email, webchat, and phone are all unified into a single agent workspace.' },
      ]}
    />
  );
}
