import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface Prediction {
  id: string
  zone: string
  riskLevel: "high" | "medium" | "low"
  probability: number
  timeframe: string
  confidence: number
}

interface RiskClassificationCardsProps {
  predictions: Prediction[]
}

export function RiskClassificationCards({ predictions }: RiskClassificationCardsProps) {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="h-6 w-6 text-destructive" />
      case "medium":
        return <Clock className="h-6 w-6 text-warning" />
      case "low":
        return <CheckCircle className="h-6 w-6 text-success" />
      default:
        return <CheckCircle className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "border-destructive bg-destructive/5"
      case "medium":
        return "border-warning bg-warning/5"
      case "low":
        return "border-success bg-success/5"
      default:
        return "border-border bg-muted/5"
    }
  }

  const groupedPredictions = predictions.reduce(
    (acc, prediction) => {
      if (!acc[prediction.riskLevel]) {
        acc[prediction.riskLevel] = []
      }
      acc[prediction.riskLevel].push(prediction)
      return acc
    },
    {} as Record<string, Prediction[]>,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* High Risk */}
      <Card className={`${getRiskColor("high")} border-2`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getRiskIcon("high")}
            High Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedPredictions.high?.map((prediction) => (
            <div key={prediction.id} className="space-y-1">
              <div className="font-medium text-sm">{prediction.zone}</div>
              <div className="text-xs text-muted-foreground">
                {(prediction.probability * 100).toFixed(1)}% in {prediction.timeframe.replace("_", " ")}
              </div>
              <Badge variant="destructive" className="text-xs">
                EVACUATE
              </Badge>
            </div>
          )) || <div className="text-sm text-muted-foreground">No high-risk zones</div>}
        </CardContent>
      </Card>

      {/* Medium Risk */}
      <Card className={`${getRiskColor("medium")} border-2`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getRiskIcon("medium")}
            Medium Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedPredictions.medium?.map((prediction) => (
            <div key={prediction.id} className="space-y-1">
              <div className="font-medium text-sm">{prediction.zone}</div>
              <div className="text-xs text-muted-foreground">
                {(prediction.probability * 100).toFixed(1)}% in {prediction.timeframe.replace("_", " ")}
              </div>
              <Badge variant="secondary" className="text-xs">
                MONITOR
              </Badge>
            </div>
          )) || <div className="text-sm text-muted-foreground">No medium-risk zones</div>}
        </CardContent>
      </Card>

      {/* Low Risk */}
      <Card className={`${getRiskColor("low")} border-2`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getRiskIcon("low")}
            Low Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groupedPredictions.low?.map((prediction) => (
            <div key={prediction.id} className="space-y-1">
              <div className="font-medium text-sm">{prediction.zone}</div>
              <div className="text-xs text-muted-foreground">
                {(prediction.probability * 100).toFixed(1)}% in {prediction.timeframe.replace("_", " ")}
              </div>
              <Badge variant="outline" className="text-xs">
                NORMAL OPS
              </Badge>
            </div>
          )) || <div className="text-sm text-muted-foreground">No low-risk zones</div>}
        </CardContent>
      </Card>
    </div>
  )
}
