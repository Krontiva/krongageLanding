import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'From Vanity Metrics to Value: What Your Customer Data Is Really Telling You – KronGage Blog',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const numberedItems = [
  {
    title: 'Product engagement decay rate',
    body: `How quickly is the customer's usage declining from their peak? A customer who logged in daily during month one and is now monthly is not a "monthly active user." They're a pre-churn signal. Track the slope, not the absolute number.`,
  },
  {
    title: 'Support contact frequency change',
    body: 'Customers who suddenly start contacting support more than their historical average are often struggling with something. Customers who go silent after previously being active are often already gone in their head. Both patterns matter.',
  },
  {
    title: 'Net Revenue Retention (NRR)',
    body: 'This is the one number that forces honesty. NRR tells you whether your existing customers are collectively worth more or less than they were 12 months ago, accounting for churn, downgrades, upsells, and expansions. Anything above 100% means your base is growing without new sales. Below 100% means you\'re running to stand still.',
  },
  {
    title: 'Time-to-value by acquisition channel',
    body: "Customers from different sources have radically different retention profiles. If you're not segmenting your retention data by acquisition channel, you're likely averaging away the insight that one channel delivers customers who stay for three years while another delivers customers who churn at six months.",
  },
  {
    title: 'Milestone completion rate in the first 30 days',
    body: "Whatever the key actions are in your product's first month — the ones that correlate with long-term retention — track what percentage of new customers complete them. This is the leading indicator that tells you your retention story before the retention story is written.",
  },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_100%)] px-[60px] pt-[140px] pb-20 max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(30,27,75,0.88)_0%,rgba(49,46,129,0.82)_100%)]" />
        <div className="relative z-[1]">
          <div className="text-[13px] text-white/50 font-medium mb-6">
            <a href="/blog/" className="text-[#a5b4fc]">Blog</a><span className="mx-[6px]">›</span>Analytics
          </div>
          <div className="inline-block text-[11px] font-bold text-[#a5b4fc] bg-[#a5b4fc]/10 border border-[#a5b4fc]/25 px-[14px] py-1 rounded-full uppercase tracking-[0.8px] mb-5">
            Analytics
          </div>
          <h1 className="text-[46px] font-extrabold text-white leading-[1.12] max-w-[780px] mb-5 max-[640px]:text-[30px]">
            From Vanity Metrics to Value: What Your Customer Data Is Really Telling You
          </h1>
          <p className="text-[19px] text-white/75 max-w-[680px] leading-[1.65] mb-8">
            Your dashboard looks impressive. Your retention numbers say otherwise. The gap between them is where most customer strategies quietly fall apart.
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
            <div className="text-[13px] text-white/55 font-semibold">April 2025</div>
            <div className="w-px h-9 bg-white/15" />
            <div className="text-[13px] text-white/55 font-semibold">7 min read</div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="grid grid-cols-[1fr_280px] gap-16 max-w-[1100px] mx-auto px-6 py-16 pb-20 max-[900px]:grid-cols-1">
          <article>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">There is a certain kind of meeting where someone puts up a slide with 2.4 million impressions, a 38% email open rate, and 12,000 new followers — and everyone nods. The numbers are big. The trend lines go up. The meeting ends.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">And three months later, churn is at 8%.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">This is the vanity metric trap, and it is far more expensive than most leadership teams realise. Not because these numbers are fake — they&apos;re real. But because they measure activity, not outcomes. They tell you what happened to your content, not what happened to your customers.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">The companies that are winning the retention game have figured out a different set of numbers to obsess over. Let me tell you what those are and why they&apos;re different.</p>

            <div className="grid grid-cols-3 gap-5 my-8 max-[900px]:grid-cols-2">
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#6d28d9] leading-none mb-2">67%</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">of companies cite &quot;too much data, not enough insight&quot; as their primary analytics challenge</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#6d28d9] leading-none mb-2">5×</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">more expensive to acquire a new customer than to retain an existing one</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] text-center">
                <div className="text-4xl font-black text-[#6d28d9] leading-none mb-2">1%</div>
                <div className="text-[13px] text-[#64748b] font-semibold leading-[1.4]">reduction in churn can increase company value by as much as 12% over five years</div>
              </div>
            </div>

            <h2 id="vanity-problem" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">The Vanity Metric Problem, Precisely Defined</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">A vanity metric is any number that can go up while your business goes down. That&apos;s the test. Impressions can increase while revenue falls. Open rates can climb while churn accelerates. Follower counts can surge while NPS craters.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">These metrics feel good because they&apos;re responsive. You run a campaign, impressions jump. You A/B test a subject line, open rate ticks up. The feedback loop is short and satisfying. The problem is that the feedback loop has nothing to do with whether the customer stayed, bought again, or recommended you.</p>

            <div className="border-l-4 border-[#6d28d9] bg-[#f5f3ff] rounded-r-xl px-7 py-6 my-8">
              <p className="text-lg font-bold text-[#6d28d9] leading-[1.5] italic">&quot;I&apos;ve seen teams celebrate a 42% open rate while their monthly cohort retention dropped for the fifth consecutive month. The email performed. The business didn&apos;t. Nobody in the meeting connected those two facts.&quot;</p>
            </div>

            <h2 id="metrics-predict" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">The Metrics That Actually Predict What Happens Next</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Here&apos;s a cleaner way to think about it: the metrics that matter are the ones with a proven causal link to the outcomes your business depends on. Retention. Expansion. Referral. That&apos;s the short list of things that drive sustainable revenue. Every metric worth tracking should trace back to one of those three.</p>

            <div className="w-full my-8 rounded-2xl overflow-hidden border border-[#e2e8f0] overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#f8fafc] text-[11px] font-extrabold uppercase tracking-[0.8px] text-[#64748b] px-[18px] py-[14px] text-left border-b border-[#e2e8f0]">Vanity Metric</th>
                    <th className="bg-[#f8fafc] text-[11px] font-extrabold uppercase tracking-[0.8px] text-[#64748b] px-[18px] py-[14px] text-left border-b border-[#e2e8f0]">What You Track Instead</th>
                    <th className="bg-[#f8fafc] text-[11px] font-extrabold uppercase tracking-[0.8px] text-[#64748b] px-[18px] py-[14px] text-left border-b border-[#e2e8f0]">Why It&apos;s Better</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-[#fafafa]">
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Email open rate</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Post-email conversion / action rate</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Measures whether the email drove a behaviour, not just a click</td>
                  </tr>
                  <tr className="even:bg-[#fafafa]">
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Total followers</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Engaged audience growth rate</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Growth in people who actually respond, not just observe</td>
                  </tr>
                  <tr className="even:bg-[#fafafa]">
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Monthly active users</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Feature adoption depth &amp; session frequency trends</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Distinguishes shallow engagement from sticky usage</td>
                  </tr>
                  <tr className="even:bg-[#fafafa]">
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">CSAT score</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">CSAT-to-renewal correlation by segment</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold border-b border-[#f1f5f9]">Connects satisfaction to the business outcome it&apos;s supposed to predict</td>
                  </tr>
                  <tr className="even:bg-[#fafafa]">
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold">Support tickets resolved</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold">Repeat contact rate &amp; first-contact resolution</td>
                    <td className="px-[18px] py-[14px] text-sm text-[#374151] font-semibold">Measures whether the resolution actually held</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="five-numbers" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">Five Numbers That Churn Prediction Actually Runs On</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">If I had to give a customer success leader one framework to start with, this would be it. These five metrics, tracked correctly, will tell you more about what&apos;s about to happen than any campaign dashboard.</p>

            <ol className="list-none p-0">
              {numberedItems.map((item, i) => (
                <li key={item.title} className="flex gap-4 py-[18px] border-b border-[#f1f5f9] last:border-b-0">
                  <div className="w-7 h-7 bg-[#6d28d9] text-white rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <strong className="block text-[15px] font-extrabold text-[#0f172a] mb-1">{item.title}</strong>
                    <span className="text-sm text-[#64748b] leading-[1.6]">{item.body}</span>
                  </div>
                </li>
              ))}
            </ol>

            <h2 id="fragmented-data" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">What To Do When Your Data Is Fragmented</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">Here&apos;s the challenge most teams face: the data that would answer these questions lives in five different places. Product analytics in one tool. Support tickets in another. Campaign data in a third. CRM in a fourth. Nobody has joined them.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">So when churn spikes, nobody knows whether it&apos;s a product problem, a support problem, a messaging problem, or a segment problem. Everyone suspects it&apos;s someone else&apos;s problem. Post-mortems go in circles. Nothing systematic changes.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">The answer isn&apos;t more dashboards. It&apos;s a unified customer record — one profile per customer that aggregates every interaction, every support ticket, every campaign touch, every product session. Then you can actually run the correlations. Then you can see that customers who received fewer than three proactive check-ins in month two churned at 3× the rate of those who received more. Then you can do something about it before they&apos;re gone.</p>

            <h2 id="celebrate" className="text-[26px] font-extrabold text-[#0f172a] mt-11 mb-4 leading-[1.25]">Changing What You Celebrate</h2>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">This is ultimately a leadership question as much as a technology one. The metrics you put on the weekly slide determine what behaviour gets rewarded. If you&apos;re celebrating open rates, your team will optimise for open rates. If you&apos;re celebrating retention cohorts, your team will protect them.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">The shift isn&apos;t complicated to explain. It&apos;s just uncomfortable to make, because it means retiring some numbers that felt like wins. It means being honest that a 40% open rate on a campaign where 30% of those customers churned within 90 days is not, in fact, something to celebrate.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">But the teams that make that shift — that decide to measure outcomes rather than activity — are the ones who find they actually have something actionable to work with. The data stops being something you report and starts being something you use.</p>

            <p className="text-base text-[#374151] leading-[1.85] mb-5">That&apos;s a different kind of meeting entirely.</p>

            <div className="bg-[linear-gradient(135deg,#1e1b4b,#6d28d9)] rounded-[20px] p-10 text-center mt-12">
              <h3 className="text-2xl font-extrabold text-white mb-3">See What Your Customer Data Is Really Saying</h3>
              <p className="text-[15px] text-white/75 mb-6 leading-[1.6]">KronGage connects engagement, support, and campaign data into a single customer record — so you can run the correlations that actually predict churn.</p>
              <a href="/contact/" className="inline-block bg-white text-[#6d28d9] px-8 py-[14px] rounded-full text-[15px] font-bold">Book a Demo</a>
            </div>

          </article>

          <aside className="pt-2">
            <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] mb-5">
              <h4 className="text-[13px] font-extrabold text-[#0f172a] mb-[14px] pb-3 border-b border-[#f1f5f9] uppercase tracking-[0.8px]">In This Article</h4>
              <a href="#vanity-problem" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#6d28d9] bg-[#f5f3ff] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">1</div>
                The Vanity Metric Problem
              </a>
              <a href="#metrics-predict" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#6d28d9] bg-[#f5f3ff] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">2</div>
                Metrics That Predict Outcomes
              </a>
              <a href="#five-numbers" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#6d28d9] bg-[#f5f3ff] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">3</div>
                Five Numbers Churn Runs On
              </a>
              <a href="#fragmented-data" className="flex gap-[10px] items-start py-2 border-b border-[#f8fafc] text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#6d28d9] bg-[#f5f3ff] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">4</div>
                When Your Data Is Fragmented
              </a>
              <a href="#celebrate" className="flex gap-[10px] items-start py-2 text-[13px] text-[#475569] font-semibold transition-colors hover:text-[#0D47A1]">
                <div className="text-[10px] font-extrabold text-[#6d28d9] bg-[#f5f3ff] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px">5</div>
                Changing What You Celebrate
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
                <div className="text-[10px] font-bold text-[#0D47A1] uppercase tracking-[0.5px]">Omnichannel</div>
                <h5 className="text-[13px] font-bold text-[#0f172a] mt-1 leading-[1.35]"><a href="/blog/beyond-whatsapp/">Beyond WhatsApp: True Omnichannel in 2025</a></h5>
              </div>
            </div>
            <div className="rounded-2xl p-5 mb-5 bg-[linear-gradient(135deg,#1e1b4b,#6d28d9)] border border-transparent">
              <h4 className="text-[13px] font-extrabold text-[#a5b4fc] mb-[14px] pb-3 border-b border-white/10 uppercase tracking-[0.8px]">Analytics Demo</h4>
              <p className="text-[13px] text-white/65 leading-[1.6] mb-4">See how KronGage&apos;s unified customer record surfaces the metrics that actually predict churn — before it happens.</p>
              <a href="/contact/" className="block bg-white text-[#6d28d9] text-center py-[11px] rounded-full text-[13px] font-bold">Request Demo →</a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
