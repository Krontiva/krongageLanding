import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import Customer360 from '@/components/solutions/Customer360';

export const metadata: Metadata = {
  title: 'Customer 360 — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const ProfileVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_32px_rgba(13,71,161,0.08)] p-6 w-full max-w-[360px]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,#0D47A1,#1565C0)] flex items-center justify-center text-white text-sm font-extrabold">AK</div>
        <div><div className="text-sm font-bold text-[#0f172a]">Ama Konadu</div><div className="text-[11px] text-[#64748b]">Customer since Mar 2023</div></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#EEF5FD] rounded-xl p-3"><div className="text-lg font-extrabold text-[#0D47A1]">86</div><div className="text-[10px] text-[#64748b]">Lifetime score</div></div>
        <div className="bg-[#f0fdf4] rounded-xl p-3"><div className="text-lg font-extrabold text-[#16a34a]">Low</div><div className="text-[10px] text-[#64748b]">Churn risk</div></div>
        <div className="bg-[#fef3c7] rounded-xl p-3"><div className="text-lg font-extrabold text-[#b45309]">14</div><div className="text-[10px] text-[#64748b]">Interactions (90d)</div></div>
        <div className="bg-[#f3f0ff] rounded-xl p-3"><div className="text-lg font-extrabold text-[#7c3aed]">4</div><div className="text-[10px] text-[#64748b]">Channels used</div></div>
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Customer 360"
      eyebrow="Customer Data Platform"
      title="Customer 360"
      description="The KronGage Customer 360, a customer data platform (CDP), serves as the intelligence backbone of the entire platform, creating unified, actionable customer profiles from every interaction across all channels and touchpoints. Unlike siloed CRM systems, the CDP provides instantaneous, dynamic customer intelligence that powers personalisation, segmentation, and predictive engagement across the KronGage ecosystem."
      hideHero
      impactStats={[
        { title: 'Identity Resolution', description: 'At the core of the CDP is a sophisticated identity resolution engine that automatically merges customer data across disparate sources.' },
        { title: '360-Degree Customer Profiles', description: 'Each unified profile contains a comprehensive view of the customer, including demographic information, contact details across all channels, complete interaction history, social media profiles, and engagement data.' },
        { title: 'Business Intelligence & Analytics', description: "KronGage's analytics suite provides comprehensive business intelligence across all platform modules, powered by a high-performance engine that can aggregate millions of data points in real time." },
        { title: 'Custom Report Builder', description: 'Beyond pre-built dashboards, KronGage provides a powerful custom report builder that enables users to create tailored reports by selecting specific metrics, date ranges, filters, and visualisation types.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Identity Resolution',
          headline: 'One Profile',
          title: 'One Profile, Every Touchpoint',
          description: 'A sophisticated identity resolution engine automatically merges customer data across disparate sources into a single, unified profile — no manual matching required.',
          visual: <Customer360 />,
        },
        {
          eyebrow: 'Business Intelligence',
          headline: 'Built-In Insight',
          title: 'Insights Built Into Every Profile',
          description: 'Each unified profile carries more than contact details — it surfaces engagement history, predictive scores, and the context your team needs to act.',
          visual: ProfileVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'ChartLineUp', title: 'Predictive Scoring', description: 'Churn risk, lifetime value, and next-best-action scored for every profile.' },
        { icon: 'Funnel', title: 'Dynamic Segmentation', description: 'Build live segments from any combination of behaviour, attributes, or events.' },
        { icon: 'ShieldCheck', title: 'Consent Management', description: 'Track and enforce customer consent preferences across every profile.' },
        { icon: 'Plugs', title: 'CRM & Data Connectors', description: 'Sync profiles with the CRM and data warehouse tools you already use.' },
        { icon: 'ArrowsClockwise', title: 'Real-Time Profile Updates', description: 'Every profile updates instantly as new interactions happen, with no batch delays.' },
        { icon: 'Stack', title: 'Data Enrichment', description: 'Append firmographic and behavioural data to build a richer picture of every customer.' },
      ]}
      faqs={[
        { question: 'How does identity resolution work across channels?', answer: 'KronGage matches customer identifiers — phone numbers, emails, social handles, and more — to automatically merge interactions into one profile, without manual work.' },
        { question: 'Can I build custom segments for campaigns?', answer: 'Yes. Segments can combine behaviour, attributes, and real-time events, and stay live as customer data updates.' },
        { question: 'Is customer data siloed from other KronGage modules?', answer: 'No — Customer 360 is the shared intelligence layer behind the Inbox, Campaigns, and Analytics, so every module sees the same unified profile.' },
        { question: 'How is data privacy handled?', answer: 'Consent management and data residency controls are built in, so profiles respect customer preferences and regional compliance requirements automatically.' },
      ]}
    />
  );
}
