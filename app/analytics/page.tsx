"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AnalyticsInsights } from "@/components/analytics-insights"
import { RiskyZonesChart } from "@/components/risky-zones-chart"
import { CorrelationMatrix } from "@/components/correlation-matrix"
import { TrendAnalysis } from "@/components/trend-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
                <p className="text-muted-foreground">Advanced data analysis and insights for mining safety</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary">
                  <BarChart3 className="h-3 w-3 mr-1" />
                  15,000+ Data Points
                </Badge>
                <Badge variant="outline" className="text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  89.2% Accuracy
                </Badge>
              </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="insights" className="space-y-6">
              <TabsList>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="zones">Risk Zones</TabsTrigger>
                <TabsTrigger value="correlations">Correlations</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-6">
                <AnalyticsInsights />
              </TabsContent>

              <TabsContent value="zones" className="space-y-6">
                <RiskyZonesChart />
              </TabsContent>

              <TabsContent value="correlations" className="space-y-6">
                <CorrelationMatrix />
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <TrendAnalysis />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
