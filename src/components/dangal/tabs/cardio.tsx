'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Footprints,
  Bike,
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  Activity,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '../reveal'
import { useGymStore, todayISO } from '@/store/gym-store'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type CardioType = 'treadmill' | 'cycling' | 'rowing' | 'jumping' | 'walk'

const cardioTypes: { id: CardioType; label: string; icon: typeof Heart; kcalPerMin: number; color: string }[] = [
  { id: 'walk', label: 'Walk', icon: Footprints, kcalPerMin: 4, color: '#7fb069' },
  { id: 'treadmill', label: 'Treadmill', icon: Activity, kcalPerMin: 10, color: '#e0a93a' },
  { id: 'cycling', label: 'Cycling', icon: Bike, kcalPerMin: 8, color: '#8a8fd6' },
  { id: 'rowing', label: 'Rowing', icon: Activity, kcalPerMin: 12, color: '#d6452a' },
  { id: 'jumping', label: 'Jump Rope', icon: Flame, kcalPerMin: 13, color: '#c97ae0' },
]

export function CardioTab() {
  const { toast } = useToast()
  const addWorkout = useGymStore((s) => s.addWorkout)

  // Timer state
  const [cardioType, setCardioType] = useState<CardioType>('treadmill')
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Step counter state (device motion)
  const [steps, setSteps] = useState(0)
  const [stepCounting, setStepCounting] = useState(false)
  const lastAccel = useRef(0)

  // Start/stop timer
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  // Step counter via device motion (mobile)
  useEffect(() => {
    if (!stepCounting) return

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity
      if (!acc) return
      const mag = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2)
      const delta = Math.abs(mag - lastAccel.current)
      if (delta > 1.5 && mag > 10) {
        setSteps((s) => s + 1)
      }
      lastAccel.current = mag
    }

    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [stepCounting])

  async function startStepCounter() {
    if (!('DeviceMotionEvent' in window)) {
      toast({ title: 'Not supported', description: 'Step counter needs a mobile device with motion sensors.', variant: 'destructive' })
      return
    }
    // Request permission on iOS
    const DME = DeviceMotionEvent as any
    if (DME.requestPermission) {
      try {
        const res = await DME.requestPermission()
        if (res !== 'granted') {
          toast({ title: 'Permission denied', description: 'Please allow motion access to count steps.', variant: 'destructive' })
          return
        }
      } catch {
        toast({ title: 'Permission denied', description: 'Motion access required for step counting.', variant: 'destructive' })
        return
      }
    }
    setSteps(0)
    setStepCounting(true)
    toast({ title: 'Step counter started! 👟', description: 'Start walking/running to count steps.' })
  }

  function stopStepCounter() {
    setStepCounting(false)
    if (steps > 0) {
      toast({ title: `Steps: ${steps}`, description: `${(steps * 0.04).toFixed(0)} kcal estimated` })
    }
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  function saveSession() {
    if (elapsed === 0 && steps === 0) {
      toast({ title: 'Nothing to save', description: 'Start a timer or step counter first.', variant: 'destructive' })
      return
    }
    const type = cardioTypes.find((c) => c.id === cardioType)!
    const minutes = Math.max(1, Math.round(elapsed / 60))
    const kcalFromTime = Math.round(minutes * type.kcalPerMin)
    const kcalFromSteps = Math.round(steps * 0.04)
    const totalKcal = kcalFromTime + kcalFromSteps

    addWorkout({
      date: todayISO(),
      exercise: `${type.label}${steps > 0 ? ` + ${steps} steps` : ''}`,
      sets: 1,
      reps: 1,
      durationMin: minutes,
      notes: `${formatTime(elapsed)} · ${totalKcal} kcal${steps > 0 ? ` · ${steps} steps` : ''}`,
      source: 'manual',
    })

    toast({
      title: 'Cardio saved! 🔥',
      description: `${type.label} · ${formatTime(elapsed)} · ${totalKcal} kcal${steps > 0 ? ` · ${steps} steps` : ''}`,
    })

    setRunning(false)
    setElapsed(0)
    setSteps(0)
    setStepCounting(false)
  }

  function reset() {
    setRunning(false)
    setElapsed(0)
    setSteps(0)
    setStepCounting(false)
  }

  const selectedType = cardioTypes.find((c) => c.id === cardioType)!
  const minutes = Math.max(1, Math.round(elapsed / 60))
  const kcalEstimate = Math.round(minutes * selectedType.kcalPerMin) + Math.round(steps * 0.04)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Heart className="h-3 w-3" />
          Cardio Zone
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Cardio <span className="text-gradient-gold">Tracker</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Timer for treadmill, cycling, rowing & more. Step counter on mobile. Track every heartbeat.
        </p>
      </Reveal>

      {/* Cardio type selector */}
      <Reveal delay={0.05}>
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {cardioTypes.map((c) => (
            <button
              key={c.id}
              onClick={() => setCardioType(c.id)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all',
                cardioType === c.id
                  ? 'border-primary/50 bg-gradient-to-br from-primary/15 to-card/60 glow-gold-sm'
                  : 'border-white/8 bg-card/50 hover:border-white/20'
              )}
            >
              <c.icon className="h-5 w-5" style={{ color: c.color }} />
              <span className="text-[11px] font-600 uppercase tracking-wider text-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Timer card */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-8 backdrop-blur">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
                {selectedType.label} Timer
              </h3>
            </div>

            {/* Big timer display */}
            <div className="my-8 text-center">
              <motion.div
                key={running ? 'running' : 'paused'}
                animate={running ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-display text-6xl font-700 tabular-nums text-gradient-gold sm:text-7xl"
              >
                {formatTime(elapsed)}
              </motion.div>
              <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-[oklch(0.6_0.22_25)]" />
                  {kcalEstimate} kcal
                </span>
                <span>·</span>
                <span>{minutes} min</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!running ? (
                <Button
                  onClick={() => setRunning(true)}
                  className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] p-0 text-black hover:opacity-90 glow-gold-sm"
                >
                  <Play className="h-6 w-6 fill-current" />
                </Button>
              ) : (
                <Button
                  onClick={() => setRunning(false)}
                  className="h-14 w-14 rounded-full bg-gradient-to-r from-[oklch(0.6_0.22_25)] to-[oklch(0.55_0.2_25)] p-0 text-white hover:opacity-90"
                >
                  <Pause className="h-6 w-6 fill-current" />
                </Button>
              )}
              <Button
                onClick={reset}
                variant="outline"
                className="h-12 w-12 rounded-full border-white/15 bg-white/5 p-0 text-foreground hover:bg-white/10"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button
                onClick={saveSession}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 text-white hover:opacity-90"
              >
                Save
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Step counter card */}
        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-white/8 bg-card/50 p-8 backdrop-blur">
            <div className="flex items-center gap-2">
              <Footprints className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
                Step Counter
              </h3>
            </div>

            {/* Big step display */}
            <div className="my-8 text-center">
              <motion.div
                animate={stepCounting ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: stepCounting ? Infinity : 0 }}
                className="font-display text-6xl font-700 tabular-nums text-gradient-gold sm:text-7xl"
              >
                {steps.toLocaleString()}
              </motion.div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stepCounting ? '🏃 Counting...' : 'Tap start to count steps'}
              </div>
              <div className="mt-1 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span>{(steps * 0.0008).toFixed(2)} km</span>
                <span>·</span>
                <span>{Math.round(steps * 0.04)} kcal</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!stepCounting ? (
                <Button
                  onClick={startStepCounter}
                  className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-5 text-black hover:opacity-90 glow-gold-sm"
                >
                  <Play className="mr-1.5 h-4 w-4 fill-current" />
                  Start
                </Button>
              ) : (
                <Button
                  onClick={stopStepCounter}
                  className="rounded-full bg-gradient-to-r from-[oklch(0.6_0.22_25)] to-[oklch(0.55_0.2_25)] px-5 text-white hover:opacity-90"
                >
                  <Square className="mr-1.5 h-4 w-4 fill-current" />
                  Stop
                </Button>
              )}
              <Button
                onClick={() => { setSteps(0) }}
                variant="outline"
                className="h-12 w-12 rounded-full border-white/15 bg-white/5 p-0 text-foreground hover:bg-white/10"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              {steps > 0 && !stepCounting && (
                <Button
                  onClick={saveSession}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 text-white hover:opacity-90"
                >
                  Save
                </Button>
              )}
            </div>

            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              📱 Step counter works on mobile devices with motion sensors. Hold your phone while walking.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Quick stats */}
      <Reveal delay={0.2}>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/8 bg-card/50 p-5 text-center backdrop-blur">
            <Timer className="mx-auto h-5 w-5 text-primary" />
            <div className="mt-2 font-display text-2xl font-700 text-foreground">{formatTime(elapsed)}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Duration</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-card/50 p-5 text-center backdrop-blur">
            <Flame className="mx-auto h-5 w-5 text-[oklch(0.6_0.22_25)]" />
            <div className="mt-2 font-display text-2xl font-700 text-foreground">{kcalEstimate}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Kcal</div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-card/50 p-5 text-center backdrop-blur">
            <Footprints className="mx-auto h-5 w-5 text-primary" />
            <div className="mt-2 font-display text-2xl font-700 text-foreground">{steps}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Steps</div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
