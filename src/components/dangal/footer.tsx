'use client'

import { MapPin, Phone, Clock, Instagram, RotateCcw } from 'lucide-react'
import Image from 'next/image'

export function Footer({ onReplayIntro }: { onReplayIntro?: () => void }) {
  return (
    <footer className="mt-auto border-t border-white/8 bg-card/40 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/50 glow-gold-sm">
              <Image
                src="/gym/logo-v2.jpg"
                alt="The Dangal Unisex Gym"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              The Dangal
            </span>
          </div>
          <p className="font-deva mt-3 text-sm text-muted-foreground">
            थे दंगल यूनिसेक्स जिम — Train. Fight. Rise.
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/the_dangal_unisex_gym', label: 'Instagram' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Visit */}
        <div>
          <h4 className="font-display text-sm font-600 uppercase tracking-wider text-foreground">
            Visit the Akhada
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              1-279/12 Sangam Vihar, Shanti Bazar Road (Near Police Chowki) New Delhi - 110052
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              9911552013
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              Open 6 days a week
            </li>
          </ul>
        </div>

        {/* Motto */}
        <div>
          <h4 className="font-display text-sm font-600 uppercase tracking-wider text-foreground">
            The Code
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>· Discipline over motivation</li>
            <li>· Show up on the hard days</li>
            <li>· Strong body, still mind</li>
            <li>· Leave no rep behind</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} The Dangal Unisex Gym. Forged in the akhada.</p>
        {onReplayIntro && (
          <button
            onClick={onReplayIntro}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw className="h-3 w-3" />
            Replay intro
          </button>
        )}
      </div>
    </footer>
  )
}
