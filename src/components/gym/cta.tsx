'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, MapPin, Phone, Mail } from 'lucide-react'
import { Reveal } from './reveal'
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
import { Background3D } from './hero-3d'

export function CTA() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [goal, setGoal] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, goal }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Request failed')
      }
      toast({
        title: 'You\'re in! 🔥',
        description: data.message,
      })
      setName('')
      setEmail('')
      setGoal('')
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
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      {/* 3D background */}
      <div className="absolute inset-0 opacity-50">
        <Background3D />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 glass-strong">
          <div className="grid lg:grid-cols-2">
            {/* Left: pitch */}
            <div className="relative p-8 sm:p-12">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Free 7-Day Trial
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-4xl font-700 uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
                  Your first <span className="text-gradient-flame">rep</span> starts now
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Drop your details and a coach will build your trial week —
                  tailored to your goal, schedule and starting point.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-center gap-3 text-foreground/85">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    42 Forge Street, Downtown District
                  </li>
                  <li className="flex items-center gap-3 text-foreground/85">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary">
                      <Phone className="h-4 w-4" />
                    </span>
                    +1 (555) 020-IRON
                  </li>
                  <li className="flex items-center gap-3 text-foreground/85">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    join@ironpulse.gym
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Right: form */}
            <div className="border-t border-white/10 bg-background/40 p-8 backdrop-blur sm:p-12 lg:border-l lg:border-t-0">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-wider">
                    Full name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Alex Carter"
                    className="h-12 rounded-xl border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="alex@email.com"
                    className="h-12 rounded-xl border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider">Primary goal</Label>
                  <Select value={goal} onValueChange={setGoal} required>
                    <SelectTrigger className="h-12 rounded-xl border-white/10 bg-white/5 text-foreground focus:ring-primary/30">
                      <SelectValue placeholder="Choose your target" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-popover/95 backdrop-blur">
                      <SelectItem value="Build muscle">Build muscle</SelectItem>
                      <SelectItem value="Lose fat">Lose fat</SelectItem>
                      <SelectItem value="Get stronger">Get stronger</SelectItem>
                      <SelectItem value="Improve endurance">Improve endurance</SelectItem>
                      <SelectItem value="Learn boxing">Learn boxing</SelectItem>
                      <SelectItem value="General fitness">General fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[#ff4d00] text-base font-600 text-black hover:opacity-90 glow-flame-sm disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Forging your pass…
                    </>
                  ) : (
                    <>
                      Claim my free trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  No card required. Cancel anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
