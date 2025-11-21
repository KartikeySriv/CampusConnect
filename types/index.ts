// Database schema types for Firebase Firestore

export interface User {
  id: string
  email: string
  name: string
  role: "student" | "teacher" | "admin"
  interests?: string[]
  createdAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  organizer: string
  organizerId: string
  attendees: string[] // Array of user IDs
  createdAt: Date
}

export interface Opportunity {
  id: string
  title: string
  category: "hackathon" | "internship" | "scholarship" | "competition"
  description: string
  deadline: string
  eligibility: string
  link: string
  createdBy: string
  createdAt: Date
}

export interface StudyGroup {
  id: string
  name: string
  subject: string
  description: string
  members: string[] // Array of user IDs
  createdBy: string
  createdAt: Date
}

export interface Announcement {
  id: string
  groupId: string
  message: string
  authorId: string
  authorName: string
  createdAt: Date
}

export interface AnonymousReport {
  id: string
  category: "harassment" | "mental-health" | "faculty" | "infrastructure"
  description: string
  status: "pending" | "reviewed" | "resolved"
  createdAt: Date
  // No user identification fields for anonymity
}

export interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  description?: string
  studentId: string
  completed: boolean
  createdAt: Date
}
