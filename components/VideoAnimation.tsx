'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function VideoAnimation() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create video frame geometries (representing shorts/reels)
    const frames: THREE.Mesh[] = []
    const frameCount = 6

    for (let i = 0; i < frameCount; i++) {
      // Create vertical video frame (9:16 aspect ratio)
      const geometry = new THREE.PlaneGeometry(0.6, 1.07) // 9:16 ratio
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(
          (i / frameCount) * 0.3 + 0.5, // Hue between 0.5-0.8 (blue to purple)
          0.7,
          0.6
        ),
        metalness: 0.3,
        roughness: 0.4,
        emissive: new THREE.Color().setHSL(
          (i / frameCount) * 0.3 + 0.5,
          0.5,
          0.1
        ),
      })

      const frame = new THREE.Mesh(geometry, material)
      
      // Position frames in a circle
      const angle = (i / frameCount) * Math.PI * 2
      const radius = 2.5
      frame.position.x = Math.cos(angle) * radius
      frame.position.y = Math.sin(angle) * radius
      frame.position.z = (Math.sin(angle) * 0.5) - 1
      
      // Rotate to face center
      frame.lookAt(0, 0, 0)
      
      // Add slight rotation for dynamic feel
      frame.rotation.z = angle + Math.PI / 2
      
      scene.add(frame)
      frames.push(frame)
    }

    // Add play button indicators (floating circles)
    const playButtons: THREE.Mesh[] = []
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.RingGeometry(0.15, 0.2, 32)
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
      })
      const button = new THREE.Mesh(geometry, material)
      
      const angle = (i / 3) * Math.PI * 2
      button.position.x = Math.cos(angle) * 1.8
      button.position.y = Math.sin(angle) * 1.8
      button.position.z = 0.5
      
      scene.add(button)
      playButtons.push(button)
    }

    // Add particles (representing views/engagement)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x6366f1, 1, 10)
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    // Animation
    let time = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.01

      // Rotate frames
      frames.forEach((frame, i) => {
        frame.rotation.y += 0.005
        frame.position.y += Math.sin(time + i) * 0.01
        frame.position.z += Math.cos(time * 0.5 + i) * 0.02
      })

      // Rotate play buttons
      playButtons.forEach((button, i) => {
        button.rotation.z += 0.01
        button.position.y += Math.sin(time * 2 + i) * 0.02
        button.scale.setScalar(1 + Math.sin(time * 3 + i) * 0.1)
      })

      // Rotate particles
      particles.rotation.y += 0.001

      // Rotate camera slightly for dynamic view
      camera.position.x = Math.sin(time * 0.2) * 0.5
      camera.position.y = Math.cos(time * 0.15) * 0.3
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      )
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      frames.forEach(frame => {
        frame.geometry.dispose()
        if (Array.isArray(frame.material)) {
          frame.material.forEach(mat => mat.dispose())
        } else {
          frame.material.dispose()
        }
      })
      playButtons.forEach(button => {
        button.geometry.dispose()
        if (Array.isArray(button.material)) {
          button.material.forEach(mat => mat.dispose())
        } else {
          button.material.dispose()
        }
      })
      particles.geometry.dispose()
      particles.material.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full absolute inset-0 pointer-events-none"
      style={{ opacity: 0.15 }}
    />
  )
}
