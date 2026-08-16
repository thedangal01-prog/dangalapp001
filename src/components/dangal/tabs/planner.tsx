'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Loader2,
  Wand2,
  Dumbbell,
  Clock,
  Target,
  Flame,
  Plus,
  RefreshCw,
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
import { useGymStore, todayISO, type WorkoutEntry } from '@/store/gym-store'
import { Reveal } from '../reveal'

type Plan = {
  title: string
  summary: string
  warmup: string[]
  blocks: {
    name: string
    sets: number
    reps: string
    rest: string
    notes?: string
  }[]
  cooldown: string
  estimatedKcal: number
  tips: string[]
}

const goals = [
  'Build muscle',
  'Get stronger',
  'Lose fat',
  'Improve endurance',
  'Wrestling conditioning',
  'General fitness',
]
const focuses = [
  'Full body',
  'Upper body',
  'Lower body',
  'Push',
  'Pull',
  'Legs',
  'Core',
  'Conditioning',
]

export function PlannerTab({ onGoTracker }: { onGoTracker: () => void }) {
  const { toast } = useToast()
  const addMany = useGymStore((s) => s.addMany)

  const [goal, setGoal] = useState('Build muscle')
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(
    'Intermediate'
  )
  const [duration, setDuration] = useState(45)
  const [focus, setFocus] = useState('Full body')
  const [equipment, setEquipment] = useState<
    'Full gym' | 'Dumbbells only' | 'Bodyweight' | 'Kettlebell'
  >('Full gym')

  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<Plan | null>(null)
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
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Generation failed')
      }
      setPlan(data.plan)
      toast({
        title: 'Plan forged 🔥',
        description: data.plan.title,
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Please try again.'
      setError(msg)
      toast({
        title: 'Coach unavailable',
        description: msg,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  function addToTracker() {
    if (!plan) return
    const today = todayISO()
    const entries: Omit<WorkoutEntry, 'id' | 'createdAt'>[] = plan.blocks.map(
      (b) => ({
        date: today,
        exercise: b.name,
        sets: b.sets,
        reps: parseInt(b.reps) || 0,
        weight: undefined,
        durationMin: undefined,
        notes: `${b.reps} reps · rest ${b.rest}${b.notes ? ` · ${b.notes}` : ''}`,
        source: 'ai',
      })
    )
    addMany(entries)
    toast({
      title: 'Added to your tracker ✅',
      description: `${entries.length} exercises logged for today.`,
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" />
          AI Coach
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Today&apos;s <span className="text-gradient-gold">workout planner</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Powered by the Dangal AI coach. Tell it your mission and it forges a
          structured, level-matched plan — warmup, blocks, rest, cooldown and tips.
        </p>
      </Reveal>

      {/* Form */}
      <Reveal delay={0.05}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Primary goal" icon={Target}>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                  {goals.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Experience level" icon={Dumbbell}>
              <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
                <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Focus area" icon={Flame}>
              <Select value={focus} onValueChange={setFocus}>
                <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                  {focuses.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Equipment" icon={Dumbbell}>
              <Select value={equipment} onValueChange={(v) => setEquipment(v as typeof equipment)}>
                <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                  <SelectItem value="Full gym">Full gym</SelectItem>
                  <SelectItem value="Dumbbells only">Dumbbells only</SelectItem>
                  <SelectItem value="Bodyweight">Bodyweight</SelectItem>
                  <SelectItem value="Kettlebell">Kettlebell</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label={`Duration: ${duration} min`} icon={Clock} full>
              <input
                type="range"
                min={15}
                max={90}
                step={5}
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>15</span><span>30</span><span>45</span><span>60</span><span>75</span><span>90</span>
              </div>
            </Field>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={generate}
              disabled={loading}
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 text-base font-600 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Forging your plan…
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {plan ? 'Regenerate plan' : 'Generate workout'}
                </>
              )}
            </Button>
            {plan && (
              <Button
                onClick={addToTracker}
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add to tracker
              </Button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex items-center gap-3 rounded-xl border border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/10 p-4 text-sm text-[oklch(0.8_0.18_25)]"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeleton */}
      <AnimatePresence>
        {loading && !plan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="h-7 w-2/3 animate-pulse rounded-lg bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/5" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            {/* Header */}
            <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card/60 p-7 backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-[0.2em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Generated · {level} · {duration} min
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-700 uppercase tracking-tight text-foreground sm:text-4xl">
                    {plan.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    {plan.summary}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Est. burn
                  </div>
                  <div className="font-display text-3xl font-700 text-gradient-danger">
                    {plan.estimatedKcal}
                  </div>
                  <div className="text-xs text-muted-foreground">kcal</div>
                </div>
              </div>
            </div>

            {/* Warmup */}
            {plan.warmup?.length > 0 && (
              <Section title="Warm-up" accent="#e0c14a">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {plan.warmup.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-foreground/85"
                    >
                      <span className="font-600 text-primary">{i + 1}.</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Blocks */}
            <Section title="Working sets" accent="#e0a93a">
              <div className="grid gap-3">
                {plan.blocks.map((b, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl border border-white/8 bg-card/50 p-5 transition-colors hover:border-primary/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-primary/10 font-display text-sm font-700 text-primary">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-600 uppercase tracking-tight text-foreground">
                            {b.name}
                          </h3>
                          {b.notes && (
                            <p className="text-xs text-muted-foreground">{b.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Stat label="Sets" value={b.sets} />
                        <Stat label="Reps" value={b.reps} />
                        <Stat label="Rest" value={b.rest} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Cooldown */}
            {plan.cooldown && (
              <Section title="Cool-down" accent="#8a8fd6">
                <p className="rounded-xl border border-white/8 bg-white/5 px-4 py-4 text-sm text-foreground/85">
                  {plan.cooldown}
                </p>
              </Section>
            )}

            {/* Tips */}
            {plan.tips?.length > 0 && (
              <Section title="Coach&apos;s tips" accent="#7fb069">
                <ul className="space-y-2">
                  {plan.tips.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-foreground/85"
                    >
                      <span className="mt-0.5 text-primary">✦</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={addToTracker}
                className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add all exercises to today&apos;s tracker
              </Button>
              <Button
                onClick={onGoTracker}
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
              >
                Go to tracker
              </Button>
              <Button
                onClick={generate}
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  label,
  icon: Icon,
  children,
  full,
}: {
  label: string
  icon: typeof Target
  children: React.ReactNode
  full?: boolean
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </Label>
      {children}
    </div>
  )
}

function Section({
  title,
  accent,
  children,
}: {
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-display mb-3 flex items-center gap-2 text-sm font-700 uppercase tracking-[0.2em] text-foreground">
        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
        {title}
      </h3>
      {children}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/5 px-3 py-1.5 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="font-600 text-foreground">{value}</div>
    </div>
  )
}
