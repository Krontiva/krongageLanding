import type { Metadata } from 'next';
import PhosphorIcon from '@/components/PhosphorIcon';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import AnalyticsBi from '@/components/platform/AnalyticsBi';

export const metadata: Metadata = {
  title: 'Analytics & Business Intelligence — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const REPORT_BARS = [40, 65, 50, 80, 55, 90, 70];

const ReportVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 w-full max-w-[360px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94a3b8] mb-4">Custom Report</div>
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center gap-2 text-xs text-[#475569]"><PhosphorIcon name="CheckSquare" size={14} weight="duotone" color="#0D47A1" />Response time by channel</div>
        <div className="flex items-center gap-2 text-xs text-[#475569]"><PhosphorIcon name="CheckSquare" size={14} weight="duotone" color="#0D47A1" />Campaign ROI, last 90 days</div>
        <div className="flex items-center gap-2 text-xs text-[#94a3b8]"><PhosphorIcon name="Square" size={14} weight="regular" color="#cbd5e1" />Agent utilisation</div>
      </div>
      <div className="flex h-16 items-end gap-1.5">
        {REPORT_BARS.map((h, i) => (
          <div key={i} className="flex-1 bg-[#0D47A1] rounded-t-sm" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Analytics & Business Intelligence"
      eyebrow="Business Intelligence"
      title="Analytics & Business Intelligence"
      description="KronGage's Analytics module delivers comprehensive business intelligence through live dashboards, custom reports, and white-label exports, providing actionable insights across all platform modules."
      hideHero
      impactStats={[
        { title: 'Custom Report Builder', description: "With drag-and-drop metric selection, date range filtering, and visualisation options to suit every team's reporting needs." },
        { title: 'Real-Time Analytics Engine', description: 'For high-speed aggregation across millions of data points, delivering live insights without delay or sampling.' },
        { title: 'Cross-Module Analytics', description: 'Connecting social engagement, customer interactions, campaign performance, and revenue impact in one unified view.' },
        { title: 'Role-Based Dashboard Access', description: 'Ensuring each team, from executives to frontline agents, sees relevant metrics and KPIs without information overload.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Live Dashboards',
          headline: 'Live Metrics',
          title: 'Every Metric, Live, In One Place',
          description: 'KronGage aggregates data from every module — inbox, campaigns, social, and customer profiles — into live dashboards that update in real time.',
          visual: <AnalyticsBi />,
        },
        {
          eyebrow: 'Custom Reporting',
          headline: 'Your Reports',
          title: 'Reports Built For How Your Team Works',
          description: 'Beyond pre-built dashboards, build tailored reports with the exact metrics, filters, and visualisations each team needs — and share them safely.',
          visual: ReportVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'Export', title: 'White-Label Exports', description: 'Share polished reports with stakeholders and clients, on your brand.' },
        { icon: 'Bell', title: 'Threshold Alerts', description: 'Get notified automatically when a metric crosses a defined threshold.' },
        { icon: 'Funnel', title: 'Funnel Analysis', description: 'Track conversion at every step, from first touch to resolution or sale.' },
        { icon: 'Compass', title: 'Cohort Comparison', description: 'Compare performance across customer segments, time periods, or campaigns.' },
        { icon: 'FileArrowDown', title: 'Scheduled Report Delivery', description: 'Have key reports delivered automatically to inboxes on a set schedule.' },
        { icon: 'Database', title: 'Data Warehouse Sync', description: 'Pipe KronGage data into your existing warehouse or BI tools.' },
      ]}
      faqs={[
        { question: 'Can I build reports without engineering help?', answer: 'Yes. The custom report builder is drag-and-drop, letting any team member select metrics, filters, and visualisations without code.' },
        { question: 'Does analytics cover all platform modules?', answer: 'Yes — dashboards can combine data from the Inbox, Campaigns, Social, and Customer 360 in a single, cross-module view.' },
        { question: 'Can I restrict who sees which dashboards?', answer: 'Role-based access controls ensure each team, from executives to frontline agents, sees only relevant metrics.' },
        { question: 'Can reports be shared outside our organisation?', answer: 'Yes, white-label exports let you share polished reports with clients or stakeholders without exposing the underlying platform.' },
      ]}
    />
  );
}
