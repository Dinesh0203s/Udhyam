import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
  firebaseUID: string
  email: string
  displayName?: string
  photoURL?: string
  isOnboarded: boolean
  fullName?: string
  collegeCode?: string
  collegeName?: string
  department?: string
  year?: string
  mobile?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    displayName: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
    },
    collegeCode: {
      type: String,
    },
    collegeName: {
      type: String,
    },
    department: {
      type: String,
    },
    year: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User


