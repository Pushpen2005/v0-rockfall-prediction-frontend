"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mountain, ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
                <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
                <CardDescription>How we protect your data and privacy</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Data Protection</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      RockGuard AI is committed to protecting your privacy and ensuring the security of your personal
                      and operational data. We implement industry-standard security measures to safeguard all
                      information.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Information We Collect</h2>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong>Sensor Data:</strong> Seismic readings, vibration measurements, and environmental
                        conditions from mining equipment and monitoring devices.
                      </p>
                      <p>
                        <strong>User Information:</strong> Account details, role information, and system usage patterns
                        for service optimization.
                      </p>
                      <p>
                        <strong>Operational Data:</strong> Mine site configurations, safety protocols, and incident
                        reports for predictive analysis.
                      </p>
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">How We Use Your Data</h2>
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li>Provide real-time rockfall prediction and safety alerts</li>
                      <li>Improve AI model accuracy through machine learning</li>
                      <li>Generate safety reports and analytics dashboards</li>
                      <li>Ensure system security and prevent unauthorized access</li>
                      <li>Comply with mining safety regulations and standards</li>
                    </ul>
                  </section>

                  <Separator />

                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Data Security</h2>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        <strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256
                        encryption.
                      </p>
                      <p>
                        <strong>Access Control:</strong> Role-based access ensures only authorized personnel can view
                        sensitive information.
                      </p>
                      <p>
                        <strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection systems protect
                        against threats.
                      </p>
                      <p>
                        <strong>Compliance:</strong> We adhere to industry standards including ISO 27001 and mining
                        safety regulations.
                      </p>
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Sensor data is retained for analysis and model improvement. Personal information is kept only as
                      long as necessary for service provision. You may request data deletion at any time.
                    </p>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Access your personal data and usage information</li>
                      <li>Request corrections to inaccurate information</li>
                      <li>Delete your account and associated data</li>
                      <li>Export your data in a portable format</li>
                      <li>Opt-out of non-essential data processing</li>
                    </ul>
                  </section>

                  <Separator />

                  <section>
                    <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      For privacy-related questions or to exercise your rights, contact our Data Protection Officer at
                      privacy@rockguard.ai
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
