const FLOATS = [
  { anim: 'animate-[float-y_3.6s_ease-in-out_0s_infinite]' },
  { anim: 'animate-[float-y_4.1s_ease-in-out_0.7s_infinite]' },
  { anim: 'animate-[float-y_3.9s_ease-in-out_0.35s_infinite]' },
  { anim: 'animate-[float-y_4.3s_ease-in-out_1.1s_infinite]' },
];

export default function FragmentedToolsMockup() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full items-start">
      <div className="flex flex-col gap-3">
        {/* Email card */}
        <div className={FLOATS[0].anim}>
          <div className="relative bg-white rounded-[10px] shadow-[0_4px_18px_rgba(0,0,0,0.1)] overflow-hidden max-h-[148px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-11 after:bg-gradient-to-b after:from-transparent after:to-white/96 after:pointer-events-none">
            <div className="bg-[#f1f3f4] border-b border-[#e0e0e0] px-[9px] py-[5px] flex items-center gap-[7px]">
              <div className="flex gap-1">
                <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white border border-[#dadce0] rounded-[20px] h-[18px] flex items-center px-[7px] text-[8.5px] text-[#5f6368] gap-1 overflow-hidden whitespace-nowrap">
                <div className="w-[5px] h-[5px] rounded-full shrink-0 bg-[#EA4335]" />
                mail.google.com
              </div>
            </div>
            <div className="px-[11px] pt-[9px] pb-[11px]">
              <div className="text-[9.5px] font-extrabold text-[#0f172a] mb-0.5">Email Welcome Series</div>
              <div className="text-[8.5px] text-[#64748b] mb-[7px]">Automated · 3 sequences</div>
              <div className="flex flex-col gap-[3px]">
                <div className="flex items-center gap-[5px] px-[5px] py-[3px] rounded-[4px] bg-[#eff6ff]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6] shrink-0" />
                  <div className="flex-1 h-[5px] rounded-[3px] bg-[#bfdbfe]" />
                  <div className="text-[7.5px] text-[#94a3b8]">9:41</div>
                </div>
                <div className="flex items-center gap-[5px] px-[5px] py-[3px] rounded-[4px] bg-[#eff6ff]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#3b82f6] shrink-0" />
                  <div className="flex-1 h-[5px] rounded-[3px] bg-[#bfdbfe] w-[65%]" />
                  <div className="text-[7.5px] text-[#94a3b8]">9:38</div>
                </div>
                <div className="flex items-center gap-[5px] px-[5px] py-[3px] rounded-[4px] bg-[#f8fafc]">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#e2e8f0] shrink-0" />
                  <div className="flex-1 h-[5px] rounded-[3px] bg-[#e2e8f0]" />
                  <div className="text-[7.5px] text-[#94a3b8]">Tue</div>
                </div>
              </div>
              <div className="text-[7.5px] text-[#94a3b8] mt-[7px] text-center py-[3px] border-t border-[#f1f5f9]">
                Separate login. No CRM sync.
              </div>
            </div>
          </div>
        </div>

        {/* CRM/data card */}
        <div className={FLOATS[1].anim}>
          <div className="relative bg-white rounded-[10px] shadow-[0_4px_18px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="bg-[#f1f3f4] border-b border-[#e0e0e0] px-[9px] py-[5px] flex items-center gap-[7px]">
              <div className="flex gap-1">
                <div className="w-[7px] h-[7px] rounded-full bg-[#ff5f57]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#febc2e]" />
                <div className="w-[7px] h-[7px] rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white border border-[#dadce0] rounded-[20px] h-[18px] flex items-center px-[7px] text-[8.5px] text-[#5f6368] gap-1 overflow-hidden whitespace-nowrap">
                <div className="w-[5px] h-[5px] rounded-full shrink-0 bg-[#4285f4]" />
                crm.dashboard.io
              </div>
            </div>
            <div className="px-[11px] pt-[9px] pb-[11px]">
              <div className="text-[10px] font-extrabold text-[#0f172a] leading-[1.3] mb-[3px]">
                Your Fragmented<br />Data Ecosystem
              </div>
              <div className="text-[8.5px] text-[#64748b] mb-2">Connects to nothing, confusing everything</div>
              <div className="bg-[#1e293b] rounded-[5px] p-[7px] mb-[7px]">
                <div className="flex gap-1 mb-[3px]">
                  <div className="h-[15px] rounded-[3px] bg-[#3b82f6] flex-[1.5]" />
                  <div className="h-[15px] rounded-[3px] bg-[#334155] flex-[0.6]" />
                </div>
                <div className="flex gap-1 mb-[3px]">
                  <div className="h-[15px] rounded-[3px] bg-[#334155] flex-[0.6]" />
                  <div className="h-[15px] rounded-[3px] bg-[#f59e0b] flex-[1.5]" />
                  <div className="h-[15px] rounded-[3px] bg-[#334155] flex-1" />
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                <div className="flex items-center gap-[3px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[4px] px-[5px] py-0.5 text-[8px] font-bold text-[#374151]">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#EA4335]" />Gmail
                </div>
                <div className="flex items-center gap-[3px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[4px] px-[5px] py-0.5 text-[8px] font-bold text-[#374151]">
                  <div className="w-[6px] h-[6px] rounded-[2px] bg-[#4A154B]" />Slack
                </div>
              </div>
              <div className="text-[7.5px] text-[#94a3b8] mt-[6px] text-center pt-[5px] border-t border-[#f1f5f9]">
                Multiple logins. Creates data silos.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* WhatsApp card */}
        <div className={FLOATS[2].anim}>
          <div className="relative bg-white rounded-[10px] shadow-[0_4px_18px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="inline-flex items-center gap-1 bg-white border border-[#e2e8f0] rounded-[20px] pl-1 pr-[7px] py-[3px] text-[8.5px] font-bold text-[#374151] mx-[9px] mt-[7px]">
              <div className="w-[14px] h-[14px] rounded-full flex items-center justify-center text-[8px] bg-[#25D366]">🟢</div>
              A Meta Service
            </div>
            <div className="bg-[#075E54] px-[9px] py-[7px] flex items-center gap-[6px]">
              <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-[10px]">💬</div>
              <div>
                <div className="text-[9.5px] font-bold text-white">Customer Support</div>
                <div className="text-[7.5px] text-white/70">online</div>
              </div>
            </div>
            <div className="p-[7px] bg-[#e5ddd5]">
              <div className="max-w-[80%] rounded-[7px] px-[6px] py-1 mb-[3px] text-[8.5px] leading-[1.4] bg-white text-[#0f172a] mr-auto rounded-bl-[2px]">
                Hi, I need help with my order
              </div>
              <div className="max-w-[80%] rounded-[7px] px-[6px] py-1 mb-[3px] text-[8.5px] leading-[1.4] bg-[#dcf8c6] text-[#0f172a] ml-auto rounded-br-[2px]">
                Of course! Let me check.
              </div>
            </div>
            <div className="bg-[#f0f0f0] px-[7px] py-1 flex gap-1 items-center">
              <div className="flex-1 bg-white rounded-[20px] h-[18px] text-[8.5px] px-[6px] text-[#94a3b8] flex items-center">Message</div>
              <div className="w-[18px] h-[18px] rounded-full bg-[#075E54] flex items-center justify-center text-[8px] text-white">➤</div>
            </div>
            <div className="px-[9px] pt-[6px] pb-[9px]">
              <div className="text-[9.5px] font-extrabold text-[#0f172a]">Connected WhatsApp</div>
              <div className="text-[8px] text-[#64748b] mt-0.5">Instant connection, but still disjointed data.</div>
            </div>
          </div>
        </div>

        {/* X post card */}
        <div className={FLOATS[3].anim}>
          <div className="relative bg-white rounded-[10px] shadow-[0_4px_18px_rgba(0,0,0,0.1)] overflow-hidden max-h-[148px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-11 after:bg-gradient-to-b after:from-transparent after:to-white/96 after:pointer-events-none">
            <div className="px-[11px] pt-[9px] pb-[11px]">
              <div className="flex gap-[6px] mb-[7px]">
                <div className="w-6 h-6 rounded-full bg-black shrink-0 flex items-center justify-center text-white text-[10px] font-extrabold">R</div>
                <div>
                  <div className="text-[9px] font-extrabold text-[#0f172a]">Reku</div>
                  <div className="text-[8.5px] text-[#0f172a] leading-[1.5] mt-0.5">Flash sale ends tonight ⚡ Don&apos;t miss out!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
