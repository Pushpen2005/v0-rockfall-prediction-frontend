"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { SafetyGuidelines } from "@/components/safety-guidelines"
import { EvacuationProcedures } from "@/components/evacuation-procedures"
import { DocumentLibrary } from "@/components/document-library"
import { FAQSection } from "@/components/faq-section"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Shield } from "lucide-react"

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState("")

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
                <h1 className="text-3xl font-bold text-foreground mb-2">Knowledge Hub</h1>
                <p className="text-muted-foreground">Safety guidelines, procedures, and documentation</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary">
                  <BookOpen className="h-3 w-3 mr-1" />
                  50+ Documents
                </Badge>
                <Badge variant="outline" className="text-success">
                  <Shield className="h-3 w-3 mr-1" />
                  Safety First
                </Badge>
              </div>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search knowledge base..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Tabs defaultValue="guidelines" className="space-y-6">
              <TabsList>
                <TabsTrigger value="guidelines">Safety Guidelines</TabsTrigger>
                <TabsTrigger value="procedures">Emergency Procedures</TabsTrigger>
                <TabsTrigger value="documents">Document Library</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="guidelines" className="space-y-6">
                <SafetyGuidelines searchTerm={searchTerm} />
              </TabsContent>

              <TabsContent value="procedures" className="space-y-6">
                <EvacuationProcedures searchTerm={searchTerm} />
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <DocumentLibrary searchTerm={searchTerm} />
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <FAQSection searchTerm={searchTerm} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
