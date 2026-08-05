import type { Metadata } from 'next';
import Customer360 from '../../components/solutions/Customer360';
import InboxDemo from '../../components/platform/InboxDemo';
import SocialPublishing from '../../components/platform/SocialPublishing';
import SocialMediaMgmt from '../../components/platform/SocialMediaMgmt';
import KnowledgeBase from '../../components/platform/KnowledgeBase';
import SecurityDemo from '../../components/platform/SecurityDemo';
import HeroChatbot from '../../components/platform/HeroChatbot';
import CampaignManagement from '../../components/platform/CampaignManagement';

export const metadata: Metadata = {
  title: 'Platform – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const securityItems = [
  'Single Sign-On (SSO) with OIDC and OAuth 2.0 support',
  'Field-level encryption for personally identifiable information (PII)',
  'Multi-factor authentication (MFA) with TOTP and SMS options',
  'Session management and automatic timeout controls',
  'Flexible role-based access control',
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <div className="bg-[#eff6ff] px-[60px] pt-[148px] pb-20 text-center max-[1024px]:px-8 max-[1024px]:pt-32 max-[1024px]:pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-12">
        <h1 className="text-[48px] font-extrabold text-[#0D47A1] max-w-[760px] mx-auto mb-5 leading-[1.1] tracking-[-1px] max-[1024px]:text-[38px] max-[640px]:text-[28px]">The Complete Customer Engagement Platform for Modern Businesses</h1>
        <p className="text-[17px] text-[#475569] max-w-[680px] mx-auto mb-9 leading-[1.7]">Multiple integrated modules. One powerful platform. Deliver exceptional customer experiences across every channel with AI-powered automation, unified data, and enterprise-grade security.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact/" className="inline-flex items-center gap-2 bg-[#0D47A1] text-white px-7 py-[13px] rounded-full text-[15px] font-semibold transition-colors hover:bg-[#0a3a84]">Request a Demo →</a>
          <a href="#features" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-7 py-[13px] rounded-full text-[15px] font-semibold border-2 border-[#e2e8f0] transition-colors hover:border-[#0f172a]">⊕ Explore the Platform</a>
        </div>
      </div>

      <div id="features"></div>

      {/* OMNICHANNEL INBOX */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Omnichannel Inbox</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Every Conversation. Every Channel. One Workspace.</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">The command centre of KronGage. Manage all customer conversations across 15+ channels in a single, intelligent interface. Agents never need to switch between tools: every interaction is visible, searchable, and contextually enriched.</p>
          <a href="/platform/omnichannel-inbox/" className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84]">Learn More</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <InboxDemo />
          </div>
        </div>
      </section>

      {/* SOCIAL PUBLISHING */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex flex-row-reverse items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Social Media Publishing</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Enterprise Social Media Management That Actually Works</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Plan, create, schedule, and publish social content across all major platforms from one intuitive interface. Get the power of enterprise platforms with the simplicity and affordability designed for African businesses.</p>
          <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84]">Learn More</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <SocialPublishing />
          </div>
        </div>
      </section>

      {/* SOCIAL LISTENING */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Social Listening &amp; Monitoring</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Know What They&apos;re Saying Before It&apos;s Too Late</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Monitor brand activity across multiple platforms in real time. Track mentions, analyse sentiment, benchmark competitors, and respond proactively to emerging conversations, all from one powerful dashboard.</p>
          <a href="/contact/" className="inline-block bg-[#0f172a] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#1e293b]">Contact Us</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <SocialMediaMgmt />
          </div>
        </div>
      </section>

      {/* KNOWLEDGE MANAGEMENT */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex flex-row-reverse items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Knowledge Management &amp; RAG</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Smart Answers. Instantly.</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Power both customer self-service and agent-assisted support with an AI-driven knowledge base. Retrieval-Augmented Generation (RAG) technology ensures every answer is contextually relevant, accurate, and drawn from the most current information.</p>
          <a href="/contact/" className="inline-block bg-[#0f172a] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#1e293b]">Contact Us</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <KnowledgeBase />
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Security &amp; Compliance</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Enterprise-Grade Security, Built In</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Manage complex teams, enforce security policies, and maintain compliance with enterprise-grade controls designed for agencies managing multiple client accounts and for organisations with distributed teams.</p>
          <p className="font-bold text-[#0f172a] mt-5 mb-3 text-sm">Enterprise Authentication &amp; Security</p>
          <ul className="list-none mb-7 flex flex-col gap-[10px]">
            {securityItems.map(item => (
              <li key={item} className="flex gap-[10px] text-sm text-[#334155]">
                <span className="text-[#0D47A1] font-bold shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
          <a href="/contact/" className="inline-block bg-[#0f172a] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#1e293b]">Contact Us</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <SecurityDemo />
          </div>
        </div>
      </section>

      {/* AI & AUTOMATION */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex flex-row-reverse items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">AI &amp; Automation</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Automate Conversations. Delight Customers.</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Deploy intelligent AI copilots and chatbots that handle routine queries instantly, escalate complex issues seamlessly, and learn from every interaction, freeing teams to focus on what matters most.</p>
          <a href="/platform/ai-automation/" className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84]">Learn More</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <HeroChatbot />
          </div>
        </div>
      </section>

      {/* CUSTOMER 360 */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Customer 360</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">A Complete View of Every Customer</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Unify customer data from every touchpoint into a single, real-time profile. Understand behaviour, predict needs, and personalise every interaction, all from one powerful data platform.</p>
          <a href="/platform/customer-data/" className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84]">Learn More</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <Customer360 />
          </div>
        </div>
      </section>

      {/* CAMPAIGN MANAGEMENT */}
      <div className="bg-[#f8fafc] h-px mx-[60px] max-[640px]:mx-5" />
      <section className="py-[72px] px-[60px] max-w-[1200px] mx-auto flex flex-row-reverse items-center gap-[72px] max-[1024px]:py-14 max-[1024px]:px-8 max-[1024px]:gap-12 max-[640px]:flex-col max-[640px]:py-10 max-[640px]:px-5 max-[640px]:gap-8">
        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#0D47A1] mb-3">Campaign Management</div>
          <h2 className="text-[30px] font-extrabold text-[#0D47A1] mb-[14px] leading-[1.25]">Run Smarter Campaigns Across Every Channel</h2>
          <p className="text-[15px] text-[#475569] leading-[1.7] mb-7">Plan, execute, and optimise multi-channel campaigns from a single workspace. Track performance in real time, collaborate across teams, and drive measurable results across email, SMS, social, and more.</p>
          <a href="/platform/campaign-management/" className="inline-block bg-[#0D47A1] text-white px-[22px] py-[11px] rounded-lg text-sm font-semibold transition-colors hover:bg-[#0a3a84]">Learn More</a>
        </div>
        <div className="flex-1 shrink-0">
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]">
            <CampaignManagement />
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="bg-[#0f172a] py-20 px-[60px] text-center max-[640px]:py-12 max-[640px]:px-5">
        <h2 className="text-[42px] font-extrabold text-white max-w-[600px] mx-auto mb-4 leading-[1.15] max-[640px]:text-[28px]">Transform Customer Engagement Today</h2>
        <p className="text-base text-[#64748b] max-w-[500px] mx-auto mb-10 leading-[1.7]">Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/contact/" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-7 py-[13px] rounded-full text-[15px] font-semibold hover:opacity-90">Request a Demo →</a>
        </div>
      </section>
    </>
  );
}
