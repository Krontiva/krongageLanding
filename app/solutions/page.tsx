import type { Metadata } from 'next';
import Link from 'next/link';
import Customer360 from '../../components/solutions/Customer360';
import HeroChannels from '../../components/platform/HeroChannels';
import CampaignManagement from '../../components/platform/CampaignManagement';
import HeroChatbot from '../../components/platform/HeroChatbot';
import PhosphorIcon from '@/components/PhosphorIcon';

export const metadata: Metadata = {
  title: 'Solutions – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const industries = [
  { href: '/solutions/banking', bg: '#EEF5FD', icon: 'Bank' as const, title: 'Banking & Finance', desc: 'Unify customer relationships across retail, SME, and corporate banking with compliant, contextual engagement at every touchpoint.', stat: '↑ 34% retention improvement', cta: 'Explore Banking' },
  { href: '/solutions/telecom', bg: '#f0fdf4', icon: 'Broadcast' as const, title: 'Telecommunications', desc: 'Reduce churn, drive upsell, and manage high-volume customer interactions across prepaid, postpaid, and enterprise segments.', stat: '↓ 70% response time', cta: 'Explore Telecom' },
  { href: '/solutions/fmcg', bg: '#fef9c3', icon: 'ShoppingCart' as const, title: 'FMCG & Retail', desc: 'Drive loyalty, personalise promotions, and close the loop between digital campaigns and in-store or e-commerce purchases.', stat: '3× campaign ROI', cta: 'Explore FMCG' },
  { href: '/solutions/healthcare', bg: '#fdf2f8', icon: 'Heartbeat' as const, title: 'Healthcare', desc: 'Improve patient outcomes with secure, HIPAA-aware communication across appointment reminders, care follow-ups, and chronic disease management.', stat: '↑ 28% patient engagement', cta: 'Explore Healthcare' },
  { href: '/solutions/insurance', bg: '#f0f9ff', icon: 'ShieldCheck' as const, title: 'Insurance', desc: 'Accelerate claims resolution, reduce policyholder churn, and personalise renewal campaigns with AI-driven engagement workflows.', stat: '↑ 22% renewal rate', cta: 'Explore Insurance' },
  { href: '/solutions/government', bg: '#faf5ff', icon: 'Buildings' as const, title: 'Government & Public Sector', desc: 'Deliver citizen services at scale across WhatsApp, SMS, and digital portals — with full audit trails and compliance built in.', stat: '5× citizen reach', cta: 'Explore Government' },
];

const impactStats = [
  { num: '3', suffix: '×', desc: 'More conversations handled per agent with AI Copilot' },
  { num: '25', suffix: '%', desc: 'Increase in customer satisfaction scores' },
  { num: '70', suffix: '%', desc: 'Reduction in average response time' },
  { num: '5', suffix: '×', desc: 'More channels served from a single platform' },
];

