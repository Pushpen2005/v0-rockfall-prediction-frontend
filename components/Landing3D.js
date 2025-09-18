"use client"

import React, { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

function OrbitingCamera({ radius = 10, speed = 0.08 }) {
  const { camera } = useThree()
  const angleRef = useRef(0)
  useFrame((_, delta) => {
    angleRef.current += speed * delta
    const x = Math.cos(angleRef.current) * radius
    const z = Math.sin(angleRef.current) * radius
    camera.position.set(x, 6, z)
    camera.lookAt(0, 0, 0)
  })
  return null
}

function SlopePlane() {
  const geometry = useMemo(() => {
    const width = 20
    const height = 20
    const widthSegments = 20
    const heightSegments = 20
    const geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
    const positionAttribute = geo.attributes.position
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i)
      const y = positionAttribute.getY(i)
      const slope = (x + y) * 0.06
      const noise = (Math.sin(x * 0.5) + Math.cos(y * 0.5)) * 0.08
      positionAttribute.setZ(i, slope + noise)
    }
    positionAttribute.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#8a8f98" roughness={0.95} metalness={0.0} />
    </mesh>
  )
}

function RiskOverlay({ zone }) {
  const { position, rotation = [-Math.PI / 2, 0, 0], size = [4, 4], color, opacity = 0.28, label } = zone
  return (
    <group position={position}>
      <mesh rotation={rotation} renderOrder={1}>
        <planeGeometry args={size} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
      {label ? (
        <Html position={[0, 0.05, 0]} center style={{ pointerEvents: "none" }}>
          <div className="px-2 py-1 text-xs rounded-md bg-background/70 border border-border text-foreground shadow-sm">
            {label}
          </div>
        </Html>
      ) : null}
    </group>
  )
}

export default function Landing3D({ className }) {
  const zones = useMemo(
    () => [
      { id: "high", position: [-3.5, 0.02, -1.5], size: [5, 3], color: "#ef4444", opacity: 0.28, label: "High Risk" },
      { id: "medium", position: [2.5, 0.02, 2.0], size: [4, 3], color: "#f59e0b", opacity: 0.24, label: "Medium Risk" },
      { id: "low", position: [0, 0.02, -4.0], size: [6, 2.5], color: "#22c55e", opacity: 0.2, label: "Low Risk" },
    ],
    [],
  )

  return (
    <div className={"w-full rounded-xl border border-border bg-muted/20 " + (className ?? "")} style={{ height: "min(62vh, 520px)" }}>
      <Canvas shadows camera={{ position: [9, 6, 9], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 4]} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <Suspense fallback={null}>
          <group>
            <SlopePlane />
            {zones.map((z) => (
              <RiskOverlay key={z.id} zone={z} />
            ))}
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.4, 1.0, 0.4]} />
              <meshStandardMaterial color="#64748b" roughness={0.9} />
            </mesh>
          </group>
        </Suspense>
        <OrbitingCamera radius={10} speed={0.1} />
      </Canvas>
    </div>
  )
}

