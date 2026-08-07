import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import SocialMediaMgmt from '@/components/platform/SocialMediaMgmt';

export const metadata: Metadata = {
  title: 'Social Intelligence — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Social Intelligence"
      eyebrow="Social Listening"
      title="Social Intelligence"
      description="Know what the world is saying about your brand. KronGage monitors conversations across every social channel, turning raw mentions into actionable insights that drive smarter engagement strategies."
      hideHero
      impactStats={[
        { title: 'Brand Monitoring', description: 'Track every mention, hashtag, and keyword across all major social platforms in real-time — no signal goes unnoticed.' },
        { title: 'Sentiment Analysis', description: 'AI classifies every conversation by sentiment, topic, and urgency so your team responds with context and empathy.' },
        { title: 'Competitor Benchmarking', description: 'Compare your share of voice, engagement rates, and content performance against competitors side-by-side.' },
        { title: 'Trend Detection', description: 'Spot emerging topics and viral moments early — so your brand can join conversations at the right time, every time.' },
      ]}
      capabilities={[
        {
          eyebrow: 'Brand Monitoring & Competitive Insight',
          headline: 'Full Picture',
          title: 'Know What’s Being Said — And How You Compare',
          description: 'KronGage tracks every mention, hashtag, and keyword across all major social platforms in real time, then benchmarks your share of voice and engagement against competitors — so you always know where you stand.',
          visual: <SocialMediaMgmt />,
        },
      ]}
      supportingFeatures={[
        { icon: 'Bell', title: 'Real-Time Alerts', description: 'Get notified instantly of sentiment spikes or unusual mention volume.' },
        { icon: 'ChartBar', title: 'Reporting Dashboards', description: 'Turn raw mentions into shareable reports for leadership and clients.' },
        { icon: 'Translate', title: 'Multilingual Listening', description: 'Monitor conversations about your brand across languages and regions.' },
        { icon: 'MagnifyingGlass', title: 'Keyword & Hashtag Tracking', description: 'Follow specific terms, campaigns, or hashtags as they trend in real time.' },
        { icon: 'UserFocus', title: 'Influencer Identification', description: 'Surface the accounts driving the most engagement in conversations about your brand.' },
        { icon: 'Archive', title: 'Historical Mention Archive', description: 'Search and export past mentions for reporting or crisis review.' },
      ]}
      faqs={[
        { question: 'Which platforms does Social Intelligence monitor?', answer: 'KronGage tracks mentions, hashtags, and keywords across all major social platforms in real time.' },
        { question: 'How accurate is the sentiment analysis?', answer: 'AI classifies every mention by sentiment, topic, and urgency, continuously refined using real conversation data.' },
        { question: 'Can I benchmark against specific competitors?', answer: 'Yes, you can compare share of voice, engagement rate, and content performance against named competitors side-by-side.' },
        { question: 'Will I be alerted to a PR issue in real time?', answer: 'Yes, real-time alerts flag sentiment spikes or unusual mention volume as soon as they happen.' },
      ]}
    />
  );
}
