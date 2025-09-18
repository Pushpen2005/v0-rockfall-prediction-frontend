import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Activity, Battery, WifiOff, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react"

interface Sensor {
  id: string
  name: string
  type: string
  location: {
    zone: string
    coordinates: { lat: number; lng: number }
    elevation: number
  }
  status: "online" | "warning" | "offline"
  battery: number
  lastSync: string
  readings: Record<string, number>
  alerts: string[]
}

interface SensorCardProps {
  sensor: Sensor
  isSelected?: boolean
  onToggleSelect?: () => void
}

export function SensorCard({ sensor, isSelected, onToggleSelect }: SensorCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-success"
      case "warning":
        return "text-warning"
      case "offline":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-destructive" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return "text-success"
    if (battery > 20) return "text-warning"
    return "text-destructive"
  }

  const formatLastSync = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return `${Math.floor(diffMinutes / 1440)}d ago`
  }

  return (
    <Card className={cn("relative transition-all hover:shadow-md", isSelected && "ring-2 ring-primary")}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {onToggleSelect && (
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={onToggleSelect}
                  className="data-[state=checked]:bg-primary"
                />
              )}
              <CardTitle className="text-sm font-semibold">{sensor.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{sensor.location.zone}</span>
            </div>
          </div>
          {getStatusIcon(sensor.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Battery */}
        <div className="flex items-center justify-between">
          <Badge
            variant={sensor.status === "online" ? "default" : sensor.status === "warning" ? "secondary" : "destructive"}
          >
            {sensor.status.toUpperCase()}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Battery className={cn("h-4 w-4", getBatteryColor(sensor.battery))} />
            <span className={getBatteryColor(sensor.battery)}>{sensor.battery}%</span>
          </div>
        </div>

        {/* Readings */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Latest Readings</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(sensor.readings).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key.replace("_", " ")}:</span>
                <span className="font-medium">
                  {value}
                  {key.includes("temperature")
                    ? "°C"
                    : key.includes("pressure")
                      ? " kPa"
                      : key.includes("displacement")
                        ? " mm"
                        : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Last Sync */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last sync: {formatLastSync(sensor.lastSync)}</span>
        </div>

        {/* Alerts */}
        {sensor.alerts.length > 0 && (
          <div className="space-y-1">
            {sensor.alerts.map((alert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {alert.replace("_", " ")}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
