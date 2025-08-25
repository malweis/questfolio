"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useSound } from "./sound-context"

interface ScrollImageProps {
  src: string
  alt: string
  soundSrc?: string
  className?: string
  width?: number
  height?: number
  caption?: string
  delay?: number
  duration?: number
}

export default function ScrollImage({
  src,
  alt,
  soundSrc,
  className = "",
  width,
  height,
  caption,
  delay = 0,
  duration = 0.8
}: ScrollImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  })
  const [hasPlayed, setHasPlayed] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const { hasSoundConsent } = useSound()
  
  // Preload audio element when component mounts
  useEffect(() => {
    if (soundSrc && hasSoundConsent) {
      const audio = new Audio(soundSrc)
      audio.volume = 0.5
      audio.preload = "auto"
      // Try to load the audio context early
      audio.load()
      setAudioElement(audio)
    }
  }, [soundSrc, hasSoundConsent])

  // Play sound when image comes into view (only once)
  useEffect(() => {
    if (isInView && audioElement && !hasPlayed && hasSoundConsent) {
      // Try to play the sound
      audioElement.play().then(() => {
        setHasPlayed(true)
      }).catch((error) => {
        // If autoplay fails, just mark as played to avoid retries
        console.log("Sound autoplay blocked, continuing silently:", error)
        setHasPlayed(true)
      })
    }
  }, [isInView, audioElement, hasPlayed, hasSoundConsent])

  return (
    <motion.div
      ref={ref}
      className={`my-8 ${className}`}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
      }}
    >
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm">
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        />
        
        {/* Optional caption overlay */}
        {caption && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: duration * 0.8,
              delay: delay + 0.2,
              ease: "easeOut"
            }}
          >
            <p className="text-sm leading-relaxed">{caption}</p>
          </motion.div>
        )}
        
        {/* Subtle glow effect when in view */}
        {isInView && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              boxShadow: "0 0 20px rgba(147, 197, 253, 0.2)",
              background: "linear-gradient(45deg, transparent 30%, rgba(147, 197, 253, 0.05) 50%, transparent 70%)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: delay + 0.5 }}
          />
        )}
      </div>
    </motion.div>
  )
}
