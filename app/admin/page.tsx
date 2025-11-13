import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Admin Dashboard - UDHYAM",
  description: "Manage events, registrations, and participants",
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AdminDashboard />
    </div>
  )
}