const platformRows = [
  {
    eyebrow: 'Customer 360',
    headline: 'One Profile',
    title: 'A Complete Picture of Every Customer',
    description: 'Regardless of which industry you operate in, KronGage gives your teams a single, continuously updated profile for every customer — combining transactional, behavioural, and communication data in one place.',
    href: '/platform/customer-data',
    visual: <Customer360 />,
  },
  {
    eyebrow: 'Omnichannel Inbox',
    headline: 'One Inbox',
    title: 'Every Channel. One Inbox.',
    description: 'WhatsApp, Email, SMS, Instagram, Facebook, X — all routed into a single intelligent inbox with full customer context. Your agents never switch tools. Your customers never repeat themselves.',
    href: '/platform/omnichannel-inbox',
    visual: <HeroChannels />,
  },
  {
    eyebrow: 'Campaign Management',
    headline: 'Every Journey',
    title: 'Campaigns That Reach, Convert, and Retain',
    description: 'Build multi-step journeys across SMS, WhatsApp, and email. Trigger based on behaviour, lifecycle stage, or custom events — and measure every outcome in real time.',
    href: '/platform/campaign-management',
    visual: <CampaignManagement />,
  },
  {
    eyebrow: 'AI & Automation',
    headline: 'Always On',
    title: 'AI That Works Around the Clock',
    description: 'Automate tier-1 queries, draft contextual replies, detect intent, and escalate complex cases — all without losing the human touch your customers expect.',
    href: '/platform/ai-automation',
    visual: <HeroChatbot />,
  },
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
          <h1 className="text-[56px] font-normal text-white leading-[1.08] max-w-[680px] mb-5 tracking-[-1px] max-[1024px]:text-[42px] max-[640px]:text-[30px]">
            Built for the Industries<br />That <span className="not-italic text-[#93c5fd]">Run the World</span>
          </h1>
          <p className="text-lg text-white/70 max-w-[540px] leading-[1.65] mb-10 max-[640px]:text-[15px]">KronGage delivers tailored customer engagement for every major vertical — from regulated banking environments to high-volume telecoms and public sector services.</p>
          <div className="flex gap-[14px] flex-wrap mb-[60px]">
            <Link href="/contact" className="bg-white text-[#0D47A1] px-7 py-[13px] rounded-full text-[15px] font-bold transition-opacity hover:opacity-90">Talk to a Specialist</Link>
            <a href="#industries" className="border-2 border-white/35 text-white px-[26px] py-[11px] rounded-full text-[15px] font-bold transition-colors hover:bg-white/10">Explore Industries</a>
          </div>
          <div className="flex gap-[10px] flex-wrap">
            {industries.map(ind => (
              <Link
                key={ind.href}
                href={ind.href}
                className="flex items-center gap-2 border bg-white/[0.08] border-white/[0.18] text-white/80 rounded-full px-4 py-2 text-[13px] font-bold transition-all hover:bg-white/[0.16] hover:text-white hover:border-white/30"
              >
                <PhosphorIcon name={ind.icon} size={15} weight="duotone" color="currentColor" />{ind.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY CARDS */}
      <section className="px-[60px] py-20 bg-white max-[1024px]:px-8 max-[1024px]:py-16 max-[640px]:px-5 max-[640px]:py-12" id="industries">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">Verticals We Serve</div>
          <h2 className="text-[36px] font-normal text-[#0f172a] max-w-[560px] leading-[1.2] mb-12">Deep expertise across six industries</h2>
          <div className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {industries.map(ind => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group relative rounded-[20px] overflow-hidden border border-[#e2e8f0] bg-[#f8fafc] transition-[transform,box-shadow] duration-[250ms] cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,71,161,0.12)]"
              >
                <div className="px-7 pt-8 pb-7">
                  <div className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-5" style={{ background: ind.bg }}><PhosphorIcon name={ind.icon} size={26} weight="duotone" color="#0D47A1" /></div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-[10px]">{ind.title}</h3>
                  <p className="text-sm text-[#64748b] leading-[1.65] mb-5">{ind.desc}</p>
                  <span className="inline-flex items-center gap-[6px] text-xs font-bold text-[#0D47A1] bg-[#EEF5FD] px-3 py-1 rounded-full">{ind.stat}</span>
                </div>
                <div className="border-t border-[#e2e8f0] px-7 py-[14px] flex items-center justify-between text-[13px] font-bold text-[#0D47A1] bg-white transition-colors group-hover:bg-[#0D47A1] group-hover:text-white">
                  {ind.cta} <PhosphorIcon name="ArrowRight" size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_100%)] px-[60px] py-16 max-[1024px]:px-8 max-[1024px]:py-14 max-[640px]:px-5 max-[640px]:py-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-normal text-white mb-[10px]">Measurable impact across every industry</h2>
            <p className="text-[15px] text-white/60">Average outcomes reported by KronGage customers in the first 12 months</p>
          </div>
          <div className="grid grid-cols-4 gap-[2px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-2">
            {impactStats.map(stat => (
              <div
                key={stat.desc}
                className="text-center px-6 py-8 bg-white/[0.06] border-r border-white/[0.08] last:border-r-0 max-[1024px]:border-b max-[1024px]:odd:border-r max-[1024px]:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="text-[52px] font-black text-white leading-none mb-2 [font-variant-numeric:tabular-nums]">{stat.num}<span className="text-[32px] text-[#93c5fd]">{stat.suffix}</span></div>
                <div className="text-[13px] text-white/55 font-semibold leading-[1.5] max-w-[160px] mx-auto">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM PREVIEW */}
      <section className="bg-[#f8fafc] py-20 max-[640px]:py-12">
        <div className="max-w-[1100px] mx-auto px-[60px] max-[1024px]:px-8 max-[640px]:px-5">
          <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">One Platform</div>
          <h2 className="text-[36px] font-normal text-[#0f172a] max-w-[560px] leading-[1.2] mb-10">The same platform.<br />Tuned for your industry.</h2>
        </div>
        <div className="max-w-[1100px] mx-auto px-[60px] max-[1024px]:px-8 max-[640px]:px-0">
          <div className="flex flex-col divide-y divide-[#e2e8f0] border-y border-[#e2e8f0] bg-white">
            {platformRows.map((row, i) => {
              const imageRight = i % 2 !== 0;
              return (
                <div key={row.eyebrow} className="grid grid-cols-1 md:grid-cols-2 group">
                  <div className={`relative h-72 md:h-[420px] overflow-hidden ${imageRight ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      {row.visual}
                    </div>
                  </div>
                  <div className={`flex flex-col justify-center px-8 md:px-16 py-12 md:py-16 ${imageRight ? 'md:order-1' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-6">
                      {String(i + 1).padStart(2, '0')} — {row.eyebrow}
                    </p>
                    <h3 className="text-4xl md:text-5xl tracking-tight text-[#0f172a] mb-6 leading-none">
                      {row.headline}
                    </h3>
                    <div className="h-px w-10 bg-[#e2e8f0] mb-6" />
                    <p className="text-base font-medium text-[#0f172a] mb-3 leading-snug max-w-sm">
                      {row.title}
                    </p>
                    <p className="text-sm text-[#64748b] leading-relaxed max-w-sm mb-7">
                      {row.description}
                    </p>
                    <Link href={row.href} className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84] w-fit">
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[60px] py-[100px] bg-white max-[1024px]:px-8 max-[1024px]:py-16 max-[640px]:px-5 max-[640px]:py-10">
        <div className="max-w-[1100px] mx-auto bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_60%,#1565C0_100%)] rounded-[28px] px-20 py-[72px] grid grid-cols-[1fr_auto] gap-12 items-center relative overflow-hidden max-[1024px]:grid-cols-1 max-[1024px]:px-12 max-[1024px]:py-12 max-[640px]:px-7 max-[640px]:py-9">
          <div className="absolute right-[-60px] top-[-60px] w-[300px] h-[300px] rounded-full bg-white/[0.04] pointer-events-none" />
          <div className="absolute right-[60px] bottom-[-80px] w-[200px] h-[200px] rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl font-normal text-white mb-[14px] leading-[1.2] max-[640px]:text-[26px]">Ready to see KronGage in your industry?</h2>
            <p className="text-base text-white/70 leading-[1.65] max-w-[500px]">Talk to one of our industry specialists and see how KronGage is already transforming customer engagement for organisations like yours across Africa, the Middle East, and beyond.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 relative max-[1024px]:flex-row max-[640px]:flex-col">
            <Link href="/contact" className="bg-white text-[#0D47A1] px-[30px] py-[14px] rounded-full text-[15px] font-bold text-center whitespace-nowrap transition-opacity hover:opacity-90">Book a Demo</Link>
            <Link href="/platform" className="border-2 border-white/35 text-white px-7 py-3 rounded-full text-[15px] font-bold text-center whitespace-nowrap transition-colors hover:bg-white/10">Explore Platform</Link>
          </div>
        </div>
      </section>
    </>
  );
}
