import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import AiTelecomSupport from '@/components/solutions/AiTelecomSupport';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Telecommunications — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="Telecommunications"
      eyebrow="Telecommunications"
      title="Revolutionise How Networks Engage Subscribers Across Every Global Touchpoint"
      description="At the heart of every Tier-1 carrier is the subscriber relationship. KronGage helps CSPs bridge the gap between fragmented network data and meaningful customer engagement. By unifying every interaction, from billing enquiries to technical support, into one intelligent hub, teams can deliver a proactive, high-touch experience."
      hideHero
      impactStats={[
        { title: '5x', description: 'cheaper to retain a subscriber than acquire a new one' },
        { title: '2.5x', description: 'higher ARPU from subscribers with positive engagement' },
        { title: '60%', description: 'of subscriber enquiries can be automated with AI' },
      ]}
      capabilities={[
        {
          eyebrow: 'Omnichannel Service',
          headline: 'Every Touchpoint',
          title: 'Omnichannel Global Telecom Service',
          description: 'Orchestrate the entire subscriber journey through a single pane of glass, ensuring seamless connectivity across global roaming territories and fragmented communication protocols.',
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'AI Support',
          headline: 'Instant Resolution',
          title: 'AI-Powered Telecom Support',
          description: 'Integrate autonomous AI to resolve high-volume service requests, freeing specialists to leverage intelligent diagnostics for complex roaming and connectivity issues.',
          visual: <AiTelecomSupport />,
        },
        {
          eyebrow: 'Customer 360',
          headline: 'Full Visibility',
          title: 'Customer 360 & Predictive Intelligence',
          description: 'Consolidate fragmented data streams into a unified subscriber profile, providing active visibility into the global end-to-end relationship.',
          visual: <Customer360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'Broadcast', title: 'Network-Wide Reach', description: 'Engage subscribers across prepaid, postpaid, and enterprise segments from one platform.' },
        { icon: 'Lightning', title: 'Real-Time Billing Support', description: 'Resolve billing and plan enquiries instantly with AI-assisted responses.' },
        { icon: 'Globe', title: 'Global Roaming Support', description: 'Coordinate subscriber support across roaming territories and time zones.' },
        { icon: 'ChartLineUp', title: 'Churn Prediction', description: 'Identify at-risk subscribers before they leave, with predictive scoring.' },
        { icon: 'Robot', title: 'Automated Diagnostics', description: 'AI triages common connectivity issues before escalating to specialists.' },
        { icon: 'Bell', title: 'Proactive Outage Alerts', description: 'Notify affected subscribers automatically during network incidents.' },
      ]}
      faqs={[
        { question: 'Can KronGage handle high volumes of subscriber interactions?', answer: 'Yes, KronGage is built to manage high-volume, multi-channel subscriber traffic without added headcount.' },
        { question: 'Does KronGage support prepaid and postpaid workflows?', answer: 'Yes, engagement workflows can be tailored separately for prepaid, postpaid, and enterprise subscriber segments.' },
        { question: 'Can AI resolve technical support queries?', answer: 'AI handles common connectivity and billing queries automatically, escalating complex technical issues to specialists with full context.' },
        { question: 'How quickly can we roll out KronGage across our subscriber base?', answer: 'Most carriers connect their core channels and begin engaging subscribers within days of onboarding.' },
      ]}
    />
  );
}
