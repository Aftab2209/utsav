"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CatIllustration } from "@/components/cat-illustration"
import { ShyNoButton } from "@/components/shy-no-button"
import { QuestionScreen } from "@/components/question-screen"
import { FinalScreen } from "@/components/final-screen"
import Image from "next/image"

const questions = [
  {
    question: "Bike ride together?",
    gif: "/bikeride.gif"
  },
  {
    question: "Date night?",
    gif: "/catdate.gif"
  },
  {
    question: "Get irresponsibly drunk together?",
    gif: "/catdrunk.gif"
  },
  {
    question: "Trust me with a surprise?",
    gif: "/catlaugh.gif"
  }
]


interface Answer {
  question: string
  answer: "Yes" | "No"
}

export default function ValentinePage() {
  const [screen, setScreen] = useState<"landing" | "questions" | "final">("landing")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const saveResponse = async (allAnswers: Answer[]) => {
    try {
      await fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valentineAnswer: "Yes",
          questionAnswers: allAnswers
        })
      })
    } catch (error) {
      console.error("Failed to save response:", error)
    }
  }

  const handleYesClick = () => {
    setScreen("questions")
  }

  const handleQuestionYes = () => {
    const newAnswer: Answer = {
      question: questions[currentQuestion].question,
      answer: "Yes"
    }
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      saveResponse(updatedAnswers)
      setScreen("final")
    }
  }

  const handleQuestionNo = () => {
    const newAnswer: Answer = {
      question: questions[currentQuestion].question,
      answer: "No"
    }
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      saveResponse(updatedAnswers)
      setScreen("final")
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-background via-background to-primary/10">
      <Card className="relative w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {screen === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 sm:gap-6"
            >
              <Image src={'/Dance cat.gif'} alt={""} width={200} height={200}/>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-card-foreground text-center text-balance"
              >
                Preeti, will you be my Valentine?
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-2 w-full"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    onClick={handleYesClick}
                    className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Yes
                  </Button>
                </div>
                
                <ShyNoButton />
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs sm:text-sm text-muted-foreground mt-1"
                >
                  {'"No" seems a bit shy 😈'}
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {screen === "questions" && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionScreen
                question={questions[currentQuestion].question}
                gifUrl={questions[currentQuestion].gif}
                onYes={handleQuestionYes}
                onNo={handleQuestionNo}
              />
            </motion.div>
          )}

          {screen === "final" && (
            <FinalScreen key="final" />
          )}
        </AnimatePresence>
      </Card>
    </main>
  )
}

