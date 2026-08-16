import {
  Dumbbell,
  HeartPulse,
  Flame,
  Users,
  Clock,
  Zap,
  Trophy,
  Target,
  Bike,
  PersonStanding,
  Swords,
  Waves,
  type LuIcon,
} from 'lucide-react'

export type Program = {
  id: string
  name: string
  tagline: string
  description: string
  icon: LuIcon
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme'
  duration: string
  perks: string[]
  accent: string
}

export const programs: Program[] = [
  {
    id: 'strength',
    name: 'Iron Strength',
    tagline: 'Build raw power',
    description:
      'Progressive overload barbell training engineered to maximise force output and dense muscle.',
    icon: Dumbbell,
    intensity: 'High',
    duration: '60 min',
    perks: ['Free-weight focus', '1RM tracking', 'Spotter network'],
    accent: '#ff7a18',
  },
  {
    id: 'hiit',
    name: 'Pulse HIIT',
    tagline: 'Burn. Rest. Repeat.',
    description:
      'Explosive intervals that torch calories and spike metabolism for 36 hours post-session.',
    icon: Flame,
    intensity: 'Extreme',
    duration: '45 min',
    perks: ['Afterburn effect', 'Heart-rate zones', 'Coach-led'],
    accent: '#ff4d00',
  },
  {
    id: 'cardio',
    name: 'Endurance Lab',
    tagline: 'Outlast yourself',
    description:
      'Zone-2 and threshold cycling & rowing to forge an unstoppable aerobic engine.',
    icon: Bike,
    intensity: 'Medium',
    duration: '50 min',
    perks: ['VO2 testing', 'Smart ergs', 'Lactate analysis'],
    accent: '#ffae5a',
  },
  {
    id: 'boxing',
    name: 'Combat Forge',
    tagline: 'Hands of fire',
    description:
      'Technique, footwork and conditioning on heavy bags with former pro pugilists.',
    icon: Swords,
    intensity: 'High',
    duration: '55 min',
    perks: ['Bag + mitt work', 'Defensive drills', 'Sparring optional'],
    accent: '#ff5a00',
  },
  {
    id: 'mobility',
    name: 'Flow Mobility',
    tagline: 'Move like water',
    description:
      'Joint integrity, fascial release and breathwork to bulletproof your body.',
    icon: Waves,
    intensity: 'Low',
    duration: '40 min',
    perks: ['Injury prevention', 'Recovery focus', 'Guided breathwork'],
    accent: '#ffd9a0',
  },
  {
    id: 'personal',
    name: '1:1 Coaching',
    tagline: 'Your private edge',
    description:
      'Fully bespoke programming with a dedicated elite coach and weekly check-ins.',
    icon: Target,
    intensity: 'High',
    duration: 'Flexible',
    perks: ['Custom plan', 'Nutrition support', '24/7 access'],
    accent: '#ff7a18',
  },
]

export type Trainer = {
  id: string
  name: string
  role: string
  specialty: string
  experience: string
  initials: string
  accent: string
  stats: { label: string; value: string }[]
}

export const trainers: Trainer[] = [
  {
    id: 't1',
    name: 'Marcus Vale',
    role: 'Head Strength Coach',
    specialty: 'Powerlifting · Hypertrophy',
    experience: '12 yrs',
    initials: 'MV',
    accent: '#ff7a18',
    stats: [
      { label: 'Athletes coached', value: '340+' },
      { label: 'Nat. medals', value: '7' },
    ],
  },
  {
    id: 't2',
    name: 'Aria Knox',
    role: 'HIIT & Conditioning',
    specialty: 'Metcon · Endurance',
    experience: '9 yrs',
    initials: 'AK',
    accent: '#ff4d00',
    stats: [
      { label: 'Classes led', value: '4.2k' },
      { label: 'Avg burn', value: '720kcal' },
    ],
  },
  {
    id: 't3',
    name: 'Diego Santos',
    role: 'Combat Coach',
    specialty: 'Boxing · Muay Thai',
    experience: '15 yrs',
    initials: 'DS',
    accent: '#ffae5a',
    stats: [
      { label: 'Pro bouts', value: '28' },
      { label: 'Title holders', value: '5' },
    ],
  },
  {
    id: 't4',
    name: 'Lena Park',
    role: 'Mobility & Recovery',
    specialty: 'Fascia · Breathwork',
    experience: '8 yrs',
    initials: 'LP',
    accent: '#ffd9a0',
    stats: [
      { label: 'Certifications', value: '6' },
      { label: 'Recovery hrs', value: '9k' },
    ],
  },
]

