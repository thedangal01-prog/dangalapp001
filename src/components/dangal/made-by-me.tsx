'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, ExternalLink, Scissors, Brain, Zap } from 'lucide-react'
import { Reveal } from './reveal'

/**
 * "Made by me" credit section — showcases the real creator of this website.
 * Info fetched from Om Sharma's portfolio:
 * https://omsharma-coder.github.io/om-sharma-portfolio/
 */
const DEVELOPER = {
  name: 'Om Sharma',
  role: 'Growth Partner for Creators & Brands',
  tagline:
    'I help creators increase retention, reach and sales using high-performing short videos.',
  portfolio: 'https://omsharma-coder.github.io/om-sharma-portfolio/',
  highlights: [
    { icon: Scissors, label: 'High Retention Editing' },
    { icon: Brain, label: 'AI Strategy' },
    { icon: Zap, label: 'Fast Delivery' },
  ],
}

export function MadeByMe() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Floating glow blobs (portfolio style — purple + pink) */}
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full animate-float-blob"
        style={{ background: 'oklch(0.6 0.2 290 / 0.12)', filter: 'blur(100px)' }}
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-0 h-72 w-72 rounded-full animate-float-blob"
        style={{ background: 'oklch(0.65 0.22 350 / 0.1)', filter: 'blur(100px)', animationDelay: '3s' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Made by
            </span>
            <h2 className="section-title-glow mt-4 font-display text-5xl font-700 uppercase tracking-tight text-foreground sm:text-6xl">
              <span className="text-gradient-gold animate-glow-pulse-3d">Om Sharma</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-500 text-primary sm:text-lg">
              {DEVELOPER.role}
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {DEVELOPER.tagline}
            </p>
          </div>
        </Reveal>

        {/* Main card with avatar + highlights */}
        <Reveal delay={0.05}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="scene-3d mt-10"
          >
            <div className="card-3d animate-float-card relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/60 to-background p-8 backdrop-blur sm:p-12">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
                style={{ background: 'oklch(0.82 0.14 78 / 0.45)' }}
              />
              <div
                className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: 'oklch(0.6 0.22 25 / 0.3)' }}
              />
              <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                {/* Avatar / monogram */}
                <motion.div
                  whileHover={{ rotateY: 8, rotateX: 3, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary to-[oklch(0.66_0.16_55)] glow-gold"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="font-display text-5xl font-700 text-black">OS</span>
                  <motion.span
                    className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.6_0.22_25)] text-white"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.span>
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground">
                    {DEVELOPER.name}
                  </h3>
                  <p className="text-sm font-500 text-primary sm:text-base">{DEVELOPER.role}</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {DEVELOPER.tagline}
                  </p>

                  {/* Highlights */}
                  <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {DEVELOPER.highlights.map((h) => (
                      <span
                        key={h.label}
                        className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-600 text-foreground/85"
                      >
                        <h.icon className="h-3.5 w-3.5 text-primary" />
                        {h.label}
                      </span>
                    ))}
                  </div>

                  {/* Portfolio CTA */}
                  <div className="mt-6">
                    <a
                      href={DEVELOPER.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 py-3 text-sm font-700 text-black transition-transform hover:-translate-y-0.5 glow-gold-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Full Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Bottom credit strip */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 fill-[oklch(0.6_0.22_25)] text-[oklch(0.6_0.22_25)]" />
              <span>
                This website was designed &amp; developed by{' '}
                <a
                  href={DEVELOPER.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-600 text-primary hover:underline"
                >
                  Om Sharma
                </a>{' '}
                — Growth Partner
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/70">
              © 2026 Om Sharma · The Dangal Unisex Gym
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
