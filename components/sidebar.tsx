"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Activity,
  Brain,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Settings,
  ChevronLeft,
  Shield,
  Mountain,
  Award,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard", // Fixed route from "/" to "/dashboard"
    icon: LayoutDashboard,
  },
  {
    name: "Monitoring",
    href: "/monitoring",
    icon: Activity,
  },
  {
    name: "Predictions",
    href: "/predictions",
    icon: Brain,
  },
  {
    name: "Alerts & Reports",
    href: "/alerts",
    icon: AlertTriangle,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Knowledge Hub",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <motion.div
        className={cn(
          "flex h-screen flex-col border-r border-sidebar-border/50 bg-sidebar/95 backdrop-blur-sm shadow-sm",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border/50">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                  <Mountain className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-sidebar-foreground">RockGuard AI</span>
                  <span className="text-xs text-sidebar-foreground/60">Mining Safety</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              const NavButton = (
                <motion.div
                  key={index} // Added key property
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all duration-200",
                        isActive &&
                          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-sm",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            className="text-sm"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </Link>
                </motion.div>
              )

              return collapsed ? (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{NavButton}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-card/95 backdrop-blur-sm">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                NavButton
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="border-t border-sidebar-border/50 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <Shield className="h-3 w-3" />
                  <span>Safety First</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                  <Award className="h-3 w-3 text-warning" />
                  <span>47 Alerts Resolved</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TooltipProvider>
  )
}
