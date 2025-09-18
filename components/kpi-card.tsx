"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/animated-counter"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: string
    type: "increase" | "decrease" | "neutral"
  }
  icon: LucideIcon
  status?: "normal" | "warning" | "critical"
  subtitle?: string
}

export function KPICard({ title, value, change, icon: Icon, status = "normal", subtitle }: KPICardProps) {
  const statusColors = {
    normal: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  }

  const changeColors = {
    increase: "text-success",
    decrease: "text-destructive",
    neutral: "text-muted-foreground",
  }

  const statusGradients = {
    normal: "from-success/10 to-success/5",
    warning: "from-warning/10 to-warning/5",
    critical: "from-destructive/10 to-destructive/5",
  }

  const numericValue = typeof value === "string" ? Number.parseInt(value.replace(/\D/g, "")) || 0 : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card
        className={cn(
          "relative overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-all duration-300",
          "bg-gradient-to-br",
          statusGradients[status],
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5" />

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
              status === "critical" && "bg-destructive/10 animate-pulse-glow",
              status === "warning" && "bg-warning/10",
              status === "normal" && "bg-success/10",
            )}
          >
            <Icon className={cn("h-4 w-4", statusColors[status])} />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-foreground mb-1">
            {typeof value === "number" ? (
              <AnimatedCounter value={numericValue} />
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {value}
              </motion.span>
            )}
          </div>
          {subtitle && <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>}
          {change && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Badge
                variant="outline"
                className={cn(
                  "text-xs border-0 font-medium px-2 py-1 rounded-full",
                  change.type === "increase" && "bg-success/10 text-success",
                  change.type === "decrease" && "bg-destructive/10 text-destructive",
                  change.type === "neutral" && "bg-muted/20 text-muted-foreground",
                )}
              >
                {change.type === "increase" ? "↗" : change.type === "decrease" ? "↘" : "→"} {change.value}
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
