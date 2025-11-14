import type { Metadata } from "next"
import { RegistrationSuccess } from "@/components/registration-success"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Registration Successful - UDHAYAM",
  description: "Your registration has been confirmed",
}

export default async function RegistrationSuccessPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <RegistrationSuccess eventId={eventId} />
    </div>
  )
}
