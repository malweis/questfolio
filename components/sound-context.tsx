"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SoundContextType {
  hasSoundConsent: boolean
  setSoundConsent: (consent: boolean) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [hasSoundConsent, setHasSoundConsent] = useState(false)

  const setSoundConsent = (consent: boolean) => {
    setHasSoundConsent(consent)
  }

  return (
    <SoundContext.Provider value={{ hasSoundConsent, setSoundConsent }}>
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
