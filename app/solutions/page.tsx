import type { Metadata } from 'next';
import Customer360 from '../../components/solutions/Customer360';
import HeroChannels from '../../components/platform/HeroChannels';
import CampaignManagement from '../../components/platform/CampaignManagement';
import HeroChatbot from '../../components/platform/HeroChatbot';

export const metadata: Metadata = {
  title: 'Solutions – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const industries = [
  { href: '/solutions/banking/', bg: '#EEF5FD', icon: '🏦', title: 'Banking & Finance', desc: 'Unify customer relationships across retail, SME, and corporate banking with compliant, contextual engagement at every touchpoint.', stat: '↑ 34% retention improvement', cta: 'Explore Banking' },
  { href: '/solutions/telecom/', bg: '#f0fdf4', icon: '📡', title: 'Telecommunications', desc: 'Reduce churn, drive upsell, and manage high-volume customer interactions across prepaid, postpaid, and enterprise segments.', stat: '↓ 70% response time', cta: 'Explore Telecom' },
  { href: '/solutions/fmcg/', bg: '#fef9c3', icon: '🛒', title: 'FMCG & Retail', desc: 'Drive loyalty, personalise promotions, and close the loop between digital campaigns and in-store or e-commerce purchases.', stat: '3× campaign ROI', cta: 'Explore FMCG' },
  { href: '/solutions/healthcare/', bg: '#fdf2f8', icon: '🏥', title: 'Healthcare', desc: 'Improve patient outcomes with secure, HIPAA-aware communication across appointment reminders, care follow-ups, and chronic disease management.', stat: '↑ 28% patient engagement', cta: 'Explore Healthcare' },
  { href: '/solutions/insurance/', bg: '#f0f9ff', icon: '🛡️', title: 'Insurance', desc: 'Accelerate claims resolution, reduce policyholder churn, and personalise renewal campaigns with AI-driven engagement workflows.', stat: '↑ 22% renewal rate', cta: 'Explore Insurance' },
  { href: '/solutions/government/', bg: '#faf5ff', icon: '🏛️', title: 'Government & Public Sector', desc: 'Deliver citizen services at scale across WhatsApp, SMS, and digital portals — with full audit trails and compliance built in.', stat: '5× citizen reach', cta: 'Explore Government' },
];

const industryPills = [
  { icon: '🏦', label: 'Banking', active: true },
  { icon: '📡', label: 'Telecom', active: false },
  { icon: '🛒', label: 'FMCG & Retail', active: false },
  { icon: '🏥', label: 'Healthcare', active: false },
  { icon: '🛡️', label: 'Insurance', active: false },
  { icon: '🏛️', label: 'Government', active: false },
];

const impactStats = [
  { num: '3', suffix: '×', desc: 'More conversations handled per agent with AI Copilot' },
  { num: '25', suffix: '%', desc: 'Increase in customer satisfaction scores' },
  { num: '70', suffix: '%', desc: 'Reduction in average response time' },
  { num: '5', suffix: '×', desc: 'More channels served from a single platform' },
];

const featureBullets = {
  customer360: [
    'Unified customer timeline across all channels',
    'AI-powered engagement & loyalty scoring',
    'Preferred channel detection & enforcement',
    'Next Best Action recommendations',
  ],
  inbox: [
    '8+ channels in a unified agent workspace',
    'Smart routing by skill, language, and priority',
    'AI-suggested replies with customer context',
    'SLA tracking and escalation workflows',
  ],
  campaigns: [
    'Visual journey builder with branching logic',
    'Behavioural and event-based triggers',
    'A/B testing across message variants',
    'Real-time delivery and conversion tracking',
  ],
  ai: [
    'AI agents for 24/7 tier-1 resolution',
    'Contextual reply suggestions for human agents',
    'Intent detection and smart escalation',
    'Multilingual support across all channels',
  ],
};

