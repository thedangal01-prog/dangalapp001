'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Pre-intro: Apple-style text animation of the full gym name
 * "THE DANGAL UNISEX GYM" shown in MULTIPLE animation styles, cycling
 * through distinct treatments before handing off to the main intro.
 *
 * Styles (each ~1.1s):
 *   0  Letter cascade      — each letter blur-fades up in sequence
 *   1  Word slide stack    — words slide in from below, staggered
 *   2  Gradient wipe       — gold gradient sweeps across the name
 *   3  Scale punch         — whole name punches in from huge→normal
 * Then dissolves into the main intro.
 *
 * ~4.6s total. Plays before the main intro, once per session.
 */

const NAME = ['THE', 'DANGAL', 'UNISEX', 'GYM']
const EASE = [0.16, 1, 0.3, 1] as const

const STYLE_MS = 1100 // each style holds ~1.1s
const EXIT_AT = 4400
const DONE_AT = 5050

export function PreIntro({ onDone }: { onDone: () => void }) {
  const [style, setStyle] = useState(0)
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
    }, 650)
  }, [])

  useEffect(() => {
    const t1 = window.setTimeout(() => setStyle(1), STYLE_MS)
    const t2 = window.setTimeout(() => setStyle(2), STYLE_MS * 2)
    const t3 = window.setTimeout(() => setStyle(3), STYLE_MS * 3)
    const exitT = window.setTimeout(() => setExiting(true), EXIT_AT)
    const doneT = window.setTimeout(finish, DONE_AT)
    return () => {
      ;[t1, t2, t3, exitT, doneT].forEach(clearTimeout)
    }
  }, [finish])

  if (done) return null

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-black"
      animate={
        exiting
          ? { opacity: 0, filter: 'blur(16px)' }
          : { opacity: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* faint gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, oklch(0.82 0.14 78 / 0.08), transparent 60%)',
        }}
      />

      <div className="relative flex h-[260px] w-full items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Style 0 — letter cascade (blur-fade up, staggered) */}
          {style === 0 && (
            <motion.div
              key="cascade"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.4 }}
            >
              {NAME.map((word, wi) => (
                <span key={wi} className="inline-flex overflow-hidden">
                  {word.split('').map((ch, ci) => {
                    const idx = wi * 10 + ci
                    return (
                      <motion.span
                        key={ci}
                        className="font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-6xl"
                        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          delay: idx * 0.05,
                          duration: 0.6,
                          ease: EASE,
                        }}
                      >
                        {ch}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </motion.div>
          )}

          {/* Style 1 — word slide stack (staggered from below) */}
          {style === 1 && (
            <motion.div
              key="slide"
              className="flex flex-col items-center"
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.4 }}
            >
              {NAME.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="font-display text-5xl font-700 uppercase leading-tight tracking-[0.05em] text-foreground sm:text-7xl"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.7,
                      ease: EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Style 2 — gradient wipe (gold sweeps across) */}
          {style === 2 && (
            <motion.div
              key="wipe"
              className="relative"
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.4 }}
            >
              <motion.h1
                className="font-display text-4xl font-700 uppercase tracking-[0.08em] text-foreground/15 sm:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                THE DANGAL UNISEX GYM
              </motion.h1>
              <motion.div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: '-110%' }}
                animate={{ x: '110%' }}
                transition={{ duration: 1.4, ease: EASE }}
              >
                <h1
                  className="whitespace-nowrap font-display text-4xl font-700 uppercase tracking-[0.08em] sm:text-6xl"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, oklch(0.9 0.1 85), oklch(0.82 0.14 78), transparent)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  THE DANGAL UNISEX GYM
                </h1>
              </motion.div>
            </motion.div>
          )}

          {/* Style 3 — scale punch (huge → normal, gold) + real logo */}
          {style === 3 && (
            <motion.div
              key="punch"
              className="flex flex-col items-center"
              exit={{ opacity: 0, filter: 'blur(14px)' }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="mb-5 h-24 w-20 overflow-hidden rounded-xl ring-2 ring-primary/50 glow-gold sm:h-28 sm:w-24"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              >
                <Image
                  src="/gym/logo-v2.jpg"
                  alt="The Dangal Unisex Gym logo"
                  width={96}
                  height={112}
                  className="h-full w-auto object-cover"
                  priority
                />
              </motion.div>
              <motion.h1
                className="font-display text-4xl font-700 uppercase leading-none tracking-tight text-gradient-gold sm:text-6xl"
                initial={{ scale: 2.4, opacity: 0, filter: 'blur(20px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                The Dangal
              </motion.h1>
              <motion.p
                className="mt-3 font-display text-base font-600 uppercase tracking-[0.55em] text-foreground/60 sm:text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              >
                Unisex Gym
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* progress: 4 dots for 4 styles */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full"
            animate={{
              backgroundColor:
                style >= i ? '#e0a93a' : 'rgba(255, 255, 255, 0.15)',
              scale: style >= i ? 1.3 : 1,
            }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        ))}
      </div>

      {/* Skip — since pre-intro plays every load */}
      <button
        onClick={finish}
        className="absolute bottom-6 right-6 z-10 text-[10px] uppercase tracking-[0.3em] text-foreground/35 transition-colors duration-300 hover:text-foreground/80"
      >
        Skip
      </button>
    </motion.div>
  )
}
