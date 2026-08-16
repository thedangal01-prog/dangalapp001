import { NextResponse } from 'next/server'
import { z } from 'zod'
import { chatComplete } from '@/lib/ai'
import { getFallbackDiet } from '@/lib/fallback'

const schema = z.object({
  goal: z.enum(['Lose fat', 'Build muscle', 'Maintain', 'Improve endurance']),
  weightKg: z.number().min(30).max(250),
  heightCm: z.number().min(120).max(230),
  age: z.number().int().min(12).max(90),
  activity: z.enum([
    'Sedentary (little exercise)',
    'Light (1-3 days/week)',
    'Moderate (3-5 days/week)',
    'Active (6-7 days/week)',
  ]),
  dietType: z.enum(['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan']),
  mealsPerDay: z.number().int().min(3).max(6),
})

type DietPlan = {
  title: string
  summary: string
  targetKcal: number
  proteinG: number
  carbsG: number
  fatsG: number
  waterLitres: number
  meals: any[]
  tips: string[]
  foods: { eat: string[]; avoid: string[] }
}

const SYSTEM = `You are the GOD-LEVEL master nutrition coach of "The Dangal Unisex Gym". 

CRITICAL DIET TYPE RULES (NEVER VIOLATE):
- "Vegetarian": NO meat, NO fish, NO eggs. Use ONLY: paneer, dal, chana, soya, whey, milk, curd, nuts.
- "Non-vegetarian": Can include chicken, fish, eggs + all vegetarian options.
- "Eggetarian": Can include eggs but NO meat/fish.
- "Vegan": NO animal products at all.

Always reply with ONE valid JSON object and NOTHING else.`

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
    const { goal, weightKg, heightCm, age, activity, dietType, mealsPerDay } = parsed.data

    const userPrompt = `Design a one-day meal plan as JSON ONLY. Diet type: ${dietType} (STRICTLY follow — ${dietType === 'Vegetarian' ? 'NO chicken/fish/eggs' : dietType === 'Vegan' ? 'NO animal products' : dietType === 'Eggetarian' ? 'NO chicken/fish, eggs OK' : 'all allowed'}). Goal: ${goal}. Body: ${weightKg}kg, ${heightCm}cm, ${age}y. Activity: ${activity}. ${mealsPerDay} meals. Calculate BMR (Mifflin-St Jeor) × activity factor. Protein: 2.0g/kg for muscle/fat loss, 1.6g/kg for maintain. Each meal: 3-6 items with realistic portions. Return JSON: {title, summary, targetKcal, proteinG, carbsG, fatsG, waterLitres, meals[{name,time,items[],kcal,protein,carbs,fats}], tips[], foods{eat[],avoid[]}}. Return only JSON.`

    let raw = ''
    try {
      raw = await chatComplete([{ role: 'user', content: userPrompt }], SYSTEM)
    } catch {
      // AI unavailable — use professional fallback
      return NextResponse.json({
        ok: true,
        plan: getFallbackDiet(goal, weightKg, heightCm, age, activity, dietType, mealsPerDay),
      })
    }

    const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim()

    let plan: DietPlan
    try {
      plan = JSON.parse(cleaned)
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) {
        return NextResponse.json({
          ok: true,
          plan: getFallbackDiet(goal, weightKg, heightCm, age, activity, dietType, mealsPerDay),
        })
      }
      plan = JSON.parse(match[0])
    }

    if (!plan.targetKcal || !Array.isArray(plan.meals) || plan.meals.length === 0) {
      return NextResponse.json({
        ok: true,
        plan: getFallbackDiet(goal, weightKg, heightCm, age, activity, dietType, mealsPerDay),
      })
    }

    return NextResponse.json({ ok: true, plan })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Diet generation failed.' },
      { status: 500 }
    )
  }
}
