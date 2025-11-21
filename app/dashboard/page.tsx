"use client"

import { useAuth } from "@/contexts/auth-context"
import { StudentDashboard } from "@/components/dashboard/student/student-dashboard"
import { TeacherDashboard } from "@/components/dashboard/teacher/teacher-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (role === "teacher") {
    return <TeacherDashboard />
  }

  if (role === "admin") {
    return <AdminDashboard />
  }

  // Default to student dashboard
  return <StudentDashboard />
}
