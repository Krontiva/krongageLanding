'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Tray,
  Megaphone,
  Robot,
  UsersThree,
  ChartLineUp,
  ChartBar,
  MagnifyingGlass,
  ShieldCheck,
} from '@phosphor-icons/react';
import { revealSection, staggerGrid, staggerItem } from './variants';

const FEATURES = [
  { icon: Tray,            title: 'Omnichannel Inbox',      desc: 'All channels, AI routing, one unified view' },
  { icon: Megaphone,        title: 'Social Publishing',      desc: 'Multi-platform, bulk scheduling' },
  { icon: Robot,            title: 'AI Automation',          desc: 'Agents, RAG knowledge, smart flows' },
  { icon: UsersThree,       title: 'Customer 360',           desc: 'Unified profiles, segmentation' },
  { icon: ChartLineUp,      title: 'Campaign Management',    desc: 'Journey builder, A/B testing' },
  { icon: ChartBar,         title: 'Analytics & BI',         desc: 'Dashboards, white-label reports' },
  { icon: MagnifyingGlass,  title: 'Social Intelligence',    desc: 'Sentiment tracking, brand monitoring' },
  { icon: ShieldCheck,      title: 'Security & Compliance', desc: 'SOC 2, HIPAA, encryption, audit logs' },
];

export default function PlatformFeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
    >
      <div className="px-[60px] py-[90px] max-w-[1200px] mx-auto flex items-start gap-20 max-[900px]:flex-col max-[900px]:px-6 max-[900px]:py-14 max-[900px]:gap-9">
        <div className="max-w-[360px] shrink-0 max-[900px]:max-w-full">
          <h2 className="text-[42px] font-extrabold leading-[1.15] text-[#0D47A1] mb-5 tracking-[-0.5px]">
            One platform that thinks in systems, not silos.
          </h2>
          <p className="text-[15px] leading-[1.7] text-[#475569] mb-8">
            KronGage was engineered to excel in demanding environments, where infrastructure varies, regulations shift, and customer behaviour is diverse. It&apos;s robust because it had to be.
          </p>
          <Link
            href="/platform"
            className="inline-block bg-transparent text-[#0D47A1] px-6 py-3 rounded-full text-sm font-bold border-2 border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white transition-colors"
          >
            View Full Platform
          </Link>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerGrid}
          className="grid grid-cols-2 gap-[14px] flex-1"
        >
          {FEATURES.map(f => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 6px 24px rgba(13,71,161,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-[#EEF5FD] rounded-[14px] px-4 py-[18px] flex items-start gap-[14px]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#0D47A1] flex items-center justify-center shrink-0">
                <f.icon size={20} weight="bold" color="#fff" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0D47A1] mb-1">{f.title}</h4>
                <p className="text-xs text-[#64748b] leading-[1.5]">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
