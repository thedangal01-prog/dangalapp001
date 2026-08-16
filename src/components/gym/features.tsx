'use client'

import { Reveal, SectionHeading, TiltCard } from './reveal'
import { features } from '@/lib/gym-data'

export function Features() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why IronPulse"
          title={
            <>
              Not a gym. <br className="hidden sm:block" />
              A <span className="text-gradient-flame">performance lab.</span>
            </>
          }
          subtitle="Every square metre is engineered to make you faster, stronger and unbreakable — backed by data and obsessed-over detail."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 [transform:translateZ(30px)]">
                    <f.icon className="h-6 w-6 text-primary" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-600 uppercase tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
