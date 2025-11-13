import type { Metadata } from "next"
import { Dashboard } from "@/components/dashboard"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Dashboard - UDHYAM",
  description: "Your personal dashboard for UDHYAM fest",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Dashboard />
    </div>
  )
}
