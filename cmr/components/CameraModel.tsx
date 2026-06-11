import { useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export interface CameraModelHandle {
  group: THREE.Group
  lcdMesh: THREE.Mesh
  rotation: THREE.Euler
}

function createScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext('2d')!

  const draw = () => {
    // Dark background
    ctx.fillStyle = '#0a0e14'
    ctx.fillRect(0, 0, 512, 320)

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)'
    ctx.lineWidth = 1
    for (let x = 0; x < 512; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 320)
      ctx.stroke()
    }
    for (let y = 0; y < 320; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(512, y)
      ctx.stroke()
    }

    // Top bar
    ctx.fillStyle = 'rgba(0, 229, 255, 0.12)'
    ctx.fillRect(20, 16, 472, 24)

    // "REV" text in top bar
    ctx.fillStyle = 'rgba(0, 229, 255, 0.6)'
    ctx.font = '12px monospace'
    ctx.fillText('REV PRODUCTIONS', 28, 32)

    // Waveform visualization
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    for (let x = 0; x < 472; x += 2) {
      const y = 200 + Math.sin(x * 0.05 + Date.now() * 0.002) * 20
        + Math.sin(x * 0.02 + Date.now() * 0.003) * 10
      if (x === 0) ctx.moveTo(20 + x, y)
      else ctx.lineTo(20 + x, y)
    }
    ctx.stroke()

    // Bottom UI elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
    ctx.fillRect(20, 260, 150, 40)
    ctx.fillRect(190, 260, 150, 40)
    ctx.fillRect(360, 260, 132, 40)

    // Focus reticle
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.strokeRect(206, 100, 100, 60)
    ctx.beginPath()
    ctx.arc(256, 130, 40, 0, Math.PI * 2)
    ctx.stroke()
  }

  draw()
  return new THREE.CanvasTexture(canvas)
}

export const CameraModel = forwardRef<CameraModelHandle, { textureActive?: boolean; lcdEmissiveIntensity?: number }>(
  function CameraModel({ textureActive = false, lcdEmissiveIntensity = 0.3 }, ref) {
    const groupRef = useRef<THREE.Group>(null!)
    const lcdRef = useRef<THREE.Mesh>(null!)
    const lcdMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null)
    const screenTex = useMemo(() => createScreenTexture(), [])

    useImperativeHandle(ref, () => ({
      get group() { return groupRef.current },
      get lcdMesh() { return lcdRef.current },
      get rotation() { return groupRef.current?.rotation ?? new THREE.Euler() },
    }))

    useEffect(() => {
      if (lcdRef.current) {
        lcdMatRef.current = lcdRef.current.material as THREE.MeshPhysicalMaterial
      }
    }, [])

    useEffect(() => {
      if (lcdMatRef.current) {
        if (textureActive) {
          lcdMatRef.current.emissiveMap = screenTex
          lcdMatRef.current.emissiveIntensity = 1.0
        } else {
          lcdMatRef.current.emissiveMap = null
          lcdMatRef.current.emissiveIntensity = lcdEmissiveIntensity
        }
        lcdMatRef.current.needsUpdate = true
      }
    }, [textureActive, lcdEmissiveIntensity, screenTex])

    return (
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Camera Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.2, 1.4, 1.0]} />
          <meshPhysicalMaterial color="#1A1D20" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Top pentaprism / viewfinder hump */}
        <mesh position={[0.2, 0.75, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.6]} />
          <meshPhysicalMaterial color="#1A1D20" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Top dials */}
        <mesh position={[0.8, 0.75, 0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
          <meshPhysicalMaterial color="#2A2D30" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.8, 0.75, -0.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
          <meshPhysicalMaterial color="#2A2D30" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lens mount ring */}
        <mesh position={[1.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
          <meshPhysicalMaterial color="#1A1D20" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Lens barrel outer */}
        <mesh position={[1.6, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.6, 32]} />
          <meshPhysicalMaterial color="#050505" roughness={0.05} metalness={0.95} />
        </mesh>

        {/* Lens front glass */}
        <mesh position={[1.92, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <circleGeometry args={[0.35, 32]} />
          <meshPhysicalMaterial
            color="#050505"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* LCD Screen on back */}
        <mesh ref={lcdRef} position={[-1.12, 0.1, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshPhysicalMaterial
            color="#0D0F12"
            emissive="#FFFFFF"
            emissiveIntensity={lcdEmissiveIntensity}
            emissiveMap={textureActive ? screenTex : undefined}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Grip texture area */}
        <mesh position={[-0.6, -0.4, 1.05]} castShadow>
          <boxGeometry args={[1.0, 0.9, 0.08]} />
          <meshPhysicalMaterial color="#15171A" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Accent cyan ring on lens */}
        <mesh position={[1.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <ringGeometry args={[0.5, 0.52, 32]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
        </mesh>
      </group>
    )
  },
)
