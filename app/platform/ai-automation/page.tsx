import type { Metadata } from 'next';
import PhosphorIcon from '@/components/PhosphorIcon';
import FeaturePageTemplate from '@/components/platform/FeaturePageTemplate';
import HeroChatbot from '@/components/platform/HeroChatbot';

export const metadata: Metadata = {
  title: 'AI & Automation — KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

const WorkflowVisual = (
  <div className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-8">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 w-full max-w-[360px]">
      <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#94a3b8] mb-4">Workflow Builder</div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-[#EEF5FD] rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center shrink-0">
            <PhosphorIcon name="Lightning" size={16} weight="duotone" color="#fff" />
          </div>
          <div><div className="text-xs font-bold text-[#0f172a]">Trigger</div><div className="text-[11px] text-[#64748b]">Customer sends a message</div></div>
        </div>
        <div className="pl-[19px]"><div className="w-px h-4 bg-[#cbd5e1]" /></div>
        <div className="flex items-center gap-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center shrink-0">
            <PhosphorIcon name="GitBranch" size={16} weight="duotone" color="#fff" />
          </div>
          <div><div className="text-xs font-bold text-[#0f172a]">Condition</div><div className="text-[11px] text-[#64748b]">If intent = billing enquiry</div></div>
        </div>
        <div className="pl-[19px]"><div className="w-px h-4 bg-[#cbd5e1]" /></div>
        <div className="flex items-center gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-lg bg-[#16a34a] flex items-center justify-center shrink-0">
            <PhosphorIcon name="CheckCircle" size={16} weight="duotone" color="#fff" />
          </div>
          <div><div className="text-xs font-bold text-[#0f172a]">Action</div><div className="text-[11px] text-[#64748b]">Route to Billing team</div></div>
        </div>
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <FeaturePageTemplate
      breadcrumbLabel="AI & Automation"
      eyebrow="Artificial Intelligence"
      title="KronGage AI & Automation"
      description="Artificial intelligence is woven into every layer of KronGage, from customer interaction handling and content creation to predictive analytics and workflow automation. The platform's AI-first architecture ensures that every customer engagement is enriched with intelligent insights while maintaining human oversight and control."
      hideHero
      impactStats={[
        { title: 'Customer Support Agent', description: 'The Support Agent handles incoming customer enquiries across all channels. It searches the knowledge base, looks up customer history and account information, and provides accurate, contextual responses.' },
        { title: 'Content Creation Agent', description: 'The Content Agent assists marketing teams in generating, optimising, and repurposing content for social media and campaigns.' },
        { title: 'Routing Agent', description: 'The Routing Agent serves as the intelligent traffic controller, classifying every incoming interaction by intent, sentiment, language, and urgency to determine the optimal routing destination.' },
        { title: 'Workflow Automation', description: 'Beyond AI agents, KronGage provides a visual workflow automation engine that enables businesses to design and deploy complex, multi-step processes without coding.' },
      ]}
      capabilities={[
        {
          eyebrow: 'AI Agents',
          headline: 'AI Agents',
          title: 'Purpose-Built Agents For Every Job',
          description: 'KronGage runs a team of specialised AI agents behind the scenes — each trained for a specific job, working together to handle customer conversations end-to-end.',
          visual: <HeroChatbot />,
        },
        {
          eyebrow: 'Workflow Automation',
          headline: 'No Code',
          title: 'No-Code Automation For Complex Journeys',
          description: 'Beyond AI agents, KronGage provides a visual workflow automation engine that lets teams design and deploy multi-step processes — no engineering required.',
          visual: WorkflowVisual,
        },
      ]}
      supportingFeatures={[
        { icon: 'Brain', title: 'Natural Language Understanding', description: "Every agent understands intent, sentiment, and context in the customer's own words." },
        { icon: 'ShieldCheck', title: 'Human-in-the-Loop Controls', description: 'Set exactly which actions AI can take automatically, and which need human approval.' },
        { icon: 'Translate', title: 'Multilingual by Default', description: 'AI agents converse fluently across languages without extra configuration.' },
        { icon: 'ChartLineUp', title: 'Continuous Learning', description: 'Agents improve over time using feedback from resolved conversations.' },
        { icon: 'PlugsConnected', title: 'Works With Your Knowledge Base', description: 'Agents pull answers from your existing docs, FAQs, and policies — always up to date.' },
        { icon: 'GearSix', title: 'Configurable Guardrails', description: 'Define tone, scope, and escalation rules so AI stays on-brand and in-bounds.' },
      ]}
      faqs={[
        { question: 'Can I control which conversations AI handles automatically?', answer: 'Yes. You define which intents and channels AI Agents can resolve on their own, and which get routed to a human — with full visibility either way.' },
        { question: 'Does the AI need to be trained separately for our business?', answer: 'AI Agents connect to your existing knowledge base, FAQs, and customer data — no separate model training required to get started.' },
        { question: "What happens if the AI can't resolve a query?", answer: 'Unresolved or low-confidence conversations are automatically escalated to the right team, with full context carried over.' },
        { question: 'Can we build automations without engineering support?', answer: 'Yes. The visual workflow builder is designed for marketing and support teams — no code required.' },
      ]}
    />
  );
}
