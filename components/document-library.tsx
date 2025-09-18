"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, User } from "lucide-react"

const documents = [
  {
    id: "DOC-001",
    title: "Mining Safety Handbook 2024",
    description: "Comprehensive safety guidelines and procedures for all mining operations",
    type: "Handbook",
    size: "2.4 MB",
    lastUpdated: "2024-01-10",
    author: "Safety Department",
    downloadUrl: "#",
  },
  {
    id: "DOC-002",
    title: "Emergency Evacuation Procedures",
    description: "Step-by-step evacuation protocols for different emergency scenarios",
    type: "Procedure",
    size: "1.8 MB",
    lastUpdated: "2024-01-08",
    author: "Emergency Response Team",
    downloadUrl: "#",
  },
  {
    id: "DOC-003",
    title: "Rockfall Risk Assessment Guidelines",
    description: "Technical guidelines for assessing and mitigating rockfall risks",
    type: "Technical Guide",
    size: "3.2 MB",
    lastUpdated: "2024-01-05",
    author: "Geological Team",
    downloadUrl: "#",
  },
  {
    id: "DOC-004",
    title: "PPE Requirements and Standards",
    description: "Personal protective equipment specifications and usage guidelines",
    type: "Standards",
    size: "1.1 MB",
    lastUpdated: "2024-01-03",
    author: "Safety Department",
    downloadUrl: "#",
  },
  {
    id: "DOC-005",
    title: "Sensor Maintenance Manual",
    description: "Technical manual for maintaining and calibrating safety sensors",
    type: "Manual",
    size: "4.7 MB",
    lastUpdated: "2023-12-28",
    author: "Technical Team",
    downloadUrl: "#",
  },
  {
    id: "DOC-006",
    title: "Weather Monitoring Protocols",
    description: "Guidelines for monitoring weather conditions and risk assessment",
    type: "Protocol",
    size: "2.1 MB",
    lastUpdated: "2023-12-25",
    author: "Meteorology Team",
    downloadUrl: "#",
  },
]

interface DocumentLibraryProps {
  searchTerm: string
}

export function DocumentLibrary({ searchTerm }: DocumentLibraryProps) {
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Handbook":
        return "default"
      case "Procedure":
        return "destructive"
      case "Technical Guide":
        return "secondary"
      case "Standards":
        return "outline"
      case "Manual":
        return "secondary"
      case "Protocol":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Document Library
        </CardTitle>
        <CardDescription>Downloadable safety documents, manuals, and procedures</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <Badge variant={getTypeColor(doc.type) as any}>{doc.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Updated: {formatDate(doc.lastUpdated)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{doc.author}</span>
                    </div>
                    <div>
                      <span>Size: {doc.size}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
