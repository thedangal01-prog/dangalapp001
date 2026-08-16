'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Dumbbell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navLinks } from '@/lib/gym-data'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6',
            scrolled
              ? 'glass-strong shadow-lg shadow-black/40'
              : 'border border-transparent'
          )}
        >
          {/* Logo */}
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#ff4d00] glow-flame-sm">
              <Dumbbell className="h-5 w-5 text-black" strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-700 uppercase tracking-tight text-foreground">
              Iron<span className="text-gradient-flame">Pulse</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3 py-2 text-sm font-500 text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              asChild
              className="text-sm font-500 text-muted-foreground hover:text-foreground"
            >
              <a href="#pricing">Sign in</a>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-[#ff4d00] px-5 text-sm font-600 text-black hover:opacity-90 glow-flame-sm"
            >
              <a href="#pricing">Join Now</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-strong mt-2 overflow-hidden rounded-2xl p-2 md:hidden"
            >
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-500 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2 p-2">
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <a href="#pricing">Sign in</a>
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full bg-gradient-to-r from-primary to-[#ff4d00] text-black"
                >
                  <a href="#pricing">Join Now</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
