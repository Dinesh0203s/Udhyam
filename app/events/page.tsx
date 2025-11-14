import type { Metadata } from "next"
import { EventsBrowser } from "@/components/events-browser"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Events - UDHAYAM",
  description: "Browse and discover all events at UDHAYAM",
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
