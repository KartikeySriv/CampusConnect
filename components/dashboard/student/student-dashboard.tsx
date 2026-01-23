"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Calendar, TrendingUp, Sparkles, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function StudentDashboard() {
  const [clickedGroups, setClickedGroups] = useState<number[]>([])

  const handleGroupClick = (index: number) => {
    if (!clickedGroups.includes(index)) {
      setClickedGroups([...clickedGroups, index])
    }
  }

  const handleRegisterNow = () => {
    window.open("https://devfolio.co/", "_blank")
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 text-white shadow-xl shadow-primary/20">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-medium tracking-wide uppercase">Welcome Back</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Hello, Alex! 👋</h2>
          <p className="text-blue-100 max-w-xl text-lg">
            You have <span className="font-bold text-white">2 assignments</span> due today and{" "}
            <span className="font-bold text-white">1 event</span> starting soon.
          </p>
          {/* <div className="mt-6 flex gap-3">
            <Button variant="secondary" className="bg-white text-primary hover:bg-blue-50 border-none shadow-lg">
              View Schedule
            </Button>
            <Button variant="outline" className="bg-primary/20 border-white/20 text-white hover:bg-primary/30">
              Check Grades
            </Button>
          </div> */}
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-20 -mb-10 h-40 w-40 rounded-full bg-purple-500/20 blur-2xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Upcoming Deadlines - Main Focus */}
        <div className="md:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Deadlines
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
              View All
            </Button>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Data Structures Assignment",
                course: "CS301",
                due: "Today, 11:59 PM",
                urgent: true,
                progress: 75,
              },
              { title: "UX Research Paper", course: "DES202", due: "Tomorrow, 5:00 PM", urgent: false, progress: 30 },
              { title: "Database Project Proposal", course: "CS304", due: "In 2 days", urgent: false, progress: 0 },
            ].map((item, i) => (
              <Card key={i} className="card-hover border-l-4 border-l-primary overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex items-center p-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge
                          variant={item.urgent ? "destructive" : "secondary"}
                          className={
                            item.urgent
                              ? "bg-red-100 text-red-700 hover:bg-red-200 border-none"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-200 border-none"
                          }
                        >
                          {item.urgent ? "Due Soon" : "Upcoming"}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground">{item.course}</span>
                      </div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h4>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {item.due}
                        </div>
                        {/* Micro-progress bar */}
                        <div className="flex items-center gap-2 flex-1 max-w-[120px]">
                          <div className="h-1.5 w-full rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Events & Quick Stats */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Happening Today
            </h3>
          </div>

          <Card className="bg-gradient-to-b from-white to-purple-50/50 border-none shadow-lg">
            <CardContent className="p-5 space-y-6">
              {[
                { title: "Tech Talk: AI in 2025", time: "2:00 PM", loc: "Auditorium A", tag: "Tech" },
                { title: "Design Club Meetup", time: "4:30 PM", loc: "Room 304", tag: "Social" },
              ].map((event, i) => (
                <div
                  key={i}
                  className="relative pl-4 border-l-2 border-purple-200 hover:border-purple-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      {event.tag}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{event.time}</span>
                  </div>
                  <h4 className="font-bold text-base leading-tight mb-1">{event.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {event.loc}
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full text-xs border-dashed border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
              >
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats / Recommendations */}
          <Card className="bg-primary text-primary-foreground overflow-hidden relative border-none shadow-lg shadow-primary/20">
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-yellow-300" />
                <h4 className="font-bold text-lg">Trending Now</h4>
              </div>
              <p className="text-sm text-blue-100 mb-4">Global Student Hackathon registration closes in 24 hours.</p>
              <Button
                size="sm"
                className="w-full bg-white text-primary hover:bg-blue-50 border-none font-semibold"
                onClick={handleRegisterNow}
              >
                Register Now
              </Button>
            </CardContent>
            {/* Decorative background */}
            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
          </Card>
        </div>
      </div>

      {/* Suggested Groups Section */}
      <div className="pt-4">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-600" />
          Suggested For You
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Web Dev Bootcamp", members: 128, active: "Active now" },
            { name: "UI/UX Designers", members: 85, active: "2h ago" },
            { name: "FinTech Club", members: 42, active: "5h ago" },
          ].map((group, i) => (
            <Card
              key={i}
              className="card-hover group cursor-pointer border-none shadow-md bg-white"
              onClick={() => handleGroupClick(i)}
            >
              <CardContent className="p-5 flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md
                  ${
                    i === 0
                      ? "bg-gradient-to-br from-blue-400 to-blue-600"
                      : i === 1
                        ? "bg-gradient-to-br from-pink-400 to-rose-600"
                        : "bg-gradient-to-br from-emerald-400 to-teal-600"
                  }`}
                >
                  {group.name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{group.name}</h4>
                  {clickedGroups.includes(i) ? (
                    <p className="text-xs text-emerald-600 font-semibold">Coming Up</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {group.members} members • {group.active}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-auto h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
