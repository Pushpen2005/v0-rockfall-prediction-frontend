"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Clock, CheckCircle } from "lucide-react"

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  title: string
  description: string
  location: string
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
}

interface AlertsMapProps {
  alerts: Alert[]
}

export function AlertsMap({ alerts }: AlertsMapProps) {
  const getAlertPosition = (location: string) => {
    // Simple mapping of locations to positions
    const positions: Record<string, { x: number; y: number }> = {
      "North Wall": { x: 25, y: 20 },
      "East Slope": { x: 75, y: 35 },
      "South Bench": { x: 50, y: 80 },
      "West Wall": { x: 15, y: 60 },
      "Central Pit": { x: 45, y: 45 },
    }

    const zone = location.split(" - ")[0]
    return positions[zone] || { x: 50, y: 50 }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-destructive bg-destructive/20 animate-pulse"
      case "high":
        return "border-destructive bg-destructive/10"
      case "medium":
        return "border-warning bg-warning/10"
      case "low":
        return "border-muted bg-muted/10"
      default:
        return "border-border bg-muted/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "acknowledged":
        return <Clock className="h-4 w-4 text-warning" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return `${Math.floor(diffMinutes / 1440)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Locations</CardTitle>
        <CardDescription>Geographic distribution of active alerts across the mine site</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-muted/10 rounded-lg border overflow-hidden">
          {/* Mine site outline */}
          <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <div className="absolute top-2 left-2 text-xs text-muted-foreground">Mine Site A</div>
          </div>

          {/* Alert markers */}
          {alerts.map((alert) => {
            const position = getAlertPosition(alert.location)
            return (
              <div
                key={alert.id}
                className="absolute group cursor-pointer z-10"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:scale-125 ${getSeverityColor(
                    alert.severity,
                  )}`}
                >
                  {getStatusIcon(alert.status)}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <div className="bg-card border border-border rounded-lg p-4 shadow-lg min-w-64 max-w-80">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-sm">{alert.title}</div>
                      <Badge
                        variant={
                          alert.severity === "critical" || alert.severity === "high" ? "destructive" : "secondary"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{alert.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(alert.status)}
                        <span className="capitalize">{alert.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Zone labels */}
          <div className="absolute top-6 left-1/4 text-xs font-medium text-muted-foreground">North Wall</div>
          <div className="absolute top-1/3 right-6 text-xs font-medium text-muted-foreground">East Slope</div>
          <div className="absolute bottom-6 left-1/2 text-xs font-medium text-muted-foreground">South Bench</div>
          <div className="absolute top-1/2 left-6 text-xs font-medium text-muted-foreground">West Wall</div>
          <div className="absolute top-1/2 left-1/2 text-xs font-medium text-muted-foreground">Central Pit</div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-destructive bg-destructive/20"></div>
            <span>Critical/High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-warning bg-warning/10"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-muted bg-muted/10"></div>
            <span>Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
