'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

interface DumbbellProps {
  scale?: number
  speed?: number
  /** axis of rotation drift, radians */
  drift?: number
}

/**
 * A stylized 3D dumbbell built from primitive meshes:
 * a metallic bar with two stacked weight plates per side.
 */
export function Dumbbell({ scale = 1, speed = 0.6, drift = 0.3 }: DumbbellProps) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * speed * 0.25
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * drift
    group.current.rotation.y += delta * speed * 0.15
  })

  return (
    <group ref={group} scale={scale}>
      {/* Bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 3, 32]} />
        <meshStandardMaterial color="#1b1d22" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Knurled grip hints */}
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[(i - 4) * 0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.135, 0.012, 8, 20]} />
          <meshStandardMaterial color="#0f1013" metalness={0.6} roughness={0.6} />
        </mesh>
      ))}

      {/* Left plates */}
      <PlateGroup position={[-1.4, 0, 0]} />
      {/* Right plates */}
      <PlateGroup position={[1.4, 0, 0]} />
    </group>
  )
}

function PlateGroup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Outer big plate */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.16, 48]} />
        <meshStandardMaterial
          color="#0d0e11"
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
      {/* Orange rim */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <torusGeometry args={[0.85, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#ff7a18"
          emissive="#ff5a00"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {/* Mid plate */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.18, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.14, 48]} />
        <meshStandardMaterial color="#16181d" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Inner collar */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.34, 0, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.18, 32]} />
        <meshStandardMaterial color="#ff7a18" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  )
}
