"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type UserRole = "student" | "teacher" | "admin"

interface User {
  uid: string
  email: string
  displayName: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  role: UserRole
  signIn: (role: UserRole) => Promise<void> // Added signIn method to context
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: "student",
  signIn: async () => {},
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<UserRole>("student")
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("campus_user")
    const storedRole = localStorage.getItem("campus_role")

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser))
      setRole(storedRole as UserRole)
    }
    setLoading(false)
  }, [])

  const signIn = async (selectedRole: UserRole) => {
    setLoading(true)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      uid: `mock-${selectedRole}-id`,
      email: `${selectedRole}@campusconnect.com`,
      displayName:
        selectedRole === "student" ? "Alex Student" : selectedRole === "teacher" ? "Prof. Johnson" : "Campus Admin",
    }

    setUser(mockUser)
    setRole(selectedRole)
    localStorage.setItem("campus_user", JSON.stringify(mockUser))
    localStorage.setItem("campus_role", selectedRole)
    setLoading(false)
    router.push("/dashboard")
  }

  const signOut = async () => {
    try {
      // Clear state first
      setUser(null)
      setRole("student")

      // Clear localStorage
      localStorage.removeItem("campus_user")
      localStorage.removeItem("campus_role")

      // Navigate to home page
      router.push("/")

      // Force a page refresh to ensure clean state
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, role, signIn, signOut }}>{children}</AuthContext.Provider>
}
