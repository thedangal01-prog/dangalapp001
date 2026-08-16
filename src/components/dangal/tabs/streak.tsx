'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Trophy,
  CalendarDays,
  Zap,
  CheckCircle2,
  Plus,
  Camera,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  useGymStore,
  currentStreak,
  longestStreak,
  activeDays,
  todayISO,
  parseISO,
  heatmapGrid,
  heatColor,
} from '@/store/gym-store'
import { useToast } from '@/hooks/use-toast'
import { Reveal } from '../reveal'
import { CameraCapture } from '../camera-capture'

const WEEKDAYS = ['Mon', 'Wed', 'Fri']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function StreakTab({ onGoTracker }: { onGoTracker: () => void }) {
  const workouts = useGymStore((s) => s.workouts)
  const addWorkout = useGymStore((s) => s.addWorkout)
  const { toast } = useToast()

  const [open, setOpen] = useState(false)
  const [quickName, setQuickName] = useState('Quick session')
  const [cameraOpen, setCameraOpen] = useState(false)
  const [snap, setSnap] = useState<string | null>(null)

  const streak = currentStreak(workouts)
  const best = longestStreak(workouts)
  const totalDays = activeDays(workouts).size
  const todayActive = activeDays(workouts).has(todayISO())

  const grid = heatmapGrid(workouts, 18)

  // month labels across the top
  const monthLabels: { col: number; label: string }[] = []
  let lastMonth = -1
  grid.forEach((col, ci) => {
    const first = col[0].date
    const m = parseISO(first).getMonth()
    if (m !== lastMonth) {
      monthLabels.push({ col: ci, label: MONTHS[m] })
      lastMonth = m
    }
  })

  function markToday() {
    addWorkout({
      date: todayISO(),
      exercise: quickName.trim() || 'Quick session',
      sets: 1,
      reps: 1,
      durationMin: 30,
      source: 'quick',
    })
    toast({
      title: "Today's marked! 🔥",
      description: `${quickName} logged — streak alive.`,
    })
    setOpen(false)
    setQuickName('Quick session')
  }

  function handleSnap(base64: string) {
    setSnap(base64)
    setCameraOpen(false)
    if (!todayActive) {
      addWorkout({
        date: todayISO(),
        exercise: 'Gym snap check-in',
        sets: 1,
        reps: 1,
        durationMin: 45,
        source: 'quick',
        notes: '📸 Snap check-in',
      })
    }
    toast({
      title: 'Snap check-in! 📸🔥',
      description: todayActive
        ? 'Another snap logged today.'
        : 'Streak alive — you showed up.',
    })
  }

  const bigStats = [
    {
      label: 'Current streak',
      value: streak,
      suffix: 'days',
      icon: Flame,
      accent: '#d6452a',
      glow: true,
    },
    {
      label: 'Longest streak',
      value: best,
      suffix: 'days',
      icon: Trophy,
      accent: '#e0a93a',
    },
    {
      label: 'Active days',
      value: totalDays,
      suffix: 'total',
      icon: CalendarDays,
      accent: '#7fb069',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-[oklch(0.8_0.18_25)]">
          <Flame className="h-3 w-3" />
          Active Days Tracker
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Don&apos;t break <span className="text-gradient-danger">the chain</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every day you train, the flame grows. Miss too many and it dies. Your
          heatmap is the truth — make it burn.
        </p>
      </Reveal>

      {/* Big stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {bigStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div
              className={`relative overflow-hidden rounded-3xl border p-7 backdrop-blur ${
                s.glow
                  ? 'border-[oklch(0.6_0.22_25)]/40 bg-gradient-to-br from-[oklch(0.6_0.22_25)]/15 to-card/60 glow-danger'
                  : 'border-white/8 bg-card/50'
              }`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl"
                style={{ background: s.accent }}
              />
              <s.icon className="h-7 w-7" style={{ color: s.accent }} />
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className="font-display text-6xl font-700"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </span>
                <span className="text-sm text-muted-foreground">{s.suffix}</span>
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Today CTA */}
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                todayActive
                  ? 'border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {todayActive ? (
                <CheckCircle2 className="h-7 w-7 text-[oklch(0.8_0.18_25)]" />
              ) : (
                <Zap className="h-7 w-7 text-primary" />
              )}
            </div>
            <div>
              <div className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
                {todayActive ? 'Today: trained' : 'Today: not yet trained'}
              </div>
              <div className="text-sm text-muted-foreground">
                {todayActive
                  ? streak === 1
                    ? 'Streak lit today. Keep it burning tomorrow.'
                    : `${streak}-day streak alive. 🔥`
                  : 'Mark today to keep your streak alive.'}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setCameraOpen(true)}
              className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90 glow-gold-sm"
            >
              <Camera className="mr-1 h-4 w-4" />
              {todayActive ? 'Snap again' : 'Snap check-in'}
            </Button>
            {!todayActive && (
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
              >
                <Plus className="mr-1 h-4 w-4" />
                Quick mark
              </Button>
            )}
            <Button
              onClick={onGoTracker}
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            >
              Log full workout
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Heatmap */}
      <Reveal delay={0.15}>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
              Last 18 weeks
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 4].map((c) => (
                <span
                  key={c}
                  className="h-3 w-3 rounded-sm"
                  style={{ background: heatColor(c) }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          <div className="flex gap-1.5">
            {/* weekday labels */}
            <div className="flex flex-col gap-1.5 pt-5 pr-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-4 text-[10px] leading-4 text-muted-foreground">
                  {i % 2 === 0 ? WEEKDAYS[i / 2] : ''}
                </div>
              ))}
            </div>

            {/* grid */}
            <div className="min-w-max">
              {/* month labels */}
              <div className="relative mb-1 h-4">
                {monthLabels.map((m) => (
                  <span
                    key={m.col}
                    className="absolute text-[10px] text-muted-foreground"
                    style={{
                      left: `${m.col * 20}px`,
                    }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                {grid.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-1.5">
                    {col.map((cell) => {
                      const future = parseISO(cell.date) > new Date(todayISO() + 'T23:59:59')
                      const isToday = cell.date === todayISO()
                      return (
                        <div
                          key={cell.date}
                          title={`${cell.date} · ${cell.count} set${cell.count === 1 ? '' : 's'}`}
                          className="relative h-4 w-4 rounded-sm transition-transform hover:scale-125"
                          style={{
                            background: future
                              ? 'transparent'
                              : heatColor(cell.count),
                            outline: isToday
                              ? '1.5px solid oklch(0.82 0.14 78)'
                              : 'none',
                            outlineOffset: '1px',
                          }}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Streak milestones */}
      <Reveal delay={0.2}>
        <div className="mt-6 rounded-3xl border border-white/8 bg-card/50 p-6 backdrop-blur">
          <h2 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
            Pehlwan ranks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hit these streak milestones to earn your akhada title.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { days: 7, title: 'Novice', color: '#7fb069' },
              { days: 30, title: 'Pehlwan', color: '#e0c14a' },
              { days: 90, title: 'Khalifa', color: '#e0a93a' },
              { days: 180, title: 'Ustad', color: '#d6452a' },
            ].map((m) => {
              const reached = best >= m.days
              return (
                <motion.div
                  key={m.title}
                  whileHover={{ y: -3 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 ${
                    reached
                      ? 'border-white/15 bg-white/5'
                      : 'border-white/8 bg-white/[0.02] opacity-70'
                  }`}
                >
                  <div
                    className="absolute right-3 top-3 h-2 w-2 rounded-full"
                    style={{
                      background: reached ? m.color : 'oklch(0.4 0 0)',
                    }}
                  />
                  <div className="font-display text-3xl font-700" style={{ color: reached ? m.color : 'oklch(0.5 0 0)' }}>
                    {m.days}d
                  </div>
                  <div className="font-display text-sm font-600 uppercase tracking-wider text-foreground">
                    {m.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {reached ? 'Achieved' : `${m.days - best}d to go`}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Quick mark dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              Mark today as trained
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Quick-log a session to keep your streak alive. Log full details in the Tracker.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Input
              value={quickName}
              onChange={(e) => setQuickName(e.target.value)}
              placeholder="e.g. Morning run, Akhada drill…"
              className="h-11 rounded-xl border-white/10 bg-white/5 focus-visible:border-primary/60 focus-visible:ring-primary/30"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={markToday}
              className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90"
            >
              <Flame className="mr-1 h-4 w-4" />
              Keep the streak
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Camera overlay for snap check-in */}
      <AnimatePresence>
        {cameraOpen && (
          <CameraCapture
            onCapture={handleSnap}
            onClose={() => setCameraOpen(false)}
            title="Snap check-in"
            subtitle="Take a photo at the gym to mark today active"
            cta="Snap"
          />
        )}
      </AnimatePresence>

      {/* Today's snap display */}
      <AnimatePresence>
        {snap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 overflow-hidden rounded-3xl border border-[oklch(0.6_0.22_25)]/40 bg-gradient-to-br from-[oklch(0.6_0.22_25)]/15 to-card/60 p-6 backdrop-blur"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[oklch(0.6_0.22_25)]/50">
                <img src={snap} alt="Today's gym snap" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-1 left-2 text-[10px] font-700 uppercase tracking-wider text-white">
                  Today
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.8_0.18_25)]" />
                  <span className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
                    Snap check-in done!
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  You showed up today. The streak lives on. Come back tomorrow and snap again to keep the chain unbroken. 🔥
                </p>
                <button
                  onClick={() => setSnap(null)}
                  className="mt-3 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear snap
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
