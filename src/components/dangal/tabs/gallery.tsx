'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Images, X } from 'lucide-react'
import { Reveal } from '../reveal'
import { GymMap } from '../gym-map'

type Shot = {
  src: string
  title: string
  caption: string
  span?: 'tall' | 'wide' | 'normal'
}

const shots: Shot[] = [
  {
    src: '/gym/reception.jpg',
    title: 'The Reception',
    caption: 'Where every Dangal journey begins.',
    span: 'tall',
  },
  {
    src: '/gym/interior-1.jpg',
    title: 'Main Floor',
    caption: 'Red & black — the colours of intensity.',
    span: 'wide',
  },
  {
    src: '/gym/equipment.jpg',
    title: 'The Arsenal',
    caption: 'Competition-grade iron, always ready.',
    span: 'normal',
  },
  {
    src: '/gym/interior-2.jpg',
    title: 'Free Weights',
    caption: 'Dumbbells from 2kg to 50kg.',
    span: 'normal',
  },
  {
    src: '/gym/interior-3.jpg',
    title: 'Training Bay',
    caption: 'Mirrors, benches and focus.',
    span: 'tall',
  },
  {
    src: '/gym/interior-4.jpg',
    title: 'Open Floor',
    caption: 'Space to move, lift and conquer.',
    span: 'wide',
  },
]

export function GalleryTab() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-600 uppercase tracking-[0.2em] text-primary">
          <Images className="h-3 w-3" />
          Inside the Akhada
        </span>
        <h1 className="mt-4 font-display text-4xl font-700 uppercase tracking-tight text-foreground sm:text-5xl">
          The <span className="text-gradient-gold">Dangal</span> gallery
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Step inside our temple of iron. Real photographs from the floor — this
          is where champions are forged.
        </p>
      </Reveal>

      {/* Masonry-ish grid */}
      <div className="mt-8 grid auto-rows-[220px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((s, i) => (
          <Reveal key={s.src} delay={i * 0.05}>
            <motion.button
              whileHover={{ y: -4 }}
              onClick={() => setActive(i)}
              className={`group relative h-full w-full overflow-hidden rounded-2xl border border-white/8 ${
                s.span === 'tall'
                  ? 'row-span-2'
                  : s.span === 'wide'
                    ? 'col-span-2'
                    : ''
              }`}
            >
              <img
                src={s.src}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <h3 className="font-display text-base font-700 uppercase tracking-tight text-foreground sm:text-lg">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.caption}
                </p>
              </div>
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <Images className="h-4 w-4" />
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* Map + visit info + instagram */}
      <GymMap />

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              key={active}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={shots[active].src}
                alt={shots[active].title}
                className="max-h-[85vh] w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="font-display text-2xl font-700 uppercase tracking-tight text-foreground">
                  {shots[active].title}
                </h3>
                <p className="text-sm text-muted-foreground">{shots[active].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
