'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowRightIcon,
  UserCircleIcon,
  ChatsCircleIcon,
  UsersThreeIcon,
  MegaphoneIcon,
  ChartBarIcon,
  GearIcon,
  TrendUpIcon,
  TrendDownIcon,
  CaretDownIcon,
  PlusIcon,
} from '@phosphor-icons/react';
import { WipeButton } from '@/components/WipeButton';
import Scanner from '@/components/Scanner';

// Four badge slots per ring, spaced ~20° off the horizontal so they stay
// clear of the nav (above) and the dashboard mockup (below).
const SPOTS = {
  'right-top':    { dxr: Math.cos(Math.PI / 9),  dyr: -Math.sin(Math.PI / 9) },
  'right-bottom': { dxr: Math.cos(Math.PI / 9),  dyr: Math.sin(Math.PI / 9) },
  'left-top':     { dxr: -Math.cos(Math.PI / 9), dyr: -Math.sin(Math.PI / 9) },
  'left-bottom':  { dxr: -Math.cos(Math.PI / 9), dyr: Math.sin(Math.PI / 9) },
};

// Only two rings — each carries four badges, rendered at each icon's own
// natural aspect ratio (no circular/background wrapper forced on top).
const ORBIT_RINGS = [
  {
    size: 900, topClass: '-top-40', border: 'border-[#0D47A1]/10', duration: 90, spin: 1,
    badges: [
      { spot: 'right-top',    iconSrc: '/whatsapp-icon.svg',  w: 36, h: 36 },
      { spot: 'right-bottom', iconSrc: '/messenger.svg',      w: 36, h: 36 },
      { spot: 'left-top',     iconSrc: '/instagram-icon.svg', w: 36, h: 36 },
      { spot: 'left-bottom',  iconSrc: '/telegram.svg',       w: 36, h: 36 },
    ],
  },
  {
    size: 1180, topClass: '-top-64', border: 'border-[#0D47A1]/6', duration: 130, spin: -1,
    badges: [
      { spot: 'right-top',    iconSrc: '/facebook-icon.svg', w: 36, h: 36 },
      { spot: 'right-bottom', iconSrc: '/gmail.svg',         w: 46, h: 36 },
      { spot: 'left-top',     iconSrc: '/TikTok_light.svg',  w: 32, h: 36 },
      { spot: 'left-bottom',  iconSrc: '/linkedin.svg',      w: 36, h: 36 },
    ],
  },
];

const SIDEBAR_ITEMS = [
  { label: 'Inbox',     Icon: ChatsCircleIcon, active: true },
  { label: 'Contacts',  Icon: UsersThreeIcon,  active: false },
  { label: 'Campaigns', Icon: MegaphoneIcon,   active: false },
  { label: 'Analytics', Icon: ChartBarIcon,    active: false },
  { label: 'Settings',  Icon: GearIcon,        active: false },
];

const STATS = [
  { label: 'Active Conversations', value: '128', change: '+12%', trend: 'up',   color: '#0D47A1', bg: '#EEF5FD', barWidth: '55%' },
  { label: 'Resolved Today',       value: '342', change: '+8%',  trend: 'up',   color: '#16a34a', bg: '#ECFDF5', barWidth: '70%' },
  { label: 'Pending Follow-ups',   value: '19',  change: '-14%', trend: 'down', color: '#e11d48', bg: '#FEE2E2', barWidth: '25%' },
  { label: 'Avg Response Time',    value: '2m',  change: '-18%', trend: 'down', color: '#6d28d9', bg: '#F3F0FF', barWidth: '60%' },
];

const RECENT_CONVERSATIONS = [
  { initials: 'JM', name: 'Jane Mensah',   message: 'Can you confirm the delivery date for order #4821?', channel: 'WhatsApp',  time: '2m ago',  color: '#22c55e' },
  { initials: 'KA', name: 'Kwame Asante',  message: 'Thanks for the quick response, really appreciate it!', channel: 'Instagram', time: '14m ago', color: '#db2777' },
  { initials: 'RA', name: 'Ruth Addo',     message: 'I need help resetting my account password.',          channel: 'Email',      time: '1h ago',   color: '#0D47A1' },
];

