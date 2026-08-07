import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import CampaignManagement from '@/components/platform/CampaignManagement';

export const metadata: Metadata = {
  title: 'Campaign Management — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const PerformanceVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_32px_rgba(13,71,161,0.08)] p-6 w-full max-w-[360px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94a3b8] mb-4">Campaign Performance</div>
      <div className="flex items-center justify-between py-2 border-b border-[#f1f5f9]"><span className="text-xs text-[#475569] font-medium">Delivered</span><span className="text-sm font-extrabold text-[#0f172a]">48,204</span></div>
      <div className="flex items-center justify-between py-2 border-b border-[#f1f5f9]"><span className="text-xs text-[#475569] font-medium">Open rate</span><span className="text-sm font-extrabold text-[#16a34a]">62%</span></div>
      <div className="flex items-center justify-between py-2 border-b border-[#f1f5f9]"><span className="text-xs text-[#475569] font-medium">Click-through</span><span className="text-sm font-extrabold text-[#0D47A1]">18%</span></div>
      <div className="flex items-center justify-between py-2"><span className="text-xs text-[#475569] font-medium">Channels active</span><span className="text-sm font-extrabold text-[#7c3aed]">5</span></div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Campaign Management"
      eyebrow="Marketing Automation"
      title="Campaign Management"
      description="The Campaign Management module enables marketing teams to design, execute, and optimise multi-channel campaigns with sophisticated A/B testing, journey orchestration, and automated performance tracking."
      hideHero
      impactStats={[
        { title: 'Broadcast Campaigns', description: 'For announcements, promotions, and one-time communications delivered at scale across SMS, WhatsApp, email, and push notifications.' },
        { title: 'Multi-channel Campaign Execution', description: 'Across WhatsApp, SMS, email, push notifications, in-app messages, and social platforms, reach customers on every channel they use.' },
        { title: 'Event-triggered Campaigns', description: 'Responding to customer actions such as cart abandonment, sign-up, or inactivity with timely, personalised automated messages.' },
        { title: 'Visual Journey Builder', description: 'With drag-and-drop workflow design for complex, multi-step customer journeys. No engineering resources required.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Journey Orchestration',
          headline: 'Full Journey',
          title: 'Design Journeys, Not Just Messages',
          description: 'Move beyond one-off blasts. Build multi-step customer journeys with a visual, drag-and-drop builder — triggered by real customer behaviour.',
          visual: <CampaignManagement />,
        },
        {
          eyebrow: 'Every Channel',
          headline: 'Every Channel',
          title: 'One Campaign, Every Channel',
          description: 'Reach customers on WhatsApp, SMS, email, push, and social — from a single campaign, with performance tracked in one place.',
          visual: PerformanceVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'TestTube', title: 'A/B Testing', description: 'Test subject lines, content, and timing to optimise every send.' },
        { icon: 'FileCsv', title: 'Bulk Scheduling', description: 'Upload and schedule thousands of personalised messages via CSV.' },
        { icon: 'ChartBar', title: 'Unified Reporting', description: 'Track delivery, opens, clicks, and conversions across every channel in one view.' },
        { icon: 'Target', title: 'Audience Targeting', description: 'Send to precise segments built from behaviour, attributes, or purchase history.' },
        { icon: 'ClockCountdown', title: 'Send-Time Optimisation', description: 'Automatically deliver each message when a recipient is most likely to engage.' },
        { icon: 'ArrowsSplit', title: 'Conditional Branching', description: 'Route contacts down different paths based on how they respond.' },
      ]}
      faqs={[
        { question: 'How many contacts can I message in a single campaign?', answer: 'Bulk scheduling supports large contact lists via CSV upload, with sends managed automatically to respect channel rate limits.' },
        { question: 'Can I trigger campaigns based on customer behaviour?', answer: 'Yes. Campaigns can trigger on events like cart abandonment, sign-up, or inactivity, in addition to scheduled broadcasts.' },
        { question: 'Does Campaign Management support A/B testing?', answer: 'Yes — test messaging, timing, and creative variants, with performance tracked automatically to surface the winner.' },
        { question: 'Which channels can a single campaign use?', answer: 'WhatsApp, SMS, email, push notifications, and in-app messages can all be combined within one campaign journey.' },
      ]}
    />
  );
}
