"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Brain, TrendingUp } from "lucide-react"

interface ConfidenceMeterProps {
  confidence: number
  accuracy: number
}

export function ConfidenceMeter({ confidence, accuracy }: ConfidenceMeterProps) {
  const confidencePercentage = Math.round(confidence * 100)
  const accuracyPercentage = Math.round(accuracy * 100)

  const data = [
    { name: "Confidence", value: confidencePercentage, color: "hsl(var(--chart-1))" },
    { name: "Remaining", value: 100 - confidencePercentage, color: "hsl(var(--muted))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Confidence
        </CardTitle>
        <CardDescription>Model confidence and historical accuracy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Confidence Donut Chart */}
        <div className="relative">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{confidencePercentage}%</div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>
        </div>

        {/* Accuracy Metric */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Historical Accuracy</span>
            </div>
            <span className="text-lg font-bold text-success">{accuracyPercentage}%</span>
          </div>

          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${accuracyPercentage}%` }}
            />
          </div>

          <div className="text-xs text-muted-foreground">Based on last 100 predictions vs actual outcomes</div>
        </div>

        {/* Model Info */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Model Version</span>
            <span className="font-medium">v2.1.3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Training Data</span>
            <span className="font-medium">15,000+ events</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">2 hours ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
