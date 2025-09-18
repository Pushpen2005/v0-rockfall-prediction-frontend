"use client"

import { LandingNavbar } from "@/components/landing-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brain,
  Shield,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Mountain,
  Zap,
  Eye,
  BarChart3,
  Mail,
  MapPin,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="secondary" className="mb-4">
                <Brain className="w-3 h-3 mr-1" />
                AI for Mining Safety
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                AI-powered rockfall prediction for <span className="text-primary">safer mining operations</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                Protect your workforce and assets with advanced machine learning algorithms that predict rockfall events
                before they happen, ensuring mining safety at every step.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="#demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground mb-2">99.2%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Fewer Incidents</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Lives Protected</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Advanced AI Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our cutting-edge platform combines machine learning, real-time monitoring, and predictive analytics to
              revolutionize mining safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Prediction Engine",
                description:
                  "Advanced machine learning algorithms analyze geological data to predict rockfall events with 99.2% accuracy.",
              },
              {
                icon: Activity,
                title: "Real-time Monitoring",
                description: "24/7 sensor network monitoring with instant alerts and automated response protocols.",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Comprehensive data visualization and trend analysis to optimize safety protocols.",
              },
              {
                icon: Shield,
                title: "Safety Protocols",
                description: "Automated evacuation procedures and safety zone management based on risk assessment.",
              },
              {
                icon: Eye,
                title: "Visual Monitoring",
                description: "Interactive heatmaps and 3D visualization of mine sites with risk zone identification.",
              },
              {
                icon: Zap,
                title: "Instant Alerts",
                description: "Multi-channel alert system with SMS, email, and dashboard notifications.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Safety First
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Safety at every step</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We believe in AI's potential to make mining safer for everyone, which means protecting lives and assets
                at every operational step.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Predict",
                    description:
                      "Advanced AI algorithms analyze geological patterns to forecast potential rockfall events.",
                  },
                  {
                    title: "Monitor",
                    description: "Real-time sensor networks provide continuous monitoring of critical mine areas.",
                  },
                  {
                    title: "Protect",
                    description: "Automated safety protocols and evacuation procedures ensure worker protection.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <AlertTriangle className="h-8 w-8 text-warning mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">High Risk</div>
                  <div className="text-sm text-muted-foreground">North Wall Sector</div>
                </Card>
                <Card className="p-6">
                  <Activity className="h-8 w-8 text-success mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">24/28</div>
                  <div className="text-sm text-muted-foreground">Active Sensors</div>
                </Card>
                <Card className="p-6">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">18 days</div>
                  <div className="text-sm text-muted-foreground">Since Last Event</div>
                </Card>
                <Card className="p-6">
                  <TrendingUp className="h-8 w-8 text-accent mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">89.2%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Trusted by mining leaders worldwide</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join hundreds of mining operations that have reduced incidents by 85% and improved safety protocols with
              our AI-powered platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {["BHP", "Rio Tinto", "Newmont", "Barrick Gold"].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-2xl font-bold text-muted-foreground"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose the plan that fits your mining operation's needs. All plans include 24/7 monitoring and support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$2,999",
                period: "/month",
                description: "Perfect for small mining operations",
                features: ["Up to 50 sensors", "Basic AI predictions", "Email alerts", "Standard support"],
                popular: false,
              },
              {
                name: "Professional",
                price: "$7,999",
                period: "/month",
                description: "Ideal for medium-scale operations",
                features: [
                  "Up to 200 sensors",
                  "Advanced AI predictions",
                  "Multi-channel alerts",
                  "Priority support",
                  "Custom reports",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large-scale mining operations",
                features: [
                  "Unlimited sensors",
                  "Custom AI models",
                  "Dedicated support",
                  "On-site training",
                  "API access",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">See RockGuard AI in Action</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Watch how our AI-powered system predicts and prevents rockfall incidents in real mining environments.
            </p>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="text-lg px-8">
                  <Play className="mr-2 h-6 w-6" />
                  Play Demo Video
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-xl text-muted-foreground">
                Ready to enhance your mining safety? Our experts are here to help.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>contact@rockguard.ai</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Mining Safety Center, Perth, Australia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                    <Input placeholder="Company" />
                    <Button className="w-full">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">RockGuard AI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 RockGuard AI. All rights reserved. Protecting mining operations worldwide.
          </div>
        </div>
      </footer>
    </div>
  )
}
