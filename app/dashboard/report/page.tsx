"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Shield } from "lucide-react"

type ReportCategory = "harassment" | "mental-health" | "faculty" | "infrastructure"

const categories = [
  {
    value: "harassment" as ReportCategory,
    label: "Harassment",
    description: "Report any form of harassment or bullying",
  },
  {
    value: "mental-health" as ReportCategory,
    label: "Mental Health",
    description: "Share mental health concerns confidentially",
  },
  {
    value: "faculty" as ReportCategory,
    label: "Faculty Issues",
    description: "Report concerns related to teaching or faculty behavior",
  },
  {
    value: "infrastructure" as ReportCategory,
    label: "Infrastructure",
    description: "Report facility or infrastructure problems",
  },
]

export default function ReportPage() {
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null)
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to submit anonymous report
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, this would send to Firestore without user identification
    console.log("[v0] Anonymous report submitted:", { category: selectedCategory, description })

    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setSelectedCategory(null)
      setDescription("")
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Report Submitted</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your anonymous report has been submitted successfully. The admin and relevant faculty will be notified.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Anonymous Reporting</h2>
        <p className="text-muted-foreground mt-1">Submit concerns safely and anonymously</p>
      </div>

      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200">Your identity is protected</p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                This system does not collect or store any identifying information. Your report will be completely
                anonymous.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Report Category</CardTitle>
            <CardDescription>Choose the category that best describes your concern</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`text-left rounded-lg border-2 p-4 transition-all hover:border-primary ${
                    selectedCategory === category.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="font-medium">{category.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{category.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedCategory && (
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Concern</CardTitle>
              <CardDescription>Provide details to help us address the issue effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe the situation in detail. Include relevant dates, locations, and any other information that might be helpful..."
                className="w-full min-h-[200px] rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                required
              />
            </CardContent>
          </Card>
        )}

        {selectedCategory && description && (
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Anonymous Report"}
          </Button>
        )}
      </form>
    </div>
  )
}
