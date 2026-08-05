'use client';
import { useEffect, useRef, useState } from 'react';

const SEGMENTS = {
  all: {
    label: 'All Segments',
    segs: [
      { name: 'Outdoor Enthusiasts', pct: 35, color: '#0D47A1' },
      { name: 'Home & Lifestyle', pct: 28, color: '#1976D2' },
      { name: 'Tech & Gaming', pct: 22, color: '#42a5f5' },
      { name: 'Travel', pct: 15, color: '#90caf9' },
    ],
    trend7: [42, 55, 48, 62, 71, 68, 80],
    trend30: [30, 38, 44, 51, 49, 58, 62, 55, 70, 66, 74, 80, 78, 85, 82, 90, 88, 76, 83, 92, 87, 95, 90, 86, 94, 98, 92, 88, 96, 100],
  },
  outdoor: {
    label: 'Outdoor Enthusiasts',
    segs: [
      { name: 'Hiking', pct: 42, color: '#0D47A1' },
      { name: 'Cycling', pct: 31, color: '#1976D2' },
      { name: 'Camping', pct: 27, color: '#42a5f5' },
    ],
    trend7: [60, 72, 65, 78, 84, 80, 91],
    trend30: [48, 56, 60, 68, 72, 76, 80, 74, 82, 86, 88, 82, 90, 94, 92, 96, 90, 86, 94, 98, 92, 96, 100, 94, 98, 96, 92, 98, 96, 100],
  },
  home: {
    label: 'Home & Lifestyle',
    segs: [
      { name: 'Furniture', pct: 38, color: '#0D47A1' },
      { name: 'Decor', pct: 34, color: '#1976D2' },
      { name: 'Kitchen', pct: 28, color: '#42a5f5' },
    ],
    trend7: [38, 44, 40, 52, 60, 56, 68],
    trend30: [28, 34, 40, 46, 44, 52, 56, 50, 62, 58, 66, 72, 70, 76, 74, 80, 78, 68, 75, 84, 80, 86, 82, 78, 86, 90, 84, 80, 88, 92],
  },
} as const;

type SegKey = keyof typeof SEGMENTS;
type Range = '7d' | '30d' | '90d';

function getTrend(seg: SegKey, range: Range): readonly number[] {
  const d = SEGMENTS[seg];
  return range === '7d' ? d.trend7 : d.trend30;
}

const tabClass = "px-[10px] py-1 rounded-md text-[11px] font-bold border cursor-pointer transition-all";
const tabOn = "bg-[#0D47A1] text-white border-[#0D47A1]";
const tabOff = "bg-white text-[#64748b] border-[#e2e8f0]";
const sselClass = "px-[9px] py-[3px] rounded-[5px] text-[10px] font-bold border cursor-pointer transition-all";

