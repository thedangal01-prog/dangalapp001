'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Sparkles,
  Library,
  Activity,
  Flame,
  Dumbbell,
  Menu,
  X,
  Images,
  Scale,
  Crown,
  Users,
  LogIn,
  LogOut,
  UserCircle,
  Bot,
  Heart,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useGymStore, currentStreak, isTodayActive } from '@/store/gym-store'
import { useAuthStore } from '@/store/auth-store'
import { IntroLoader } from './intro-loader'
import { AuthModal } from './auth-modal'
import { LockedScreen } from './locked-screen'
import { HomeTab } from './tabs/home'
import { AssistantTab } from './tabs/assistant'
import { ResourcesTab } from './tabs/resources'
import { TrackerTab } from './tabs/tracker'
import { StreakTab } from './tabs/streak'
import { GalleryTab } from './tabs/gallery'
import { MetricsTab } from './tabs/metrics'
import { MembershipTab } from './tabs/membership'
import { AboutTab } from './tabs/about'
import { CardioTab } from './tabs/cardio'
import { Footer } from './footer'

type TabId =
  | 'home'
  | 'about'
  | 'assistant'
  | 'tracker'
  | 'metrics'
  | 'cardio'
  | 'streak'
  | 'resources'
  | 'gallery'
  | 'join'

const TABS: { id: TabId; label: string; icon: typeof Home; short?: string }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Users },
  { id: 'assistant', label: 'AI Coach', icon: Bot },
  { id: 'tracker', label: 'Tracker', icon: Activity },
  { id: 'cardio', label: 'Cardio', icon: Heart },
  { id: 'metrics', label: 'Metrics', icon: Scale },
  { id: 'streak', label: 'Streak', icon: Flame },
  { id: 'resources', label: 'Resources', icon: Library },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'join', label: 'Join', icon: Crown },
]

