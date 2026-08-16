'use client'

import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from './reveal'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Clock, User } from 'lucide-react'
import { schedule, scheduleTypeColor } from '@/lib/gym-data'

const days = Object.keys(schedule)

export function Schedule() {
  return (
    <section id="schedule" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Weekly Roster"
          title={
            <>
              Show up. <span className="text-gradient-flame">Every day.</span>
            </>
          }
          subtitle="120+ live classes a week. Tap a day and lock in your battle plan."
        />

        <Reveal delay={0.1}>
          <Tabs defaultValue="Mon" className="mt-12">
            <div className="scroll-slim -mx-4 overflow-x-auto px-4 pb-2">
              <TabsList className="inline-flex h-auto gap-1 rounded-2xl border border-white/10 bg-card/60 p-1.5 backdrop-blur">
                {days.map((d) => (
                  <TabsTrigger
                    key={d}
                    value={d}
                    className="rounded-xl px-5 py-2.5 text-sm font-600 uppercase tracking-wider data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-[#ff4d00] data-[state=active]:text-black data-[state=active]:shadow-lg"
                  >
                    {d}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {days.map((d) => (
              <TabsContent key={d} value={d} className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {schedule[d].map((c, i) => {
                    const color = scheduleTypeColor[c.type]
                    return (
                      <motion.div
                        key={`${d}-${i}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur transition-colors hover:border-primary/40"
                      >
                        <div
                          className="absolute left-0 top-0 h-full w-1"
                          style={{ background: color }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="font-display text-2xl font-700 text-foreground">
                            {c.time}
                          </span>
                          <span
                            className="rounded-full border px-2.5 py-0.5 text-[10px] font-600 uppercase tracking-wider"
                            style={{
                              color,
                              borderColor: `${color}40`,
                              background: `${color}15`,
                            }}
                          >
                            {c.type}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-600 uppercase tracking-tight text-foreground">
                          {c.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {c.coach}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {c.duration} min
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}
