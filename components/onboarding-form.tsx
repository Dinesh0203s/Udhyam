"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, User, Smartphone, BookOpen, Zap } from "lucide-react"

const STEPS = [
  {
    id: 1,
    title: "Welcome to UDHYAM",
    description: "Let's get you set up",
    icon: Zap,
  },
  {
    id: 2,
    title: "Personal Details",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 3,
    title: "Academic Info",
    description: "Your college details",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Contact Details",
    description: "How to reach you",
    icon: Smartphone,
  },
  {
    id: 5,
    title: "Confirmation",
    description: "Review your details",
    icon: CheckCircle2,
  },
]

interface FormData {
  fullName: string
  email: string
  collegeCode: string
  collegeName: string
  department: string
  year: string
  mobile: string
}

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    collegeCode: "",
    collegeName: "",
    department: "",
    year: "",
    mobile: "",
  })

  const handleNext = () => {
    if (step < STEPS.length) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem("udhyamUser", JSON.stringify(formData))
    router.push("/dashboard")
  }

  const isStepComplete = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return true
      case 2:
        return formData.fullName.trim() !== "" && formData.email.trim() !== ""
      case 3:
        return formData.collegeName.trim() !== "" && formData.department.trim() !== "" && formData.year !== ""
      case 4:
        return formData.mobile.trim() !== ""
      case 5:
        return true
      default:
        return false
    }
  }

  const canProceed = isStepComplete(step)

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Step {step} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{Math.round((step / STEPS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, index) => {
          const StepIcon = s.icon
          const isActive = s.id === step
          const isComplete = s.id < step
          return (
            <button
              key={s.id}
              onClick={() => s.id < step && setStep(s.id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 min-w-fit"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-blue-600 text-white ring-2 ring-blue-300"
                    : isComplete
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
              </div>
              <span
                className={`text-xs font-medium text-center hidden sm:block ${
                  isActive ? "text-blue-600" : "text-muted-foreground"
                }`}
              >
                {s.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Form Content */}
      <Card className="p-8">
        {step === 1 && <StepWelcome />}
        {step === 2 && <StepPersonalDetails data={formData} onChange={handleInputChange} />}
        {step === 3 && <StepAcademicInfo data={formData} onChange={handleInputChange} />}
        {step === 4 && <StepContactDetails data={formData} onChange={handleInputChange} />}
        {step === 5 && <StepConfirmation data={formData} />}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-8 border-t border-border">
          <Button variant="outline" onClick={handlePrevious} disabled={step === 1} className="flex-1 bg-transparent">
            Previous
          </Button>
          {step === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

function StepWelcome() {
  return (
    <div className="space-y-6 py-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to UDHYAM</h2>
        <p className="text-muted-foreground">
          Join thousands of students participating in India's premier intercollege fest. Let's get you started!
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground">Explore Events</p>
            <p className="text-sm text-muted-foreground">
              Browse and discover amazing cultural, technical, and sports events
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground">Easy Registration</p>
            <p className="text-sm text-muted-foreground">Register for events with just a few clicks</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground">Get Digital Pass</p>
            <p className="text-sm text-muted-foreground">Receive a unique digital pass for event entry</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StepProps {
  data: FormData
  onChange: (field: keyof FormData, value: string) => void
}

function StepPersonalDetails({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Personal Details</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <Input
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

function StepAcademicInfo({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Academic Information</h2>
        <p className="text-muted-foreground">Your college details</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">College Name</label>
          <Input
            placeholder="Your college name"
            value={data.collegeName}
            onChange={(e) => onChange("collegeName", e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">College Code</label>
          <Input
            placeholder="e.g., IIT-D, DU-001"
            value={data.collegeCode}
            onChange={(e) => onChange("collegeCode", e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Department</label>
          <select
            value={data.department}
            onChange={(e) => onChange("department", e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
            <option value="BBA">BBA</option>
            <option value="BSC">B.Sc</option>
            <option value="BA">B.A</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Year of Study</label>
          <select
            value={data.year}
            onChange={(e) => onChange("year", e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function StepContactDetails({ data, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Contact Details</h2>
        <p className="text-muted-foreground">How to reach you</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
          <div className="flex gap-2">
            <div className="px-3 py-2 bg-muted rounded-lg text-muted-foreground font-medium">+91</div>
            <Input
              placeholder="10-digit mobile number"
              value={data.mobile}
              onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
              maxLength={10}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Used for event updates and verification</p>
        </div>
      </div>
    </div>
  )
}

interface ConfirmationProps {
  data: FormData
}

function StepConfirmation({ data }: ConfirmationProps) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Your Information</h2>
        <p className="text-muted-foreground">Please verify your details before completing</p>
      </div>
      <div className="space-y-4">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3">Personal Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Name:</span>
              <span className="font-medium text-foreground">{data.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">{data.email}</span>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3">Academic Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">College:</span>
              <span className="font-medium text-foreground">{data.collegeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-medium text-foreground">{data.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year:</span>
              <span className="font-medium text-foreground">{data.year}</span>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-3">Contact Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile:</span>
              <span className="font-medium text-foreground">+91-{data.mobile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
