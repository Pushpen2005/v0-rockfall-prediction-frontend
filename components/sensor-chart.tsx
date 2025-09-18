"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Sensor {
  id: string
  name: string
  type: string
  status: string
  readings: Record<string, number>
}

interface SensorChartProps {
  sensor: Sensor
  compact?: boolean
}

// Mock time series data
const generateTimeSeriesData = (sensor: Sensor) => {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const baseValue = Object.values(sensor.readings)[0] || 0

    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      value: baseValue + (Math.random() - 0.5) * baseValue * 0.3,
      secondary: (Object.values(sensor.readings)[1] || 0) + (Math.random() - 0.5) * 2,
    })
  }

  return data
}

export function SensorChart({ sensor, compact = false }: SensorChartProps) {
  const data = generateTimeSeriesData(sensor)
  const height = compact ? 200 : 300

  return (
    <Card>
      <CardHeader className={compact ? "pb-2" : undefined}>
        <CardTitle className={compact ? "text-base" : "text-lg"}>{sensor.name}</CardTitle>
        <CardDescription>{sensor.type.replace("_", " ").toUpperCase()} - Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" />
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
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="Primary Reading"
              />
              <Line
                type="monotone"
                dataKey="secondary"
                stroke="hsl(var(--chart-2))"
                strokeWidth={1}
                dot={false}
                name="Secondary Reading"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
