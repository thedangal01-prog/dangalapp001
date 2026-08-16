'use client'

import { motion } from 'framer-motion'
import {
  Dumbbell,
  HeartPulse,
  Target,
  Sparkles,
  Users,
  Trophy,
  Zap,
  Shield,
} from 'lucide-react'
import { Reveal } from './reveal'

const features = [
  {
    icon: Dumbbell,
    title: 'Competition-Grade Iron',
    text: 'Eleiko, Rogue and Technogym kit across 3,000 sq ft. Never wait for a rack.',
    accent: '#e0a93a',
  },
  {
    icon: Sparkles,
    title: 'AI Coach Dangal',
    text: 'Workout plans, diet plans & 24/7 chat — your personal AI trainer, free.',
    accent: '#d6452a',
  },
  {
    icon: HeartPulse,
    title: 'Recovery Suite',
    text: 'Sauna, ice bath, compression and stretch lab to rebuild you stronger.',
    accent: '#7fb069',
  },
  {
    icon: Target,
    title: 'Data-Driven Plans',
    text: 'InBody scans, VO2 & lactate testing feed your coach a living program.',
    accent: '#e0c14a',
  },
  {
    icon: Users,
    title: 'Elite Coaching',
    text: 'Owner Amit Sharma & trainer Arnav Pathak — certified, battle-tested.',
    accent: '#8a8fd6',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    text: '1000+ members transformed. Real stories, real strength, real discipline.',
    accent: '#c97ae0',
  },
]

const stats = [
  { value: '12+', label: 'Years' },
  { value: '1000+', label: 'Members' },
  { value: '6', label: 'Days/week' },
  { value: '₹1000', label: 'From/mo' },
]

export function WhyDangal3D() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Floating glow blobs (Om Sharma portfolio style) */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full animate-float-blob"
        style={{
          background: 'oklch(0.82 0.14 78 / 0.12)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full animate-float-blob"
        style={{
          background: 'oklch(0.6 0.22 25 / 0.1)',
          filter: 'blur(120px)',
          animationDelay: '4s',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Glowing section title */}
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Zap className="h-3 w-3" />
              Why Dangal
            </span>
            <h2 className="section-title-glow mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Built different. <span className="text-gradient-gold animate-glow-pulse-3d">Built to win.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              Not just a gym. An akhada where champions are forged — with AI,
              elite coaching and competition-grade equipment.
            </p>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-700 text-gradient-gold sm:text-4xl">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 3D tilt cards */}
        <div className="scene-3d mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="card-3d group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur"
                style={{
                  boxShadow: `0 0 20px ${f.accent}22`,
                }}
              >
                {/* glow on hover */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: f.accent }}
                />
                <div className="relative" style={{ transform: 'translateZ(40px)' }}>
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
                    style={{
                      background: `${f.accent}1a`,
                      borderColor: `${f.accent}40`,
                      boxShadow: `0 0 20px ${f.accent}33`,
                    }}
                  >
                    <f.icon className="h-7 w-7" style={{ color: f.accent }} />
                  </div>
                  <h3 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Floating CTA card */}
        <Reveal delay={0.15}>
          <div className="animate-float-card mt-14 mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/60 to-background p-8 backdrop-blur text-center sm:p-12">
            <Shield className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-700 uppercase tracking-tight text-foreground sm:text-3xl">
              The Dangal <span className="text-gradient-gold">Promise</span>
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Walk in soft. Walk out a pehlwan. 1-day free trial, no card needed.
              Your strongest self starts today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-block rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 py-3 text-sm font-600 text-black transition-transform hover:-translate-y-0.5 glow-gold-sm"
              >
                Claim 1-day free trial
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open 6 days a week
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
