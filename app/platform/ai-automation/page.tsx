import type { Metadata } from 'next';
import HeroChatbot from '../../../components/platform/HeroChatbot';

export const metadata: Metadata = {
  title: 'AI &amp; Automation — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-white/50 font-medium mb-5">
              <a href="/platform/" className="text-[#93c5fd]">Platform</a><span className="mx-[6px]">›</span>AI &amp; Automation
            </div>
            <h1 className="text-[48px] font-extrabold text-white leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">KronGage AI &amp; Automation</h1>
            <p className="text-lg text-white/75 max-w-[600px] leading-[1.7] mb-9">Artificial intelligence is woven into every layer of KronGage, from customer interaction handling and content creation to predictive analytics and workflow automation. The platform&apos;s AI-first architecture ensures that every customer engagement is enriched with intelligent insights while maintaining human oversight and control.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-white text-[#0D47A1] px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#e2e8f0]">Contact Us</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] shrink-0 max-[900px]:h-[320px]">
            <HeroChatbot />
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-[72px] pb-20 max-[640px]:px-5 max-[640px]:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[38px] font-extrabold text-[#0D47A1] mb-10 max-[900px]:text-[28px]">Business Impact</h2>
          <div className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Customer Support Agent</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">The Support Agent handles incoming customer enquiries across all channels. It searches the knowledge base, looks up customer history and account information, and provides accurate, contextual responses.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Content Creation Agent</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">The Content Agent assists marketing teams in generating, optimising, and repurposing content for social media and campaigns.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Routing Agent</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">The Routing Agent serves as the intelligent traffic controller, classifying every incoming interaction by intent, sentiment, language, and urgency to determine the optimal routing destination.</p>
            </div>
            <div className="bg-[#EEF5FD] rounded-2xl p-6 border border-[#dbeafe]">
              <h3 className="text-[15px] font-extrabold text-[#0f172a] mb-3 leading-[1.35]">Workflow Automation</h3>
              <p className="text-[13px] text-[#475569] leading-[1.65]">Beyond AI agents, KronGage provides a visual workflow automation engine that enables businesses to design and deploy complex, multi-step processes without coding.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
