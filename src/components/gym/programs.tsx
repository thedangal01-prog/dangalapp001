'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Reveal, SectionHeading, TiltCard } from './reveal'
import { programs } from '@/lib/gym-data'
import { cn } from '@/lib/utils'

const intensityStyle: Record<string, string> = {
  Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  High: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Extreme: 'bg-red-500/15 text-red-300 border-red-500/30',
}

export function Programs() {
  return (
    <section id="programs" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <SectionHeading
            align="left"
            eyebrow="Training Programs"
            title={
              <>
                Pick your <span className="text-gradient-flame">battle.</span>
              </>
            }
            subtitle="Six signature programs, each led by specialists who live and breathe the craft."
          />
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <TiltCard
                intensity={10}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/70 p-7 backdrop-blur transition-colors hover:border-primary/50"
              >
                {/* Accent glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `${p.accent}40` }}
                />

                <div className="relative [transform:translateZ(40px)]">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}30, transparent)`,
                      }}
                    >
                      <p.icon className="h-7 w-7" style={{ color: p.accent }} strokeWidth={2} />
                    </div>
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-[10px] font-600 uppercase tracking-wider',
                        intensityStyle[p.intensity]
                      )}
                    >
                      {p.intensity}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-700 uppercase tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  <p className="text-sm font-500 uppercase tracking-wider text-primary/80">
                    {p.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {p.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: p.accent }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {p.duration}
                    </span>
                    <motion.a
                      href="#pricing"
                      whileHover={{ x: 3, y: -3 }}
                      className="flex items-center gap-1 text-sm font-600 text-foreground transition-colors hover:text-primary"
                    >
                      Train
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
