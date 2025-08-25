"use client"

import { motion } from "framer-motion"
import { useSound } from "./sound-context"

export default function FloatingSoundToggle() {
  const { hasSoundConsent, setSoundConsent } = useSound()

  const toggleSound = () => {
    setSoundConsent(!hasSoundConsent)
  }

  return (
    <motion.button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-full border border-white/10 shadow-2xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", damping: 20 }}
    >
      {hasSoundConsent ? (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343a5 5 0 000 7.072m2.828-9.9a9 9 0 000 12.728" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
      
      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
        {hasSoundConsent ? "Sound On" : "Sound Off"}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/10 rotate-45"></div>
      </div>
    </motion.button>
  )
}
