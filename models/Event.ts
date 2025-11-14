import mongoose, { Schema, Document, Model } from "mongoose"

export interface IEvent extends Document {
  name: string
  category: string
  date: string
  time: string
  location?: string
  description: string
  image?: string
  fee: number
  capacity: number
  participants: number
  participationType: "Solo" | "Team"
  minTeamMembers?: number
  maxTeamMembers?: number
  status: "Scheduled" | "Active" | "Completed" | "Cancelled"
  rules?: string[]
  schedule?: Array<{ time: string; event: string }>
  // Page Customization
  heroImage?: string
  pageLayout?: "default" | "minimal" | "detailed"
  primaryColor?: string
  secondaryColor?: string
  customSections?: Array<{ title: string; content: string; order: number }>
  showStats?: boolean
  showRules?: boolean
  showSchedule?: boolean
  ctaText?: string
  ctaButtonColor?: string
  createdAt: Date
  updatedAt: Date
}

const EventSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technical", "Cultural", "Sports", "Academic", "Workshop"],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    participationType: {
      type: String,
      enum: ["Solo", "Team"],
      required: true,
      default: "Solo",
    },
    minTeamMembers: {
      type: Number,
      min: 1,
    },
    maxTeamMembers: {
      type: Number,
      min: 1,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    fee: {
      type: Number,
      required: true,
      default: 0,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    participants: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Active", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    rules: {
      type: [String],
      default: [],
    },
    schedule: {
      type: [
        {
          time: String,
          event: String,
        },
      ],
      default: [],
    },
    // Page Customization
    heroImage: {
      type: String,
    },
    pageLayout: {
      type: String,
      enum: ["default", "minimal", "detailed"],
      default: "default",
    },
    primaryColor: {
      type: String,
      default: "#2563eb",
    },
    secondaryColor: {
      type: String,
      default: "#7c3aed",
    },
    customSections: {
      type: [
        {
          title: String,
          content: String,
          order: Number,
        },
      ],
      default: [],
    },
    showStats: {
      type: Boolean,
      default: true,
    },
    showRules: {
      type: Boolean,
      default: true,
    },
    showSchedule: {
      type: Boolean,
      default: true,
    },
    ctaText: {
      type: String,
      default: "Register Now",
    },
    ctaButtonColor: {
      type: String,
      default: "#2563eb",
    },
  },
  {
    timestamps: true,
  }
)

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema)

export default Event

