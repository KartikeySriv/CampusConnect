# CampusConnect - Unified Campus Life Platform

A modern, comprehensive web application for managing campus life, built with Next.js, Firebase, and TailwindCSS.

## Features

### 1. Today's Dashboard
- View all assignments due today or within 24 hours
- See events and workshops happening today
- Quick access to important campus updates
- Clean, scannable card-based layout

### 2. Event Management
- Teachers/Mentors/Admin can create events
- Students can view and RSVP to events
- Event details include title, description, venue, date, time, and organizer
- Real-time attendee count

### 3. Resource Center
- Curated links to trusted external resource providers
- DotNotes.in - Study notes and materials
- Syllabusx.live - Syllabus coverage and exam prep
- Simple redirect-based system (no uploads)

### 4. Study Groups
- Students can create and join study groups
- Teachers post one-way announcements
- Group-specific announcement feeds
- Member management

### 5. Important Connections
- First-time login: Select field of interest
- Curated links based on interests:
  - Coding: LeetCode, CodeChef, GitHub, Roadmaps
  - Design: Figma, Dribbble, UI resources
  - Research: Google Scholar, ResearchGate, arXiv
  - Entrepreneurship: Startup India, Y Combinator
  - Finance: Investopedia, CFA Institute

### 6. Opportunities Hub
- Browse hackathons, internships, scholarships, competitions
- Filter by category
- Deadline tracking with urgency indicators
- Admin-managed content

### 7. Anonymous Reporting System
- Completely anonymous submissions
- Categories: Harassment, Mental Health, Faculty Issues, Infrastructure
- Teachers and Admin receive notifications
- No user identity stored or displayed

### 8. AI Chatbot
- Built-in assistant for campus queries
- Quick questions for common tasks
- Context-aware responses
- Always accessible via floating button

### 9. Role-Based Access Control
- **Student**: View dashboard, events, opportunities, study groups, resources
- **Teacher/Mentor**: Create events, post announcements, view reports
- **Admin**: Full access + manage opportunities + view anonymous reports

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd campusconnect
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Firebase is already configured in `lib/firebase.ts` with the provided credentials

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (campusconnect-26412)
3. Enable Authentication (Email/Password)
4. Create Firestore Database
5. Deploy security rules from `DATABASE_SCHEMA.md`
6. Create composite indexes as specified in the schema

## Project Structure

\`\`\`
campusconnect/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              # Today's Dashboard
│   │   ├── events/page.tsx       # Events Management
│   │   ├── opportunities/page.tsx # Opportunities Hub
│   │   ├── groups/page.tsx       # Study Groups
│   │   ├── resources/page.tsx    # Resource Center
│   │   ├── connections/page.tsx  # Important Connections
│   │   ├── report/page.tsx       # Anonymous Reporting
│   │   └── layout.tsx            # Dashboard Layout
│   ├── page.tsx                  # Login Page
│   ├── layout.tsx                # Root Layout
│   └── globals.css               # Global Styles
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx           # Navigation Sidebar
│   │   └── top-nav.tsx           # Top Navigation Bar
│   ├── ai-chatbot.tsx            # AI Assistant
│   └── ui/                       # shadcn/ui components
├── contexts/
│   └── auth-context.tsx          # Authentication Context
├── lib/
│   ├── firebase.ts               # Firebase Configuration
│   └── utils.ts                  # Utility Functions
├── types/
│   └── index.ts                  # TypeScript Types
├── DATABASE_SCHEMA.md            # Database Structure
└── README.md                     # This file
\`\`\`

## Usage

### For Students

1. **Login**: Use your university email and password
2. **First Time**: Select your field of interest for personalized connections
3. **Dashboard**: Check today's deadlines and events
4. **RSVP**: Browse events and RSVP to attend
5. **Join Groups**: Find and join study groups
6. **Explore**: Check opportunities, resources, and connections
7. **Report**: Submit anonymous reports if needed
8. **Ask**: Use the AI chatbot for quick queries

### For Teachers

1. **Create Events**: Add campus events for students
2. **Post Announcements**: Share updates in study groups
3. **View Reports**: Access anonymous reports (with admin)

### For Admins

1. **Full Access**: Manage all aspects of the platform
2. **Add Opportunities**: Post hackathons, internships, etc.
3. **Monitor Reports**: Review and address anonymous reports
4. **Manage Users**: Oversee user accounts and roles

## Design Philosophy

- **Minimal & Clean**: Soft colors, rounded corners, card-based design
- **Mobile-First**: Fully responsive across all devices
- **Accessible**: Semantic HTML, proper ARIA labels
- **Fast**: Optimized performance with Next.js
- **Intuitive**: Clear navigation and user flows

## Security

- Firebase Authentication for secure login
- Role-based access control (RBAC)
- Anonymous reporting with zero user tracking
- Firestore security rules for data protection
- Environment variables for sensitive data

## Future Enhancements

- Push notifications for events and deadlines
- Calendar integration (Google Calendar, Outlook)
- Mobile app (React Native)
- Advanced AI chatbot with NLP
- Analytics dashboard for admins
- Email notifications
- File sharing in study groups
- Direct messaging between students

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your campus!

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for students, by students.
\`\`\`


npm install react@18 react-dom@18
npm i