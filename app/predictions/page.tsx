"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { ConfidenceMeter } from "@/components/confidence-meter"
import { ScenarioSimulator } from "@/components/scenario-simulator"
import { RiskClassificationCards } from "@/components/risk-classification-cards"
import { PredictionHistory } from "@/components/prediction-history"
import { AIInsights } from "@/components/ai-insights"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Zap, Clock } from "lucide-react"
import predictionsData from "@/data/predictions.json"

export default function PredictionsPage() {
  const [simulationParams, setSimulationParams] = useState({
    rainfall: 45,
    slopeAngle: 35,
    vibration: 0.8,
    groundwater: 60,
  })

  const calculateRiskFromParams = (params: typeof simulationParams) => {
    // Simple risk calculation based on parameters
    const rainfallRisk = Math.min(params.rainfall / 100, 1) * 0.4
    const slopeRisk = Math.min(params.slopeAngle / 45, 1) * 0.3
    const vibrationRisk = Math.min(params.vibration / 2, 1) * 0.2
    const groundwaterRisk = Math.min(params.groundwater / 100, 1) * 0.1

    return Math.min((rainfallRisk + slopeRisk + vibrationRisk + groundwaterRisk) * 100, 95)
  }

  const simulatedRisk = calculateRiskFromParams(simulationParams)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">AI Predictions</h1>
                <p className="text-muted-foreground">Advanced machine learning models for rockfall risk assessment</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary">
                  <Brain className="h-3 w-3 mr-1" />
                  Model v2.1.3
                </Badge>
                <Badge variant="outline" className="text-success">
                  <Zap className="h-3 w-3 mr-1" />
                  89.2% Accuracy
                </Badge>
              </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="current" className="space-y-6">
              <TabsList>
                <TabsTrigger value="current">Current Predictions</TabsTrigger>
                <TabsTrigger value="simulator">Scenario Simulator</TabsTrigger>
                <TabsTrigger value="history">Prediction History</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-6">
                {/* AI Confidence and Risk Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <ConfidenceMeter
                      confidence={predictionsData.predictions[0].confidence}
                      accuracy={predictionsData.predictions[0].historicalAccuracy}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <RiskClassificationCards predictions={predictionsData.predictions} />
                  </div>
                </div>

                {/* Detailed Predictions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {predictionsData.predictions.map((prediction) => (
                    <Card key={prediction.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{prediction.zone}</CardTitle>
                          <Badge
                            variant={
                              prediction.riskLevel === "high"
                                ? "destructive"
                                : prediction.riskLevel === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {prediction.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <CardDescription>
                          {(prediction.probability * 100).toFixed(1)}% probability in next{" "}
                          {prediction.timeframe.replace("_", " ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Contributing Factors</div>
                          {prediction.factors.map((factor, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{factor.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{factor.value}</span>
                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${factor.impact * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>Confidence: {(prediction.confidence * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated: {new Date(prediction.lastUpdated).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="simulator" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ScenarioSimulator
                    params={simulationParams}
                    onParamsChange={setSimulationParams}
                    calculatedRisk={simulatedRisk}
                  />
                  <Card>
                    <CardHeader>
                      <CardTitle>Simulation Results</CardTitle>
                      <CardDescription>Risk assessment based on your parameters</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                          <span
                            className={
                              simulatedRisk > 70
                                ? "text-destructive"
                                : simulatedRisk > 40
                                  ? "text-warning"
                                  : "text-success"
                            }
                          >
                            {simulatedRisk.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Rockfall Risk Probability</div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium">Parameter Impact</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Rainfall ({simulationParams.rainfall}mm)</span>
                            <span className="font-medium">{((simulationParams.rainfall / 100) * 40).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Slope Angle ({simulationParams.slopeAngle}°)</span>
                            <span className="font-medium">{((simulationParams.slopeAngle / 45) * 30).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Vibration ({simulationParams.vibration} m/s²)</span>
                            <span className="font-medium">{((simulationParams.vibration / 2) * 20).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Groundwater ({simulationParams.groundwater}%)</span>
                            <span className="font-medium">
                              {((simulationParams.groundwater / 100) * 10).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium mb-2">Recommendations</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {simulatedRisk > 70 && (
                            <>
                              <div>• Immediate evacuation recommended</div>
                              <div>• Deploy additional monitoring</div>
                              <div>• Conduct visual inspection</div>
                            </>
                          )}
                          {simulatedRisk > 40 && simulatedRisk <= 70 && (
                            <>
                              <div>• Increase monitoring frequency</div>
                              <div>• Restrict access to high-risk areas</div>
                              <div>• Prepare evacuation procedures</div>
                            </>
                          )}
                          {simulatedRisk <= 40 && (
                            <>
                              <div>• Continue normal operations</div>
                              <div>• Maintain regular monitoring</div>
                              <div>• Monitor weather conditions</div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <PredictionHistory />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <AIInsights />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
