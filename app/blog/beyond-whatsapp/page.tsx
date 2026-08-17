import type { Metadata } from 'next';
import Image from 'next/image';
import PhosphorIcon from '@/components/PhosphorIcon';

export const metadata: Metadata = {
  title: 'Beyond WhatsApp: Building a True Omnichannel Experience in 2025 – KronGage Blog',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#064e3b_100%)] px-[60px] pt-[140px] pb-20 max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <Image src="https://images.unsplash.com/photo-1559526324-c1f275fbfa32" alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.88)_0%,rgba(6,78,59,0.82)_100%)]" />
        <div className="relative z-[1]">
          <div className="text-[13px] text-white/50 font-medium mb-6">
            <a href="/blog/" className="text-[#6ee7b7]">Blog</a><span className="mx-[6px]">›</span>Omnichannel
          </div>
          <div className="inline-block text-[11px] font-bold text-[#6ee7b7] bg-[#6ee7b7]/10 border border-[#6ee7b7]/25 px-[14px] py-1 rounded-full uppercase tracking-[0.8px] mb-5">
            Omnichannel
          </div>
          <h1 className="text-[46px] font-extrabold text-white leading-[1.12] max-w-[780px] mb-5 max-[640px]:text-[30px]">
            Beyond WhatsApp: Building a True Omnichannel Experience in 2025
          </h1>
          <p className="text-[19px] text-white/75 max-w-[680px] leading-[1.65] mb-8">
            WhatsApp is the channel. But it isn&apos;t the strategy. Here&apos;s the distinction that separates brands customers stay loyal to from brands they leave without warning.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-[10px]">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-base font-extrabold text-white">DB</div>
              <div>
                <div className="text-sm font-bold text-white">KronGage Editorial</div>
                <div className="text-xs text-white/50">Customer Engagement Intelligence</div>
              </div>
            </div>
            <div className="w-px h-9 bg-white/15" />
            <div className="text-[13px] text-white/55 font-semibold">May 2025</div>
            <div className="w-px h-9 bg-white/15" />
            <div className="text-[13px] text-white/55 font-semibold">6 min read</div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="grid grid-cols-[1fr_280px] gap-16 max-w-[1100px] mx-auto px-6 py-16 pb-20 max-[900px]:grid-cols-1">
          <article>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Walk into any marketing team in West Africa today and ask them about their digital strategy. Nine times out of ten, WhatsApp will come up in the first sentence. And they&apos;re right to be on WhatsApp — the penetration numbers don&apos;t lie. But here&apos;s the thing most of them get wrong: they&apos;ve confused presence on a channel with having an omnichannel strategy.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">These are not the same thing. Not even close.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">WhatsApp-first is a channel preference, shaped by where your customers already are. Omnichannel is an infrastructure decision — about how your data flows, how your team operates, and what a customer experiences when they switch from messaging you on WhatsApp to emailing your support team three days later.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Most brands fail at that last part. And that&apos;s where the loyalty dies.</p>

            <div className="grid grid-cols-3 gap-5 my-8 max-[900px]:grid-cols-2">
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#0D47A1] leading-none mb-2">73%</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">of customers use multiple channels during a single purchase journey</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#0D47A1] leading-none mb-2">89%</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">of customers are retained by companies with strong omnichannel engagement</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#0D47A1] leading-none mb-2">33%</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">of customers will abandon a brand after a single instance of having to repeat themselves</div>
              </div>
            </div>

            <h2 id="multi-vs-omni" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">Multi-Channel vs. Omnichannel: The Distinction That Costs Companies Revenue</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Multi-channel means you&apos;re present on multiple channels. Omnichannel means those channels share memory.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">It&apos;s a subtle difference that has enormous consequences. In a multi-channel setup, your WhatsApp team doesn&apos;t know what your email team told the customer last Tuesday. Your in-store rep doesn&apos;t know the customer raised a complaint on Instagram two weeks ago. Each interaction starts fresh. The customer has to re-explain their situation every single time.</p>

            <div className="grid grid-cols-2 gap-5 my-8 max-[900px]:grid-cols-1">
              <div className="rounded-2xl p-6 bg-[#fef2f2] border border-[#fecaca]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.8px] mb-3 text-[#dc2626]"><PhosphorIcon name="XCircle" size={14} weight="duotone" />Multi-Channel</div>
                <h4 className="text-base font-extrabold text-[#0f172a] mb-2">Channels without memory</h4>
                <p className="text-[13px] text-[#475569] leading-[1.6]">Customer contacts WhatsApp on Monday. Calls on Wednesday. Emails on Friday. Three different teams. Three separate conversations. Same problem, no resolution.</p>
              </div>
              <div className="rounded-2xl p-6 bg-[#f0fdf4] border border-[#bbf7d0]">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.8px] mb-3 text-[#16a34a]"><PhosphorIcon name="CheckCircle" size={14} weight="duotone" />Omnichannel</div>
                <h4 className="text-base font-extrabold text-[#0f172a] mb-2">One conversation, any channel</h4>
                <p className="text-[13px] text-[#475569] leading-[1.6]">Customer starts on WhatsApp. Escalates by email. Calls in. Every agent sees the full journey, picks up where the last left off. Problem resolved, loyalty intact.</p>
              </div>
            </div>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">This isn&apos;t a technology problem anymore. It was, five years ago. Now the infrastructure exists to unify everything. The problem today is mostly organisational — teams that operate in silos, tools that don&apos;t talk to each other, and leadership that hasn&apos;t connected the dots between fragmented experience and churn.</p>

            <div className="border-l-4 border-[#059669] bg-[#ecfdf5] rounded-r-xl px-7 py-6 my-8">
              <p className="text-lg font-bold text-[#059669] leading-[1.5] italic">&quot;Your customer doesn&apos;t care which department they&apos;re talking to. They have one relationship with your brand. The moment you make them feel otherwise, you&apos;ve already started losing them.&quot;</p>
            </div>

            <h2 id="requirements" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">What True Omnichannel Requires</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Let me be specific about what this actually takes, because a lot of vendors will sell you &quot;omnichannel&quot; and deliver multi-channel with a dashboard.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5"><strong>A unified customer profile.</strong> Every interaction — regardless of channel — appends to a single record. When a customer contacts you, any agent on any channel sees the same timeline: previous queries, channel history, purchase records, open issues, sentiment trends. Not a summary. The full picture.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5"><strong>Context-carrying conversations.</strong> When a conversation moves from WhatsApp to email to a phone call, the context travels with it. The agent doesn&apos;t say &quot;how can I help you?&quot; — they say &quot;I can see you&apos;ve been waiting on your claim since last Tuesday. Let me look into this.&quot;</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5"><strong>A single inbox for your team.</strong> Your agents shouldn&apos;t be logged into four different applications to handle WhatsApp, email, Instagram and SMS. One inbox, unified routing, AI-assisted prioritisation. This isn&apos;t a nice-to-have. Agent efficiency and customer experience are directly tied.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5"><strong>Channel-agnostic escalation paths.</strong> A customer who starts on self-service and needs a human should reach a human regardless of which channel they&apos;re on — and that handoff should feel like a continuation, not a fresh start.</p>

            <h2 id="whatsapp-trap" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">The WhatsApp Trap</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Here&apos;s something I see constantly: a brand invests heavily in WhatsApp Business, builds beautiful automated flows, gets solid engagement numbers. Then a segment of their customers starts showing churn signals — but the data is all inside WhatsApp and nobody&apos;s connected it to the CRM. By the time the retention team knows someone is at-risk, they&apos;ve already left.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">WhatsApp is a brilliant channel. But it can become a data silo as easily as any other tool if you&apos;re not intentional about integration. Your engagement data needs to flow back into a central profile, trigger downstream actions, and inform campaigns on every other channel. Otherwise, you&apos;ve just moved your silo to a green icon.</p>

            <h2 id="build-towards" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">What to Actually Build Towards</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">The brands winning at this in 2025 have two things in common. First, they&apos;ve standardised on a platform that provides the unified layer — not stitched together from six tools with a middleware nightmare, but genuinely unified from the ground up. Second, they&apos;ve organised their customer-facing teams around the customer, not around the channel.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">That second part is often harder than the technology. It requires breaking down the &quot;WhatsApp team&quot; and the &quot;email team&quot; and replacing them with a &quot;customer team&quot; that happens to handle multiple channels. It changes how you measure performance, how you assign ownership, and how you compensate people.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">But when you get it right — when a customer can start a conversation on your app, continue it on WhatsApp while commuting, and finish it with a phone call that picks up exactly where the message thread left off — that&apos;s when you stop competing on price and start competing on experience.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">And experience, done well, is a moat.</p>

            <div className="bg-[linear-gradient(135deg,#064e3b,#059669)] rounded-[20px] p-10 text-center mt-12">
              <h3 className="text-2xl font-extrabold text-white mb-3">See the Unified Inbox in Action</h3>
              <p className="text-[15px] text-white/75 mb-6 leading-[1.6]">WhatsApp, email, SMS, Instagram — one inbox, one customer record, zero context-switching. See how KronGage connects them.</p>
              <a href="/contact/" className="inline-block bg-white text-[#059669] px-8 py-[14px] rounded-full text-[15px] font-bold">Book a Demo</a>
            </div>

          </article>

          <aside className="pt-2">
            <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] mb-5">
              <h4 className="text-[13px] font-extrabold text-[#0f172a] mb-[14px] pb-3 border-b border-[#f1f5f9] uppercase tracking-[0.8px]">In This Article</h4>
              <a href="#multi-vs-omni" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#0D47A1] bg-[#EEF5FD] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">1</div>
                Multi-Channel vs. Omnichannel
              </a>
              <a href="#requirements" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#0D47A1] bg-[#EEF5FD] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">2</div>
                What True Omnichannel Requires
              </a>
              <a href="#whatsapp-trap" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#0D47A1] bg-[#EEF5FD] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">3</div>
                The WhatsApp Trap
              </a>
              <a href="#build-towards" className="flex gap-[10px] items-start py-2 text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#0D47A1] bg-[#EEF5FD] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">4</div>
                What to Actually Build Towards
              </a>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] mb-5">
              <h4 className="text-[13px] font-extrabold text-[#0f172a] mb-[14px] pb-3 border-b border-[#f1f5f9] uppercase tracking-[0.8px]">Related Reading</h4>
              <div className="py-3 border-b border-[#f1f5f9]">
                <div className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-[0.5px]">Customer Success</div>
                <h5 className="text-[13px] font-bold text-[#0f172a] mt-1 leading-[1.35]"><a href="/blog/retention-gap/">The Retention Gap: Why Success Teams Struggle</a></h5>
              </div>
              <div className="py-3 border-b border-[#f1f5f9]">
                <div className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-[0.5px]">AI &amp; Automation</div>
                <h5 className="text-[13px] font-bold text-[#0f172a] mt-1 leading-[1.35]"><a href="/blog/ai-support-tier-1/">How AI Agents Are Replacing Tier-1 Support</a></h5>
              </div>
              <div className="py-3">
                <div className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-[0.5px]">Analytics</div>
                <h5 className="text-[13px] font-bold text-[#0f172a] mt-1 leading-[1.35]"><a href="/blog/vanity-metrics-to-value/">From Vanity Metrics to Value</a></h5>
              </div>
            </div>
            <div className="rounded-2xl p-5 mb-5 bg-[linear-gradient(135deg,#064e3b,#059669)] border border-transparent">
              <h4 className="text-[13px] font-extrabold text-[#6ee7b7] mb-[14px] pb-3 border-b border-white/10 uppercase tracking-[0.8px]">See It Live</h4>
              <p className="text-[13px] text-white/65 leading-[1.6] mb-4">Watch how KronGage unifies WhatsApp, email, SMS, and social into one intelligent inbox — with full customer context on every interaction.</p>
              <a href="/contact/" className="block bg-white text-[#059669] text-center py-[11px] rounded-full text-[13px] font-bold">Request Demo →</a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
