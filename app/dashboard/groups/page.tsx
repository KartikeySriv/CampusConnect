"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, MessageSquare, BookOpen, Hash, ArrowUpRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface StudyGroup {
  id: number
  name: string
  subject: string
  members: number
  description: string
  joined: boolean
  announcements: { id: number; message: string; author: string; date: string }[]
  color: string
}

const mockGroups: StudyGroup[] = [
  {
    id: 1,
    name: "Data Structures",
    subject: "CS301",
    members: 24,
    description: "Weekly study sessions for Data Structures. We cover algorithms, problem-solving, and exam prep.",
    joined: true,
    announcements: [
      { id: 1, message: "Next session on Trees and Graphs - Saturday 3 PM", author: "Prof. Smith", date: "2025-11-20" },
      { id: 2, message: "Assignment 3 solutions posted in shared drive", author: "Prof. Smith", date: "2025-11-18" },
    ],
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    name: "Web Dev Bootcamp",
    subject: "CS405",
    members: 18,
    description: "Learn modern web development together. Build projects and share knowledge.",
    joined: false,
    announcements: [],
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    name: "ML Research",
    subject: "CS502",
    members: 12,
    description: "Advanced ML topics and research paper discussions. For graduate students and seniors.",
    joined: true,
    announcements: [
      {
        id: 1,
        message: "Paper discussion: Attention Is All You Need - Friday 4 PM",
        author: "Dr. Johnson",
        date: "2025-11-21",
      },
    ],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    name: "Database Systems",
    subject: "CS304",
    members: 30,
    description: "SQL, NoSQL, and database design patterns. Project collaboration welcome.",
    joined: false,
    announcements: [],
    color: "from-orange-500 to-amber-600",
  },
]

export default function GroupsPage() {
  const [groups, setGroups] = useState(mockGroups)
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null)
  const { role } = useAuth()

  const handleJoinLeave = (groupId: number) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? { ...group, joined: !group.joined, members: group.joined ? group.members - 1 : group.members + 1 }
          : group,
      ),
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Study Groups</h2>
          <p className="text-muted-foreground mt-1">Collaborate, share resources, and learn together.</p>
        </div>
        <Button className="shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="group relative bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${group.color}`} />
              <div className="p-6 pl-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Hash className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{group.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        <span>{group.subject}</span>
                      </div>
                    </div>
                  </div>
                  {group.joined && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1"
                    >
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Member
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{group.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
                    <Users className="h-4 w-4" />
                    <span>{group.members} students</span>
                  </div>

                  <div className="flex gap-3">
                    {group.joined && (
                      <Button variant="outline" onClick={() => setSelectedGroup(group)} className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Announcements
                      </Button>
                    )}
                    <Button
                      onClick={() => handleJoinLeave(group.id)}
                      variant={group.joined ? "ghost" : "default"}
                      className={
                        group.joined
                          ? "text-destructive hover:text-destructive hover:bg-destructive/10"
                          : `bg-gradient-to-r ${group.color} border-none shadow-md hover:shadow-lg text-white`
                      }
                    >
                      {group.joined ? "Leave" : "Join Group"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="border-none shadow-xl bg-gradient-to-b from-white to-slate-50 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-primary to-purple-600" />
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {selectedGroup ? "Announcements" : "Group Updates"}
                </CardTitle>
                <CardDescription>
                  {selectedGroup ? `Latest from ${selectedGroup.name}` : "Select a joined group to view updates"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedGroup ? (
                  <div className="space-y-4">
                    {selectedGroup.announcements.length > 0 ? (
                      selectedGroup.announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="relative bg-white rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="absolute -left-[5px] top-4 h-8 w-1 rounded-r-full bg-primary" />
                          <p className="text-sm leading-relaxed font-medium text-foreground mb-2">
                            {announcement.message}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2 mt-2">
                            <span className="font-semibold text-primary">{announcement.author}</span>
                            <span>{new Date(announcement.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 px-4 bg-secondary/30 rounded-xl border border-dashed">
                        <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageSquare className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">No announcements yet</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Check back later for updates from the teacher.
                        </p>
                      </div>
                    )}
                    {role === "teacher" && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-dashed border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Post Announcement
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <ArrowUpRight className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-1">Stay in the loop</h4>
                    <p className="text-sm text-muted-foreground">
                      Join a study group and select it to see the latest announcements and resources.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
