'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * HeroOwner — the REAL owner (Amit Sharma) as a transparent cutout,
 * replacing the old 2D SVG bodybuilder. Surrounded by energy effects
 * (rotating rings, flame aura, shockwaves, orbiting icons, sparkles)
 * to keep the "crazy/attractive" vibe while using the actual person.
 */
export function HeroOwner() {
  return (
    <div className="relative mx-auto flex h-[440px] w-full max-w-md items-end justify-center sm:h-[540px]">
      {/* Rotating energy rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'transparent' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.6_0.22_25)]/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ borderBottomColor: 'oklch(0.6 0.22 25)', borderLeftColor: 'transparent' }}
      />

      {/* Pulsing flame aura behind the figure */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-80 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, oklch(0.82 0.14 78 / 0.28), oklch(0.6 0.22 25 / 0.12), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Shockwave pulses */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/35"
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
        />
      ))}

      {/* The real owner cutout — floats gently */}
      <motion.div
        className="relative z-10 h-[420px] w-auto sm:h-[500px]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/gym/amit-transparent.png"
          alt="Amit Sharma — Owner & Head Coach, The Dangal Unisex Gym"
          width={300}
          height={500}
          className="h-full w-auto object-contain drop-shadow-[0_10px_40px_oklch(0.82_0.14_78/0.45)]"
          priority
        />
      </motion.div>

      {/* Orbiting dumbbell icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * 170,
              Math.cos(((i * 120 + 180) * Math.PI) / 180) * 170,
              Math.cos((i * 120 * Math.PI) / 180) * 170,
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * 170,
              Math.sin(((i * 120 + 180) * Math.PI) / 180) * 170,
              Math.sin((i * 120 * Math.PI) / 180) * 170,
            ],
            rotate: [0, 360],
          }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="oklch(0.82 0.14 78)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 9v6M20 9v6M6.5 9v6M17.5 9v6" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Rising sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{ left: `${12 + i * 8}%`, top: `${40 + (i % 4) * 14}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0], y: [0, -30, -60] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.22, ease: 'easeOut' }}
        />
      ))}

      {/* Ground glow */}
      <motion.div
        className="absolute bottom-2 left-1/2 h-3 w-44 -translate-x-1/2 rounded-full bg-primary/25 blur-md"
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Owner name badge */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-black/60 px-4 py-1.5 backdrop-blur glow-gold-sm">
            <motion.svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M3 18h18M3 18l2-10 5 5 2-8 2 8 5-5 2 10" fill="none" stroke="oklch(0.82 0.14 78)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <span className="font-display text-sm font-700 uppercase tracking-[0.2em] text-gradient-gold">
              Amit Sharma
            </span>
          </div>
          <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Owner &amp; Head Coach
          </span>
        </div>
      </motion.div>
    </div>
  )
}
