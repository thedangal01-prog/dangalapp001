'use client'

import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'

/**
 * HeroBodybuilder — a dramatic BLACK full-body muscular builder character
 * (SVG silhouette with gold rim-light) that flexes and "comes alive" on the
 * home hero. Surrounded by energy aura, shockwaves, orbiting weights and
 * sparkles. The owner's name "AMIT SHARMA" badges it.
 *
 * Built from layered SVG paths: head, neck, traps, deltoids, biceps,
 * forearms, chest, abs, obliques, quads, calves — all in deep charcoal
 * with gold rim-light strokes for a "lit from behind" dramatic look.
 */
export function HeroBodybuilder() {
  return (
    <div className="relative mx-auto flex h-[460px] w-full max-w-md items-center justify-center sm:h-[540px]">
      {/* Rotating energy rings */}
      <motion.div
        className="absolute h-80 w-80 rounded-full border border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'transparent' }}
      />
      <motion.div
        className="absolute h-96 w-96 rounded-full border border-[oklch(0.6_0.22_25)]/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ borderBottomColor: 'oklch(0.6 0.22 25)', borderLeftColor: 'transparent' }}
      />

      {/* Pulsing flame aura */}
      <motion.div
        className="absolute h-72 w-72 rounded-full"
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, oklch(0.82 0.14 78 / 0.22), oklch(0.6 0.22 25 / 0.1), transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Shockwave pulses */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-44 w-44 rounded-full border-2 border-primary/35"
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
        />
      ))}

      {/* The bodybuilder figure */}
      <motion.svg
        viewBox="0 0 240 440"
        className="relative h-[420px] w-auto drop-shadow-[0_10px_40px_oklch(0.82_0.14_78/0.4)] sm:h-[480px]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          {/* Deep charcoal body fill */}
          <linearGradient id="bodyG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.22 0.01 264)" />
            <stop offset="50%" stopColor="oklch(0.12 0.01 264)" />
            <stop offset="100%" stopColor="oklch(0.06 0 0)" />
          </linearGradient>
          {/* Gold rim light */}
          <linearGradient id="rimG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.9 0.1 85)" />
            <stop offset="50%" stopColor="oklch(0.82 0.14 78)" />
            <stop offset="100%" stopColor="oklch(0.66 0.16 55)" />
          </linearGradient>
          <linearGradient id="beltG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.9 0.1 85)" />
            <stop offset="100%" stopColor="oklch(0.66 0.16 55)" />
          </linearGradient>
        </defs>

        {/* ===== HEAD ===== */}
        <ellipse cx="120" cy="48" rx="30" ry="34" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        {/* Hair / topknot (jooda — wrestler style) */}
        <path d="M92 30 Q120 6 148 30 Q142 16 120 14 Q98 16 92 30 Z" fill="oklch(0.04 0 0)" />
        <circle cx="120" cy="12" r="8" fill="url(#beltG)" />
        {/* Headband */}
        <rect x="88" y="38" width="64" height="9" rx="2" fill="url(#beltG)" />
        {/* Fierce eyes (gold glow) */}
        <motion.ellipse
          cx="108" cy="52" rx="4" ry="2.5" fill="oklch(0.82 0.14 78)"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="132" cy="52" rx="4" ry="2.5" fill="oklch(0.82 0.14 78)"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Brow (angry) */}
        <path d="M100 44 L116 47 M124 47 L140 44" stroke="oklch(0.04 0 0)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Mustache */}
        <path d="M104 66 Q120 73 136 66 Q128 71 120 70 Q112 71 104 66 Z" fill="oklch(0.04 0 0)" />
        {/* Shouting mouth */}
        <ellipse cx="120" cy="76" rx="7" ry="5" fill="oklch(0.2 0.05 25)" />

        {/* ===== NECK (thick) ===== */}
        <path d="M104 80 L136 80 L142 100 L98 100 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />

        {/* ===== TRAPS ===== */}
        <path d="M98 100 Q120 94 142 100 L160 108 Q120 102 80 108 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />

        {/* ===== DELTOIDS (shoulders — big round) ===== */}
        <motion.ellipse
          cx="78" cy="118" rx="20" ry="18" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2"
          animate={{ ry: [18, 20, 18] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="162" cy="118" rx="20" ry="18" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2"
          animate={{ ry: [18, 20, 18] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ===== TORSO (V-taper) ===== */}
        <path
          d="M82 116 Q120 110 158 116 L168 180 Q150 200 120 200 Q90 200 72 180 Z"
          fill="url(#bodyG)"
          stroke="url(#rimG)"
          strokeWidth="1.2"
        />
        {/* Chest definition (pecs) */}
        <motion.path
          d="M92 128 Q108 146 120 142 Q132 146 148 128"
          stroke="oklch(0.3 0.05 264)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M92 128 Q108 146 120 142 Q132 146 148 128', 'M92 130 Q108 150 120 146 Q132 150 148 130', 'M92 128 Q108 146 120 142 Q132 146 148 128'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Sternum line */}
        <line x1="120" y1="142" x2="120" y2="180" stroke="oklch(0.3 0.05 264)" strokeWidth="1.5" />
        {/* Abs (6-pack) */}
        <path d="M104 158 Q120 166 136 158 M104 172 Q120 180 136 172 M106 186 Q120 194 134 186" stroke="oklch(0.3 0.05 264)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Oblique lines */}
        <path d="M88 150 L96 180 M152 150 L144 180" stroke="oklch(0.3 0.05 264)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ===== LEFT ARM — flexing bicep curl up (front pose) ===== */}
        <motion.g
          animate={{ rotate: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '82px 120px' }}
        >
          {/* bicep (bulging) */}
          <motion.ellipse
            cx="64" cy="132" rx="14" ry="20"
            fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2"
            animate={{ ry: [20, 24, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* forearm up */}
          <path d="M52 122 Q40 100 50 80 L66 86 Q60 108 70 130 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />
          {/* fist */}
          <circle cx="54" cy="80" r="10" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        </motion.g>

        {/* ===== RIGHT ARM — flexing (mirror) ===== */}
        <motion.g
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '158px 120px' }}
        >
          <motion.ellipse
            cx="176" cy="132" rx="14" ry="20"
            fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2"
            animate={{ ry: [20, 24, 20] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M188 122 Q200 100 190 80 L174 86 Q180 108 170 130 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />
          <circle cx="186" cy="80" r="10" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        </motion.g>

        {/* ===== DANGAL BELT (gold championship) ===== */}
        <rect x="78" y="198" width="84" height="13" rx="2" fill="url(#beltG)" />
        <text x="120" y="208" textAnchor="middle" fontSize="9" fontWeight="800" fill="oklch(0.1 0.01 264)" letterSpacing="1">DANGAL</text>
        {/* Belt buckle */}
        <rect x="112" y="200" width="16" height="9" rx="1" fill="oklch(0.1 0.01 264)" />

        {/* ===== LEGS (massive quads) ===== */}
        {/* Left quad */}
        <path d="M92 211 L78 320 L98 326 L108 214 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        {/* Right quad */}
        <path d="M148 211 L162 320 L142 326 L132 214 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        {/* Quad definition */}
        <path d="M93 220 L97 310 M147 220 L143 310" stroke="oklch(0.3 0.05 264)" strokeWidth="1.5" fill="none" />
        {/* Knees */}
        <ellipse cx="88" cy="324" rx="8" ry="5" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />
        <ellipse cx="152" cy="324" rx="8" ry="5" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1" />

        {/* ===== CALVES ===== */}
        <path d="M82 330 L74 410 L92 414 L96 332 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        <path d="M158 330 L166 410 L148 414 L144 332 Z" fill="url(#bodyG)" stroke="url(#rimG)" strokeWidth="1.2" />
        {/* Calf definition */}
        <path d="M84 340 Q80 370 88 395 M156 340 Q160 370 152 395" stroke="oklch(0.3 0.05 264)" strokeWidth="1.5" fill="none" />

        {/* ===== FEET ===== */}
        <ellipse cx="82" cy="420" rx="14" ry="7" fill="oklch(0.04 0 0)" />
        <ellipse cx="158" cy="420" rx="14" ry="7" fill="oklch(0.04 0 0)" />
      </motion.svg>

      {/* Orbiting dumbbell icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            x: [Math.cos((i * 120 * Math.PI) / 180) * 170, Math.cos(((i * 120 + 180) * Math.PI) / 180) * 170, Math.cos((i * 120 * Math.PI) / 180) * 170],
            y: [Math.sin((i * 120 * Math.PI) / 180) * 170, Math.sin(((i * 120 + 180) * Math.PI) / 180) * 170, Math.sin((i * 120 * Math.PI) / 180) * 170],
            rotate: [0, 360],
          }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      ))}

      {/* Rising sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{ left: `${10 + i * 7}%`, top: `${30 + (i % 5) * 14}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.6, 0],
            y: [0, -30, -60],
          }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeOut' }}
        />
      ))}

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-4 h-3 w-44 rounded-full bg-primary/20 blur-md"
        animate={{ scaleX: [1, 0.82, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Owner name badge — floats below the figure */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-black/60 px-4 py-1.5 backdrop-blur glow-gold-sm">
            <Crown />
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

function Crown() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      animate={{ rotate: [0, -8, 8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M3 18h18M3 18l2-10 5 5 2-8 2 8 5-5 2 10"
        fill="none"
        stroke="oklch(0.82 0.14 78)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}
