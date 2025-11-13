"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface UserData {
  fullName: string
  email: string
  collegeCode: string
  collegeName: string
  department: string
  year: string
  mobile: string
}

export function ProfileSettings() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const userDataStr = localStorage.getItem("udhyamUser")
    if (userDataStr) {
      setUser(JSON.parse(userDataStr))
    }
  }, [])

  const handleSave = () => {
    if (user) {
      localStorage.setItem("udhyamUser", JSON.stringify(user))
      setSaved(true)
      setIsEditing(false)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleChange = (field: keyof UserData, value: string) => {
    if (user) {
      setUser({ ...user, [field]: value })
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        </div>

        {saved && (
          <Card className="p-4 bg-green-50 border-green-200 text-green-700">Profile updated successfully!</Card>
        )}

        {/* Profile Card */}
        <Card className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                value={user.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input value={user.email} onChange={(e) => handleChange("email", e.target.value)} disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">College Name</label>
              <Input
                value={user.collegeName}
                onChange={(e) => handleChange("collegeName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">College Code</label>
              <Input
                value={user.collegeCode}
                onChange={(e) => handleChange("collegeCode", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Department</label>
              <Input
                value={user.department}
                onChange={(e) => handleChange("department", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Year</label>
              <Input value={user.year} onChange={(e) => handleChange("year", e.target.value)} disabled={!isEditing} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mobile</label>
              <Input
                value={user.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Edit Profile
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
