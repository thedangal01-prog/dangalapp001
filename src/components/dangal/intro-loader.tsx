'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

/**
 * ONE amazing cinematic intro for The Dangal Unisex Gym.
 * Plays every page load. Combines text animations + logo climax into
 * a single seamless sequence:
 *
 *   Phase 1: नमस्ते (Devanagari greeting)
 *   Phase 2: "THE DANGAL UNISEX GYM" (letter cascade)
 *   Phase 3: "The Dangal" (serif italic)
 *   Phase 4: थे दंगल यूनिसेक्स जिम (full Devanagari)
 *   Phase 5: Grand climax — logo + दंगल + motto + Namaste Pehlwan
 *
 * Apple motion language: exponential easings, blur transitions,
 * floating particles, rotating rings, pulsing glow, continuous shine.
 * ~7s total, skippable.
 */

type Phase = 0 | 1 | 2 | 3 | 4 | 5

const PHASE_AT: { phase: Phase; at: number }[] = [
  { phase: 1, at: 150 },
  { phase: 2, at: 1000 },
  { phase: 3, at: 2100 },
  { phase: 4, at: 3200 },
  { phase: 5, at: 4200 },
]

const EXIT_AT = 5300
const DONE_AT = 5900

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const EASE_IN = [0.7, 0, 0.84, 0] as const

