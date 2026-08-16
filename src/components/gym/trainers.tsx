'use client'

import { Reveal, SectionHeading } from './reveal'
import { trainers } from '@/lib/gym-data'

export function Trainers() {
  return (
    <section id="coaches" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Forge Masters"
          title={
            <>
              Coaches who <span className="text-gradient-flame">demand more</span>
            </>
          }
          subtitle="Certified, battle-tested, relentlessly invested in your progress. Your goals are their craft."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                {/* Portrait placeholder with initials */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${t.accent}30, transparent 60%), linear-gradient(160deg, oklch(0.24 0.01 264), oklch(0.16 0.01 264))`,
                    }}
                  />
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-display text-7xl font-700 uppercase tracking-tight opacity-90"
                      style={{ color: t.accent }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-600 uppercase tracking-wider text-foreground/80 backdrop-blur">
                    {t.experience}
                  </span>
                </div>

                <div className="relative -mt-6 p-5">
                  <h3 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                    {t.name}
                  </h3>
                  <p className="text-sm font-500 text-primary">{t.role}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {t.specialty}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                    {t.stats.map((s) => (
                      <div key={s.label}>
                        <div
                          className="font-display text-lg font-700"
                          style={{ color: t.accent }}
                        >
                          {s.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
