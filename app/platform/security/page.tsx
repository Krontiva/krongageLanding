import type { Metadata } from 'next';
import PhosphorIcon from '@/components/PhosphorIcon';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import SecurityDemo from '@/components/platform/SecurityDemo';

export const metadata: Metadata = {
  title: 'Security & Compliance — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const COMPLIANCE_ITEMS = ['GDPR', 'NDPR', 'HIPAA', 'SOC 2-aligned controls'];

const ComplianceVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_32px_rgba(13,71,161,0.08)] p-6 w-full max-w-[360px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94a3b8] mb-4">Compliance Checklist</div>
      <div className="flex flex-col gap-3">
        {COMPLIANCE_ITEMS.map(item => (
          <div key={item} className="flex items-center gap-2.5 text-sm text-[#0f172a] font-semibold">
            <PhosphorIcon name="CheckCircle" size={18} weight="duotone" color="#16a34a" />{item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Security & Compliance"
      eyebrow="Enterprise Security"
      title="Enterprise Security & Compliance"
      description="KronGage is built from the ground up for enterprise-grade security — with AES-256 encryption, multi-factor authentication, role-based access controls, and full compliance audit trails built in."
      hideHero
      impactStats={[
        { title: 'End-to-End Encryption', description: 'All customer data and communications are protected with AES-256 encryption at rest and in transit — no exceptions.' },
        { title: 'Compliance Ready', description: 'Built-in tools for GDPR, NDPR, HIPAA, and financial sector regulations — including consent management and data residency controls.' },
        { title: 'Role-Based Access', description: 'Granular permission controls ensure every team member only accesses the data and features relevant to their role.' },
        { title: 'Audit Trails', description: 'Every interaction and system action is logged with a tamper-proof audit trail — ready for regulatory review at any moment.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Data Protection',
          headline: 'Always Encrypted',
          title: 'Encrypted By Default, Everywhere',
          description: 'Every piece of customer data and every message is protected with AES-256 encryption, both at rest and in transit — with no exceptions and no opt-out.',
          visual: <SecurityDemo />,
        },
        {
          eyebrow: 'Compliance & Access',
          headline: 'Fully Compliant',
          title: 'Built For Regulated Industries',
          description: 'From GDPR to sector-specific regulations, KronGage ships with the controls compliance teams ask for — not bolted on after the fact.',
          visual: ComplianceVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'Buildings', title: 'Single-Tenant Hosting', description: 'Dedicated infrastructure options for regulated industries.' },
        { icon: 'Key', title: 'Multi-Factor Authentication', description: 'Protect every account with MFA, enforced platform-wide.' },
        { icon: 'MapPinLine', title: 'Data Residency Controls', description: 'Choose where your data is stored to meet regional compliance requirements.' },
        { icon: 'ArrowsLeftRight', title: 'Data Portability', description: 'Export or delete customer data on request, fully aligned with GDPR rights.' },
        { icon: 'Eye', title: 'Session Monitoring', description: 'Track active sessions and revoke access instantly if a device is compromised.' },
        { icon: 'Certificate', title: 'Independent Security Audits', description: 'Infrastructure and access controls reviewed on a regular audit cycle.' },
      ]}
      faqs={[
        { question: 'Is customer data encrypted at all times?', answer: 'Yes — AES-256 encryption is applied at rest and in transit, with no exceptions, across the entire platform.' },
        { question: 'Which compliance frameworks does KronGage support?', answer: 'Built-in tools support GDPR, NDPR, HIPAA, and financial-sector regulations, including consent management and data residency controls.' },
        { question: 'Can we host on single-tenant infrastructure?', answer: 'Yes, single-tenant hosting is available for organisations in regulated industries that require dedicated infrastructure.' },
        { question: 'How are audit requirements handled?', answer: 'Every interaction and system action is logged in a tamper-proof audit trail, ready for regulatory review at any moment.' },
      ]}
    />
  );
}
