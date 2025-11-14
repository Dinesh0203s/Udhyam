"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  CreditCardIcon,
  DollarIcon,
  TrendingUpIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  CalendarIcon,
  UsersIcon,
} from "@/lib/svg-icons"
import { UserManagement } from "./user-management"

const SimpleLineChart = ({
  data,
  height = 300,
}: { data: Array<{ date: string; registrations: number }>; height?: number }) => {
  const maxValue = Math.max(...data.map((d) => d.registrations))
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.registrations / maxValue) * 80,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <svg viewBox="0 0 100 100" height={height} className="w-full">
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#2563eb"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <g fontSize="3" textAnchor="middle">
        {data.map((d, i) => (
          <text key={i} x={(i / (data.length - 1)) * 100} y="98">
            {d.date.split(" ")[1]}
          </text>
        ))}
      </g>
    </svg>
  )
}

const SimpleBarChart = ({
  data,
  height = 400,
}: { data: Array<{ event: string; revenue: number }>; height?: number }) => {
  const maxValue = Math.max(...data.map((d) => d.revenue))

  return (
    <svg viewBox="0 0 100 100" height={height} className="w-full">
      {data.map((d, i) => {
        const barHeight = (d.revenue / maxValue) * 70
        const x = 10 + i * 22
        const y = 80 - barHeight

        return (
          <g key={i}>
            <rect x={x} y={y} width="18" height={barHeight} fill="#2563eb" rx="1" />
            <text x={x + 9} y="95" fontSize="2.5" textAnchor="middle" fill="#666">
              {d.event.split(" ")[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

const SimplePieChart = ({ data, size = 120 }: { data: Array<{ name: string; value: number }>; size?: number }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c"]

  let currentAngle = 0
  const slices = data.map((d, i) => {
    const sliceAngle = (d.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle

    const radius = size / 2
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = size / 2 + radius * Math.cos(startRad)
    const y1 = size / 2 + radius * Math.sin(startRad)
    const x2 = size / 2 + radius * Math.cos(endRad)
    const y2 = size / 2 + radius * Math.sin(endRad)

    const largeArc = sliceAngle > 180 ? 1 : 0
    const pathD = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`

    currentAngle = endAngle

    return {
      pathD,
      color: COLORS[i % COLORS.length],
      name: d.name,
      value: d.value,
      percent: ((d.value / total) * 100).toFixed(0),
    }
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow">
        {slices.map((slice, i) => (
          <path key={i} d={slice.pathD} fill={slice.color} />
        ))}
      </svg>
      <div className="space-y-1 text-sm">
        {slices.map((slice, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="text-muted-foreground">
              {slice.name}: {slice.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  const stats = [
    { label: "Total Events", value: "8", icon: CalendarIcon, color: "text-blue-600", bgColor: "bg-blue-50" },
    {
      label: "Total Registrations",
      value: "1,245",
      icon: UsersIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    { label: "Total Revenue", value: "₹95,000", icon: DollarIcon, color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Growth", value: "+28%", icon: TrendingUpIcon, color: "text-orange-600", bgColor: "bg-orange-50" },
  ]

  // Chart Data
  const registrationTrend = [
    { date: "Nov 10", registrations: 120 },
    { date: "Nov 11", registrations: 250 },
    { date: "Nov 12", registrations: 380 },
    { date: "Nov 13", registrations: 520 },
    { date: "Nov 14", registrations: 680 },
    { date: "Nov 15", registrations: 850 },
  ]

  const paymentStats = [
    { method: "Razorpay", count: 856, amount: 78500 },
    { method: "Direct Transfer", count: 245, amount: 12000 },
    { method: "Offline", count: 144, amount: 4500 },
  ]

  const dailyRevenue = [
    { date: "Nov 10", revenue: 8000 },
    { date: "Nov 11", revenue: 12500 },
    { date: "Nov 12", revenue: 15000 },
    { date: "Nov 13", revenue: 18200 },
    { date: "Nov 14", revenue: 21300 },
    { date: "Nov 15", revenue: 20000 },
  ]

  const eventPerformance = [
    { name: "Tech Hackathon", value: 256 },
    { name: "Cricket", value: 320 },
    { name: "Dance Battle", value: 128 },
    { name: "Others", value: 541 },
  ]

  // Events Data
  const events = [
    { id: 1, name: "Tech Hackathon", date: "15 Nov", status: "Active", registrations: 256, capacity: 500 },
    { id: 2, name: "Dance Battle", date: "16 Nov", status: "Active", registrations: 128, capacity: 200 },
    { id: 3, name: "Cricket Tournament", date: "17 Nov", status: "Active", registrations: 320, capacity: 400 },
    { id: 4, name: "Photography Workshop", date: "14 Nov", status: "Completed", registrations: 45, capacity: 50 },
    { id: 5, name: "Debate Championship", date: "18 Nov", status: "Scheduled", registrations: 89, capacity: 150 },
  ]

  const recentRegistrations = [
    {
      id: 1,
      name: "Team Alpha",
      event: "Tech Hackathon",
      date: "15 Nov",
      status: "Confirmed",
      amount: 0,
      paymentMethod: "Free",
    },
    {
      id: 2,
      name: "Dance Squad",
      event: "Dance Battle",
      date: "15 Nov",
      status: "Confirmed",
      amount: 0,
      paymentMethod: "Free",
    },
    {
      id: 3,
      name: "Shutterbugs",
      event: "Photography Workshop",
      date: "14 Nov",
      status: "Confirmed",
      amount: 200,
      paymentMethod: "Razorpay",
    },
    {
      id: 4,
      name: "Cricket United",
      event: "Cricket Tournament",
      date: "15 Nov",
      status: "Pending",
      amount: 500,
      paymentMethod: "Pending",
    },
    {
      id: 5,
      name: "Tech Warriors",
      event: "Web Dev Bootcamp",
      date: "14 Nov",
      status: "Confirmed",
      amount: 500,
      paymentMethod: "Direct Transfer",
    },
    {
      id: 6,
      name: "Music Band",
      event: "Music Festival",
      date: "16 Nov",
      status: "Confirmed",
      amount: 300,
      paymentMethod: "Razorpay",
    },
  ]

  const filteredRegistrations = recentRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.event.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 py-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage UDHAYAM fest operations</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-fit">
            <PlusIcon className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Registration Trend */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Registration Trend</h3>
                <SimpleLineChart data={registrationTrend} height={300} />
              </Card>

              {/* Event Performance */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Event Performance</h3>
                <div className="flex justify-center">
                  <SimplePieChart data={eventPerformance} size={200} />
                </div>
              </Card>
            </div>

            {/* Recent Registrations */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Registrations</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold text-foreground">Team</th>
                      <th className="text-left py-3 font-semibold text-foreground">Event</th>
                      <th className="text-left py-3 font-semibold text-foreground">Date</th>
                      <th className="text-left py-3 font-semibold text-foreground">Status</th>
                      <th className="text-right py-3 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegistrations.slice(0, 5).map((reg) => (
                      <tr key={reg.id} className="border-b border-border hover:bg-muted transition-colors">
                        <td className="py-3 text-foreground font-medium">{reg.name}</td>
                        <td className="py-3 text-muted-foreground">{reg.event}</td>
                        <td className="py-3 text-muted-foreground">{reg.date}</td>
                        <td className="py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="py-3 text-right flex gap-2 justify-end">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Revenue Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Daily Revenue</h3>
                <SimpleBarChart data={dailyRevenue} height={300} />
              </Card>

              {/* Payment Methods */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Payment Methods</h3>
                <div className="space-y-4">
                  {paymentStats.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCardIcon className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-semibold text-foreground">{method.method}</p>
                          <p className="text-xs text-muted-foreground">{method.count} transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">₹{method.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{((method.amount / 95000) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 border-2 border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <DollarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Collected</p>
                    <p className="text-2xl font-bold text-foreground">₹95,000</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-yellow-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <CreditCardIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Payments</p>
                    <p className="text-2xl font-bold text-foreground">₹2,500</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <TrendingUpIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                    <p className="text-2xl font-bold text-foreground">₹76.24</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Transactions Table */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold text-foreground px-4">Team</th>
                      <th className="text-left py-3 font-semibold text-foreground px-4">Event</th>
                      <th className="text-left py-3 font-semibold text-foreground px-4">Amount</th>
                      <th className="text-left py-3 font-semibold text-foreground px-4">Payment Method</th>
                      <th className="text-left py-3 font-semibold text-foreground px-4">Status</th>
                      <th className="text-left py-3 font-semibold text-foreground px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegistrations
                      .filter((reg) => reg.amount > 0)
                      .map((reg) => (
                        <tr key={reg.id} className="border-b border-border hover:bg-muted transition-colors">
                          <td className="py-3 px-4 text-foreground font-medium">{reg.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{reg.event}</td>
                          <td className="py-3 px-4 font-bold text-foreground">₹{reg.amount}</td>
                          <td className="py-3 px-4 text-muted-foreground">{reg.paymentMethod}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                reg.status === "Confirmed"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-yellow-50 text-yellow-600"
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{reg.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-10" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Event</Button>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{event.name}</h4>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{event.date}</span>
                        <span>
                          {event.registrations}/{event.capacity} registrations
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            event.status === "Active"
                              ? "bg-green-50 text-green-600"
                              : event.status === "Completed"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations" className="space-y-4">
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by team or event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-semibold text-foreground px-4">Team</th>
                    <th className="text-left py-3 font-semibold text-foreground px-4">Event</th>
                    <th className="text-left py-3 font-semibold text-foreground px-4">Date</th>
                    <th className="text-left py-3 font-semibold text-foreground px-4">Status</th>
                    <th className="text-left py-3 font-semibold text-foreground px-4">Amount</th>
                    <th className="text-right py-3 font-semibold text-foreground px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 text-foreground font-medium">{reg.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.event}</td>
                      <td className="py-3 px-4 text-muted-foreground">{reg.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            reg.status === "Confirmed" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-foreground">
                        {reg.amount === 0 ? "Free" : `₹${reg.amount}`}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Revenue by Event</h3>
              <SimpleBarChart
                data={[
                  { event: "Photography Workshop", revenue: 9000 },
                  { event: "Web Dev Bootcamp", revenue: 36000 },
                  { event: "Music Night", revenue: 50000 },
                  { event: "Basketball", revenue: 0 },
                ]}
                height={400}
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Participation Rate</h3>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => {
                    const rate = Math.round((event.registrations / event.capacity) * 100)
                    return (
                      <div key={event.id}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{event.name}</span>
                          <span className="text-sm font-semibold text-blue-600">{rate}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${rate}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Avg. Registration per Event</span>
                    <span className="font-bold text-foreground">156</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-bold text-foreground">62%</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="font-bold text-green-600">₹95,000</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
