"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle, Check, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  location: string
  timestamp: string
}

interface AlertToastProps {
  alert: Alert
  onClose: () => void
  onAcknowledge: () => void
}

export function AlertToast({ alert, onClose, onAcknowledge }: AlertToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 10000) // Auto-close after 10 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-destructive bg-destructive/5"
      case "high":
        return "border-destructive bg-destructive/5"
      case "medium":
        return "border-warning bg-warning/5"
      case "low":
        return "border-muted bg-muted/5"
      default:
        return "border-border bg-card"
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.9 }}
        className="fixed top-20 right-6 z-50 w-96"
      >
        <Card className={`${getSeverityColor(alert.severity)} border-2 shadow-lg`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary animate-pulse" />
                  <Badge
                    variant={alert.severity === "critical" || alert.severity === "high" ? "destructive" : "secondary"}
                  >
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              New Alert
            </CardTitle>
            <CardDescription className="font-medium">{alert.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{alert.description}</p>

            <div className="text-sm">
              <div className="font-medium">Location: {alert.location}</div>
              <div className="text-muted-foreground">Alert ID: {alert.id}</div>
            </div>

            <div className="flex gap-2">
              <Button onClick={onAcknowledge} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Acknowledge
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
