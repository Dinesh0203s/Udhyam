import type { Metadata } from "next"
import { EventDetails } from "@/components/event-details"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Event Details - UDHAYAM",
  description: "Event details and registration",
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <EventDetails eventId={id} />
      <Footer />
    </div>
  )
}
