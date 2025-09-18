"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react"

const trendData = [
  { month: "Jan", riskLevel: 2.1, incidents: 3, predictions: 2.3 },
  { month: "Feb", riskLevel: 2.8, incidents: 5, predictions: 2.9 },
  { month: "Mar", riskLevel: 3.2, incidents: 7, predictions: 3.1 },
  { month: "Apr", riskLevel: 2.9, incidents: 4, predictions: 2.8 },
  { month: "May", riskLevel: 3.5, incidents: 8, predictions: 3.6 },
  { month: "Jun", riskLevel: 3.1, incidents: 6, predictions: 3.0 },
  { month: "Jul", riskLevel: 2.7, incidents: 4, predictions: 2.5 },
  { month: "Aug", riskLevel: 2.4, incidents: 2, predictions: 2.2 },
  { month: "Sep", riskLevel: 2.9, incidents: 5, predictions: 3.1 },
  { month: "Oct", riskLevel: 3.3, incidents: 7, predictions: 3.4 },
  { month: "Nov", riskLevel: 2.8, incidents: 4, predictions: 2.6 },
  { month: "Dec", riskLevel: 2.5, incidents: 3, predictions: 2.4 },
]

const trendMetrics = [
  {
    title: "Risk Level Trend",
    value: "2.8",
    change: "-0.3",
    trend: "down",
    description: "Average risk level decreased by 0.3 points this month",
  },
  {
    title: "Prediction Accuracy",
    value: "89.2%",
    change: "+2.1%",
    trend: "up",
    description: "AI prediction accuracy improved by 2.1% this quarter",
  },
  {
    title: "Incident Frequency",
    value: "4.2/month",
    change: "0",
    trend: "stable",
    description: "Monthly incident rate remains stable",
  },
  {
    title: "Response Time",
    value: "3.2 min",
    change: "-0.8 min",
    trend: "down",
    description: "Average alert response time improved by 0.8 minutes",
  },
]

export function TrendAnalysis() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Trend Analysis
          </CardTitle>
          <CardDescription>Historical trends and performance metrics over the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {trendMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>{metric.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Level Trends</CardTitle>
                <CardDescription>Monthly risk level progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="riskLevel"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      name="Risk Level"
                    />
                    <Area
                      type="monotone"
                      dataKey="predictions"
                      stroke="hsl(var(--secondary))"
                      fill="hsl(var(--secondary))"
                      fillOpacity={0.1}
                      name="AI Predictions"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Correlation</CardTitle>
                <CardDescription>Actual incidents vs predicted risk</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="incidents"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Actual Incidents"
                    />
                    <Line
                      type="monotone"
                      dataKey="predictions"
                      stroke="#22c55e"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Predicted Risk"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
