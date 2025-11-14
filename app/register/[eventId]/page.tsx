import type { Metadata } from "next"
import { RegistrationForm } from "@/components/registration-form"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Event Registration - UDHAYAM",
  description: "Register for events",
}

export default async function RegistrationPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <RegistrationForm eventId={eventId} />
      </main>
    </div>
  )
}
