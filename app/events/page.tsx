import type { Metadata } from "next"
import { EventsBrowser } from "@/components/events-browser"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Events - UDHYAM",
  description: "Browse and discover all events at UDHYAM",
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EventsBrowser />
      <Footer />
    </div>
  )
}
