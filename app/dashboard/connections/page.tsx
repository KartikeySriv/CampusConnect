"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code, Palette, Lightbulb, TrendingUp, Briefcase } from "lucide-react"

type Interest = "coding" | "design" | "research" | "entrepreneurship" | "finance"

interface Connection {
  name: string
  description: string
  url: string
  icon: React.ReactNode
}

const connectionsByInterest: Record<Interest, Connection[]> = {
  coding: [
    {
      name: "LeetCode",
      description: "Practice coding problems and prepare for technical interviews",
      url: "https://leetcode.com",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "CodeChef",
      description: "Competitive programming platform with contests and challenges",
      url: "https://codechef.com",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "GitHub",
      description: "Host and collaborate on code projects",
      url: "https://github.com",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "Developer Roadmaps",
      description: "Step-by-step guides for different tech career paths",
      url: "https://roadmap.sh",
      icon: <Code className="h-5 w-5" />,
    },
  ],
  design: [
    {
      name: "Figma",
      description: "Collaborative interface design tool",
      url: "https://figma.com",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "Dribbble",
      description: "Design inspiration and portfolio showcase",
      url: "https://dribbble.com",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "Behance",
      description: "Creative work showcase and discovery",
      url: "https://behance.net",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "UI Design Resources",
      description: "Free UI kits, icons, and design systems",
      url: "https://uiverse.io",
      icon: <Palette className="h-5 w-5" />,
    },
  ],
  research: [
    {
      name: "Google Scholar",
      description: "Search for scholarly literature and research papers",
      url: "https://scholar.google.com",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      name: "ResearchGate",
      description: "Connect with researchers and access publications",
      url: "https://researchgate.net",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      name: "arXiv",
      description: "Open-access archive for research papers",
      url: "https://arxiv.org",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      name: "PubMed",
      description: "Database of biomedical literature",
      url: "https://pubmed.ncbi.nlm.nih.gov",
      icon: <Lightbulb className="h-5 w-5" />,
    },
  ],
  entrepreneurship: [
    {
      name: "Startup India",
      description: "Government initiative supporting startups",
      url: "https://startupindia.gov.in",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Y Combinator",
      description: "Startup accelerator resources and library",
      url: "https://ycombinator.com",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Product Hunt",
      description: "Discover and launch new products",
      url: "https://producthunt.com",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Indie Hackers",
      description: "Community of founders building profitable businesses",
      url: "https://indiehackers.com",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ],
  finance: [
    {
      name: "Investopedia",
      description: "Financial education and investment guides",
      url: "https://investopedia.com",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Wall Street Prep",
      description: "Financial modeling and valuation courses",
      url: "https://wallstreetprep.com",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "CFA Institute",
      description: "Chartered Financial Analyst resources",
      url: "https://cfainstitute.org",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Bloomberg Markets",
      description: "Financial news and market data",
      url: "https://bloomberg.com/markets",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ],
}

export default function ConnectionsPage() {
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has selected interest before (mock check)
    const hasSelectedInterest = localStorage.getItem("userInterest")
    if (!hasSelectedInterest) {
      setShowOnboarding(true)
    } else {
      setSelectedInterest(hasSelectedInterest as Interest)
    }
  }, [])

  const handleSelectInterest = (interest: Interest) => {
    setSelectedInterest(interest)
    localStorage.setItem("userInterest", interest)
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Important Connections</CardTitle>
            <CardDescription>
              Select your field of interest to get personalized resources and connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {(Object.keys(connectionsByInterest) as Interest[]).map((interest) => (
                <Button
                  key={interest}
                  variant="outline"
                  className="h-auto py-4 justify-start bg-transparent"
                  onClick={() => handleSelectInterest(interest)}
                >
                  <div className="flex items-center gap-3">
                    {interest === "coding" && <Code className="h-5 w-5" />}
                    {interest === "design" && <Palette className="h-5 w-5" />}
                    {interest === "research" && <Lightbulb className="h-5 w-5" />}
                    {interest === "entrepreneurship" && <TrendingUp className="h-5 w-5" />}
                    {interest === "finance" && <Briefcase className="h-5 w-5" />}
                    <span className="capitalize font-medium">{interest}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const connections = selectedInterest ? connectionsByInterest[selectedInterest] : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Important Connections</h2>
          <p className="text-muted-foreground mt-1">
            Curated resources for <span className="capitalize font-medium">{selectedInterest}</span>
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowOnboarding(true)}>
          Change Interest
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection) => (
          <Card key={connection.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary p-2">{connection.icon}</div>
                <CardTitle className="text-lg">{connection.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{connection.description}</p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href={connection.url} target="_blank" rel="noopener noreferrer">
                  Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
