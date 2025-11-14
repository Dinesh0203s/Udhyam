import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRightIcon, ZapIcon, UsersIcon, TrophyIcon, CalendarIcon } from "@/lib/svg-icons"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  const features = [
    {
      icon: CalendarIcon,
      title: "Multiple Events",
      description: "Explore a diverse range of cultural, technical, and sports events",
    },
    {
      icon: ZapIcon,
      title: "Easy Registration",
      description: "Quick onboarding and seamless event registration process",
    },
    {
      icon: UsersIcon,
      title: "Community",
      description: "Connect with thousands of participants from across the country",
    },
    {
      icon: TrophyIcon,
      title: "Rewards",
      description: "Earn points, unlock achievements, and win amazing prizes",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      name: "Tech Hackathon",
      category: "Technical",
      date: "15 Nov 2024",
      participants: 256,
      image: "/tech-hackathon-coding-competition.jpg",
    },
    {
      id: 2,
      name: "Dance Battle",
      category: "Cultural",
      date: "16 Nov 2024",
      participants: 128,
      image: "/dance-competition-performance.jpg",
    },
    {
      id: 3,
      name: "Cricket Tournament",
      category: "Sports",
      date: "17 Nov 2024",
      participants: 320,
      image: "/cricket-sports-tournament.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Welcome to UDHAYAM</p>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                Experience India's Premier Intercollege Fest
              </h1>
            </div>
            <p className="text-xl text-muted-foreground text-balance">
              Discover amazing events, connect with fellow participants, and create unforgettable memories across
              cultural, technical, and sports competitions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/events">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <img
                src="/college-fest-celebration-diverse-students.jpg"
                alt="UDHAYAM Fest"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Why Choose UDHAYAM?</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Everything you need to discover, register, and participate in the best college events
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">Upcoming Events</h2>
            <Link href="/events">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {event.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.participants} participants joined</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Ready to join India's biggest fest?
          </h2>
          <p className="text-xl text-blue-100 mb-8 text-balance">
            Start your journey with UDHAYAM today and be part of an amazing community
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Create Your Profile
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
