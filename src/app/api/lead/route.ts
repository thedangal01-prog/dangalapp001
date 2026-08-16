import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name is too short').max(80),
  email: z.string().email('Invalid email'),
  goal: z.string().min(2).max(60),
})

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

    // In a real app you would persist this to a database / CRM here.
    // We simulate a small delay so the UI shows its loading state.
    await new Promise((r) => setTimeout(r, 600))

    return NextResponse.json({
      ok: true,
      message: `Welcome aboard, ${parsed.data.name.split(' ')[0]}! A coach will reach out within 24h.`,
    })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
