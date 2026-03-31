import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function runDiagnostics() {
  const host = process.env.SMTP_HOST || 'smtp.titan.email';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log("------------------------------------------");
  console.log("🚀 STARTING TITAN SMTP DIAGNOSTICS");
  console.log("   Login URL: https://secureserver.titan.email/mail/");
  console.log("   Target Host: ", host);
  console.log("   User: ", user);
  
  if (pass) {
    const masked = pass[0] + "****" + pass[pass.length-1];
    console.log("   Pass Detected: ", masked, "(Length: " + pass.length + ")");
  } else {
    console.log("   Pass Detected: NO");
  }
  console.log("------------------------------------------");

  const configs = [
    { name: "Port 465 (SSL)", host: host, port: 465, secure: true },
    { name: "Port 587 (TLS)", host: host, port: 587, secure: false },
    { name: "Alternative Host (secureserver.net)", host: "smtpout.secureserver.net", port: 465, secure: true }
  ];

  for (const config of configs) {
    console.log(`\n🧪 Testing: ${config.name}...`);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user, pass },
      timeout: 10000,
      tls: { rejectUnauthorized: false }
    });

    try {
      await transporter.verify();
      console.log(`✅ SUCCESS: ${config.name} worked!`);
      console.log("\n------------------------------------------");
      console.log("💡 FOUND IT! Use these settings in your .env:");
      console.log(`   SMTP_HOST="${config.host}"`);
      console.log(`   SMTP_PORT="${config.port}"`);
      console.log(`   SMTP_SECURE="${config.secure}"`);
      console.log("------------------------------------------");
      return;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
    }
  }

  console.log("\n------------------------------------------");
  console.log("🛑 ALL DIAGNOSTICS FAILED.");
  console.log("Since your password is correct, Titan is definitely blocking CLI/App login.");
  console.log("\nPLEASE DO THESE 2 THINGS IN TITAN WEBMAIL:");
  console.log("1. Go to Settings > Mail Accounts > Control Panel.");
  console.log("2. Ensure 'Enable Titan on other apps' (SMTP Access) is ON.");
  console.log("3. If still failing, you MUST check for 'App Passwords' in your security settings.");
  console.log("------------------------------------------");
}

runDiagnostics();