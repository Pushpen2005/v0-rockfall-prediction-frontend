"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, BarChart3, AlertTriangle, Activity } from "lucide-react"

interface Alert {
  id: string
  severity: string
  title: string
  location: string
  timestamp: string
  status: string
}

interface ReportBuilderProps {
  alerts: Alert[]
}

export function ReportBuilder({ alerts }: ReportBuilderProps) {
  const [reportConfig, setReportConfig] = useState({
    title: "Mining Safety Report",
    dateRange: "last_7_days",
    includeKPIs: true,
    includeAlerts: true,
    includeCharts: true,
    includeSensors: true,
    includeRecommendations: true,
    customNotes: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)

    // In a real app, this would trigger a PDF download
    console.log("Report generated with config:", reportConfig)
  }

  const getDateRangeLabel = (range: string) => {
    switch (range) {
      case "last_24_hours":
        return "Last 24 Hours"
      case "last_7_days":
        return "Last 7 Days"
      case "last_30_days":
        return "Last 30 Days"
      case "custom":
        return "Custom Range"
      default:
        return range
    }
  }

  const getReportStats = () => {
    const activeAlerts = alerts.filter((alert) => alert.status === "active").length
    const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved").length
    const criticalAlerts = alerts.filter((alert) => alert.severity === "critical").length

    return { activeAlerts, resolvedAlerts, criticalAlerts }
  }

  const stats = getReportStats()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report Builder
          </CardTitle>
          <CardDescription>Configure and generate custom safety reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={reportConfig.title}
                onChange={(e) => setReportConfig((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select
                value={reportConfig.dateRange}
                onValueChange={(value) => setReportConfig((prev) => ({ ...prev, dateRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_24_hours">Last 24 Hours</SelectItem>
                  <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Include Sections</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kpis"
                  checked={reportConfig.includeKPIs}
                  onCheckedChange={(checked) =>
                    setReportConfig((prev) => ({ ...prev, includeKPIs: checked as boolean }))
                  }
                />
                <Label htmlFor="kpis" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Key Performance Indicators
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alerts"
                  checked={reportConfig.includeAlerts}
                  onCheckedChange={(checked) =>
                    setReportConfig((prev) => ({ ...prev, includeAlerts: checked as boolean }))
                  }
                />
                <Label htmlFor="alerts" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Alerts Summary
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={reportConfig.includeCharts}
                  onCheckedChange={(checked) =>
                    setReportConfig((prev) => ({ ...prev, includeCharts: checked as boolean }))
                  }
                />
                <Label htmlFor="charts" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Charts & Graphs
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sensors"
                  checked={reportConfig.includeSensors}
                  onCheckedChange={(checked) =>
                    setReportConfig((prev) => ({ ...prev, includeSensors: checked as boolean }))
                  }
                />
                <Label htmlFor="sensors" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Sensor Status
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommendations"
                  checked={reportConfig.includeRecommendations}
                  onCheckedChange={(checked) =>
                    setReportConfig((prev) => ({ ...prev, includeRecommendations: checked as boolean }))
                  }
                />
                <Label htmlFor="recommendations" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  AI Recommendations
                </Label>
              </div>
            </div>
          </div>

          {/* Custom Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any custom notes or observations..."
              value={reportConfig.customNotes}
              onChange={(e) => setReportConfig((prev) => ({ ...prev, customNotes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating Report..." : "Generate PDF Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>Preview of report content for {getDateRangeLabel(reportConfig.dateRange)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Header */}
          <div className="text-center p-4 bg-muted/20 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{reportConfig.title}</h2>
            <p className="text-sm text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
            <p className="text-sm text-muted-foreground">Period: {getDateRangeLabel(reportConfig.dateRange)}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-card border rounded-lg">
              <div className="text-2xl font-bold text-destructive">{stats.activeAlerts}</div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
            </div>
            <div className="text-center p-3 bg-card border rounded-lg">
              <div className="text-2xl font-bold text-success">{stats.resolvedAlerts}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
            <div className="text-center p-3 bg-card border rounded-lg">
              <div className="text-2xl font-bold text-warning">{stats.criticalAlerts}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          </div>

          {/* Sections Preview */}
          <div className="space-y-3">
            <h3 className="font-semibold">Report Sections</h3>
            <div className="space-y-2">
              {reportConfig.includeKPIs && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">✓</Badge>
                  <span>Key Performance Indicators</span>
                </div>
              )}
              {reportConfig.includeAlerts && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">✓</Badge>
                  <span>Alerts Summary ({alerts.length} alerts)</span>
                </div>
              )}
              {reportConfig.includeCharts && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">✓</Badge>
                  <span>Charts & Visualizations</span>
                </div>
              )}
              {reportConfig.includeSensors && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">✓</Badge>
                  <span>Sensor Health Status</span>
                </div>
              )}
              {reportConfig.includeRecommendations && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">✓</Badge>
                  <span>AI-Generated Recommendations</span>
                </div>
              )}
            </div>
          </div>

          {/* Custom Notes Preview */}
          {reportConfig.customNotes && (
            <div className="space-y-2">
              <h3 className="font-semibold">Additional Notes</h3>
              <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">{reportConfig.customNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
