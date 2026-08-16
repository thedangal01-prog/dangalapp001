'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Play, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero3D } from './hero-3d'
import { stats } from '@/lib/gym-data'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-background"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-radial-flame" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* 3D scene */}
      <div className="absolute inset-0">
        <Hero3D />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Next-Gen Fitness Temple
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[15vw] font-700 uppercase leading-[0.85] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[8.5rem]"
          >
            Train
            <br />
            <span className="text-gradient-flame">Beyond</span> Limits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            Forge your strongest self inside a 3,000m² performance cathedral.
            Elite coaching, competition-grade iron, and recovery built for
            warriors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-gradient-to-r from-primary to-[#ff4d00] px-8 text-base font-600 text-black hover:opacity-90 glow-flame"
            >
              <a href="#pricing">
                Start Free Trial
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-white/15 bg-white/5 px-8 text-base font-500 backdrop-blur hover:bg-white/10"
            >
              <a href="#programs">
                <Play className="mr-1 h-4 w-4 fill-current" />
                Explore Programs
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur md:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative flex flex-col items-center justify-center gap-1 bg-background/30 px-4 py-6 text-center transition-colors hover:bg-primary/5"
            >
              <s.icon className="mb-1 h-5 w-5 text-primary/70" />
              <span className="font-display text-3xl font-700 text-foreground sm:text-4xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
