'use client'

import { Check, Crown, Sparkles, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from './reveal'
import { Button } from '@/components/ui/button'
import { plans } from '@/lib/gym-data'
import { cn } from '@/lib/utils'

const planIcon = {
  spark: Sparkles,
  forge: Rocket,
  apex: Crown,
} as const

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Membership"
          title={
            <>
              Invest in your <span className="text-gradient-flame"> strongest self</span>
            </>
          }
          subtitle="No contracts. Cancel anytime. Every plan starts with a free 7-day trial."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = planIcon[plan.id as keyof typeof planIcon]
            return (
              <Reveal key={plan.id} delay={i * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur',
                    plan.highlighted
                      ? 'border-primary/60 bg-gradient-to-b from-primary/15 to-card/70 glow-flame lg:scale-[1.03]'
                      : 'border-white/10 bg-card/60'
                  )}
                >
                  {plan.highlighted && (
                    <>
                      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                      <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-primary to-[#ff4d00] px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-black">
                        Most Popular
                      </span>
                    </>
                  )}

                  <div className="relative">
                    <div
                      className={cn(
                        'mb-5 flex h-12 w-12 items-center justify-center rounded-xl border',
                        plan.highlighted
                          ? 'border-primary/40 bg-primary/15'
                          : 'border-white/10 bg-white/5'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-6 w-6',
                          plan.highlighted ? 'text-primary' : 'text-foreground/80'
                        )}
                      />
                    </div>

                    <h3 className="font-display text-2xl font-700 uppercase tracking-tight text-foreground">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>

                    <div className="mt-6 flex items-end gap-1">
                      <span className="font-display text-5xl font-700 text-foreground">
                        ${plan.price}
                      </span>
                      <span className="mb-1.5 text-sm text-muted-foreground">
                        {plan.cadence}
                      </span>
                    </div>

                    <Button
                      asChild
                      className={cn(
                        'mt-6 w-full rounded-full py-3 text-sm font-600',
                        plan.highlighted
                          ? 'bg-gradient-to-r from-primary to-[#ff4d00] text-black hover:opacity-90 glow-flame-sm'
                          : 'border border-white/15 bg-white/5 text-foreground hover:bg-white/10'
                      )}
                    >
                      <a href="#contact">{plan.cta}</a>
                    </Button>
                  </div>

                  <ul className="relative mt-7 space-y-3 border-t border-white/10 pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span
                          className={cn(
                            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                            plan.highlighted ? 'bg-primary/20' : 'bg-white/10'
                          )}
                        >
                          <Check
                            className={cn(
                              'h-2.5 w-2.5',
                              plan.highlighted ? 'text-primary' : 'text-foreground'
                            )}
                            strokeWidth={3}
                          />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Corporate & student discounts available · Free 7-day trial on every plan · No hidden fees
          </p>
        </Reveal>
      </div>
    </section>
  )
}
