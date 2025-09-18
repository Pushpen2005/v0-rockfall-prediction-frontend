"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { KPICard } from "@/components/kpi-card"
import { RiskTrendChart } from "@/components/risk-trend-chart"
import { MineHeatmap } from "@/components/mine-heatmap"
import { QuickActions } from "@/components/quick-actions"
import { Activity, Brain, AlertTriangle, Zap, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Mining Safety Dashboard</h1>
              <p className="text-muted-foreground">Real-time monitoring and AI-powered rockfall prediction system</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Active Sensors"
                value="24/28"
                subtitle="4 sensors offline"
                icon={Activity}
                status="warning"
                change={{ value: "2 restored", type: "increase" }}
              />
              <KPICard
                title="Current Risk Level"
                value="HIGH"
                subtitle="North Wall sector"
                icon={AlertTriangle}
                status="critical"
                change={{ value: "15% increase", type: "increase" }}
              />
              <KPICard
                title="Last Rockfall Event"
                value="18 days"
                subtitle="South Bench - Minor"
                icon={Clock}
                status="normal"
                change={{ value: "No change", type: "neutral" }}
              />
              <KPICard
                title="Prediction Accuracy"
                value="89.2%"
                subtitle="Last 30 predictions"
                icon={Brain}
                status="normal"
                change={{ value: "2.1% improvement", type: "increase" }}
              />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RiskTrendChart />
              </div>
              <div className="space-y-6">
                <QuickActions />
              </div>
            </div>

            {/* Mine Heatmap */}
            <div className="grid grid-cols-1 gap-6">
              <MineHeatmap />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard title="System Uptime" value="99.7%" subtitle="Last 30 days" icon={Zap} status="normal" />
              <KPICard
                title="Alerts Resolved"
                value="47"
                subtitle="This week"
                icon={TrendingUp}
                status="normal"
                change={{ value: "12% increase", type: "increase" }}
              />
              <KPICard title="Data Points" value="2.4M" subtitle="Collected today" icon={Activity} status="normal" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
