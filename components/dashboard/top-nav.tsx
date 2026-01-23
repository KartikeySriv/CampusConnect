"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search events, groups..."
            className="h-9 w-64 rounded-lg border bg-secondary pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      {/* <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div> */}
    </header>
  )
}
