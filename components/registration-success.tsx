"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Download, Share2, Home } from "lucide-react"

interface RegistrationSuccessProps {
  eventId: string
}

export function RegistrationSuccess({ eventId }: RegistrationSuccessProps) {
  const [registration, setRegistration] = useState<any>(null)

  useEffect(() => {
    const reg = localStorage.getItem(`registration_${eventId}`)
    if (reg) {
      setRegistration(JSON.parse(reg))
    }
  }, [eventId])

  if (!registration) {
    return null
  }

  const ticketId = `UDHYAM-${eventId}-${Date.now()}`

  return (
    <div className="py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
          <h1 className="text-4xl font-bold text-foreground">Registration Confirmed!</h1>
          <p className="text-lg text-muted-foreground">You're all set for {registration.eventName}</p>
        </div>

        {/* Digital Pass */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 rounded-2xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Digital Pass</h2>
            <div className="space-y-4">
              <div>
                <p className="text-blue-100 text-sm">Event</p>
                <p className="text-2xl font-bold">{registration.eventName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-100 text-sm">Team</p>
                  <p className="font-semibold">{registration.teamName}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Member</p>
                  <p className="font-semibold">{registration.memberName}</p>
                </div>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-2">Ticket ID</p>
                <p className="font-mono text-lg font-bold bg-white/10 p-3 rounded-lg">{ticketId}</p>
              </div>
              <div className="pt-4 border-t border-blue-400">
                <div className="w-32 h-32 bg-white p-2 rounded-lg">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center text-xs text-gray-600 font-mono">
                    QR {ticketId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Registration Details */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-foreground text-lg">Registration Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{registration.memberEmail}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium text-foreground">{registration.memberPhone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Registered At</span>
              <span className="font-medium text-foreground">
                {new Date(registration.registeredAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Download className="w-4 h-4" />
            Download Pass
          </Button>
          <Button variant="outline" className="flex-1 gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Check your email for event details and updates</p>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
