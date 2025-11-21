"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context" // Import useAuth

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth() // Use signIn from context
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (email === "student@campusconnect.com" && password === "password123") {
        await signIn("student")
      } else if (email === "teacher@campusconnect.com" && password === "password123") {
        await signIn("teacher")
      } else if (email === "admin@campusconnect.com" && password === "password123") {
        await signIn("admin")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (err) {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  const fillCredentials = (role: string) => {
    setEmail(`${role}@campusconnect.com`)
    setPassword("password123")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">CampusConnect</h1>
          <p className="mt-2 text-muted-foreground">Your unified campus life platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="text-sm text-red-500 font-medium">{error}</div>}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <Button variant="outline" size="xs" onClick={() => fillCredentials("student")}>
                Student
              </Button>
              <Button variant="outline" size="xs" onClick={() => fillCredentials("teacher")}>
                Teacher
              </Button>
              <Button variant="outline" size="xs" onClick={() => fillCredentials("admin")}>
                Admin
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex-col justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact Admin
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
