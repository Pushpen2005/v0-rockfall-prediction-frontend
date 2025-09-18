"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, HardHat, Radio, Eye } from "lucide-react"

const guidelines = [
  {
    id: "personal-safety",
    title: "Personal Protective Equipment (PPE)",
    icon: HardHat,
    priority: "Critical",
    content: [
      "Hard hats must be worn at all times in designated areas",
      "Safety boots with steel toes are mandatory",
      "High-visibility vests required in all operational zones",
      "Safety glasses must be worn when operating equipment",
      "Hearing protection required in high-noise areas (>85dB)",
    ],
  },
  {
    id: "hazard-awareness",
    title: "Hazard Recognition and Reporting",
    icon: Eye,
    priority: "High",
    content: [
      "Report any visible cracks or loose rocks immediately",
      "Monitor weather conditions and rainfall levels",
      "Be aware of ground vibrations from blasting operations",
      "Watch for changes in water seepage patterns",
      "Report unusual sounds or movements in rock faces",
    ],
  },
  {
    id: "communication",
    title: "Communication Protocols",
    icon: Radio,
    priority: "High",
    content: [
      "Maintain radio contact with control center at all times",
      "Use designated emergency frequencies for urgent communications",
      "Report location when entering high-risk zones",
      "Acknowledge all safety alerts within 2 minutes",
      "Follow proper radio etiquette and clear speech",
    ],
  },
  {
    id: "restricted-areas",
    title: "Restricted Area Access",
    icon: AlertTriangle,
    priority: "Critical",
    content: [
      "Never enter red-zone areas without explicit authorization",
      "Obtain permits before accessing medium-risk zones",
      "Follow buddy system in all high-risk areas",
      "Respect all safety barriers and warning signs",
      "Exit restricted areas immediately upon alert signals",
    ],
  },
  {
    id: "emergency-response",
    title: "Emergency Response Procedures",
    icon: Shield,
    priority: "Critical",
    content: [
      "Know the location of all emergency exits and assembly points",
      "Understand evacuation routes for your work area",
      "Respond immediately to evacuation alarms",
      "Assist injured personnel only if safe to do so",
      "Report to designated assembly areas for headcount",
    ],
  },
]

interface SafetyGuidelinesProps {
  searchTerm: string
}

export function SafetyGuidelines({ searchTerm }: SafetyGuidelinesProps) {
  const filteredGuidelines = guidelines.filter(
    (guideline) =>
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.content.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "secondary"
      case "Medium":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Safety Guidelines
        </CardTitle>
        <CardDescription>Essential safety protocols and procedures for mining operations</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {filteredGuidelines.map((guideline) => {
            const IconComponent = guideline.icon
            return (
              <AccordionItem key={guideline.id} value={guideline.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{guideline.title}</span>
                    <Badge variant={getPriorityColor(guideline.priority) as any}>{guideline.priority}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-3">
                    {guideline.content.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </CardContent>
    </Card>
  )
}
