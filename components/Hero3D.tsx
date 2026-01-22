'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Disable zoom on OrbitControls
function DisabledZoomControls() {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.5}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2.2}
    />
  )
}

// Floating animation for the model
function FloatingModel({ modelPath }: { modelPath?: string }) {
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      // Subtle rotation
      meshRef.current.rotation.y += 0.005
    }
  })

  // Load GLTF model if path provided
  if (modelPath) {
    try {
      const { scene } = useGLTF(modelPath)
      // Clone the scene to avoid issues with multiple instances
      const clonedScene = scene.clone()
      
      // Auto-scale model to fit view
      const box = new THREE.Box3().setFromObject(clonedScene)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim // Scale to fit in 2 unit space
      
      return (
        <primitive 
          ref={meshRef}
          object={clonedScene} 
          scale={scale} 
          position={[0, 0, 0]}
        />
      )
    } catch (error) {
      console.warn('Failed to load GLTF model:', error)
      // Fall through to geometric representation
    }
  }

  // Fallback geometric representation (shorts/reels theme)
  return (
    <group ref={meshRef}>
      {/* Vertical video frame representation */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 1.07, 0.05]} />
        <meshStandardMaterial 
          color="#6366f1" 
          metalness={0.3}
          roughness={0.4}
          emissive="#4f46e5"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Play button indicator */}
      <mesh position={[0, 0, 0.1]}>
        <ringGeometry args={[0.15, 0.2, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#6366f1"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Main 3D Scene Component
function Scene3D({ modelPath }: { modelPath?: string }) {
  return (
    <>
      {/* Soft lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#6366f1" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Model with floating animation */}
      <Suspense fallback={null}>
        <FloatingModel modelPath={modelPath} />
      </Suspense>
      
      {/* Soft shadows */}
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.3}
        scale={5}
        blur={2}
        far={2}
      />
      
      {/* Controls */}
      <DisabledZoomControls />
    </>
  )
}

// Main Hero3D Component
export default function Hero3D({ modelPath }: { modelPath?: string }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Mobile fallback: static gradient or disabled
  if (isMobile) {
    return (
      <div className="w-full h-full absolute inset-0 pointer-events-none opacity-10 animate-fade-in">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
      </div>
    )
  }

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none animate-fade-in">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ opacity: 0.15 }}
      >
        <Scene3D modelPath={modelPath} />
      </Canvas>
    </div>
  )
}
