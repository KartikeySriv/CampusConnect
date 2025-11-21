"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OpportunityCategory = "hackathon" | "internship" | "scholarship" | "competition"

interface Opportunity {
  id: number
  title: string
  category: OpportunityCategory
  description: string
  deadline: string
  eligibility: string
  link: string
}

const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Global Student Hackathon 2025",
    category: "hackathon",
    description:
      "48-hour virtual hackathon with $50,000 in prizes. Build innovative solutions for real-world problems.",
    deadline: "2025-11-23",
    eligibility: "All students",
    link: "https://example.com/hackathon",
  },
  {
    id: 2,
    title: "Google Summer Internship",
    category: "internship",
    description: "12-week paid internship at Google's Mountain View campus. Work on cutting-edge projects.",
    deadline: "2025-12-15",
    eligibility: "CS/IT students, Junior/Senior year",
    link: "https://careers.google.com",
  },
  {
    id: 3,
    title: "Merit Scholarship Program",
    category: "scholarship",
    description: "Full tuition scholarship for outstanding academic performance. Renewable for 4 years.",
    deadline: "2025-12-01",
    eligibility: "GPA 3.5+, All majors",
    link: "https://example.com/scholarship",
  },
  {
    id: 4,
    title: "ACM Programming Contest",
    category: "competition",
    description: "International programming competition. Compete with teams from around the world.",
    deadline: "2025-11-30",
    eligibility: "All students with programming experience",
    link: "https://icpc.global",
  },
  {
    id: 5,
    title: "Microsoft Explore Internship",
    category: "internship",
    description: "Internship program for first and second-year students. No prior experience required.",
    deadline: "2025-12-20",
    eligibility: "Freshman/Sophomore, CS/related majors",
    link: "https://careers.microsoft.com",
  },
  {
    id: 6,
    title: "Design Challenge 2025",
    category: "competition",
    description: "UI/UX design competition with industry mentors. Win prizes and portfolio opportunities.",
    deadline: "2025-12-10",
    eligibility: "Design students, All years",
    link: "https://example.com/design",
  },
]

const categoryColors: Record<OpportunityCategory, string> = {
  hackathon: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  internship:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800",
  scholarship:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800",
  competition:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800",
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities)
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | "all">("all")
  const { role } = useAuth()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newOpportunity, setNewOpportunity] = useState({
    title: "",
    category: "hackathon" as OpportunityCategory,
    description: "",
    deadline: "",
    eligibility: "",
    link: "",
  })

  const handleAddOpportunity = () => {
    if (newOpportunity.title && newOpportunity.description && newOpportunity.deadline) {
      const opportunity: Opportunity = {
        id: opportunities.length + 1,
        ...newOpportunity,
      }
      setOpportunities([opportunity, ...opportunities])
      setNewOpportunity({
        title: "",
        category: "hackathon",
        description: "",
        deadline: "",
        eligibility: "",
        link: "",
      })
      setIsDialogOpen(false)
    }
  }

  const filteredOpportunities =
    selectedCategory === "all" ? opportunities : opportunities.filter((opp) => opp.category === selectedCategory)

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Opportunities</h2>
          <p className="text-muted-foreground mt-1">Hackathons, internships, scholarships, and competitions</p>
        </div>
        {role === "admin" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Opportunity
            </Button>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Opportunity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="opp-title">Title</Label>
                  <Input
                    id="opp-title"
                    placeholder="e.g., Global Student Hackathon"
                    value={newOpportunity.title}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opp-category">Category</Label>
                  <Select
                    value={newOpportunity.category}
                    onValueChange={(value) =>
                      setNewOpportunity({ ...newOpportunity, category: value as OpportunityCategory })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opp-description">Description</Label>
                  <Textarea
                    id="opp-description"
                    placeholder="Describe the opportunity..."
                    value={newOpportunity.description}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opp-deadline">Deadline</Label>
                  <Input
                    id="opp-deadline"
                    type="date"
                    value={newOpportunity.deadline}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, deadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opp-eligibility">Eligibility</Label>
                  <Input
                    id="opp-eligibility"
                    placeholder="e.g., All students"
                    value={newOpportunity.eligibility}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, eligibility: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opp-link">Link</Label>
                  <Input
                    id="opp-link"
                    placeholder="https://example.com"
                    value={newOpportunity.link}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, link: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOpportunity}>Add Opportunity</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === "hackathon" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("hackathon")}
        >
          Hackathons
        </Button>
        <Button
          variant={selectedCategory === "internship" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("internship")}
        >
          Internships
        </Button>
        <Button
          variant={selectedCategory === "scholarship" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("scholarship")}
        >
          Scholarships
        </Button>
        <Button
          variant={selectedCategory === "competition" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("competition")}
        >
          Competitions
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opp) => {
          const daysLeft = getDaysUntilDeadline(opp.deadline)
          return (
            <Card key={opp.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{opp.title}</CardTitle>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium capitalize border ${categoryColors[opp.category]}`}
                  >
                    {opp.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{opp.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className={daysLeft <= 3 ? "text-destructive font-medium" : ""}>
                        Deadline: {new Date(opp.deadline).toLocaleDateString()}
                        {daysLeft > 0 && ` (${daysLeft} days left)`}
                        {daysLeft === 0 && " (Today!)"}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Eligibility:</span> {opp.eligibility}
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href={opp.link} target="_blank" rel="noopener noreferrer">
                    Learn More <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
