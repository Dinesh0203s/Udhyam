"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from "lucide-react"
import type { IEvent } from "@/models/Event"

interface EventFormProps {
  event?: IEvent | null
  onClose: () => void
  onSuccess: () => void
}

const CATEGORIES = ["Technical", "Cultural", "Sports", "Academic", "Workshop"]
const STATUSES = ["Scheduled", "Active", "Completed", "Cancelled"]

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Technical",
    date: "",
    time: "",
    description: "",
    image: "",
    fee: 0,
    capacity: 100,
    participationType: "Solo" as "Solo" | "Team",
    minTeamMembers: 2,
    maxTeamMembers: 4,
    status: "Scheduled" as const,
    // Page Customization
    heroImage: "",
    pageLayout: "default" as "default" | "minimal" | "detailed",
    primaryColor: "#2563eb",
    secondaryColor: "#7c3aed",
    customSections: [] as Array<{ title: string; content: string; order: number }>,
    showStats: true,
    showRules: true,
    showSchedule: true,
    ctaText: "Register Now",
    ctaButtonColor: "#2563eb",
  })

  const [customSectionInput, setCustomSectionInput] = useState({ title: "", content: "" })

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        category: event.category || "Technical",
        date: event.date || "",
        time: event.time || "",
        description: event.description || "",
        image: event.image || "",
        fee: event.fee || 0,
        capacity: event.capacity || 100,
        participationType: event.participationType || "Solo",
        minTeamMembers: event.minTeamMembers || 2,
        maxTeamMembers: event.maxTeamMembers || 4,
        status: event.status || "Scheduled",
        heroImage: event.heroImage || "",
        pageLayout: event.pageLayout || "default",
        primaryColor: event.primaryColor || "#2563eb",
        secondaryColor: event.secondaryColor || "#7c3aed",
        customSections: event.customSections || [],
        showStats: event.showStats !== undefined ? event.showStats : true,
        showRules: event.showRules !== undefined ? event.showRules : true,
        showSchedule: event.showSchedule !== undefined ? event.showSchedule : true,
        ctaText: event.ctaText || "Register Now",
        ctaButtonColor: event.ctaButtonColor || "#2563eb",
      })
    }
  }, [event])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleAddCustomSection = () => {
    if (customSectionInput.title.trim() && customSectionInput.content.trim()) {
      setFormData((prev) => ({
        ...prev,
        customSections: [
          ...prev.customSections,
          {
            title: customSectionInput.title.trim(),
            content: customSectionInput.content.trim(),
            order: prev.customSections.length,
          },
        ],
      }))
      setCustomSectionInput({ title: "", content: "" })
    }
  }

  const handleRemoveCustomSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.name || !formData.date || !formData.time || !formData.description) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.capacity < 1) {
      setError("Seats must be at least 1")
      return
    }

    if (formData.participationType === "Team") {
      if (!formData.minTeamMembers || !formData.maxTeamMembers) {
        setError("Please specify minimum and maximum team members")
        return
      }
      if (formData.minTeamMembers < 1) {
        setError("Minimum team members must be at least 1")
        return
      }
      if (formData.maxTeamMembers < formData.minTeamMembers) {
        setError("Maximum team members must be greater than or equal to minimum")
        return
      }
    }

    setLoading(true)

    try {
      const url = event ? `/api/events/${event._id}` : "/api/events"
      const method = event ? "PUT" : "POST"

      // Prepare data - only include team fields if participationType is Team
      const submitData: any = {
        name: formData.name,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        image: formData.image || "/placeholder.svg",
        fee: formData.fee,
        capacity: formData.capacity,
        participationType: formData.participationType,
        status: formData.status,
        // Page Customization
        heroImage: formData.heroImage || formData.image || "/placeholder.svg",
        pageLayout: formData.pageLayout,
        primaryColor: formData.primaryColor,
        secondaryColor: formData.secondaryColor,
        customSections: formData.customSections,
        showStats: formData.showStats,
        showRules: formData.showRules,
        showSchedule: formData.showSchedule,
        ctaText: formData.ctaText,
        ctaButtonColor: formData.ctaButtonColor,
      }

      if (formData.participationType === "Team") {
        submitData.minTeamMembers = formData.minTeamMembers
        submitData.maxTeamMembers = formData.maxTeamMembers
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save event")
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {event ? "Edit Event" : "Create New Event"}
            </h2>
            <Button variant="outline" size="sm" onClick={onClose} className="bg-transparent">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Event Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Tech Hackathon"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image URL
              </label>
              <Input
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="/tech-hackathon.jpg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="48-hour coding marathon with amazing prizes"
                required
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  placeholder="15 Nov 2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  placeholder="09:00 AM - 05:00 PM"
                  required
                />
              </div>
            </div>

            {/* Event Type (Category) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price and Seats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.fee}
                  onChange={(e) => handleInputChange("fee", parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Seats (Capacity) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", parseInt(e.target.value) || 0)}
                  min="1"
                  placeholder="100"
                  required
                />
              </div>
            </div>

            {/* Team or Solo */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Participation Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.participationType}
                onChange={(e) => handleInputChange("participationType", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="Solo">Solo</option>
                <option value="Team">Team</option>
              </select>
            </div>

            {/* Team Members (Min and Max) - Only show if Team is selected */}
            {formData.participationType === "Team" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Min Team Members <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    value={formData.minTeamMembers}
                    onChange={(e) => handleInputChange("minTeamMembers", parseInt(e.target.value) || 1)}
                    min="1"
                    placeholder="2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Max Team Members <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    value={formData.maxTeamMembers}
                    onChange={(e) => handleInputChange("maxTeamMembers", parseInt(e.target.value) || 4)}
                    min="1"
                    placeholder="4"
                    required
                  />
                </div>
              </div>
            )}

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Page Customization Section */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Page Customization</h3>
              
              {/* Hero Image */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Hero Image URL (for event page)
                </label>
                <Input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => handleInputChange("heroImage", e.target.value)}
                  placeholder="/hero-image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Large banner image displayed at the top of the event page
                </p>
              </div>

              {/* Page Layout */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Page Layout</label>
                <select
                  value={formData.pageLayout}
                  onChange={(e) => handleInputChange("pageLayout", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="default">Default (Full Featured)</option>
                  <option value="minimal">Minimal (Clean & Simple)</option>
                  <option value="detailed">Detailed (All Sections)</option>
                </select>
              </div>

              {/* Color Customization */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                      placeholder="#2563eb"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                      placeholder="#7c3aed"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Section Visibility Toggles */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Show Sections</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showStats}
                      onChange={(e) => handleInputChange("showStats", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">Show Statistics (Participants, Capacity)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showRules}
                      onChange={(e) => handleInputChange("showRules", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">Show Rules Tab</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showSchedule}
                      onChange={(e) => handleInputChange("showSchedule", e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-foreground">Show Schedule Tab</span>
                  </label>
                </div>
              </div>

              {/* CTA Customization */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CTA Button Text</label>
                  <Input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => handleInputChange("ctaText", e.target.value)}
                    placeholder="Register Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CTA Button Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={formData.ctaButtonColor}
                      onChange={(e) => handleInputChange("ctaButtonColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.ctaButtonColor}
                      onChange={(e) => handleInputChange("ctaButtonColor", e.target.value)}
                      placeholder="#2563eb"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Sections */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Custom Sections</label>
                <div className="space-y-2 mb-2">
                  <Input
                    type="text"
                    value={customSectionInput.title}
                    onChange={(e) => setCustomSectionInput({ ...customSectionInput, title: e.target.value })}
                    placeholder="Section Title"
                    className="mb-2"
                  />
                  <textarea
                    value={customSectionInput.content}
                    onChange={(e) => setCustomSectionInput({ ...customSectionInput, content: e.target.value })}
                    placeholder="Section Content"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                  <Button type="button" onClick={handleAddCustomSection} variant="outline" className="w-full">
                    Add Custom Section
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.customSections.map((section, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-muted rounded">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm">{section.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{section.content}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveCustomSection(index)}
                        className="bg-transparent ml-2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  event ? "Update Event" : "Create Event"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
