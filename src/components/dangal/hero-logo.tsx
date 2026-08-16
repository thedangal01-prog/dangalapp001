'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * HeroLogo — the REAL gym logo as the home hero centerpiece, replacing
 * the character. The logo is animated (floats, gentle rotate, gold glow
 * pulse, energy rings, sparkles) with the owner name "AMIT SHARMA" badge.
 */
export function HeroLogo() {
  return (
    <div className="relative mx-auto flex h-[440px] w-full max-w-md items-center justify-center sm:h-[520px]">
      {/* Rotating energy rings */}
      <motion.div
        className="absolute h-80 w-80 rounded-full border border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'transparent' }}
      />
      <motion.div
        className="absolute h-96 w-96 rounded-full border border-[oklch(0.6_0.22_25)]/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ borderBottomColor: 'oklch(0.6 0.22 25)', borderLeftColor: 'transparent' }}
      />

      {/* Pulsing gold aura */}
      <motion.div
        className="absolute h-72 w-72 rounded-full"
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, oklch(0.82 0.14 78 / 0.3), oklch(0.6 0.22 25 / 0.12), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Shockwave pulses */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-44 w-44 rounded-full border-2 border-primary/35"
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.95, ease: 'easeOut' }}
        />
      ))}

      {/* The real gym logo — floats + subtle rotate + gold glow */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* gold sheen sweep over the logo */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
            style={{
              background:
                'linear-gradient(115deg, transparent 30%, oklch(0.9 0.1 85 / 0.45) 50%, transparent 70%)',
            }}
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
          />
          <Image
            src="/gym/logo-transparent.png"
            alt="The Dangal Unisex Gym logo"
            width={280}
            height={350}
            priority
            className="h-[300px] w-auto object-contain drop-shadow-[0_8px_30px_oklch(0.82_0.14_78/0.4)] sm:h-[380px]"
          />
        </motion.div>
      </motion.div>

      {/* Orbiting dumbbell icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            x: [
              Math.cos((i * 120 * Math.PI) / 180) * 175,
              Math.cos(((i * 120 + 180) * Math.PI) / 180) * 175,
              Math.cos((i * 120 * Math.PI) / 180) * 175,
            ],
            y: [
              Math.sin((i * 120 * Math.PI) / 180) * 175,
              Math.sin(((i * 120 + 180) * Math.PI) / 180) * 175,
              Math.sin((i * 120 * Math.PI) / 180) * 175,
            ],
            rotate: [0, 360],
          }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
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

      {/* Owner name badge */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
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
