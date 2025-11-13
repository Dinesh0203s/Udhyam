"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface RegistrationFormProps {
  eventId: string
}

const eventDetails = {
  "1": { name: "Tech Hackathon", fee: "0", category: "Technical" },
  "2": { name: "Dance Battle", fee: "0", category: "Cultural" },
  "3": { name: "Cricket Tournament", fee: "0", category: "Sports" },
  "4": { name: "Photography Workshop", fee: "200", category: "Workshop" },
  "5": { name: "Debate Championship", fee: "0", category: "Academic" },
  "6": { name: "Web Development Bootcamp", fee: "500", category: "Workshop" },
  "7": { name: "Music Night", fee: "100", category: "Cultural" },
  "8": { name: "Basketball Championship", fee: "0", category: "Sports" },
}

type RegistrationStep = "details" | "payment" | "confirmation"

export function RegistrationForm({ eventId }: RegistrationFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<RegistrationStep>("details")
  const event = eventDetails[eventId as keyof typeof eventDetails] || eventDetails["1"]
  const [formData, setFormData] = useState({
    teamName: "",
    memberName: "",
    memberEmail: "",
    memberPhone: "",
    additionalMembers: "",
  })
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceedFromDetails = formData.teamName && formData.memberName && formData.memberEmail && formData.memberPhone

  const handlePayment = () => {
    if (paymentData.cardNumber && paymentData.expiry && paymentData.cvv) {
      setStep("confirmation")
    }
  }

  const handleComplete = () => {
    const registration = {
      eventId,
      eventName: event.name,
      ...formData,
      registeredAt: new Date().toISOString(),
    }
    localStorage.setItem(`registration_${eventId}`, JSON.stringify(registration))
    router.push(`/registration-success/${eventId}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/events/${eventId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Registration</h1>
          <p className="text-muted-foreground">{event.name}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex gap-4 justify-between">
        {(["details", "payment", "confirmation"] as const).map((s, index) => (
          <div key={s} className="flex-1 flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === s
                  ? "bg-blue-600 text-white"
                  : (["details", "payment"].includes(s) && step === "confirmation") ||
                      (s === "details" && ["payment", "confirmation"].includes(step))
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step === s ||
              (step === "confirmation" && s === "confirmation") ||
              (["details", "payment"].includes(s) && step === "confirmation") ||
              (s === "details" && ["payment", "confirmation"].includes(step)) ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                index + 1
              )}
            </div>
            <div className="hidden sm:block flex-1">
              <p className={`text-sm font-medium ${step === s ? "text-blue-600" : "text-muted-foreground"}`}>
                {s === "details" ? "Details" : s === "payment" ? "Payment" : "Confirmation"}
              </p>
            </div>
            {index < 2 && <div className="hidden md:block flex-1 h-1 bg-muted" />}
          </div>
        ))}
      </div>

      {/* Details Step */}
      {step === "details" && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Team Information</h2>
            <p className="text-muted-foreground">Provide your team and member details</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Team Name</label>
              <Input
                placeholder="Enter your team name"
                value={formData.teamName}
                onChange={(e) => handleInputChange("teamName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Primary Member Name</label>
              <Input
                placeholder="Your full name"
                value={formData.memberName}
                onChange={(e) => handleInputChange("memberName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.memberEmail}
                onChange={(e) => handleInputChange("memberEmail", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <Input
                placeholder="+91-XXXXXXXXXX"
                value={formData.memberPhone}
                onChange={(e) => handleInputChange("memberPhone", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Team Members (Optional)
              </label>
              <Input
                placeholder="Names separated by commas"
                value={formData.additionalMembers}
                onChange={(e) => handleInputChange("additionalMembers", e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Button onClick={() => router.back()} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => setStep("payment")}
              disabled={!canProceedFromDetails}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </Card>
      )}

      {/* Payment Step */}
      {step === "payment" && (
        <Card className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Payment Details</h2>
            <p className="text-muted-foreground">Complete your payment to confirm registration</p>
          </div>

          {/* Order Summary */}
          <Card className="p-4 bg-muted">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event</span>
                <span className="font-semibold text-foreground">{event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-semibold text-foreground">{event.category}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-bold text-green-600">{event.fee === "0" ? "Free" : `₹${event.fee}`}</span>
                </div>
              </div>
            </div>
          </Card>

          {event.fee === "0" ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground py-4">
                This event is free to register. Click "Confirm Registration" to proceed.
              </p>
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button onClick={() => setStep("details")} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep("confirmation")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Confirm Registration
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      value={paymentData.expiry}
                      onChange={(e) => handlePaymentChange("expiry", e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                    <Input
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button onClick={() => setStep("details")} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePayment} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Complete Payment
                </Button>
              </div>
            </>
          )}
        </Card>
      )}

      {/* Confirmation Step */}
      {step === "confirmation" && (
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">Registration Confirmed!</h2>
            <p className="text-muted-foreground">Your registration for {event.name} has been confirmed</p>
          </div>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket ID</span>
                <span className="font-semibold text-foreground">
                  UDHYAM-{eventId}-{Date.now()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event</span>
                <span className="font-semibold text-foreground">{event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team</span>
                <span className="font-semibold text-foreground">{formData.teamName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-green-600">{event.fee === "0" ? "Free" : `₹${event.fee}`}</span>
              </div>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground text-center">
            A confirmation email has been sent to {formData.memberEmail}
          </p>

          <div className="flex gap-3 pt-4 border-t border-border">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Dashboard
              </Button>
            </Link>
            <Button onClick={handleComplete} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Download Pass
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
