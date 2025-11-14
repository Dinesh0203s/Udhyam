import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Event from "@/models/Event"

// GET all events
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const category = searchParams.get("category")

    const query: any = {}
    if (status) {
      query.status = status
    }
    if (category) {
      query.category = category
    }

    const events = await Event.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: events }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST create new event
export async function POST(request: NextRequest) {
  try {
    await connectDB()

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

    // Validation
    if (!name || !category || !date || !time || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (capacity && capacity < 1) {
      return NextResponse.json(
        { success: false, error: "Capacity must be at least 1" },
        { status: 400 }
      )
    }

    if (participationType === "Team") {
      if (!minTeamMembers || !maxTeamMembers) {
        return NextResponse.json(
          { success: false, error: "Team events require min and max team members" },
          { status: 400 }
        )
      }
      if (minTeamMembers < 1 || maxTeamMembers < minTeamMembers) {
        return NextResponse.json(
          { success: false, error: "Invalid team member range" },
          { status: 400 }
        )
      }
    }

    const event = await Event.create({
      name,
      category,
      date,
      time,
      location,
      description,
      image: image || "/placeholder.svg",
      fee: fee || 0,
      capacity: capacity || 100,
      participants: 0,
      participationType: participationType || "Solo",
      minTeamMembers: participationType === "Team" ? minTeamMembers : undefined,
      maxTeamMembers: participationType === "Team" ? maxTeamMembers : undefined,
      status: status || "Scheduled",
      rules: rules || [],
      schedule: schedule || [],
      heroImage: heroImage || image || "/placeholder.svg",
      pageLayout: pageLayout || "default",
      primaryColor: primaryColor || "#2563eb",
      secondaryColor: secondaryColor || "#7c3aed",
      customSections: customSections || [],
      showStats: showStats !== undefined ? showStats : true,
      showRules: showRules !== undefined ? showRules : true,
      showSchedule: showSchedule !== undefined ? showSchedule : true,
      ctaText: ctaText || "Register Now",
      ctaButtonColor: ctaButtonColor || "#2563eb",
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

