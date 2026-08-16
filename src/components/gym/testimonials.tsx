'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { testimonials } from '@/lib/gym-data'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(t)
  }, [paused])

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)

  const active = testimonials[index]

  return (
    <section id="stories" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Transformations"
          title={
            <>
              Real people. <span className="text-gradient-flame">Real iron.</span>
            </>
          }
          subtitle="Thousands have walked in uncertain and walked out unbreakable. Here are a few of their stories."
        />

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto mt-14 max-w-4xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-8 backdrop-blur sm:p-12">
              <Quote className="absolute right-6 top-6 h-20 w-20 text-primary/10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: active.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="mt-5 font-display text-2xl font-500 leading-snug text-foreground sm:text-3xl">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#ff4d00] font-display text-sm font-700 text-black">
                      {active.initials}
                    </div>
                    <div>
                      <div className="font-600 text-foreground">{active.name}</div>
                      <div className="text-sm text-primary">{active.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === index ? 28 : 8,
                      background:
                        i === index
                          ? 'var(--primary)'
                          : 'oklch(1 0 0 / 20%)',
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
