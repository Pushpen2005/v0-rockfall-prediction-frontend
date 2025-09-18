"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, CheckCircle, XCircle } from "lucide-react"

const historyData = [
  { date: "2024-01-10", predicted: 25, actual: 28, outcome: "correct" },
  { date: "2024-01-11", predicted: 45, actual: 42, outcome: "correct" },
  { date: "2024-01-12", predicted: 65, actual: 72, outcome: "correct" },
  { date: "2024-01-13", predicted: 85, actual: 88, outcome: "correct" },
  { date: "2024-01-14", predicted: 35, actual: 58, outcome: "incorrect" },
  { date: "2024-01-15", predicted: 78, actual: 75, outcome: "correct" },
]

const recentPredictions = [
  {
    id: "PRED-005",
    date: "2024-01-15",
    zone: "North Wall",
    predicted: 78,
    actual: 75,
    outcome: "correct",
    confidence: 0.92,
  },
  {
    id: "PRED-004",
    date: "2024-01-14",
    zone: "East Slope",
    predicted: 35,
    actual: 58,
    outcome: "incorrect",
    confidence: 0.68,
  },
  {
    id: "PRED-003",
    date: "2024-01-13",
    zone: "South Bench",
    predicted: 85,
    actual: 88,
    outcome: "correct",
    confidence: 0.94,
  },
]

export function PredictionHistory() {
  return (
    <div className="space-y-6">
      {/* Accuracy Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction Accuracy Trend</CardTitle>
          <CardDescription>Predicted vs actual risk levels over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Predicted Risk %"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Actual Risk %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Predictions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>Detailed history of recent AI predictions and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPredictions.map((prediction) => (
              <div
                key={prediction.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {prediction.outcome === "correct" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <Badge variant={prediction.outcome === "correct" ? "default" : "destructive"}>
                      {prediction.outcome.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-medium">{prediction.zone}</div>
                    <div className="text-sm text-muted-foreground">{prediction.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{prediction.predicted}%</div>
                    <div className="text-muted-foreground">Predicted</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{prediction.actual}%</div>
                    <div className="text-muted-foreground">Actual</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{(prediction.confidence * 100).toFixed(1)}%</div>
                    <div className="text-muted-foreground">Confidence</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {prediction.predicted < prediction.actual ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <span className="font-medium">{Math.abs(prediction.predicted - prediction.actual)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
