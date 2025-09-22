"use client"

import { createContext, useContext, useState, ReactNode, useRef } from "react"

interface SoundContextType {
  hasSoundConsent: boolean
  setSoundConsent: (consent: boolean) => void
  playSound: (soundPath: string) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [hasSoundConsent, setHasSoundConsent] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const setSoundConsent = (consent: boolean) => {
    setHasSoundConsent(consent)
  }

  const playSound = (soundPath: string) => {
    if (!hasSoundConsent) return

    // Stop any currently playing sound
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Create and play new sound
    const audio = new Audio(soundPath)
    audio.volume = 0.7 // Set volume to 70%
    audio.play().catch(error => {
      console.warn('Could not play sound:', error)
    })
    
    audioRef.current = audio
  }

  return (
    <SoundContext.Provider value={{ hasSoundConsent, setSoundConsent, playSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
