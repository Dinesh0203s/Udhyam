import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
  try {
    await connectDB()
    const { uid } = await params
    const user = await User.findOne({ firebaseUID: uid })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
  try {
    await connectDB()
    const { uid } = await params
    const body = await request.json()

    console.log("Updating user:", uid, "with data:", body)

    const user = await User.findOneAndUpdate(
      { firebaseUID: uid },
      body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!user) {
      console.error("User not found:", uid)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("User updated successfully:", user._id)
    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error", details: error.stack },
      { status: 500 }
    )
  }
}


