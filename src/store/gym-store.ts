'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WorkoutEntry = {
  id: string
  date: string // ISO yyyy-mm-dd
  exercise: string
  sets: number
  reps: number
  weight?: number // kg
  durationMin?: number
  notes?: string
  source?: 'manual' | 'ai' | 'quick'
  createdAt: number
}

export type MetricEntry = {
  id: string
  date: string // ISO yyyy-mm-dd
  weightKg?: number
  bodyFatPct?: number
  muscleMassKg?: number
  chestCm?: number
  waistCm?: number
  armCm?: number
  thighCm?: number
  note?: string
  createdAt: number
}

type GymState = {
  workouts: WorkoutEntry[]
  metrics: MetricEntry[]
  memberName: string
  goal: string
  setMember: (name: string, goal: string) => void
  addWorkout: (w: Omit<WorkoutEntry, 'id' | 'createdAt'>) => void
  addMany: (ws: Omit<WorkoutEntry, 'id' | 'createdAt'>[]) => void
  removeWorkout: (id: string) => void
  addMetric: (m: Omit<MetricEntry, 'id' | 'createdAt'>) => void
  removeMetric: (id: string) => void
  clearAll: () => void
}

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      workouts: [],
      metrics: [],
      memberName: 'Pehlwan',
      goal: 'Build strength',
      setMember: (name, goal) => set({ memberName: name, goal }),
      addWorkout: (w) =>
        set((s) => ({
          workouts: [
            ...s.workouts,
            { ...w, id: crypto.randomUUID(), createdAt: Date.now() },
          ],
        })),
      addMany: (ws) =>
        set((s) => ({
          workouts: [
            ...s.workouts,
            ...ws.map((w) => ({ ...w, id: crypto.randomUUID(), createdAt: Date.now() })),
          ],
        })),
      removeWorkout: (id) =>
        set((s) => ({ workouts: s.workouts.filter((w) => w.id !== id) })),
      addMetric: (m) =>
        set((s) => ({
          metrics: [
            ...s.metrics,
            { ...m, id: crypto.randomUUID(), createdAt: Date.now() },
          ],
        })),
      removeMetric: (id) =>
        set((s) => ({ metrics: s.metrics.filter((m) => m.id !== id) })),
      clearAll: () => set({ workouts: [], metrics: [] }),
    }),
    { name: 'dangal-gym-store' }
  )
)

/* ---------- Derived helpers (pure, importable) ---------- */

export function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10)
}

export function parseISO(d: string): Date {
  const [y, m, day] = d.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, day ?? 1)
}

/** Set of unique active-day strings (yyyy-mm-dd) */
export function activeDays(workouts: WorkoutEntry[]): Set<string> {
  return new Set(workouts.map((w) => w.date))
}

export function isTodayActive(workouts: WorkoutEntry[]): boolean {
  return activeDays(workouts).has(todayISO())
}

/**
 * Current streak: consecutive days ending today (or yesterday) with ≥1 workout.
 * If today active, count today + consecutive prior days.
 * If today not active but yesterday active, count from yesterday (grace).
 */
export function currentStreak(workouts: WorkoutEntry[]): number {
  const days = activeDays(workouts)
  if (days.size === 0) return 0
  const today = parseISO(todayISO())
  let cursor = today
  // grace: if today not active, start from yesterday
  if (!days.has(todayISO())) {
    cursor = new Date(today)
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(cursor.toISOString().slice(0, 10))) return 0
  }
  let streak = 0
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Longest run of consecutive active days ever. */
export function longestStreak(workouts: WorkoutEntry[]): number {
  const days = [...activeDays(workouts)].sort()
  if (days.length === 0) return 0
  let best = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    const prev = parseISO(days[i - 1])
    const cur = parseISO(days[i])
    const diff = Math.round((cur.getTime() - prev.getTime()) / 86_400_000)
    if (diff === 1) {
      run++
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  return best
}

/** Total volume = sum(sets * reps * weight) for entries with weight. */
export function totalVolume(workouts: WorkoutEntry[]): number {
  return workouts.reduce(
    (acc, w) => acc + (w.weight ? w.sets * w.reps * w.weight : 0),
    0
  )
}

export function thisWeekCount(workouts: WorkoutEntry[]): number {
  const now = new Date()
  const day = (now.getDay() + 6) % 7 // Mon=0
  const monday = new Date(now)
  monday.setDate(now.getDate() - day)
  monday.setHours(0, 0, 0, 0)
  return workouts.filter((w) => parseISO(w.date) >= monday).length
}

/** Build a GitHub-style grid: last `weeks` weeks ending today. */
export function heatmapGrid(
  workouts: WorkoutEntry[],
  weeks = 18
): { date: string; count: number }[][] {
  const counts = new Map<string, number>()
  for (const w of workouts) counts.set(w.date, (counts.get(w.date) ?? 0) + 1)

  const today = parseISO(todayISO())
  // start from the Monday of the week (weeks-1) ago
  const todayDay = (today.getDay() + 6) % 7
  const start = new Date(today)
  start.setDate(today.getDate() - todayDay - (weeks - 1) * 7)

  const cols: { date: string; count: number }[][] = []
  for (let c = 0; c < weeks; c++) {
    const col: { date: string; count: number }[] = []
    for (let r = 0; r < 7; r++) {
      const d = new Date(start)
      d.setDate(start.getDate() + c * 7 + r)
      const iso = d.toISOString().slice(0, 10)
      col.push({ date: iso, count: counts.get(iso) ?? 0 })
    }
    cols.push(col)
  }
  return cols
}

export function heatColor(count: number): string {
  if (count === 0) return 'oklch(0.23 0.01 264 / 0.5)'
  if (count === 1) return 'oklch(0.55 0.13 70 / 0.85)'
  if (count === 2) return 'oklch(0.68 0.14 72 / 0.9)'
  if (count <= 4) return 'oklch(0.8 0.14 78)'
  return 'oklch(0.6 0.22 25)' // very active -> crimson
}

/* ---------- Body metric helpers ---------- */

export function sortedMetrics(metrics: MetricEntry[]): MetricEntry[] {
  return [...metrics].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
}

export function latestMetric(metrics: MetricEntry[]): MetricEntry | null {
  const s = sortedMetrics(metrics)
  return s.length ? s[s.length - 1] : null
}

export function firstMetric(metrics: MetricEntry[]): MetricEntry | null {
  const s = sortedMetrics(metrics)
  return s.length ? s[0] : null
}

/** delta = latest - first for a given field */
export function metricDelta(
  metrics: MetricEntry[],
  field: keyof Pick<
    MetricEntry,
    'weightKg' | 'bodyFatPct' | 'muscleMassKg' | 'chestCm' | 'waistCm' | 'armCm' | 'thighCm'
  >
): number | null {
  const first = firstMetric(metrics)
  const last = latestMetric(metrics)
  if (!first || !last) return null
  if (first[field] == null || last[field] == null) return null
  return (last[field] as number) - (first[field] as number)
}

export function bmi(weightKg?: number, heightCm?: number): number | null {
  if (!weightKg || !heightCm) return null
  const h = heightCm / 100
  return +(weightKg / (h * h)).toFixed(1)
}
