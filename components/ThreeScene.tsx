'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Floating particles component
function FloatingParticles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    return positions
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.075
      
      // Gentle floating motion
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.0005
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Abstract shapes component
function AbstractShapes({ mousePosition }: { mousePosition: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Subtle parallax effect tied to mouse
      groupRef.current.rotation.x = mousePosition[1] * 0.1
      groupRef.current.rotation.y = mousePosition[0] * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Subtle geometric shapes */}
      <mesh position={[-2, 0, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#6366f1" opacity={0.2} transparent />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#8b5cf6" opacity={0.2} transparent />
      </mesh>
      <mesh position={[0, 1.5, -1]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#ec4899" opacity={0.15} transparent />
      </mesh>
    </group>
  )
}

// Main Three.js scene component
export default function ThreeScene() {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Track mouse for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition([x * 0.5, y * 0.5])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Disable on mobile for performance
  if (isMobile) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <FloatingParticles count={80} />
        <AbstractShapes mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
