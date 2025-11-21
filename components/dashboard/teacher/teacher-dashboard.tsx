"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, FileText, Users, MessageSquare, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function TeacherDashboard() {
  const router = useRouter()
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  })

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
  })

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      // In a real app, this would save to a database
      console.log("Creating event:", newEvent)
      setNewEvent({ title: "", date: "", time: "", location: "" })
      setIsEventDialogOpen(false)
      // Show success message or redirect
    }
  }

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.course && newAssignment.dueDate) {
      // In a real app, this would save to a database
      console.log("Adding assignment:", newAssignment)
      setNewAssignment({ title: "", course: "", dueDate: "" })
      setIsAssignmentDialogOpen(false)
      // Navigate to assignments page
      router.push("/dashboard/assignments")
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Teacher Workspace</h2>
          <p className="text-slate-500">Manage your courses, events, and student interactions.</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
              onClick={() => setIsEventDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="e.g., Guest Lecture on AI"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input
                    id="event-location"
                    placeholder="e.g., Auditorium A"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent} className="bg-indigo-600 hover:bg-indigo-700">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 bg-transparent"
              onClick={() => setIsAssignmentDialogOpen(true)}
            >
              <FileText className="mr-2 h-4 w-4" /> Add Assignment
            </Button>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-title">Assignment Title</Label>
                  <Input
                    id="assignment-title"
                    placeholder="e.g., Final Project Proposal"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignment-course">Course Code</Label>
                  <Input
                    id="assignment-course"
                    placeholder="e.g., CS400"
                    value={newAssignment.course}
                    onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignment-due">Due Date</Label>
                  <Input
                    id="assignment-due"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAssignment} className="bg-indigo-600 hover:bg-indigo-700">
                  Add Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Widgets */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Events", value: "12", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Assignments", value: "8", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Study Groups", value: "5", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Reports", value: "3", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          {/* Recent Activity / Events Management */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Upcoming Events You Manage</CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Advanced Algorithms Workshop",
                    date: "Tomorrow, 2:00 PM",
                    rsvps: 45,
                    status: "Confirmed",
                  },
                  { title: "Guest Lecture: AI Ethics", date: "Nov 25, 10:00 AM", rsvps: 120, status: "Pending" },
                  { title: "Coding Bootcamp Kickoff", date: "Nov 28, 9:00 AM", rsvps: 85, status: "Confirmed" },
                ].map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-white border flex flex-col items-center justify-center text-xs font-bold shadow-sm">
                        <span className="text-indigo-600 uppercase">Nov</span>
                        <span className="text-lg text-slate-900">{24 + i * 3}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{event.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {event.rsvps} RSVPs
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5 text-slate-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assignment Management */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Active Assignments</CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">
                Manage All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Final Project Proposal", course: "CS400", due: "In 2 days", submissions: "24/30" },
                  { title: "Mid-term Reflection", course: "ETH101", due: "In 5 days", submissions: "15/45" },
                ].map((assign, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                    <div>
                      <h4 className="font-semibold text-slate-900">{assign.title}</h4>
                      <p className="text-sm text-slate-500">
                        {assign.course} • Due {assign.due}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{assign.submissions}</p>
                        <p className="text-xs text-slate-500">Submissions</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 bg-transparent">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-4 space-y-6">
          {/* Study Groups Panel */}
          <Card className="bg-indigo-900 text-white border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Study Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-indigo-200 text-sm">You are managing 3 active study groups.</p>
              <div className="space-y-3">
                {["CS Seniors 2025", "AI Research Group", "Web Dev Mentorship"].map((group, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-sm">{group}</span>
                    <MessageSquare className="h-4 w-4 text-indigo-300" />
                  </div>
                ))}
              </div>
              <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 mt-2">Post Announcement</Button>
            </CardContent>
          </Card>

          {/* Anonymous Reports (Read Only) */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="h-5 w-5" /> Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                <div className="flex justify-between items-start mb-1">
                  <Badge variant="outline" className="bg-white text-amber-700 border-amber-200 text-[10px]">
                    Infrastructure
                  </Badge>
                  <span className="text-[10px] text-amber-600">2h ago</span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">Projector in Room 304 is malfunctioning...</p>
              </div>
              <Button variant="ghost" className="w-full text-xs text-slate-500">
                View All Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
