"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { time: "00:00", risk: 15, displacement: 1.2, vibration: 0.3 },
  { time: "04:00", risk: 18, displacement: 1.4, vibration: 0.4 },
  { time: "08:00", risk: 25, displacement: 1.8, vibration: 0.6 },
  { time: "12:00", risk: 45, displacement: 2.1, vibration: 0.8 },
  { time: "16:00", risk: 65, displacement: 2.3, vibration: 1.2 },
  { time: "20:00", risk: 85, displacement: 2.8, vibration: 1.5 },
  { time: "24:00", risk: 78, displacement: 2.6, vibration: 1.3 },
]

export function RiskTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Risk Probability Trend</CardTitle>
        <CardDescription>24-hour rockfall risk assessment with contributing factors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="risk"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#riskGradient)"
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="displacement" stroke="hsl(var(--chart-2))" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="vibration" stroke="hsl(var(--chart-3))" strokeWidth={1} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            <span>Risk Probability (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2"></div>
            <span>Displacement (mm)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3"></div>
            <span>Vibration (m/s²)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
