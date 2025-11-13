import type { Metadata } from "next"
import { RegistrationForm } from "@/components/registration-form"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Event Registration - UDHYAM",
  description: "Register for events",
}

export default function RegistrationPage({ params }: { params: { eventId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <RegistrationForm eventId={params.eventId} />
      </main>
    </div>
  )
}
