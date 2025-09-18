"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Activity, AlertTriangle, WifiOff } from "lucide-react"

interface Sensor {
  id: string
  name: string
  location: {
    zone: string
    coordinates: { lat: number; lng: number }
    elevation: number
  }
  status: "online" | "warning" | "offline"
  battery: number
}

interface SensorMapProps {
  sensors: Sensor[]
}

export function SensorMap({ sensors }: SensorMapProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Activity className="h-4 w-4 text-success" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-destructive" />
      default:
        return <MapPin className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "border-success bg-success/10"
      case "warning":
        return "border-warning bg-warning/10"
      case "offline":
        return "border-destructive bg-destructive/10"
      default:
        return "border-border bg-muted/10"
    }
  }

  // Convert coordinates to relative positions (simplified for demo)
  const getPosition = (sensor: Sensor) => {
    const lat = sensor.location.coordinates.lat
    const lng = sensor.location.coordinates.lng

    // Normalize coordinates to percentage positions
    const x = ((lng + 46.64) / 0.02) * 100
    const y = ((lat + 23.56) / 0.02) * 100

    return { x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensor Location Map</CardTitle>
        <CardDescription>Interactive map showing all sensor locations and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-muted/10 rounded-lg border overflow-hidden">
          {/* Mine site outline */}
          <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <div className="absolute top-2 left-2 text-xs text-muted-foreground">Mine Site A</div>
          </div>

          {/* Sensor markers */}
          {sensors.map((sensor) => {
            const position = getPosition(sensor)
            return (
              <div
                key={sensor.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all hover:scale-125 ${getStatusColor(
                    sensor.status,
                  )}`}
                >
                  {getStatusIcon(sensor.status)}
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-48">
                    <div className="font-semibold text-sm mb-1">{sensor.name}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          sensor.status === "online"
                            ? "default"
                            : sensor.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {sensor.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Zone: {sensor.location.zone}</div>
                      <div>Elevation: {sensor.location.elevation}m</div>
                      <div>Battery: {sensor.battery}%</div>
                      <div>ID: {sensor.id}</div>
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
        </div>

        {/* Map Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-success bg-success/10 flex items-center justify-center">
              <Activity className="h-2 w-2 text-success" />
            </div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-warning bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="h-2 w-2 text-warning" />
            </div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-destructive bg-destructive/10 flex items-center justify-center">
              <WifiOff className="h-2 w-2 text-destructive" />
            </div>
            <span>Offline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
