"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mountain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-xl border-border/50 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Mountain className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
                <CardDescription>RockGuard AI Mining Safety System</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using RockGuard AI's mining safety system, you accept and agree to be bound by
                      the terms and provision of this agreement.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Permission is granted to temporarily use RockGuard AI for personal, non-commercial transitory
                      viewing only. This is the grant of a license, not a transfer of title, and under this license you
                      may not:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose or for any public display</li>
                      <li>attempt to reverse engineer any software contained in the system</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">3. Safety and Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      RockGuard AI provides predictive analytics for mining safety. While our system achieves high
                      accuracy rates, users must maintain proper safety protocols and not rely solely on automated
                      predictions for critical safety decisions.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">4. Data Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We collect and process data necessary for system operation while maintaining strict
                      confidentiality and security standards. Sensor data and operational information are encrypted and
                      stored securely.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">5. Service Availability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Scheduled
                      maintenance will be communicated in advance.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">6. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      For questions about these Terms of Service, please contact us at legal@rockguard.ai
                    </p>
                  </section>
                </div>
              </ScrollArea>

              <div className="flex justify-center pt-4">
                <Button asChild variant="outline">
                  <Link href="/auth/signup">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign Up
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
