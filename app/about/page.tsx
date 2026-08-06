import type { Metadata } from 'next';
import PhosphorIcon from '@/components/PhosphorIcon';

export const metadata: Metadata = {
  title: 'About – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section>
        <div className="flex items-center justify-between px-[60px] pt-[148px] pb-[90px] max-w-[1200px] mx-auto gap-10 max-[1024px]:px-8 max-[1024px]:pt-32 max-[1024px]:pb-[70px] max-[1024px]:gap-8 max-[640px]:flex-col max-[640px]:px-5 max-[640px]:pt-[108px] max-[640px]:pb-12 max-[640px]:text-center">
          <div className="max-w-[520px] max-[640px]:max-w-full">
            <h1 className="text-[52px] font-extrabold leading-[1.1] text-[#0D47A1] mb-5 tracking-[-1px] max-[1024px]:text-[40px] max-[640px]:text-[32px]">
              World-Class Innovation. Global Reach.
            </h1>
            <p className="text-base leading-[1.7] text-[#475569] mb-8">
              KronGage is our flagship enterprise customer engagement platform – unifying 10 integrated modules into a single world-class solution that replaces 5–7 separate tools.
            </p>
            <a href="/contact/" className="inline-block bg-[#0f172a] text-white px-6 py-3 rounded-lg text-[15px] font-semibold transition-colors hover:bg-[#1e293b]">
              Get in Touch
            </a>
          </div>
          <div className="relative w-[340px] h-[280px] shrink-0 max-[1024px]:w-[280px] max-[1024px]:h-[240px] max-[640px]:w-full max-[640px]:h-[220px]">
            <div className="relative w-full h-full">
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-5 left-[60px] bg-[#0D47A1]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-5 left-[140px] bg-[#0084ff]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.444 5.557 3.71 7.29V22l3.385-1.86C10.021 20.37 11 20.487 12 20.487c5.523 0 10-4.144 10-9.244S17.523 2 12 2zm1.05 12.44l-2.545-2.717-4.967 2.717 5.465-5.8 2.607 2.717 4.905-2.717-5.465 5.8z"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-5 left-[220px] bg-[#25d366]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[100px] left-5 bg-black">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.99a8.18 8.18 0 004.79 1.53V7.07a4.85 4.85 0 01-1.02-.38z"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[100px] left-[140px] bg-white border-2 border-[#e2e8f0]">
                <svg width="28" height="28" viewBox="0 0 41 41" fill="none"><path d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835A9.964 9.964 0 0018.306.5a10.079 10.079 0 00-9.614 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.516 3.35 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944-8.047-4.649a7.504 7.504 0 01-2.867-9.955zm27.658 6.437l-9.724-5.615 3.367-1.943 8.048 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.533-1.142zm3.35-5.043l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944v-9.299a7.497 7.497 0 0112.293-5.756l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.307 11.267zm1.829-3.943l4.33-2.501 4.332 2.498v4.996l-4.331 2.5-4.331-2.5V18z" fill="#10a37f"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[100px] left-[260px] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#fff" strokeWidth="2" fill="none"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="#fff"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[185px] left-[60px] bg-white border-2 border-[#e2e8f0]">
                <svg width="28" height="28" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[185px] left-[175px] bg-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div className="absolute w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] top-[185px] left-[270px] bg-[#229ed9]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M21.198 2.433a2.242 2.242 0 00-1.022.215l-16.5 6.666a2.25 2.25 0 00.126 4.238l3.813 1.358 1.989 6.091a1.5 1.5 0 002.603.536l2.026-2.371 4.184 3.073a2.25 2.25 0 003.497-1.42l2.574-16.5a2.25 2.25 0 00-3.29-2.486zm-3.538 14.885l-4.184-3.073a1.5 1.5 0 00-1.938.173l-.728.851-.591-1.81 8.1-7.64-7.1 8.617z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="bg-[#eff6ff] px-[60px] py-[60px] max-[1024px]:px-8 max-[640px]:px-5 max-[640px]:py-10">
        <div className="flex items-center gap-[60px] max-w-[1200px] mx-auto max-[1024px]:gap-10 max-[640px]:flex-col">
          <div className="shrink-0 w-[420px] bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden max-[1024px]:w-[340px] max-[640px]:w-full">
            <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-4 py-[10px] flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#f87171]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#fbbf24]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#34d399]" />
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              <div className="bg-[#f8fafc] rounded-lg p-[14px] border border-[#e2e8f0]">
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.5px] mb-[6px]">Messages</div>
                <div className="text-[22px] font-bold text-[#0f172a]">14.2k</div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-[14px] border border-[#e2e8f0]">
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.5px] mb-[6px]">Channels</div>
                <div className="text-[22px] font-bold text-[#0f172a]">15+</div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-[14px] border border-[#e2e8f0]">
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.5px] mb-[6px]">Modules</div>
                <div className="text-[22px] font-bold text-[#0f172a]">10</div>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-[14px] border border-[#e2e8f0]">
                <div className="text-[10px] text-[#94a3b8] uppercase tracking-[0.5px] mb-[6px]">Platforms</div>
                <div className="text-[22px] font-bold text-[#0f172a]">9+</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[26px] font-extrabold text-[#0D47A1] mb-6">KronGage At A Glance</h2>
            <ul className="list-none flex flex-col gap-4">
              <li className="flex items-start gap-3 text-[15px] text-[#334155] leading-[1.5]">
                <PhosphorIcon name="Check" size={16} weight="duotone" color="#0D47A1" className="shrink-0 mt-0.5" />
                10 fully integrated modules on a single microservices backbone
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#334155] leading-[1.5]">
                <PhosphorIcon name="Check" size={16} weight="duotone" color="#0D47A1" className="shrink-0 mt-0.5" />
                15+ communication channels in one omnichannel inbox
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#334155] leading-[1.5]">
                <PhosphorIcon name="Check" size={16} weight="duotone" color="#0D47A1" className="shrink-0 mt-0.5" />
                9+ platforms supported for publishing, scheduling, and analytics
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[#334155] leading-[1.5]">
                <PhosphorIcon name="Check" size={16} weight="duotone" color="#0D47A1" className="shrink-0 mt-0.5" />
                40-60% lower total cost of ownership vs. assembling equivalent separate tools
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section>
        <div className="px-[60px] py-20 max-w-[1200px] mx-auto max-[1024px]:px-8 max-[1024px]:py-[60px] max-[640px]:px-5 max-[640px]:py-12">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[#0D47A1] mb-[14px]">Multiple Integrated Modules. One Platform.</h2>
            <p className="text-base text-[#64748b] max-w-[600px] mx-auto">Every module works together seamlessly – share data, trigger workflows, and deliver unified customer experiences.</p>
          </div>
          <div className="grid grid-cols-3 gap-x-10 gap-y-8 max-[640px]:grid-cols-2 max-[640px]:gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="Tray" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Omnichannel Inbox</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">AI-powered view across 15+ channels with AI routing and SLA tracking.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="Megaphone" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Social Media Publishing</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Enterprise scheduling, calendar planning, bulk uploads, and performance analytics.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="Sparkle" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">AI Content Creation</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Generate, optimise, and repurpose content using globally-optimised AI models.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="MagnifyingGlass" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Social Listening</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Monitor numerous platforms with sentiment analysis and crisis detection.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="Archive" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Customer 360</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Unified identity resolution and predictive engagement intelligence.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="ChartBar" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Campaign Management</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Multi-channel orchestration with drag-and-drop journey builder.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="Robot" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Knowledge Management (RAG)</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">AI-powered contextual knowledge retrieval for agents and self-service.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 bg-[#eff6ff] rounded-[10px] flex items-center justify-center text-lg mb-1"><PhosphorIcon name="ChartLineUp" size={20} weight="duotone" color="#0D47A1" /></div>
              <h4 className="text-[15px] font-bold text-[#0D47A1]">Analytics &amp; BI</h4>
              <p className="text-[13px] text-[#64748b] leading-[1.6]">Executive dashboards and cross-module reporting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DARK CTA */}
      <section className="bg-[#0f172a] px-[60px] py-20 text-center max-[1024px]:px-8 max-[1024px]:py-[60px] max-[640px]:px-5 max-[640px]:py-12">
        <div className="inline-flex items-center gap-[6px] bg-white/[0.08] border border-white/[0.12] rounded-full px-4 py-[6px] text-[11px] font-bold text-[#94a3b8] tracking-[1px] uppercase mb-7">
          ⊕ ENTERPRISE DEMO
        </div>
        <h2 className="text-[42px] font-extrabold text-white max-w-[600px] mx-auto mb-4 leading-[1.15] max-[640px]:text-[28px]">
          Let Us Transform Your Customer Engagement Together
        </h2>
        <p className="text-base text-[#64748b] max-w-[500px] mx-auto mb-10 leading-[1.7]">
          Request an enterprise demo and see how KronGage can replace 5-7 tools with a single, unified platform built for modern organisations.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mb-12">
          <a href="/contact/" className="bg-white text-[#0f172a] px-7 py-[13px] rounded-full text-[15px] font-semibold inline-flex items-center gap-2 transition-opacity hover:opacity-90">
            Request a Demo →
          </a>
          <a href="/platform/" className="bg-transparent text-white px-7 py-[13px] rounded-full text-[15px] font-semibold border-2 border-white/25 inline-flex items-center gap-2 transition-colors hover:border-white/60">
            ⊕ Explore the Platform
          </a>
        </div>
      </section>
    </>
  );
}
