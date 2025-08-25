"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScrollImage from "./scroll-image"
import { useSound } from "./sound-context"

interface StormTriggerProps {
  onStormTriggered: () => void
  onReset: () => void
  Part1Component: any
  components: any
}

export default function StormTrigger({ onStormTriggered, onReset, Part1Component, components }: StormTriggerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [animationState, setAnimationState] = useState<"idle" | "lightning" | "burning" | "disintegrating" | "complete">("idle")
  const [lightningPaths, setLightningPaths] = useState<string[]>([])
  const { hasSoundConsent } = useSound()

  // Generate realistic branching lightning paths
  const generateLightningPaths = () => {
    const paths: string[] = []
    const mainPath = generateBranchingPath(100, 0, 100, 200, 0, 8)
    paths.push(mainPath)

    for (let i = 0; i < 5; i++) {
      const startX = 80 + Math.random() * 40
      const startY = 50 + Math.random() * 100
      const endX = startX + (Math.random() - 0.5) * 80
      const endY = startY + 50 + Math.random() * 60
      const branch = generateBranchingPath(startX, startY, endX, endY, 1, 4)
      paths.push(branch)
    }
    return paths
  }

  // Generate a single branching path with fractal-like behavior
  const generateBranchingPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    depth: number,
    maxDepth: number,
  ): string => {
    if (depth >= maxDepth) {
      return `M ${startX} ${startY} L ${endX} ${endY}`
    }

    const segments: string[] = []
    const numSegments = 3 + Math.floor(Math.random() * 4)
    let currentX = startX
    let currentY = startY

    segments.push(`M ${currentX} ${currentY}`)

    for (let i = 1; i <= numSegments; i++) {
      const progress = i / numSegments
      const targetX = startX + (endX - startX) * progress
      const targetY = startY + (endY - startY) * progress

      const jitterX = (Math.random() - 0.5) * 20 * (1 - progress * 0.5)
      const jitterY = (Math.random() - 0.5) * 15 * (1 - progress * 0.5)

      currentX = targetX + jitterX
      currentY = targetY + jitterY

      segments.push(`L ${currentX} ${currentY}`)
    }

    return segments.join(" ")
  }

  const handleStormClick = () => {
    if (animationState !== "idle") return
    
    // Play the sound only if user has consented
    if (hasSoundConsent) {
      const audio = new Audio('/sounds/thunder.mp3');
      audio.play().catch(() => {}); // Ignore any playback errors
    }
    
    setIsClicked(true)
    setLightningPaths(generateLightningPaths())
    setAnimationState("lightning")
  

    // Lightning strikes for 0.3s
    setTimeout(() => {
      setAnimationState("burning")
    }, 300)

    setTimeout(() => {
      setAnimationState("disintegrating")
    }, 2300)

    setTimeout(() => {
      setAnimationState("complete")
    }, 4300)

    // Transition to full story after animation completes
    setTimeout(() => {
      onStormTriggered()
    }, 5300)
  }

  const handleReset = () => {
    setIsClicked(false)
    setAnimationState("idle")
    onReset()
  }

  return (
    <div className="relative">
      <motion.div
        key="storm-trigger"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
          Character Lore & Story
        </h2>
        
        {/* First Part of the Story - Before the Storm */}
        <div className="mb-8">
          {Part1Component && <Part1Component components={components} />}
        </div>

        {/* Scroll Image - Visual Aid Before the Storm */}
        <ScrollImage
          src="/assets/next.svg"
          alt="The calm before the storm"
          soundSrc="/sounds/thunder.mp3"
          caption="A moment of peace before chaos erupts"
          className="my-12 max-w-lg mx-auto"
          delay={0.1}
        />

        {/* Storm Trigger Section */}
        <div className="text-center py-8 relative">
           {/* Lightning SVG overlay - positioned relative to the STORM word */}
           <svg
             className={`absolute transition-opacity duration-100 ${
               animationState === "lightning" ? "opacity-100" : "opacity-0"
             }`}
             width="200"
             height="400"
             viewBox="0 0 200 400"
             fill="none"
             style={{ 
               pointerEvents: 'none',
               position: 'absolute',
               top: '-150px',
               left: '50%',
               transform: 'translateX(-50%)',
               zIndex: 10
             }}
           >
             {lightningPaths.map((path, index) => (
               <g key={index}>
                 <path
                   d={path}
                   stroke="url(#lightning-gradient)"
                   strokeWidth={index === 0 ? "3" : "1.5"}
                   fill="none"
                   strokeLinecap="round"
                   className={`${animationState === "lightning" ? "animate-pulse" : ""}`}
                   style={{
                     filter: "drop-shadow(0 0 8px rgba(147, 197, 253, 0.8))",
                     animationDelay: `${index * 0.02}s`,
                   }}
                 />
                 <path
                   d={path}
                   stroke="rgba(147, 197, 253, 0.4)"
                   strokeWidth={index === 0 ? "8" : "4"}
                   fill="none"
                   strokeLinecap="round"
                   className={`${animationState === "lightning" ? "animate-pulse" : ""}`}
                   style={{
                     animationDelay: `${index * 0.02}s`,
                   }}
                 />
               </g>
             ))}
             <defs>
               <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#f0f9ff" />
                 <stop offset="30%" stopColor="#93c5fd" />
                 <stop offset="70%" stopColor="#3b82f6" />
                 <stop offset="100%" stopColor="#1e40af" />
               </linearGradient>
             </defs>
           </svg>

           <motion.div
             className="inline-block relative"
             onHoverStart={() => !isClicked && setIsHovered(true)}
             onHoverEnd={() => !isClicked && setIsHovered(false)}
             whileHover={{ scale: isClicked ? 1 : 1.05 }}
             whileTap={{ scale: isClicked ? 1 : 0.95 }}
           >
             <motion.span
               className="text-6xl sm:text-8xl font-black cursor-pointer select-none"
               style={{
                 background: "linear-gradient(135deg, #f0f9ff 0%, #93c5fd 50%, #3b82f6 100%)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 filter: isHovered ? "drop-shadow(0 0 20px rgba(147, 197, 253, 0.8))" : "none",
                 textShadow: isHovered 
                   ? "0 0 30px rgba(147, 197, 253, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)" 
                   : animationState === "lightning" ? "0 0 20px rgba(147, 197, 253, 0.8)" :
                     animationState === "burning" ? "0 0 15px rgba(59, 130, 246, 0.8)" : 
                     "0 0 10px rgba(147, 197, 253, 0.3)",
                 WebkitTextStroke: animationState === "burning" ? "1px #3b82f6" : "none"
               }}
               animate={{
                 scale: animationState === "lightning" ? 1.05 : 
                        animationState === "disintegrating" ? 1.1 : 
                        animationState === "complete" ? 0.8 : 1,
                 opacity: animationState === "disintegrating" ? 0.7 : 
                          animationState === "complete" ? 0 : 1,
                 filter: animationState === "disintegrating" ? "blur(1px)" : "none"
               }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
               onClick={handleStormClick}
             >
               STORM
             </motion.span>

             {/* Disintegration particles */}
             {animationState === "disintegrating" && (
               <div className="absolute inset-0 pointer-events-none">
                 {Array.from({ length: 20 }).map((_, i) => (
                   <div
                     key={`disintegrate-${i}`}
                     className="absolute w-1 h-1 bg-slate-300 rounded-full"
                     style={{
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 100}%`,
                       animation: `disintegrate ${1.5 + Math.random() * 0.5}s ease-out forwards`,
                       animationDelay: `${Math.random() * 0.5}s`,
                     }}
                   />
                 ))}
               </div>
             )}
           </motion.div>
          
          <motion.p
            className="text-white/70 mt-4 text-lg italic"
            animate={{ opacity: isHovered && !isClicked ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {isClicked 
              ? "The storm approaches..." 
              : isHovered 
                ? "Click to unleash the storm..." 
                : "Hover over the word above..."
            }
          </motion.p>

          {/* Reset Button */}
          <motion.button
            onClick={handleReset}
            className="mt-6 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Reset Story
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes disintegrate {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
          }
        }
      `}</style>
    </div>
  )
}
