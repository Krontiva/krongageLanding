import type { ReactNode } from 'react';
import Link from 'next/link';
import PhosphorIcon from '@/components/PhosphorIcon';

type IconName = React.ComponentProps<typeof PhosphorIcon>['name'];

export interface ImpactStat {
  title: string;
  description: string;
}

export interface CapabilitySection {
  eyebrow: string;
  headline: string;
  title: string;
  description: string;
  visual: ReactNode;
}

export interface SupportingFeature {
  icon: IconName;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeaturePageTemplateProps {
  breadcrumbRoot?: { label: string; href: string };
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  heroVisual?: ReactNode;
  trustPoints?: string[];
  hideHero?: boolean;
  impactStats: ImpactStat[];
  capabilities: CapabilitySection[];
  supportingFeatures: SupportingFeature[];
  faqs: FaqItem[];
}

export default function FeaturePageTemplate({
  breadcrumbRoot = { label: 'Platform', href: '/platform' },
  breadcrumbLabel,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  heroVisual,
  trustPoints,
  hideHero,
  impactStats,
  capabilities,
  supportingFeatures,
  faqs,
}: FeaturePageTemplateProps) {
  return (
    <main>
      {/* Hero */}
      {hideHero ? (
        <div className="max-w-[1200px] mx-auto px-6 pt-40 pb-4 max-[640px]:px-5 max-[640px]:pt-32">
          <div className="text-[13px] text-[#94a3b8] font-medium mb-6">
            <Link href={breadcrumbRoot.href} className="text-[#0D47A1] transition-colors hover:text-[#0a3a87]">{breadcrumbRoot.label}</Link>
            <span className="mx-[6px]">›</span>{breadcrumbLabel}
          </div>
          <p className="text-xs uppercase tracking-widest text-[#94a3b8] mb-4">{eyebrow}</p>
          <h1 className="text-4xl tracking-tight max-w-lg text-[#0f172a] mb-4">{title}</h1>
          <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-lg">{description}</p>
        </div>
      ) : (
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#0D47A1_100%)] px-[60px] pt-32 pb-20 max-[640px]:px-5 max-[640px]:pt-[116px] max-[640px]:pb-14">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] text-white/50 font-medium mb-6">
            <Link href={breadcrumbRoot.href} className="text-[#93c5fd] transition-colors hover:text-white">{breadcrumbRoot.label}</Link>
            <span className="mx-[6px]">›</span>{breadcrumbLabel}
          </div>
          <div className="grid grid-cols-2 gap-12 items-center max-[900px]:grid-cols-1">
            <div>
              <div className="inline-flex items-center bg-white/[0.07] border border-white/[0.14] rounded-full px-4 py-[6px] text-[11px] font-bold text-[#93c5fd] mb-6 tracking-[0.1em] uppercase">
                {eyebrow}
              </div>
              <h1 className="text-[48px] font-extrabold text-white leading-[1.15] mb-5 max-[640px]:text-[32px]">{title}</h1>
              <p className="text-lg text-white/70 leading-[1.7] mb-9 max-w-[560px]">{description}</p>
              <div className="flex gap-4 flex-wrap mb-8">
                {primaryCta && (
                  <Link href={primaryCta.href} className="bg-white text-[#0D47A1] px-[30px] py-[14px] rounded-full text-[15px] font-bold transition-colors hover:bg-[#e2e8f0]">
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-[26px] py-[13px] rounded-full text-[15px] font-bold transition-colors hover:border-white/50 hover:bg-white/[0.06]"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
              <div className="flex gap-6 flex-wrap">
                {(trustPoints ?? []).map(point => (
                  <div key={point} className="flex items-center gap-[7px] text-xs text-white/40 font-semibold">
                    <PhosphorIcon name="CheckCircle" size={14} weight="duotone" color="currentColor" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] overflow-hidden h-[420px] shrink-0 max-[900px]:h-[320px]">
              {heroVisual}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Capability deep-dives */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 max-[640px]:px-0">
          <div className="flex flex-col divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
            {capabilities.map((cap, i) => {
              const imageRight = i % 2 !== 0;
              return (
                <div key={cap.title} className="grid grid-cols-1 md:grid-cols-2 group">
                  <div className={`relative h-72 md:h-[480px] overflow-hidden ${imageRight ? 'md:order-2' : ''}`}>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      {cap.visual}
                    </div>
                  </div>
                  <div className={`flex flex-col justify-center px-8 md:px-16 py-12 md:py-20 ${imageRight ? 'md:order-1' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#94a3b8] mb-6">
                      {String(i + 1).padStart(2, '0')} — {cap.eyebrow}
                    </p>
                    <h3 className="text-4xl md:text-5xl tracking-tight text-[#0f172a] mb-6 leading-none">
                      {cap.headline}
                    </h3>
                    <div className="h-px w-10 bg-[#e2e8f0] mb-6" />
                    <p className="text-base font-medium text-[#0f172a] mb-3 leading-snug max-w-sm">
                      {cap.title}
                    </p>
                    <p className="text-sm text-[#64748b] leading-relaxed max-w-sm">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="bg-white px-[60px] pt-[72px] pb-20 border-t border-b border-[#f1f5f9] max-[640px]:px-5 max-[640px]:pb-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#0D47A1]/70">Business Impact</span>
            <h2 className="text-[32px] font-normal text-[#0f172a] mt-2 max-[640px]:text-[26px]">Results teams see after switching</h2>
          </div>
          <div
            className={`border border-[#e2e8f0] bg-white grid ${impactStats.length === 3 ? 'grid-cols-3' : 'grid-cols-4'} max-[900px]:grid-cols-2 max-[640px]:grid-cols-1`}
          >
            {impactStats.map(stat => (
              <div
                key={stat.title}
                className="border-r border-b border-[#e2e8f0] min-h-[180px] px-6 flex flex-col items-center justify-center gap-2 text-center transition-colors duration-200 hover:bg-[#EEF5FD]"
              >
                <h3 className="text-base font-bold text-[#0D47A1]">{stat.title}</h3>
                <p className="text-[13px] text-[#64748b] leading-[1.6]">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting features */}
      <section className="bg-[#f8fafc] px-[60px] py-20 border-y border-[#f1f5f9] max-[640px]:px-5 max-[640px]:py-14">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 max-w-[640px] mx-auto">
            <h2 className="text-[32px] font-normal text-[#0f172a] mb-3 max-[640px]:text-[24px]">Everything you need, built in</h2>
            <p className="text-[15px] text-[#64748b] leading-[1.7]">No add-ons, no separate contracts — these capabilities ship with every plan.</p>
          </div>
          <div className="border border-[#e2e8f0] bg-white grid grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
            {supportingFeatures.map(feature => (
              <div
                key={feature.title}
                className="border-r border-b border-[#e2e8f0] min-h-[200px] px-6 flex flex-col items-center justify-center gap-3 text-center transition-colors duration-200 hover:bg-[#EEF5FD]"
              >
                <PhosphorIcon name={feature.icon} size={40} weight="duotone" color="#0D47A1" />
                <h3 className="text-base font-bold text-[#0D47A1]">{feature.title}</h3>
                <p className="text-[13px] text-[#64748b] leading-[1.6]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-[60px] py-20 max-[640px]:px-5 max-[640px]:py-14">
        <div className="max-w-[760px] mx-auto">
          <h2 className="text-[32px] font-normal text-[#0f172a] text-center mb-10 max-[640px]:text-[24px]">Frequently asked questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map(faq => (
              <details key={faq.question} className="group bg-[#f8fafc] rounded-xl border border-[#e2e8f0] px-6 py-[18px]">
                <summary className="flex items-center justify-between gap-4 cursor-pointer text-[15px] font-bold text-[#0f172a] list-none marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <PhosphorIcon name="CaretDown" size={16} weight="bold" color="#64748b" className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="text-sm text-[#475569] leading-[1.7] mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
