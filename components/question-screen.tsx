"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface QuestionScreenProps {
  question: string
  gifUrl: string
  onYes: () => void
  onNo: () => void
}

export function QuestionScreen({ question, gifUrl, onYes, onNo }: QuestionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 sm:gap-6 w-full"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden"
      >
        <img 
          src={gifUrl || "/placeholder.svg"} 
          alt="Question illustration" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-xl sm:text-2xl md:text-3xl font-semibold text-card-foreground text-center px-2 text-balance"
      >
        {question}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex gap-3 sm:gap-4 mt-2"
      >
        <Button
          onClick={onYes}
          className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Yes
        </Button>
        <Button
          onClick={onNo}
          variant="outline"
          className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full border-2 border-muted-foreground/30 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200"
        >
          No
        </Button>
      </motion.div>
    </motion.div>
  )
}
