import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen } from "lucide-react"

const resources = [
  {
    name: "DotNotes",
    description:
      "Comprehensive study notes and materials curated by students and faculty. Access notes for all your courses.",
    url: "https://dotnotes.in",
    icon: "📝",
  },
  {
    name: "Syllabux",
    description:
      "Complete syllabus coverage with topic-wise resources, previous year papers, and exam preparation guides.",
    url: "https://syllabux.live",
    icon: "📚",
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resource Center</h2>
        <p className="text-muted-foreground mt-1">Access trusted study materials and resources</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.name} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{resource.icon}</div>
                <div>
                  <CardTitle className="text-xl">{resource.name}</CardTitle>
                  <CardDescription className="mt-1">Trusted Resource Provider</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
              <Button className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Visit {resource.name} <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <CardTitle className="text-lg">Need More Resources?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If you know of other trusted resource providers that should be listed here, please contact the admin team.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
