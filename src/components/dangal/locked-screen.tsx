'use client'

import { motion } from 'framer-motion'
import { Lock, LogIn, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Shown when a non-logged-in user tries to access a locked tab.
 * (Resources, AI Coach, Metrics require signup.)
 */
export function LockedScreen({
  title,
  onLogin,
  onSignup,
}: {
  title: string
  onLogin: () => void
  onSignup: () => void
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10 glow-gold-sm">
          <Lock className="h-9 w-9 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-3xl font-700 uppercase tracking-tight text-foreground"
      >
        {title} is <span className="text-gradient-gold">locked</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-3 max-w-sm text-sm text-muted-foreground"
      >
        Sign up for free to unlock {title}, the AI Coach, workout tracker, and
        all premium features. No payment needed — just a 1-day free trial.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Button
          onClick={onSignup}
          className="h-12 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-6 text-base font-600 text-black hover:opacity-90 glow-gold-sm"
        >
          <Sparkles className="mr-1.5 h-4 w-4" />
          Sign up free
        </Button>
        <Button
          onClick={onLogin}
          variant="outline"
          className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-base font-500 hover:bg-white/10"
        >
          <LogIn className="mr-1.5 h-4 w-4" />
          I already have an account
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-xs text-muted-foreground"
      >
        🔒 Your data is safe. We only use it to personalize your training.
      </motion.p>
    </div>
  )
}
