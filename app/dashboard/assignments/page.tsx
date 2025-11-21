"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, Users, Trash2, Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  submissions: number
  totalStudents: number
  status: "active" | "closed"
  description: string
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Final Project Proposal",
      course: "CS400",
      dueDate: "2025-11-23",
      submissions: 24,
      totalStudents: 30,
      status: "active",
      description: "Submit a detailed proposal for your final project including objectives and timeline.",
    },
    {
      id: "2",
      title: "Mid-term Reflection",
      course: "ETH101",
      dueDate: "2025-11-26",
      submissions: 15,
      totalStudents: 45,
      status: "active",
      description: "Write a reflection on the course material covered in the first half of the semester.",
    },
    {
      id: "3",
      title: "Algorithm Analysis Report",
      course: "CS301",
      dueDate: "2025-11-20",
      submissions: 28,
      totalStudents: 28,
      status: "closed",
      description: "Analyze the time and space complexity of various sorting algorithms.",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    totalStudents: "",
    description: "",
  })

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.course && newAssignment.dueDate) {
      const assignment: Assignment = {
        id: String(assignments.length + 1),
        title: newAssignment.title,
        course: newAssignment.course,
        dueDate: newAssignment.dueDate,
        submissions: 0,
        totalStudents: Number(newAssignment.totalStudents) || 30,
        status: "active",
        description: newAssignment.description,
      }
      setAssignments([assignment, ...assignments])
      setNewAssignment({ title: "", course: "", dueDate: "", totalStudents: "", description: "" })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Assignments</h2>
          <p className="text-slate-500">Manage and track student assignments across all your courses.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
              <Plus className="mr-2 h-4 w-4" /> Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Final Project Proposal"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course Code</Label>
                <Input
                  id="course"
                  placeholder="e.g., CS400"
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="students">Total Students</Label>
                <Input
                  id="students"
                  type="number"
                  placeholder="30"
                  value={newAssignment.totalStudents}
                  onChange={(e) => setNewAssignment({ ...newAssignment, totalStudents: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide assignment details and requirements..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment} className="bg-indigo-600 hover:bg-indigo-700">
                Create Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Assignments</p>
                <h3 className="text-2xl font-bold mt-1">{assignments.filter((a) => a.status === "active").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                <h3 className="text-2xl font-bold mt-1">{assignments.reduce((acc, a) => acc + a.submissions, 0)}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <h3 className="text-2xl font-bold mt-1">
                  {assignments.reduce((acc, a) => acc + (a.totalStudents - a.submissions), 0)}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-start justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-slate-900">{assignment.title}</h4>
                    <Badge
                      variant={assignment.status === "active" ? "default" : "secondary"}
                      className={
                        assignment.status === "active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none"
                          : "bg-slate-200 text-slate-600"
                      }
                    >
                      {assignment.status === "active" ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{assignment.description}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> {assignment.course}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {assignment.submissions}/{assignment.totalStudents} Submitted
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-slate-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDeleteAssignment(assignment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
