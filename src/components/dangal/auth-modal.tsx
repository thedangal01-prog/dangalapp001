'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, LogIn, UserPlus } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/auth-store'

export function AuthModal({
  open,
  onOpenChange,
  initialMode = 'login',
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  initialMode?: 'login' | 'signup'
}) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // Sync mode when modal opens with the correct initialMode
  useEffect(() => {
    if (open) setMode(initialMode)
  }, [open, initialMode])

  const { setMember } = useAuthStore()
  const { toast } = useToast()

  function reset() {
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login'
      const payload =
        mode === 'signup'
          ? { name, email, phone: phone || undefined, password }
          : { email, password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      setMember(data.member)
      toast({
        title: mode === 'signup' ? 'Welcome to the akhada! 🔥' : `Welcome back, ${data.member.name.split(' ')[0]}!`,
        description:
          mode === 'signup'
            ? 'Your 1-day free trial starts now.'
            : 'You are logged in.',
      })
      reset()
      onOpenChange(false)
    } catch (err) {
      toast({
        title: mode === 'signup' ? 'Sign up failed' : 'Login failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!loading) onOpenChange(v)
      }}
    >
      <DialogContent className="border-white/10 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 h-16 w-14 overflow-hidden rounded-xl ring-1 ring-primary/50 glow-gold-sm">
            <Image
              src="/gym/logo-v2.jpg"
              alt="The Dangal Unisex Gym logo"
              width={56}
              height={64}
              className="h-full w-auto object-cover"
            />
          </div>
          <DialogTitle className="text-center font-display text-2xl font-700 uppercase tracking-tight text-foreground">
            {mode === 'login' ? 'Welcome back' : 'Join the Dangal'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'login'
              ? 'Log in to your account to continue training.'
              : 'Sign up and get a 1-day free trial. No card needed.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="mt-3 space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  <Label htmlFor="auth-name" className="text-xs uppercase tracking-wider">
                    Full name
                  </Label>
                  <Input
                    id="auth-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <Label htmlFor="auth-email" className="text-xs uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
            />
          </div>

          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                key="phone-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  <Label htmlFor="auth-phone" className="text-xs uppercase tracking-wider">
                    Phone (optional)
                  </Label>
                  <Input
                    id="auth-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <Label htmlFor="auth-pw" className="text-xs uppercase tracking-wider">
              Password
            </Label>
            <Input
              id="auth-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              minLength={6}
              className="h-11 rounded-xl border-white/10 bg-white/5 placeholder:text-muted-foreground/60 focus-visible:border-primary/60 focus-visible:ring-primary/30"
            />
            {mode === 'signup' && (
              <p className="text-[11px] text-muted-foreground">Min 6 characters.</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-base font-600 text-black hover:opacity-90 glow-gold-sm disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : mode === 'login' ? (
              <LogIn className="mr-2 h-4 w-4" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {loading
              ? 'Please wait…'
              : mode === 'login'
                ? 'Log in'
                : 'Create account'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'login' ? (
            <>
              No account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-600 text-primary hover:underline"
              >
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already a member?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-600 text-primary hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