export function AppShell() {
  // hasMounted — prevents hydration mismatch from localStorage-based stores
  const [hasMounted, setHasMounted] = useState(false)
  // ONE intro — plays every page load, skippable, replayable via footer.
  const [introDone, setIntroDone] = useState(false)
  const [tab, setTab] = useState<TabId>('home')
  const [mobileNav, setMobileNav] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true)
  }, [])

  function handleDone() {
    setIntroDone(true)
  }
  function replayIntro() {
    setIntroDone(false)
    setTab('home')
  }

  const workouts = useGymStore((s) => s.workouts)
  const streak = currentStreak(workouts)
  const todayActive = isTodayActive(workouts)
  const member = useAuthStore((s) => s.member)
  const setMember = useAuthStore((s) => s.setMember)
  const setStoreMember = useGymStore((s) => s.setMember)

  // keep gym store memberName in sync with auth
  useEffect(() => {
    if (member) setStoreMember(member.name, member.plan)
  }, [member, setStoreMember])

  function openLogin() {
    setAuthMode('login')
    setAuthOpen(true)
  }
  function openSignup() {
    setAuthMode('signup')
    setAuthOpen(true)
  }
  function logout() {
    setMember(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnimatePresence>
        {!introDone && <IntroLoader onDone={handleDone} />}
      </AnimatePresence>

      {/* App content — smoothly fades in after intro */}
      <motion.div
        className="flex min-h-screen flex-col"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Brand — real gym logo with shine effect */}
          <button
            onClick={() => setTab('home')}
            className="group relative flex items-center gap-2.5"
          >
            <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-primary/50 glow-gold-sm">
              <Image
                src="/gym/logo-v2.jpg"
                alt="The Dangal Unisex Gym"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
              {/* Shining sweep effect on navbar logo */}
              <motion.span
                className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-full mix-blend-screen"
                style={{
                  background:
                    'linear-gradient(110deg, transparent 30%, oklch(0.95 0.08 85 / 0.6) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0%', '-100% 0%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-base font-700 uppercase tracking-tight text-foreground">
                The Dangal
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Unisex Gym
              </span>
            </span>
          </button>

          {/* Desktop tabs */}
          <nav className="scroll-slim hidden items-center gap-0.5 overflow-x-auto md:flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-500 transition-colors',
                  tab === t.id
                    ? 'text-black'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <t.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{t.label}</span>
                {t.id === 'streak' && streak > 0 && (
                  <span className="ml-0.5 rounded-full bg-[oklch(0.6_0.22_25)] px-1.5 py-0.5 text-[10px] font-700 text-white">
                    {streak}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right: streak chip + auth + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('streak')}
              className={cn(
                'hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-600 transition-colors sm:flex',
                todayActive
                  ? 'border-[oklch(0.6_0.22_25)]/40 bg-[oklch(0.6_0.22_25)]/15 text-[oklch(0.8_0.18_25)]'
                  : 'border-white/10 bg-white/5 text-muted-foreground'
              )}
              title={todayActive ? 'Today trained!' : 'Train today to keep your streak'}
            >
              <Flame
                className={cn('h-3.5 w-3.5', todayActive && 'fill-current')}
              />
              {hasMounted ? `${streak}d` : '0d'}
            </button>

            {/* Auth: logged out → Login + Sign up; logged in → name + logout */}
            {/* Only render after mount to prevent hydration mismatch with localStorage */}
            {!hasMounted ? (
              <div className="hidden items-center gap-1.5 sm:flex">
                <button className="rounded-full px-3 py-1.5 text-xs font-600 text-muted-foreground">
                  Log in
                </button>
                <button className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-4 py-1.5 text-xs font-700 text-black">
                  <LogIn className="h-3.5 w-3.5" />
                  Sign up
                </button>
              </div>
            ) : member ? (
              <div className="hidden items-center gap-1.5 sm:flex">
                <button
                  onClick={() => setTab('tracker')}
                  className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-600 text-primary"
                  title={member.email}
                >
                  <UserCircle className="h-3.5 w-3.5" />
                  <span className="max-w-[100px] truncate">
                    {member.name.split(' ')[0]}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-[oklch(0.6_0.22_25)]/40 hover:text-[oklch(0.8_0.18_25)]"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-1.5 sm:flex">
                <button
                  onClick={openLogin}
                  className="rounded-full px-3 py-1.5 text-xs font-600 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </button>
                <button
                  onClick={openSignup}
                  className="flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-4 py-1.5 text-xs font-700 text-black hover:opacity-90"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Sign up
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileNav((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
              aria-label="Toggle navigation"
            >
              {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileNav && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/8 md:hidden"
            >
              <div className="grid grid-cols-2 gap-2 p-3">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTab(t.id)
                      setMobileNav(false)
                    }}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-600 transition-colors',
                      tab === t.id
                        ? 'bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] text-black'
                        : 'bg-white/5 text-muted-foreground'
                    )}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </button>
                ))}
              </div>
              {/* Mobile auth */}
              <div className="border-t border-white/8 p-3">
                {member ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm text-foreground">
                      <UserCircle className="h-4 w-4 text-primary" />
                      {member.name}
                    </span>
                    <button
                      onClick={() => {
                        logout()
                        setMobileNav(false)
                      }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-600 text-muted-foreground"
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        openLogin()
                        setMobileNav(false)
                      }}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-600 text-foreground"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => {
                        openSignup()
                        setMobileNav(false)
                      }}
                      className="flex-1 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.66_0.16_55)] px-4 py-3 text-sm font-700 text-black"
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'home' && <HomeTab onNavigate={setTab} />}
            {tab === 'about' && <AboutTab />}
            {tab === 'assistant' && (!hasMounted || !member ? <LockedScreen title="AI Coach" onLogin={openLogin} onSignup={openSignup} /> : <AssistantTab />)}
            {tab === 'tracker' && (!hasMounted || !member ? <LockedScreen title="Tracker" onLogin={openLogin} onSignup={openSignup} /> : <TrackerTab onGoStreak={() => setTab('streak')} />)}
            {tab === 'cardio' && (!hasMounted || !member ? <LockedScreen title="Cardio" onLogin={openLogin} onSignup={openSignup} /> : <CardioTab />)}
            {tab === 'metrics' && (!hasMounted || !member ? <LockedScreen title="Metrics" onLogin={openLogin} onSignup={openSignup} /> : <MetricsTab />)}
            {tab === 'streak' && <StreakTab onGoTracker={() => setTab('tracker')} />}
            {tab === 'resources' && (!hasMounted || !member ? <LockedScreen title="Resources" onLogin={openLogin} onSignup={openSignup} /> : <ResourcesTab />)}
            {tab === 'gallery' && <GalleryTab />}
            {tab === 'join' && <MembershipTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onReplayIntro={replayIntro} />

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} initialMode={authMode} />
      </motion.div>
    </div>
  )
}
