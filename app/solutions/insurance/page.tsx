import type { Metadata } from 'next';
import HeroInsurance from '../../../components/solutions/HeroInsurance';
import InsuranceIdentity360 from '../../../components/solutions/InsuranceIdentity360';

export const metadata: Metadata = {
  title: 'Insurance — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#EEF5FD_0%,#f8fafc_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-[#64748b] font-medium mb-5">
              <a href="/solutions/" className="text-[#0D47A1]">Solutions</a><span className="mx-[6px]">›</span>Insurance
            </div>
            <h1 className="text-[48px] font-extrabold text-[#0D47A1] leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">Reinvent the Insurer-Insured Relationship Across Every Global Distribution Channel</h1>
            <p className="text-lg text-[#475569] max-w-[600px] leading-[1.7] mb-9">KronGage delivers unified policyholder engagement for carriers and agencies, combining omnichannel claims support, AI-powered underwriting automation, and enterprise-grade regulatory compliance in one intelligent platform.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-[#0D47A1] text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#0a3a87]">Schedule A Demo</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(13,71,161,0.15)] shrink-0 max-[900px]:h-[320px]">
            <HeroInsurance />
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-[60px] py-[72px] text-center border-t border-[#e2e8f0] max-[900px]:px-5 max-[900px]:py-12">
        <h2 className="text-[28px] font-extrabold text-[#0f172a] mb-5">The Digital Policyholder Paradox</h2>
        <p className="text-base text-[#475569] leading-[1.75] max-w-[760px] mx-auto">Insurance leaders are caught in a difficult position: they are expected to deliver the &apos;instant&apos; enquiry response modern policyholders demand, yet they are often anchored by systems that weren&apos;t built for seamless customer engagement at today&apos;s global scale.</p>
      </section>

      <section className="bg-white px-[60px] py-[72px] text-center max-[900px]:px-5 max-[900px]:py-12">
        <h2 className="text-[26px] font-extrabold text-[#0D47A1] mb-10">The Insurance Customer Engagement Opportunity</h2>
        <div className="grid grid-cols-3 gap-5 max-w-[900px] mx-auto max-[900px]:grid-cols-1 max-[900px]:max-w-[420px]">
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">40%</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">increase in renewal rates with timely, personalised outreach</div>
          </div>
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">60%</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">of claims status enquiries can be handled by AI</div>
          </div>
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">3x</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">higher satisfaction when claims communication is proactive</div>
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-14 pb-9 text-center border-t border-[#f1f5f9] max-[900px]:px-5 max-[900px]:pt-12">
        <h2 className="text-[26px] font-extrabold text-[#0D47A1] mb-4">KronGage for Insurance Services</h2>
        <p className="text-base text-[#475569] leading-[1.7] max-w-[760px] mx-auto">KronGage is engineered to help turn fragmented interactions into a seamless customer engagement strategy. By unifying every policyholder touchpoint into one intelligent hub, teams can deliver a proactive, high-touch experience.</p>
      </section>

      <section className="bg-white px-[60px] pb-20 max-[900px]:px-5 max-[900px]:pb-14">
        <div className="grid grid-cols-2 gap-[72px] items-center py-14 border-t border-[#f1f5f9] max-w-[1080px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">Omnichannel Global Insurance Service</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Build lasting trust by turning the policyholder lifecycle into a continuous, personalised conversation. KronGage unifies every interaction into a single engagement hub, ensuring that whether a client is filing a claim or updating their coverage, they experience a seamless journey.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Learn more</a>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(13,71,161,0.14)] overflow-hidden max-w-[280px]">
              <div className="bg-[#0D47A1] px-4 py-3 flex items-center gap-[10px]">
                <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center text-xs text-white">⚡</div>
                <span className="text-xs font-bold text-white">Multichannel messaging</span>
              </div>
              <div className="flex gap-[6px] px-4 py-3 border-b border-[#f1f5f9]">
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center text-sm">💬</div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center text-sm">📧</div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center text-sm">📱</div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center text-sm">🌐</div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center text-sm">📲</div>
              </div>
              <div className="px-[14px] py-[10px]">
                <div className="flex items-center gap-[9px] py-[7px] border-b border-[#f8fafc]">
                  <div className="w-[26px] h-[26px] rounded-full shrink-0 text-[9px] font-extrabold text-white flex items-center justify-center bg-[#0D47A1]">AM</div>
                  <div><div className="text-[11px] font-bold text-[#0f172a]">Ama Serwah</div><div className="text-[10px] text-[#94a3b8] mt-px">Hi, I need help with my account</div></div>
                </div>
                <div className="flex items-center gap-[9px] py-[7px] border-b border-[#f8fafc]">
                  <div className="w-[26px] h-[26px] rounded-full shrink-0 text-[9px] font-extrabold text-white flex items-center justify-center bg-[#7c3aed]">KM</div>
                  <div><div className="text-[11px] font-bold text-[#0f172a]">Kofi Mensah</div><div className="text-[10px] text-[#94a3b8] mt-px">When will my order arrive?</div></div>
                </div>
                <div className="flex items-center gap-[9px] py-[7px]">
                  <div className="w-[26px] h-[26px] rounded-full shrink-0 text-[9px] font-extrabold text-white flex items-center justify-center bg-[#0891b2]">PN</div>
                  <div><div className="text-[11px] font-bold text-[#0f172a]">Priya Nair</div><div className="text-[10px] text-[#94a3b8] mt-px">Can I reschedule my appointment?</div></div>
                </div>
              </div>
              <div className="bg-[#f8fafc] px-[14px] py-[9px] flex items-center gap-[6px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shrink-0" /><span className="text-[10px] font-bold text-[#16a34a]">Live agent</span>
                <div className="flex ml-auto">
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#0D47A1]">JO</div>
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#16a34a]">AM</div>
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#dc2626]">KP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[72px] items-center py-14 border-t border-[#f1f5f9] max-w-[1080px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <div className="flex items-center justify-center relative h-[240px]">
              <div className="w-[180px] h-[180px] rounded-full bg-[linear-gradient(145deg,#c8dff5,#a8c8e8)] relative overflow-hidden flex items-end justify-center shadow-[0_8px_32px_rgba(13,71,161,0.18)]">
                <div className="flex flex-col items-center absolute bottom-0">
                  <div className="w-[58px] h-[58px] rounded-full bg-[linear-gradient(135deg,#8B5A2B,#6B4423)] relative">
                    <div className="absolute -top-[2px] -left-[3px] -right-[3px] h-[26px] bg-[#1a0a00] rounded-t-full" />
                  </div>
                  <div className="w-4 h-[9px] bg-[#7a4a28] mx-auto" />
                  <div className="w-[110px] h-[140px] bg-[linear-gradient(160deg,#1d4ed8,#1e40af)] rounded-t-full" />
                </div>
              </div>
              <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(13,71,161,0.3)] top-6 left-0">🤖</div>
              <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(13,71,161,0.3)] top-6 right-0">💬</div>
              <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(13,71,161,0.3)] bottom-[54px] -right-1">⚡</div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">AI-Powered Insurance Support</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Integrate autonomous AI to resolve high-volume policyholder enquiries, freeing adjusters and underwriters to leverage intelligent risk diagnostics for complex claims adjudication and coverage disputes.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Learn more</a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[72px] items-center py-14 border-t border-[#f1f5f9] max-w-[1080px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">360° Policyholder Identity &amp; Predictive Intelligence</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Unify fragmented touchpoints into a single, intelligent profile. Gain complete visibility across every interaction: every policy, every life moment. Anticipate needs, engage proactively, build loyalty that lasts.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Contact Us</a>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[300px] shadow-[0_20px_60px_rgba(13,71,161,0.1)] bg-[#f0f4f9]">
            <InsuranceIdentity360 />
          </div>
        </div>
      </section>

      <section className="bg-[#0f1f3d] px-[60px] py-[100px] text-center max-[900px]:px-5 max-[900px]:py-[72px]">
        <div className="inline-flex items-center gap-[6px] bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-[6px] text-[11px] font-bold text-white/50 mb-7 tracking-[0.8px] uppercase">⊕ Enterprise Demo</div>
        <h2 className="text-[44px] font-extrabold text-white mb-[18px] leading-[1.15] max-w-[760px] mx-auto max-[900px]:text-[30px]">Transform Customer Engagement Today</h2>
        <p className="text-[17px] text-white/55 max-w-[580px] mx-auto mb-11 leading-[1.65]">Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
        <div className="flex gap-4 justify-center flex-wrap mb-[52px]">
          <a href="/contact/" className="inline-flex items-center gap-2 border-2 border-white/35 text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:border-white hover:bg-white/[0.07]">Request a Demo →</a>
          <a href="/platform/" className="inline-flex items-center gap-2 border-2 border-white/15 text-white/60 px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:border-white/30">⊕ Explore the Platform</a>
        </div>
        <div className="flex gap-8 justify-center flex-wrap max-[900px]:gap-4">
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold">⊘ No commitment required</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold">🛡 Enterprise-grade security</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold">★ World-Class Platform</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold">⚡ Live demo in 24 hours</div>
        </div>
      </section>
    </main>
  );
}
