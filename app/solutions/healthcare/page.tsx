import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import MultichannelMessagingCard from '@/components/solutions/MultichannelMessagingCard';
import AiTelecomSupport from '@/components/solutions/AiTelecomSupport';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Healthcare — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbRoot={{ label: 'Solutions', href: '/solutions' }}
      breadcrumbLabel="Healthcare"
      eyebrow="Healthcare"
      title="Transform Patient Engagement Across the Entire Continuum of Care"
      description="KronGage delivers unified patient engagement for health systems and providers, combining omnichannel communication and AI-powered clinical automation in one intelligent platform."
      hideHero
      impactStats={[
        { title: '38%', description: 'reduction in no-shows with automated multi-channel reminders' },
        { title: '55%', description: 'of routine enquiries can be handled by AI (scheduling, results)' },
        { title: '4x', description: 'improvement in patient satisfaction with proactive communication' },
      ]}
      capabilities={[
        {
          eyebrow: 'Omnichannel Service',
          headline: 'Every Touchpoint',
          title: 'Omnichannel Global Healthcare Service',
          description: 'Engineered specifically for enterprise healthcare providers navigating fragmented clinical landscapes, KronGage unifies every patient touchpoint into a single intelligent clinical command centre. This empowers care coordination teams to deliver frictionless care journeys.',
          visual: <MultichannelMessagingCard />,
        },
        {
          eyebrow: 'Patient Engagement',
          headline: 'Proactive Care',
          title: 'AI-Driven Patient Engagement & Advocacy',
          description: 'Integrate autonomous AI to resolve high-volume patient enquiries, freeing care teams to leverage intelligent clinical insights for complex care transitions and diagnostic hurdles.',
          visual: <AiTelecomSupport />,
        },
        {
          eyebrow: 'Patient 360',
          headline: 'Full Record',
          title: 'Customer 360 & Predictive Intelligence',
          description: 'Consolidate fragmented patient profile data from all digital touchpoints into a unified longitudinal patient record, providing concurrent visibility into the comprehensive end-to-end care journey.',
          visual: <Customer360 />,
        },
      ]}
      supportingFeatures={[
        { icon: 'CalendarCheck', title: 'Appointment Scheduling', description: 'Let patients book, reschedule, or cancel appointments across channels.' },
        { icon: 'ShieldCheck', title: 'HIPAA-Aware Messaging', description: 'Secure, compliant communication for sensitive patient information.' },
        { icon: 'Bell', title: 'Automated Care Reminders', description: 'Send medication, follow-up, and appointment reminders automatically.' },
        { icon: 'HeartStraight', title: 'Chronic Care Follow-Up', description: 'Maintain continuous check-ins for long-term condition management.' },
        { icon: 'Translate', title: 'Multilingual Patient Support', description: 'Communicate with patients in their preferred language, every time.' },
        { icon: 'ClockCounterClockwise', title: 'Longitudinal Patient Record', description: 'Every interaction, across every care setting, in one continuous history.' },
      ]}
      faqs={[
        { question: 'Is patient communication through KronGage secure and compliant?', answer: 'Yes, KronGage supports HIPAA-aware messaging with encryption and audit trails for every patient interaction.' },
        { question: 'Can KronGage automate appointment reminders?', answer: 'Yes, automated multi-channel reminders reduce no-shows and keep patients informed at every step.' },
        { question: 'Does KronGage integrate with our EHR system?', answer: 'KronGage connects with existing EHR and scheduling systems to keep patient context current across teams.' },
        { question: 'Can care teams collaborate on a single patient record?', answer: 'Yes, care coordination teams share one unified, longitudinal patient record across the platform.' },
      ]}
    />
  );
}
