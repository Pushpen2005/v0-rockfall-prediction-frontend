"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Phone, Plus, Edit, Trash2, AlertTriangle, Shield, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Contact {
  id: string
  name: string
  role: string
  phone: string
  email: string
  department: string
  priority: "high" | "medium" | "low"
  available24h: boolean
}

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Emergency Response Team",
      role: "Emergency Coordinator",
      phone: "+1 (555) 911-0000",
      email: "emergency@miningcorp.com",
      department: "Safety",
      priority: "high",
      available24h: true,
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      role: "Medical Officer",
      phone: "+1 (555) 123-4567",
      email: "medical@miningcorp.com",
      department: "Medical",
      priority: "high",
      available24h: true,
    },
    {
      id: "3",
      name: "Mike Wilson",
      role: "Site Manager",
      phone: "+1 (555) 234-5678",
      email: "mike.wilson@miningcorp.com",
      department: "Operations",
      priority: "medium",
      available24h: false,
    },
    {
      id: "4",
      name: "Local Fire Department",
      role: "Fire & Rescue",
      phone: "911",
      email: "dispatch@localfire.gov",
      department: "External",
      priority: "high",
      available24h: true,
    },
  ])

  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: "",
    role: "",
    phone: "",
    email: "",
    department: "",
    priority: "medium",
    available24h: false,
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name!,
        role: newContact.role || "",
        phone: newContact.phone!,
        email: newContact.email || "",
        department: newContact.department || "",
        priority: newContact.priority as "high" | "medium" | "low",
        available24h: newContact.available24h || false,
      }
      setContacts([...contacts, contact])
      setNewContact({
        name: "",
        role: "",
        phone: "",
        email: "",
        department: "",
        priority: "medium",
        available24h: false,
      })
      setIsAddingContact(false)
    }
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const handleEmergencyCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Emergency Contacts</h1>
            <p className="text-muted-foreground">Quick access to critical emergency contacts</p>
          </div>
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>Add a new emergency contact to your list</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Contact name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={newContact.role}
                      onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                      placeholder="Job title"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="email@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newContact.department}
                    onChange={(e) => setNewContact({ ...newContact, department: e.target.value })}
                    placeholder="Safety, Medical, Operations, etc."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact}>Add Contact</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Emergency Alert */}
        <Alert className="border-destructive/50 bg-destructive/10 mb-6">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Emergency Protocol:</strong> In case of immediate danger, call 911 first, then notify the Emergency
            Response Team.
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-destructive" />
              Quick Emergency Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="destructive" size="lg" className="h-16" onClick={() => handleEmergencyCall("911")}>
                <div className="text-center">
                  <div className="text-lg font-bold">911</div>
                  <div className="text-sm">Emergency Services</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                onClick={() => handleEmergencyCall("+1 (555) 911-0000")}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">Emergency Team</div>
                  <div className="text-sm">Site Response</div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-16 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-transparent"
                onClick={() => handleEmergencyCall("+1 (555) 123-4567")}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">Medical</div>
                  <div className="text-sm">On-site Medical</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <CardDescription>{contact.role}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(contact.priority) as any}>
                        {contact.priority.toUpperCase()}
                      </Badge>
                      {contact.available24h && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Clock className="h-3 w-3 mr-1" />
                          24/7
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono">{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{contact.email}</span>
                      </div>
                    )}
                    {contact.department && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{contact.department}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={() => handleEmergencyCall(contact.phone)} className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
