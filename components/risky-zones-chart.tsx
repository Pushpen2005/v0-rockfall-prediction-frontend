"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

const zoneData = [
  { zone: "North Wall", riskScore: 85, events: 12, trend: "increasing", color: "hsl(var(--destructive))" },
  { zone: "East Slope", riskScore: 65, events: 8, trend: "stable", color: "hsl(var(--warning))" },
  { zone: "West Wall", riskScore: 72, events: 10, trend: "increasing", color: "hsl(var(--destructive))" },
  { zone: "South Bench", riskScore: 45, events: 5, trend: "decreasing", color: "hsl(var(--success))" },
  { zone: "Central Pit", riskScore: 58, events: 7, trend: "stable", color: "hsl(var(--warning))" },
]

export function RiskyZonesChart() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "↗"
      case "decreasing":
        return "↘"
      case "stable":
        return "→"
      default:
        return "→"
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: "HIGH", variant: "destructive" }
    if (score >= 50) return { level: "MEDIUM", variant: "secondary" }
    return { level: "LOW", variant: "outline" }
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Most Risky Mine Zones</CardTitle>
          <CardDescription>Risk assessment scores and event frequency by zone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="zone"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [
                    `${value}${name === "riskScore" ? " Risk Score" : " Events"}`,
                    name === "riskScore" ? "Risk Score" : "Events",
                  ]}
                />
                <Bar dataKey="riskScore" radius={[4, 4, 0, 0]}>
                  {zoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zoneData.map((zone) => {
          const riskInfo = getRiskLevel(zone.riskScore)
          return (
            <Card key={zone.zone}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {zone.zone}
                  </CardTitle>
                  <Badge variant={riskInfo.variant as any}>{riskInfo.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <span className="text-lg font-bold" style={{ color: zone.color }}>
                    {zone.riskScore}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Events (30 days)</span>
                  <span className="font-medium">{zone.events}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium capitalize">{zone.trend}</span>
                    <span className="text-lg">{getTrendIcon(zone.trend)}</span>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${zone.riskScore}%`,
                      backgroundColor: zone.color,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
