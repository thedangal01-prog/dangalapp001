'use client'

import dynamic from 'next/dynamic'

/**
 * Client-only wrapper so the R3F <Canvas> never runs during SSR.
 * Shows a subtle loading shimmer while the WebGL scene boots.
 */
function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-[radial-gradient(circle,oklch(0.72_0.21_47/0.25),transparent_70%)]" />
    </div>
  )
}

export const Hero3D = dynamic(
  () => import('@/components/three/hero-scene').then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
)

export const Background3D = dynamic(
  () => import('@/components/three/hero-scene').then((m) => m.BackgroundScene),
  {
    ssr: false,
    loading: () => null,
  }
)
