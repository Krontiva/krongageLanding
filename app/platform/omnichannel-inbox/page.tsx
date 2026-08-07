import type { Metadata } from 'next';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import HeroChatbot from '@/components/platform/HeroChatbot';
import InboxDemo from '@/components/platform/InboxDemo';
import ChannelCoverageCard from '@/components/platform/ChannelCoverageCard';

export const metadata: Metadata = {
  title: 'Omnichannel Inbox — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="Omnichannel Inbox"
      eyebrow="Customer Engagement"
      title="One Inbox For Every Conversation, Everywhere"
      description="The KronGage Omnichannel Inbox transforms how businesses handle customer interactions by consolidating every communication channel into a single, intelligent workspace. Whether a customer reaches out via WhatsApp, emails a support query, or comments on a social media post, every interaction flows into one unified conversation thread with complete context."
      hideHero
      impactStats={[
        {
          title: 'Agent Productivity',
          description: '2-3x more conversations per agent through AI Copilot, automation, and a unified interface that eliminates context-switching.',
        },
        {
          title: 'Customer Satisfaction',
          description: '15-25% increase through faster, more consistent, and contextual service delivered across every channel.',
        },
        {
          title: 'Average Response Time',
          description: '60-70% reduction through AI routing, suggested responses, and smart automation that handles repetitive queries.',
        },
        {
          title: 'Channel Coverage',
          description: '3-5x more channels managed from a single platform, with no more siloed tools for each communication channel.',
        },
      ]}
      capabilities={[
        {
          eyebrow: 'Unified Conversations',
          headline: 'One Thread',
          title: 'Every Channel, One Thread',
          description: 'Stop hunting across tabs and tools. Every message — WhatsApp, email, SMS, webchat, social — lands in a single thread per customer, with full history and context carried along automatically.',
          visual: <InboxDemo />,
        },
        {
          eyebrow: 'AI Copilot',
          headline: 'Smart Routing',
          title: 'Smart Routing & AI-Assisted Replies',
          description: 'KronGage automatically routes conversations to the right team and surfaces AI-suggested responses, so agents resolve issues faster without sacrificing a personal touch.',
          visual: <HeroChatbot />,
        },
        {
          eyebrow: 'Channel Coverage',
          headline: 'Every Channel',
          title: 'Built for Every Channel Your Customers Use',
          description: 'From WhatsApp to email to social DMs, KronGage connects the channels your customers already use — no separate tool, login, or workflow required for each one.',
          visual: <ChannelCoverageCard />,
        },
      ]}
      supportingFeatures={[
        { icon: 'UsersThree', title: 'Team Inboxes', description: 'Organise conversations by team, department, or queue so the right people see the right messages.' },
        { icon: 'Tag', title: 'Conversation Tagging', description: 'Label and categorise conversations for reporting, follow-up, and workflow automation.' },
        { icon: 'ClockCounterClockwise', title: 'Full Interaction History', description: 'Every past conversation, on every channel, available in one place — no digging required.' },
        { icon: 'Robot', title: 'AI-Suggested Replies', description: 'Draft responses grounded in your knowledge base, ready for an agent to review and send.' },
        { icon: 'Bell', title: 'Real-Time Notifications', description: 'Agents are notified instantly when a new message or an SLA deadline needs attention.' },
        { icon: 'ChartBar', title: 'Inbox Analytics', description: 'Track response times, resolution rates, and channel volume from a single dashboard.' },
      ]}
      faqs={[
        {
          question: 'Which channels does the Omnichannel Inbox support?',
          answer: 'WhatsApp, Email, SMS, Webchat, and major social channels including Instagram, Facebook, and Telegram — all managed from the same inbox.',
        },
        {
          question: 'Can I route conversations to specific teams or agents?',
          answer: 'Yes. Conversations can be routed automatically based on intent, channel, priority, or language, and reassigned manually at any time.',
        },
        {
          question: 'Does the AI Copilot reply to customers automatically?',
          answer: 'The AI Copilot drafts suggested replies for agents to review and send. You control which types of queries, if any, are handled fully automatically.',
        },
        {
          question: 'How long does implementation take?',
          answer: 'Most teams are live on their core channels within days. Our team handles channel connections and initial configuration as part of onboarding.',
        },
      ]}
    />
  );
}
