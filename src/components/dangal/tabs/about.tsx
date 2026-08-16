'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Crown,
  Award,
  Target,
  Flame,
  Heart,
  Shield,
  Dumbbell,
  TrendingUp,
  Quote,
  MapPin,
} from 'lucide-react'
import { Reveal } from '../reveal'
import { HeroLogo } from '../hero-logo'

const stats = [
  { value: '12+', label: 'Years coaching', icon: Award, accent: '#e0a93a' },
  { value: '1000+', label: 'Members trained', icon: TrendingUp, accent: '#7fb069' },
  { value: '15+', label: 'Competition wins', icon: Crown, accent: '#d6452a' },
  { value: '6', label: 'Days a week', icon: Flame, accent: '#e0c14a' },
]

const values = [
  {
    icon: Shield,
    title: 'Discipline',
    text: 'The akhada demands it. We show up — every day, every rep, no excuses.',
  },
  {
    icon: Heart,
    title: 'Care',
    text: 'Every member is family. Your form, your safety, your progress — ours.',
  },
  {
    icon: Target,
    title: 'Results',
    text: 'No fluff. Just structured, progressive training that actually works.',
  },
  {
    icon: Flame,
    title: 'Intensity',
    text: 'We train hard. Comfort zones die at the door of the Dangal.',
  },
]

const branches = [
  {
    name: 'Sangam Vihar',
    gymName: 'The Dangal Unisex Gym',
    area: 'Main Branch',
    address:
      '1-279/12 Sangam Vihar, Shanti Bazar Road (Near Police Chowki) New Delhi - 110052',
    phone: '9911552013',
    hours: 'Open 6 days a week',
    status: 'Active',
    tag: 'Premium · Modern Equipment · AI-Powered',
  },
  {
    name: 'In Front of The Dangal',
    gymName: 'Chauhan Body Temple Health Club',
    area: 'Sister Branch',
    address:
      'In front of The Dangal Unisex Gym, Sangam Vihar, Shanti Bazar Road, New Delhi - 110052',
    phone: '9911552013',
    hours: 'Open 6 days a week',
    status: 'Active',
    tag: 'Old School Gym · Budget Friendly · Authentic Akhada Vibe',
  },
]

