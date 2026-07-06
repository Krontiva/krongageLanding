'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface ReceiptData {
  reference:    string;
  planName:     string;
  planId:       string;
  billing:      string;
  amount:       number;       // in smallest unit (pesewas)
  currency:     string;
  exchangeRate?: number;      // 1 USD = X GHS at time of payment
  usdPrice?:    number;       // original USD price (before conversion)
  issuedAt:     string;
  user: {
    firstName: string;
    lastName:  string;
    email:     string;
    company:   string;
    phone:     string;
  };
}

function formatAmount(amountSmallest: number, currency: string): string {
  const amount = amountSmallest / 100;
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function billingPeriod(iso: string, billing: string): string {
  const start = new Date(iso);
  const end   = new Date(iso);
  if (billing === 'annual') {
    end.setFullYear(end.getFullYear() + 1);
  } else {
    end.setMonth(end.getMonth() + 1);
  }
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

function ReceiptContent() {
  const params  = useSearchParams();
  const ref     = params.get('ref') || '';
  const [data, setData] = useState<ReceiptData | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('kg_receipt');
    if (!raw) { setMissing(true); return; }
    try {
      const parsed: ReceiptData = JSON.parse(raw);
      // Validate the reference matches the URL
      if (ref && parsed.reference !== ref) { setMissing(true); return; }
      setData(parsed);
    } catch { setMissing(true); }
  }, [ref]);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io';

  if (missing) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#f0f7ff' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '48px', maxWidth: '440px', textAlign: 'center', boxShadow: '0 8px 32px rgba(13,71,161,.1)' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Receipt not found</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
            This receipt link has expired or was opened in a different browser tab.
            Your payment was still successful — check your email for confirmation.
          </p>
          <a href={appUrl} style={{ display: 'inline-block', background: '#0D47A1', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none' }}>
            Open KronGage App
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Loading receipt…</p>
      </div>
    );
  }

  const subtotal      = data.amount / 100;
  // --- VAT / Ghana taxes temporarily disabled — will restore later ---
  // const getfund       = +(subtotal * 0.025).toFixed(2);
  // const nhil          = +(subtotal * 0.025).toFixed(2);
  // const vat           = +(subtotal * 0.15).toFixed(2);
  // const total         = +(subtotal + getfund + nhil + vat).toFixed(2);
  const total         = subtotal;   // no taxes for now — total = amount actually charged
  const curr          = data.currency;
  const fmt           = (n: number) => new Intl.NumberFormat('en-GH', { style: 'currency', currency: curr, minimumFractionDigits: 2 }).format(n);

  return (
    <>
      <style>{`
        @media print {
          .rc-no-print { display: none !important; }
          body { background: #fff !important; }
          .rc-page { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div style={{ background: '#f0f7ff', minHeight: '100vh', padding: '40px 24px', fontFamily: 'Manrope, system-ui, sans-serif' }}>

        {/* Action bar */}
        <div className="rc-no-print" style={{ maxWidth: '680px', margin: '0 auto 20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => window.print()}
            style={{ background: '#fff', border: '1.5px solid #e2e8f0', color: '#0f172a', fontWeight: 700, fontSize: '13px', padding: '9px 20px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            🖨 Print / Save PDF
          </button>
          <a
            href={appUrl}
            style={{ background: '#0D47A1', color: '#fff', fontWeight: 700, fontSize: '13px', padding: '9px 20px', borderRadius: '50px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Open KronGage App →
          </a>
        </div>

        {/* Receipt card */}
        <div className="rc-page" style={{ maxWidth: '680px', margin: '0 auto', background: '#fff', borderRadius: '16px', boxShadow: '0 8px 40px rgba(13,71,161,.1)', overflow: 'hidden' }}>

          {/* Header strip */}
          <div style={{ background: '#0D47A1', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.5px' }}>KronGage</div>
              <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '12px', marginTop: '2px' }}>Unified Customer Engagement Platform</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '20px' }}>Receipt</div>
              <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '12px', marginTop: '4px' }}>{data.reference}</div>
            </div>
          </div>

          <div style={{ padding: '32px 40px' }}>

            {/* Meta row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1.5px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '6px' }}>Date of issue</div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>{formatDate(data.issuedAt)}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '6px' }}>Payment reference</div>
                <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: 600, wordBreak: 'break-all' }}>{data.reference}</div>
              </div>
            </div>

            {/* From / Bill to */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1.5px solid #f1f5f9' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '10px' }}>From</div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700, marginBottom: '4px' }}>KronGage</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
                  Unified Customer Engagement Platform<br />
                  Accra, Ghana<br />
                  <a href="mailto:support@krontiva.africa" style={{ color: '#0D47A1' }}>support@krontiva.africa</a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '10px' }}>Bill to</div>
                <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 700, marginBottom: '4px' }}>
                  {data.user.firstName} {data.user.lastName}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
                  {data.user.company}<br />
                  {data.user.email}<br />
                  {data.user.phone && <>{data.user.phone}<br /></>}
                </div>
              </div>
            </div>

            {/* Line items table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', borderRadius: '8px 0 0 8px' }}>Description</th>
                  <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em' }}>Unit price</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', borderRadius: '0 8px 8px 0' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '14px 12px', fontSize: '14px', color: '#0f172a' }}>
                    <div style={{ fontWeight: 600 }}>KronGage {data.planName} — {data.billing === 'annual' ? 'Annual' : 'Monthly'} Plan</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{billingPeriod(data.issuedAt, data.billing)}</div>
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>1</td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: '14px', color: '#475569' }}>{fmt(subtotal)}</td>
                  <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: '14px', color: '#0f172a', fontWeight: 600 }}>{fmt(subtotal)}</td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ maxWidth: '280px', marginLeft: 'auto' }}>
              {[
                ['Subtotal',                           fmt(subtotal)],
                // --- VAT / Ghana taxes temporarily disabled — will restore later ---
                // ['Total excluding tax',                fmt(subtotal)],
                // [`GETFund – Ghana (2.5% on ${fmt(subtotal)})`, fmt(getfund)],
                // [`NHIL – Ghana (2.5% on ${fmt(subtotal)})`,    fmt(nhil)],
                // [`VAT – Ghana (15% on ${fmt(subtotal)})`,       fmt(vat)],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', color: '#475569', borderBottom: '1px solid #f1f5f9' }}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 4px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0 0', fontSize: '15px', fontWeight: 700, color: '#0D47A1' }}>
                <span>Amount paid</span>
                <span>{fmt(total)} {curr}</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1.5px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                <div>Paid via Paystack · {data.reference}</div>
                {data.exchangeRate && data.usdPrice && (
                  <div style={{ marginTop: '4px' }}>
                    ${data.usdPrice.toLocaleString()} USD charged at 1 USD = {data.exchangeRate.toFixed(2)} GHS
                  </div>
                )}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#16a34a', fontWeight: 700, fontSize: '12px', padding: '4px 12px', borderRadius: '50px' }}>
                ✓ Payment confirmed
              </div>
            </div>

          </div>
        </div>

        <div className="rc-no-print" style={{ maxWidth: '680px', margin: '20px auto 0', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          Questions? Email <a href="mailto:support@krontiva.africa" style={{ color: '#0D47A1' }}>support@krontiva.africa</a>
        </div>
      </div>
    </>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense>
      <ReceiptContent />
    </Suspense>
  );
}
