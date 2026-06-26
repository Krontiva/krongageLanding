import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, company, phone, jobTitle, topic, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'KronGage <info@krontiva.com>',
      to: 'support@krontiva.africa',
      replyTo: email,
      subject: `New Contact: ${topic || 'General Inquiry'} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
          <div style="background:#0D47A1;padding:24px 32px;border-radius:8px 8px 0 0">
            <h1 style="margin:0;color:#fff;font-size:20px">New Contact Form Submission</h1>
          </div>
          <div style="background:#f8fafc;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;font-size:13px;color:#64748b;width:140px">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#0D47A1">${email}</a></td></tr>
              ${company ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Company</td><td style="padding:8px 0;font-size:14px">${company}</td></tr>` : ''}
              ${phone ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Phone</td><td style="padding:8px 0;font-size:14px">${phone}</td></tr>` : ''}
              ${jobTitle ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Job Title</td><td style="padding:8px 0;font-size:14px">${jobTitle}</td></tr>` : ''}
              ${topic ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Topic</td><td style="padding:8px 0;font-size:14px">${topic}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0">
              <p style="font-size:13px;color:#64748b;margin:0 0 8px">Message</p>
              <p style="font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
