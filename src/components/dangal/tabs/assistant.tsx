'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dumbbell,
  Apple,
  MessageCircle,
  Loader2,
  Send,
  Sparkles,
  User,
  Flame,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Reveal } from '../reveal'
import { cn } from '@/lib/utils'

type Mode = 'workout' | 'diet' | 'chat'

type ChatMsg = { role: 'user' | 'assistant'; content: string }

export function AssistantTab() {
  const [mode, setMode] = useState<Mode>('workout')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" />
          Coach Dangal AI
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Your AI <span className="text-gradient-gold">assistant</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Workout plans, diet plans, and answers to any fitness question —
          powered by your personal AI coach.
        </p>
      </Reveal>

      {/* Mode selector */}
      <Reveal delay={0.05}>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <ModeCard
            active={mode === 'workout'}
            onClick={() => setMode('workout')}
            icon={Dumbbell}
            title="Workout Plan"
            text="Get a structured training session"
            accent="#e0a93a"
          />
          <ModeCard
            active={mode === 'diet'}
            onClick={() => setMode('diet')}
            icon={Apple}
            title="Diet Plan"
            text="Get a personalised meal plan"
            accent="#7fb069"
          />
          <ModeCard
            active={mode === 'chat'}
            onClick={() => setMode('chat')}
            icon={MessageCircle}
            title="Ask Coach"
            text="Ask anything — form, nutrition, recovery"
            accent="#d6452a"
          />
        </div>
      </Reveal>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {mode === 'workout' && <WorkoutPlanner />}
            {mode === 'diet' && <DietPlanner />}
            {mode === 'chat' && <ChatCoach />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ============ MODE CARD ============ */
function ModeCard({
  active,
  onClick,
  icon: Icon,
  title,
  text,
  accent,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Dumbbell
  title: string
  text: string
  accent: string
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      className={cn(
        'relative flex items-center gap-3 overflow-hidden rounded-2xl border p-5 text-left backdrop-blur transition-colors',
        active
          ? 'border-primary/50 bg-gradient-to-br from-primary/15 to-card/60 glow-gold-sm'
          : 'border-white/8 bg-card/50 hover:border-white/20'
      )}
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
        style={{ background: `${accent}22`, borderColor: `${accent}55` }}
      >
        <Icon className="h-5 w-5" style={{ color: accent }} />
      </span>
      <div className="min-w-0">
        <div className="font-display text-base font-700 uppercase tracking-tight text-foreground">
          {title}
        </div>
        <div className="text-xs text-muted-foreground">{text}</div>
      </div>
    </motion.button>
  )
}

/* ============ WORKOUT PLANNER ============ */
function WorkoutPlanner() {
  const { toast } = useToast()
  const [goal, setGoal] = useState('Build muscle')
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate')
  const [duration, setDuration] = useState(45)
  const [focus, setFocus] = useState('Full body')
  const [equipment, setEquipment] = useState<'Full gym' | 'Dumbbells only' | 'Bodyweight' | 'Kettlebell'>('Full gym')
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    if (loading) return
    setLoading(true)
    setError(null)
    setPlan(null)
    try {
      const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, level, duration, focus, equipment }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Generation failed')
      setPlan(data.plan)
      toast({ title: 'Workout plan forged 🔥', description: data.plan.title })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Please try again.'
      setError(msg)
      toast({ title: 'Coach unavailable', description: msg, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Primary goal">
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Build muscle', 'Get stronger', 'Lose fat', 'Improve endurance', 'Wrestling conditioning', 'General fitness'].map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Level">
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Focus">
          <Select value={focus} onValueChange={setFocus}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Full body', 'Upper body', 'Lower body', 'Push', 'Pull', 'Legs', 'Core', 'Conditioning'].map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Equipment">
          <Select value={equipment} onValueChange={(v) => setEquipment(v as typeof equipment)}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Full gym', 'Dumbbells only', 'Bodyweight', 'Kettlebell'].map((e) => (
                <SelectItem key={e} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label={`Duration: ${duration} min`} full>
          <input
            type="range" min={15} max={90} step={5} value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={generate} disabled={loading} className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 text-base font-600 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Forging plan…</> : <><Sparkles className="mr-2 h-4 w-4" />{plan ? 'Regenerate' : 'Generate workout'}</>}
        </Button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/10 p-4 text-sm text-[oklch(0.8_0.18_25)]">
            <AlertTriangle className="h-4 w-4 shrink-0" />{error}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && !plan && <Skeleton />}

      <AnimatePresence>
        {plan && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card/60 p-6">
              <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-[0.2em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />AI Generated · {level} · {duration} min
              </div>
              <h3 className="mt-2 font-display text-2xl font-700 uppercase tracking-tight text-foreground sm:text-3xl">{plan.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.summary}</p>
              <div className="mt-3 text-sm text-muted-foreground">Est. burn <span className="font-700 text-[oklch(0.8_0.18_25)]">{plan.estimatedKcal} kcal</span></div>
            </div>
            {plan.warmup?.length > 0 && (
              <Section title="Warm-up">{plan.warmup.map((w: string, i: number) => (
                <li key={i} className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-sm">{i + 1}. {w}</li>
              ))}</Section>
            )}
            <Section title="Working sets">
              {plan.blocks.map((b: any, i: number) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-card/50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-primary/10 font-display text-sm font-700 text-primary">{i + 1}</span>
                      <div>
                        <div className="font-600 text-foreground">{b.name}</div>
                        {b.notes && <div className="text-xs text-muted-foreground">{b.notes}</div>}
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <Chip label="Sets" value={b.sets} />
                      <Chip label="Reps" value={b.reps} />
                      <Chip label="Rest" value={b.rest} />
                    </div>
                  </div>
                </div>
              ))}
            </Section>
            {plan.cooldown && <Section title="Cool-down"><p className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-foreground/85">{plan.cooldown}</p></Section>}
            {plan.tips?.length > 0 && (
              <Section title="Coach's tips">
                {plan.tips.map((t: string, i: number) => (
                  <li key={i} className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-sm">✦ {t}</li>
                ))}
              </Section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============ DIET PLANNER ============ */
function DietPlanner() {
  const { toast } = useToast()
  const [goal, setGoal] = useState<'Lose fat' | 'Build muscle' | 'Maintain' | 'Improve endurance'>('Build muscle')
  const [weightKg, setWeightKg] = useState('70')
  const [heightCm, setHeightCm] = useState('172')
  const [age, setAge] = useState('25')
  const [activity, setActivity] = useState('Moderate (3-5 days/week)')
  const [dietType, setDietType] = useState<'Vegetarian' | 'Non-vegetarian' | 'Eggetarian' | 'Vegan'>('Vegetarian')
  const [mealsPerDay, setMealsPerDay] = useState(4)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function generate() {
    if (loading) return
    setLoading(true)
    setError(null)
    setPlan(null)
    try {
      const res = await fetch('/api/diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal, weightKg: parseFloat(weightKg), heightCm: parseFloat(heightCm),
          age: parseInt(age), activity, dietType, mealsPerDay,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Generation failed')
      setPlan(data.plan)
      toast({ title: 'Diet plan ready 🥗', description: data.plan.title })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Please try again.'
      setError(msg)
      toast({ title: 'Coach unavailable', description: msg, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Goal">
          <Select value={goal} onValueChange={(v) => setGoal(v as typeof goal)}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Lose fat', 'Build muscle', 'Maintain', 'Improve endurance'].map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Diet type">
          <Select value={dietType} onValueChange={(v) => setDietType(v as typeof dietType)}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan'].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Weight (kg)"><Input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="h-12 rounded-xl border-white/10 bg-white/5" /></Field>
        <Field label="Height (cm)"><Input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="h-12 rounded-xl border-white/10 bg-white/5" /></Field>
        <Field label="Age"><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-12 rounded-xl border-white/10 bg-white/5" /></Field>
        <Field label="Activity level">
          <Select value={activity} onValueChange={setActivity}>
            <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
              {['Sedentary (little exercise)', 'Light (1-3 days/week)', 'Moderate (3-5 days/week)', 'Active (6-7 days/week)'].map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label={`Meals per day: ${mealsPerDay}`} full>
          <input type="range" min={3} max={6} step={1} value={mealsPerDay} onChange={(e) => setMealsPerDay(parseInt(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary" />
        </Field>
      </div>

      <div className="mt-6">
        <Button onClick={generate} disabled={loading} className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 text-base font-600 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Building plan…</> : <><Apple className="mr-2 h-4 w-4" />{plan ? 'Regenerate' : 'Generate diet plan'}</>}
        </Button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 flex items-center gap-3 rounded-xl border border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/10 p-4 text-sm text-[oklch(0.8_0.18_25)]">
            <AlertTriangle className="h-4 w-4 shrink-0" />{error}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && !plan && <Skeleton />}

      <AnimatePresence>
        {plan && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card/60 p-6">
              <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-[0.2em] text-primary">
                <Apple className="h-3.5 w-3.5" />AI Generated · {dietType} · {goal}
              </div>
              <h3 className="mt-2 font-display text-2xl font-700 uppercase tracking-tight text-foreground sm:text-3xl">{plan.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.summary}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                <Macro label="Calories" value={`${plan.targetKcal}`} unit="kcal" accent="#e0a93a" />
                <Macro label="Protein" value={`${plan.proteinG}`} unit="g" accent="#d6452a" />
                <Macro label="Carbs" value={`${plan.carbsG}`} unit="g" accent="#7fb069" />
                <Macro label="Fats" value={`${plan.fatsG}`} unit="g" accent="#8a8fd6" />
                <Macro label="Water" value={`${plan.waterLitres}`} unit="L" accent="#6bb6c7" />
              </div>
            </div>

            <Section title="Meals">
              {plan.meals.map((m: any, i: number) => (
                <div key={i} className="rounded-2xl border border-white/8 bg-card/50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="font-600 text-foreground">{m.name} <span className="text-xs text-muted-foreground">· {m.time}</span></div>
                      <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                        {m.items.map((it: string, j: number) => <li key={j}>· {it}</li>)}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Chip label="kcal" value={m.kcal} />
                      <Chip label="P" value={`${m.protein}g`} />
                      <Chip label="C" value={`${m.carbs}g`} />
                      <Chip label="F" value={`${m.fats}g`} />
                    </div>
                  </div>
                </div>
              ))}
            </Section>

            {plan.foods && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="font-display text-sm font-700 uppercase tracking-wider text-emerald-400">✓ Eat</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
                    {plan.foods.eat.map((f: string, i: number) => <li key={i}>· {f}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                  <div className="font-display text-sm font-700 uppercase tracking-wider text-red-400">✕ Avoid</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/85">
                    {plan.foods.avoid.map((f: string, i: number) => <li key={i}>· {f}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {plan.tips?.length > 0 && (
              <Section title="Coach's tips">
                {plan.tips.map((t: string, i: number) => (
                  <li key={i} className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-sm">✦ {t}</li>
                ))}
              </Section>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============ CHAT COACH ============ */
function ChatCoach() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content:
        "Namaste! I'm Coach Dangal, your AI assistant. Ask me anything — workout form, diet, supplements, recovery, motivation. How can I help you train today?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const suggestions = [
    'How do I fix my deadlift form?',
    'Best budget Indian protein sources?',
    'How to lose belly fat fast?',
    'Which supplements actually work?',
    'How much sleep do I need for muscle growth?',
    'Best workout for beginners?',
  ]

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return
    const next: ChatMsg[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Coach is unavailable')
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Please try again.'
      toast({ title: 'Coach unavailable', description: msg, variant: 'destructive' })
      setMessages([...next, { role: 'assistant', content: `Sorry, I couldn't respond right now. ${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setMessages([
      { role: 'assistant', content: "Namaste! I'm Coach Dangal. Ask me anything about training, diet, or recovery." },
    ])
  }

  return (
    <div className="flex h-[600px] flex-col rounded-3xl border border-white/8 bg-card/50 backdrop-blur">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 p-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.66_0.16_55)] glow-gold-sm">
            <Sparkles className="h-4 w-4 text-black" />
          </span>
          <div>
            <div className="font-display text-sm font-700 uppercase tracking-tight text-foreground">Coach Dangal</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
            </div>
          </div>
        </div>
        <button onClick={reset} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-600 text-muted-foreground transition-colors hover:text-foreground">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Messages */}
      <div className="scroll-slim flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex gap-2.5', m.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            {m.role === 'assistant' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.66_0.16_55)]">
                <Sparkles className="h-4 w-4 text-black" />
              </span>
            )}
            <div
              className={cn(
                'max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm',
                m.role === 'user'
                  ? 'rounded-br-sm bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] font-500 text-black'
                  : 'rounded-bl-sm border border-white/8 bg-white/5 text-foreground/90'
              )}
            >
              {m.content}
            </div>
            {m.role === 'user' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <User className="h-4 w-4 text-muted-foreground" />
              </span>
            )}
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.66_0.16_55)]">
              <Sparkles className="h-4 w-4 text-black" />
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/8 bg-white/5 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send() }}
        className="flex gap-2 border-t border-white/8 p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Coach Dangal anything…"
          className="h-11 rounded-full border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
        />
        <Button type="submit" disabled={loading || !input.trim()} className="h-11 shrink-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-4 text-black hover:opacity-90 disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  )
}

/* ============ SHARED ============ */
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 font-display text-sm font-700 uppercase tracking-[0.2em] text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />{title}
      </h4>
      <ul className="grid gap-2">{children}</ul>
    </div>
  )
}

function Chip({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-600 text-foreground">{value}</div>
    </div>
  )
}

function Macro({ label, value, unit, accent }: { label: string; value: string; unit: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-700" style={{ color: accent }}>{value}</div>
      <div className="text-[10px] text-muted-foreground">{unit}</div>
    </div>
  )
}

function Skeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 space-y-4">
      <div className="h-24 w-full animate-pulse rounded-2xl bg-white/5" />
      <div className="grid gap-2 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />)}
      </div>
    </motion.div>
  )
}
