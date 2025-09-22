"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Feather {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  duration: number
  delay: number
}

interface FeatherTextProps {
  children: React.ReactNode
  className?: string
}

export function FeatherText({ children, className }: FeatherTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [feathers, setFeathers] = useState<Feather[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [children])

  useEffect(() => {
    if (dimensions.width === 0) return // Don't start animation until dimensions are set

    const createFeather = () => {
      const newFeather: Feather = {
        id: Date.now() + Math.random(),
        x: Math.random() * dimensions.width,
        y: -20,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        duration: 4 + Math.random() * 3, // Shorter duration for better container bounds
        delay: 0,
      }

      setFeathers((prev) => [...prev, newFeather])

      // Remove feather after animation completes
      setTimeout(
        () => {
          setFeathers((prev) => prev.filter((f) => f.id !== newFeather.id))
        },
        newFeather.duration * 1000 + 1000,
      )
    }

    // Create first feather immediately for testing
    createFeather() // Create immediate feather for testing

    // Create feathers periodically
    const interval = setInterval(
      () => {
        if (Math.random() < 0.8) {
          // Increased chance to 80%
          createFeather()
        }
      },
      1500 + Math.random() * 2000, // Slightly longer intervals
    )

    return () => clearInterval(interval)
  }, [dimensions])

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 mx-auto max-w-4xl",
        "bg-gradient-to-br from-slate-700/95 via-slate-600/90 to-slate-500/85",
        "backdrop-blur-sm border border-white/20 shadow-2xl",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
        className
      )} 
      style={{ minHeight: "1.2em" }}
    >
 
      
      <div className="relative z-10 text-balance text-white/95 leading-relaxed">
        {children}
      </div>

     
      <div className="absolute inset-0 pointer-events-none">
        {feathers.map((feather) => (
          <div
            key={feather.id}
            className="absolute feather-element" // Simplified class name
            style={
              {
                left: `${feather.x}px`,
                top: `${feather.y}px`,
                transform: `rotate(${feather.rotation}deg) scale(${feather.scale})`,
                animation: `feather-fall ${feather.duration}s linear forwards`, // Direct animation property
                "--scale": feather.scale.toString(), // CSS custom property for scale
              } as React.CSSProperties
            }
          >
            <FeatherSVG />
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatherSVG() {
  return (
    <svg
      width="32"
      height="40"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black opacity-90 drop-shadow-lg"
    >
      {/* Main feather shape - crow feather */}
      <path
        d="M10 1C10 1 15 3 15 8C15 13 12 16 10 23C8 16 5 13 5 8C5 3 10 1 10 1Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      {/* Inner feather detail */}
      <path
        d="M10 1C10 1 13 2 14 5C15 8 13 11 10 15C7 11 5 8 6 5C7 2 10 1 10 1Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      {/* Central shaft */}
      <path d="M10 1L10 23" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.7" />
      {/* Left side barbs */}
      <path
        d="M10 3L8 4M10 5L7 6M10 7L6 8M10 9L7 10M10 11L8 12M10 13L7 14M10 15L6 16M10 17L7 18M10 19L8 20"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeOpacity="0.5"
      />
      {/* Right side barbs */}
      <path
        d="M10 3L12 4M10 5L13 6M10 7L14 8M10 9L13 10M10 11L12 12M10 13L13 14M10 15L14 16M10 17L13 18M10 19L12 20"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeOpacity="0.5"
      />
      {/* Additional crow feather details */}
      <path
        d="M9 2L11 2M8.5 4L11.5 4M8 6L12 6M7.5 8L12.5 8"
        stroke="currentColor"
        strokeWidth="0.2"
        strokeOpacity="0.3"
      />
    </svg>
  )
}
