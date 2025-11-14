import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Event from "@/models/Event"

// GET single event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const event = await Event.findById(id)

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: event }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PUT update event by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const {
      name,
      category,
      date,
      time,
      location,
      description,
      image,
      fee,
      capacity,
      participationType,
      minTeamMembers,
      maxTeamMembers,
      status,
      rules,
      schedule,
      heroImage,
      pageLayout,
      primaryColor,
      secondaryColor,
      customSections,
      showStats,
      showRules,
      showSchedule,
      ctaText,
      ctaButtonColor,
    } = body

    const event = await Event.findById(id)

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    // Validation for team members if participationType is Team
    if (participationType === "Team") {
      if (minTeamMembers !== undefined && minTeamMembers < 1) {
        return NextResponse.json(
          { success: false, error: "Minimum team members must be at least 1" },
          { status: 400 }
        )
      }
      if (maxTeamMembers !== undefined && minTeamMembers !== undefined && maxTeamMembers < minTeamMembers) {
        return NextResponse.json(
          { success: false, error: "Maximum team members must be greater than or equal to minimum" },
          { status: 400 }
        )
      }
    }

    // Update fields
    if (name !== undefined) event.name = name
    if (category !== undefined) event.category = category
    if (date !== undefined) event.date = date
    if (time !== undefined) event.time = time
    if (location !== undefined) event.location = location
    if (description !== undefined) event.description = description
    if (image !== undefined) event.image = image
    if (fee !== undefined) event.fee = fee
    if (capacity !== undefined) {
      if (capacity < 1) {
        return NextResponse.json(
          { success: false, error: "Capacity must be at least 1" },
          { status: 400 }
        )
      }
      event.capacity = capacity
    }
    if (participationType !== undefined) {
      event.participationType = participationType
      // Clear team member fields if switching to Solo
      if (participationType === "Solo") {
        event.minTeamMembers = undefined
        event.maxTeamMembers = undefined
      }
    }
    if (minTeamMembers !== undefined && event.participationType === "Team") {
      event.minTeamMembers = minTeamMembers
    }
    if (maxTeamMembers !== undefined && event.participationType === "Team") {
      event.maxTeamMembers = maxTeamMembers
    }
    if (status !== undefined) event.status = status
    if (rules !== undefined) event.rules = rules
    if (schedule !== undefined) event.schedule = schedule
    if (heroImage !== undefined) event.heroImage = heroImage
    if (pageLayout !== undefined) event.pageLayout = pageLayout
    if (primaryColor !== undefined) event.primaryColor = primaryColor
    if (secondaryColor !== undefined) event.secondaryColor = secondaryColor
    if (customSections !== undefined) event.customSections = customSections
    if (showStats !== undefined) event.showStats = showStats
    if (showRules !== undefined) event.showRules = showRules
    if (showSchedule !== undefined) event.showSchedule = showSchedule
    if (ctaText !== undefined) event.ctaText = ctaText
    if (ctaButtonColor !== undefined) event.ctaButtonColor = ctaButtonColor

    await event.save()

    return NextResponse.json({ success: true, data: event }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE event by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const event = await Event.findByIdAndDelete(id)

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Event deleted successfully" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

