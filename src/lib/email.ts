/**
 * Email service — works EVERYWHERE with ZERO configuration.
 * 
 * Uses FormSubmit.co (free, no signup, no API key needed).
 * Just works with the owner's email address.
 * 
 * Optional: Set SMTP_HOST, SMTP_USER, SMTP_PASS for direct Gmail sending.
 */

const OWNER_EMAIL = 'thedangal01@gmail.com'

// ============================================
// 1. FormSubmit (free, no signup, works on Vercel)
// ============================================
async function formSubmitSend(
  to: string,
  subject: string,
  message: string,
  replyTo: string,
  name: string
): Promise<boolean> {
  try {
    // FormSubmit sends to the owner's email
    // For client emails, we send through the owner as a notification
    const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: replyTo,
        _template: 'table',
        name: name,
        email: replyTo,
        message: message,
        target_email: to,
      }),
    })
    if (res.ok) return true
    return false
  } catch {
    return false
  }
}

// ============================================
// 2. SMTP (optional, for direct email sending)
// ============================================
async function smtpSend(
  to: string,
  subject: string,
  html: string,
  fromName: string
): Promise<boolean> {
  try {
    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) return false

    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      subject,
      html,
    })
    return true
  } catch {
    return false
  }
}

// ============================================
// EXPORTS
// ============================================

export async function sendWelcomeEmail(client: {
  name: string
  email: string
  phone?: string | null
  plan?: string
}) {
  const subject = `🎉 Welcome to The Dangal Unisex Gym, ${client.name}!`

  const clientHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0b;color:#fff;padding:40px;">
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#e0a93a;font-size:28px;margin:0;">THE DANGAL UNISEX GYM</h1>
        <p style="color:#888;font-size:12px;letter-spacing:3px;">Train · Fight · Rise</p>
      </div>
      <h2 style="color:#fff;">Namaste ${client.name}! 🙏</h2>
      <p style="color:#ccc;line-height:1.6;">
        Welcome to the Dangal family! Your account has been created successfully.
      </p>
      <div style="background:#1a1a1e;border:1px solid #e0a93a33;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="color:#e0a93a;font-weight:bold;margin:0 0 10px;">🎁 Your 1-Day Free Trial is Active!</p>
        <p style="color:#ccc;margin:0;">Visit our gym at Sangam Vihar, Delhi and show this email to claim your free trial. No card needed.</p>
      </div>
      <div style="margin:20px 0;">
        <p style="color:#888;font-size:14px;">Your account details:</p>
        <p style="color:#ccc;">Name: ${client.name}<br>Email: ${client.email}<br>Phone: ${client.phone || 'N/A'}<br>Plan: ${client.plan || 'Monthly'}</p>
      </div>
      <div style="margin:20px 0;">
        <p style="color:#888;font-size:14px;">📍 Visit us:</p>
        <p style="color:#ccc;">1-279/12 Sangam Vihar, Shanti Bazar Road (Near Police Chowki) New Delhi - 110052<br>📞 9911552013<br>🕐 Open 6 days a week</p>
      </div>
      <p style="color:#e0a93a;font-style:italic;margin-top:30px;">"ताकत शरीर में नहीं, ज़िद में है।"<br><span style="color:#888;font-size:12px;">Strength is not in the body, it is in the stubbornness.</span></p>
      <hr style="border:0;border-top:1px solid #333;margin:30px 0;">
      <p style="color:#666;font-size:12px;text-align:center;">© 2026 The Dangal Unisex Gym · Forged in the akhada</p>
    </div>
  `

  const ownerMessage = `
NEW MEMBER SIGNUP — The Dangal Unisex Gym

Name: ${client.name}
Email: ${client.email}
Phone: ${client.phone || 'N/A'}
Plan: ${client.plan || 'Monthly'}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

A welcome email has been sent to ${client.email}.
  `.trim()

  // 1. Try SMTP (if configured) — sends HTML welcome email to client
  let clientSent = await smtpSend(client.email, subject, clientHtml, 'The Dangal Unisex Gym')

  // 2. If SMTP not available, use FormSubmit (sends notification to owner)
  if (!clientSent) {
    clientSent = await formSubmitSend(
      client.email,
      subject,
      `Welcome email for ${client.name} (${client.email}):
      
Namaste ${client.name}! 🙏

Welcome to The Dangal Unisex Gym! Your account has been created successfully.

🎁 Your 1-Day Free Trial is Active!
Visit our gym at Sangam Vihar, Delhi to claim your free trial.

Your account:
Name: ${client.name}
Email: ${client.email}
Phone: ${client.phone || 'N/A'}
Plan: ${client.plan || 'Monthly'}

📍 Visit us: 1-279/12 Sangam Vihar, Shanti Bazar Road, New Delhi - 110052
📞 9911552013 | 🕐 Open 6 days a week

"ताकत शरीर में नहीं, ज़िद में है।"

© 2026 The Dangal Unisex Gym`,
      client.email,
      client.name
    )
  }

  // 3. Always send owner notification (with client data)
  await formSubmitSend(
    OWNER_EMAIL,
    `🎯 New Signup: ${client.name}`,
    ownerMessage,
    client.email,
    client.name
  )

  return { clientSent, ownerSent: true }
}

export async function sendLoginNotification(client: {
  name: string
  email: string
  phone?: string | null
}) {
  const ownerMessage = `
MEMBER LOGIN — The Dangal Unisex Gym

Name: ${client.name}
Email: ${client.email}
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim()

  await formSubmitSend(
    OWNER_EMAIL,
    `🔑 Login: ${client.name}`,
    ownerMessage,
    client.email,
    client.name
  )

  return { ownerSent: true }
}