export type Plan = {
  id: string
  name: string
  price: number
  cadence: string
  blurb: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const plans: Plan[] = [
  {
    id: 'spark',
    name: 'Spark',
    price: 29,
    cadence: '/mo',
    blurb: 'Everything you need to ignite the habit.',
    features: [
      'Off-peak gym access',
      '2 group classes / week',
      'Locker & towel service',
      'Fitness assessment monthly',
    ],
    cta: 'Start Spark',
  },
  {
    id: 'forge',
    name: 'Forge',
    price: 59,
    cadence: '/mo',
    blurb: 'The complete training arsenal for serious progress.',
    features: [
      '24/7 unlimited gym access',
      'Unlimited group classes',
      '1 monthly PT session',
      'Recovery suite (sauna + ice)',
      'Nutrition starter plan',
    ],
    highlighted: true,
    cta: 'Join Forge',
  },
  {
    id: 'apex',
    name: 'Apex',
    price: 119,
    cadence: '/mo',
    blurb: 'White-glove, fully bespoke athletic performance.',
    features: [
      'Everything in Forge',
      'Weekly 1:1 elite coaching',
      'Personalised nutrition + bloodwork',
      'Priority class booking',
      'Guest passes (4/mo)',
    ],
    cta: 'Go Apex',
  },
]

export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  initials: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'r1',
    name: 'Jordan M.',
    role: 'Lost 18kg in 5 months',
    quote:
      'IRONPULSE rewired my relationship with training. The coaches treat you like an athlete, not a number. I\'m in the best shape of my life.',
    rating: 5,
    initials: 'JM',
  },
  {
    id: 'r2',
    name: 'Priya S.',
    role: 'First marathon · 3:52',
    quote:
      'The Endurance Lab built an engine I didn\'t know I had. Structured, data-driven, relentless. That sub-4 felt inevitable.',
    rating: 5,
    initials: 'PS',
  },
  {
    id: 'r3',
    name: 'Tomás R.',
    role: 'Deadlift 140 → 240kg',
    quote:
      'Marcus fixed my technique in week one. The strength programming is no-nonsense and it just works. PRs every cycle.',
    rating: 5,
    initials: 'TR',
  },
  {
    id: 'r4',
    name: 'Hana K.',
    role: 'Amateur boxer · 6-0',
    quote:
      'Combat Forge sharpened everything — hands, footwork, conditioning. Walk in soft, walk out forged. No ego, just work.',
    rating: 5,
    initials: 'HK',
  },
]

export type ScheduleClass = {
  time: string
  name: string
  coach: string
  duration: string
  type: 'Strength' | 'HIIT' | 'Cardio' | 'Combat' | 'Mobility'
}

export const schedule: Record<string, ScheduleClass[]> = {
  Mon: [
    { time: '06:30', name: 'Sunrise Iron', coach: 'Marcus V.', duration: '60', type: 'Strength' },
    { time: '12:00', name: 'Express HIIT', coach: 'Aria K.', duration: '30', type: 'HIIT' },
    { time: '18:30', name: 'Combat Forge', coach: 'Diego S.', duration: '55', type: 'Combat' },
  ],
  Tue: [
    { time: '07:00', name: 'Endurance Lab', coach: 'Aria K.', duration: '50', type: 'Cardio' },
    { time: '17:30', name: 'Iron Strength', coach: 'Marcus V.', duration: '60', type: 'Strength' },
    { time: '19:30', name: 'Flow Mobility', coach: 'Lena P.', duration: '40', type: 'Mobility' },
  ],
  Wed: [
    { time: '06:30', name: 'Pulse HIIT', coach: 'Aria K.', duration: '45', type: 'HIIT' },
    { time: '12:00', name: 'Express Iron', coach: 'Marcus V.', duration: '30', type: 'Strength' },
    { time: '18:30', name: 'Combat Forge', coach: 'Diego S.', duration: '55', type: 'Combat' },
  ],
  Thu: [
    { time: '07:00', name: 'Endurance Lab', coach: 'Aria K.', duration: '50', type: 'Cardio' },
    { time: '17:30', name: 'Pulse HIIT', coach: 'Aria K.', duration: '45', type: 'HIIT' },
    { time: '19:30', name: 'Flow Mobility', coach: 'Lena P.', duration: '40', type: 'Mobility' },
  ],
  Fri: [
    { time: '06:30', name: 'Sunrise Iron', coach: 'Marcus V.', duration: '60', type: 'Strength' },
    { time: '12:00', name: 'Express HIIT', coach: 'Aria K.', duration: '30', type: 'HIIT' },
    { time: '18:00', name: 'Friday Throwdown', coach: 'Diego S.', duration: '60', type: 'Combat' },
  ],
  Sat: [
    { time: '09:00', name: 'Weekend WOD', coach: 'All', duration: '75', type: 'HIIT' },
    { time: '11:00', name: 'Open Gym', coach: 'On-duty', duration: '120', type: 'Strength' },
  ],
  Sun: [
    { time: '10:00', name: 'Recovery Flow', coach: 'Lena P.', duration: '45', type: 'Mobility' },
    { time: '11:30', name: 'Open Gym', coach: 'On-duty', duration: '90', type: 'Strength' },
  ],
}

export const scheduleTypeColor: Record<ScheduleClass['type'], string> = {
  Strength: '#ff7a18',
  HIIT: '#ff4d00',
  Cardio: '#ffae5a',
  Combat: '#ff5a00',
  Mobility: '#ffd9a0',
}

export type Stat = { label: string; value: string; icon: LuIcon }

export const stats: Stat[] = [
  { label: 'Active members', value: '4,800+', icon: Users },
  { label: 'Elite coaches', value: '32', icon: Trophy },
  { label: 'Weekly classes', value: '120+', icon: Clock },
  { label: 'Avg. strength gain', value: '+38%', icon: Zap },
]

export const features = [
  {
    icon: Dumbbell,
    title: 'Premium Equipment',
    text: '2,400m² of competition-grade Eleiko, Rogue and Technogym kit — never wait for a rack.',
  },
  {
    icon: HeartPulse,
    title: 'Recovery Suite',
    text: 'Infrared sauna, ice baths, compression boots and a dedicated stretch lab to rebuild you.',
  },
  {
    icon: Target,
    title: 'Data-Driven Plans',
    text: 'InBody scans, VO2 and lactate testing feed your coach a living, adaptive program.',
  },
  {
    icon: PersonStanding,
    title: 'Elite Coaching',
    text: 'Every coach holds a national certification and a track record of real transformations.',
  },
]

export const navLinks = [
  { label: 'Programs', href: '#programs' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Stories', href: '#stories' },
]
