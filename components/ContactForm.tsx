'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="form-card">
      <div className="form-progress-wrap">
        <div className="form-progress-track">
          <div className="form-progress-fill" style={{ width: step === 1 ? '50%' : '100%', transition: 'width 0.3s' }} />
        </div>
        <span className="form-step-label">Fill out form: Step {step} of 2</span>
      </div>
      <h2>Connect with sales</h2>
      <form onSubmit={e => e.preventDefault()}>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="form-row">
              <div className="form-group"><label>First Name:</label><input type="text" placeholder="e.g. Anderson" /></div>
              <div className="form-group"><label>Last Name:</label><input type="text" placeholder="e.g. Mensah" /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Email Address:</label><input type="email" placeholder="you@company.com" /></div>
              <div className="form-group"><label>Company:</label><input type="text" placeholder="Your organisation" /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone Number:</label><input type="tel" placeholder="+233 20 000 0000" /></div>
              <div className="form-group"><label>Job Title:</label><input type="text" placeholder="e.g. Head of CX" /></div>
            </div>
            <button type="button" className="btn-submit" onClick={() => setStep(2)}>Next</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>How can we help?</label>
              <select style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', background: '#fff' }}>
                <option value="">Select a topic…</option>
                <option>Request a Demo</option>
                <option>Pricing &amp; Plans</option>
                <option>Technical Question</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Message:</label>
              <textarea
                placeholder="Tell us about your goals or questions…"
                style={{ padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', minHeight: '120px', width: '100%', background: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn-submit"
                style={{ background: '#e2e8f0', color: '#0f172a', flex: '0 0 auto', width: 'auto', padding: '14px 24px' }}
                onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="submit" className="btn-submit" style={{ flex: '1' }}>Submit</button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
