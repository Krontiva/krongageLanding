import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import AiTelecomSupport from '@/components/solutions/AiTelecomSupport';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Government & Public Sector — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="Government & Public Sector"
      eyebrow="Government & Public Sector"
      title="Transforming Public Service Delivery Through Digital Citizen Engagement"
      description="KronGage delivers unified citizen engagement for state agencies, combining omnichannel service delivery and AI-powered management automation in one intelligent platform."
      hideHero
      impactStats={[
        { title: '60%', description: 'of routine government enquiries can be automated' },
        { title: '45%', description: 'reduction in call volumes with digital self-service' },
        { title: '3x', description: 'higher citizen satisfaction with proactive digital communication' },
      ]}
      capabilities={[
        {
          eyebrow: 'Citizen Service',
          headline: 'Every Channel',
          title: 'Unified Multi-Channel Citizen Service',
          description: "We understand that fragmented agency data often acts as a barrier to meaningful engagement. KronGage bridges those gaps, offering a unified service interface that provides the full context of a citizen's journey.",
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'AI Support',
          headline: 'Faster Response',
          title: 'AI-Powered Public Support',
          description: 'Integrate autonomous AI to resolve high-volume constituent enquiries, freeing case managers and programme specialists to leverage intelligent data insights for complex eligibility adjudication and inter-agency coordination hurdles.',
          visual: <AiTelecomSupport />,
        },
        {
          eyebrow: 'Citizen 360',
          headline: 'Full Context',
          title: 'Citizen 360 & Predictive Intelligence',
          description: 'Consolidate fragmented data silos into a unified citizen identity, providing active visibility into the inter-agency end-to-end service relationship.',
          visual: <Customer360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'Buildings', title: 'Inter-Agency Coordination', description: 'Share citizen context securely across departments and agencies.' },
        { icon: 'ShieldCheck', title: 'Data Sovereignty Controls', description: 'Keep citizen data resident and compliant with jurisdictional requirements.' },
        { icon: 'ClipboardText', title: 'Case Management', description: 'Track constituent cases from first contact through to resolution.' },
        { icon: 'Translate', title: 'Multilingual Citizen Support', description: 'Serve constituents in their preferred language, at scale.' },
        { icon: 'Robot', title: 'Automated Eligibility Checks', description: 'AI helps triage eligibility and routing for public programmes.' },
        { icon: 'Bell', title: 'Proactive Service Alerts', description: 'Notify citizens automatically about application status or service changes.' },
      ]}
      faqs={[
        { question: 'Does KronGage support data sovereignty requirements?', answer: 'Yes, KronGage offers data residency and single-tenant hosting options to meet jurisdictional requirements.' },
        { question: 'Can multiple agencies coordinate on the same citizen case?', answer: 'Yes, case context can be securely shared across departments to avoid citizens repeating themselves.' },
        { question: 'Can AI help triage eligibility for public programmes?', answer: 'AI assists with initial eligibility checks and routing, with case workers reviewing and approving final decisions.' },
        { question: 'What channels can citizens use to reach government services?', answer: 'WhatsApp, SMS, and digital portals are unified into a single case management workspace.' },
      ]}
    />
  );
}
