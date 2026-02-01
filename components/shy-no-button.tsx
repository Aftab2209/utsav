"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ShyNoButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const runAway = () => {
    if (!containerRef.current || !buttonRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const button = buttonRef.current.getBoundingClientRect()
    
    // Calculate available space for movement
    const maxX = container.width - button.width - 20
    const maxY = 60 // Limit vertical movement on mobile

    // Generate random position within bounds
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setPosition({ x: newX, y: newY })
  }

  return (
    <div ref={containerRef} className="relative w-full h-20 flex items-center justify-center">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          ref={buttonRef}
          variant="outline"
          className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-full border-2 border-muted-foreground/30 bg-secondary text-secondary-foreground hover:bg-secondary transition-all duration-200"
          onMouseEnter={runAway}
          onTouchStart={runAway}
          onClick={runAway}
        >
          No
        </Button>
      </motion.div>
    </div>
  )
}
