import type { Metadata } from 'next';
import RetentionGapChart from '../../components/blog/RetentionGapChart';
import AiHandoffScene from '../../components/blog/AiHandoffScene';
import OmnichannelScene from '../../components/blog/OmnichannelScene';
import VanityMetricsScene from '../../components/blog/VanityMetricsScene';

export const metadata: Metadata = {
  title: 'Blog – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main className="flex-1 max-w-[1100px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">Insights &amp; Perspectives</div>
        <h1 className="text-[44px] font-extrabold text-[#0f172a] leading-[1.15] mb-[14px] max-[640px]:text-[30px]">The KronGage Blog</h1>
        <p className="text-[17px] text-[#64748b] max-w-[560px] leading-[1.7]">Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.</p>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-10 max-[900px]:grid-cols-1">
        {/* Featured article */}
        <a href="/blog/retention-gap/" className="bg-white rounded-[20px] overflow-hidden border border-[#e2e8f0] transition-shadow hover:shadow-[0_12px_40px_rgba(13,71,161,0.1)]">
          <div className="w-full h-[280px] overflow-hidden relative bg-[#0f172a]">
            <div className="pointer-events-none"><RetentionGapChart /></div>
            <div className="absolute inset-0 z-[1] cursor-pointer"></div>
          </div>
          <div className="p-9">
            <span className="inline-block text-[11px] font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full uppercase tracking-[0.8px] mb-4">Customer Success</span>
            <h2 className="text-[28px] font-extrabold text-[#0f172a] leading-[1.2] mb-[14px]">The Retention Gap: Why Success Teams Struggle</h2>
            <p className="text-[15px] text-[#64748b] leading-[1.7] mb-6">In an era of endless options, &quot;customer success&quot; has become more than just a department — it&apos;s a survival strategy. Yet despite record investment in CS tooling, most teams are losing the retention battle. Here&apos;s why.</p>
            <div className="flex items-center gap-4 text-[13px] text-[#94a3b8] font-semibold">
              <span>KronGage Editorial</span>
              <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
              <span>May 2025</span>
              <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
              <span>8 min read</span>
            </div>
            <br />
            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1]">Read article →</span>
          </div>
        </a>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="text-xs font-bold text-[#94a3b8] tracking-[1px] uppercase mb-1 pb-3 border-b border-[#f1f5f9]">More from the Blog</div>

          <a href="/blog/ai-support-tier-1/" className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] transition-shadow hover:shadow-[0_6px_24px_rgba(13,71,161,0.08)]">
            <div className="w-full h-[130px] overflow-hidden relative bg-[#f8fafc] border-b border-[#f1f5f9]">
              <div className="pointer-events-none"><AiHandoffScene /></div>
            </div>
            <div className="px-5 pt-4 pb-5">
              <span className="inline-block text-[10px] font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full uppercase tracking-[0.8px] mb-[10px]">AI &amp; Automation</span>
              <h3 className="text-[15px] font-bold text-[#0f172a] leading-[1.35] mb-2">How AI Agents Are Replacing Tier-1 Support — Without Losing the Human Touch</h3>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Most companies automate the wrong things first. Here&apos;s what the best operators figured out — and why the handoff is everything.</p>
              <div className="flex items-center gap-4 text-xs text-[#94a3b8] font-semibold mt-3">
                <span>June 2025</span>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
                <span>7 min read</span>
              </div>
            </div>
          </a>

          <a href="/blog/beyond-whatsapp/" className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] transition-shadow hover:shadow-[0_6px_24px_rgba(13,71,161,0.08)]">
            <div className="w-full h-[130px] overflow-hidden relative bg-[#f8fafc] border-b border-[#f1f5f9]">
              <div className="pointer-events-none"><OmnichannelScene /></div>
            </div>
            <div className="px-5 pt-4 pb-5">
              <span className="inline-block text-[10px] font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full uppercase tracking-[0.8px] mb-[10px]">Omnichannel</span>
              <h3 className="text-[15px] font-bold text-[#0f172a] leading-[1.35] mb-2">Beyond WhatsApp: Building a True Omnichannel Experience in 2025</h3>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">WhatsApp is just the start. Here&apos;s how leading brands are unifying every customer touchpoint under one intelligent inbox.</p>
              <div className="flex items-center gap-4 text-xs text-[#94a3b8] font-semibold mt-3">
                <span>May 2025</span>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
                <span>6 min read</span>
              </div>
            </div>
          </a>

          <a href="/blog/vanity-metrics-to-value/" className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] transition-shadow hover:shadow-[0_6px_24px_rgba(13,71,161,0.08)]">
            <div className="w-full h-[130px] overflow-hidden relative bg-[#f8fafc] border-b border-[#f1f5f9]">
              <div className="pointer-events-none"><VanityMetricsScene /></div>
            </div>
            <div className="px-5 pt-4 pb-5">
              <span className="inline-block text-[10px] font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full uppercase tracking-[0.8px] mb-[10px]">Analytics</span>
              <h3 className="text-[15px] font-bold text-[#0f172a] leading-[1.35] mb-2">From Vanity Metrics to Value: What Your Customer Data Is Really Telling You</h3>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Most dashboards show what happened. The best ones show what to do next. Here&apos;s how to close that gap.</p>
              <div className="flex items-center gap-4 text-xs text-[#94a3b8] font-semibold mt-3">
                <span>April 2025</span>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
                <span>7 min read</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
