import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, AlertTriangle, MoreVertical, Filter, Shield, Plus } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl text-white shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Admin Console</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
          <p className="text-slate-400">Monitor platform activity and manage resources.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-none">Generate Report</Button>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            System Settings
          </Button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Students", value: "2,450", icon: Users, color: "text-blue-500" },
          { label: "Teachers", value: "128", icon: Users, color: "text-purple-500" },
          { label: "Events", value: "45", icon: Calendar, color: "text-pink-500" },
          { label: "Study Groups", value: "86", icon: Users, color: "text-indigo-500" },
          { label: "Opportunities", value: "12", icon: Trophy, color: "text-yellow-500" },
          { label: "Reports", value: "5", icon: AlertTriangle, color: "text-red-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className={`p-2 rounded-full bg-slate-50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Report Center - High Priority */}
        <div className="md:col-span-7 space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Anonymous Report Center
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                    <Filter className="h-3 w-3 mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  {
                    id: "#R-2024-001",
                    category: "Infrastructure",
                    desc: "Broken AC in Library 2nd Floor",
                    status: "Pending",
                    date: "2h ago",
                  },
                  {
                    id: "#R-2024-002",
                    category: "Harassment",
                    desc: "Report regarding incident at cafeteria...",
                    status: "Investigating",
                    date: "5h ago",
                  },
                  {
                    id: "#R-2024-003",
                    category: "Faculty",
                    desc: "Grading discrepancy in CS101",
                    status: "Resolved",
                    date: "1d ago",
                  },
                ].map((report, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">{report.id}</span>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "Pending"
                              ? "bg-red-50 text-red-600 border-red-200"
                              : report.status === "Investigating"
                                ? "bg-amber-50 text-amber-600 border-amber-200"
                                : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          }
                        >
                          {report.status}
                        </Badge>
                        <span className="text-xs text-slate-400">• {report.date}</span>
                      </div>
                      <h4 className="font-medium text-sm text-slate-900">{report.category}</h4>
                      <p className="text-sm text-slate-500 line-clamp-1">{report.desc}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management Preview */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Recent User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah Connor", role: "Student", email: "sarah@campus.edu" },
                  { name: "Dr. Emmett Brown", role: "Teacher", email: "doc@campus.edu" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Opportunities & Events */}
        <div className="md:col-span-5 space-y-6">
          {/* Opportunities Management */}
          <Card className="border-none shadow-md h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Opportunities
              </CardTitle>
              <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Summer Internship 2025", type: "Internship", applicants: 145 },
                { title: "Campus Hackathon", type: "Hackathon", applicants: 89 },
                { title: "Research Grant", type: "Scholarship", applicants: 34 },
              ].map((opp, i) => (
                <div key={i} className="p-4 border rounded-xl hover:border-slate-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{opp.type}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <h4 className="font-bold text-slate-900">{opp.title}</h4>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-500">{opp.applicants} Applicants</span>
                    <span className="text-emerald-600 font-medium text-xs bg-emerald-50 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
