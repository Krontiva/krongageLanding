import type { Metadata } from 'next';
import Link from 'next/link';
import PhosphorIcon from '@/components/PhosphorIcon';
import Customer360 from '@/components/solutions/Customer360';
import InboxDemo from '@/components/platform/InboxDemo';
import SocialPublishing from '@/components/platform/SocialPublishing';
import SocialMediaMgmt from '@/components/platform/SocialMediaMgmt';
import SecurityDemo from '@/components/platform/SecurityDemo';
import HeroChatbot from '@/components/platform/HeroChatbot';
import CampaignManagement from '@/components/platform/CampaignManagement';
import AnalyticsBi from '@/components/platform/AnalyticsBi';

export const metadata: Metadata = {
  title: 'Platform – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const MODULES = [
  {
    eyebrow: 'Omnichannel Inbox',
    headline: 'One Workspace',
    title: 'Every Conversation. Every Channel. One Workspace.',
    description: 'The command centre of KronGage. Manage all customer conversations across 15+ channels in a single, intelligent interface. Agents never need to switch between tools: every interaction is visible, searchable, and contextually enriched.',
    href: '/platform/omnichannel-inbox',
    visual: <InboxDemo />,
  },
  {
    eyebrow: 'Social Media Publishing',
    headline: 'Every Platform',
    title: 'Enterprise Social Media Management That Actually Works',
    description: 'Plan, create, schedule, and publish social content across all major platforms from one intuitive interface. Get the power of enterprise platforms with the simplicity and affordability designed for African businesses.',
    href: '/platform/social-media',
    visual: <SocialPublishing />,
  },
  {
    eyebrow: 'AI & Automation',
    headline: 'Smart Automation',
    title: 'Automate Conversations. Delight Customers.',
    description: 'Deploy intelligent AI copilots and chatbots that handle routine queries instantly, escalate complex issues seamlessly, and learn from every interaction, freeing teams to focus on what matters most.',
    href: '/platform/ai-automation',
    visual: <HeroChatbot />,
  },
  {
    eyebrow: 'Customer 360',
    headline: 'One Profile',
    title: 'A Complete View of Every Customer',
    description: 'Unify customer data from every touchpoint into a single, real-time profile. Understand behaviour, predict needs, and personalise every interaction, all from one powerful data platform.',
    href: '/platform/customer-data',
    visual: <Customer360 />,
  },
  {
    eyebrow: 'Campaign Management',
    headline: 'Every Channel',
    title: 'Run Smarter Campaigns Across Every Channel',
    description: 'Plan, execute, and optimise multi-channel campaigns from a single workspace. Track performance in real time, collaborate across teams, and drive measurable results across email, SMS, social, and more.',
    href: '/platform/campaign-management',
    visual: <CampaignManagement />,
  },
  {
    eyebrow: 'Analytics & BI',
    headline: 'Live Insights',
    title: 'Every Metric, One Dashboard',
    description: "Live dashboards, custom reports, and white-label exports bring together engagement, campaign, and revenue data from every module — so decisions are never made on stale numbers.",
    href: '/platform/analytics',
    visual: <AnalyticsBi />,
  },
  {
    eyebrow: 'Social Intelligence',
    headline: 'Full Visibility',
    title: "Know What They're Saying, Everywhere",
    description: 'Monitor brand activity across multiple platforms in real time. Track mentions, analyse sentiment, benchmark competitors, and respond proactively to emerging conversations, all from one powerful dashboard.',
    href: '/platform/social-intelligence',
    visual: <SocialMediaMgmt />,
  },
  {
    eyebrow: 'Security & Compliance',
    headline: 'Built-In Trust',
    title: 'Enterprise-Grade Security, Built In',
    description: 'Manage complex teams, enforce security policies, and maintain compliance with enterprise-grade controls designed for agencies managing multiple client accounts and for organisations with distributed teams.',
    href: '/platform/security',
    visual: <SecurityDemo />,
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <div className="bg-[#eff6ff] px-[60px] pt-[148px] pb-20 text-center max-[1024px]:px-8 max-[1024px]:pt-32 max-[1024px]:pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-12">
        <h1 className="text-[48px] font-normal text-[#0D47A1] max-w-[760px] mx-auto mb-5 leading-[1.1] tracking-[-1px] max-[1024px]:text-[38px] max-[640px]:text-[28px]">The Complete Customer Engagement Platform for Modern Businesses</h1>
        <p className="text-[17px] text-[#475569] max-w-[680px] mx-auto mb-9 leading-[1.7]">Multiple integrated modules. One powerful platform. Deliver exceptional customer experiences across every channel with AI-powered automation, unified data, and enterprise-grade security.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0D47A1] text-white px-7 py-[13px] rounded-full text-[15px] font-semibold transition-colors hover:bg-[#0a3a84]">
            Request a Demo <PhosphorIcon name="ArrowRight" size={16} weight="bold" />
          </Link>
          <a href="#modules" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-7 py-[13px] rounded-full text-[15px] font-semibold border-2 border-[#e2e8f0] transition-colors hover:border-[#0f172a]">
            <PhosphorIcon name="PlusCircle" size={16} weight="duotone" /> Explore the Platform
          </a>
        </div>
      </div>

      {/* MODULES */}
      <section id="modules" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 max-[640px]:px-0">
          <div className="flex flex-col divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
            {MODULES.map((mod, i) => {
              const imageRight = i % 2 !== 0;
              return (
                <div key={mod.eyebrow} className="grid grid-cols-1 md:grid-cols-2 group">
                  <div className={`relative h-72 md:h-[480px] overflow-hidden bg-[#f8fafc] flex items-center justify-center p-6 md:p-10 ${imageRight ? 'md:order-2' : ''}`}>
                    <div className="relative w-full h-full max-w-[460px] mx-auto rounded-2xl overflow-hidden border border-[#e2e8f0] transition-transform duration-700 ease-out group-hover:scale-105">
                      {mod.visual}
                    </div>
                  </div>
                  <div className={`flex flex-col justify-center px-8 md:px-16 py-12 md:py-20 ${imageRight ? 'md:order-1' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-6">
                      {String(i + 1).padStart(2, '0')} — {mod.eyebrow}
                    </p>
                    <h2 className="text-4xl md:text-5xl tracking-tight text-[#0f172a] mb-6 leading-none">
                      {mod.headline}
                    </h2>
                    <div className="h-px w-10 bg-[#e2e8f0] mb-6" />
                    <p className="text-base font-medium text-[#0f172a] mb-3 leading-snug max-w-sm">
                      {mod.title}
                    </p>
                    <p className="text-sm text-[#64748b] leading-relaxed max-w-sm mb-7">
                      {mod.description}
                    </p>
                    <Link href={mod.href} className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84] w-fit">
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="bg-[#0f172a] py-20 px-[60px] text-center max-[640px]:py-12 max-[640px]:px-5">
        <h2 className="text-[42px] font-normal text-white max-w-[600px] mx-auto mb-4 leading-[1.15] max-[640px]:text-[28px]">Transform Customer Engagement Today</h2>
        <p className="text-base text-[#64748b] max-w-[500px] mx-auto mb-10 leading-[1.7]">Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-7 py-[13px] rounded-full text-[15px] font-semibold hover:opacity-90">
            Request a Demo <PhosphorIcon name="ArrowRight" size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </>
  );
}
