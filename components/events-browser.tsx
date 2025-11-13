"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, Users } from "lucide-react"

interface Event {
  id: number
  name: string
  category: string
  date: string
  time: string
  location: string
  participants: number
  capacity: number
  description: string
  image: string
  fee: string
}

export function EventsBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Technical", "Cultural", "Sports", "Academic", "Workshop"]

  const allEvents: Event[] = [
    {
      id: 1,
      name: "Tech Hackathon",
      category: "Technical",
      date: "15 Nov 2024",
      time: "09:00 AM",
      location: "Main Auditorium",
      participants: 256,
      capacity: 500,
      description: "48-hour coding marathon with amazing prizes",
      image: "/tech-hackathon-coding-competition.jpg",
      fee: "Free",
    },
    {
      id: 2,
      name: "Dance Battle",
      category: "Cultural",
      date: "16 Nov 2024",
      time: "05:00 PM",
      location: "Dance Studio",
      participants: 128,
      capacity: 200,
      description: "Showcase your dance moves in this thrilling competition",
      image: "/dance-competition-performance.jpg",
      fee: "Free",
    },
    {
      id: 3,
      name: "Cricket Tournament",
      category: "Sports",
      date: "17 Nov 2024",
      time: "08:00 AM",
      location: "Sports Ground",
      participants: 320,
      capacity: 400,
      description: "Inter-college cricket tournament with knockout rounds",
      image: "/cricket-sports-tournament.jpg",
      fee: "Free",
    },
    {
      id: 4,
      name: "Photography Workshop",
      category: "Workshop",
      date: "14 Nov 2024",
      time: "03:00 PM",
      location: "Studio",
      participants: 45,
      capacity: 50,
      description: "Learn professional photography techniques",
      image: "/placeholder.svg?key=hwq12",
      fee: "200",
    },
    {
      id: 5,
      name: "Debate Championship",
      category: "Academic",
      date: "18 Nov 2024",
      time: "02:00 PM",
      location: "Debate Hall",
      participants: 89,
      capacity: 150,
      description: "National-level debate competition on current affairs",
      image: "/placeholder.svg?key=mwp89",
      fee: "Free",
    },
    {
      id: 6,
      name: "Web Development Bootcamp",
      category: "Workshop",
      date: "19 Nov 2024",
      time: "10:00 AM",
      location: "Lab Block",
      participants: 72,
      capacity: 100,
      description: "Learn full-stack web development in 2 days",
      image: "/placeholder.svg?key=hq2wx",
      fee: "500",
    },
    {
      id: 7,
      name: "Music Night",
      category: "Cultural",
      date: "20 Nov 2024",
      time: "07:00 PM",
      location: "Open Air Theater",
      participants: 500,
      capacity: 1000,
      description: "Live music performances from local and national artists",
      image: "/placeholder.svg?key=hqu82",
      fee: "100",
    },
    {
      id: 8,
      name: "Basketball Championship",
      category: "Sports",
      date: "21 Nov 2024",
      time: "04:00 PM",
      location: "Basketball Court",
      participants: 200,
      capacity: 300,
      description: "Exciting inter-college basketball tournament",
      image: "/placeholder.svg?key=hq9po",
      fee: "Free",
    },
  ]

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore Events</h1>
          <p className="text-muted-foreground">Discover and register for amazing events at UDHYAM</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "bg-blue-600 text-white" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground text-lg">No events found matching your search</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                  <div className="aspect-video overflow-hidden bg-muted relative">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground line-clamp-2">{event.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {event.participants}/{event.capacity} participants
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="font-bold text-foreground">
                        {event.fee === "Free" ? "Free" : `₹${event.fee}`}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Register
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
