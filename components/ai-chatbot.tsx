"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const quickQuestions = [
  "What events are happening today?",
  "Show me study groups",
  "Where can I find coding resources?",
  "What opportunities are available?",
]

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your CampusConnect assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = "I'm here to help! You can ask me about events, study groups, resources, or opportunities on campus."

    // Simple keyword-based responses for demo
    if (userMessage.toLowerCase().includes("event")) {
      response =
        "You have 2 events today: Tech Talk on AI at 2:00 PM in Auditorium A, and Design Club Meetup at 4:30 PM in Room 304. Would you like to RSVP?"
    } else if (userMessage.toLowerCase().includes("group")) {
      response =
        "You're currently in 2 study groups: Data Structures and Machine Learning Research. You can find more groups in the Study Groups section."
    } else if (userMessage.toLowerCase().includes("resource") || userMessage.toLowerCase().includes("coding")) {
      response =
        "For coding resources, check out LeetCode, CodeChef, and GitHub in the Connections section. You can also visit DotNotes and Syllabux in the Resource Center."
    } else if (userMessage.toLowerCase().includes("opportunit")) {
      response =
        "There are 6 opportunities available this week, including the Global Student Hackathon (deadline in 2 days) and Google Summer Internship. Check the Opportunities page for details."
    }

    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setIsTyping(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b flex-shrink-0">
        <CardTitle className="text-lg">Campus Assistant</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-[85%] break-words ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-secondary">
                <div className="flex gap-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="p-4 border-t space-y-2 flex-shrink-0">
            <p className="text-xs text-muted-foreground">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-3 py-1.5 rounded-full border hover:bg-secondary transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-w-0"
            />
            <Button size="icon" onClick={handleSend} className="flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
