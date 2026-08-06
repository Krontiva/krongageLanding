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
import { Button } from '@/components/ui/button';
import LottieIcon from '@/components/LottieIcon';
import customer360Animation from '@/public/lottie/customer-360-ai-users.json';
import campaignManagementAnimation from '@/public/lottie/campaign-management.json';
import securityComplianceAnimation from '@/public/lottie/security-compliance.json';
import { revealSection, staggerGrid, staggerItem } from './variants';

const MotionLink = motion.create(Link);

const FEATURES = [
  { icon: Tray,            title: 'Omnichannel Inbox' },
  { icon: Megaphone,       title: 'Social Publishing' },
  { icon: Robot,           title: 'AI Automation' },
  { icon: UsersThree,      title: 'Customer 360', lottie: customer360Animation },
  { icon: ChartLineUp,     title: 'Campaign Management', lottie: campaignManagementAnimation },
  { icon: ChartBar,        title: 'Analytics & BI' },
  { icon: MagnifyingGlass, title: 'Social Intelligence' },
  { icon: ShieldCheck,     title: 'Security & Compliance', lottie: securityComplianceAnimation },
];

export default function PlatformFeaturesSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealSection}
    >
      <div className="pb-[90px]">
        <div className="border-y border-[#e2e8f0] flex flex-col md:flex-row">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerGrid}
            className="md:w-[300px] shrink-0 p-8 border-b md:border-b-0 md:border-r border-[#e2e8f0] flex flex-col justify-center"
          >
            <motion.span
              variants={staggerItem}
              className="font-mono text-[11px] tracking-[0.15em] text-[#0D47A1]/70 uppercase mb-4"
            >
              Platform Capabilities
            </motion.span>
            <motion.h2
              variants={staggerItem}
              className="text-[26px] font-extrabold leading-[1.2] text-[#0D47A1] mb-4 tracking-[-0.5px]"
            >
              One platform that thinks in systems, not silos.
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-sm leading-[1.7] text-[#475569] mb-6"
            >
              KronGage was engineered to excel in demanding environments, where infrastructure varies, regulations shift, and customer behaviour is diverse. It&apos;s robust because it had to be.
            </motion.p>
            <motion.div variants={staggerItem} className="self-start">
              <Button asChild className="text-sm font-bold">
                <MotionLink
                  href="/platform"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  View Full Platform
                </MotionLink>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerGrid}
            className="flex-1 grid grid-cols-2 sm:grid-cols-4"
          >
            {FEATURES.map(f => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ backgroundColor: '#EEF5FD' }}
                transition={{ duration: 0.2 }}
                className="group border-r border-b border-[#e2e8f0] min-h-[200px] flex flex-col items-center justify-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                >
                  {f.lottie ? (
                    <LottieIcon animationData={f.lottie} size={72} />
                  ) : (
                    <f.icon size={72} weight="duotone" color="#0D47A1" />
                  )}
                </motion.div>
                <span className="text-base font-bold text-[#0D47A1]">
                  {f.title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
