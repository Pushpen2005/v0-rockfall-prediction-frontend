"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const zones = [
  { id: "north-wall", name: "North Wall", risk: "high", sensors: 8, active: 7, x: 20, y: 15 },
  { id: "east-slope", name: "East Slope", risk: "medium", sensors: 6, active: 5, x: 70, y: 30 },
  { id: "south-bench", name: "South Bench", risk: "low", sensors: 4, active: 3, x: 50, y: 80 },
  { id: "west-wall", name: "West Wall", risk: "low", sensors: 5, active: 5, x: 10, y: 60 },
  { id: "central-pit", name: "Central Pit", risk: "medium", sensors: 12, active: 11, x: 45, y: 45 },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-destructive/20 border-destructive"
    case "medium":
      return "bg-warning/20 border-warning"
    case "low":
      return "bg-success/20 border-success"
    default:
      return "bg-muted/20 border-border"
  }
}

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "high":
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case "medium":
      return <AlertTriangle className="h-4 w-4 text-warning" />
    case "low":
      return <CheckCircle className="h-4 w-4 text-success" />
    default:
      return <XCircle className="h-4 w-4 text-muted-foreground" />
  }
}

export function MineHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Mine Site Risk Heatmap</CardTitle>
        <CardDescription>Real-time risk assessment across all monitored zones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-muted/10 rounded-lg border overflow-hidden">
          {/* Mine outline */}
          <div className="absolute inset-4 border-2 border-dashed border-muted-foreground/30 rounded-lg"></div>

          {/* Zone markers */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute group cursor-pointer"
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110 ${getRiskColor(
                  zone.risk,
                )}`}
              >
                {getRiskIcon(zone.risk)}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-48">
                  <div className="font-semibold text-sm mb-1">{zone.name}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={zone.risk === "high" ? "destructive" : zone.risk === "medium" ? "secondary" : "outline"}
                    >
                      {zone.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>
                      Sensors: {zone.active}/{zone.sensors} active
                    </div>
                    <div>Last updated: 2 min ago</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
            <div className="text-xs font-semibold mb-2">Risk Levels</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-warning/20 border border-warning"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success/20 border border-success"></div>
                <span>Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
