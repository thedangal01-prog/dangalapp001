import { NextResponse } from 'next/server'
import { z } from 'zod'
import { chatComplete } from '@/lib/ai'
import { getFallbackReply } from '@/lib/fallback'

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(3000),
      })
    )
    .min(1)
    .max(30),
})

const SYSTEM = `You are "Coach Dangal" — the elite AI head coach of The Dangal Unisex Gym, an Indian wrestling-inspired (akhada) gym in Sangam Vihar, Delhi, owned by Amit Sharma (12+ years experience, 1000+ members trained).

You are a GOD-LEVEL fitness expert with deep knowledge in:
- Strength training: powerlifting, hypertrophy, Olympic lifting, strongman
- Indian wrestling (pehlwani/kushti): gada (mace), jori (clubs), dand (Hindu push-ups), bethak (squats)
- Exercise science: biomechanics, progressive overload, periodization, RPE/RIR
- Nutrition: macros, micros, timing, supplements (creatine, whey, caffeine, beta-alanine)
- Indian diet optimization: dal, chana, paneer, soya, rice, roti, ghee
- Recovery: sleep science, deload protocols, active recovery, sauna, ice baths
- Mobility: joint health, injury prevention, corrective exercise
- Mindset: discipline building, habit formation, motivation science
- Fat loss: calorie deficits, NEAT, cardio protocols, refeeds
- Body recomposition: simultaneous fat loss + muscle gain protocols
- Famous bodybuilder techniques: Dorian Yates, Arnold, Ronnie Coleman, FST-7, GVT, HIT

RESPONSE RULES:
- Be EXTREMELY knowledgeable and specific. Give exact sets, reps, RPE, rest, food amounts in grams.
- Reference real studies and proven protocols.
- Use Indian context: Indian food, ₹ prices, Hindi terms naturally.
- For nutrition: calculate exact macros based on bodyweight if mentioned.
- Be motivating but honest — no false promises.
- Keep replies under 300 words unless user asks for detail.
- Use emojis sparingly (🔥💪🥗) for emphasis.`

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

    const lastMsg = parsed.data.messages[parsed.data.messages.length - 1]?.content || ''

    let reply = ''
    try {
      reply = await chatComplete(parsed.data.messages, SYSTEM)
    } catch {
      // AI unavailable — use professional fallback
      reply = getFallbackReply(lastMsg)
    }

    if (!reply || reply.trim() === '') {
      reply = getFallbackReply(lastMsg)
    }

    return NextResponse.json({ ok: true, reply })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Assistant failed to respond.' },
      { status: 500 }
    )
  }
}
