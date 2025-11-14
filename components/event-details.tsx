"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, MapPin, Clock, Share2, Heart } from "lucide-react"
import type { IEvent } from "@/models/Event"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [event, setEvent] = useState<IEvent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`)
        const data = await response.json()
        if (data.success) {
          setEvent(data.data)
        }
      } catch (error) {
        console.error("Error fetching event:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  const handleRegister = () => {
    if (event) {
      window.location.href = `/register/${eventId}`
    }
  }

  if (loading) {
    return (
      <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground">Event not found</p>
          <Link href="/events">
            <Button className="mt-4">Back to Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  const heroImage = event.heroImage || event.image || "/placeholder.svg"
  const primaryColor = event.primaryColor || "#2563eb"
  const secondaryColor = event.secondaryColor || "#7c3aed"
  const ctaButtonColor = event.ctaButtonColor || primaryColor
  const ctaText = event.ctaText || "Register Now"
  const feeDisplay = event.fee === 0 ? "Free" : `₹${event.fee}`

  // Determine which tabs to show
  const tabsToShow = []
  tabsToShow.push({ value: "overview", label: "Overview" })
  if (event.showRules && event.rules && event.rules.length > 0) {
    tabsToShow.push({ value: "rules", label: "Rules" })
  }
  if (event.showSchedule && event.schedule && event.schedule.length > 0) {
    tabsToShow.push({ value: "schedule", label: "Schedule" })
  }

  return (
    <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
      <style jsx>{`
        :root {
          --event-primary: ${primaryColor};
          --event-secondary: ${secondaryColor};
        }
      `}</style>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link href="/events">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img src={heroImage} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: `rgba(${hexToRgb(primaryColor)}, 0.8)` }}
                >
                  {event.category}
                </p>
                <h1 className="text-4xl font-bold text-white">{event.name}</h1>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white/20 border-white/30 backdrop-blur-sm"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
              </Button>
            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
              <p className="font-semibold text-foreground">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </Card>
            {event.location && (
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {event.location}
                </p>
              </Card>
            )}
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Registration</p>
              <p className="font-semibold text-foreground">
                {event.participants || 0}/{event.capacity}
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${((event.participants || 0) / event.capacity) * 100}%`,
                    backgroundColor: primaryColor,
                  }}
                />
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Fee</p>
              <p className="font-semibold text-foreground text-2xl text-green-600">{feeDisplay}</p>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabsToShow.length}, 1fr)` }}>
            {tabsToShow.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{event.description}</p>

              {/* Custom Sections */}
              {event.customSections && event.customSections.length > 0 && (
                <div className="space-y-6 mb-6">
                  {event.customSections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                      <div key={index} className="pt-6 border-t border-border">
                        <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}
                </div>
              )}

              {/* Statistics - Only show if enabled */}
              {event.showStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Participants</p>
                    <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Users className="w-6 h-6" style={{ color: primaryColor }} />
                      {event.participants || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Capacity</p>
                    <p className="text-2xl font-bold text-foreground">{event.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Available Spots</p>
                    <p className="text-2xl font-bold text-green-600">
                      {event.capacity - (event.participants || 0)}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {event.showRules && event.rules && event.rules.length > 0 && (
            <TabsContent value="rules" className="space-y-4">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Event Rules & Guidelines</h2>
                <div className="space-y-3">
                  {event.rules.map((rule, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div
                        className="w-6 h-6 rounded-full text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-foreground pt-0.5">{rule}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          )}

          {event.showSchedule && event.schedule && event.schedule.length > 0 && (
            <TabsContent value="schedule" className="space-y-4">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 items-start pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col items-center">
                        <Clock className="w-5 h-5 mb-2" style={{ color: primaryColor }} />
                        <p className="font-semibold text-foreground text-sm whitespace-nowrap">{item.time}</p>
                      </div>
                      <p className="text-muted-foreground flex-1 pt-0.5">{item.event}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Registration Section */}
        <Card
          className="p-8"
          style={{
            background: `linear-gradient(to right, ${primaryColor}15, ${secondaryColor}15)`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Ready to participate?</h3>
              <p className="text-muted-foreground">
                Join {event.participants || 0} participants already registered
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleRegister}
                size="lg"
                className="text-white"
                style={{ backgroundColor: ctaButtonColor }}
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "37, 99, 235"
}
