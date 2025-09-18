"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    id: "faq-001",
    question: "What should I do if I receive a high-risk alert?",
    answer:
      "Immediately evacuate the affected area and report to your designated assembly point. Acknowledge the alert in the system and wait for further instructions from the safety coordinator. Do not re-enter the area until given explicit clearance.",
    category: "Emergency Response",
    priority: "Critical",
  },
  {
    id: "faq-002",
    question: "How often are the AI predictions updated?",
    answer:
      "AI predictions are updated every 15 minutes using real-time sensor data. The system continuously analyzes environmental conditions, ground movement, and weather patterns to provide the most current risk assessments.",
    category: "AI System",
    priority: "High",
  },
  {
    id: "faq-003",
    question: "What does sensor battery low warning mean?",
    answer:
      "A low battery warning indicates that a sensor's power level is below 25%. This may affect data quality and transmission. Report the warning to the maintenance team immediately to schedule battery replacement or solar panel inspection.",
    category: "Equipment",
    priority: "Medium",
  },
  {
    id: "faq-004",
    question: "Can I access restricted areas during medium risk conditions?",
    answer:
      "Medium risk areas require special authorization and safety protocols. You must obtain a permit from the safety supervisor, follow the buddy system, maintain radio contact, and have an evacuation plan before entering.",
    category: "Safety Protocols",
    priority: "High",
  },
  {
    id: "faq-005",
    question: "How accurate are the rockfall predictions?",
    answer:
      "Our AI system maintains an average accuracy of 89.2% based on historical validation. The system uses machine learning models trained on over 15,000 data points and continuously improves its predictions through ongoing analysis.",
    category: "AI System",
    priority: "Medium",
  },
  {
    id: "faq-006",
    question: "What personal protective equipment is required?",
    answer:
      "All personnel must wear hard hats, safety boots with steel toes, high-visibility vests, and safety glasses. Additional equipment like hearing protection may be required in specific areas. Check the PPE requirements for your designated work zone.",
    category: "Safety Equipment",
    priority: "Critical",
  },
  {
    id: "faq-007",
    question: "How do I report a safety concern or hazard?",
    answer:
      "Use the emergency radio frequency for immediate hazards. For non-urgent concerns, use the safety reporting system in the dashboard or contact your supervisor directly. All reports are investigated within 24 hours.",
    category: "Reporting",
    priority: "High",
  },
  {
    id: "faq-008",
    question: "What causes false alarms in the system?",
    answer:
      "False alarms can be caused by equipment malfunctions, extreme weather conditions, or temporary sensor interference. The AI system is designed to minimize false positives, but it's better to err on the side of caution for safety.",
    category: "System Issues",
    priority: "Medium",
  },
]

interface FAQSectionProps {
  searchTerm: string
}

export function FAQSection({ searchTerm }: FAQSectionProps) {
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase()),
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Emergency Response":
        return "destructive"
      case "AI System":
        return "default"
      case "Safety Protocols":
        return "secondary"
      case "Equipment":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Frequently Asked Questions
        </CardTitle>
        <CardDescription>Common questions and answers about the mining safety system</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="hover:no-underline text-left">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-1">
                    <div className="font-semibold mb-2">{faq.question}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getCategoryColor(faq.category) as any} className="text-xs">
                        {faq.category}
                      </Badge>
                      <Badge variant={getPriorityColor(faq.priority) as any} className="text-xs">
                        {faq.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
