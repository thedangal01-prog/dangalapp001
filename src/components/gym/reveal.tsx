'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/**
 * A 3D tilt-on-hover card. Tracks pointer to rotate the inner layer,
 * with a glare highlight. Pure CSS transform for buttery performance.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * intensity).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * intensity).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${(px * 100 + 50).toFixed(1)}%`)
    el.style.setProperty('--my', `${(py * 100 + 50).toFixed(1)}%`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="[transform-style:preserve-3d] [perspective:900px] transition-transform duration-200 ease-out"
      style={{
        transform: 'rotateX(var(--rx,0)) rotateY(var(--ry,0))',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(0.01px)] group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mx,50%) var(--my,50%), oklch(0.85 0.18 70 / 0.18), transparent 55%)',
        }}
      />
      <div className={className}>{children}</div>
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
}) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-2xl text-center'
          : 'max-w-2xl text-left'
      }
    >
      {eyebrow && (
        <Reveal>
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-700 uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
