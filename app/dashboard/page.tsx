"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, userData, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else if (!userData?.isOnboarded) {
        router.push("/onboarding")
      }
    }
  }, [user, userData, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!user || !userData?.isOnboarded) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Dashboard />
    </div>
  )
}
