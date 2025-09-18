import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertTriangle, Calendar } from "lucide-react"

const insights = [
  {
    id: "INS-001",
    type: "pattern",
    title: "Rainfall Correlation Detected",
    description: "90% of rockfall events occur within 48 hours after rainfall exceeding 80mm",
    confidence: 0.94,
    impact: "high",
    actionable: true,
  },
  {
    id: "INS-002",
    type: "seasonal",
    title: "Seasonal Risk Pattern",
    description: "Risk increases by 35% during monsoon season (June-September)",
    confidence: 0.87,
    impact: "medium",
    actionable: true,
  },
  {
    id: "INS-003",
    type: "sensor",
    title: "Vibration Threshold Identified",
    description: "Ground vibrations above 1.2 m/s² correlate with 78% increase in rockfall probability",
    confidence: 0.91,
    impact: "high",
    actionable: true,
  },
  {
    id: "INS-004",
    type: "temporal",
    title: "Time-of-Day Pattern",
    description: "65% of rockfall events occur between 2 AM and 6 AM when temperature differential is highest",
    confidence: 0.82,
    impact: "medium",
    actionable: false,
  },
]

const recommendations = [
  {
    title: "Enhance Rainfall Monitoring",
    description: "Install additional weather stations to improve rainfall prediction accuracy",
    priority: "high",
    effort: "medium",
  },
  {
    title: "Adjust Vibration Thresholds",
    description: "Lower alert thresholds for ground vibration sensors to 1.0 m/s²",
    priority: "high",
    effort: "low",
  },
  {
    title: "Seasonal Protocol Updates",
    description: "Implement enhanced monitoring protocols during monsoon season",
    priority: "medium",
    effort: "high",
  },
]

export function AIInsights() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "pattern":
        return <TrendingUp className="h-4 w-4 text-primary" />
      case "seasonal":
        return <Calendar className="h-4 w-4 text-warning" />
      case "sensor":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Lightbulb className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Machine learning discoveries from historical data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h3 className="font-semibold">{insight.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={insight.impact === "high" ? "destructive" : "secondary"}>
                      {insight.impact.toUpperCase()} IMPACT
                    </Badge>
                    {insight.actionable && <Badge variant="outline">ACTIONABLE</Badge>}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{insight.description}</p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence: {(insight.confidence * 100).toFixed(1)}%</span>
                  <span className="text-muted-foreground">ID: {insight.id}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Suggested actions based on insights and patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={rec.priority === "high" ? "destructive" : "secondary"}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{rec.effort.toUpperCase()} EFFORT</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
