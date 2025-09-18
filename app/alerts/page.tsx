"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { AlertsTable } from "@/components/alerts-table"
import { AlertsMap } from "@/components/alerts-map"
import { ReportBuilder } from "@/components/report-builder"
import { AlertToast } from "@/components/alert-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Search, Filter } from "lucide-react"
import alertsData from "@/data/alerts.json"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(alertsData.alerts)
  const [filteredAlerts, setFilteredAlerts] = useState(alertsData.alerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showToast, setShowToast] = useState(false)
  const [newAlert, setNewAlert] = useState<any>(null)

  // Simulate new alert
  useEffect(() => {
    const timer = setTimeout(() => {
      const simulatedAlert = {
        id: "ALERT-004",
        severity: "high",
        type: "rockfall_risk",
        title: "Critical Risk Level Detected",
        description: "AI model predicts 92% probability of rockfall in West Wall sector within 12 hours",
        location: "West Wall - Zone D",
        timestamp: new Date().toISOString(),
        status: "active",
        sensorId: "SENS-004",
        confidence: 0.92,
        recommendedActions: [
          "Immediate evacuation of West Wall area",
          "Deploy emergency response team",
          "Activate emergency protocols",
        ],
      }
      setNewAlert(simulatedAlert)
      setShowToast(true)
      setAlerts((prev) => [simulatedAlert, ...prev])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Filter alerts
  useEffect(() => {
    let filtered = alerts

    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter)
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, severityFilter, statusFilter])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const getSeverityCount = (severity: string) => {
    return alerts.filter((alert) => alert.severity === severity && alert.status === "active").length
  }

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Alerts & Reports</h1>
                <p className="text-muted-foreground">Monitor active alerts and generate safety reports</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {getSeverityCount("critical")} Critical
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {getSeverityCount("high")} High
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {getSeverityCount("medium")} Medium
                </Badge>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Tabs defaultValue="table" className="space-y-6">
              <TabsList>
                <TabsTrigger value="table">Alerts Table</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="reports">Report Builder</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="space-y-6">
                <AlertsTable alerts={filteredAlerts} onAcknowledge={acknowledgeAlert} onResolve={resolveAlert} />
              </TabsContent>

              <TabsContent value="map" className="space-y-6">
                <AlertsMap alerts={filteredAlerts} />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <ReportBuilder alerts={alerts} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && newAlert && (
        <AlertToast
          alert={newAlert}
          onClose={() => setShowToast(false)}
          onAcknowledge={() => {
            acknowledgeAlert(newAlert.id)
            setShowToast(false)
          }}
        />
      )}
    </div>
  )
}
