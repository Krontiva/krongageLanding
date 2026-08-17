import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Blog – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const AUTHOR = { initials: 'K', name: 'KronGage Editorial', role: 'Insights & Research' };

const FEATURED = {
  href: '/blog/retention-gap/',
  category: 'Practice',
  date: 'May 12, 2026',
  readTime: '8 min',
  title: 'The Retention Gap: Why Success Teams Struggle',
  description: 'In an era of endless options, "customer success" has become more than just a department — it’s a survival strategy. Yet despite record investment in CS tooling, most teams are losing the retention battle. Here’s why.',
  image: 'https://images.unsplash.com/photo-1559523182-a284c3fb7cff',
};

const POSTS = [
  {
    href: '/blog/ai-support-tier-1/',
    category: 'AI & Automation',
    date: 'June 2025',
    readTime: '7 min read',
    title: 'How AI Agents Are Replacing Tier-1 Support — Without Losing the Human Touch',
    description: "Most companies automate the wrong things first. Here's what the best operators figured out — and why the handoff is everything.",
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
  },
  {
    href: '/blog/beyond-whatsapp/',
    category: 'Omnichannel',
    date: 'May 2025',
    readTime: '6 min read',
    title: 'Beyond WhatsApp: Building a True Omnichannel Experience in 2025',
    description: "WhatsApp is just the start. Here's how leading brands are unifying every customer touchpoint under one intelligent inbox.",
    image: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32',
  },
  {
    href: '/blog/vanity-metrics-to-value/',
    category: 'Analytics',
    date: 'April 2025',
    readTime: '7 min read',
    title: 'From Vanity Metrics to Value: What Your Customer Data Is Really Telling You',
    description: "Most dashboards show what happened. The best ones show what to do next. Here's how to close that gap.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
];

function AuthorRow() {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-8 h-8 rounded-full shrink-0 bg-[linear-gradient(135deg,#0D47A1,#1976D2)] flex items-center justify-center text-xs font-extrabold text-white">{AUTHOR.initials}</div>
      <div>
        <div className="text-[13px] font-bold text-[#0f172a]">{AUTHOR.name}</div>
        <div className="text-[11px] text-[#64748b]">{AUTHOR.role}</div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">Insights &amp; Perspectives</div>
        <h1 className="text-[44px] font-normal text-[#0f172a] leading-[1.15] mb-[14px] max-[640px]:text-[30px]">The KronGage Blog</h1>
        <p className="text-[17px] text-[#64748b] max-w-[560px] leading-[1.7]">Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.</p>
      </div>

      {/* Featured article */}
      <a href={FEATURED.href} className="block bg-[#f8fafc] rounded-[24px] p-6 mb-14 max-[900px]:p-4">
        <div className="grid grid-cols-2 gap-10 items-center max-[900px]:grid-cols-1 max-[900px]:gap-6">
          <div className="w-full h-[420px] rounded-2xl overflow-hidden relative max-[900px]:h-[280px]">
            <Image src={FEATURED.image} alt="" fill sizes="(max-width: 900px) 100vw, 560px" className="object-cover" priority />
          </div>
          <div className="pr-4 max-[900px]:pr-0">
            <div className="flex items-center gap-3 text-[13px] text-[#94a3b8] font-semibold mb-4">
              <span>{FEATURED.category}</span>
              <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
              <span>{FEATURED.date}</span>
              <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
              <span>{FEATURED.readTime}</span>
            </div>
            <h2 className="text-[32px] font-normal text-[#0f172a] leading-[1.2] mb-4 max-[640px]:text-[24px]">{FEATURED.title}</h2>
            <p className="text-[15px] text-[#64748b] leading-[1.7] mb-7">{FEATURED.description}</p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <AuthorRow />
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D47A1] underline underline-offset-4">
                Read the piece <ArrowUpRight size={15} weight="bold" />
              </span>
            </div>
          </div>
        </div>
      </a>

      {/* Grid of remaining posts */}
      <div className="text-xs font-bold text-[#94a3b8] tracking-[1px] uppercase mb-6 pb-3 border-b border-[#f1f5f9]">More from the Blog</div>
      <div className="grid grid-cols-3 gap-8 max-[900px]:grid-cols-1">
        {POSTS.map(post => (
          <a key={post.href} href={post.href} className="bg-[#f8fafc] rounded-2xl overflow-hidden p-3 flex flex-col">
            <div className="w-full h-[190px] rounded-xl overflow-hidden relative">
              <Image src={post.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="px-2 pt-4 pb-2 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-[11px] text-[#94a3b8] font-semibold mb-3">
                <span>{post.category}</span>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                <span>{post.date}</span>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-[17px] font-normal text-[#0f172a] leading-[1.35] mb-2">{post.title}</h3>
              <p className="text-[13px] text-[#64748b] leading-[1.6] mb-5">{post.description}</p>
              <div className="mt-auto pt-1">
                <AuthorRow />
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
