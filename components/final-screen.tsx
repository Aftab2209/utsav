"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function FinalScreen() {
  const hasSaved = useRef(false)

  useEffect(() => {
    async function saveResponse() {
      if (hasSaved.current) return
      hasSaved.current = true

      try {
        await fetch("/api/response", {
          method: "POST",
        })
      } catch (error) {
        console.error("Failed to save response:", error)
      }
    }

    saveResponse()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-4 sm:gap-6"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden"
      >
        <img 
          src="https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif" 
          alt="Celebration hearts" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-card-foreground text-balance">
          {"Perfect. I'll take it from here."}
        </h2>
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block text-3xl sm:text-4xl mt-3"
        >
          💖
        </motion.span>
      </motion.div>
      
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: `${15 + i * 15}vw`, opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute text-xl sm:text-2xl"
          >
            💕
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
