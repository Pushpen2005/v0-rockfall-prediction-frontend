"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, CheckCircle, Power, AlertTriangle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function QuickActions() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isAcknowledging, setIsAcknowledging] = useState(false)
  const [sensorNetworkStatus, setSensorNetworkStatus] = useState(true)
  const [showEvacuationDialog, setShowEvacuationDialog] = useState(false)
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const router = useRouter()

  const handleDownloadReport = async () => {
    setIsDownloading(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create and download a mock report
      const reportData = {
        timestamp: new Date().toISOString(),
        reportType: "Safety Report",
        generatedBy: "RockGuard AI System",
        summary: {
          activeSensors: "24/28",
          riskLevel: "HIGH",
          alertsResolved: 47,
          systemUptime: "99.7%",
        },
      }

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `safety-report-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setActionFeedback({ type: "success", message: "Safety report downloaded successfully!" })
    } catch (error) {
      setActionFeedback({ type: "error", message: "Failed to download report. Please try again." })
    } finally {
      setIsDownloading(false)
      setTimeout(() => setActionFeedback(null), 3000)
    }
  }

  const handleAcknowledgeAlerts = async () => {
    setIsAcknowledging(true)
    try {
      // Simulate acknowledging alerts
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setActionFeedback({ type: "success", message: "All active alerts have been acknowledged!" })
    } catch (error) {
      setActionFeedback({ type: "error", message: "Failed to acknowledge alerts. Please try again." })
    } finally {
      setIsAcknowledging(false)
      setTimeout(() => setActionFeedback(null), 3000)
    }
  }

  const handleToggleSensorNetwork = async () => {
    const newStatus = !sensorNetworkStatus
    setSensorNetworkStatus(newStatus)

    // Simulate network toggle
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setActionFeedback({
      type: "success",
      message: `Sensor network ${newStatus ? "activated" : "deactivated"} successfully!`,
    })
    setTimeout(() => setActionFeedback(null), 3000)
  }

  const handleEmergencyEvacuation = () => {
    // Navigate to emergency contacts page
    router.push("/emergency-contacts")
    setShowEvacuationDialog(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription>Common tasks and emergency controls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <AnimatePresence>
          {actionFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant={actionFeedback.type === "error" ? "destructive" : "default"} className="mb-3">
                <AlertDescription>{actionFeedback.message}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          className="w-full justify-start gap-3 bg-transparent"
          variant="outline"
          onClick={handleDownloadReport}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {isDownloading ? "Generating Report..." : "Download Safety Report"}
        </Button>

        <Button
          className="w-full justify-start gap-3 bg-transparent"
          variant="outline"
          onClick={handleAcknowledgeAlerts}
          disabled={isAcknowledging}
        >
          {isAcknowledging ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
          {isAcknowledging ? "Acknowledging..." : "Acknowledge All Alerts"}
        </Button>

        <Button
          className="w-full justify-start gap-3 bg-transparent"
          variant="outline"
          onClick={handleToggleSensorNetwork}
        >
          <Power className={`h-4 w-4 ${sensorNetworkStatus ? "text-green-500" : "text-red-500"}`} />
          {sensorNetworkStatus ? "Deactivate" : "Activate"} Sensor Network
        </Button>

        <Dialog open={showEvacuationDialog} onOpenChange={setShowEvacuationDialog}>
          <DialogTrigger asChild>
            <Button
              className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent border-destructive/50 hover:bg-destructive/10"
              variant="outline"
            >
              <AlertTriangle className="h-4 w-4" />
              Emergency Evacuation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Emergency Evacuation Protocol
              </DialogTitle>
              <DialogDescription>
                This will initiate emergency evacuation procedures. Are you sure you want to continue?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> This action will trigger site-wide emergency alerts and evacuation
                  procedures.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowEvacuationDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleEmergencyEvacuation}>
                  Initiate Evacuation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
