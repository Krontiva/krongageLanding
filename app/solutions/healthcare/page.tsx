import type { Metadata } from 'next';
import AiTelecomSupport from '../../../components/solutions/AiTelecomSupport';
import Customer360 from '../../../components/solutions/Customer360';
import HeroHealthcare from '../../../components/solutions/HeroHealthcare';
import PhosphorIcon from '@/components/PhosphorIcon';

export const metadata: Metadata = {
  title: 'Healthcare — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#EEF5FD_0%,#f8fafc_100%)] px-[60px] pt-32 pb-[60px] max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="grid grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
          <div>
            <div className="text-[13px] text-[#64748b] font-medium mb-5">
              <a href="/solutions/" className="text-[#0D47A1]">Solutions</a><span className="mx-[6px]">›</span>Healthcare
            </div>
            <h1 className="text-[48px] font-extrabold text-[#0D47A1] leading-[1.15] max-w-[720px] mb-5 max-[640px]:text-[32px]">Transform Patient Engagement Across the Entire Continuum of Care</h1>
            <p className="text-lg text-[#475569] max-w-[600px] leading-[1.7] mb-9">KronGage delivers unified patient engagement for health systems and providers, combining omnichannel communication and AI-powered clinical automation in one intelligent platform.</p>
            <div className="flex gap-4 flex-wrap">
              <a href="/contact/" className="bg-[#0D47A1] text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#0a3a87]">Schedule A Demo</a>
            </div>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_20px_60px_rgba(13,71,161,0.15)] shrink-0 max-[900px]:h-[320px]">
            <HeroHealthcare />
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-[60px] py-[72px] text-center border-t border-[#e2e8f0] max-[900px]:px-5 max-[900px]:py-12">
        <h2 className="text-[28px] font-extrabold text-[#0f172a] mb-5">The Virtual Care Continuity Gap</h2>
        <p className="text-base text-[#475569] leading-[1.75] max-w-[760px] mx-auto">Today&apos;s patients expect seamless, personalised experiences at every touchpoint: scheduling, communication, care delivery, and follow-up. Yet most health organisations are held back by fragmented systems, complex workflows, and rising operational costs.</p>
      </section>

      <section className="bg-white px-[60px] py-[72px] text-center max-[900px]:px-5 max-[900px]:py-12">
        <h2 className="text-[26px] font-extrabold text-[#0D47A1] mb-10">The Healthcare Customer Engagement Opportunity</h2>
        <div className="grid grid-cols-3 gap-5 max-w-[900px] mx-auto max-[900px]:grid-cols-1 max-[900px]:max-w-[420px]">
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">38%</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">reduction in no-shows with automated multi-channel reminders</div>
          </div>
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">55%</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">of routine enquiries can be handled by AI (scheduling, results)</div>
          </div>
          <div className="bg-[#EEF5FD] rounded-2xl px-6 py-7 text-left">
            <div className="text-4xl font-extrabold text-[#0D47A1] mb-2">4x</div>
            <div className="text-[13px] text-[#475569] leading-[1.55]">improvement in patient satisfaction with proactive communication</div>
          </div>
        </div>
      </section>

      <section className="bg-white px-[60px] pt-14 pb-9 text-center border-t border-[#f1f5f9] max-[900px]:px-5 max-[900px]:pt-12">
        <h2 className="text-[26px] font-extrabold text-[#0D47A1] mb-4">KronGage for Healthcare Services</h2>
        <p className="text-base text-[#475569] leading-[1.7] max-w-[760px] mx-auto">KronGage unifies patient engagement across the entire journey, turning disconnected interactions into continuous, meaningful relationships, without adding burden to clinical or administrative teams.</p>
      </section>

      <section className="bg-white px-[60px] pb-20 max-[900px]:px-5 max-[900px]:pb-14">
        <div className="grid grid-cols-2 gap-[72px] items-center py-14 border-t border-[#f1f5f9] max-w-[1080px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">Omnichannel Global Healthcare Service</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Engineered specifically for enterprise healthcare providers navigating fragmented clinical landscapes, KronGage unifies every patient touchpoint into a single intelligent clinical command centre. This empowers care coordination teams to deliver frictionless care journeys.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Learn more</a>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(13,71,161,0.14)] overflow-hidden max-w-[280px]">
              <div className="bg-[#0D47A1] px-4 py-3 flex items-center gap-[10px]">
                <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center text-white"><PhosphorIcon name="Lightning" size={14} weight="duotone" color="#fff" /></div>
                <span className="text-xs font-bold text-white">Multichannel messaging</span>
              </div>
              <div className="flex gap-[6px] px-4 py-3 border-b border-[#f1f5f9]">
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="ChatCircle" size={16} weight="duotone" color="#0D47A1" /></div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="EnvelopeSimple" size={16} weight="duotone" color="#0D47A1" /></div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="DeviceMobile" size={16} weight="duotone" color="#0D47A1" /></div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="Globe" size={16} weight="duotone" color="#0D47A1" /></div>
                <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="DeviceMobile" size={16} weight="duotone" color="#0D47A1" /></div>
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
          <div className="rounded-[20px] overflow-hidden h-[300px] shadow-[0_20px_60px_rgba(13,71,161,0.1)] bg-[#f0f4f9]">
            <AiTelecomSupport />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">AI-Driven Patient Engagement &amp; Advocacy</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Integrate autonomous AI to resolve high-volume patient enquiries, freeing care teams to leverage intelligent clinical insights for complex care transitions and diagnostic hurdles.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Learn more</a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[72px] items-center py-14 border-t border-[#f1f5f9] max-w-[1080px] mx-auto max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <h3 className="text-xl font-extrabold text-[#0D47A1] mb-[14px] leading-[1.3]">Customer 360 &amp; Predictive Intelligence</h3>
            <p className="text-[15px] text-[#475569] leading-[1.7] mb-6">Consolidate fragmented patient profile data from all digital touchpoints into a unified longitudinal patient record, providing concurrent visibility into the comprehensive end-to-end care journey.</p>
            <a href="/contact/" className="inline-block bg-[#0D47A1] text-white px-7 py-3 rounded-full text-sm font-bold transition-colors hover:bg-[#0a3a87]">Learn more</a>
          </div>
          <div className="rounded-[20px] overflow-hidden h-[300px] shadow-[0_20px_60px_rgba(13,71,161,0.1)] bg-[#f0f4f9]">
            <Customer360 />
          </div>
        </div>
      </section>

      <section className="bg-[#0f1f3d] px-[60px] py-[100px] text-center max-[900px]:px-5 max-[900px]:py-[72px]">
        <div className="inline-flex items-center gap-[6px] bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-[6px] text-[11px] font-bold text-white/50 mb-7 tracking-[0.8px] uppercase"><PhosphorIcon name="PlusCircle" size={12} weight="duotone" color="currentColor" />Enterprise Demo</div>
        <h2 className="text-[44px] font-extrabold text-white mb-[18px] leading-[1.15] max-w-[760px] mx-auto max-[900px]:text-[30px]">Transform Patient Engagement Today</h2>
        <p className="text-[17px] text-white/55 max-w-[580px] mx-auto mb-11 leading-[1.65]">Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.</p>
        <div className="flex gap-4 justify-center flex-wrap mb-[52px]">
          <a href="/contact/" className="inline-flex items-center gap-2 border-2 border-white/35 text-white px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:border-white hover:bg-white/[0.07]">Request a Demo →</a>
          <a href="/platform/" className="inline-flex items-center gap-2 border-2 border-white/15 text-white/60 px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:border-white/30"><PhosphorIcon name="PlusCircle" size={15} weight="duotone" color="currentColor" />Explore the Platform</a>
        </div>
        <div className="flex gap-8 justify-center flex-wrap max-[900px]:gap-4">
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold"><PhosphorIcon name="Prohibit" size={14} weight="duotone" color="currentColor" />No commitment required</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold"><PhosphorIcon name="ShieldCheck" size={14} weight="duotone" color="currentColor" />Enterprise-grade security</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold"><PhosphorIcon name="Star" size={14} weight="fill" color="currentColor" />World-Class Platform</div>
          <div className="flex items-center gap-[7px] text-xs text-white/35 font-semibold"><PhosphorIcon name="Lightning" size={14} weight="duotone" color="currentColor" />Live demo in 24 hours</div>
        </div>
      </section>
    </main>
  );
}
