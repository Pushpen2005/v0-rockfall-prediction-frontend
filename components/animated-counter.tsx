"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ value, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {prefix}
      {count}
      {suffix}
    </motion.span>
  )
}
