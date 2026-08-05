import type { Metadata } from 'next';
import SocialPublishing from '../../../components/platform/SocialPublishing';

export const metadata: Metadata = {
  title: 'Social Media Management — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#EEF5FD_0%,#f8fafc_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-[#64748b] font-medium mb-5">
              <a href="/platform/" className="text-[#0D47A1]">Platform</a><span className="mx-[6px]">›</span>Social Media Management
            </div>
            <h1 className="text-[48px] font-extrabold text-[#0D47A1] leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">Social Media Management</h1>
            <p className="text-lg text-[#475569] max-w-[600px] leading-[1.7] mb-9">KronGage&apos;s Social Media Management module provides a comprehensive, enterprise-grade suite of tools for social media publishing, scheduling, content management, and performance analytics.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-[#0D47A1] text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#0a3a87]">Contact Us</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(13,71,161,0.15)] shrink-0 max-[900px]:h-[320px]">
            <SocialPublishing />
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-[72px] pb-20 max-[640px]:px-5 max-[640px]:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[38px] font-extrabold text-[#0D47A1] mb-10 max-[900px]:text-[28px]">Business Impact</h2>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Content Calendar</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Marketing teams can see scheduled, published, draft, and failed posts at a glance with color-coded platform indicators and status markers.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Bulk Scheduling</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">KronGage supports bulk scheduling via CSV upload with up to 500 posts per batch. Each CSV can include content, target platforms, scheduled date and time, media URLs, first comments, and hashtag groups.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">AI-Powered Content Optimisation</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">AI analyses historical engagement data to recommend the best times to post for each platform and audience. Generate platform-optimised posts from topic briefs, product descriptions, or campaign themes.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Analytics &amp; Reporting</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Comprehensive social media analytics track performance across all connected platforms with unified metrics, cross-platform comparison, and trend analysis.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
