'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  Plus,
  Trash2,
  Dumbbell,
  TrendingUp,
  CalendarDays,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  useGymStore,
  todayISO,
  parseISO,
  thisWeekCount,
  totalVolume,
  type WorkoutEntry,
} from '@/store/gym-store'
import { Reveal } from '../reveal'

const QUICK_EXERCISES = [
  'Back Squat',
  'Deadlift',
  'Bench Press',
  'Overhead Press',
  'Pull-up',
  'Barbell Row',
  'Dumbbell Curl',
  'Push-up',
  'Gada Swing',
  'Burpee',
]

export function TrackerTab({ onGoStreak }: { onGoStreak: () => void }) {
  const workouts = useGymStore((s) => s.workouts)
  const addWorkout = useGymStore((s) => s.addWorkout)
  const removeWorkout = useGymStore((s) => s.removeWorkout)
  const { toast } = useToast()

  const [date, setDate] = useState(todayISO())
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(10)
  const [weight, setWeight] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  function log() {
    if (!exercise.trim()) {
      toast({
        title: 'Exercise required',
        description: 'Name the movement you trained.',
        variant: 'destructive',
      })
      return
    }
    addWorkout({
      date,
      exercise: exercise.trim(),
      sets,
      reps,
      weight: weight ? parseFloat(weight) : undefined,
      durationMin: duration ? parseInt(duration) : undefined,
      notes: notes.trim() || undefined,
      source: 'manual',
    })
    toast({
      title: 'Logged 🔥',
      description: `${exercise} · ${sets}×${reps}${weight ? ` @ ${weight}kg` : ''}`,
    })
    setExercise('')
    setWeight('')
    setDuration('')
    setNotes('')
    setReps(10)
    setSets(3)
  }

  // Group by date desc
  const grouped = useMemo(() => {
    const map = new Map<string, WorkoutEntry[]>()
    for (const w of workouts) {
      if (!map.has(w.date)) map.set(w.date, [])
      map.get(w.date)!.push(w)
    }
    return [...map.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [workouts])

  const stats = [
    {
      label: 'Total sessions',
      value: workouts.length,
      icon: Activity,
      accent: '#e0a93a',
    },
    {
      label: 'This week',
      value: thisWeekCount(workouts),
      icon: CalendarDays,
      accent: '#7fb069',
    },
    {
      label: 'Total volume',
      value: `${(totalVolume(workouts) / 1000).toFixed(1)}t`,
      icon: Dumbbell,
      accent: '#e0c14a',
    },
    {
      label: 'Exercises',
      value: new Set(workouts.map((w) => w.exercise.toLowerCase())).size,
      icon: TrendingUp,
      accent: '#d6452a',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Activity className="h-3 w-3" />
          Fitness Tracker
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Log every <span className="text-gradient-gold">rep</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          What gets measured grows. Track sets, reps and weight — your volume
          feeds your streak and your stats.
        </p>
      </Reveal>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="rounded-2xl border border-white/8 bg-card/50 p-5 backdrop-blur">
              <s.icon className="h-5 w-5" style={{ color: s.accent }} />
              <div className="mt-2 font-display text-3xl font-700 text-foreground">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* LOG FORM */}
        <Reveal>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
            <h2 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              Log a workout
            </h2>

            <div className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Date</Label>
                <Input
                  type="date"
                  value={date}
                  max={todayISO()}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11 rounded-xl border-white/10 bg-white/5 text-foreground focus-visible:border-primary/60 focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Exercise</Label>
                <Input
                  list="quick-ex"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  placeholder="e.g. Back Squat"
                  className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                />
                <datalist id="quick-ex">
                  {QUICK_EXERCISES.map((q) => (
                    <option key={q} value={q} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">Sets</Label>
                  <Input
                    type="number"
                    min={1}
                    value={sets}
                    onChange={(e) => setSets(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-11 rounded-xl border-white/10 bg-white/5 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">Reps</Label>
                  <Input
                    type="number"
                    min={1}
                    value={reps}
                    onChange={(e) => setReps(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-11 rounded-xl border-white/10 bg-white/5 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    step={0.5}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="optional"
                    className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">
                    Duration (min)
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="optional"
                    className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did it feel? PR? RPE?"
                  className="min-h-[70px] resize-none rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                />
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

        {/* HISTORY */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                History
              </h2>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                {workouts.length} entries
              </span>
            </div>

            <div className="scroll-slim mt-5 max-h-[560px] space-y-5 overflow-y-auto pr-1">
              {grouped.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Dumbbell className="h-10 w-10 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    No workouts logged yet.
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Log your first set — every champion starts at zero.
                  </p>
                </div>
              )}

              <AnimatePresence>
                {grouped.map(([d, entries]) => {
                  const dt = parseISO(d)
                  const isToday = d === todayISO()
                  return (
                    <motion.div
                      key={d}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-600 uppercase tracking-wider text-muted-foreground">
                          {dt.toLocaleDateString('en-US', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                        {isToday && (
                          <span className="rounded-full bg-[oklch(0.6_0.22_25)]/15 px-2 py-0.5 text-[10px] font-700 uppercase text-[oklch(0.8_0.18_25)]">
                            Today
                          </span>
                        )}
                        <span className="h-px flex-1 bg-white/8" />
                      </div>

                      <div className="mt-2 space-y-2">
                        {entries.map((w) => (
                          <motion.div
                            key={w.id}
                            layout
                            className="group flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate font-600 text-foreground">
                                  {w.exercise}
                                </span>
                                {w.source === 'ai' && (
                                  <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-700 uppercase text-primary">
                                    AI
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {w.sets}×{w.reps}
                                {w.weight ? ` @ ${w.weight}kg` : ''}
                                {w.durationMin ? ` · ${w.durationMin}min` : ''}
                                {w.notes ? ` · ${w.notes}` : ''}
                              </div>
                            </div>
                            <button
                              onClick={() => removeWorkout(w.id)}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-[oklch(0.6_0.22_25)]/15 hover:text-[oklch(0.8_0.18_25)] group-hover:opacity-100"
                              aria-label="Delete entry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {workouts.length > 0 && (
              <Button
                onClick={onGoStreak}
                variant="outline"
                className="mt-5 w-full rounded-xl border-white/15 bg-white/5 text-foreground hover:bg-white/10"
              >
                See how this fuels your streak →
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
