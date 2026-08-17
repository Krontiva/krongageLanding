'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRightIcon,
  CaretDownIcon,
  UsersThreeIcon,
  ChatsCircleIcon,
  MegaphoneIcon,
  SparkleIcon,
  DeviceMobileIcon,
  WaveformIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  ChatCircleTextIcon,
  WhatsappLogoIcon,
  ChartBarIcon,
} from '@phosphor-icons/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MotionLink = motion.create(Link);
const MotionAnchor = motion.create('a');

const PLATFORM_OVERVIEW = [
  { label: 'Customer 360',     href: '/platform/customer-data',      desc: 'Know who your customer is regardless of the touch point or channel.', Icon: UsersThreeIcon },
  { label: 'Omnichannel Inbox',href: '/platform/omnichannel-inbox',   desc: 'Send all messages from one place.',                                   Icon: ChatsCircleIcon },
];

const PLATFORM_CAPABILITIES = [
  { label: 'Campaign Management',     href: '/platform/campaign-management', desc: 'Manage the customer journey for SMS, WhatsApp and email', Icon: MegaphoneIcon },
  { label: 'AI Automation',           href: '/platform/ai-automation',       desc: 'Automate the mundane communication flows',              Icon: SparkleIcon },
  { label: 'Social Media Management', href: '/platform/social-media',        desc: 'All your social media channels in one place.',          Icon: DeviceMobileIcon },
  { label: 'Social Listening',        href: '/platform/social-intelligence',  desc: 'Monitor conversations across all social channels.',     Icon: WaveformIcon },
];

const PLATFORM_CHANNELS = [
  { label: 'Email',      Icon: EnvelopeSimpleIcon },
  { label: 'Web Messaging', Icon: GlobeIcon },
  { label: 'SMS / RCS',  Icon: ChatCircleTextIcon },
  { label: 'WhatsApp',   Icon: WhatsappLogoIcon },
];

const SOLUTIONS_INDUSTRIES = [
  { label: 'Banking & Finance',         href: '/solutions/banking' },
  { label: 'Telecommunications',        href: '/solutions/telecom' },
  { label: 'FMCG & Retail',             href: '/solutions/fmcg' },
  { label: 'Healthcare',                href: '/solutions/healthcare' },
  { label: 'Insurance',                 href: '/solutions/insurance' },
  { label: 'Government & Public Sector',href: '/solutions/government' },
];

const MOBILE_NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/platform', label: 'Platform' },
  { href: '/solutions', label: 'Solutions' },
];

const megaItemClass = "flex items-start gap-[10px] p-[10px] rounded-[10px] no-underline transition-colors hover:bg-[#f8fafc]";
const channelItemClass = "flex items-center gap-2 px-[10px] py-[7px] text-[#334155] text-[13px] font-medium";
const solutionsItemClass = "block px-3 py-2 rounded-lg no-underline text-[#334155] text-sm font-medium transition-colors hover:bg-[#f8fafc] hover:text-[#0D47A1]";

const dropdownTransition = { duration: 0.18, ease: 'easeOut' as const };

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <MotionLink
      href={href}
      className="relative pb-1 text-sm font-semibold text-[#475569] transition-colors hover:text-[#0f172a] focus-visible:outline-none focus-visible:text-[#0f172a]"
      initial="initial"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left rounded-full bg-[#0D47A1]"
        variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </MotionLink>
  );
}

