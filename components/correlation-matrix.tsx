"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const correlationData = [
  { factor1: "Rainfall", factor2: "Rockfall Events", correlation: 0.89, strength: "Very Strong" },
  { factor1: "Ground Vibration", factor2: "Displacement", correlation: 0.76, strength: "Strong" },
  { factor1: "Temperature Diff", factor2: "Rock Expansion", correlation: 0.68, strength: "Moderate" },
  { factor1: "Pore Pressure", factor2: "Slope Stability", correlation: -0.72, strength: "Strong" },
  { factor1: "Rainfall", factor2: "Pore Pressure", correlation: 0.84, strength: "Strong" },
  { factor1: "Vibration", factor2: "Rockfall Events", correlation: 0.65, strength: "Moderate" },
]

const matrixFactors = ["Rainfall", "Vibration", "Temperature", "Pore Pressure", "Displacement", "Rockfall"]

// Generate correlation matrix
const generateMatrix = () => {
  const matrix: number[][] = []
  for (let i = 0; i < matrixFactors.length; i++) {
    matrix[i] = []
    for (let j = 0; j < matrixFactors.length; j++) {
      if (i === j) {
        matrix[i][j] = 1.0
      } else {
        // Find correlation or generate synthetic data
        const found = correlationData.find(
          (item) =>
            (item.factor1.includes(matrixFactors[i]) && item.factor2.includes(matrixFactors[j])) ||
            (item.factor1.includes(matrixFactors[j]) && item.factor2.includes(matrixFactors[i])),
        )
        matrix[i][j] = found ? found.correlation : (Math.random() - 0.5) * 1.6
      }
    }
  }
  return matrix
}

export function CorrelationMatrix() {
  const matrix = generateMatrix()

  const getCorrelationColor = (value: number) => {
    const absValue = Math.abs(value)
    if (absValue >= 0.8) return value > 0 ? "bg-success" : "bg-destructive"
    if (absValue >= 0.6) return value > 0 ? "bg-success/70" : "bg-destructive/70"
    if (absValue >= 0.4) return value > 0 ? "bg-warning" : "bg-warning"
    return "bg-muted"
  }

  const getCorrelationStrength = (value: number) => {
    const absValue = Math.abs(value)
    if (absValue >= 0.8) return "Very Strong"
    if (absValue >= 0.6) return "Strong"
    if (absValue >= 0.4) return "Moderate"
    if (absValue >= 0.2) return "Weak"
    return "Very Weak"
  }

  return (
    <div className="space-y-6">
      {/* Correlation Matrix Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Correlation Matrix Heatmap</CardTitle>
          <CardDescription>Statistical relationships between environmental factors and rockfall events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header row */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                <div></div>
                {matrixFactors.map((factor) => (
                  <div key={factor} className="text-xs font-medium text-center p-2 text-muted-foreground">
                    {factor}
                  </div>
                ))}
              </div>

              {/* Matrix rows */}
              {matrixFactors.map((rowFactor, i) => (
                <div key={rowFactor} className="grid grid-cols-7 gap-1 mb-1">
                  <div className="text-xs font-medium p-2 text-muted-foreground text-right">{rowFactor}</div>
                  {matrixFactors.map((colFactor, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`h-12 w-full rounded flex items-center justify-center text-xs font-medium text-white ${getCorrelationColor(
                        matrix[i][j],
                      )}`}
                      title={`${rowFactor} vs ${colFactor}: ${matrix[i][j].toFixed(2)}`}
                    >
                      {matrix[i][j].toFixed(2)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive rounded"></div>
              <span>Strong Negative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-warning rounded"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted rounded"></div>
              <span>Weak</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded"></div>
              <span>Strong Positive</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Correlations */}
      <Card>
        <CardHeader>
          <CardTitle>Key Correlations</CardTitle>
          <CardDescription>Most significant statistical relationships identified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlationData
              .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
              .map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.factor1} ↔ {item.factor2}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.correlation > 0 ? "Positive" : "Negative"} correlation
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        Math.abs(item.correlation) >= 0.8
                          ? "default"
                          : Math.abs(item.correlation) >= 0.6
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {item.strength}
                    </Badge>
                    <div className="text-lg font-bold min-w-16 text-right">
                      {item.correlation > 0 ? "+" : ""}
                      {item.correlation.toFixed(2)}
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
