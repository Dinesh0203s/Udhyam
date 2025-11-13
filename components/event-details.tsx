"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, MapPin, Clock, Share2, Heart } from "lucide-react"

interface EventDetailsProps {
  eventId: string
}

const eventData = {
  1: {
    name: "Tech Hackathon",
    category: "Technical",
    date: "15 Nov 2024",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium, Campus",
    participants: 256,
    capacity: 500,
    fee: "Free",
    description: "48-hour coding marathon where you can showcase your programming skills",
    image: "/tech-hackathon-coding-competition.jpg",
    rules: [
      "Teams of 2-4 members",
      "Open for all technical backgrounds",
      "Laptop and internet required",
      "Prizes worth ₹50,000",
    ],
    schedule: [
      { time: "09:00 AM", event: "Registration & Breakfast" },
      { time: "10:00 AM", event: "Opening Ceremony" },
      { time: "10:30 AM", event: "Coding Begins" },
      { time: "01:00 PM", event: "Lunch Break" },
      { time: "05:00 PM", event: "Day 1 Ends" },
    ],
  },
  2: {
    name: "Dance Battle",
    category: "Cultural",
    date: "16 Nov 2024",
    time: "05:00 PM - 09:00 PM",
    location: "Dance Studio, Block C",
    participants: 128,
    capacity: 200,
    fee: "Free",
    description: "Showcase your dance moves in this thrilling competition across various genres",
    image: "/dance-competition-performance.jpg",
    rules: [
      "Individual and group performances allowed",
      "Music track must be provided",
      "Performance duration: 3-5 minutes",
      "Props allowed",
      "Winners get trophies and certificates",
    ],
    schedule: [
      { time: "05:00 PM", event: "Registration" },
      { time: "05:30 PM", event: "First Round" },
      { time: "07:30 PM", event: "Finals" },
      { time: "09:00 PM", event: "Awards & Closing" },
    ],
  },
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const event = eventData[eventId as keyof typeof eventData] || eventData[1]

  const handleRegister = () => {
    localStorage.setItem("registeredEvent", JSON.stringify(event))
    alert(`Registered for ${event.name}!`)
  }

  return (
    <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
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
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-blue-300 text-sm font-semibold mb-2">{event.category}</p>
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
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {event.location}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Registration</p>
              <p className="font-semibold text-foreground">
                {event.participants}/{event.capacity}
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(event.participants / event.capacity) * 100}%` }}
                />
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Fee</p>
              <p className="font-semibold text-foreground text-2xl text-green-600">
                {event.fee === "Free" ? "Free" : `₹${event.fee}`}
              </p>
            </Card>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Participants</p>
                  <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-600" />
                    {event.participants}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Capacity</p>
                  <p className="text-2xl font-bold text-foreground">{event.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Available Spots</p>
                  <p className="text-2xl font-bold text-green-600">{event.capacity - event.participants}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Event Rules & Guidelines</h2>
              <div className="space-y-3">
                {event.rules.map((rule, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-foreground pt-0.5">{rule}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

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
                      <Clock className="w-5 h-5 text-blue-600 mb-2" />
                      <p className="font-semibold text-foreground text-sm whitespace-nowrap">{item.time}</p>
                    </div>
                    <p className="text-muted-foreground flex-1 pt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Registration Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Ready to participate?</h3>
              <p className="text-muted-foreground">Join {event.participants} participants already registered</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleRegister} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Register Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
