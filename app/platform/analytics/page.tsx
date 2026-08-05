import type { Metadata } from 'next';
import AnalyticsBi from '../../../components/platform/AnalyticsBi';

export const metadata: Metadata = {
  title: 'Analytics &amp; Business Intelligence — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#EEF5FD_0%,#f8fafc_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-[#64748b] font-medium mb-5">
              <a href="/platform/" className="text-[#0D47A1]">Platform</a><span className="mx-[6px]">›</span>Analytics &amp; Business Intelligence
            </div>
            <h1 className="text-[48px] font-extrabold text-[#0D47A1] leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">Analytics &amp; Business Intelligence</h1>
            <p className="text-lg text-[#475569] max-w-[600px] leading-[1.7] mb-9">KronGage&apos;s Analytics module delivers comprehensive business intelligence through live dashboards, custom reports, and white-label exports, providing actionable insights across all platform modules.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-[#0D47A1] text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#0a3a87]">Contact Us</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(13,71,161,0.15)] shrink-0 max-[900px]:h-[320px]">
            <AnalyticsBi />
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-[72px] pb-20 max-[640px]:px-5 max-[640px]:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[38px] font-extrabold text-[#0D47A1] mb-10 max-[900px]:text-[28px]">Business Impact</h2>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Custom report builder</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">With drag-and-drop metric selection, date range filtering, and visualisation options to suit every team&apos;s reporting needs.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Real-time analytics engine</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">For high-speed aggregation across millions of data points, delivering live insights without delay or sampling.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Cross-module analytics</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Connecting social engagement, customer interactions, campaign performance, and revenue impact in one unified view.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Role-based dashboard access</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Ensuring each team, from executives to frontline agents, sees relevant metrics and KPIs without information overload.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
