"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, CheckCircle, Clock, MapPin, Eye, Check } from "lucide-react"

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  type: string
  title: string
  description: string
  location: string
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  sensorId?: string
  confidence?: number
  recommendedActions?: string[]
}

interface AlertsTableProps {
  alerts: Alert[]
  onAcknowledge: (alertId: string) => void
  onResolve: (alertId: string) => void
}

export function AlertsTable({ alerts, onAcknowledge, onResolve }: AlertsTableProps) {
  const [sortField, setSortField] = useState<keyof Alert>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const handleSort = (field: keyof Alert) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedAlerts = [...alerts].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "acknowledged":
        return <Clock className="h-4 w-4 text-warning" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>{alerts.length} alerts found • Click column headers to sort</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Status</TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("severity")}>
                  Severity {sortField === "severity" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("title")}>
                  Alert {sortField === "title" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("location")}>
                  Location {sortField === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort("timestamp")}>
                  Time {sortField === "timestamp" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAlerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50">
                  <TableCell>{getStatusIcon(alert.status)}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">{alert.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{alert.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatTimestamp(alert.timestamp)}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getStatusIcon(alert.status)}
                              {alert.title}
                            </DialogTitle>
                            <DialogDescription>
                              Alert ID: {alert.id} • {formatTimestamp(alert.timestamp)}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{alert.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Location</h4>
                                <p className="text-sm">{alert.location}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Sensor ID</h4>
                                <p className="text-sm">{alert.sensorId || "N/A"}</p>
                              </div>
                            </div>
                            {alert.confidence && (
                              <div>
                                <h4 className="font-semibold mb-2">AI Confidence</h4>
                                <p className="text-sm">{(alert.confidence * 100).toFixed(1)}%</p>
                              </div>
                            )}
                            {alert.recommendedActions && (
                              <div>
                                <h4 className="font-semibold mb-2">Recommended Actions</h4>
                                <ul className="text-sm space-y-1">
                                  {alert.recommendedActions.map((action, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-muted-foreground">•</span>
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {alert.status === "active" && (
                        <Button variant="outline" size="sm" onClick={() => onAcknowledge(alert.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}

                      {alert.status === "acknowledged" && (
                        <Button variant="outline" size="sm" onClick={() => onResolve(alert.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
