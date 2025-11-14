"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, Users, Loader2 } from "lucide-react"
import type { IEvent } from "@/models/Event"

export function EventsBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [events, setEvents] = useState<IEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = ["All", "Technical", "Cultural", "Sports", "Academic", "Workshop"]

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/events")
        const data = await response.json()
        if (data.success) {
          setEvents(data.data)
        } else {
          setError("Failed to load events")
        }
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore Events</h1>
          <p className="text-muted-foreground">Discover and register for amazing events at UDHAYAM</p>
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
        {loading ? (
          <div className="col-span-full py-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : error ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  {searchTerm || selectedCategory !== "All"
                    ? "No events found matching your search"
                    : "No events available at the moment"}
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const eventImage = event.image || event.heroImage || "/placeholder.svg"
                const feeDisplay = event.fee === 0 ? "Free" : `₹${event.fee}`
                
                return (
                  <Link key={event._id.toString()} href={`/events/${event._id}`}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                      <div className="aspect-video overflow-hidden bg-muted relative">
                        <img
                          src={eventImage}
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
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {event.date} • {event.time}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span className="text-xs">📍</span>
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {event.participants || 0}/{event.capacity} participants
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="font-bold text-foreground">{feeDisplay}</span>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Register
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
