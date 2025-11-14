"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, CheckCircle2, Clock, Search } from "lucide-react"
import Link from "next/link"

interface AttendanceRecord {
  id: number
  name: string
  email: string
  checkInTime: string
  status: "present" | "late" | "pending"
  ticketId: string
}

interface AttendanceTrackerProps {
  eventId: string
}

const eventNames = {
  "1": "Tech Hackathon",
  "2": "Dance Battle",
  "3": "Cricket Tournament",
}

export function AttendanceTracker({ eventId }: AttendanceTrackerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("present")

  const attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      name: "Aditya Kumar",
      email: "aditya@college.edu",
      checkInTime: "08:45 AM",
      status: "present",
      ticketId: "UDHAYAM-1-001",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@college.edu",
      checkInTime: "09:15 AM",
      status: "late",
      ticketId: "UDHAYAM-1-002",
    },
    {
      id: 3,
      name: "Rahul Patel",
      email: "rahul@college.edu",
      checkInTime: "08:50 AM",
      status: "present",
      ticketId: "UDHAYAM-1-003",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@college.edu",
      checkInTime: "-",
      status: "pending",
      ticketId: "UDHAYAM-1-004",
    },
    {
      id: 5,
      name: "Vikram Desai",
      email: "vikram@college.edu",
      checkInTime: "09:00 AM",
      status: "present",
      ticketId: "UDHAYAM-1-005",
    },
  ]

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.ticketId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const presentCount = attendanceRecords.filter((r) => r.status === "present").length
  const lateCount = attendanceRecords.filter((r) => r.status === "late").length
  const pendingCount = attendanceRecords.filter((r) => r.status === "pending").length
  const attendanceRate = Math.round(((presentCount + lateCount) / attendanceRecords.length) * 100)

  const getFilteredByStatus = (status: string) => {
    return filteredRecords.filter((r) => {
      if (status === "present") return r.status === "present"
      if (status === "late") return r.status === "late"
      if (status === "pending") return r.status === "pending"
      return true
    })
  }

  return (
    <div className="py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Attendance Tracker</h1>
            <p className="text-muted-foreground mt-1">{eventNames[eventId as keyof typeof eventNames] || "Event"}</p>
          </div>
          <Link href="/scanner">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Go to Scanner</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Registered</p>
            <p className="text-3xl font-bold text-foreground">{attendanceRecords.length}</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Present</p>
                <p className="text-3xl font-bold text-green-600">{presentCount}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Late</p>
                <p className="text-3xl font-bold text-yellow-600">{lateCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
            <p className="text-3xl font-bold text-blue-600">{attendanceRate}%</p>
          </Card>
        </div>

        {/* Search and Tabs */}
        <Card className="p-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="present">
                Present
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  {presentCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="late">
                Late
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                  {lateCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                  {pendingCount}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Table */}
            {["present", "late", "pending"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Ticket ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Check-in Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredByStatus(tab).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-muted-foreground">
                            No records found
                          </td>
                        </tr>
                      ) : (
                        getFilteredByStatus(tab).map((record) => (
                          <tr key={record.id} className="border-b border-border hover:bg-muted transition-colors">
                            <td className="py-3 px-4 font-medium text-foreground">{record.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{record.email}</td>
                            <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{record.ticketId}</td>
                            <td className="py-3 px-4 text-muted-foreground">{record.checkInTime}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  record.status === "present"
                                    ? "bg-green-50 text-green-600"
                                    : record.status === "late"
                                      ? "bg-yellow-50 text-yellow-600"
                                      : "bg-gray-50 text-gray-600"
                                }`}
                              >
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>

        {/* Export Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Users className="w-4 h-4" />
          Export Attendance Report
        </Button>
      </div>
    </div>
  )
}
