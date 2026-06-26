'use client';
import { useState } from 'react';

type Fields = {
  firstName: string; lastName: string; email: string;
  company: string; phone: string; jobTitle: string;
  topic: string; message: string;
};

const EMPTY: Fields = { firstName: '', lastName: '', email: '', company: '', phone: '', jobTitle: '', topic: '', message: '' };

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h2 style={{ marginBottom: '12px' }}>Message sent!</h2>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.7' }}>
          Thanks {fields.firstName} — our team will get back to you at <strong>{fields.email}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="form-progress-wrap">
        <div className="form-progress-track">
          <div className="form-progress-fill" style={{ width: step === 1 ? '50%' : '100%', transition: 'width 0.3s' }} />
        </div>
        <span className="form-step-label">Fill out form: Step {step} of 2</span>
      </div>
      <h2>Connect with sales</h2>
      <form onSubmit={handleSubmit}>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input type="text" placeholder="e.g. Anderson" value={fields.firstName} onChange={set('firstName')} required /></div>
              <div className="form-group"><label>Last Name</label><input type="text" placeholder="e.g. Mensah" value={fields.lastName} onChange={set('lastName')} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Email Address</label><input type="email" placeholder="you@company.com" value={fields.email} onChange={set('email')} required /></div>
              <div className="form-group"><label>Company</label><input type="text" placeholder="Your organisation" value={fields.company} onChange={set('company')} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone Number</label><input type="tel" placeholder="+233 20 000 0000" value={fields.phone} onChange={set('phone')} /></div>
              <div className="form-group"><label>Job Title</label><input type="text" placeholder="e.g. Head of CX" value={fields.jobTitle} onChange={set('jobTitle')} /></div>
            </div>
            <button
              type="button"
              className="btn-submit"
              onClick={() => {
                if (!fields.firstName || !fields.email) return;
                setStep(2);
              }}>
              Next
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>How can we help?</label>
              <select value={fields.topic} onChange={set('topic')} style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', background: '#fff' }}>
                <option value="">Select a topic…</option>
                <option>Request a Demo</option>
                <option>Pricing &amp; Plans</option>
                <option>Technical Question</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Message</label>
              <textarea
                placeholder="Tell us about your goals or questions…"
                value={fields.message}
                onChange={set('message')}
                required
                style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', minHeight: '120px', width: '100%', background: '#fff' }}
              />
            </div>
            {status === 'error' && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                Something went wrong. Please try again or email us directly at support@krontiva.africa
              </p>
            )}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn-submit"
                style={{ background: '#e2e8f0', color: '#0f172a', flex: '0 0 auto', width: 'auto', padding: '14px 24px' }}
                onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="submit" className="btn-submit" style={{ flex: '1' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
