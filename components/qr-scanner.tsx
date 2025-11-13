"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Zap } from "lucide-react"

interface ScannedData {
  ticketId: string
  name: string
  event: string
  timestamp: string
  status: "success" | "error" | "duplicate"
}

export function QRScanner() {
  const [scannedData, setScannedData] = useState<ScannedData[]>([])
  const [manualInput, setManualInput] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("1")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [currentTicket, setCurrentTicket] = useState<ScannedData | null>(null)

  useEffect(() => {
    // Request camera permission
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false))
  }, [])

  const events = [
    { id: "1", name: "Tech Hackathon" },
    { id: "2", name: "Dance Battle" },
    { id: "3", name: "Cricket Tournament" },
  ]

  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualInput.trim()) {
      processTicket(manualInput, "manual")
      setManualInput("")
    }
  }

  const processTicket = (ticketId: string, source: "camera" | "manual") => {
    const isDuplicate = scannedData.some((d) => d.ticketId === ticketId && d.status === "success")

    const ticketData: ScannedData = {
      ticketId,
      name: `Participant ${Math.floor(Math.random() * 1000)}`,
      event: events.find((e) => e.id === selectedEvent)?.name || "Unknown Event",
      timestamp: new Date().toLocaleTimeString(),
      status: isDuplicate ? "duplicate" : "success",
    }

    setCurrentTicket(ticketData)
    setScannedData((prev) => [ticketData, ...prev])

    setTimeout(() => setCurrentTicket(null), 3000)
  }

  const successCount = scannedData.filter((d) => d.status === "success").length
  const duplicateCount = scannedData.filter((d) => d.status === "duplicate").length

  return (
    <div className="py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">QR Scanner</h1>
          <p className="text-muted-foreground mt-1">Scan participant QR codes for event check-in</p>
        </div>

        {/* Scanner Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scanner Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Event Selection */}
            <Card className="p-4">
              <label className="block text-sm font-medium text-foreground mb-3">Select Event</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </Card>

            {/* Camera Feed or Manual Entry */}
            {hasPermission === true ? (
              <Card className="p-4 aspect-square bg-black rounded-lg flex items-center justify-center relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg" />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <div className="absolute inset-0 border-4 border-green-500 rounded-lg pointer-events-none" />
                <div className="absolute top-4 left-4 right-4 text-center text-white">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p className="text-sm">Point camera at QR code</p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center space-y-4 bg-muted">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Camera access required. Please enable camera permissions.</p>
              </Card>
            )}

            {/* Manual Entry */}
            <Card className="p-4">
              <form onSubmit={handleManualScan} className="space-y-3">
                <label className="block text-sm font-medium text-foreground">Manual Entry</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter ticket ID manually"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Stats & Feedback */}
          <div className="space-y-4">
            {/* Current Scan Result */}
            {currentTicket && (
              <Card
                className={`p-6 text-center ${
                  currentTicket.status === "success" ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <CheckCircle2
                  className={`w-12 h-12 mx-auto mb-3 ${
                    currentTicket.status === "success" ? "text-green-600" : "text-yellow-600"
                  }`}
                />
                <p className={`font-bold ${currentTicket.status === "success" ? "text-green-600" : "text-yellow-600"}`}>
                  {currentTicket.status === "success" ? "Check-in Successful!" : "Duplicate Entry!"}
                </p>
                <p className="text-sm text-foreground mt-2">{currentTicket.name}</p>
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{successCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Check-ins</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">{duplicateCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Duplicates</p>
              </Card>
            </div>

            {/* Recent Scans */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Recent Scans</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {scannedData.slice(0, 10).map((data, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-xs ${data.status === "success" ? "bg-green-50" : "bg-yellow-50"}`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${data.status === "success" ? "text-green-600" : "text-yellow-600"}`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{data.name}</p>
                        <p className="text-muted-foreground">{data.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
