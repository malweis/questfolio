"use client"

import React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSound from "use-sound"
import { cn } from "@/lib/utils"
import { useSoundContext } from "../app/ffxiv/page"

interface SwordCutEffectProps {
  children: React.ReactNode
  className?: string
  manualTrigger?: boolean
  resetTrigger?: boolean
  onTriggerComplete?: () => void
}

export function SwordCutEffect({
  children,
  className,
  manualTrigger = false,
  resetTrigger = false,
  onTriggerComplete,
}: SwordCutEffectProps) {
  const [phase, setPhase] = useState<"idle" | "slash" | "cut" | "separated">("idle")
  const [animationKey, setAnimationKey] = useState(0)
  const { soundEnabled } = useSoundContext()

  // Sound effects using use-sound
  const [playSlash] = useSound('/sounds/sword-slash.mp3', { 
    volume: 0.6,
    playbackRate: 1.0,
    interrupt: true,
    soundEnabled: soundEnabled
  })
  
  const [playCut] = useSound('/sounds/sword-cut.mp3', { 
    volume: 0.7,
    playbackRate: 1.0,
    interrupt: true,
    soundEnabled: soundEnabled
  })
  
  const [playSeparate] = useSound('/sounds/content-separate.mp3', { 
    volume: 0.5,
    playbackRate: 0.9,
    interrupt: true,
    soundEnabled: soundEnabled
  })

  useEffect(() => {
    if (manualTrigger && phase === "idle") {
      setPhase("slash")
      // Play slash sound immediately if sound is enabled
      if (soundEnabled) {
        playSlash()
      }
      
      setTimeout(() => {
        console.log("Moving to cut phase")
        setPhase("cut")
        // Play cut sound if sound is enabled
        if (soundEnabled) {
          playCut()
        }
      }, 600)
      
      setTimeout(() => {
        console.log("Moving to separated phase")
        setPhase("separated")
        // Play separation sound if sound is enabled
        if (soundEnabled) {
          playSeparate()
        }
        onTriggerComplete?.()
      }, 1200)
    }
  }, [manualTrigger, phase, onTriggerComplete, playSlash, playCut, playSeparate, soundEnabled])

  useEffect(() => {
    if (resetTrigger) {
      console.log("Resetting animation")
      setPhase("idle")
      setAnimationKey((prev) => prev + 1)
    }
  }, [resetTrigger])

  return (
    <div className={cn("relative overflow-hidden", className)} key={animationKey}>
      {/* Sword Slash Effect */}
      <AnimatePresence>
        {phase === "slash" && (
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="slashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(0,255,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(0,255,255,0)" />
                </linearGradient>
              </defs>

              {/* Main slash line */}
              <motion.line
                x1="-10"
                y1="50"
                x2="100"
                y2="49.9"
                stroke="url(#slashGradient)"
                strokeWidth="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  pathLength: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 0.1 }
                }}
              />

              {/* Glow effect */}
              <motion.line
                x1="-10"
                y1="50"
                x2="100"
                y2="49.9"
                stroke="url(#glowGradient)"
                strokeWidth="0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ 
                  pathLength: { duration: 0.5, ease: "easeOut" },
                  opacity: { duration: 0.4, delay: 0.2 }
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spark Effects */}
      <AnimatePresence>
        {phase === "cut" && (
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-yellow-400 rounded-full"
                style={{
                  width: Math.random() * 3 + 2 + "px",
                  height: Math.random() * 3 + 2 + "px",
                  top: "50%",
                  left: 20 + i * 8 + "%",
                }}
                initial={{ 
                  scale: 0, 
                  opacity: 0, 
                  y: 0,
                  x: 0
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: -30 - Math.random() * 20,
                  x: (Math.random() - 0.5) * 20
                }}
                exit={{ 
                  scale: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with Cut Effect */}
      <div className="relative">
        {phase === "idle" || phase === "slash" ? (
          <div>
            {children}
          </div>
        ) : (
          <div className="relative">
            {/* Top Half */}
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
              }}
              animate={phase === "separated" ? {
                y: -30,
                rotate: -1,
                transition: { duration: 0.8, ease: "easeOut" }
              } : {}}
            >
              {children}
            </motion.div>
            
            {/* Bottom Half */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"
              }}
            >
              {children}
            </div>

            {/* Invisible content for layout */}
            <div className="opacity-0">{children}</div>
          </div>
        )}
      </div>
    </div>
  )
}
