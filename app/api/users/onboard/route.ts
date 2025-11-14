import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const { firebaseUID, fullName, collegeCode, collegeName, department, year, mobile } = body

    if (!firebaseUID) {
      return NextResponse.json({ error: "Missing firebaseUID" }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { firebaseUID },
      {
        fullName,
        collegeCode,
        collegeName,
        department,
        year,
        mobile,
        isOnboarded: true,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error onboarding user:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}


