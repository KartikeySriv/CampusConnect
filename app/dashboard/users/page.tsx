"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Mail, Shield, UserCheck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  status: "active" | "inactive" | "suspended"
  joinedDate: string
  lastActive: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@campus.edu",
      role: "student",
      status: "active",
      joinedDate: "2024-09-01",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "m.chen@campus.edu",
      role: "teacher",
      status: "active",
      joinedDate: "2023-08-15",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.d@campus.edu",
      role: "student",
      status: "active",
      joinedDate: "2024-09-01",
      lastActive: "5 hours ago",
    },
    {
      id: "4",
      name: "Prof. James Wilson",
      email: "j.wilson@campus.edu",
      role: "teacher",
      status: "active",
      joinedDate: "2022-01-10",
      lastActive: "3 hours ago",
    },
    {
      id: "5",
      name: "Olivia Martinez",
      email: "olivia.m@campus.edu",
      role: "student",
      status: "inactive",
      joinedDate: "2024-09-01",
      lastActive: "2 weeks ago",
    },
    {
      id: "6",
      name: "David Brown",
      email: "david.b@campus.edu",
      role: "student",
      status: "suspended",
      joinedDate: "2024-09-01",
      lastActive: "1 month ago",
    },
    {
      id: "7",
      name: "Dr. Emma Thompson",
      email: "e.thompson@campus.edu",
      role: "teacher",
      status: "active",
      joinedDate: "2023-01-20",
      lastActive: "30 minutes ago",
    },
    {
      id: "8",
      name: "Alex Rodriguez",
      email: "alex.r@campus.edu",
      role: "student",
      status: "active",
      joinedDate: "2024-09-01",
      lastActive: "1 hour ago",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "teacher":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "student":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "inactive":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "suspended":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h2>
          <p className="text-slate-500">Manage students, teachers, and administrators across the platform.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{users.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Students</p>
                <h3 className="text-2xl font-bold mt-1">{users.filter((u) => u.role === "student").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teachers</p>
                <h3 className="text-2xl font-bold mt-1">{users.filter((u) => u.role === "teacher").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <h3 className="text-2xl font-bold mt-1">{users.filter((u) => u.status === "active").length}</h3>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{user.name}</h4>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {user.email}
                      </span>
                      <span>•</span>
                      <span>Joined: {new Date(user.joinedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last active: {user.lastActive}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    {user.status !== "active" && (
                      <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                        Activate User
                      </DropdownMenuItem>
                    )}
                    {user.status === "active" && (
                      <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                        Suspend User
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
