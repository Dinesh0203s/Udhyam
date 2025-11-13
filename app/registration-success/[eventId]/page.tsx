import type { Metadata } from "next"
import { RegistrationSuccess } from "@/components/registration-success"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Registration Successful - UDHYAM",
  description: "Your registration has been confirmed",
}

export default function RegistrationSuccessPage({ params }: { params: { eventId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <RegistrationSuccess eventId={params.eventId} />
    </div>
  )
}
