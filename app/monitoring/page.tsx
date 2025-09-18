"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { SensorCard } from "@/components/sensor-card"
import { SensorChart } from "@/components/sensor-chart"
import { SensorMap } from "@/components/sensor-map"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Map, GitCompare, Filter } from "lucide-react"
import sensorsData from "@/data/sensors.json"

export default function MonitoringPage() {
  const [selectedSensors, setSelectedSensors] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const toggleSensorSelection = (sensorId: string) => {
    setSelectedSensors((prev) => (prev.includes(sensorId) ? prev.filter((id) => id !== sensorId) : [...prev, sensorId]))
  }

  const selectedSensorData = sensorsData.sensors.filter((sensor) => selectedSensors.includes(sensor.id))

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Sensor Monitoring</h1>
                <p className="text-muted-foreground">Real-time sensor health and data visualization</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-success">
                  {sensorsData.sensors.filter((s) => s.status === "online").length} Online
                </Badge>
                <Badge variant="outline" className="text-warning">
                  {sensorsData.sensors.filter((s) => s.status === "warning").length} Warning
                </Badge>
                <Badge variant="outline" className="text-destructive">
                  {sensorsData.sensors.filter((s) => s.status === "offline").length} Offline
                </Badge>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4 mr-2" />
                  Map View
                </Button>
              </div>
              <div className="flex items-center gap-2">
                {selectedSensors.length > 0 && (
                  <Badge variant="secondary">
                    <GitCompare className="h-3 w-3 mr-1" />
                    {selectedSensors.length} selected for comparison
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="sensors" className="space-y-6">
              <TabsList>
                <TabsTrigger value="sensors">Sensor Health</TabsTrigger>
                <TabsTrigger value="charts">Real-time Data</TabsTrigger>
                <TabsTrigger value="comparison">Comparison Mode</TabsTrigger>
              </TabsList>

              <TabsContent value="sensors" className="space-y-6">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sensorsData.sensors.map((sensor) => (
                      <SensorCard
                        key={sensor.id}
                        sensor={sensor}
                        isSelected={selectedSensors.includes(sensor.id)}
                        onToggleSelect={() => toggleSensorSelection(sensor.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <SensorMap sensors={sensorsData.sensors} />
                )}
              </TabsContent>

              <TabsContent value="charts" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sensorsData.sensors.slice(0, 4).map((sensor) => (
                    <SensorChart key={sensor.id} sensor={sensor} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                {selectedSensorData.length > 0 ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sensor Comparison</CardTitle>
                        <CardDescription>Comparing {selectedSensorData.length} selected sensors</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {selectedSensorData.map((sensor) => (
                            <SensorChart key={sensor.id} sensor={sensor} compact />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Sensors Selected</h3>
                        <p className="text-muted-foreground">Select sensors from the grid view to compare their data</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
