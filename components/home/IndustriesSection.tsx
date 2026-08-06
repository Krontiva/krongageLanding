'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Bank, Broadcast, ShoppingCart, Heartbeat, Umbrella, Buildings } from '@phosphor-icons/react';
import HeroBanking from '../solutions/HeroBanking';
import HeroTelecom from '../solutions/HeroTelecom';
import HeroFmcg from '../solutions/HeroFmcg';
import HeroHealthcare from '../solutions/HeroHealthcare';
import HeroInsurance from '../solutions/HeroInsurance';
import HeroGovernment from '../solutions/HeroGovernment';
import { revealSection } from './variants';

const INDUSTRIES = [
  { id: 'banking',    icon: Bank,         label: 'Banking & Finance',  p: "Deliver real-time transaction alerts, fraud notifications, and personalised financial guidance across WhatsApp, SMS, and email, all within a fully compliant, bank-grade platform.", href: '/solutions/banking', cta: 'Explore Banking Solutions →', Comp: HeroBanking },
  { id: 'telecom',    icon: Broadcast,    label: 'Telecommunications', p: "Reduce churn with proactive usage alerts, data bundle promotions, and AI-powered support. Manage millions of subscribers across every channel from one unified platform.",         href: '/solutions/telecom', cta: 'Explore Telecom Solutions →',  Comp: HeroTelecom },
  { id: 'fmcg',       icon: ShoppingCart, label: 'FMCG & Retail',      p: "Connect with consumers at the point of purchase, run loyalty campaigns, and gather real-time market intelligence, from urban retail chains to last-mile distribution networks.", href: '/solutions/fmcg',   cta: 'Explore FMCG & Retail →',    Comp: HeroFmcg },
  { id: 'healthcare', icon: Heartbeat,    label: 'Healthcare',         p: "Reduce no-shows with automated appointment reminders, support medication adherence, and securely deliver health information to patients across SMS, WhatsApp, and web.",       href: '/solutions/healthcare', cta: 'Explore Healthcare →',     Comp: HeroHealthcare },
  { id: 'insurance',  icon: Umbrella,     label: 'Insurance',          p: "Accelerate policy onboarding, automate renewal reminders, and guide claimants through every step of the process, reducing drop-offs and improving policyholder satisfaction.", href: '/solutions/insurance', cta: 'Explore Insurance →',    Comp: HeroInsurance },
  { id: 'government', icon: Buildings,    label: 'Government',         p: "Keep citizens informed across SMS, WhatsApp, and web at every step of their service journey, from permit applications to tax deadlines, boosting digital self-service rates.", href: '/solutions/government', cta: 'Explore Government →',  Comp: HeroGovernment },
];

export default function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState('banking');
  const activeInd = INDUSTRIES.find(i => i.id === activeIndustry)!;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
      className="px-[60px] py-[90px] bg-[#f8fafc] max-[900px]:px-6 max-[900px]:py-[60px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[42px] font-normal text-[#0D47A1] tracking-[-0.5px] leading-[1.15] mb-[14px]">
            Built for Your Industry
          </h2>
          <p className="text-base text-[#64748b] leading-[1.7] max-w-[560px] mx-auto">
            KronGage is engineered for the unique regulatory, operational, and customer engagement needs of Africa&apos;s most demanding sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-stretch">
          <div className="relative h-full min-h-[420px]">
            <div className="absolute -top-4 -left-4 w-full h-full bg-[#eef2f7] rounded-[20px] -z-10" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInd.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative rounded-[20px] overflow-hidden h-full bg-white"
              >
                <activeInd.Comp />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="divide-y divide-dashed divide-[#cbd5e1]">
            {INDUSTRIES.map(ind => {
              const isActive = ind.id === activeIndustry;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className="group w-full text-left py-5 flex items-start gap-4 cursor-pointer"
                >
                  <ind.icon
                    size={22}
                    weight="duotone"
                    className={`mt-0.5 shrink-0 transition-colors ${isActive ? 'text-[#0D47A1]' : 'text-[#cbd5e1] group-hover:text-[#94a3b8]'}`}
                  />
                  <div className="flex-1">
                    <span
                      className={`block font-bold text-base transition-colors ${isActive ? 'text-[#0f172a]' : 'text-[#94a3b8] group-hover:text-[#64748b]'}`}
                    >
                      {ind.label}
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-[#475569] leading-[1.7] mt-2 mb-2">{ind.p}</p>
                          <Link
                            href={ind.href}
                            onClick={e => e.stopPropagation()}
                            className="inline-block text-sm font-bold text-[#0D47A1] hover:underline"
                          >
                            {ind.cta}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
