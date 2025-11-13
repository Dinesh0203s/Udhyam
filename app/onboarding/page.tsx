import { OnboardingForm } from "@/components/onboarding-form"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <OnboardingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
