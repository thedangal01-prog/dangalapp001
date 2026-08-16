import { NextResponse } from 'next/server'
import { z } from 'zod'
import { chatComplete } from '@/lib/ai'
import { getFallbackWorkout } from '@/lib/fallback'

const schema = z.object({
  goal: z.string().min(2).max(40),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.number().int().min(15).max(120),
  focus: z.string().min(2).max(40),
  equipment: z.enum(['Full gym', 'Dumbbells only', 'Bodyweight', 'Kettlebell']),
})

type Block = { name: string; sets: number; reps: string; rest: string; notes?: string }
type WorkoutPlan = {
  title: string
  summary: string
  warmup: string[]
  blocks: Block[]
  cooldown: string
  estimatedKcal: number
  tips: string[]
}

const SYSTEM = `You are the GOD-LEVEL master strength & hypertrophy coach of "The Dangal Unisex Gym". You design workouts using famous bodybuilder techniques (Dorian Yates, Arnold, FST-7, GVT, HIT, rest-pause, drop sets, tempo prescriptions). Always reply with ONE valid JSON object and NOTHING else.`

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
    const { goal, level, duration, focus, equipment } = parsed.data

    const userPrompt = `Design today's workout as JSON ONLY matching EXACTLY this TypeScript type:
type Block = { name: string; sets: number; reps: string; rest: string; notes?: string };
type WorkoutPlan = { title: string; summary: string; warmup: string[]; blocks: Block[]; cooldown: string; estimatedKcal: number; tips: string[] };

Constraints:
- Goal: ${goal}
- Level: ${level} (${level === 'Advanced' ? 'use advanced bodybuilder techniques: drop sets, rest-pause, FST-7, GVT, tempo' : level === 'Intermediate' ? 'compound movements, supersets occasionally' : 'simple movements, focus on form'})
- Duration: ${duration} minutes
- Focus: ${focus}
- Equipment: ${equipment}
- For Advanced: include at least 2 advanced intensity techniques with technique names in notes
- warmup: 3-5 RAMP protocol movements
- cooldown: 2-3 specific stretches
- tips: 4-6 form cues and progression notes
- Return only the JSON object.`

    let raw = ''
    try {
      raw = await chatComplete([{ role: 'user', content: userPrompt }], SYSTEM)
    } catch {
      // AI unavailable — use professional fallback
      return NextResponse.json({
        ok: true,
        plan: getFallbackWorkout(goal, level, duration, focus, equipment),
      })
    }

    const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim()

    let plan: WorkoutPlan
    try {
      plan = JSON.parse(cleaned)
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) {
        return NextResponse.json({
          ok: true,
          plan: getFallbackWorkout(goal, level, duration, focus, equipment),
        })
      }
      plan = JSON.parse(match[0])
    }

    if (!plan.title || !Array.isArray(plan.blocks) || plan.blocks.length === 0) {
      return NextResponse.json({
        ok: true,
        plan: getFallbackWorkout(goal, level, duration, focus, equipment),
      })
    }

    return NextResponse.json({ ok: true, plan })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Workout generation failed.' },
      { status: 500 }
    )
  }
}
