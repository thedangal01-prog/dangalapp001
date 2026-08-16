'use client'

import { Dumbbell, Instagram, Youtube, Twitter, Facebook } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const columns = [
  {
    title: 'Train',
    links: ['Strength', 'HIIT', 'Boxing', 'Endurance', 'Mobility'],
  },
  {
    title: 'Club',
    links: ['Coaches', 'Schedule', 'Pricing', 'Stories', 'Careers'],
  },
  {
    title: 'Support',
    links: ['Contact', 'FAQ', 'Terms', 'Privacy', 'Membership'],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
]

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-card/40 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#ff4d00] glow-flame-sm">
                <Dumbbell className="h-5 w-5 text-black" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                Iron<span className="text-gradient-flame">Pulse</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A next-generation fitness temple. Forge your strongest self — body,
              mind and engine.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-600 uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-600 uppercase tracking-wider text-foreground">
              Join the Pulse
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Weekly training intel, dropped to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <Input
                type="email"
                placeholder="you@email.com"
                className="h-10 rounded-lg border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
              />
              <Button
                type="submit"
                className="h-10 shrink-0 rounded-lg bg-gradient-to-r from-primary to-[#ff4d00] px-4 text-black hover:opacity-90"
              >
                Go
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IronPulse Athletic Co. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with iron, code &amp; caffeine.
          </p>
        </div>
      </div>
    </footer>
  )
}
