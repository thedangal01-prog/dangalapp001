'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import {
  Scale,
  Activity,
  TrendingDown,
  TrendingUp,
  Plus,
  Trash2,
  Ruler,
  Camera,
  Utensils,
  Loader2,
  Check,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  useGymStore,
  todayISO,
  parseISO,
  sortedMetrics,
  latestMetric,
  firstMetric,
  metricDelta,
  bmi,
} from '@/store/gym-store'
import { Reveal } from '../reveal'
import { CameraCapture } from '../camera-capture'

const NUM_FIELDS = [
  { key: 'weightKg', label: 'Weight', unit: 'kg', icon: Scale, color: '#e0a93a' },
  { key: 'bodyFatPct', label: 'Body fat', unit: '%', icon: Activity, color: '#d6452a' },
  { key: 'muscleMassKg', label: 'Muscle', unit: 'kg', icon: TrendingUp, color: '#7fb069' },
] as const

const MEASURE_FIELDS = [
  { key: 'chestCm', label: 'Chest' },
  { key: 'waistCm', label: 'Waist' },
  { key: 'armCm', label: 'Arm' },
  { key: 'thighCm', label: 'Thigh' },
] as const

export function MetricsTab() {
  const metrics = useGymStore((s) => s.metrics)
  const addMetric = useGymStore((s) => s.addMetric)
  const removeMetric = useGymStore((s) => s.removeMetric)
  const { toast } = useToast()

  const [date, setDate] = useState(todayISO())
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [muscle, setMuscle] = useState('')
  const [chest, setChest] = useState('')
  const [waist, setWaist] = useState('')
  const [arm, setArm] = useState('')
  const [thigh, setThigh] = useState('')
  const [height, setHeight] = useState('')
  const [mealCamOpen, setMealCamOpen] = useState(false)
  const [mealLoading, setMealLoading] = useState(false)
  const [mealResult, setMealResult] = useState<any>(null)

  const sorted = useMemo(() => sortedMetrics(metrics), [metrics])
  const latest = latestMetric(metrics)
  const first = firstMetric(metrics)

  const chartData = useMemo(
    () =>
      sorted.map((m) => ({
        date: m.date.slice(5),
        weight: m.weightKg ?? null,
        bodyFat: m.bodyFatPct ?? null,
        muscle: m.muscleMassKg ?? null,
      })),
    [sorted]
  )

  const currentBmi = bmi(latest?.weightKg, height ? parseFloat(height) : undefined)

  function log() {
    const hasVal = [weight, bodyFat, muscle, chest, waist, arm, thigh].some(
      (v) => v.trim() !== ''
    )
    if (!hasVal) {
      toast({
        title: 'Add a measurement',
        description: 'Enter at least one value to log.',
        variant: 'destructive',
      })
      return
    }
    addMetric({
      date,
      weightKg: weight ? parseFloat(weight) : undefined,
      bodyFatPct: bodyFat ? parseFloat(bodyFat) : undefined,
      muscleMassKg: muscle ? parseFloat(muscle) : undefined,
      chestCm: chest ? parseFloat(chest) : undefined,
      waistCm: waist ? parseFloat(waist) : undefined,
      armCm: arm ? parseFloat(arm) : undefined,
      thighCm: thigh ? parseFloat(thigh) : undefined,
    })
    toast({ title: 'Metrics logged 📊', description: `Entry for ${date} saved.` })
    setWeight('')
    setBodyFat('')
    setMuscle('')
    setChest('')
    setWaist('')
    setArm('')
    setThigh('')
  }

  async function handleMealSnap(base64: string) {
    setMealCamOpen(false)
    setMealLoading(true)
    setMealResult(null)
    try {
      const res = await fetch('/api/analyze-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Analysis failed')
      setMealResult({ ...data.analysis, snap: base64 })
      toast({
        title: 'Meal analyzed! 🍽️',
        description: `~${data.analysis.totalKcal} kcal · ${data.analysis.totalProtein}g protein`,
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Please try again.'
      toast({ title: 'Analysis failed', description: msg, variant: 'destructive' })
    } finally {
      setMealLoading(false)
    }
  }

  function logMealAsMetric() {
    if (!mealResult) return
    addMetric({
      date: todayISO(),
      weightKg: undefined,
      bodyFatPct: undefined,
      muscleMassKg: undefined,
      note: `🍽️ Meal snap: ${mealResult.totalKcal}kcal · P${mealResult.totalProtein}g C${mealResult.totalCarbs}g F${mealResult.totalFats}g`,
    })
    toast({ title: 'Meal logged to history ✅' })
    setMealResult(null)
  }

  const deltaCards = [
    { ...NUM_FIELDS[0], delta: metricDelta(metrics, 'weightKg') },
    { ...NUM_FIELDS[1], delta: metricDelta(metrics, 'bodyFatPct') },
    { ...NUM_FIELDS[2], delta: metricDelta(metrics, 'muscleMassKg') },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Scale className="h-3 w-3" />
          Body Metrics
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Track your <span className="text-gradient-gold">transformation</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Log weight, body-fat, muscle and measurements. Watch the curves bend
          in your favour over time.
        </p>
      </Reveal>

      {/* AI Meal Snap — take a photo, AI counts your macros */}
      <Reveal delay={0.05}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/60 to-background p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/15">
                <Utensils className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h2 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                  AI Meal Snap
                </h2>
                <p className="text-sm text-muted-foreground">
                  Snap a photo of your meal — AI counts calories, protein, carbs & fats instantly.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setMealCamOpen(true)}
              disabled={mealLoading}
              className="shrink-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-5 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60"
            >
              <Camera className="mr-1.5 h-4 w-4" />
              Snap meal
            </Button>
          </div>

          {/* Loading state */}
          <AnimatePresence>
            {mealLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-5"
              >
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Analyzing your meal with AI vision…</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {mealResult && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 space-y-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={mealResult.snap}
                    alt="Your meal"
                    className="h-32 w-32 shrink-0 rounded-2xl object-cover ring-1 ring-primary/40"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs font-600 uppercase tracking-[0.2em] text-primary">
                      <Sparkles className="h-3.5 w-3.5" />AI Analysis
                    </div>
                    <p className="mt-1 text-sm text-foreground/90">{mealResult.summary}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Health score:</span>
                      <span className="font-700 text-primary">{mealResult.healthScore}/10</span>
                    </div>
                  </div>
                </div>

                {/* Macro totals */}
                <div className="grid grid-cols-4 gap-2">
                  <MacroMini label="Calories" value={`${mealResult.totalKcal}`} unit="kcal" color="#e0a93a" />
                  <MacroMini label="Protein" value={`${mealResult.totalProtein}`} unit="g" color="#d6452a" />
                  <MacroMini label="Carbs" value={`${mealResult.totalCarbs}`} unit="g" color="#7fb069" />
                  <MacroMini label="Fats" value={`${mealResult.totalFats}`} unit="g" color="#8a8fd6" />
                </div>

                {/* Food items */}
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Detected foods</div>
                  <ul className="space-y-1.5">
                    {mealResult.foods.map((f: any, i: number) => (
                      <li key={i} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-sm">
                        <span className="text-foreground/90">{f.name} <span className="text-xs text-muted-foreground">· {f.portion}</span></span>
                        <span className="text-xs text-muted-foreground">{f.kcal} kcal · P{f.protein} C{f.carbs} F{f.fats}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                {mealResult.tips?.length > 0 && (
                  <div>
                    <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Coach tips</div>
                    <ul className="space-y-1">
                      {mealResult.tips.map((t: string, i: number) => (
                        <li key={i} className="text-sm text-foreground/80">✦ {t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={logMealAsMetric} className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90">
                    <Check className="mr-1.5 h-4 w-4" /> Log to history
                  </Button>
                  <Button onClick={() => setMealResult(null)} variant="outline" className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10">
                    Discard
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* Camera overlay */}
      <AnimatePresence>
        {mealCamOpen && (
          <CameraCapture
            onCapture={handleMealSnap}
            onClose={() => setMealCamOpen(false)}
            title="Snap your meal"
            subtitle="AI will count the calories & macros"
            cta="Analyze"
          />
        )}
      </AnimatePresence>

      {/* Delta + latest cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {deltaCards.map((c, i) => {
          const val = latest?.[c.key]
          return (
            <Reveal key={c.key} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/8 bg-card/50 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <c.icon className="h-5 w-5" style={{ color: c.color }} />
                  {c.delta != null && c.delta !== 0 && (
                    <span
                      className={`flex items-center gap-0.5 text-xs font-600 ${
                        // for body fat, down is good; for muscle, up is good; weight neutral
                        c.key === 'bodyFatPct'
                          ? c.delta < 0
                            ? 'text-emerald-400'
                            : 'text-red-400'
                          : c.key === 'muscleMassKg'
                            ? c.delta > 0
                              ? 'text-emerald-400'
                              : 'text-red-400'
                            : 'text-muted-foreground'
                      }`}
                    >
                      {c.delta > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(c.delta).toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="mt-2 font-display text-3xl font-700 text-foreground">
                  {val != null ? val : '—'}
                  {val != null && (
                    <span className="ml-1 text-sm font-400 text-muted-foreground">
                      {c.unit}
                    </span>
                  )}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
              </div>
            </Reveal>
          )
        })}

        {/* BMI card */}
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-white/8 bg-card/50 p-5 backdrop-blur">
            <Activity className="h-5 w-5 text-primary" />
            <div className="mt-2 font-display text-3xl font-700 text-foreground">
              {currentBmi ?? '—'}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              BMI {currentBmi && bmiCategory(currentBmi)}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* LOG FORM */}
        <Reveal>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
            <h2 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              Log measurements
            </h2>
            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <Input
                    type="date"
                    value={date}
                    max={todayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 rounded-xl border-white/10 bg-white/5 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </Field>
                <Field label="Height (cm)">
                  <Input
                    type="number"
                    min={50}
                    max={250}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="for BMI"
                    className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Weight (kg)">
                  <NumInput value={weight} onChange={setWeight} />
                </Field>
                <Field label="Body fat (%)">
                  <NumInput value={bodyFat} onChange={setBodyFat} />
                </Field>
                <Field label="Muscle (kg)">
                  <NumInput value={muscle} onChange={setMuscle} />
                </Field>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                  <Ruler className="h-3.5 w-3.5 text-primary" />
                  Measurements (cm)
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Field label="Chest">
                    <NumInput value={chest} onChange={setChest} />
                  </Field>
                  <Field label="Waist">
                    <NumInput value={waist} onChange={setWaist} />
                  </Field>
                  <Field label="Arm">
                    <NumInput value={arm} onChange={setArm} />
                  </Field>
                  <Field label="Thigh">
                    <NumInput value={thigh} onChange={setThigh} />
                  </Field>
                </div>
              </div>

              <Button
                onClick={log}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-base font-600 text-black hover:opacity-90 glow-gold-sm"
              >
                <Plus className="mr-1 h-4 w-4" />
                Log entry
              </Button>
            </div>
          </div>
        </Reveal>

        {/* CHART + HISTORY */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
            <h2 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              Progress chart
            </h2>
            {chartData.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <Scale className="h-10 w-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No metrics yet. Log your first entry to see your curve.
                </p>
              </div>
            ) : (
              <div className="mt-4 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e0a93a" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#e0a93a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gMuscle" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7fb069" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#7fb069" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.06)" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'oklch(0.68 0.01 264)', fontSize: 11 }}
                      stroke="oklch(1 0 0 / 0.1)"
                    />
                    <YAxis
                      tick={{ fill: 'oklch(0.68 0.01 264)', fontSize: 11 }}
                      stroke="oklch(1 0 0 / 0.1)"
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'oklch(0.16 0.01 264 / 0.95)',
                        border: '1px solid oklch(1 0 0 / 0.1)',
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                      labelStyle={{ color: 'oklch(0.82 0.14 78)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      name="Weight (kg)"
                      stroke="#e0a93a"
                      strokeWidth={2}
                      fill="url(#gWeight)"
                      connectNulls
                      dot={{ r: 3, fill: '#e0a93a' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="muscle"
                      name="Muscle (kg)"
                      stroke="#7fb069"
                      strokeWidth={2}
                      fill="url(#gMuscle)"
                      connectNulls
                      dot={{ r: 3, fill: '#7fb069' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bodyFat"
                      name="Body fat (%)"
                      stroke="#d6452a"
                      strokeWidth={2}
                      connectNulls
                      dot={{ r: 3, fill: '#d6452a' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* History list */}
            {sorted.length > 0 && (
              <div className="scroll-slim mt-5 max-h-56 space-y-2 overflow-y-auto pr-1">
                {[...sorted].reverse().map((m) => (
                  <div
                    key={m.id}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm"
                  >
                    <span className="font-600 text-foreground">
                      {parseISO(m.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span className="flex flex-wrap items-center justify-end gap-2 text-xs text-muted-foreground">
                      {m.weightKg != null && <Tag>W {m.weightKg}kg</Tag>}
                      {m.bodyFatPct != null && <Tag>BF {m.bodyFatPct}%</Tag>}
                      {m.muscleMassKg != null && <Tag>M {m.muscleMassKg}kg</Tag>}
                      {m.chestCm != null && <Tag>C {m.chestCm}</Tag>}
                      {m.waistCm != null && <Tag>Wa {m.waistCm}</Tag>}
                      {m.armCm != null && <Tag>A {m.armCm}</Tag>}
                      {m.thighCm != null && <Tag>T {m.thighCm}</Tag>}
                    </span>
                    <button
                      onClick={() => removeMetric(m.id)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-[oklch(0.6_0.22_25)]/15 hover:text-[oklch(0.8_0.18_25)] group-hover:opacity-100"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

function NumInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Input
      type="number"
      step={0.1}
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="—"
      className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/50 focus-visible:border-primary/60 focus-visible:ring-primary/30"
    />
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-white/8 px-1.5 py-0.5 font-500 text-foreground/80">
      {children}
    </span>
  )
}

function bmiCategory(b: number): string {
  if (b < 18.5) return '· Low'
  if (b < 25) return '· Healthy'
  if (b < 30) return '· Over'
  return '· High'
}

function MacroMini({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-700" style={{ color }}>{value}</div>
      <div className="text-[10px] text-muted-foreground">{unit}</div>
    </div>
  )
}
