import type { Metadata } from "next"
import { AttendanceTracker } from "@/components/attendance-tracker"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Attendance - UDHAYAM",
  description: "Event attendance tracking",
}

export default async function AttendancePage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AttendanceTracker eventId={eventId} />
    </div>
  )
}
