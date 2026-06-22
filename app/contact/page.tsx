import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact – KronGage',
  description: 'KronGage – Unified Customer Engagement Platform',
};

export default function Page() {
  return (
    <>
      <style>{`

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Manrope', sans-serif; color: #1e293b; background: #e8f4f8; min-height: 100vh; display: flex; flex-direction: column; }
    a { text-decoration: none; color: inherit; }

    /* NAV */
    nav { display: flex; align-items: center; justify-content: space-between; padding: 0 60px; height: 68px; background: #fff; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; z-index: 100; }
    .nav-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; color: #1e293b; }
    .nav-logo svg { width: 28px; height: 28px; }
    .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; font-size: 14px; font-weight: 600; }
    .nav-links li a { color: #475569; transition: color .2s; }
    .nav-links li a:hover { color: #0D47A1; }
    .nav-links .active a { color: #0D47A1; }
    .btn-nav { background: #0D47A1; color: #fff; padding: 10px 22px; border-radius: 50px; font-size: 14px; font-weight: 700; }
    .nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-toggle span { display: block; width: 22px; height: 2px; background: #0f172a; border-radius: 2px; }
    .mobile-menu { display: none; flex-direction: column; background: #fff; border-top: 1px solid #f1f5f9; padding: 16px 24px 24px; gap: 4px; }
    .mobile-menu.open { display: flex; }
    .mobile-menu a { padding: 11px 0; font-size: 16px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; }
    .mobile-menu a:last-child { border-bottom: none; }
    .mobile-menu .btn-nav-mobile { margin-top: 12px; background: #0D47A1; color: #fff; padding: 13px 20px; border-radius: 50px; font-weight: 700; text-align: center; border-bottom: none; }

    /* Mega menu */
    .nav-links li { position: relative; }
    .nav-links li > a { display: flex; align-items: center; gap: 4px; padding: 8px 0; }
    .nav-links li.has-mega > a::after {
      content: ''; display: inline-block; width: 0; height: 0;
      border-left: 4px solid transparent; border-right: 4px solid transparent;
      border-top: 5px solid currentColor; margin-left: 2px; transition: transform .2s;
    }
    .nav-links li.has-mega.is-open > a::after { transform: rotate(180deg); }
    .mega-menu {
      display: none; position: fixed; top: 68px; left: 0; width: 100vw;
      background: #fff; border-top: 2px solid #0D47A1;
      box-shadow: 0 20px 60px rgba(0,0,0,.12); z-index: 199; padding: 36px 60px 40px;
    }
    .nav-links li.has-mega.is-open .mega-menu { display: block; }
    .mega-inner { display: grid; max-width: 1100px; margin: 0 auto; gap: 48px; }
    .mega-inner.cols-3 { grid-template-columns: 1.6fr 1fr 1fr; }
    .mega-inner.cols-2b { grid-template-columns: 1fr 1.4fr; }
    .mega-col-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #94a3b8; margin-bottom: 18px; }
    .mega-brand-head { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
    .mega-brand-sub { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 14px; }
    .mega-brand-link { font-size: 13px; font-weight: 700; color: #0D47A1; }
    .mega-feature-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .mega-feature-row:last-child { border-bottom: none; }
    .mega-feat-icon { width: 34px; height: 34px; background: #EEF5FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }
    .mega-feat-text strong { display: block; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
    .mega-feat-text span { font-size: 12px; color: #64748b; }
    .mega-channel-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-channel-row:last-child { border-bottom: none; }
    .mega-channel-icon { width: 28px; height: 28px; background: #EEF5FD; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #0D47A1; }
    .mega-view-all { font-size: 13px; font-weight: 700; color: #0D47A1; margin-top: 4px; display: inline-block; }
    .mega-how-card { background: #EEF5FD; border-radius: 10px; padding: 14px; margin-top: 16px; display: flex; gap: 12px; align-items: flex-start; }
    .mega-how-icon { width: 38px; height: 38px; background: #0D47A1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .mega-how-text strong { font-size: 13px; font-weight: 800; color: #0f172a; display: block; margin-bottom: 4px; }
    .mega-how-text span { font-size: 12px; color: #64748b; line-height: 1.5; }
    .mega-industry-list { list-style: none; }
    .mega-industry-list li { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-industry-list li:last-child { border-bottom: none; }
    .mega-ind-icon { width: 28px; height: 28px; background: #EEF5FD; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #0D47A1; }
    .mega-use-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #f8fafc; }
    .mega-use-row:last-child { border-bottom: none; }
    .mega-article-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1.4; }
    .mega-article-sub { font-size: 12px; color: #64748b; line-height: 1.6; }

    /* HERO SPLIT */
    main { flex: 1; }
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .contact-hero {
      display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #0f172a 0%, #0D47A1 50%, #1565C0 75%, #0a2a6e 100%);
      background-size: 300% 300%;
      animation: gradientShift 8s ease infinite;
    }
    .contact-left {
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 60px; color: #fff;
    }
    .contact-left h1 { font-size: 48px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px; }
    .contact-left p { font-size: 16px; line-height: 1.7; color: rgba(255,255,255,.8); margin-bottom: 36px; max-width: 420px; }
    .btn-general {
      display: inline-block; background: rgba(255,255,255,.15); color: #fff;
      border: 1.5px solid rgba(255,255,255,.35); padding: 14px 28px; border-radius: 50px;
      font-size: 15px; font-weight: 600; transition: background .2s; max-width: fit-content;
    }
    .btn-general:hover { background: rgba(255,255,255,.25); }

    .contact-right {
      display: flex; align-items: center; justify-content: center;
      padding: 60px 60px 60px 40px;
    }
    .form-card {
      background: #fff; border-radius: 20px; box-shadow: 0 24px 80px rgba(0,0,0,.18);
      padding: 40px; width: 100%; max-width: 480px;
    }
    .form-card h2 { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
    .form-progress-wrap { margin-bottom: 6px; }
    .form-progress-track { height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
    .form-progress-fill { height: 100%; background: linear-gradient(90deg, #0D47A1, #3730a3); border-radius: 3px; }
    .form-step-label { font-size: 12px; color: #94a3b8; font-weight: 500; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 5px; }
    .form-group label { font-size: 13px; font-weight: 600; color: #374151; }
    .form-group input {
      padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px;
      font-family: inherit; color: #0f172a; outline: none; transition: border-color .2s; background: #fff;
    }
    .form-group input:focus { border-color: #0D47A1; box-shadow: 0 0 0 3px rgba(13,71,161,.1); }
    .btn-submit {
      width: 100%; background: #3730a3; color: #fff; padding: 14px; border-radius: 10px;
      font-size: 16px; font-weight: 700; border: none; cursor: pointer; margin-top: 8px;
      transition: background .2s;
    }
    .btn-submit:hover { background: #0D47A1; }

    /* FOOTER */
    footer { background: #0f172a; color: #94a3b8; padding: 60px 60px 30px; }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
    .footer-brand .logo { font-size: 22px; font-weight: 800; color: #38bdf8; margin-bottom: 14px; }
    .footer-brand p { font-size: 13px; line-height: 1.7; color: #64748b; margin-bottom: 16px; }
    .footer-brand .dev-credit { font-size: 12px; color: #475569; margin-bottom: 20px; }
    .badge-meta { display: inline-flex; align-items: center; gap: 8px; background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 10px 14px; font-size: 11px; font-weight: 600; color: #94a3b8; }
    .badge-meta .meta-icon { width: 28px; height: 28px; background: #0D47A1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 800; }
    .footer-col h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #e2e8f0; margin-bottom: 18px; }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; font-size: 13px; }
    .footer-col ul li a { color: #64748b; transition: color .2s; }
    .footer-col ul li a:hover { color: #38bdf8; }
    .footer-bottom { border-top: 1px solid #1e293b; padding-top: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .footer-bottom p { font-size: 12px; color: #475569; }
    .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }
    .footer-legal a { font-size: 12px; color: #475569; transition: color .2s; }
    .footer-legal a:hover { color: #38bdf8; }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      nav { padding: 0 32px; }
      footer { padding: 48px 32px 24px; }
      .footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 900px) {
      .contact-hero { grid-template-columns: 1fr; }
      .contact-left { padding: 60px 32px 40px; }
      .contact-left h1 { font-size: 36px; }
      .contact-right { padding: 40px 32px 60px; }
    }
    @media (max-width: 640px) {
      nav { padding: 0 20px; height: 56px; }
      .nav-links, .btn-nav { display: none; }
      .nav-toggle { display: flex; }
      .contact-left { padding: 48px 24px 32px; }
      .contact-left h1 { font-size: 30px; }
      .contact-right { padding: 32px 24px 48px; }
      .form-card { padding: 28px 20px; }
      .form-row { grid-template-columns: 1fr; }
      footer { padding: 40px 20px 20px; }
      .footer-top { grid-template-columns: 1fr; gap: 28px; }
      .footer-brand { grid-column: auto; }
      .footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    }
  
      `}</style>
<main>
  <div className="contact-hero">
    <div className="contact-left">
      <h1>Ready to grow?<br />Talk to our<br />sales team.</h1>
      <p>Join organisations of all sizes taking customer engagement to the next level. See how KronGage can increase lifetime value, simplify your tech stack, and boost brand loyalty.</p>
      <a href="mailto:support@krontiva.africa" className="btn-general">Have a more general question?</a>
    </div>
    <div className="contact-right">
      <ContactForm />
    </div>
  </div>
</main>

{/* FOOTER */}
    </>
  );
}
