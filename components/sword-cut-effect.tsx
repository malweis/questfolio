"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SwordCutEffectProps {
  children: React.ReactNode
  scrollTriggerPercent?: number // Percentage of scroll to trigger cut (0-100)
  className?: string
  manualTrigger?: boolean
  resetTrigger?: boolean
  onTriggerComplete?: () => void
}

export function SwordCutEffect({
  children,
  scrollTriggerPercent = 10,
  className,
  manualTrigger = false,
  resetTrigger = false,
  onTriggerComplete,
}: SwordCutEffectProps) {
  const [phase, setPhase] = useState<"idle" | "slash" | "cut" | "separated">("idle")
  const [scrollPercent, setScrollPercent] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (manualTrigger && phase === "idle") {
      setPhase("slash")
      setTimeout(() => setPhase("cut"), 600)
      setTimeout(() => {
        setPhase("separated")
        onTriggerComplete?.()
      }, 1200)
    }
  }, [manualTrigger, phase, onTriggerComplete])

  useEffect(() => {
    if (resetTrigger) {
      setPhase("idle")
      setAnimationKey((prev) => prev + 1)
    }
  }, [resetTrigger])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = Math.min((scrollTop / docHeight) * 100, 100)
      setScrollPercent(scrolled)

      if (scrolled >= scrollTriggerPercent && phase === "idle") {
        setPhase("slash")
        setTimeout(() => setPhase("cut"), 600)
        setTimeout(() => {
          setPhase("separated")
        }, 1200)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollTriggerPercent, phase])

  return (
    <div className={cn("relative overflow-hidden", className)} key={animationKey}>
      <div className="fixed top-4 right-4 z-50 bg-black/50 text-white px-3 py-1 rounded text-sm">
        Scroll: {Math.round(scrollPercent)}% (Cut at {scrollTriggerPercent}%)
      </div>

      {phase === "slash" && (
        <div className="absolute inset-0 z-20 pointer-events-none">
         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="slashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,255,255,0)" />
                <stop offset="50%" stopColor="rgba(0,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(0,255,255,0)" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="smallBlur" />
                <feGaussianBlur stdDeviation="3" result="mediumBlur" />
                <feGaussianBlur stdDeviation="6" result="largeBlur" />
                <feMerge>
                  <feMergeNode in="largeBlur" />
                  <feMergeNode in="mediumBlur" />
                  <feMergeNode in="smallBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="outerGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="outerBlur" />
                <feColorMatrix values="0 1 1 0 0  0 1 1 0 0  0 1 1 0 0  0 0 0 1 0" result="cyan" />
                <feMerge>
                  <feMergeNode in="cyan" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <line
              x1="-10"
              y1="50"
              x2="110"
              y2="40"
              stroke="rgba(0,255,255,0.3)"
              strokeWidth="2"
              className="slash-outer-glow"
              filter="url(#outerGlow)"
            />

            <line
              x1="-10"
              y1="50"
              x2="110"
              y2="40"
              stroke="url(#glowGradient)"
              strokeWidth="1.2"
              className="slash-glow"
              opacity="0.9"
              filter="url(#glow)"
            />

            {/* Main slash line */}
            <line
              x1="-10"
              y1="50"
              x2="110"
              y2="40"
              stroke="url(#slashGradient)"
              strokeWidth="0.3"
              className="slash-main"
              filter="url(#glow)"
            />

            {/* Trail effect */}
            <line
              x1="-10"
              y1="50"
              x2="110"
              y2="40"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="0.1"
              className="slash-trail"
            />
          </svg>
        </div>
      )}

      {phase === "cut" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="spark absolute bg-yellow-400 rounded-full"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                top: "50%",
                left: 20 + i * 6 + "%",
                transform: `translate(-50%, -50%)`,
                animationName: `spark-${i % 4}`,
                animationDuration: "0.8s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
                animationDelay: `${i * 0.03}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative">
        {phase === "cut" || phase === "separated" ? (
          <div className="relative">
            <div
              className="absolute inset-0 cut-half-top"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                animationName: phase === "cut" ? "cut-top-separate" : "none",
                animationDuration: phase === "cut" ? "0.8s" : "0s",
                animationTimingFunction: phase === "cut" ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "ease",
                animationFillMode: phase === "cut" ? "forwards" : "none",
                animationDelay: phase === "cut" ? "0.1s" : "0s",
                transform: phase === "separated" ? "translateY(-30px) rotate(-1deg)" : "none",
              }}
            >
              {children}
            </div>

            <div
              className="absolute inset-0 cut-half-bottom"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                transform: "none",
              }}
            >
              {children}
            </div>

            <div className="opacity-0">{children}</div>
          </div>
        ) : (
          <div className={cn("transition-all duration-200", phase === "slash" && "brightness-110")}>{children}</div>
        )}
      </div>

      <style jsx>{`
        .slash-outer-glow {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: slash-glow-outer 0.6s ease-out forwards;
        }

        .slash-main {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: slash-draw 0.6s ease-out forwards;
        }

        .slash-glow {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: slash-glow-draw 0.6s ease-out forwards;
        }

        .slash-trail {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: slash-trail 0.6s ease-out forwards;
        }

        @keyframes slash-glow-outer {
          0% {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          20% {
            stroke-dashoffset: 80;
            opacity: 0.4;
          }
          60% {
            stroke-dashoffset: 20;
            opacity: 0.6;
          }
          100% {
            stroke-dashoffset: -40;
            opacity: 0;
          }
        }

        @keyframes slash-glow-draw {
          0% {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          25% {
            stroke-dashoffset: 70;
            opacity: 0.8;
          }
          65% {
            stroke-dashoffset: 10;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -50;
            opacity: 0;
          }
        }

        @keyframes slash-draw {
          0% {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          30% {
            stroke-dashoffset: 60;
            opacity: 1;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -60;
            opacity: 0;
          }
        }

        @keyframes slash-trail {
          0% {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          20% {
            stroke-dashoffset: 80;
            opacity: 0.8;
          }
          60% {
            stroke-dashoffset: 20;
            opacity: 0.6;
          }
          100% {
            stroke-dashoffset: -40;
            opacity: 0;
          }
        }

        @keyframes cut-top-separate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) rotate(-1deg);
            opacity: 1;
          }
        }

        @keyframes spark-0 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateY(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(0deg) translateY(-50px); opacity: 0; }
        }

        @keyframes spark-1 {
          0% { transform: translate(-50%, -50%) rotate(45deg) translateY(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(45deg) translateY(-45px); opacity: 0; }
        }

        @keyframes spark-2 {
          0% { transform: translate(-50%, -50%) rotate(90deg) translateY(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(90deg) translateY(-40px); opacity: 0; }
        }

        @keyframes spark-3 {
          0% { transform: translate(-50%, -50%) rotate(135deg) translateY(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(135deg) translateY(-42px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
