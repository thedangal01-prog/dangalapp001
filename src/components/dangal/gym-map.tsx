'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, ExternalLink, Instagram } from 'lucide-react'
import { Reveal } from './reveal'

const GYM_NAME = 'The Dangal Unisex Gym'
const GYM_ADDRESS = '1-279/12 Sangam Vihar, Shanti Bazar Road (Near Police Chowki) New Delhi - 110052'
const GYM_PHONE = '9911552013'
const GYM_HOURS = 'Open 6 days a week'
const GYM_INSTAGRAM = 'https://www.instagram.com/the_dangal_unisex_gym'

// Google Maps embed (no API key needed) — search by gym name + area
const MAP_QUERY = encodeURIComponent('The Dangal Unisex Gym Sangam Vihar New Delhi 110052')
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

export function GymMap() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <MapPin className="h-3 w-3" />
          Find Us
        </span>
        <h2 className="mt-4 font-display text-3xl font-700 uppercase tracking-tight text-foreground sm:text-4xl">
          Visit the <span className="text-gradient-gold">Akhada</span>
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Located in Sangam Vihar, Delhi. Walk in for your 1-day free trial today.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Map embed */}
        <Reveal>
          <motion.div
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/50 backdrop-blur"
          >
            <iframe
              title="The Dangal Unisex Gym location on Google Maps"
              src={MAP_EMBED}
              className="h-[340px] w-full sm:h-[420px]"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) contrast(0.9) saturate(0.7)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute right-3 top-3 flex gap-2">
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-600 text-foreground backdrop-blur transition-colors hover:bg-primary/20 hover:text-primary"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open in Maps
              </a>
            </div>
          </motion.div>
        </Reveal>

        {/* Visit info + directions + instagram */}
        <Reveal delay={0.05}>
          <div className="flex h-full flex-col gap-4">
            {/* Address card */}
            <div className="rounded-2xl border border-white/8 bg-card/50 p-6 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Address
                  </div>
                  <div className="mt-1 text-sm font-500 text-foreground">
                    {GYM_ADDRESS}
                  </div>
                </div>
              </div>
            </div>

            {/* Hours + phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/8 bg-card/50 p-5 backdrop-blur">
                <Clock className="h-5 w-5 text-primary" />
                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Hours
                </div>
                <div className="text-sm font-600 text-foreground">{GYM_HOURS}</div>
              </div>
              <a
                href={`tel:${GYM_PHONE}`}
                className="rounded-2xl border border-white/8 bg-card/50 p-5 backdrop-blur transition-colors hover:border-primary/30"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Call
                </div>
                <div className="text-sm font-600 text-foreground">{GYM_PHONE}</div>
              </a>
            </div>

            {/* Directions button */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-5 py-4 text-base font-600 text-black hover:opacity-90 glow-gold-sm"
            >
              <Navigation className="h-4 w-4" />
              Get directions
            </a>

            {/* Instagram */}
            <a
              href={GYM_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-gradient-to-r from-[oklch(0.6_0.22_25)]/15 to-card/50 p-5 backdrop-blur transition-colors hover:border-[oklch(0.6_0.22_25)]/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.6_0.22_25)] via-[oklch(0.55_0.2_300)] to-[oklch(0.7_0.18_70)] text-white">
                <Instagram className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Follow us
                </div>
                <div className="truncate text-sm font-600 text-foreground">
                  @the_dangal_unisex_gym
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
