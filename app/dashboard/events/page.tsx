"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Plus, Share2, Ticket } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const mockEvents = [
  {
    id: 1,
    title: "Tech Talk: AI in 2025",
    description: "Join us for an insightful discussion on the future of AI and its impact on various industries.",
    date: "2025-11-22",
    time: "2:00 PM - 4:00 PM",
    venue: "Auditorium A",
    organizer: "Computer Science Club",
    attendees: 45,
    rsvped: false,
    category: "Tech",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Design Club Meetup",
    description: "Monthly meetup for design enthusiasts. Share your work and get feedback from peers.",
    date: "2025-11-22",
    time: "4:30 PM - 6:00 PM",
    venue: "Room 304",
    organizer: "Design Club",
    attendees: 28,
    rsvped: true,
    category: "Creative",
    image: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Career Fair 2025",
    description: "Meet recruiters from top tech companies. Bring your resume and dress professionally.",
    date: "2025-11-25",
    time: "10:00 AM - 5:00 PM",
    venue: "Main Hall",
    organizer: "Career Services",
    attendees: 200,
    rsvped: false,
    category: "Career",
    image: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description: "Watch student entrepreneurs pitch their ideas to a panel of investors.",
    date: "2025-11-28",
    time: "3:00 PM - 6:00 PM",
    venue: "Innovation Lab",
    organizer: "Entrepreneurship Cell",
    attendees: 67,
    rsvped: false,
    category: "Business",
    image: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { role } = useAuth()

  const handleRSVP = (eventId: number) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, rsvped: !event.rsvped, attendees: event.rsvped ? event.attendees - 1 : event.attendees + 1 }
          : event,
      ),
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Campus Events</h2>
          <p className="text-muted-foreground mt-1">Discover workshops, meetups, and competitions.</p>
        </div>
        {(role === "teacher" || role === "admin") && (
          <Button onClick={() => setShowCreateModal(true)} className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        )}
      </div>

      {/* Featured Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {["All Events", "Tech", "Creative", "Business", "Social", "Career"].map((cat, i) => (
          <Button
            key={cat}
            variant={i === 0 ? "default" : "outline"}
            className={`rounded-full px-6 ${i === 0 ? "shadow-md shadow-primary/20" : "bg-white border-muted-foreground/20 hover:bg-secondary"}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            {/* Event Image/Header */}
            <div className={`h-32 ${event.image} relative p-6 flex flex-col justify-between`}>
              <div className="flex justify-between items-start">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                  {event.category}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute -bottom-6 right-6 h-12 w-12 rounded-xl bg-white shadow-lg flex flex-col items-center justify-center text-center border border-gray-100 z-10">
                <span className="text-xs font-bold text-red-500 uppercase">
                  {new Date(event.date).toLocaleString("default", { month: "short" })}
                </span>
                <span className="text-lg font-bold text-gray-900 leading-none">{new Date(event.date).getDate()}</span>
              </div>
            </div>

            <CardContent className="pt-10 pb-4 flex-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">{event.organizer}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{event.description}</p>
            </CardContent>

            <CardFooter className="pt-0 pb-6 px-6">
              <Button
                onClick={() => handleRSVP(event.id)}
                variant={event.rsvped ? "outline" : "default"}
                className={`w-full font-semibold shadow-sm ${event.rsvped ? "border-primary text-primary hover:bg-primary/5" : "shadow-primary/20"}`}
              >
                {event.rsvped ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> RSVP Confirmed
                  </>
                ) : (
                  <>
                    <Ticket className="mr-2 h-4 w-4" /> RSVP Now
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
