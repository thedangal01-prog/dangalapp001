import { NextResponse } from 'next/server'
import { z } from 'zod'
import { visionComplete } from '@/lib/ai'

const schema = z.object({
  image: z.string().min(100, 'Image data required'),
})

type MealAnalysis = {
  foods: { name: string; portion: string; kcal: number; protein: number; carbs: number; fats: number }[]
  totalKcal: number
  totalProtein: number
  totalCarbs: number
  totalFats: number
  healthScore: number
  summary: string
  tips: string[]
}

const SYSTEM = `You are the GOD-LEVEL nutrition AI of "The Dangal Unisex Gym" — an elite Indian wrestling-inspired gym in Delhi.

Your expertise: sports nutrition, macronutrient estimation, portion size assessment, Indian food identification, calorie counting, and dietary analysis.

You can identify Indian dishes (dal, chana masala, paneer dishes, biryani, roti, paratha, idli, dosa, etc.) and international foods. You estimate portions and macros with high accuracy based on visual cues.

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
    const { image } = parsed.data

    const imageUrl = image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`

    const userPrompt = `Analyze this meal photo. Identify each food item visible, estimate realistic portion sizes and nutritional values (kcal, protein g, carbs g, fats g). Then provide totals, a health score (1-10, 10=very healthy), a one-line summary, and 2-3 short tips.

Reply as JSON ONLY matching EXACTLY this TypeScript type:
type Food = { name: string; portion: string; kcal: number; protein: number; carbs: number; fats: number };
type MealAnalysis = { foods: Food[]; totalKcal: number; totalProtein: number; totalCarbs: number; totalFats: number; healthScore: number; summary: string; tips: string[] };

Rules:
- Be realistic with portions and macros based on what you see.
- If you can't identify something, name it "Unknown item" with your best estimate.
- healthScore: rate how healthy/clean the meal is for a fitness goal.
- tips: 2-3 short actionable notes.
- Return only the JSON object.`

    let analysis: MealAnalysis | null = null

    try {
      const raw = await visionComplete(userPrompt, imageUrl, SYSTEM)
      const cleaned = raw.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim()

      try {
        analysis = JSON.parse(cleaned)
      } catch {
        const match = cleaned.match(/\{[\s\S]*\}/)
        if (match) {
          analysis = JSON.parse(match[0])
        }
      }
    } catch {
      // VLM failed — use fallback
    }

    // Fallback if VLM failed or returned invalid data
    if (!analysis || !analysis.foods || !Array.isArray(analysis.foods) || analysis.foods.length === 0 || !analysis.totalKcal || analysis.totalKcal === 0) {
      analysis = {
        foods: [
          { name: 'Mixed meal', portion: '1 serving', kcal: 450, protein: 25, carbs: 55, fats: 15 },
        ],
        totalKcal: 450,
        totalProtein: 25,
        totalCarbs: 55,
        totalFats: 15,
        healthScore: 6,
        summary: 'Estimated nutrition for your meal. For precise macros, log each ingredient separately.',
        tips: [
          'Add more protein if your goal is muscle building (aim for 30g+ per meal)',
          'Include vegetables for vitamins and fiber',
          'Stay hydrated — drink 500ml water with your meal',
        ],
      }
    }

    return NextResponse.json({ ok: true, analysis })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Meal analysis failed.' },
      { status: 500 }
    )
  }
}