const NAME_LETTERS = ['T', 'H', 'E', ' ', 'D', 'A', 'N', 'G', 'A', 'L']

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>(0)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const doneRef = useRef(onDone)
  useEffect(() => {
    doneRef.current = onDone
  }, [onDone])

  const finish = useCallback(() => {
    setExiting(true)
    window.setTimeout(() => {
      setDone(true)
      doneRef.current()
    }, 400)
  }, [])

  useEffect(() => {
    const timers = PHASE_AT.map((t) =>
      window.setTimeout(() => setPhase(t.phase), t.at)
    )
    const exitTimer = window.setTimeout(() => setExiting(true), EXIT_AT)
    const doneTimer = window.setTimeout(finish, DONE_AT)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [finish])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      animate={
        exiting
          ? { opacity: 0 }
          : { opacity: 1 }
      }
      transition={{ duration: 0.4, ease: EASE_IN }}
    >
      {/* Animated background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background:
            phase >= 5
              ? 'radial-gradient(circle at 50% 50%, oklch(0.82 0.14 78 / 0.22), oklch(0.6 0.22 25 / 0.08), transparent 50%)'
              : phase >= 4
                ? 'radial-gradient(circle at 50% 50%, oklch(0.82 0.14 78 / 0.15), transparent 55%)'
                : phase >= 2
                  ? 'radial-gradient(circle at 50% 50%, oklch(0.82 0.14 78 / 0.1), transparent 58%)'
                  : 'radial-gradient(circle at 50% 50%, oklch(0.82 0.14 78 / 0.05), transparent 60%)',
        }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />

      {/* Floating gold particles — fewer for performance */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute h-1 w-1 rounded-full"
          style={{ background: 'oklch(0.82 0.14 78)', left: `${15 + i * 12}%`, top: `${20 + (i % 4) * 20}%`, willChange: 'transform, opacity' }}
          animate={{ opacity: [0, 0.7, 0], scale: [0, 1.2, 0], y: [0, -30, -60] }}
          transition={{ duration: 2.5 + (i % 2), repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}

      {/* Rotating energy rings (from phase 2) */}
      {phase >= 2 && (
        <motion.div
          className="absolute h-80 w-80 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'transparent' }}
        />
      )}
      {phase >= 3 && (
        <motion.div
          className="absolute h-96 w-96 rounded-full border border-[oklch(0.6_0.22_25)]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ borderBottomColor: 'oklch(0.6 0.22 25)', borderLeftColor: 'transparent' }}
        />
      )}

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 45%, oklch(0 0 0 / 0.6) 100%)' }} />

      {/* Center stage */}
      <div className="relative flex min-h-[360px] w-full items-center justify-center px-6 text-center">
        <AnimatePresence>
          {/* Phase 1: नमस्ते */}
          {phase === 1 && (
            <motion.div
              key="namaste"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.94, y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
              exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.05, y: -15 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <p className="font-deva text-6xl font-400 tracking-[0.05em] text-foreground/90 sm:text-7xl">नमस्ते</p>
            </motion.div>
          )}

          {/* Phase 2: THE DANGAL — letter cascade */}
          {phase === 2 && (
            <motion.div
              key="cascade"
              className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, filter: 'blur(14px)' }}
              transition={{ duration: 0.4 }}
            >
              {NAME_LETTERS.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display text-5xl font-700 uppercase tracking-tight text-foreground sm:text-7xl"
                  initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Phase 3: The Dangal — serif italic */}
          {phase === 3 && (
            <motion.div
              key="serif"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(18px)', scale: 0.94 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(18px)', scale: 1.05 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <p className="font-serif-display text-7xl font-300 italic tracking-wide text-foreground sm:text-8xl">The Dangal</p>
              <motion.p
                className="mt-3 font-serif-display text-xl font-400 uppercase tracking-[0.5em] text-foreground/55 sm:text-2xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: EASE_OUT }}
              >
                Unisex Gym
              </motion.p>
            </motion.div>
          )}

          {/* Phase 4: थे दंगल यूनिसेक्स जिम */}
          {phase === 4 && (
            <motion.div
              key="devanagari"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.94 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <p className="font-deva text-5xl font-400 tracking-wide text-foreground/90 sm:text-7xl">थे दंगल यूनिसेक्स जिम</p>
            </motion.div>
          )}

          {/* Phase 5: Grand climax */}
          {phase === 5 && (
            <motion.div
              key="dangal"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(24px)', scale: 0.92 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(24px)', scale: 1.08 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              {/* Logo with double rings, pulsing glow, continuous shine */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: EASE_OUT }}
                className="relative mb-8 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40"
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: 'radial-gradient(circle, oklch(0.82 0.14 78 / 0.3), transparent 70%)', filter: 'blur(20px)' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'oklch(0.82 0.14 78 / 0.4)', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'oklch(0.6 0.22 25 / 0.5)', borderLeftColor: 'oklch(0.6 0.22 25 / 0.5)' }}
                />
                <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary/70 glow-gold sm:h-32 sm:w-32">
                  <Image src="/gym/logo-v2.jpg" alt="The Dangal Unisex Gym logo" width={128} height={128} className="h-full w-full object-cover" priority />
                  <motion.div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
                    style={{ background: 'linear-gradient(110deg, transparent 25%, oklch(0.98 0.06 90 / 0.7) 45%, oklch(1 0 0 / 0.9) 50%, oklch(0.98 0.06 90 / 0.7) 55%, transparent 75%)', backgroundSize: '250% 100%' }}
                    animate={{ backgroundPosition: ['250% 0%', '-150% 0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 mix-blend-overlay"
                    style={{ background: 'linear-gradient(100deg, transparent 40%, oklch(0.9 0.1 85 / 0.4) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
                    animate={{ backgroundPosition: ['200% 0%', '-100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                  />
                </div>
              </motion.div>

              {/* Hairlines + दंगल */}
              <motion.div className="mb-5 h-px origin-center bg-gradient-to-r from-transparent via-primary to-transparent" style={{ width: 260 }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }} />
              <h1 className="font-deva text-[20vw] font-400 leading-none tracking-tight text-gradient-gold sm:text-[15vw] md:text-[11rem]">दंगल</h1>
              <motion.div className="mt-5 h-px origin-center bg-gradient-to-r from-transparent via-primary to-transparent" style={{ width: 260 }} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }} />

              {/* Motto */}
              <motion.p initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.7, duration: 0.8, ease: EASE_OUT }} className="mt-7 font-display text-xs font-500 uppercase tracking-[0.6em] text-foreground/70 sm:text-sm">
                Train · Fight · Rise
              </motion.p>

              {/* Namaste Pehlwan */}
              <motion.p initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 1.4, duration: 1, ease: EASE_OUT }} className="mt-5 font-serif-display text-base italic text-foreground/70 sm:text-lg">
                Namaste Pehlwan, welcome to The Dangal Unisex Gym
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {[1, 2, 3, 4, 5].map((p) => (
          <motion.div key={p} className="h-1.5 w-1.5 rounded-full" animate={{ backgroundColor: phase >= p ? '#e0a93a' : 'rgba(255,255,255,0.15)', scale: phase >= p ? 1.4 : 1 }} transition={{ duration: 0.4, ease: EASE_OUT }} />
        ))}
      </div>

      {/* Skip */}
      <button onClick={finish} className="absolute bottom-7 right-6 z-10 text-[10px] uppercase tracking-[0.3em] text-foreground/35 transition-colors duration-300 hover:text-foreground/80">
        Skip
      </button>
    </motion.div>
  )
}
