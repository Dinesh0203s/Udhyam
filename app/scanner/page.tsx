import type { Metadata } from "next"
import { QRScanner } from "@/components/qr-scanner"
import { Navigation } from "@/components/navigation"

export const metadata: Metadata = {
  title: "QR Scanner - UDHAYAM",
  description: "Scan attendee QR codes for event check-in",
}

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <QRScanner />
    </div>
  )
}