export default function UnifiedHero() {
  return (
    <section className="relative overflow-hidden bg-[#f0f7ff] pt-40">
      {/* Animated scan-field backdrop — sits behind the orbit rings and content */}
      <div className="absolute inset-0 pointer-events-auto" aria-hidden="true">
        <Scanner
          color1="#0D47A1"
          color2="#0a3680"
          color3="#FFFFFF"
          speed={0.5}
          sweepSpeed={0.25}
          sweepWidth={1.15}
          sweepFalloff={6}
          scale={1.5}
          frequency={2}
          ripple={0.22}
          bandDensity={12.5}
          lineSharpness={5.5}
          glow={0.22}
          scanDirection="vertical"
          colorSpread={0.7}
          brightness={0.55}
          contrast={1.15}
          softness={1.4}
          vignette={0.45}
          scanline={true}
          grain={true}
          grainIntensity={0.05}
          opacity={1.0}
          mouseInteraction={true}
          mouseRadius={0.5}
          mouseStrength={0.5}
        />
      </div>

      {/* Decorative background glow — purely visual, sits behind everything */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {ORBIT_RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className={`absolute ${ring.topClass} left-1/2 rounded-full border border-dashed ${ring.border}`}
            style={{ x: '-50%', width: ring.size, height: ring.size }}
            animate={{ rotate: 360 * ring.spin }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
          >
            {ring.badges.map((badge, j) => {
              const spot = SPOTS[badge.spot];
              const radius = ring.size / 2;
              return (
                <motion.div
                  key={j}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    x: radius * spot.dxr - badge.w / 2,
                    y: radius * spot.dyr - badge.h / 2,
                    width: badge.w,
                    height: badge.h,
                  }}
                  animate={{ rotate: -360 * ring.spin }}
                  transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
                >
                  <Image
                    src={badge.iconSrc}
                    alt=""
                    width={badge.w}
                    height={badge.h}
                    className="h-full w-full object-contain drop-shadow-[0_4px_10px_rgba(13,71,161,0.18)]"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
        <div className="absolute -top-20 -right-32 w-[560px] h-[560px] rounded-full bg-[#0D47A1]/[0.07] blur-3xl" />
        <div className="absolute top-40 -left-24 w-[420px] h-[420px] rounded-full bg-[#0D47A1]/[0.05] blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-[40px] sm:text-[56px] font-normal leading-[1.1] tracking-[-1.5px] mb-5"
        >
          All your customer data.<br /> Finally unified.
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-base sm:text-lg leading-[1.75] text-[#475569] mb-9 max-w-xl mx-auto"
        >
          Emails, WhatsApp chats, orders, support tickets — KronGage pulls every customer touchpoint into one platform, so your team stops switching tabs and starts seeing the whole picture.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="flex flex-wrap gap-3.5 justify-center mb-16"
        >
          <WipeButton
            href="/contact"
            className="border-transparent bg-[#0D47A1] text-white"
            wipeClassName="bg-[#0a3680]"
          >
            Request a Demo <ArrowRightIcon size={16} weight="bold" />
          </WipeButton>
        </motion.div>
      </div>

      {/* Dashboard mockup */}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          className="relative rounded-t-2xl border border-[#e2e8f0] bg-white overflow-hidden text-left min-h-[360px]"
        >
          {/* Mockup top bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2">
              <Image src="/Krongage-Logo.png" alt="" width={20} height={20} className="h-5 w-auto" />
              <span className="text-[13px] font-bold text-[#0f172a]">KronGage Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0D47A1] rounded-full px-3 py-1.5">
                <PlusIcon size={12} weight="duotone" /> Add Contact
              </button>
              <span className="w-7 h-7 rounded-full bg-[#EEF5FD] flex items-center justify-center">
                <UserCircleIcon size={16} weight="duotone" color="#0D47A1" />
              </span>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden sm:block w-40 shrink-0 border-r border-[#f1f5f9] py-4 px-3">
              <div className="flex flex-col gap-1">
                {SIDEBAR_ITEMS.map(item => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[12px] font-semibold ${
                      item.active ? 'bg-[#EEF5FD] text-[#0D47A1]' : 'text-[#64748b]'
                    }`}
                  >
                    <item.Icon size={15} weight="duotone" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main panel */}
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-bold text-[#0f172a]">Overview</span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-[#64748b]">
                  Mar 01 – Apr 01, 2026 <CaretDownIcon size={11} weight="duotone" />
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map(stat => (
                  <div key={stat.label} className="rounded-xl border border-[#f1f5f9] p-3.5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-semibold text-[#64748b]">{stat.label}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: stat.color }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: stat.bg }}>
                          {stat.trend === 'up' ? (
                            <TrendUpIcon size={10} weight="bold" color={stat.color} />
                          ) : (
                            <TrendDownIcon size={10} weight="bold" color={stat.color} />
                          )}
                        </span>
                        {stat.change}
                      </span>
                    </div>
                    <div className="flex h-[3px] rounded-full overflow-hidden bg-[#e2e8f0] mb-3">
                      <div className="h-full rounded-full" style={{ width: stat.barWidth, background: stat.color }} />
                    </div>
                    <div className="text-2xl font-extrabold text-[#0f172a] leading-tight">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold text-[#0f172a]">Recent Conversations</span>
                  <span className="text-[11px] font-bold text-[#0D47A1]">View all →</span>
                </div>
                <div className="flex flex-col gap-2">
                  {RECENT_CONVERSATIONS.map(item => (
                    <div key={item.name} className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] p-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                        style={{ background: item.color }}
                      >
                        {item.initials}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[12px] font-bold text-[#0f172a] truncate">{item.name}</span>
                          <span className="text-[10px] text-[#94a3b8] shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#64748b] truncate">{item.message}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-[#0D47A1] bg-[#EEF5FD] rounded-full px-2 py-1 shrink-0">
                        {item.channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
