import PhosphorIcon from '@/components/PhosphorIcon';

const CONTACTS = [
  { initials: 'AM', color: '#0D47A1', name: 'Ama Serwah', message: 'Hi, I need help with my account' },
  { initials: 'KM', color: '#7c3aed', name: 'Kofi Mensah', message: 'When will my order arrive?' },
  { initials: 'PN', color: '#0891b2', name: 'Priya Nair', message: 'Can I reschedule my appointment?' },
];

export default function MultichannelMessagingCard({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full bg-[#f0f4f9] flex items-center justify-center p-8 ${className ?? ''}`}>
      <div className="bg-white rounded-2xl overflow-hidden max-w-[280px] w-full">
        <div className="bg-[#0D47A1] px-4 py-3 flex items-center gap-[10px]">
          <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center text-white">
            <PhosphorIcon name="Lightning" size={14} weight="duotone" color="#fff" />
          </div>
          <span className="text-xs font-bold text-white">Multichannel messaging</span>
        </div>
        <div className="flex gap-[6px] px-4 py-3 border-b border-[#f1f5f9]">
          <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="ChatCircle" size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="EnvelopeSimple" size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="DeviceMobile" size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="Globe" size={16} weight="duotone" color="#0D47A1" /></div>
          <div className="w-7 h-7 rounded-[7px] bg-[#EEF5FD] flex items-center justify-center"><PhosphorIcon name="DeviceMobile" size={16} weight="duotone" color="#0D47A1" /></div>
        </div>
        <div className="px-[14px] py-[10px]">
          {CONTACTS.map(c => (
            <div key={c.name} className="flex items-center gap-[9px] py-[7px] border-b border-[#f8fafc] last:border-b-0">
              <div className="w-[26px] h-[26px] rounded-full shrink-0 text-[9px] font-extrabold text-white flex items-center justify-center" style={{ background: c.color }}>{c.initials}</div>
              <div>
                <div className="text-[11px] font-bold text-[#0f172a]">{c.name}</div>
                <div className="text-[10px] text-[#94a3b8] mt-px">{c.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#f8fafc] px-[14px] py-[9px] flex items-center gap-[6px]">
          <div className="w-[7px] h-[7px] rounded-full bg-[#22c55e] shrink-0" />
          <span className="text-[10px] font-bold text-[#16a34a]">Live agent</span>
          <div className="flex ml-auto">
            <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#0D47A1]">JO</div>
            <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#16a34a]">AM</div>
            <div className="w-[22px] h-[22px] rounded-full border-2 border-white -ml-[5px] text-[8px] font-extrabold text-white flex items-center justify-center bg-[#dc2626]">KP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
