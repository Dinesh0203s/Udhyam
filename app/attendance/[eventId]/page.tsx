import type { Metadata } from "next"
import { AttendanceTracker } from "@/components/attendance-tracker"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "Attendance - UDHAYAM",
  description: "Event attendance tracking",
}

export default function AttendancePage({ params }: { params: { eventId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AttendanceTracker eventId={params.eventId} />
    </div>
  )
}
