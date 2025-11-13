import type { Metadata } from "next"
import { EventDetails } from "@/components/event-details"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Event Details - UDHYAM",
  description: "Event details and registration",
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <EventDetails eventId={params.id} />
      <Footer />
    </div>
  )
}
