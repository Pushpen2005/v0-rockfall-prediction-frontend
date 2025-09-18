"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, MapPin, Clock, Users, Phone, Navigation, CheckCircle2, XCircle } from "lucide-react"

const evacuationZones = [
  {
    id: "ZONE-A",
    name: "North Pit Area",
    status: "active",
    capacity: 150,
    currentOccupancy: 87,
    assemblyPoint: "Assembly Point Alpha",
    estimatedTime: "8-12 minutes",
    routes: ["Route A1", "Route A2", "Route A3"],
    emergencyContact: "+1-555-0101",
  },
  {
    id: "ZONE-B",
    name: "South Processing",
    status: "clear",
    capacity: 200,
    currentOccupancy: 134,
    assemblyPoint: "Assembly Point Beta",
    estimatedTime: "5-8 minutes",
    routes: ["Route B1", "Route B2"],
    emergencyContact: "+1-555-0102",
  },
  {
    id: "ZONE-C",
    name: "Equipment Storage",
    status: "warning",
    capacity: 75,
    currentOccupancy: 23,
    assemblyPoint: "Assembly Point Charlie",
    estimatedTime: "3-5 minutes",
    routes: ["Route C1", "Route C2", "Route C3"],
    emergencyContact: "+1-555-0103",
  },
  {
    id: "ZONE-D",
    name: "Administrative",
    status: "clear",
    capacity: 100,
    currentOccupancy: 45,
    assemblyPoint: "Assembly Point Delta",
    estimatedTime: "2-4 minutes",
    routes: ["Route D1"],
    emergencyContact: "+1-555-0104",
  },
]

const evacuationSteps = [
  {
    step: 1,
    title: "Alert Recognition",
    description: "Acknowledge evacuation alert immediately",
    duration: "0-30 seconds",
    actions: ["Stop all activities", "Listen for instructions", "Check alert details"],
  },
  {
    step: 2,
    title: "Immediate Response",
    description: "Secure equipment and prepare to evacuate",
    duration: "30-60 seconds",
    actions: ["Shut down equipment safely", "Gather essential items", "Assist nearby personnel"],
  },
  {
    step: 3,
    title: "Evacuation Route",
    description: "Follow designated evacuation route",
    duration: "2-10 minutes",
    actions: ["Use assigned route only", "Stay calm and move quickly", "Help others if safe to do so"],
  },
  {
    step: 4,
    title: "Assembly Point",
    description: "Report to designated assembly point",
    duration: "1-2 minutes",
    actions: ["Check in with supervisor", "Account for team members", "Await further instructions"],
  },
]

export function EvacuationProcedures() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "warning":
        return "secondary"
      case "clear":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <XCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "clear":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Evacuation Procedures
          </CardTitle>
          <CardDescription>Emergency evacuation zones, routes, and step-by-step procedures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Evacuation Zones</h3>
              <div className="space-y-3">
                {evacuationZones.map((zone) => (
                  <Card key={zone.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(zone.status) as any} className="flex items-center gap-1">
                              {getStatusIcon(zone.status)}
                              {zone.status.toUpperCase()}
                            </Badge>
                            <span className="font-semibold">{zone.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{zone.id}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {zone.currentOccupancy}/{zone.capacity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{zone.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{zone.assemblyPoint}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-mono text-xs">{zone.emergencyContact}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-sm font-medium">Available Routes:</span>
                          <div className="flex flex-wrap gap-1">
                            {zone.routes.map((route) => (
                              <Badge key={route} variant="outline" className="text-xs">
                                {route}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            View Map
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Test Route
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Evacuation Steps</h3>
              <div className="space-y-4">
                {evacuationSteps.map((step, index) => (
                  <Card key={step.step}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.duration}
                          </Badge>
                        </div>

                        <div className="ml-11 space-y-2">
                          <span className="text-sm font-medium">Actions:</span>
                          <ul className="space-y-1">
                            {step.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <h4 className="font-semibold">Emergency Services</h4>
                  <p className="text-2xl font-bold text-red-500">911</p>
                  <p className="text-sm text-muted-foreground">Fire, Police, Medical</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold">Mine Safety Control</h4>
                  <p className="text-lg font-bold">+1-555-SAFETY</p>
                  <p className="text-sm text-muted-foreground">24/7 Safety Hotline</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold">Site Supervisor</h4>
                  <p className="text-lg font-bold">+1-555-0199</p>
                  <p className="text-sm text-muted-foreground">On-site Emergency Coordinator</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