export default function AnalyticsBi({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [range, setRange] = useState<Range>('7d');
  const [seg, setSeg] = useState<SegKey>('all');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function drawChart() {
      const W = canvas!.width, H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);
      const data = getTrend(seg, range);
      const N = data.length;
      const pad = { t: 10, r: 10, b: 24, l: 30 };
      const cW = W - pad.l - pad.r;
      const cH = H - pad.t - pad.b;
      const max = Math.max(...data) * 1.1;

      const px = (i: number) => pad.l + (i / (N - 1)) * cW;
      const py = (v: number) => pad.t + cH - (v / max) * cH;

      ctx!.strokeStyle = '#f1f5f9';
      ctx!.lineWidth = 1;
      [0.25, 0.5, 0.75, 1].forEach(f => {
        const y = pad.t + cH * (1 - f);
        ctx!.beginPath(); ctx!.moveTo(pad.l, y); ctx!.lineTo(W - pad.r, y); ctx!.stroke();
        ctx!.fillStyle = '#94a3b8';
        ctx!.font = '9px Segoe UI';
        ctx!.fillText(String(Math.round(max * f)), 0, y + 3);
      });

      const grad = ctx!.createLinearGradient(0, pad.t, 0, pad.t + cH);
      grad.addColorStop(0, 'rgba(13,71,161,.18)');
      grad.addColorStop(1, 'rgba(13,71,161,0)');
      ctx!.beginPath();
      ctx!.moveTo(px(0), py(data[0]));
      for (let i = 1; i < N; i++) {
        const x0 = px(i - 1), y0 = py(data[i - 1]);
        const x1 = px(i), y1 = py(data[i]);
        const cpx = (x0 + x1) / 2;
        ctx!.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
      ctx!.lineTo(px(N - 1), pad.t + cH);
      ctx!.lineTo(px(0), pad.t + cH);
      ctx!.closePath();
      ctx!.fillStyle = grad;
      ctx!.fill();

      ctx!.beginPath();
      ctx!.moveTo(px(0), py(data[0]));
      for (let i = 1; i < N; i++) {
        const x0 = px(i - 1), y0 = py(data[i - 1]);
        const x1 = px(i), y1 = py(data[i]);
        const cpx = (x0 + x1) / 2;
        ctx!.bezierCurveTo(cpx, y0, cpx, y1, x1, y1);
      }
      ctx!.strokeStyle = '#0D47A1';
      ctx!.lineWidth = 2.5;
      ctx!.lineJoin = 'round';
      ctx!.stroke();

      const labels7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const labels30 = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      const labels = range === '7d' ? labels7 : labels30;
      data.forEach((v, i) => {
        ctx!.beginPath();
        ctx!.arc(px(i), py(v), 3.5, 0, Math.PI * 2);
        ctx!.fillStyle = '#fff'; ctx!.fill();
        ctx!.strokeStyle = '#0D47A1'; ctx!.lineWidth = 2; ctx!.stroke();
        if (range === '7d' || i % 5 === 0) {
          ctx!.fillStyle = '#94a3b8';
          ctx!.font = '9px Segoe UI';
          ctx!.textAlign = 'center';
          ctx!.fillText(labels[i], px(i), pad.t + cH + 14);
        }
      });
    }

    function resizeCanvas() {
      const wrap = canvas!.parentElement;
      if (!wrap) return;
      canvas!.width = wrap.clientWidth;
      canvas!.height = wrap.clientHeight;
      drawChart();
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [range, seg]);

  const segs = SEGMENTS[seg].segs;

  return (
    <div className={`w-full h-full overflow-hidden bg-white ${className ?? ''}`}>
      <div className="flex w-full h-full overflow-hidden bg-white">
        <div className="flex-1 flex flex-col px-[18px] pt-4 pb-3 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-extrabold text-[#0f172a]">Engagement Trend</span>
            <div className="flex gap-1">
              <button className={`${tabClass} ${range === '7d' ? tabOn : tabOff}`} onClick={() => setRange('7d')}>7D</button>
              <button className={`${tabClass} ${range === '30d' ? tabOn : tabOff}`} onClick={() => setRange('30d')}>30D</button>
              <button className={`${tabClass} ${range === '90d' ? tabOn : tabOff}`} onClick={() => setRange('90d')}>90D</button>
            </div>
          </div>
          <div className="flex-1 relative min-h-0">
            <canvas ref={canvasRef} className="block"></canvas>
          </div>
          <div className="flex gap-[6px] mb-[10px] shrink-0 flex-wrap mt-3">
            {(Object.entries(SEGMENTS) as [SegKey, typeof SEGMENTS[SegKey]][]).map(([k, v]) => (
              <div key={k} className={`${sselClass} ${k === seg ? tabOn : tabOff}`} onClick={() => setSeg(k)}>{v.label}</div>
            ))}
          </div>
          <div className="mt-3 shrink-0">
            {segs.map(s => (
              <div key={s.name} className="flex items-center gap-[10px] py-[6px] border-b border-[#f8fafc] last:border-b-0">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }}></div>
                <span className="text-[11px] font-bold text-[#374151] flex-1">{s.name}</span>
                <div className="flex-[2] h-[5px] bg-[#f1f5f9] rounded-[3px] overflow-hidden">
                  <div className="h-full rounded-[3px] transition-[width] duration-1000 ease-in-out" style={{ width: `${s.pct}%`, background: s.color }}></div>
                </div>
                <span className="text-[11px] font-bold text-[#64748b] w-8 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
