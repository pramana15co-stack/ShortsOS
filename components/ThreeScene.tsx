'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Enhanced floating particles with more visibility
function FloatingParticles({ count = 150, mousePosition }: { count?: number; mousePosition: [number, number] }) {
  const meshRef = useRef<THREE.Points>(null)
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15
    }
    return positions
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      
      // Enhanced floating motion with mouse interaction
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        
        // Mouse interaction - particles react to mouse position
        const mouseInfluence = 0.3
        positions[i] += (mousePosition[0] * mouseInfluence - x) * 0.01
        positions[i + 1] += (mousePosition[1] * mouseInfluence - y) * 0.01
        
        // Floating animation
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + x + z) * 0.002
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Enhanced abstract shapes with more interactivity
function AbstractShapes({ mousePosition }: { mousePosition: [number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const mesh1Ref = useRef<THREE.Mesh>(null)
  const mesh2Ref = useRef<THREE.Mesh>(null)
  const mesh3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Enhanced parallax effect
      groupRef.current.rotation.x = mousePosition[1] * 0.3
      groupRef.current.rotation.y = mousePosition[0] * 0.3
      groupRef.current.rotation.z += 0.001
    }

    // Individual shape animations
    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x += 0.01
      mesh1Ref.current.rotation.y += 0.015
      mesh1Ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x -= 0.012
      mesh2Ref.current.rotation.z += 0.01
      mesh2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.8) * 0.4
    }
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y += 0.02
      mesh3Ref.current.position.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Enhanced geometric shapes with better visibility */}
      <mesh ref={mesh1Ref} position={[-3, 0, 0]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial 
          color="#6366f1" 
          opacity={0.4} 
          transparent 
          emissive="#6366f1"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[3, 0, 0]}>
        <tetrahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          opacity={0.4} 
          transparent 
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh ref={mesh3Ref} position={[0, 2, -1.5]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color="#ec4899" 
          opacity={0.35} 
          transparent 
          emissive="#ec4899"
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Additional shape for more visual interest */}
      <mesh position={[0, -2, 1]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          opacity={0.3} 
          transparent 
          emissive="#06b6d4"
          emissiveIntensity={0.15}
          metalness={0.3}
          roughness={0.4}
        />
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
    // Enhanced mouse tracking for better interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition([x, y])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Disable on mobile for performance
  if (isMobile) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#8b5cf6" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <FloatingParticles count={150} mousePosition={mousePosition} />
        <AbstractShapes mousePosition={mousePosition} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
