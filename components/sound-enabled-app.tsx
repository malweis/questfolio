"use client"

import { useState, useEffect } from "react"
import { SoundProvider, useSound } from "./sound-context"
import SoundConsentOverlay from "./sound-consent-overlay"
import FloatingSoundToggle from "./floating-sound-toggle"

interface SoundEnabledAppProps {
  children: React.ReactNode
}

function SoundEnabledAppContent({ children }: SoundEnabledAppProps) {
  const { hasSoundConsent, setSoundConsent } = useSound()
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Always show consent overlay on page load
    setShowConsent(true)
  }, [])

  const handleConsent = () => {
    setSoundConsent(true)
    setShowConsent(false)
  }

  return (
    <>
      {children}
      {showConsent && <SoundConsentOverlay onConsent={handleConsent} />}
      <FloatingSoundToggle />
    </>
  )
}

export default function SoundEnabledApp({ children }: SoundEnabledAppProps) {
  return (
    <SoundProvider>
      <SoundEnabledAppContent>
        {children}
      </SoundEnabledAppContent>
    </SoundProvider>
  )
}
