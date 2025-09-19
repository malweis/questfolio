"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

export function GlitchText({ children, className }: GlitchTextProps) {
  // Convert children to string for data-text attribute
  const textContent = typeof children === 'string' ? children : 
    React.Children.toArray(children).join('')

  return (
    <span 
      className={cn("glitch-text", className)} 
      data-text={textContent}
    >
      {children}
    </span>
  )
}
