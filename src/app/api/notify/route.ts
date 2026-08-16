import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  type: z.enum(['signup', 'login']),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  plan: z.string().optional(),
})

const OWNER_EMAIL = 'thedangal01@gmail.com'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
    }
    const { type, name, email, phone, plan } = parsed.data

    // Try SMTP
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        })

        if (type === 'signup') {
          // 1. Welcome email to client
          await transporter.sendMail({
            from: `"The Dangal Unisex Gym" <${smtpUser}>`,
            to: email,
            subject: `🎉 Welcome to The Dangal Unisex Gym, ${name}!`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0b;color:#fff;padding:40px;">
                <div style="text-align:center;margin-bottom:30px;">
                  <h1 style="color:#e0a93a;font-size:28px;margin:0;">THE DANGAL UNISEX GYM</h1>
                  <p style="color:#888;font-size:12px;letter-spacing:3px;">Train · Fight · Rise</p>
                </div>
                <h2 style="color:#fff;">Namaste ${name}! 🙏</h2>
                <p style="color:#ccc;line-height:1.6;">Welcome to the Dangal family! Your account has been created successfully.</p>
                <div style="background:#1a1a1e;border:1px solid #e0a93a33;border-radius:12px;padding:20px;margin:20px 0;">
                  <p style="color:#e0a93a;font-weight:bold;margin:0 0 10px;">🎁 Your 1-Day Free Trial is Active!</p>
                  <p style="color:#ccc;margin:0;">Visit our gym at Sangam Vihar, Delhi to claim your free trial. No card needed.</p>
                </div>
                <div style="margin:20px 0;">
                  <p style="color:#888;font-size:14px;">Your account:</p>
                  <p style="color:#ccc;">Name: ${name}<br>Email: ${email}<br>Phone: ${phone || 'N/A'}<br>Plan: ${plan || 'Monthly'}</p>
                </div>
                <div style="margin:20px 0;">
                  <p style="color:#888;font-size:14px;">📍 Visit us:</p>
                  <p style="color:#ccc;">1-279/12 Sangam Vihar, Shanti Bazar Road (Near Police Chowki) New Delhi - 110052<br>📞 9911552013<br>🕐 Open 6 days a week</p>
                </div>
                <p style="color:#e0a93a;font-style:italic;margin-top:30px;">"ताकत शरीर में नहीं, ज़िद में है।"</p>
                <p style="color:#666;font-size:12px;text-align:center;margin-top:30px;">© 2026 The Dangal Unisex Gym · Forged in the akhada</p>
              </div>
            `,
          }).catch(() => {})

          // 2. Notification to owner
          await transporter.sendMail({
            from: `"Dangal Gym" <${smtpUser}>`,
            to: OWNER_EMAIL,
            subject: `🎯 New Signup: ${name}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#0a0a0b;color:#fff;padding:30px;">
                <h2 style="color:#e0a93a;">New Member Signed Up!</h2>
                <table style="color:#ccc;width:100%;">
                  <tr><td style="padding:5px;color:#888;">Name:</td><td style="padding:5px;">${name}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Email:</td><td style="padding:5px;">${email}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Phone:</td><td style="padding:5px;">${phone || 'N/A'}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Plan:</td><td style="padding:5px;">${plan || 'Monthly'}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Time:</td><td style="padding:5px;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
                </table>
              </div>
            `,
          }).catch(() => {})
        } else {
          // Login notification to owner
          await transporter.sendMail({
            from: `"Dangal Gym" <${smtpUser}>`,
            to: OWNER_EMAIL,
            subject: `🔑 Login: ${name}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;background:#0a0a0b;color:#fff;padding:30px;">
                <h2 style="color:#e0a93a;">Member Logged In</h2>
                <table style="color:#ccc;width:100%;">
                  <tr><td style="padding:5px;color:#888;">Name:</td><td style="padding:5px;">${name}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Email:</td><td style="padding:5px;">${email}</td></tr>
                  <tr><td style="padding:5px;color:#888;">Time:</td><td style="padding:5px;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td></tr>
                </table>
              </div>
            `,
          }).catch(() => {})
        }

        return NextResponse.json({ ok: true, method: 'smtp' })
      } catch {
        // SMTP failed, try Formspree
      }
    }

    // Fallback: Formspree
    const formspree = process.env.FORMSPREE_ENDPOINT
    if (formspree) {
      const subject = type === 'signup' ? `🎯 New Signup: ${name}` : `🔑 Login: ${name}`
      const message = type === 'signup'
        ? `NEW MEMBER SIGNUP\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPlan: ${plan || 'Monthly'}\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\nA welcome email should be sent to ${email}.`
        : `MEMBER LOGIN\n\nName: ${name}\nEmail: ${email}\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`

      await fetch(formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, message, name, email, _replyto: email }),
      }).catch(() => {})

      return NextResponse.json({ ok: true, method: 'formspree' })
    }

    // No email service configured — return ok anyway (don't block signup)
    return NextResponse.json({ ok: true, method: 'none', note: 'Email not configured' })
  } catch {
    return NextResponse.json({ ok: true, method: 'none' })
  }
}
