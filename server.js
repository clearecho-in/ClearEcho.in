import express from 'express';
import nodemailer from 'nodemailer';
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

// ── Nodemailer transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true = 465, false = other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'tanushsharma@clearecho.in';
const FROM_EMAIL   = process.env.SMTP_USER || 'noreply@clearecho.in';

// ── Helper ────────────────────────────────────────────────────────────────────
async function sendMail(subject, html) {
  await transporter.sendMail({
    from: `"ClearEcho" <${FROM_EMAIL}>`,
    to: NOTIFY_EMAIL,
    subject,
    html,
  });
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await sendMail(
      `📬 New Contact Message from ${firstName} ${lastName}`,
      `
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
      `
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
    await sendMail(
      `📅 New Appointment Request from ${name}`,
      `
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
      `
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[/api/appointment] Error sending email:', err.message);
    res.status(500).json({ error: 'Failed to send notification email.' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ ClearEcho API server running on http://localhost:${PORT}`);
});