function MegaTrigger({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <button
      className="bg-none border-none cursor-pointer [font-family:Manrope,system-ui,sans-serif] text-sm font-semibold text-[#475569] flex items-center gap-1 transition-colors p-0 hover:text-[#0f172a]"
    >
      {label} <CaretDownIcon size={12} weight="bold" className={cn('transition-transform duration-150', active && 'rotate-180')} />
    </button>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-h-12 items-center justify-between rounded-xl border border-[#f1f5f9] bg-white/70 px-4 text-[15px] font-semibold text-[#334155] no-underline transition-colors hover:bg-[#f8fafc] hover:text-[#0D47A1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D47A1]/40"
    >
      <span>{label}</span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState<'platform' | 'solutions' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 lg:px-8 lg:pt-4 [font-family:Manrope,system-ui,sans-serif]">
        <nav
          className={cn(
            'pointer-events-auto mx-auto w-full max-w-7xl rounded-2xl border transition-all duration-300 ease-in-out',
            scrolled
              ? 'border-[#0D47A1]/12 bg-white/85 shadow-[0_12px_40px_rgba(13,71,161,0.10)] backdrop-blur-xl'
              : 'border-transparent bg-white/70 shadow-none backdrop-blur-md'
          )}
        >
          <div className="flex items-center justify-between h-16 px-5 lg:h-[68px] lg:px-8">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image src="/Krongage-Logo.png" alt="KronGage" width={38} height={38} className="h-8 w-auto lg:h-[38px]" />
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
              <li><NavLink href="/">Home</NavLink></li>

              {/* Platform mega */}
              <li className="relative"
                onMouseEnter={() => setOpen('platform')}
                onMouseLeave={() => setOpen(null)}>
                <MegaTrigger
                  label="Platform"
                  active={open === 'platform'}
                />
                <AnimatePresence>
                  {open === 'platform' && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[100]"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={dropdownTransition}
                    >
                      <div className="w-[760px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#f1f5f9] grid grid-cols-[240px_1fr_190px]">
                        {/* Left: Overview */}
                        <div className="p-6 border-r border-[#f1f5f9]">
                          <div className="text-[15px] font-extrabold text-[#0f172a] mb-[6px]">The KronGage Platform</div>
                          <p className="text-xs text-[#64748b] leading-[1.6] mb-[14px]">All your customer data, channels and engagement orchestration in one place.</p>
                          <Link href="/platform" className="text-[13px] font-bold text-[#0D47A1] no-underline inline-flex items-center gap-1">
                            View the platform <ArrowRightIcon size={13} weight="bold" />
                          </Link>
                          <div className="mt-5 flex flex-col gap-1">
                            {PLATFORM_OVERVIEW.map(item => (
                              <a key={item.href} href={item.href} className={megaItemClass}>
                                <div className="w-8 h-8 bg-[#EEF5FD] rounded-lg flex items-center justify-center shrink-0">
                                  <item.Icon size={17} weight="duotone" color="#0D47A1" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-[#0f172a]">{item.label}</div>
                                  <div className="text-[11px] text-[#64748b] mt-0.5 leading-[1.4]">{item.desc}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Middle: Featured Capabilities */}
                        <div className="p-6 border-r border-[#f1f5f9]">
                          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#94a3b8] mb-[14px]">Featured Capabilities</div>
                          <div className="flex flex-col gap-1">
                            {PLATFORM_CAPABILITIES.map(item => (
                              <a key={item.href} href={item.href} className={megaItemClass}>
                                <div className="w-8 h-8 bg-[#EEF5FD] rounded-lg flex items-center justify-center shrink-0">
                                  <item.Icon size={17} weight="duotone" color="#0D47A1" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-bold text-[#0f172a]">{item.label}</div>
                                  <div className="text-[11px] text-[#64748b] mt-0.5 leading-[1.4]">{item.desc}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Right: Featured Channels */}
                        <div className="px-4 py-6">
                          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#94a3b8] mb-[14px]">Featured Channels</div>
                          <div className="flex flex-col gap-0.5">
                            {PLATFORM_CHANNELS.map(ch => (
                              <div key={ch.label} className={channelItemClass}>
                                <ch.Icon size={16} weight="duotone" color="#475569" />
                                <span>{ch.label}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-[14px] bg-[#EEF5FD] rounded-[10px] p-3">
                            <div>
                              <div className="text-xs font-bold text-[#0f172a]">How it works?</div>
                              <div className="text-[11px] text-[#64748b] mt-0.5 leading-[1.4]">Understand how our omnichannel inbox works to keep message clutter at bay.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Solutions mega */}
              <li className="relative"
                onMouseEnter={() => setOpen('solutions')}
                onMouseLeave={() => setOpen(null)}>
                <MegaTrigger
                  label="Solutions"
                  active={open === 'solutions'}
                />
                <AnimatePresence>
                  {open === 'solutions' && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[100]"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={dropdownTransition}
                    >
                      <div className="w-[520px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#f1f5f9] grid grid-cols-[210px_1fr]">
                        {/* Left: Industries */}
                        <div className="p-5 border-r border-[#f1f5f9]">
                          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#94a3b8] mb-3">Industries</div>
                          <div className="flex flex-col gap-0.5">
                            {SOLUTIONS_INDUSTRIES.map(item => (
                              <a key={item.href} href={item.href} className={solutionsItemClass}>{item.label}</a>
                            ))}
                          </div>
                        </div>

                        {/* Right: Feature highlight */}
                        <div className="p-5">
                          <div className="bg-[linear-gradient(135deg,#EEF5FD_0%,#dbeafe_100%)] rounded-[10px] h-[90px] flex items-center justify-center mb-[14px]">
                            <ChartBarIcon size={48} weight="duotone" color="#0D47A1" />
                          </div>
                          <div className="text-[13px] font-bold text-[#0f172a] leading-[1.4] mb-[6px]">
                            The Retention Gap: Why Success Teams Struggle
                          </div>
                          <p className="text-xs text-[#64748b] leading-[1.5]">
                            In an era of endless options, &ldquo;customer success&rdquo; has become more than just a department — it&apos;s a survival strategy.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li><NavLink href="/pricing">Pricing</NavLink></li>
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-5">
              <MotionAnchor
                href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io'}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-muted-foreground no-underline transition-colors hover:text-foreground"
                whileTap={{ scale: 0.97 }}
              >
                Log in
              </MotionAnchor>
              <Button asChild className="rounded-full px-5 text-sm font-bold">
                <MotionLink
                  href="/pricing"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  Start Free Trial
                </MotionLink>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(current => !current)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-[#f1f5f9] bg-white/80 text-[#475569] transition-colors hover:text-[#0f172a]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile menu"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-[#f1f5f9] bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl md:hidden [font-family:Manrope,system-ui,sans-serif]"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="flex flex-col gap-2">
                {MOBILE_NAV_ITEMS.map(item => (
                  <MobileNavLink
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
                <MobileNavLink href="/pricing" label="Pricing" onClick={() => setMobileOpen(false)} />
              </div>

              <div className="mt-4 border-t border-[#f1f5f9] pt-4 flex flex-col gap-3">
                <a
                  href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io'}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-[15px] font-semibold text-muted-foreground no-underline transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </a>
                <Button asChild className="h-12 w-full rounded-full text-[15px] font-bold">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    Start Free Trial
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
