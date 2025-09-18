"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"

export type SensorPoint = {
  id: string
  position: [number, number, number]
  riskLevel: number // 0..1
}

const SensorSphere: React.FC<{ point: SensorPoint }> = ({ point }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = point.riskLevel > 0.8 ? "#ef4444" : point.riskLevel > 0.5 ? "#f59e0b" : "#22c55e"

  useEffect(() => {
    if (!meshRef.current) return
    if (point.riskLevel > 0.8) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
      tl.to(meshRef.current.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 0.7 })
      tl.to(meshRef.current.material as any, { opacity: 0.7, duration: 0.7 }, "<")
      return () => {
        tl.kill()
        if (meshRef.current) {
          meshRef.current.scale.set(1, 1, 1)
          const mat = meshRef.current.material as THREE.MeshStandardMaterial
          mat.opacity = 1
        }
      }
    }
  }, [point.riskLevel])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    // Subtle idle motion
    meshRef.current.position.y = 0.25 + Math.sin(clock.getElapsedTime() + point.position[0]) * 0.05
  })

  return (
    <mesh ref={meshRef} position={[point.position[0], 0.25, point.position[2]]} castShadow>
      <sphereGeometry args={[0.25, 24, 24]} />
      <meshStandardMaterial color={color} transparent opacity={1} roughness={0.6} />
    </mesh>
  )
}

const BasePad: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[4, 48]} />
      <meshStandardMaterial color="#4b5563" roughness={0.95} />
    </mesh>
  )
}

export interface Dashboard3DProps {
  sensors?: SensorPoint[]
  className?: string
}

const Dashboard3D: React.FC<Dashboard3DProps> = ({ sensors, className }) => {
  const points = useMemo<SensorPoint[]>(
    () =>
      sensors ?? [
        { id: "s1", position: [-2, 0, -1], riskLevel: 0.3 },
        { id: "s2", position: [1, 0, 1.5], riskLevel: 0.6 },
        { id: "s3", position: [2.2, 0, -1.2], riskLevel: 0.85 },
        { id: "s4", position: [-1.2, 0, 2.0], riskLevel: 0.15 },
      ],
    [sensors],
  )

  return (
    <div className={"w-full rounded-lg border border-border bg-muted/20 " + (className ?? "")}
      style={{ height: 260 }}>
      <Canvas
        camera={{ position: [4, 4, 4], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power" }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={0.8} castShadow />
        <BasePad />
        {points.map((p) => (
          <SensorSphere key={p.id} point={p} />
        ))}
      </Canvas>
    </div>
  )
}

export default Dashboard3D

