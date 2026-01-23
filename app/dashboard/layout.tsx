import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { AIChatbot } from "@/components/ai-chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* <TopNav /> */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
      <AIChatbot />
    </div>
  )
}
