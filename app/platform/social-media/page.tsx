import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import SocialPublishing from '@/components/platform/SocialPublishing';

export const metadata: Metadata = {
  title: 'Social Media Management — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const BEST_TIMES = [
  { platform: 'Instagram', time: '6:30 PM' },
  { platform: 'Facebook', time: '12:15 PM' },
  { platform: 'X / Twitter', time: '9:00 AM' },
  { platform: 'LinkedIn', time: '8:45 AM' },
];

const BestTimeVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 w-full max-w-[360px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94a3b8] mb-4">AI Recommended Times</div>
      <div className="flex flex-col gap-3">
        {BEST_TIMES.map(t => (
          <div key={t.platform} className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0f172a]">{t.platform}</span>
            <span className="text-xs font-bold text-[#0D47A1]">{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Social Media Management"
      eyebrow="Social Publishing"
      title="Social Media Management"
      description="KronGage's Social Media Management module provides a comprehensive, enterprise-grade suite of tools for social media publishing, scheduling, content management, and performance analytics."
      hideHero
      impactStats={[
        { title: 'Content Calendar', description: 'Marketing teams can see scheduled, published, draft, and failed posts at a glance with color-coded platform indicators and status markers.' },
        { title: 'Bulk Scheduling', description: 'KronGage supports bulk scheduling via CSV upload with up to 500 posts per batch. Each CSV can include content, target platforms, scheduled date and time, media URLs, first comments, and hashtag groups.' },
        { title: 'AI-Powered Content Optimisation', description: 'AI analyses historical engagement data to recommend the best times to post for each platform and audience. Generate platform-optimised posts from topic briefs, product descriptions, or campaign themes.' },
        { title: 'Analytics & Reporting', description: 'Comprehensive social media analytics track performance across all connected platforms with unified metrics, cross-platform comparison, and trend analysis.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Content Calendar',
          headline: 'One Calendar',
          title: 'Plan And Publish From One Calendar',
          description: 'See every scheduled, published, and draft post across all your social channels at a glance — with status and platform indicators built in.',
          visual: <SocialPublishing />,
        },
        {
          eyebrow: 'AI Content',
          headline: 'Best Time',
          title: 'AI That Knows Your Best Time To Post',
          description: 'AI analyses historical engagement to recommend optimal posting times, and generates platform-optimised content from a brief, product description, or campaign theme.',
          visual: BestTimeVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'UsersThree', title: 'Team Approval Workflows', description: 'Route drafts through review and approval before they go live.' },
        { icon: 'Image', title: 'Media Library', description: 'Store and reuse approved images, videos, and brand assets across every post.' },
        { icon: 'Hash', title: 'Hashtag Groups', description: 'Save and apply curated hashtag sets to speed up publishing.' },
        { icon: 'ChatCircleDots', title: 'Unified Comment Inbox', description: 'Reply to comments and DMs across every connected platform from one place.' },
        { icon: 'Repeat', title: 'Content Repurposing', description: 'Adapt one piece of content into formats suited to each platform automatically.' },
        { icon: 'Users', title: 'Multi-Brand Management', description: 'Manage separate accounts and content calendars for multiple brands or regions.' },
      ]}
      faqs={[
        { question: 'Which social platforms can I manage from KronGage?', answer: 'Instagram, Facebook, X (Twitter), LinkedIn, TikTok, Telegram, YouTube and Pinterest are supported for publishing and scheduling.' },
        { question: 'How many posts can I schedule at once?', answer: 'Bulk scheduling supports up to 500 posts per CSV batch, including content, media, hashtags, and scheduled times.' },
        { question: 'Does the AI generate content automatically?', answer: 'AI drafts platform-optimised content from a brief you provide — your team reviews and approves before anything publishes.' },
        { question: 'Can multiple team members collaborate on content?', answer: 'Yes, draft, review, and approval workflows let teams collaborate before content goes live.' },
      ]}
    />
  );
}
