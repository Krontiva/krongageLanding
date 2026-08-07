import PhosphorIcon from '@/components/PhosphorIcon';

export default function InsuranceAiSupportVisual({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full bg-[#f0f4f9] flex items-center justify-center p-8 ${className ?? ''}`}>
      <div className="flex items-center justify-center relative h-[240px] w-full">
        <div className="w-[180px] h-[180px] rounded-full bg-[linear-gradient(145deg,#c8dff5,#a8c8e8)] relative overflow-hidden flex items-end justify-center shadow-[0_8px_32px_rgba(13,71,161,0.18)]">
          <div className="flex flex-col items-center absolute bottom-0">
            <div className="w-[58px] h-[58px] rounded-full bg-[linear-gradient(135deg,#8B5A2B,#6B4423)] relative">
              <div className="absolute -top-[2px] -left-[3px] -right-[3px] h-[26px] bg-[#1a0a00] rounded-t-full" />
            </div>
            <div className="w-4 h-[9px] bg-[#7a4a28] mx-auto" />
            <div className="w-[110px] h-[140px] bg-[linear-gradient(160deg,#1d4ed8,#1e40af)] rounded-t-full" />
          </div>
        </div>
        <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center shadow-[0_4px_12px_rgba(13,71,161,0.3)] top-6 left-0"><PhosphorIcon name="Robot" size={16} weight="duotone" color="#fff" /></div>
        <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center shadow-[0_4px_12px_rgba(13,71,161,0.3)] top-6 right-0"><PhosphorIcon name="ChatCircle" size={16} weight="duotone" color="#fff" /></div>
        <div className="absolute w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center shadow-[0_4px_12px_rgba(13,71,161,0.3)] bottom-[54px] -right-1"><PhosphorIcon name="Lightning" size={16} weight="duotone" color="#fff" /></div>
      </div>
    </div>
  );
}
