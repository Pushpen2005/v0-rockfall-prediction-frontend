"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Settings,
  Bell,
  Database,
  Shield,
  Download,
  Upload,
  Save,
  RefreshCw,
  Users,
  AlertTriangle,
  Loader2,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      criticalOnly: false,
    },
    display: {
      theme: "dark",
      language: "en",
      timezone: "UTC-7",
      refreshRate: "15",
    },
    alerts: {
      autoAcknowledge: false,
      escalationTime: "30",
      soundEnabled: true,
      vibrationEnabled: true,
    },
    system: {
      dataRetention: "365",
      backupFrequency: "daily",
      maintenanceMode: false,
      debugMode: false,
    },
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState<string | null>(null)
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Operator" })
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Administrator",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Safety Officer",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@company.com",
      role: "Operator",
      status: "Inactive",
      lastLogin: "3 days ago",
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      email: "lisa@company.com",
      role: "Supervisor",
      status: "Active",
      lastLogin: "30 minutes ago",
    },
  ])

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would be an API call
      localStorage.setItem("miningSystemSettings", JSON.stringify(settings))

      setFeedback({ type: "success", message: "Settings saved successfully!" })
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to save settings. Please try again." })
    } finally {
      setIsSaving(false)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleExport = async (type: string) => {
    setIsExporting(type)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let data: any
      let filename: string
      let mimeType: string

      switch (type) {
        case "sensor-data":
          data = generateMockSensorData()
          filename = `sensor-data-${new Date().toISOString().split("T")[0]}.csv`
          mimeType = "text/csv"
          break
        case "alerts":
          data = JSON.stringify(generateMockAlerts(), null, 2)
          filename = `alerts-${new Date().toISOString().split("T")[0]}.json`
          mimeType = "application/json"
          break
        case "reports":
          data = generateMockReportPDF()
          filename = `reports-${new Date().toISOString().split("T")[0]}.txt`
          mimeType = "text/plain"
          break
        default:
          throw new Error("Unknown export type")
      }

      const blob = new Blob([data], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setFeedback({ type: "success", message: `${type.replace("-", " ")} exported successfully!` })
    } catch (error) {
      setFeedback({ type: "error", message: `Failed to export ${type}. Please try again.` })
    } finally {
      setIsExporting(null)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleImport = async (type: string) => {
    setIsImporting(type)
    try {
      // Create file input element
      const input = document.createElement("input")
      input.type = "file"
      input.accept = type === "sensor-config" ? ".json,.csv" : type === "historical-data" ? ".csv" : ".json"

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          // Simulate processing the file
          await new Promise((resolve) => setTimeout(resolve, 2000))
          setFeedback({ type: "success", message: `${type.replace("-", " ")} imported successfully!` })
        }
        setIsImporting(null)
        setTimeout(() => setFeedback(null), 3000)
      }

      input.click()
    } catch (error) {
      setFeedback({ type: "error", message: `Failed to import ${type}. Please try again.` })
      setIsImporting(null)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleRegenerateApiKey = async (keyType: string) => {
    setIsRegenerating(keyType)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFeedback({ type: "success", message: `${keyType} API key regenerated successfully!` })
    } catch (error) {
      setFeedback({ type: "error", message: `Failed to regenerate ${keyType} API key.` })
    } finally {
      setIsRegenerating(null)
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      setFeedback({ type: "error", message: "Please fill in all required fields." })
      setTimeout(() => setFeedback(null), 3000)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: users.length + 1,
        ...newUser,
        status: "Active" as const,
        lastLogin: "Never",
      }

      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "Operator" })
      setShowAddUserDialog(false)
      setFeedback({ type: "success", message: "User added successfully!" })
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to add user. Please try again." })
    } finally {
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers(users.filter((user) => user.id !== userId))
      setFeedback({ type: "success", message: "User deleted successfully!" })
    } catch (error) {
      setFeedback({ type: "error", message: "Failed to delete user." })
    } finally {
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  const generateMockSensorData = () => {
    const headers = "Timestamp,Sensor_ID,Temperature,Humidity,Vibration,Status\n"
    const rows = Array.from({ length: 100 }, (_, i) => {
      const timestamp = new Date(Date.now() - i * 60000).toISOString()
      const sensorId = `SENSOR_${String((i % 24) + 1).padStart(2, "0")}`
      const temp = (20 + Math.random() * 15).toFixed(1)
      const humidity = (40 + Math.random() * 40).toFixed(1)
      const vibration = (Math.random() * 10).toFixed(2)
      const status = Math.random() > 0.1 ? "ACTIVE" : "WARNING"
      return `${timestamp},${sensorId},${temp},${humidity},${vibration},${status}`
    }).join("\n")
    return headers + rows
  }

  const generateMockAlerts = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      severity: ["LOW", "MEDIUM", "HIGH", "CRITICAL"][Math.floor(Math.random() * 4)],
      message: `Alert ${i + 1}: Sensor anomaly detected`,
      sensor: `SENSOR_${String((i % 24) + 1).padStart(2, "0")}`,
      acknowledged: Math.random() > 0.3,
    }))
  }

  const generateMockReportPDF = () => {
    return `MINING SAFETY REPORT
Generated: ${new Date().toISOString()}

EXECUTIVE SUMMARY
- Total Sensors: 28
- Active Sensors: 24
- System Uptime: 99.7%
- Alerts This Week: 47

DETAILED ANALYSIS
[This would contain detailed charts and analysis in a real PDF export]

RECOMMENDATIONS
1. Replace offline sensors in North Wall sector
2. Increase monitoring frequency during shift changes
3. Update calibration for sensors showing drift
`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and manage your account</p>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant={feedback.type === "error" ? "destructive" : "default"} className="mb-4">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Configure display preferences and system behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.display.theme}
                    onValueChange={(value) => handleSettingChange("display", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.display.language}
                    onValueChange={(value) => handleSettingChange("display", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.display.timezone}
                    onValueChange={(value) => handleSettingChange("display", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh">Data Refresh Rate (seconds)</Label>
                  <Select
                    value={settings.display.refreshRate}
                    onValueChange={(value) => handleSettingChange("display", "refreshRate", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "sms", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Critical Alerts Only</Label>
                    <p className="text-sm text-muted-foreground">Only receive high and critical priority alerts</p>
                  </div>
                  <Switch
                    checked={settings.notifications.criticalOnly}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "criticalOnly", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alert Configuration
              </CardTitle>
              <CardDescription>Configure alert behavior and escalation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-acknowledge Low Priority</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically acknowledge low priority alerts after 5 minutes
                    </p>
                  </div>
                  <Switch
                    checked={settings.alerts.autoAcknowledge}
                    onCheckedChange={(checked) => handleSettingChange("alerts", "autoAcknowledge", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="escalation">Escalation Time (minutes)</Label>
                  <Select
                    value={settings.alerts.escalationTime}
                    onValueChange={(value) => handleSettingChange("alerts", "escalationTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Alerts</Label>
                    <p className="text-sm text-muted-foreground">Play sound for new alerts</p>
                  </div>
                  <Switch
                    checked={settings.alerts.soundEnabled}
                    onCheckedChange={(checked) => handleSettingChange("alerts", "soundEnabled", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vibration Alerts</Label>
                    <p className="text-sm text-muted-foreground">Vibrate device for critical alerts (mobile only)</p>
                  </div>
                  <Switch
                    checked={settings.alerts.vibrationEnabled}
                    onCheckedChange={(checked) => handleSettingChange("alerts", "vibrationEnabled", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Export data, manage backups, and configure retention policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export Data</h3>
                  <div className="space-y-2">
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleExport("sensor-data")}
                      disabled={isExporting === "sensor-data"}
                    >
                      {isExporting === "sensor-data" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Export Sensor Data (CSV)
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleExport("alerts")}
                      disabled={isExporting === "alerts"}
                    >
                      {isExporting === "alerts" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Export Alerts (JSON)
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleExport("reports")}
                      disabled={isExporting === "reports"}
                    >
                      {isExporting === "reports" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Export Reports (PDF)
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Import Data</h3>
                  <div className="space-y-2">
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleImport("sensor-config")}
                      disabled={isImporting === "sensor-config"}
                    >
                      {isImporting === "sensor-config" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Import Sensor Configuration
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleImport("historical-data")}
                      disabled={isImporting === "historical-data"}
                    >
                      {isImporting === "historical-data" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Import Historical Data
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => handleImport("user-settings")}
                      disabled={isImporting === "user-settings"}
                    >
                      {isImporting === "user-settings" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Import User Settings
                    </Button>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">System Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retention">Data Retention (days)</Label>
                    <Select
                      value={settings.system.dataRetention}
                      onValueChange={(value) => handleSettingChange("system", "dataRetention", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup">Backup Frequency</Label>
                    <Select
                      value={settings.system.backupFrequency}
                      onValueChange={(value) => handleSettingChange("system", "backupFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Active Users</h3>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={newUser.role}
                            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Administrator">Administrator</SelectItem>
                              <SelectItem value="Safety Officer">Safety Officer</SelectItem>
                              <SelectItem value="Supervisor">Supervisor</SelectItem>
                              <SelectItem value="Operator">Operator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddUser}>Add User</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.role} • Last login: {user.lastLogin}
                        </div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions and system changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API Keys</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Production API Key</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        rg_prod_••••••••••••••••••••••••••••••••
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRegenerateApiKey("Production")}
                      disabled={isRegenerating === "Production"}
                    >
                      {isRegenerating === "Production" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Regenerate
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Development API Key</div>
                      <div className="text-sm text-muted-foreground font-mono">
                        rg_dev_••••••••••••••••••••••••••••••••
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRegenerateApiKey("Development")}
                      disabled={isRegenerating === "Development"}
                    >
                      {isRegenerating === "Development" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
