"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Heart, HeartOff, Clock, Check, X } from "lucide-react"

interface QuestionAnswer {
  question: string
  answer: "Yes" | "No"
}

interface Response {
  valentineAnswer: string
  questionAnswers: QuestionAnswer[]
  respondedAt: string
}

interface ApiResponse {
  hasResponse: boolean
  message?: string
  responses?: Response[]
}

export default function ResponsesPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await fetch("/api/response")
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError("Failed to load responses")
      } finally {
        setLoading(false)
      }
    }

    fetchResponses()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-card-foreground text-center mb-6">
          Valentine Responses
        </h1>

        {loading && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 py-8 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && data && !data.hasResponse && (
          <div className="flex flex-col items-center gap-4 py-8">
            <HeartOff className="w-16 h-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground text-center">
              No response yet
            </p>
            <p className="text-sm text-muted-foreground/70 text-center">
              Waiting for that special someone to answer...
            </p>
          </div>
        )}

        {!loading && !error && data && data.hasResponse && data.responses && (
          <div className="space-y-6">
            {data.responses.map((response, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-4 sm:p-5 rounded-xl bg-primary/5 border border-primary/10"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-primary fill-primary flex-shrink-0" />
                  <span className="text-lg font-medium text-card-foreground">
                    Valentine: {response.valentineAnswer}
                  </span>
                </div>

                <div className="space-y-2 pl-2">
                  <p className="text-sm font-medium text-muted-foreground">Question Answers:</p>
                  {response.questionAnswers?.map((qa, qaIndex) => (
                    <div
                      key={qaIndex}
                      className="flex items-start gap-2 p-2 rounded-lg bg-background/50"
                    >
                      {qa.answer === "Yes" ? (
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-sm text-card-foreground">{qa.question}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          qa.answer === "Yes" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {qa.answer}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-primary/10">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(response.respondedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  )
}
