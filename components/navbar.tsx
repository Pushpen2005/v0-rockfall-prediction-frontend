"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, User, ChevronDown, Languages, X, MapPin, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { ThemeToggle } from "@/components/theme-toggle"
import alertsData from "@/data/alerts.json"

const searchData = [
  {
    id: "1",
    type: "sensor",
    title: "Sensor S-001",
    description: "Seismic sensor - North Wall",
    location: "Zone A",
    href: "/monitoring",
  },
  {
    id: "2",
    type: "sensor",
    title: "Sensor S-015",
    description: "Vibration sensor - East Slope",
    location: "Zone B",
    href: "/monitoring",
  },
  {
    id: "3",
    type: "alert",
    title: "High Risk Alert",
    description: "Rockfall probability increased",
    location: "Zone A",
    href: "/alerts",
  },
  {
    id: "4",
    type: "alert",
    title: "Maintenance Required",
    description: "Sensor calibration needed",
    location: "Zone C",
    href: "/alerts",
  },
  {
    id: "5",
    type: "report",
    title: "Weekly Safety Report",
    description: "Generated on 2024-01-15",
    location: "All Zones",
    href: "/alerts",
  },
  {
    id: "6",
    type: "report",
    title: "Incident Analysis",
    description: "December 2023 summary",
    location: "Zone B",
    href: "/analytics",
  },
  {
    id: "7",
    type: "page",
    title: "Analytics Dashboard",
    description: "View trends and patterns",
    location: "Dashboard",
    href: "/analytics",
  },
  {
    id: "8",
    type: "page",
    title: "Settings",
    description: "System configuration",
    location: "Admin",
    href: "/settings",
  },
]

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [filteredResults, setFilteredResults] = useState(searchData)
  const [notifications, setNotifications] = useState(alertsData.alerts)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const activeAlerts = notifications.filter((alert) => alert.status === "active")
    setUnreadCount(activeAlerts.length)
  }, [notifications])

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications
      if (Math.random() > 0.7) {
        const newNotification = {
          id: `ALERT-${Date.now()}`,
          severity: ["high", "medium", "critical"][Math.floor(Math.random() * 3)] as "high" | "medium" | "critical",
          type: "sensor_alert",
          title: "New Alert Generated",
          description: `Sensor anomaly detected at ${new Date().toLocaleTimeString()}`,
          location: ["North Wall - Zone A", "East Slope - Zone B", "South Bench - Zone C"][
            Math.floor(Math.random() * 3)
          ],
          timestamp: new Date().toISOString(),
          status: "active" as const,
          sensorId: `SENS-${Math.floor(Math.random() * 10) + 1}`,
        }

        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 most recent
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults(searchData)
    } else {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredResults(filtered)
    }
  }, [searchQuery])

  const handleSearchSelect = (href: string) => {
    setSearchOpen(false)
    setSearchQuery("")
    router.push(href)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sensor":
        return <div className="h-2 w-2 rounded-full bg-blue-500" />
      case "alert":
        return <AlertTriangle className="h-3 w-3 text-destructive" />
      case "report":
        return <div className="h-2 w-2 rounded-full bg-green-500" />
      case "page":
        return <div className="h-2 w-2 rounded-full bg-purple-500" />
      default:
        return <div className="h-2 w-2 rounded-full bg-muted-foreground" />
    }
  }

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
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const handleNotificationClick = (notificationId: string) => {
    // Mark as acknowledged and navigate to alerts page
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === notificationId ? { ...notif, status: "acknowledged" as const } : notif)),
    )
    setNotificationOpen(false)
    router.push("/alerts")
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.status === "active" ? { ...notif, status: "acknowledged" as const } : notif)),
    )
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleEmergencyContactsClick = () => {
    router.push("/emergency-contacts")
  }

  const handleSignOut = () => {
    // Clear any stored auth data
    localStorage.removeItem("auth-token")
    // Redirect to landing page
    router.push("/")
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-sm px-6 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sensors, alerts, reports..."
                className="pl-10 bg-background/50 border-input/50 focus:border-primary/50 focus:bg-background transition-all duration-200 cursor-pointer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => {
                    setSearchQuery("")
                    setSearchOpen(false)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandList className="max-h-[300px]">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Search Results">
                  {filteredResults.map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSearchSelect(item.href)}
                      className="flex items-start gap-3 p-3 cursor-pointer"
                    >
                      <div className="flex items-center justify-center mt-1">{getTypeIcon(item.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 w-9">
              <Languages className="h-4 w-4" />
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-9 w-9 hover:bg-accent/50 transition-colors">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center animate-pulse-glow"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                      Mark all read
                    </Button>
                  )}
                </div>
                <CardDescription>
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification, index) => (
                        <div key={notification.id}>
                          <div
                            className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                              notification.status === "active" ? "bg-muted/20" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">{getStatusIcon(notification.status)}</div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant={getSeverityColor(notification.severity) as any} className="text-xs">
                                    {notification.severity.toUpperCase()}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                </div>
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>{notification.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {index < notifications.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setNotificationOpen(false)
                      router.push("/alerts")
                    }}
                  >
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent/50 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Safety Engineer</span>
                <span className="text-xs text-muted-foreground">Mine Site A</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm border-border/50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-accent/50" onClick={handleProfileClick}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent/50">Switch Site</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-accent/50" onClick={handleEmergencyContactsClick}>
              Emergency Contacts
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-destructive/10 text-destructive" onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
