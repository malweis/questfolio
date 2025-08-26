"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SoundConsentOverlayProps {
  onConsent: () => void
}

export default function SoundConsentOverlay({ onConsent }: SoundConsentOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleConsent = () => {
    setIsVisible(false)
    onConsent()
  }



  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-md mx-4 border border-white/10 shadow-2xl"
          >
            {/* Sound Icon */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343a5 5 0 000 7.072m2.828-9.9a9 9 0 000 12.728" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Enhanced Experience</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                This site includes sound effects as a little story telling device.
                
              </p>
            </div>

            {/* Sound Preview */}
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 text-sm font-medium">Sound Preview</span>
                <span className="text-blue-400 text-xs">Click to test</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const audio = new Audio('/sounds/thunder.mp3')
                    audio.volume = 0.3
                    audio.play().catch(() => {})
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  🔊 Thunder
                </button>
                <button
                  onClick={() => {
                    const audio = new Audio('/sounds/sword-slash.mp3')
                    audio.volume = 0.3
                    audio.play().catch(() => {})
                  }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  ⚔️ Sword
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleConsent}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                Continue
              </button>
            </div>


          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