const platformTabs = [
  { key: 'customer360', icon: '👥', label: 'Customer 360' },
  { key: 'inbox', icon: '📥', label: 'Omnichannel Inbox' },
  { key: 'campaigns', icon: '📣', label: 'Campaign Management' },
  { key: 'ai', icon: '🤖', label: 'AI & Automation' },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_60%,#1565C0_100%)] px-[60px] pt-[148px] pb-[100px] max-[1024px]:px-8 max-[1024px]:pt-[132px] max-[1024px]:pb-20 max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="max-w-[1100px] mx-auto relative">
          <div className="text-xs font-bold text-white/50 uppercase tracking-[1.5px] mb-[18px]">Industry Solutions</div>
          <h1 className="text-[56px] font-extrabold text-white leading-[1.08] max-w-[680px] mb-5 tracking-[-1px] max-[1024px]:text-[42px] max-[640px]:text-[30px]">
            Built for the Industries<br />That <span className="not-italic text-[#93c5fd]">Run the World</span>
          </h1>
          <p className="text-lg text-white/70 max-w-[540px] leading-[1.65] mb-10 max-[640px]:text-[15px]">KronGage delivers tailored customer engagement for every major vertical — from regulated banking environments to high-volume telecoms and public sector services.</p>
          <div className="flex gap-[14px] flex-wrap mb-[60px]">
            <a href="/contact/" className="bg-white text-[#0D47A1] px-7 py-[13px] rounded-full text-[15px] font-bold transition-opacity hover:opacity-90">Talk to a Specialist</a>
            <a href="#industries" className="border-2 border-white/35 text-white px-[26px] py-[11px] rounded-full text-[15px] font-bold transition-colors hover:bg-white/10">Explore Industries</a>
          </div>
          <div className="flex gap-[10px] flex-wrap">
            {industryPills.map(pill => (
              <div
                key={pill.label}
                className={`flex items-center gap-2 border rounded-full px-4 py-2 text-[13px] font-bold cursor-pointer transition-all ${pill.active ? 'bg-white text-[#0D47A1] border-white' : 'bg-white/[0.08] border-white/[0.18] text-white/80'}`}
              >
                <span className="text-[15px]">{pill.icon}</span>{pill.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY CARDS */}
      <section className="px-[60px] py-20 bg-white max-[1024px]:px-8 max-[1024px]:py-16 max-[640px]:px-5 max-[640px]:py-12" id="industries">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">Verticals We Serve</div>
          <h2 className="text-[36px] font-extrabold text-[#0f172a] max-w-[560px] leading-[1.2] mb-12">Deep expertise across six industries</h2>
          <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {industries.map(ind => (
              <a
                key={ind.href}
                href={ind.href}
                className="group relative rounded-[20px] overflow-hidden border border-[#e2e8f0] bg-[#f8fafc] transition-[transform,box-shadow] duration-[250ms] cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,71,161,0.12)]"
              >
                <div className="px-7 pt-8 pb-7">
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-[26px] mb-5" style={{ background: ind.bg }}>{ind.icon}</div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-[10px]">{ind.title}</h3>
                  <p className="text-sm text-[#64748b] leading-[1.65] mb-5">{ind.desc}</p>
                  <span className="inline-flex items-center gap-[6px] text-xs font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full">{ind.stat}</span>
                </div>
                <div className="border-t border-[#e2e8f0] px-7 py-[14px] flex items-center justify-between text-[13px] font-bold text-[#0D47A1] bg-white transition-colors group-hover:bg-[#0D47A1] group-hover:text-white">
                  {ind.cta} <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_100%)] px-[60px] py-16 max-[1024px]:px-8 max-[1024px]:py-14 max-[640px]:px-5 max-[640px]:py-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-extrabold text-white mb-[10px]">Measurable impact across every industry</h2>
            <p className="text-[15px] text-white/60">Average outcomes reported by KronGage customers in the first 12 months</p>
          </div>
          <div className="grid grid-cols-4 gap-[2px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-2">
            {impactStats.map((stat, i) => (
              <div
                key={stat.desc}
                className={`text-center px-6 py-8 bg-white/[0.06] border-r border-white/[0.08] last:border-r-0 max-[1024px]:border-b max-[1024px]:odd:border-r max-[1024px]:[&:nth-last-child(-n+2)]:border-b-0`}
              >
                <div className="text-[52px] font-black text-white leading-none mb-2 [font-variant-numeric:tabular-nums]">0<span className="text-[32px] text-[#93c5fd]">{stat.suffix}</span></div>
                <div className="text-[13px] text-white/55 font-semibold leading-[1.5] max-w-[160px] mx-auto">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM PREVIEW TABS */}
      <section className="px-[60px] py-20 bg-[#f8fafc] max-[1024px]:px-8 max-[1024px]:py-16 max-[640px]:px-5 max-[640px]:py-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">One Platform</div>
          <h2 className="text-[36px] font-extrabold text-[#0f172a] max-w-[560px] leading-[1.2] mb-10">The same platform.<br />Tuned for your industry.</h2>
          <div className="grid grid-cols-[280px_1fr] gap-12 items-start max-[1024px]:grid-cols-1">

            {/* Tab nav */}
            <div className="flex flex-col gap-1 sticky top-[88px] max-[1024px]:flex-row max-[1024px]:flex-wrap max-[1024px]:static">
              {platformTabs.map((tab, i) => (
                <div
                  key={tab.key}
                  className={`flex items-center gap-[14px] px-4 py-[14px] rounded-xl text-sm font-bold cursor-pointer transition-all border ${i === 0 ? 'bg-white text-[#0D47A1] border-[#e2e8f0] shadow-[0_2px_12px_rgba(13,71,161,0.08)]' : 'text-[#64748b] border-transparent hover:bg-white hover:text-[#0f172a]'}`}
                >
                  <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center text-lg shrink-0 ${i === 0 ? 'bg-[#0D47A1]' : 'bg-[#EEF5FD]'}`}>{tab.icon}</div>
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Panels */}
            <div>
              <div>
                <div className="mb-7">
                  <h3 className="text-[28px] font-extrabold text-[#0f172a] mb-[10px]">A complete picture of every customer</h3>
                  <p className="text-[15px] text-[#64748b] leading-[1.7]">Regardless of which industry you operate in, KronGage gives your teams a single, continuously updated profile for every customer — combining transactional, behavioural, and communication data in one place.</p>
                </div>
                <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_48px_rgba(13,71,161,0.12)] border border-[#e2e8f0] mb-6">
                  <Customer360 />
                </div>
                <div className="grid grid-cols-2 gap-[14px] max-[640px]:grid-cols-1">
                  {featureBullets.customer360.map(f => (
                    <div key={f} className="flex items-start gap-[10px] bg-white rounded-xl px-4 py-[14px] border border-[#e2e8f0]">
                      <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-[5px] shrink-0" /><span className="text-[13px] font-semibold text-[#374151] leading-[1.45]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden">
                <div className="mb-7">
                  <h3 className="text-[28px] font-extrabold text-[#0f172a] mb-[10px]">Every channel. One inbox.</h3>
                  <p className="text-[15px] text-[#64748b] leading-[1.7]">WhatsApp, Email, SMS, Instagram, Facebook, X — all routed into a single intelligent inbox with full customer context. Your agents never switch tools. Your customers never repeat themselves.</p>
                </div>
                <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_48px_rgba(13,71,161,0.12)] border border-[#e2e8f0] mb-6">
                  <HeroChannels />
                </div>
                <div className="grid grid-cols-2 gap-[14px] max-[640px]:grid-cols-1">
                  {featureBullets.inbox.map(f => (
                    <div key={f} className="flex items-start gap-[10px] bg-white rounded-xl px-4 py-[14px] border border-[#e2e8f0]">
                      <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-[5px] shrink-0" /><span className="text-[13px] font-semibold text-[#374151] leading-[1.45]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden">
                <div className="mb-7">
                  <h3 className="text-[28px] font-extrabold text-[#0f172a] mb-[10px]">Campaigns that reach, convert, and retain</h3>
                  <p className="text-[15px] text-[#64748b] leading-[1.7]">Build multi-step journeys across SMS, WhatsApp, and email. Trigger based on behaviour, lifecycle stage, or custom events — and measure every outcome in real time.</p>
                </div>
                <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_48px_rgba(13,71,161,0.12)] border border-[#e2e8f0] mb-6">
                  <CampaignManagement />
                </div>
                <div className="grid grid-cols-2 gap-[14px] max-[640px]:grid-cols-1">
                  {featureBullets.campaigns.map(f => (
                    <div key={f} className="flex items-start gap-[10px] bg-white rounded-xl px-4 py-[14px] border border-[#e2e8f0]">
                      <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-[5px] shrink-0" /><span className="text-[13px] font-semibold text-[#374151] leading-[1.45]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden">
                <div className="mb-7">
                  <h3 className="text-[28px] font-extrabold text-[#0f172a] mb-[10px]">AI that works around the clock</h3>
                  <p className="text-[15px] text-[#64748b] leading-[1.7]">Automate tier-1 queries, draft contextual replies, detect intent, and escalate complex cases — all without losing the human touch your customers expect.</p>
                </div>
                <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_48px_rgba(13,71,161,0.12)] border border-[#e2e8f0] mb-6">
                  <HeroChatbot />
                </div>
                <div className="grid grid-cols-2 gap-[14px] max-[640px]:grid-cols-1">
                  {featureBullets.ai.map(f => (
                    <div key={f} className="flex items-start gap-[10px] bg-white rounded-xl px-4 py-[14px] border border-[#e2e8f0]">
                      <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-[5px] shrink-0" /><span className="text-[13px] font-semibold text-[#374151] leading-[1.45]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[60px] py-[100px] bg-white max-[1024px]:px-8 max-[1024px]:py-16 max-[640px]:px-5 max-[640px]:py-10">
        <div className="max-w-[1100px] mx-auto bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_60%,#1565C0_100%)] rounded-[28px] px-20 py-[72px] grid grid-cols-[1fr_auto] gap-12 items-center relative overflow-hidden max-[1024px]:grid-cols-1 max-[1024px]:px-12 max-[1024px]:py-12 max-[640px]:px-7 max-[640px]:py-9">
          <div className="absolute right-[-60px] top-[-60px] w-[300px] h-[300px] rounded-full bg-white/[0.04] pointer-events-none" />
          <div className="absolute right-[60px] bottom-[-80px] w-[200px] h-[200px] rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold text-white mb-[14px] leading-[1.2] max-[640px]:text-[26px]">Ready to see KronGage in your industry?</h2>
            <p className="text-base text-white/70 leading-[1.65] max-w-[500px]">Talk to one of our industry specialists and see how KronGage is already transforming customer engagement for organisations like yours across Africa, the Middle East, and beyond.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 relative max-[1024px]:flex-row max-[640px]:flex-col">
            <a href="/contact/" className="bg-white text-[#0D47A1] px-[30px] py-[14px] rounded-full text-[15px] font-bold text-center whitespace-nowrap transition-opacity hover:opacity-90">Book a Demo</a>
            <a href="/platform/" className="border-2 border-white/35 text-white px-7 py-3 rounded-full text-[15px] font-bold text-center whitespace-nowrap transition-colors hover:bg-white/10">Explore Platform</a>
          </div>
        </div>
      </section>
    </>
  );
}
