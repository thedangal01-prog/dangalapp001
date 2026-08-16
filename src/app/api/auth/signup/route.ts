import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name too short').max(60),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Phone too short').max(20).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100),
  plan: z.string().optional(),
})

async function hashPassword(pw: string): Promise<string> {
  const { createHash } = await import('node:crypto')
  return createHash('sha256').update(pw + 'dangal-salt-2026').digest('hex')
}

async function tryDbSignup(data: { name: string; email: string; phone?: string; passwordHash: string; plan: string }) {
  try {
    const { db } = await import('@/lib/db')
    if (!db) return { skipped: true }
    const existing = await db.member.findUnique({ where: { email: data.email.toLowerCase() } })
    if (existing) return { error: 'exists' }
    const member = await db.member.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        passwordHash: data.passwordHash,
        plan: data.plan || 'Monthly',
      },
      select: { id: true, name: true, email: true, phone: true, plan: true },
    })
    return { member }
  } catch {
    return { skipped: true }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }
    const { name, email, phone, password, plan } = parsed.data
    const passwordHash = await hashPassword(password)

    const dbResult = await tryDbSignup({ name, email, phone, passwordHash, plan: plan || 'Monthly' })
    if (dbResult.error === 'exists') {
      return NextResponse.json(
        { ok: false, error: 'An account with this email already exists. Please log in.' },
        { status: 409 }
      )
    }

    const member = dbResult.member || {
      id: `local-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone: phone || null,
      plan: plan || 'Monthly',
    }

    return NextResponse.json({ ok: true, member })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Signup failed' },
      { status: 500 }
    )
  }
}
