"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, TrendingUp, Calendar, Droplets, Mountain } from "lucide-react"

const insights = [
  {
    id: "INS-001",
    title: "Rainfall-Rockfall Correlation",
    description: "90% of rockfall events occur within 48 hours after rainfall exceeding 80mm in 24 hours",
    impact: "Critical",
    confidence: 94,
    category: "Weather",
    icon: Droplets,
    trend: "increasing",
    actionable: true,
    details: {
      dataPoints: 1247,
      timeframe: "Last 2 years",
      zones: ["North Wall", "East Slope"],
    },
  },
  {
    id: "INS-002",
    title: "Seasonal Risk Patterns",
    description: "Risk increases by 35% during monsoon season (June-September) compared to dry months",
    impact: "High",
    confidence: 87,
    category: "Seasonal",
    icon: Calendar,
    trend: "stable",
    actionable: true,
    details: {
      dataPoints: 892,
      timeframe: "5-year average",
      zones: ["All zones"],
    },
  },
  {
    id: "INS-003",
    title: "Vibration Threshold Discovery",
    description: "Ground vibrations above 1.2 m/s² correlate with 78% increase in rockfall probability",
    impact: "High",
    confidence: 91,
    category: "Seismic",
    icon: Mountain,
    trend: "increasing",
    actionable: true,
    details: {
      dataPoints: 2156,
      timeframe: "Last 18 months",
      zones: ["South Bench", "Central Pit"],
    },
  },
  {
    id: "INS-004",
    title: "Temperature Differential Impact",
    description: "65% of events occur during high temperature differential periods (>15°C day-night)",
    impact: "Medium",
    confidence: 82,
    category: "Temperature",
    icon: TrendingUp,
    trend: "stable",
    actionable: false,
    details: {
      dataPoints: 743,
      timeframe: "Last year",
      zones: ["North Wall", "West Wall"],
    },
  },
]

export function AnalyticsInsights() {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "outline"
      default:
        return "outline"
    }
  }

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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Active Insights</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">89.2%</div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">8</div>
            <div className="text-sm text-muted-foreground">Actionable Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-chart-1">15.4K</div>
            <div className="text-sm text-muted-foreground">Data Points</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Machine learning discoveries from comprehensive data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {insights.map((insight) => {
              const IconComponent = insight.icon
              return (
                <div key={insight.id} className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getImpactColor(insight.impact) as any}>{insight.impact.toUpperCase()}</Badge>
                      {insight.actionable && <Badge variant="outline">ACTIONABLE</Badge>}
                      <span className="text-sm text-muted-foreground">{getTrendIcon(insight.trend)}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{insight.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Confidence Level</span>
                      <span className="font-medium">{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Data Points</div>
                      <div className="text-muted-foreground">{insight.details.dataPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="font-medium">Timeframe</div>
                      <div className="text-muted-foreground">{insight.details.timeframe}</div>
                    </div>
                    <div>
                      <div className="font-medium">Affected Zones</div>
                      <div className="text-muted-foreground">{insight.details.zones.join(", ")}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
