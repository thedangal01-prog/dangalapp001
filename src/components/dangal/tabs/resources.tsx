'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, ArrowRight, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  resources,
  categoryMeta,
  typeMeta,
  type Resource,
  type ResourceCategory,
} from '@/lib/resources-data'
import { Reveal } from '../reveal'
import { cn } from '@/lib/utils'

const categories: (ResourceCategory | 'All')[] = [
  'All',
  'Strength',
  'Conditioning',
  'Wrestling',
  'Mobility',
  'Nutrition',
  'Recovery',
  'Mindset',
  'Fat Loss',
  'Yoga',
  'Supplements',
]

export function ResourcesTab() {
  const [cat, setCat] = useState<ResourceCategory | 'All'>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Resource | null>(null)

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const okCat = cat === 'All' || r.category === cat
      const okQ =
        query.trim() === '' ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.blurb.toLowerCase().includes(query.toLowerCase())
      return okCat && okQ
    })
  }, [cat, query])

  function openResource(r: Resource) {
    setActive(r)
    setOpen(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          Free Forever
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          Training <span className="text-gradient-gold">resources</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A growing library of free guides, drills and articles — strength,
          nutrition, mobility, wrestling, mindset and more. No paywalls. Ever.
        </p>
      </Reveal>

      {/* Search + filters */}
      <Reveal delay={0.05}>
        <div className="mt-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides, drills, articles…"
              className="h-11 rounded-full border-white/10 bg-white/5 pl-10 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
            />
          </div>

          <div className="scroll-slim -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            {categories.map((c) => {
              const isActive = cat === c
              const meta = c !== 'All' ? categoryMeta[c] : null
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-600 transition-colors',
                    isActive
                      ? 'border-primary/50 bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black'
                      : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground'
                  )}
                >
                  {meta && <meta.icon className="h-3.5 w-3.5" />}
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r, i) => {
            const meta = categoryMeta[r.category]
            const tmeta = typeMeta[r.type]
            return (
              <motion.button
                key={r.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
                onClick={() => openResource(r)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/50 p-6 text-left backdrop-blur transition-colors hover:border-primary/40"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: meta.color }}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                    style={{ background: `${meta.color}22` }}
                  >
                    <meta.icon className="h-5 w-5" style={{ color: meta.color }} />
                  </span>
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    <tmeta.icon className="mr-1 h-3 w-3" />
                    {tmeta.label}
                  </Badge>
                </div>

                <h3 className="relative mt-4 font-display text-lg font-600 uppercase leading-tight tracking-tight text-foreground">
                  {r.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm text-muted-foreground">
                  {r.blurb}
                </p>

                <div className="relative mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {r.duration}
                  </span>
                  <span className="text-xs font-600 text-primary">
                    Read · {r.level}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">
          No resources match your search.
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto scroll-slim border-white/10 bg-card/95 backdrop-blur-xl sm:max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const meta = categoryMeta[active.category]
                    return (
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                        style={{ background: `${meta.color}22` }}
                      >
                        <meta.icon className="h-5 w-5" style={{ color: meta.color }} />
                      </span>
                    )
                  })()}
                  <div>
                    <DialogTitle className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
                      {active.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-wider text-muted-foreground">
                      {active.category} · {active.level} · {active.duration}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{active.blurb}</p>
                <div className="h-px w-full bg-white/8" />
                <div className="whitespace-pre-line rounded-xl border border-white/8 bg-white/5 p-5 text-sm leading-relaxed text-foreground/90">
                  {active.body}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
