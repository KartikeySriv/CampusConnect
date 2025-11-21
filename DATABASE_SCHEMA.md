# CampusConnect Database Schema

This document outlines the Firestore database structure for CampusConnect.

## Collections

### users
Stores user account information and preferences.

\`\`\`
{
  id: string (auto-generated)
  email: string
  name: string
  role: "student" | "teacher" | "admin"
  interests: string[] (optional, for connections feature)
  createdAt: timestamp
}
\`\`\`

### events
Stores campus events created by teachers/admin.

\`\`\`
{
  id: string (auto-generated)
  title: string
  description: string
  date: string (ISO format)
  time: string
  venue: string
  organizer: string
  organizerId: string (reference to users collection)
  attendees: string[] (array of user IDs who RSVP'd)
  createdAt: timestamp
}
\`\`\`

### opportunities
Stores hackathons, internships, scholarships, and competitions.

\`\`\`
{
  id: string (auto-generated)
  title: string
  category: "hackathon" | "internship" | "scholarship" | "competition"
  description: string
  deadline: string (ISO format)
  eligibility: string
  link: string (external URL)
  createdBy: string (user ID)
  createdAt: timestamp
}
\`\`\`

### study_groups
Stores study group information.

\`\`\`
{
  id: string (auto-generated)
  name: string
  subject: string
  description: string
  members: string[] (array of user IDs)
  createdBy: string (user ID)
  createdAt: timestamp
}
\`\`\`

### announcements
Stores teacher announcements for study groups.

\`\`\`
{
  id: string (auto-generated)
  groupId: string (reference to study_groups)
  message: string
  authorId: string (teacher user ID)
  authorName: string
  createdAt: timestamp
}
\`\`\`

### anonymous_reports
Stores anonymous reports (NO user identification).

\`\`\`
{
  id: string (auto-generated)
  category: "harassment" | "mental-health" | "faculty" | "infrastructure"
  description: string
  status: "pending" | "reviewed" | "resolved"
  createdAt: timestamp
}
\`\`\`

### assignments
Stores student assignments and deadlines.

\`\`\`
{
  id: string (auto-generated)
  title: string
  course: string
  dueDate: string (ISO format)
  description: string (optional)
  studentId: string (reference to users)
  completed: boolean
  createdAt: timestamp
}
\`\`\`

## Security Rules

### Firestore Rules (firestore.rules)

\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isStudent() {
      return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "student";
    }
    
    function isTeacher() {
      return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "teacher";
    }
    
    function isAdmin() {
      return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isSignedIn() && request.auth.uid == userId;
    }
    
    // Events collection
    match /events/{eventId} {
      allow read: if isSignedIn();
      allow create: if isTeacher() || isAdmin();
      allow update, delete: if isTeacher() || isAdmin();
    }
    
    // Opportunities collection
    match /opportunities/{oppId} {
      allow read: if isSignedIn();
      allow create, update, delete: if isAdmin();
    }
    
    // Study groups collection
    match /study_groups/{groupId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && resource.data.createdBy == request.auth.uid;
    }
    
    // Announcements collection
    match /announcements/{announcementId} {
      allow read: if isSignedIn();
      allow create: if isTeacher() || isAdmin();
      allow update, delete: if isTeacher() || isAdmin();
    }
    
    // Anonymous reports - no user identification
    match /anonymous_reports/{reportId} {
      allow create: if isSignedIn(); // Anyone can create
      allow read, update: if isTeacher() || isAdmin(); // Only teachers/admin can view
    }
    
    // Assignments collection
    match /assignments/{assignmentId} {
      allow read, write: if isSignedIn() && resource.data.studentId == request.auth.uid;
    }
  }
}
\`\`\`

## Indexes

Create composite indexes in Firebase Console:

1. **events**: `date` (Ascending) + `createdAt` (Descending)
2. **opportunities**: `category` (Ascending) + `deadline` (Ascending)
3. **announcements**: `groupId` (Ascending) + `createdAt` (Descending)
4. **assignments**: `studentId` (Ascending) + `dueDate` (Ascending)

## Initial Setup

To initialize the database with sample data, use the Firebase Admin SDK or manually add documents through the Firebase Console.
\`\`\`
