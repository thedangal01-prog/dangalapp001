'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial, Environment, Lightformer, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import type { Group } from 'three'
import { Dumbbell } from './dumbbell'

/**
 * Optimized 3D hero scene — reduced polygon count, adaptive DPR,
 * fewer particles, simplified lighting for smoother performance.
 */
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffd9a0" />
      <pointLight position={[-5, -2, 2]} intensity={30} color="#ff5a00" distance={20} />
      <pointLight position={[5, 3, -4]} intensity={20} color="#ffae5a" distance={18} />

      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 4, 4]} scale={[6, 6, 1]} color="#ff8a3a" />
          <Lightformer intensity={1.4} position={[-5, -2, 2]} scale={[4, 4, 1]} color="#ff4d00" />
        </Environment>
      </Suspense>

      {/* Distorted core — lower detail for performance */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[0, 0, -1.6]} scale={1.5}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#1a0e07"
            emissive="#ff4d00"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.15}
            distort={0.3}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Central dumbbell */}
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.9}>
        <group rotation={[0.3, 0.5, 0.2]}>
          <Dumbbell scale={1} speed={0.5} drift={0.25} />
        </group>
      </Float>

      {/* Fewer orbiting shards (3 instead of 5) */}
      <OrbitingShards />

      {/* Reduced particles */}
      <Sparkles count={40} scale={[10, 6, 6]} size={2.5} speed={0.3} opacity={0.6} color="#ffae5a" />
    </>
  )
}

function OrbitingShards() {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15
  })

  const shards = useMemo(() => [
    { pos: [3.2, 1.4, 0.5] as const, scale: 0.3, geo: 'ico' as const, color: '#ff7a18' },
    { pos: [-3.4, -1.2, 0.8] as const, scale: 0.35, geo: 'octa' as const, color: '#ffae5a' },
    { pos: [2.6, -1.8, -0.6] as const, scale: 0.25, geo: 'tetra' as const, color: '#ffffff' },
  ], [])

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={1.5} floatIntensity={1.2}>
          <mesh position={s.pos} scale={s.scale}>
            {s.geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
            {s.geo === 'octa' && <octahedronGeometry args={[1, 0]} />}
            {s.geo === 'tetra' && <tetrahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={s.color}
              metalness={0.7}
              roughness={0.2}
              emissive={s.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const x = state.pointer.x * 0.5
    const y = state.pointer.y * 0.3
    state.camera.position.x += (x - state.camera.position.x) * 0.03
    state.camera.position.y += (y - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <CameraRig />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}

/** Lighter background scene — even fewer particles, no dumbbell */
function BackgroundShards() {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06
  })
  const items = useMemo(() => [
    { pos: [2.4, 1, -1] as const, s: 0.4, c: '#ff7a18' },
    { pos: [-2.6, -0.6, -0.5] as const, s: 0.5, c: '#ff5a00' },
    { pos: [0, 1.6, -1.5] as const, s: 0.3, c: '#ffae5a' },
  ], [])
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 3, 4]} intensity={20} color="#ff7a18" />
      <group ref={group}>
        {items.map((it, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={it.pos} scale={it.s}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color={it.c} metalness={0.6} roughness={0.25} emissive={it.c} emissiveIntensity={0.2} />
            </mesh>
          </Float>
        ))}
      </group>
      <Sparkles count={20} scale={[8, 5, 4]} size={1.5} speed={0.2} opacity={0.4} color="#ffae5a" />
    </>
  )
}

export function BackgroundScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>
        <BackgroundShards />
      </Suspense>
    </Canvas>
  )
}
