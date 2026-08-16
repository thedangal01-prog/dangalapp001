'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Library,
  Activity,
  Flame,
  ArrowRight,
  Quote,
  Dumbbell,
  Scale,
  Images,
  Users,
  Crown,
  Bot,
} from 'lucide-react'
import { Background3D } from '../../gym/hero-3d'
import { HeroLogo } from '../hero-logo'
import { WhyDangal3D } from '../why-dangal-3d'
import { MadeByMe } from '../made-by-me'
import { Reveal } from '../reveal'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth-store'
import {
  useGymStore,
  currentStreak,
  longestStreak,
  thisWeekCount,
  totalVolume,
  isTodayActive,
  todayISO,
} from '@/store/gym-store'

type TabId = 'home' | 'about' | 'assistant' | 'resources' | 'tracker' | 'metrics' | 'streak' | 'gallery' | 'join'

export function HomeTab({
  onNavigate,
}: {
  onNavigate: (t: TabId) => void
}) {
  const workouts = useGymStore((s) => s.workouts)
  const memberName = useGymStore((s) => s.memberName)
  const member = useAuthStore((s) => s.member)
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true)
  }, [])

  const stats = [
    {
      label: 'Current streak',
      value: `${currentStreak(workouts)}`,
      suffix: 'days',
      icon: Flame,
      accent: '#d6452a',
    },
    {
      label: 'Best streak',
      value: `${longestStreak(workouts)}`,
      suffix: 'days',
      icon: Flame,
      accent: '#e0a93a',
    },
    {
      label: 'This week',
      value: `${thisWeekCount(workouts)}`,
      suffix: 'sessions',
      icon: Activity,
      accent: '#e0c14a',
    },
    {
      label: 'Total volume',
      value: `${(totalVolume(workouts) / 1000).toFixed(1)}t`,
      suffix: 'lifted',
      icon: Dumbbell,
      accent: '#e0a93a',
    },
  ]

  // Greeting based on time — computed after mount to avoid hydration mismatch
  // (server time ≠ client time on first render)
  const greeting = useMemo(() => {
    if (!hasMounted) return 'Welcome'
    const h = new Date().getHours()
    if (h < 12) return 'Subah ki shubhkamnayein'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }, [hasMounted])

  return (
    <div>
      {/* HERO — split layout: text + crazy animated bodybuilder */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Background3D />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-2 lg:gap-2 lg:pt-16">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {greeting}, {memberName}
            </span>

            <h1 className="mt-5 font-display text-5xl font-700 uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl md:text-8xl">
              Train. <span className="text-gradient-gold">Fight.</span>
              <br />
              Rise.
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              Your AI-powered gym in Delhi. Get a custom workout plan, track your
              progress, and build a streak — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => onNavigate('assistant')}
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 text-base font-600 text-black hover:opacity-90 glow-gold-sm"
              >
                <Sparkles className="mr-1 h-4 w-4" />
                Get my workout
              </Button>
              <Button
                onClick={() => onNavigate('join')}
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-base font-500 backdrop-blur hover:bg-white/10"
              >
                <Crown className="mr-1 h-4 w-4" />
                Join now
              </Button>
            </div>

            {/* mini trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Open 6 days a week
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.6_0.22_25)]" />
                From ₹1000/mo
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                1-day free trial
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sangam Vihar, Delhi
              </span>
            </div>
          </motion.div>

          {/* RIGHT — animated gym logo with owner name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <HeroLogo />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto -mt-6 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-5 backdrop-blur">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: s.accent }}
                />
                <s.icon className="h-5 w-5" style={{ color: s.accent }} />
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-700 text-foreground">
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.suffix}</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY DANGAL — 3D animated section (Om Sharma portfolio style) */}
      <WhyDangal3D />

      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground sm:text-4xl">
            Your arsenal
          </h2>
          <p className="mt-1 text-muted-foreground">
            Six weapons. One mission: become undeniable.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            onClick={() => onNavigate('about')}
            icon={Users}
            title="About the Akhada"
            text="Meet owner & head coach Amit Sharma and trainer Arnav Pathak. Our story, values and mission."
            cta="Meet the team"
            accent="#e0a93a"
          />
          <ActionCard
            onClick={() => onNavigate('assistant')}
            icon={Bot}
            title="AI Coach"
            text="Workout plans, diet plans & chat with Coach Dangal — your all-in-one AI trainer."
            cta="Open AI Coach"
            accent="#d6452a"
            highlight
          />
          <ActionCard
            onClick={() => onNavigate('tracker')}
            icon={Activity}
            title="Fitness Tracker"
            text="Log every exercise, set and rep. Watch your volume compound."
            cta="Log a workout"
            accent="#7fb069"
          />
          <ActionCard
            onClick={() => onNavigate('metrics')}
            icon={Scale}
            title="Body Metrics"
            text="Track weight, body-fat, muscle & measurements with progress charts."
            cta="Log metrics"
            accent="#e0a93a"
          />
          <ActionCard
            onClick={() => onNavigate('streak')}
            icon={Flame}
            title="Active Days Streak"
            text="Don't break the chain. Heatmap, current streak and all-time best."
            cta="View streak"
            accent="#d6452a"
          />
          <ActionCard
            onClick={() => onNavigate('gallery')}
            icon={Images}
            title="Gallery & Membership"
            text="Step inside the akhada. See the floor, then claim your 1-day free trial."
            cta="Explore"
            accent="#8a8fd6"
          />
        </div>
      </section>

      {/* TODAY SNAPSHOT */}
      <TodaySnapshot onNavigate={onNavigate} />

      {/* MADE BY ME — credit section (Om Sharma portfolio style) */}
      <MadeByMe />

      {/* MOTTO BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-card/80 to-background p-10 text-center sm:p-16">
            <Quote className="mx-auto h-10 w-10 text-primary/40" />
            <p className="font-deva mx-auto mt-6 max-w-2xl text-2xl leading-snug text-foreground sm:text-3xl">
              &ldquo;ताकत शरीर में नहीं, ज़िद में है।&rdquo;
            </p>
            <p className="mt-3 font-serif-display text-lg italic text-muted-foreground">
              Strength is not in the body, it is in the stubbornness.
            </p>
            <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function ActionCard({
  icon: Icon,
  title,
  text,
  cta,
  accent,
  onClick,
  highlight,
}: {
  icon: typeof Sparkles
  title: string
  text: string
  cta: string
  accent: string
  onClick: () => void
  highlight?: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative overflow-hidden rounded-2xl border p-6 text-left backdrop-blur transition-colors ${
        highlight
          ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-card/60'
          : 'border-white/8 bg-card/60 hover:border-white/20'
      }`}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
          style={{ background: `${accent}25` }}
        >
          <Icon className="h-6 w-6" style={{ color: accent }} />
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
      <h3 className="relative mt-5 font-display text-xl font-700 uppercase tracking-tight text-foreground">
        {title}
      </h3>
      <p className="relative mt-2 text-sm text-muted-foreground">{text}</p>
      <span
        className="relative mt-4 inline-block text-sm font-600"
        style={{ color: accent }}
      >
        {cta} →
      </span>
    </motion.button>
  )
}

function TodaySnapshot({ onNavigate }: { onNavigate: (t: TabId) => void }) {
  const workouts = useGymStore((s) => s.workouts)
  const today = todayISO()
  const todays = workouts.filter((w) => w.date === today)
  const active = isTodayActive(workouts)

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-white/8 bg-card/50 backdrop-blur">
          <div className="flex flex-col gap-0 md:flex-row">
            <div className="flex-1 p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                  Today&apos;s log
                </h3>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-600 ${
                    active
                      ? 'border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/15 text-[oklch(0.8_0.18_25)]'
                      : 'border-white/10 bg-white/5 text-muted-foreground'
                  }`}
                >
                  {active ? '🔥 Trained today' : 'Rest day'}
                </span>
              </div>

              {todays.length === 0 ? (
                <div className="mt-5">
                  <p className="text-sm text-muted-foreground">
                    No training logged today. The akhada is calling.
                  </p>
                  <Button
                    onClick={() => onNavigate('planner')}
                    className="mt-4 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black hover:opacity-90"
                  >
                    <Sparkles className="mr-1 h-4 w-4" />
                    Generate a workout
                  </Button>
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {todays.map((w) => (
                    <li
                      key={w.id}
                      className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm"
                    >
                      <span className="font-600 text-foreground">{w.exercise}</span>
                      <span className="text-muted-foreground">
                        {w.sets}×{w.reps}
                        {w.weight ? ` @ ${w.weight}kg` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-center border-t border-white/8 p-7 md:border-l md:border-t-0">
              <div className="text-center">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Active today
                </div>
                <div
                  className={`font-display mt-2 text-6xl font-700 ${
                    active ? 'text-gradient-danger' : 'text-muted-foreground/40'
                  }`}
                >
                  {active ? 'YES' : 'NO'}
                </div>
                <Button
                  onClick={() => onNavigate('tracker')}
                  variant="outline"
                  className="mt-4 rounded-full border-white/15 bg-white/5 text-foreground hover:bg-white/10"
                >
                  Log a set
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
