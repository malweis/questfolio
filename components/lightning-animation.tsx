"use client"

import { useState } from "react"

interface LightningAnimationProps {
  onAnimationComplete?: () => void
}

export default function LightningAnimation({ onAnimationComplete }: LightningAnimationProps) {
  const [animationState, setAnimationState] = useState<
    "idle" | "lightning" | "burning" | "disintegrating" | "complete"
  >("idle")
  const [lightningPaths, setLightningPaths] = useState<string[]>([])

  // Generate realistic branching lightning paths
  const generateLightningPaths = () => {
    const paths: string[] = []

    const mainPath = generateBranchingPath(100, 0, 100, 200, 0, 8)
    paths.push(mainPath)

    for (let i = 0; i < 5; i++) {
      const startX = 80 + Math.random() * 40
      const startY = 50 + Math.random() * 100 // Reduced from 150
      const endX = startX + (Math.random() - 0.5) * 80
      const endY = startY + 50 + Math.random() * 60 // Reduced from 100
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

      // Add random jagged movement
      const jitterX = (Math.random() - 0.5) * 20 * (1 - progress * 0.5)
      const jitterY = (Math.random() - 0.5) * 15 * (1 - progress * 0.5)

      currentX = targetX + jitterX
      currentY = targetY + jitterY

      segments.push(`L ${currentX} ${currentY}`)
    }

    return segments.join(" ")
  }

  const startAnimation = () => {
    // Generate new lightning pattern each time
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

    // Reset after 1s and notify completion
    setTimeout(() => {
      setAnimationState("idle")
      if (onAnimationComplete) {
        onAnimationComplete()
      }
    }, 5300)
  }

  return (
    <div className="relative overflow-hidden min-h-[400px]">
      <svg
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-100 ${
          animationState === "lightning" ? "opacity-100" : "opacity-0"
        }`}
        width="200"
        height="400"
        viewBox="0 0 200 400"
        fill="none"
        style={{ pointerEvents: 'none' }}
      >
        {lightningPaths.map((path, index) => (
          <g key={index}>
            {/* Main lightning stroke */}
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
            {/* Glow effect for each path */}
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

      {/* Label - Keep original text color, only outline changes */}
      <div className="relative text-center pt-32">
        <div
          className={`
            px-8 py-4 text-slate-100 text-2xl font-bold
            transition-all duration-500 transform
            ${animationState === "idle" ? "scale-100 opacity-100" : ""}
            ${animationState === "lightning" ? "scale-105 opacity-100" : ""}
            ${animationState === "burning" ? "scale-100 opacity-100" : ""}
            ${animationState === "disintegrating" ? "scale-110 opacity-0" : ""}
            ${animationState === "complete" ? "scale-0 opacity-0" : ""}
          `}
          style={{
            background: "transparent",
            color: "#f1f5f9", // Always keep original text color
            WebkitTextStroke:
              animationState === "burning" || animationState === "disintegrating" ? "1px #3b82f6" : "none",
            textShadow:
              animationState === "burning" || animationState === "disintegrating"
                ? "0 0 2px #3b82f6, 0 0 4px #60a5fa" // Blue glow instead of orange
                : animationState === "lightning"
                  ? "0 0 10px rgba(147, 197, 253, 0.8)"
                  : "none",
            filter: animationState === "disintegrating" ? "blur(2px)" : "none",
          }}
        >
          STRIKE ME!
        </div>

        {(animationState === "burning" || animationState === "disintegrating") && (
          <div className="absolute inset-0 pointer-events-none"></div>
        )}

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
      </div>

      {/* Control button */}
      <div className="text-center mt-6 relative z-10">
        <button
          onClick={startAnimation}
          disabled={animationState !== "idle"}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {animationState === "idle" ? "Strike with Lightning!" : "Animating..."}
        </button>
      </div>

      <style jsx>{`
        @keyframes realistic-flame {
          0% {
            opacity: 0.7;
            transform: scaleY(1) scaleX(0.9) rotate(-2deg);
          }
          50% {
            opacity: 0.9;
            transform: scaleY(1.4) scaleX(1.1) rotate(1deg);
          }
          100% {
            opacity: 0.6;
            transform: scaleY(1.2) scaleX(0.8) rotate(-1deg);
          }
        }
        
        @keyframes flowing-flame {
          0% {
            opacity: 0.5;
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            opacity: 0.8;
            transform: translateY(-3px) rotate(5deg) scale(1.1);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-1px) rotate(-3deg) scale(0.9);
          }
          75% {
            opacity: 0.9;
            transform: translateY(-4px) rotate(2deg) scale(1.2);
          }
          100% {
            opacity: 0.4;
            transform: translateY(-2px) rotate(-1deg) scale(0.8);
          }
        }

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
