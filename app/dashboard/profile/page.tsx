import type { Metadata } from "next"
import { ProfileSettings } from "@/components/profile-settings"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Profile Settings - UDHAYAM",
  description: "Manage your profile",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfileSettings />
    </div>
  )
}
