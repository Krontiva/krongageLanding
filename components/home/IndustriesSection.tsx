'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import HeroBanking from '../solutions/HeroBanking';
import HeroTelecom from '../solutions/HeroTelecom';
import HeroFmcg from '../solutions/HeroFmcg';
import HeroHealthcare from '../solutions/HeroHealthcare';
import HeroInsurance from '../solutions/HeroInsurance';
import HeroGovernment from '../solutions/HeroGovernment';
import { revealSection } from './variants';

const INDUSTRIES = [
  { id: 'banking',    label: 'Banking & Finance',  h3: 'Compliant, Personalised Banking Engagement', p: "Deliver real-time transaction alerts, fraud notifications, and personalised financial guidance across WhatsApp, SMS, and email, all within a fully compliant, bank-grade platform.", href: '/solutions/banking', cta: 'Explore Banking Solutions →', Comp: HeroBanking },
  { id: 'telecom',    label: 'Telecommunications', h3: 'Customer Retention at Telecom Scale',        p: "Reduce churn with proactive usage alerts, data bundle promotions, and AI-powered support. Manage millions of subscribers across every channel from one unified platform.",         href: '/solutions/telecom', cta: 'Explore Telecom Solutions →',  Comp: HeroTelecom },
  { id: 'fmcg',       label: 'FMCG & Retail',      h3: 'Drive Sales Across Every Consumer Touchpoint', p: "Connect with consumers at the point of purchase, run loyalty campaigns, and gather real-time market intelligence, from urban retail chains to last-mile distribution networks.", href: '/solutions/fmcg',   cta: 'Explore FMCG & Retail →',    Comp: HeroFmcg },
  { id: 'healthcare', label: 'Healthcare',          h3: 'Patient Engagement That Improves Outcomes',  p: "Reduce no-shows with automated appointment reminders, support medication adherence, and securely deliver health information to patients across SMS, WhatsApp, and web.",       href: '/solutions/healthcare', cta: 'Explore Healthcare →',     Comp: HeroHealthcare },
  { id: 'insurance',  label: 'Insurance',           h3: 'End-to-End Insurance Customer Journeys',    p: "Accelerate policy onboarding, automate renewal reminders, and guide claimants through every step of the process, reducing drop-offs and improving policyholder satisfaction.", href: '/solutions/insurance', cta: 'Explore Insurance →',    Comp: HeroInsurance },
  { id: 'government', label: 'Government',          h3: 'Smart Government-to-Citizen Communications', p: "Keep citizens informed across SMS, WhatsApp, and web at every step of their service journey, from permit applications to tax deadlines, boosting digital self-service rates.", href: '/solutions/government', cta: 'Explore Government →',  Comp: HeroGovernment },
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
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[42px] font-extrabold text-[#0D47A1] tracking-[-0.5px] leading-[1.15] mb-[14px]">
            Built for Your Industry
          </h2>
          <p className="text-base text-[#64748b] leading-[1.7] max-w-[560px] mx-auto">
            KronGage is engineered for the unique regulatory, operational, and customer engagement needs of Africa&apos;s most demanding sectors.
          </p>
        </div>
        <div className="flex gap-[10px] justify-center flex-wrap mb-10">
          {INDUSTRIES.map(ind => (
            <motion.button
              key={ind.id}
              onClick={() => setActiveIndustry(ind.id)}
              whileTap={{ scale: 0.94 }}
              className={`px-[22px] py-[10px] rounded-full text-sm font-semibold border-2 cursor-pointer transition-colors ${
                activeIndustry === ind.id
                  ? 'bg-[#0D47A1] border-[#0D47A1] text-white'
                  : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#0D47A1] hover:text-[#0D47A1]'
              }`}
            >
              {ind.label}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-12 items-center max-[900px]:grid-cols-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInd.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-[30px] font-extrabold text-[#0D47A1] tracking-[-0.3px] mb-[14px]">{activeInd.h3}</h3>
              <p className="text-[15px] text-[#475569] leading-[1.75] mb-7">{activeInd.p}</p>
              <Link
                href={activeInd.href}
                className="inline-block bg-[#0D47A1] text-white px-7 py-[13px] rounded-lg text-sm font-bold"
              >
                {activeInd.cta}
              </Link>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeInd.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-[20px] overflow-hidden h-[420px] shadow-[0_16px_56px_rgba(13,71,161,0.15)]"
            >
              <activeInd.Comp />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
