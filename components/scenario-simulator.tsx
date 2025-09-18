"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sliders, RotateCcw, Play } from "lucide-react"

interface ScenarioSimulatorProps {
  params: {
    rainfall: number
    slopeAngle: number
    vibration: number
    groundwater: number
  }
  onParamsChange: (params: any) => void
  calculatedRisk: number
}

export function ScenarioSimulator({ params, onParamsChange, calculatedRisk }: ScenarioSimulatorProps) {
  const updateParam = (key: string, value: number[]) => {
    onParamsChange({ ...params, [key]: value[0] })
  }

  const resetParams = () => {
    onParamsChange({
      rainfall: 45,
      slopeAngle: 35,
      vibration: 0.8,
      groundwater: 60,
    })
  }

  const getRiskLevel = (risk: number) => {
    if (risk > 70) return { level: "HIGH", color: "destructive" }
    if (risk > 40) return { level: "MEDIUM", color: "secondary" }
    return { level: "LOW", color: "outline" }
  }

  const riskInfo = getRiskLevel(calculatedRisk)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-primary" />
          Scenario Simulator
        </CardTitle>
        <CardDescription>Adjust environmental parameters to simulate different risk scenarios</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Risk Display */}
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold mb-1">
            <span
              className={
                calculatedRisk > 70 ? "text-destructive" : calculatedRisk > 40 ? "text-warning" : "text-success"
              }
            >
              {calculatedRisk.toFixed(1)}%
            </span>
          </div>
          <Badge variant={riskInfo.color as any}>{riskInfo.level} RISK</Badge>
        </div>

        {/* Parameter Controls */}
        <div className="space-y-6">
          {/* Rainfall */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rainfall">Rainfall (24h)</Label>
              <span className="text-sm font-medium">{params.rainfall}mm</span>
            </div>
            <Slider
              id="rainfall"
              min={0}
              max={150}
              step={5}
              value={[params.rainfall]}
              onValueChange={(value) => updateParam("rainfall", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0mm</span>
              <span>150mm</span>
            </div>
          </div>

          {/* Slope Angle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slope">Slope Angle</Label>
              <span className="text-sm font-medium">{params.slopeAngle}°</span>
            </div>
            <Slider
              id="slope"
              min={15}
              max={60}
              step={1}
              value={[params.slopeAngle]}
              onValueChange={(value) => updateParam("slopeAngle", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15°</span>
              <span>60°</span>
            </div>
          </div>

          {/* Vibration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="vibration">Ground Vibration</Label>
              <span className="text-sm font-medium">{params.vibration} m/s²</span>
            </div>
            <Slider
              id="vibration"
              min={0}
              max={3}
              step={0.1}
              value={[params.vibration]}
              onValueChange={(value) => updateParam("vibration", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 m/s²</span>
              <span>3 m/s²</span>
            </div>
          </div>

          {/* Groundwater */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="groundwater">Groundwater Level</Label>
              <span className="text-sm font-medium">{params.groundwater}%</span>
            </div>
            <Slider
              id="groundwater"
              min={0}
              max={100}
              step={5}
              value={[params.groundwater]}
              onValueChange={(value) => updateParam("groundwater", value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetParams} className="flex-1 bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button className="flex-1">
            <Play className="h-4 w-4 mr-2" />
            Run Simulation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
