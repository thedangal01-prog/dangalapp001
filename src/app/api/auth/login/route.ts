import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

async function hashPassword(pw: string): Promise<string> {
  const { createHash } = await import('node:crypto')
  return createHash('sha256').update(pw + 'dangal-salt-2026').digest('hex')
}

async function tryDbLogin(email: string, passwordHash: string) {
  try {
    const { db } = await import('@/lib/db')
    if (!db) return { error: 'not_found' }
    const member = await db.member.findUnique({ where: { email: email.toLowerCase() } })
    if (!member) return { error: 'not_found' }
    if (member.passwordHash !== passwordHash) return { error: 'wrong_password' }
    return { member: { id: member.id, name: member.name, email: member.email, phone: member.phone, plan: member.plan } }
  } catch {
    return { error: 'not_found' }
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
    const { email, password } = parsed.data
    const passwordHash = await hashPassword(password)

    const dbResult = await tryDbLogin(email, passwordHash)
    if (dbResult.error === 'not_found') {
      return NextResponse.json(
        { ok: false, error: 'No account found with this email. Please sign up first.' },
        { status: 404 }
      )
    }
    if (dbResult.error === 'wrong_password') {
      return NextResponse.json(
        { ok: false, error: 'Incorrect password. Please try again.' },
        { status: 401 }
      )
    }

    if (dbResult.member) {
      return NextResponse.json({ ok: true, member: dbResult.member })
    }

    return NextResponse.json(
      { ok: false, error: 'Please sign up first to create your account.' },
      { status: 404 }
    )
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Login failed' },
      { status: 500 }
    )
  }
}
