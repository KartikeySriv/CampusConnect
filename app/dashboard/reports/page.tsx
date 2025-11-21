"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Download, Eye, CheckCircle, Clock, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Report {
  id: string
  studentName: string
  course: string
  assignmentTitle: string
  submittedDate: string
  grade: string | null
  status: "pending" | "graded" | "late"
  fileUrl: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      studentName: "Sarah Johnson",
      course: "CS400",
      assignmentTitle: "Final Project Proposal",
      submittedDate: "2025-11-21",
      grade: "A",
      status: "graded",
      fileUrl: "#",
    },
    {
      id: "2",
      studentName: "Michael Chen",
      course: "CS400",
      assignmentTitle: "Final Project Proposal",
      submittedDate: "2025-11-22",
      grade: null,
      status: "pending",
      fileUrl: "#",
    },
    {
      id: "3",
      studentName: "Emily Davis",
      course: "ETH101",
      assignmentTitle: "Mid-term Reflection",
      submittedDate: "2025-11-20",
      grade: "B+",
      status: "graded",
      fileUrl: "#",
    },
    {
      id: "4",
      studentName: "James Wilson",
      course: "CS301",
      assignmentTitle: "Algorithm Analysis Report",
      submittedDate: "2025-11-21",
      grade: null,
      status: "late",
      fileUrl: "#",
    },
    {
      id: "5",
      studentName: "Olivia Martinez",
      course: "ETH101",
      assignmentTitle: "Mid-term Reflection",
      submittedDate: "2025-11-19",
      grade: "A-",
      status: "graded",
      fileUrl: "#",
    },
  ])

  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const filteredReports = filterStatus === "all" ? reports : reports.filter((r) => r.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "late":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Student Reports</h2>
          <p className="text-slate-500">Review and grade student assignment submissions.</p>
        </div>
        <div className="flex gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="graded">Graded</SelectItem>
              <SelectItem value="late">Late</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <h3 className="text-2xl font-bold mt-1">{reports.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <h3 className="text-2xl font-bold mt-1">{reports.filter((r) => r.status === "pending").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Graded</p>
                <h3 className="text-2xl font-bold mt-1">{reports.filter((r) => r.status === "graded").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Submissions</p>
                <h3 className="text-2xl font-bold mt-1">{reports.filter((r) => r.status === "late").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Submission Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {report.studentName[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{report.studentName}</h4>
                      <Badge
                        variant="outline"
                        className={
                          report.status === "graded"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : report.status === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(report.status)}
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{report.course}</span>
                      <span>•</span>
                      <span>{report.assignmentTitle}</span>
                      <span>•</span>
                      <span>Submitted: {new Date(report.submittedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {report.grade && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">{report.grade}</p>
                      <p className="text-xs text-slate-500">Grade</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 bg-transparent"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  {!report.grade && (
                    <Button size="sm" className="h-8 bg-indigo-600 hover:bg-indigo-700">
                      Grade
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Student</p>
                  <p className="text-base font-semibold">{selectedReport.studentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course</p>
                  <p className="text-base font-semibold">{selectedReport.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assignment</p>
                  <p className="text-base font-semibold">{selectedReport.assignmentTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                  <p className="text-base font-semibold">
                    {new Date(selectedReport.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Submission File</p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" /> Download Submission
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
