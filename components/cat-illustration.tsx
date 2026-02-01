"use client"

import { motion } from "framer-motion"

export function CatIllustration() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-24 h-24 sm:w-32 sm:h-32"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Left ear */}
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Left ear */}
          <polygon points="25,45 35,15 50,40" fill="#E8B87D" />
          <polygon points="30,40 37,25 45,38" fill="#FFD4A8" />
          
          {/* Right ear */}
          <polygon points="95,45 85,15 70,40" fill="#E8B87D" />
          <polygon points="90,40 83,25 75,38" fill="#FFD4A8" />
          
          {/* Head */}
          <circle cx="60" cy="65" r="40" fill="#E8B87D" />
          
          {/* Face highlight */}
          <ellipse cx="60" cy="60" rx="30" ry="28" fill="#F5C98A" />
          
          {/* Left eye */}
          <circle cx="45" cy="60" r="4" fill="#2D2D2D" />
          <circle cx="46" cy="59" r="1.5" fill="#FFFFFF" />
          
          {/* Right eye */}
          <circle cx="75" cy="60" r="4" fill="#2D2D2D" />
          <circle cx="76" cy="59" r="1.5" fill="#FFFFFF" />
          
          {/* Nose */}
          <ellipse cx="60" cy="72" rx="4" ry="3" fill="#FF9EB5" />
          
          {/* Mouth */}
          <path d="M 55 78 Q 60 82 65 78" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        
        {/* Floating hearts */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 -right-1 sm:-top-3 sm:-right-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF6B8A" className="sm:w-6 sm:h-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute top-0 -left-1 sm:-left-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF8FA3" className="sm:w-5 sm:h-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
