"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon, EditIcon, TrashIcon, PlusIcon, ShieldIcon } from "@/lib/svg-icons"

export type UserRole = "superadmin" | "admin" | "event_admin" | "volunteer"

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: UserRole
  department?: string
  status: "active" | "inactive"
  joinDate: string
}

const ROLE_COLORS: Record<UserRole, string> = {
  superadmin: "bg-red-50 text-red-600",
  admin: "bg-purple-50 text-purple-600",
  event_admin: "bg-blue-50 text-blue-600",
  volunteer: "bg-green-50 text-green-600",
}

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  event_admin: "Event Admin",
  volunteer: "Volunteer",
}

const DEPARTMENTS = ["Technical", "Cultural", "Sports", "Logistics", "Marketing", "Operations"]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@udhayam.com",
      phone: "+91 9876543210",
      role: "superadmin",
      status: "active",
      joinDate: "01 Jan 2024",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@udhayam.com",
      phone: "+91 9876543211",
      role: "admin",
      status: "active",
      joinDate: "05 Feb 2024",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@udhayam.com",
      phone: "+91 9876543212",
      role: "event_admin",
      department: "Technical",
      status: "active",
      joinDate: "10 Mar 2024",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@udhayam.com",
      phone: "+91 9876543213",
      role: "event_admin",
      department: "Cultural",
      status: "active",
      joinDate: "12 Mar 2024",
    },
    {
      id: 5,
      name: "Vikram Sharma",
      email: "vikram@udhayam.com",
      phone: "+91 9876543214",
      role: "volunteer",
      department: "Sports",
      status: "active",
      joinDate: "15 Mar 2024",
    },
    {
      id: 6,
      name: "Ananya Das",
      email: "ananya@udhayam.com",
      phone: "+91 9876543215",
      role: "volunteer",
      department: "Logistics",
      status: "inactive",
      joinDate: "18 Mar 2024",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all")
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "volunteer" as UserRole,
    department: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAddUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }

    const newUser: User = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      department: formData.department || undefined,
      status: "active",
      joinDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    }

    setUsers([...users, newUser])
    setFormData({ name: "", email: "", phone: "", role: "volunteer", department: "" })
    setIsAddingUser(false)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const roleStats = [
    {
      role: "superadmin" as UserRole,
      label: "Super Admins",
      count: users.filter((u) => u.role === "superadmin").length,
    },
    { role: "admin" as UserRole, label: "Admins", count: users.filter((u) => u.role === "admin").length },
    {
      role: "event_admin" as UserRole,
      label: "Event Admins",
      count: users.filter((u) => u.role === "event_admin").length,
    },
    { role: "volunteer" as UserRole, label: "Volunteers", count: users.filter((u) => u.role === "volunteer").length },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {roleStats.map((stat) => (
          <Card key={stat.role} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.count}</p>
              </div>
              <div className={`${ROLE_COLORS[stat.role]} p-3 rounded-lg`}>
                <ShieldIcon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter and Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | "all")}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Roles</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="event_admin">Event Admin</option>
            <option value="volunteer">Volunteer</option>
          </select>
          <Button
            onClick={() => setIsAddingUser(!isAddingUser)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </Card>

      {/* Add User Form */}
      {isAddingUser && (
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white"
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white"
            />
            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white"
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="volunteer">Volunteer</option>
              <option value="event_admin">Event Admin</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {(formData.role === "event_admin" || formData.role === "volunteer") && (
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 text-white">
              Save User
            </Button>
            <Button onClick={() => setIsAddingUser(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Users Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Users ({filteredUsers.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-semibold text-foreground px-4">Name</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Email</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Phone</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Role</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Department</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Status</th>
                <th className="text-left py-3 font-semibold text-foreground px-4">Join Date</th>
                <th className="text-right py-3 font-semibold text-foreground px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[user.role]}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.department || "-"}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          user.status === "active"
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                    <td className="py-3 px-4 text-right flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="gap-1 bg-transparent hover:bg-red-50"
                      >
                        <TrashIcon className="w-4 h-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Permissions Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Role Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-600 mb-2">Super Admin</h4>
            <ul className="text-xs text-red-700 space-y-1">
              <li>✓ Full system access</li>
              <li>✓ Manage all admins and roles</li>
              <li>✓ Create and delete events</li>
              <li>✓ View all reports and analytics</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-600 mb-2">Admin</h4>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>✓ Manage events and registrations</li>
              <li>✓ Manage event admins</li>
              <li>✓ View payment reports</li>
              <li>✗ Cannot delete events</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-600 mb-2">Event Admin</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>✓ Manage assigned events</li>
              <li>✓ Handle registrations</li>
              <li>✓ Manage volunteers for event</li>
              <li>✓ Check attendance</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-600 mb-2">Volunteer</h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>✓ Manage event attendance</li>
              <li>✓ Check participant details</li>
              <li>✓ Mark attendance via QR</li>
              <li>✗ Cannot modify events</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