export function AboutTab() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="flex items-start gap-5">
          {/* Real gym logo */}
          <span className="relative hidden h-24 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-primary/40 glow-gold-sm sm:inline-block">
            <Image
              src="/gym/logo-v2.jpg"
              alt="The Dangal Unisex Gym"
              width={80}
              height={96}
              className="h-full w-auto object-cover"
            />
          </span>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
              <Crown className="h-3 w-3" />
              About the Akhada
            </span>
            <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
              Our <span className="text-gradient-gold">story</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Born in Sangam Vihar, Delhi — The Dangal Unisex Gym is more than a
              gym. It&apos;s an akhada where wrestlers, lifters and everyday
              warriors forge their strongest selves.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="rounded-2xl border border-white/8 bg-card/50 p-5 text-center backdrop-blur">
              <s.icon className="mx-auto h-5 w-5" style={{ color: s.accent }} />
              <div className="mt-2 font-display text-3xl font-700 text-foreground">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Owner feature with animated gym logo */}
      <Reveal delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/60 to-background p-8 backdrop-blur sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Animated gym logo */}
            <div className="order-2 lg:order-1">
              <HeroLogo />
            </div>

            {/* Owner text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-black">
                  Owner &amp; Head Coach
                </span>
              </div>
              <h2 className="mt-4 font-display text-5xl font-700 uppercase tracking-tight text-foreground sm:text-6xl">
                Amit <span className="text-gradient-gold">Sharma</span>
              </h2>
              <p className="font-deva mt-1 text-lg text-muted-foreground">
                अमित शर्मा
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                A former competitive wrestler turned master coach, Amit founded
                The Dangal Unisex Gym with one mission — to bring the raw,
                disciplined spirit of the traditional akhada to modern fitness.
                With over a decade on the mat and in the weight room, he has
                sculpted hundreds of bodies and forged countless minds.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                His philosophy is simple: <span className="font-600 text-foreground">train hard, train smart, never quit</span>.
                Every program at Dangal carries his signature blend of
                wrestling conditioning, progressive strength and unshakeable
                mindset.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Wrestling', 'Strength', 'Conditioning', 'Nutrition', 'Mindset'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-500 text-foreground/80"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <blockquote className="mt-6 border-l-2 border-primary pl-4">
                <Quote className="mb-1 h-4 w-4 text-primary/60" />
                <p className="font-deva text-base text-foreground/90">
                  &ldquo;ताकत शरीर में नहीं, ज़िद में है।&rdquo;
                </p>
                <p className="mt-1 text-xs italic text-muted-foreground">
                  Strength is not in the body, it is in the stubbornness. — Amit Sharma
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Secondary trainer */}
      <Reveal delay={0.1}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/8 bg-card/50 p-8 backdrop-blur sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            {/* Avatar */}
            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 30%, oklch(0.6 0.22 25 / 0.4), transparent 60%), linear-gradient(160deg, oklch(0.24 0.01 264), oklch(0.16 0.01 264))',
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="font-display text-6xl font-700 uppercase text-gradient-gold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  AP
                </motion.span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
            </div>

            {/* Trainer text */}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/15 px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-[oklch(0.8_0.18_25)]">
                  Trainer
                </span>
              </div>
              <h2 className="mt-3 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
                Arnav <span className="text-gradient-danger">Pathak</span>
              </h2>
              <p className="font-deva mt-1 text-base text-muted-foreground">
                अर्णव पाठक
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Arnav is the engine of the Dangal training floor. A certified
                strength &amp; conditioning specialist, he runs the daily
                classes, fixes technique on the fly and pushes members past
                limits they didn&apos;t know they had. Equal parts coach,
                motivator and form-technician.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Strength & Conditioning', 'HIIT', 'Form Coaching', 'Mobility'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-500 text-foreground/80"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Values */}
      <div className="mt-12">
        <Reveal>
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground sm:text-4xl">
            What we <span className="text-gradient-gold">stand for</span>
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-card/50 p-6 backdrop-blur transition-colors hover:border-primary/30"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <v.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-700 uppercase tracking-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Our Branches */}
      <div className="mt-12">
        <Reveal>
          <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground sm:text-4xl">
            Our <span className="text-gradient-gold">branches</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            The Dangal akhada is growing. Train with us today in Delhi — and soon in Ghaziabad.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {branches.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-card/50 p-6 backdrop-blur transition-colors hover:border-primary/30"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <span
                      className={
                        b.status === 'Active'
                          ? 'rounded-full border border-[oklch(0.7_0.15_145)]/40 bg-[oklch(0.7_0.15_145)]/15 px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-[oklch(0.85_0.18_145)]'
                          : 'rounded-full border border-[oklch(0.82_0.14_78)]/40 bg-[oklch(0.82_0.14_78)]/15 px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-primary'
                      }
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-600 uppercase tracking-[0.2em] text-muted-foreground">
                    {b.area}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-700 uppercase tracking-tight text-foreground">
                    {b.gymName}
                  </h3>
                  <p className="mt-1 text-xs font-500 text-primary">{b.tag}</p>
                  <p className="mt-3 flex items-start gap-1.5 text-sm leading-relaxed text-muted-foreground">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {b.address}
                  </p>
                  <div className="mt-4 flex flex-col gap-1.5 border-t border-white/8 pt-4 text-xs text-muted-foreground">
                    {b.phone && (
                      <span className="flex items-center gap-1.5">
                        <span aria-hidden>📞</span>
                        {b.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden>🕐</span>
                      {b.hours}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mission banner */}
      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-card/80 to-background p-10 text-center sm:p-14">
          <Dumbbell className="mx-auto h-10 w-10 text-primary" />
          <p className="mx-auto mt-5 max-w-2xl font-display text-2xl font-600 uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
            We don&apos;t sell memberships. <br />
            We <span className="text-gradient-gold">forge athletes.</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Walk in soft. Walk out a pehlwan. That&apos;s the Dangal promise.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
