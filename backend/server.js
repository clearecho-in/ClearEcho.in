import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// ── CORS for development ──────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── Resend Configuration ──────────────────────────────────────────────────────
const cleanEnv = (val) => (val || '').replace(/^["']|["']$/g, '').trim();

const resend = new Resend(cleanEnv(process.env.RESEND_API_KEY));

const recips = (cleanEnv(process.env.NOTIFY_EMAIL) || 'tanushsharma@clearecho.in')
  .split(',')
  .map(email => email.trim());

const NOTIFY_EMAIL = cleanEnv(process.env.NOTIFY_EMAIL) || 'tanushsharma@clearecho.in';

// ── Helper ────────────────────────────────────────────────────────────────────
async function sendMail(subject, html, text, customerName = 'System', customerEmail = null) {
  const uniqueId = Math.floor(100000 + Math.random() * 900000);
  const finalSubject = `[#${uniqueId}] ${subject}`;
  
  // Resend requires verified domains, OR 'onboarding@resend.dev' for testing.
  // When using onboarding@resend.dev, the "to" email MUST be the one registered on your Resend account!
  const fromEmail = `ClearEcho <onboarding@resend.dev>`;

  for (const recip of recips) {
    try {
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recip,
        reply_to: customerEmail || NOTIFY_EMAIL,
        subject: finalSubject,
        html: html,
        text: text
      });
      
      if (error) {
        console.error(`❌ [#${uniqueId}] Failed to send email to ${recip}:`, error);
      } else {
        console.log(`✅ [#${uniqueId}] Delivery processing to: ${recip}`);
      }
    } catch (sendErr) {
      console.error(`❌ [#${uniqueId}] Exception sending email to ${recip}:`, sendErr.message);
    }
  }
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const textContent = ` ClearEcho — New Contact Message\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}\n\nReply directly to: ${email}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0a0a0a; padding: 24px 32px;">
          <h2 style="color: #60a5fa; margin: 0; font-size: 20px;">ClearEcho — New Contact Message</h2>
        </div>
        <div style="padding: 32px; background: #fff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;">${firstName} ${lastName}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #111; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; color: #2563eb; font-size: 13px;">
            Reply directly to this email or reach the user at <strong>${email}</strong>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; text-align: center; color: #9ca3af; font-size: 12px;">
          ClearEcho — Community Authority Engine &nbsp;|&nbsp; tanushsharma@clearecho.in
        </div>
      </div>
    `;

    await sendMail(
      `📬 New Contact Message from ${firstName} ${lastName}`,
      htmlContent,
      textContent,
      `${firstName} ${lastName}`,
      email
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[/api/contact] Error sending email:', err.message);
    res.status(500).json({ error: 'Failed to send notification email.' });
  }
});

// ── POST /api/appointment ─────────────────────────────────────────────────────
app.post('/api/appointment', async (req, res) => {
  const { name, email, date } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const formatted = new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  try {
    const textContent = `📅 ClearEcho — New Appointment Request\n\nName: ${name}\nEmail: ${email}\nDate: ${formatted}\n\nConfirm or reschedule by replying to: ${email}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #0a0a0a; padding: 24px 32px;">
          <h2 style="color: #60a5fa; margin: 0; font-size: 20px;">ClearEcho — New Appointment Request</h2>
        </div>
        <div style="padding: 32px; background: #fff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 140px;">Full Name</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Preferred Date</td>
              <td style="padding: 10px 0; color: #111; font-weight: 600;">${formatted}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; color: #15803d; font-size: 13px;">
            ✅ Confirm or reschedule by replying to <strong>${email}</strong>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; text-align: center; color: #9ca3af; font-size: 12px;">
          ClearEcho — Community Authority Engine &nbsp;|&nbsp; tanushsharma@clearecho.in
        </div>
      </div>
    `;

    await sendMail(
      `📅 New Appointment Request from ${name}`,
      htmlContent,
      textContent,
      name,
      email
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[/api/appointment] Error sending email:', err.message);
    res.status(500).json({ error: 'Failed to send notification email.' });
  }
});

// â”€â”€ Start â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ ClearEcho API server running on http://localhost:${PORT}`);
});
