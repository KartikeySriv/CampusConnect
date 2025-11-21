"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  LinkIcon,
  Trophy,
  AlertTriangle,
  LogOut,
  GraduationCap,
  Shield,
  FileText,
  Briefcase,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

// Define menu items for each role
const studentMenu = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: Calendar, label: "Events", href: "/dashboard/events" },
      { icon: Trophy, label: "Opportunities", href: "/dashboard/opportunities" },
    ],
  },
  {
    label: "Academic",
    items: [
      { icon: Users, label: "Study Groups", href: "/dashboard/groups" },
      { icon: BookOpen, label: "Resources", href: "/dashboard/resources" },
      { icon: LinkIcon, label: "Tools", href: "/dashboard/connections" }, // Changed "Connections" to "Tools"
    ],
  },
  {
    label: "Support",
    items: [{ icon: AlertTriangle, label: "Report Issue", href: "/dashboard/report" }],
  },
]

const teacherMenu = [
  {
    label: "Workspace",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Calendar, label: "My Events", href: "/dashboard/events" },
      { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    ],
  },
  {
    label: "Community",
    items: [
      { icon: Users, label: "Study Groups", href: "/dashboard/groups" },
      { icon: AlertTriangle, label: "Reports", href: "/dashboard/reports" },
    ],
  },
]

const adminMenu = [
  {
    label: "Control Center",
    items: [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
      { icon: Shield, label: "User Management", href: "/dashboard/users" },
      { icon: AlertTriangle, label: "Report Center", href: "/dashboard/reports" },
    ],
  },
  {
    label: "Platform",
    items: [
      { icon: Trophy, label: "Opportunities", href: "/dashboard/opportunities" },
      { icon: Calendar, label: "Events", href: "/dashboard/events" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { signOut, user, role } = useAuth()

  // Select menu based on role
  const menuGroups = role === "teacher" ? teacherMenu : role === "admin" ? adminMenu : studentMenu

  return (
    <aside className="hidden w-72 flex-col border-r bg-card/50 backdrop-blur-xl md:flex h-screen sticky top-0 z-30">
      <div className="p-6 flex items-center gap-3">
        <div
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center shadow-lg",
            role === "admin"
              ? "bg-slate-900 shadow-slate-900/20"
              : role === "teacher"
                ? "bg-indigo-600 shadow-indigo-600/20"
                : "bg-gradient-to-br from-primary to-purple-600 shadow-primary/20",
          )}
        >
          {role === "admin" ? (
            <Shield className="h-6 w-6 text-white" />
          ) : role === "teacher" ? (
            <Briefcase className="h-6 w-6 text-white" />
          ) : (
            <GraduationCap className="h-6 w-6 text-white" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">CampusConnect</h1>
          <p className="text-xs text-muted-foreground font-medium capitalize">{role} Portal</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-8">
        {menuGroups.map((group, index) => (
          <div key={index}>
            <h3 className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.label}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? role === "admin"
                          ? "bg-slate-900 text-white"
                          : role === "teacher"
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    {isActive && role !== "admin" && (
                      <div
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full",
                          role === "teacher" ? "bg-indigo-600" : "bg-primary",
                        )}
                      />
                    )}
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? role === "admin"
                            ? "text-white"
                            : role === "teacher"
                              ? "text-indigo-600"
                              : "text-primary"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-secondary/20">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm",
              role === "admin"
                ? "bg-slate-700"
                : role === "teacher"
                  ? "bg-indigo-500"
                  : "bg-gradient-to-tr from-blue-400 to-emerald-400",
            )}
          >
            {user?.email?.[0].toUpperCase() || "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => signOut()}
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
