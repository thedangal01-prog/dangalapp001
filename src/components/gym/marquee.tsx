'use client'

const items = [
  'Strength',
  'HIIT',
  'Boxing',
  'Endurance',
  'Mobility',
  'Recovery',
  'Powerlifting',
  'Conditioning',
  'Nutrition',
  'Mindset',
]

export function Marquee() {
  return (
    <div className="relative border-y border-white/10 bg-gradient-to-r from-primary/10 via-background to-primary/10 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <div key={`${dup}-${i}`} className="flex items-center">
                <span className="font-display px-6 text-2xl font-700 uppercase tracking-tight text-foreground/80 sm:text-3xl">
                  {it}
                </span>
                <span className="text-2xl text-primary sm:text-3xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
