"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, LogOut, Ticket, Heart, Trophy, Bell, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Dashboard() {
  const router = useRouter()
  const { userData, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [registeredEvents, setRegisteredEvents] = useState([
    {
      id: 1,
      name: "Tech Hackathon",
      category: "Technical",
      date: "15 Nov 2024",
      status: "Registered",
      ticketId: "UDHYAM-2024-001",
    },
    {
      id: 2,
      name: "Photography Workshop",
      category: "Workshop",
      date: "14 Nov 2024",
      status: "Attended",
      ticketId: "UDHYAM-2024-002",
    },
  ])

  const [favoriteEvents] = useState([
    {
      id: 3,
      name: "Dance Battle",
      category: "Cultural",
      date: "16 Nov 2024",
    },
    {
      id: 4,
      name: "Quiz Competition",
      category: "Academic",
      date: "17 Nov 2024",
    },
  ])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!userData) {
    return null
  }

  const stats = [
    { label: "Events Registered", value: registeredEvents.length, icon: Ticket },
    { label: "Events Attended", value: registeredEvents.filter((e) => e.status === "Attended").length, icon: Trophy },
    { label: "Favorites", value: favoriteEvents.length, icon: Heart },
    { label: "Notifications", value: 3, icon: Bell },
  ]

  return (
    <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Welcome, {userData.fullName || userData.displayName || "User"}!</h1>
            <p className="text-muted-foreground mt-2">
              {userData.collegeName} • {userData.department}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/profile">
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <Icon className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">My Events</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="tickets">Digital Pass</TabsTrigger>
          </TabsList>

          {/* My Events Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">My Registered Events</h2>
              <Link href="/events">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Browse More Events
                </Button>
              </Link>
            </div>
            {registeredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No registered events yet</p>
                <Link href="/events" className="mt-4 inline-block">
                  <Button>Explore Events</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {registeredEvents.map((event) => (
                  <Card key={event.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{event.name}</h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                            {event.category}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {event.date}
                          </span>
                          <span
                            className={`text-sm px-3 py-1 rounded-full ${
                              event.status === "Attended"
                                ? "bg-green-50 text-green-600"
                                : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Ticket className="w-4 h-4 mr-1" /> Pass
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Favorite Events</h2>
            {favoriteEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground">No favorite events yet</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {favoriteEvents.map((event) => (
                  <Card key={event.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{event.name}</h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                            {event.category}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {event.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Digital Pass Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Digital Pass</h2>
            <div className="space-y-3">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <h3 className="text-2xl font-bold">{event.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm opacity-90">Ticket ID</p>
                        <p className="font-mono text-lg font-bold">{event.ticketId}</p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <p className="text-sm opacity-90">Name</p>
                          <p className="font-semibold">{userData.fullName || userData.displayName || "User"}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">College</p>
                          <p className="font-semibold">{userData.collegeName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-24 bg-white p-1 rounded-lg">
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center text-xs text-gray-600 font-mono">
                          QR Code
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
