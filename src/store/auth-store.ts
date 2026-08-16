'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthMember = {
  id: string
  name: string
  email: string
  phone?: string | null
  plan: string
}

type AuthState = {
  member: AuthMember | null
  setMember: (m: AuthMember | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      member: null,
      setMember: (m) => set({ member: m }),
      logout: () => set({ member: null }),
    }),
    { name: 'dangal-auth' }
  )
)
