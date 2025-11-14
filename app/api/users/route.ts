import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const { firebaseUID, email, displayName, photoURL } = body

    if (!firebaseUID || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUID })
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 })
    }

    // Create new user
    const user = new User({
      firebaseUID,
      email,
      displayName,
      photoURL,
      isOnboarded: false,
    })

    await user.save()

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const firebaseUID = searchParams.get("firebaseUID")

    if (firebaseUID) {
      const user = await User.findOne({ firebaseUID })
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json(user)
    }

    const users = await User.find({})
    return NextResponse.json(users)
  } catch (error: any) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}


