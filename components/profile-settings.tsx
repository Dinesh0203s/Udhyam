"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { validateIndianMobile } from "@/lib/validation"

interface UserData {
  fullName?: string
  email: string
  collegeCode?: string
  collegeName?: string
  department?: string
  year?: string
  mobile?: string
}

export function ProfileSettings() {
  const { user, userData, refreshUserData } = useAuth()
  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    email: "",
    collegeCode: "",
    collegeName: "",
    department: "",
    year: "",
    mobile: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobileError, setMobileError] = useState<string | null>(null)

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        collegeCode: userData.collegeCode || "",
        collegeName: userData.collegeName || "",
        department: userData.department || "",
        year: userData.year || "",
        mobile: userData.mobile || "",
      })
    }
  }, [userData])

  const handleSave = async () => {
    if (!user) {
      setError("You must be logged in to update your profile")
      return
    }

    // Validate mobile number if provided
    if (formData.mobile && formData.mobile.trim()) {
      const validation = validateIndianMobile(formData.mobile.trim())
      if (!validation.isValid) {
        setMobileError(validation.error || "Invalid mobile number")
        setError(validation.error || "Please enter a valid mobile number")
        return
      }
      setMobileError(null)
    }

    setIsSaving(true)
    setError(null)

    try {
      // Include all fields (allow empty strings to clear fields)
      const updateData: Record<string, string> = {
        fullName: formData.fullName?.trim() || "",
        collegeCode: formData.collegeCode?.trim() || "",
        collegeName: formData.collegeName?.trim() || "",
        department: formData.department?.trim() || "",
        year: formData.year?.trim() || "",
        mobile: formData.mobile?.trim() || "",
      }

      console.log("Saving profile data:", updateData)
      console.log("User UID:", user.uid)

      const response = await fetch(`/api/users/${user.uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error("API Error Response:", responseData)
        throw new Error(responseData.error || `Failed to update profile: ${response.status}`)
      }

      console.log("Profile updated successfully:", responseData)
      await refreshUserData()
      setSaved(true)
      setIsEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof UserData, value: string) => {
    // Validate mobile number on change
    if (field === "mobile") {
      // Only allow digits and limit to 10
      const cleaned = value.replace(/\D/g, "").slice(0, 10)
      setFormData((prev) => ({ ...prev, mobile: cleaned }))
      
      // Validate if there's a value
      if (cleaned.length > 0) {
        const validation = validateIndianMobile(cleaned)
        setMobileError(validation.isValid ? null : validation.error || null)
      } else {
        setMobileError(null)
      }
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  const handleCancel = () => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        collegeCode: userData.collegeCode || "",
        collegeName: userData.collegeName || "",
        department: userData.department || "",
        year: userData.year || "",
        mobile: userData.mobile || "",
      })
    }
    setIsEditing(false)
    setError(null)
    setMobileError(null)
  }

  if (!user || !userData) {
    return (
      <div className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
            <Link href="/login">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
            </Link>
          </Card>
        </div>
      </div>
    )
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your account information</p>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-400 font-medium">Profile updated successfully!</p>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
          </Card>
        )}

        {/* Profile Card */}
        <Card className="p-8 space-y-6">
          {/* Profile Avatar Section */}
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
              {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {formData.fullName || user.displayName || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{formData.email || user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                value={formData.email}
                disabled
                className="bg-muted cursor-not-allowed"
                title="Email cannot be changed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">College Name</label>
              <Input
                value={formData.collegeName}
                onChange={(e) => handleChange("collegeName", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your college name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">College Code</label>
              <Input
                value={formData.collegeCode}
                onChange={(e) => handleChange("collegeCode", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your college code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Department</label>
              <Input
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your department"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Year</label>
              <Input
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., 1st Year, 2nd Year"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
              <div className="flex gap-2">
                <div className="px-3 py-2 bg-muted rounded-lg text-muted-foreground font-medium text-sm">+91</div>
                <div className="flex-1">
                  <Input
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    disabled={!isEditing}
                    placeholder="10-digit mobile number"
                    type="tel"
                    maxLength={10}
                    className={mobileError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                  />
                  {mobileError && (
                    <p className="text-xs text-red-600 mt-1">{mobileError}</p>
                  )}
                  {!mobileError && formData.mobile && formData.mobile.length === 10 && (
                    <p className="text-xs text-green-600 mt-1">✓ Valid mobile number</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1" disabled={isSaving}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
