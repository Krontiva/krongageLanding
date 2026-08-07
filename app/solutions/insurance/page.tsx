import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import InsuranceAiSupportVisual from '@/components/solutions/InsuranceAiSupportVisual';
import InsuranceIdentity360 from '@/components/solutions/InsuranceIdentity360';

export const metadata: Metadata = {
  title: 'Insurance — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="Insurance"
      eyebrow="Insurance"
      title="Reinvent the Insurer-Insured Relationship Across Every Global Distribution Channel"
      description="KronGage delivers unified policyholder engagement for carriers and agencies, combining omnichannel claims support, AI-powered underwriting automation, and enterprise-grade regulatory compliance in one intelligent platform."
      hideHero
      impactStats={[
        { title: '40%', description: 'increase in renewal rates with timely, personalised outreach' },
        { title: '60%', description: 'of claims status enquiries can be handled by AI' },
        { title: '3x', description: 'higher satisfaction when claims communication is proactive' },
      ]}
      capabilities={[
        {
          eyebrow: 'Omnichannel Service',
          headline: 'Every Channel',
          title: 'Omnichannel Global Insurance Service',
          description: 'Build lasting trust by turning the policyholder lifecycle into a continuous, personalised conversation. KronGage unifies every interaction into a single engagement hub, ensuring that whether a client is filing a claim or updating their coverage, they experience a seamless journey.',
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'AI Support',
          headline: 'Faster Claims',
          title: 'AI-Powered Insurance Support',
          description: 'Integrate autonomous AI to resolve high-volume policyholder enquiries, freeing adjusters and underwriters to leverage intelligent risk diagnostics for complex claims adjudication and coverage disputes.',
          visual: <InsuranceAiSupportVisual />,
        },
        {
          eyebrow: 'Policyholder 360',
          headline: 'Full Identity',
          title: '360° Policyholder Identity & Predictive Intelligence',
          description: 'Unify fragmented touchpoints into a single, intelligent profile. Gain complete visibility across every interaction: every policy, every life moment. Anticipate needs, engage proactively, build loyalty that lasts.',
          visual: <InsuranceIdentity360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'FileText', title: 'Claims Status Tracking', description: 'Give policyholders real-time updates on claims without calling in.' },
        { icon: 'ShieldCheck', title: 'Regulatory Compliance', description: 'Built-in controls support insurance regulatory and disclosure requirements.' },
        { icon: 'Bell', title: 'Renewal Reminders', description: 'Automated, personalised outreach ahead of policy renewal dates.' },
        { icon: 'Robot', title: 'AI Claims Triage', description: 'Classify and route incoming claims by type, urgency, and complexity.' },
        { icon: 'ChartLineUp', title: 'Churn Risk Scoring', description: 'Flag policyholders at risk of lapsing before renewal is due.' },
        { icon: 'UsersThree', title: 'Agent & Broker Routing', description: 'Connect policyholders to the right agent or broker automatically.' },
      ]}
      faqs={[
        { question: 'Can policyholders check claims status through KronGage?', answer: 'Yes, policyholders can get real-time claims updates across WhatsApp, SMS, email, and webchat.' },
        { question: 'Does KronGage support regulatory compliance for insurers?', answer: 'Yes, consent management, audit trails, and role-based access align with insurance regulatory requirements.' },
        { question: 'Can AI help triage incoming claims?', answer: 'Yes, AI classifies claims by type and urgency, routing complex cases to the right adjuster with full context.' },
        { question: 'How does KronGage help reduce policy lapses?', answer: 'Predictive churn scoring flags at-risk policyholders so teams can reach out with personalised renewal outreach in time.' },
      ]}
    />
  );
}
