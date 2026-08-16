'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Crown,
  Flame,
  Sparkles,
  Check,
  ArrowRight,
  Loader2,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Reveal } from '../reveal'
import { cn } from '@/lib/utils'

type Plan = {
  id: string
  name: string
  price: number
  originalPrice?: number
  blurb: string
  features: string[]
  highlighted?: boolean
  accent: string
  icon: typeof Sparkles
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 1000,
    originalPrice: 1200,
    blurb: 'Flexibility first. Start your journey.',
    features: [
      'Full gym access (6 days/week)',
      'All equipment & free weights',
      'Locker & changing rooms',
      '1 group class / week',
      'Special discount: ₹200 off',
    ],
    accent: '#7fb069',
    icon: Sparkles,
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 3000,
    originalPrice: 3600,
    blurb: 'Commit 3 months. See real change.',
    features: [
      'Everything in Monthly',
      'Unlimited group classes',
      '1 PT session / month',
      'Fitness assessment',
      'Special discount: ₹600 off',
    ],
    highlighted: true,
    accent: '#e0a93a',
    icon: Flame,
  },
]

const perks = [
  { value: '1000+', label: 'Members trained' },
  { value: '12+', label: 'Years coaching' },
  { value: '6 days', label: 'Open weekly' },
  { value: '1 day', label: 'Free trial' },
]

export function MembershipTab() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [plan, setPlan] = useState('Forge')

  async function join(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: `${phone}@dangal.member`, // lead API expects email; map phone
          goal: `Join ${plan} plan`,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed')
      toast({
        title: 'Welcome to the akhada! 🔥',
        description: `${name.split(' ')[0]}, our team will call you within 24h.`,
      })
      setName('')
      setPhone('')
    } catch (err) {
      toast({
        title: 'Could not submit',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Crown className="h-3 w-3" />
          Join the Akhada
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Become a <span className="text-gradient-gold">Dangal</span> member
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Three plans. One mission — your transformation. Every membership starts
          with a free 1-day trial. No contracts, no lock-in.
        </p>
      </Reveal>

      {/* Perks strip */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {perks.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.05}>
            <div className="rounded-2xl border border-white/8 bg-card/50 p-5 text-center backdrop-blur">
              <div className="font-display text-3xl font-700 text-gradient-gold">
                {p.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {p.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Plans */}
      <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.08} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={cn(
                'relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur',
                plan.highlighted
                  ? 'border-primary/60 bg-gradient-to-b from-primary/15 to-card/70 glow-gold lg:scale-[1.03]'
                  : 'border-white/8 bg-card/50'
              )}
            >
              {plan.highlighted && (
                <>
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                  <span className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-black">
                    Most Popular
                  </span>
                </>
              )}
              <div className="relative">
                <div
                  className={cn(
                    'mb-4 flex h-12 w-12 items-center justify-center rounded-xl border',
                    plan.highlighted
                      ? 'border-primary/40 bg-primary/15'
                      : 'border-white/10 bg-white/5'
                  )}
                >
                  <plan.icon
                    className="h-6 w-6"
                    style={{ color: plan.accent }}
                  />
                </div>
                <h3 className="font-display text-2xl font-700 uppercase tracking-tight text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
                <div className="mt-5 flex items-end gap-2">
                  {plan.originalPrice && (
                    <span className="mb-1.5 text-lg text-muted-foreground line-through">
                      ₹{plan.originalPrice}
                    </span>
                  )}
                  <span className="font-display text-4xl font-700 text-foreground">
                    ₹{plan.price}
                  </span>
                  <span className="mb-1.5 text-sm text-muted-foreground">/mo</span>
                </div>
                {plan.originalPrice && (
                  <div className="mt-1">
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-600 text-emerald-400">
                      Save ₹{plan.originalPrice - plan.price}
                    </span>
                  </div>
                )}
              </div>
              <ul className="relative mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-5">
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
        ))}
      </div>

      {/* Join form + gym image */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-white/8 glass-strong">
        <div className="grid lg:grid-cols-2">
          {/* Form */}
          <div className="p-8 sm:p-12">
            <Reveal>
              <h2 className="font-display text-3xl font-700 uppercase tracking-tight text-foreground">
                Claim your <span className="text-gradient-gold">free trial</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Drop your details. A coach calls you within 24h to schedule your
                first session.
              </p>
              <form onSubmit={join} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="m-name" className="text-xs uppercase tracking-wider">
                    Full name
                  </Label>
                  <Input
                    id="m-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="h-12 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="m-phone" className="text-xs uppercase tracking-wider">
                    Phone
                  </Label>
                  <Input
                    id="m-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 ..."
                    className="h-12 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">
                    Interested plan
                  </Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5 focus:ring-primary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                      {plans.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name} — ₹{p.price}/mo
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-base font-600 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Start free trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  No card required. 1-day free trial. Cancel anytime.
                </p>
              </form>
            </Reveal>
          </div>

          {/* Image + visit info */}
          <div className="relative min-h-[320px] border-t border-white/10 lg:border-l lg:border-t-0">
            <img
              src="/gym/reception.jpg"
              alt="The Dangal Unisex Gym reception"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                Visit the akhada
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  1-279/12 Sangam Vihar, Shanti Bazar Road
                  <br />
                  (Near Police Chowki) New Delhi - 110052
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  Open 6 days a week
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  9911552013
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
