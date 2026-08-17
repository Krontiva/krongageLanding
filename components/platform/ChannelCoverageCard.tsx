import {
  WhatsappLogo,
  EnvelopeSimple,
  ChatCircleText,
  Globe,
  InstagramLogo,
  FacebookLogo,
  TelegramLogo,
  ChatsCircle,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';

const CHANNELS: { label: string; Icon: Icon; color: string }[] = [
  { label: 'WhatsApp',  Icon: WhatsappLogo,   color: '#25D366' },
  { label: 'Email',     Icon: EnvelopeSimple, color: '#EA4335' },
  { label: 'SMS',       Icon: ChatCircleText, color: '#7c3aed' },
  { label: 'Webchat',   Icon: Globe,          color: '#0D47A1' },
  { label: 'Instagram', Icon: InstagramLogo,  color: '#E1306C' },
  { label: 'Facebook',  Icon: FacebookLogo,   color: '#1877F2' },
  { label: 'Telegram',  Icon: TelegramLogo,   color: '#26A5E4' },
  { label: 'Messenger', Icon: ChatsCircle,    color: '#00B2FF' },
];

export default function ChannelCoverageCard({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full bg-[#f8fafc] flex items-center justify-center p-8 ${className ?? ''}`}>
      <div className="grid grid-cols-4 gap-4 w-full max-w-[420px]">
        {CHANNELS.map(c => (
          <div
            key={c.label}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-4 flex flex-col items-center gap-2 text-center"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color }}>
              <c.Icon size={20} weight="fill" color="#fff" />
            </div>
            <span className="text-[11px] font-bold text-[#0f172a]">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
