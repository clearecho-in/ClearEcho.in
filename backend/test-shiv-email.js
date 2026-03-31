import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testShivEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const testRecipients = ["tanushsharma@clearecho.in", "shiv@clearecho.in"];
  console.log(`📡 Attempting to send test email to ${testRecipients.join(', ')}...`);

  try {
    console.log("🛠️  Creating transporter...");
    const info = await transporter.sendMail({
      from: `"ClearEcho Test" <${process.env.SMTP_USER}>`,
      to: testRecipients,
      subject: "Test Email for Tanush and Shiv (Array Mode)",
      text: "This is a test email to verify delivery to both recipients.",
      html: "<b>This is a test email to verify delivery to both recipients.</b>",
    });

    console.log("✅ SUCCESS!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (err) {
    console.log("❌ FAILED!");
    console.error("Error:", err.message);
  }
}

testShivEmail();
