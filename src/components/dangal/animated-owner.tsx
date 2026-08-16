'use client'

import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'

/**
 * "Crazy" animated owner character — a stylized muscular pehlwan figure
 * built from SVG + framer-motion. Cycles through dramatic flexing poses
 * with energy effects (flame aura, shockwaves, floating weights, sparkles).
 */
export function AnimatedOwner() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-sm items-center justify-center">
      {/* Rotating energy rings behind */}
      <motion.div
        className="absolute h-72 w-72 rounded-full border border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ borderTopColor: 'oklch(0.82 0.14 78)', borderRightColor: 'transparent' }}
      />
      <motion.div
        className="absolute h-80 w-80 rounded-full border border-[oklch(0.6_0.22_25)]/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ borderBottomColor: 'oklch(0.6 0.22 25)', borderLeftColor: 'transparent' }}
      />

      {/* Pulsing flame aura */}
      <motion.div
        className="absolute h-64 w-64 rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle, oklch(0.82 0.14 78 / 0.25), oklch(0.6 0.22 25 / 0.12), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Shockwave pulses */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-40 w-40 rounded-full border-2 border-primary/40"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* The character — flexing pehlwan */}
      <motion.svg
        viewBox="0 0 200 280"
        className="relative h-[360px] w-auto drop-shadow-[0_8px_30px_oklch(0.82_0.14_78/0.35)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <linearGradient id="skinG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.7 0.12 60)" />
            <stop offset="100%" stopColor="oklch(0.55 0.1 45)" />
          </linearGradient>
          <linearGradient id="muscleG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.13 55)" />
            <stop offset="100%" stopColor="oklch(0.45 0.1 40)" />
          </linearGradient>
          <linearGradient id="goldG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.9 0.1 85)" />
            <stop offset="50%" stopColor="oklch(0.82 0.14 78)" />
            <stop offset="100%" stopColor="oklch(0.66 0.16 55)" />
          </linearGradient>
        </defs>

        {/* Head */}
        <ellipse cx="100" cy="42" rx="26" ry="30" fill="url(#skinG)" />
        {/* Hair / topknot */}
        <path d="M74 28 Q100 8 126 28 Q120 18 100 16 Q80 18 74 28 Z" fill="#1a1208" />
        <circle cx="100" cy="14" r="7" fill="url(#goldG)" />
        {/* Headband */}
        <rect x="72" y="34" width="56" height="8" rx="2" fill="url(#goldG)" />
        {/* Eyes (fierce) */}
        <path d="M86 46 l10 3 M114 49 l10 -3" stroke="#1a1208" strokeWidth="2.5" strokeLinecap="round" />
        {/* Mustache */}
        <path d="M84 58 Q100 64 116 58 Q108 62 100 61 Q92 62 84 58 Z" fill="#1a1208" />
        {/* Mouth (shout) */}
        <ellipse cx="100" cy="68" rx="6" ry="4" fill="#3a1010" />

        {/* Neck */}
        <rect x="90" y="70" width="20" height="16" fill="url(#skinG)" />

        {/* Torso (V-taper, muscular) */}
        <path
          d="M62 86 Q100 80 138 86 L132 150 Q100 158 68 150 Z"
          fill="url(#muscleG)"
        />
        {/* Chest definition */}
        <motion.path
          d="M78 96 Q92 112 100 108 Q108 112 122 96"
          stroke="oklch(0.3 0.08 40)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ d: ['M78 96 Q92 112 100 108 Q108 112 122 96', 'M78 98 Q92 116 100 112 Q108 116 122 98', 'M78 96 Q92 112 100 108 Q108 112 122 96'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Abs */}
        <path d="M100 110 L100 148 M88 120 Q100 126 112 120 M88 134 Q100 140 112 134" stroke="oklch(0.3 0.08 40)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* LEFT ARM — flexing (bicep curl up) */}
        <motion.g
          animate={{ rotate: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '62px 92px' }}
        >
          {/* shoulder */}
          <circle cx="62" cy="92" r="13" fill="url(#muscleG)" />
          {/* bicep (bulging) */}
          <motion.ellipse
            cx="50" cy="100" rx="11" ry="15"
            fill="url(#muscleG)"
            animate={{ ry: [15, 18, 15] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* forearm up to hand */}
          <path d="M42 92 Q30 80 38 64 L50 70 Q48 86 56 98 Z" fill="url(#skinG)" />
          {/* fist */}
          <circle cx="42" cy="64" r="8" fill="url(#skinG)" />
        </motion.g>

        {/* RIGHT ARM — flexing (mirror) */}
        <motion.g
          animate={{ rotate: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '138px 92px' }}
        >
          <circle cx="138" cy="92" r="13" fill="url(#muscleG)" />
          <motion.ellipse
            cx="150" cy="100" rx="11" ry="15"
            fill="url(#muscleG)"
            animate={{ ry: [15, 18, 15] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path d="M158 92 Q170 80 162 64 L150 70 Q152 86 144 98 Z" fill="url(#skinG)" />
          <circle cx="158" cy="64" r="8" fill="url(#skinG)" />
        </motion.g>

        {/* Dangal belt (gold) */}
        <rect x="66" y="148" width="68" height="10" rx="2" fill="url(#goldG)" />
        <text x="100" y="156" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a1208">DANGAL</text>

        {/* Legs (stance) */}
        <path d="M82 158 L74 240 L86 244 L94 160 Z" fill="url(#muscleG)" />
        <path d="M118 158 L126 240 L114 244 L106 160 Z" fill="url(#muscleG)" />
        {/* Feet */}
        <ellipse cx="78" cy="246" rx="10" ry="5" fill="#1a1208" />
        <ellipse cx="122" cy="246" rx="10" ry="5" fill="#1a1208" />
      </motion.svg>

      {/* Floating dumbbell icons orbiting */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            x: [Math.cos((i * 120 * Math.PI) / 180) * 150, Math.cos(((i * 120 + 180) * Math.PI) / 180) * 150, Math.cos((i * 120 * Math.PI) / 180) * 150],
            y: [Math.sin((i * 120 * Math.PI) / 180) * 150, Math.sin(((i * 120 + 180) * Math.PI) / 180) * 150, Math.sin((i * 120 * Math.PI) / 180) * 150],
            rotate: [0, 360],
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{ left: `${15 + i * 9}%`, top: `${20 + (i % 4) * 18}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-6 h-3 w-40 rounded-full bg-primary/20 blur-md"
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
