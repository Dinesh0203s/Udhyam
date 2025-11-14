import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { ArrowRightIcon, ZapIcon, TrophyIcon, UsersIcon, CalendarIcon } from "@/lib/svg-icons"

export const metadata: Metadata = {
  title: "About UDHAYAM - Intercollege Fest",
  description: "Learn about UDHAYAM, the premier intercollege festival celebrating student talent and creativity",
}

export default function AboutPage() {
  const milestones = [
    { year: "2018", title: "Foundation", description: "UDHAYAM was founded as a vision to celebrate student talent" },
    { year: "2019", title: "First Festival", description: "Successfully hosted inaugural fest with 500+ participants" },
    { year: "2021", title: "Digital Transition", description: "Launched online registration and payment system" },
    { year: "2023", title: "Multi-City Expansion", description: "Expanded to 10+ colleges across the region" },
  ]

  const features = [
    {
      icon: ZapIcon,
      title: "Diverse Events",
      description: "From technical hackathons to cultural performances, we have something for everyone",
    },
    {
      icon: TrophyIcon,
      title: "Prize Pool",
      description: "Compete for exciting prizes worth over 5 lakhs rupees",
    },
    {
      icon: UsersIcon,
      title: "Community",
      description: "Connect with 2000+ participants and make lasting friendships",
    },
    {
      icon: CalendarIcon,
      title: "Annual Event",
      description: "Three days of celebration, learning, and entertainment packed with unforgettable moments",
    },
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Festival Director",
      description: "Visionary leader with 5 years of event management experience",
    },
    {
      name: "Priya Sharma",
      role: "Operations Head",
      description: "Ensures seamless execution of all festival activities",
    },
    {
      name: "Arjun Patel",
      role: "Technical Lead",
      description: "Manages all technical infrastructure and digital platforms",
    },
    {
      name: "Neha Verma",
      role: "Creative Director",
      description: "Leads creative direction and brand identity initiatives",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About UDHAYAM</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Celebrating student talent, creativity, and innovation through an annual intercollege fest
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground mb-4">
                To create a vibrant platform where students from diverse backgrounds come together to showcase their
                talents, learn new skills, and build meaningful connections.
              </p>
              <p className="text-muted-foreground">
                We believe in the power of celebration and competition to inspire innovation and creativity among the
                youth.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                To organize an inclusive, safe, and memorable festival that encourages participation across all skill
                levels and backgrounds.
              </p>
              <p className="text-muted-foreground">
                Through UDHAYAM, we aim to provide equal opportunities for all students to compete, collaborate, and
                celebrate their achievements.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose UDHAYAM</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-background p-6 rounded-lg border border-border">
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    {index < milestones.length - 1 && <div className="w-1 h-16 bg-blue-200 mt-2" />}
                  </div>
                  <div className="pt-2 pb-8">
                    <h3 className="text-xl font-bold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-muted">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-background p-6 rounded-lg border border-border text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Be Part of UDHAYAM?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students in celebrating talent, creativity, and innovation
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Events
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
