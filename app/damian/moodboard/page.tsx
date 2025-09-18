"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, lazy, Suspense } from "react";
import { SoundProvider, useSound } from "../../../components/sound-context";
import SoundConsentOverlay from "../../../components/sound-consent-overlay";
import FloatingSoundToggle from "../../../components/floating-sound-toggle";
import CreditsLink from "../../../components/credits-link";

// Lazy load moodboard sections
const LazyImageGrid = lazy(() => import('../../../components/moodboard/image-grid'));
const LazyColorPalette = lazy(() => import('../../../components/moodboard/color-palette'));
const LazyCharacterQuotes = lazy(() => import('../../../components/moodboard/character-quotes'));
const LazyMoodBoard = lazy(() => import('../../../components/moodboard/mood-board'));

function DamianMoodboardContent() {
  const [showConsent, setShowConsent] = useState(false);
  const { setSoundConsent } = useSound();

  const handleConsent = () => {
    setSoundConsent(true);
    setShowConsent(false);
  };

  return (
    <>
      {/* Background with wall texture */}
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: 'url(/assets/wall.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      >
        {/* Main content area */}
        <motion.div 
          className="min-h-screen p-4 sm:p-8 pb-20 transition-all duration-1000 ease-in-out relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="/damian"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              ← Back to Damian
            </Link>
            
            {/* Title with Dungeon Style Frame */}
            <motion.div 
              className="flex items-center justify-center gap-4 sm:gap-6 mb-8 p-6 sm:p-12 relative w-full max-w-4xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #2C2C2C, #404040, #2C2C2C)',
                border: '6px solid',
                borderImage: 'linear-gradient(45deg, #8B7355, #D2B48C, #8B7355) 1',
                borderRadius: '8px',
                boxShadow: `
                  inset 0 0 40px rgba(0, 0, 0, 0.7),
                  inset 0 0 80px rgba(139, 115, 85, 0.1),
                  0 0 0 2px rgba(210, 180, 140, 0.3),
                  0 0 0 4px rgba(0, 0, 0, 0.9),
                  0 12px 48px rgba(0, 0, 0, 0.8),
                  0 24px 96px rgba(0, 0, 0, 0.6),
                  0 0 0 1px rgba(255, 215, 0, 0.2)
                `,
                position: 'relative',
                overflow: 'hidden',
                minHeight: '120px'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1 
                className="text-3xl sm:text-5xl font-bold text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: "'Times New Roman', serif",
                  textShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.8)",
                  letterSpacing: "0.1em"
                }}
              >
                Damian&apos;s Moodboard
              </motion.h1>
            </motion.div>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A visual collection of inspiration, colors, and themes that define Damian&apos;s character
            </p>
          </motion.div>

          {/* Moodboard Sections */}
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Color Palette Section */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="flex gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-20 h-20 bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </motion.section>
            }>
              <LazyColorPalette />
            </Suspense>

            {/* Image Grid Section */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </motion.section>
            }>
              <LazyImageGrid />
            </Suspense>

            {/* Character Quotes Section */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </motion.section>
            }>
              <LazyCharacterQuotes />
            </Suspense>

            {/* Main Mood Board Section */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-[4/3] bg-gray-700 rounded-lg"></div>
                    <div className="aspect-[4/3] bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              </motion.section>
            }>
              <LazyMoodBoard />
            </Suspense>
          </div>
        </motion.div>
        
        {/* Credits Section */}
        <CreditsLink />
      </div>

      {/* Sound Consent Overlay - Only show when needed */}
      {showConsent && <SoundConsentOverlay onConsent={handleConsent} />}
      
      {/* Floating Sound Toggle - Always visible on moodboard page */}
      <FloatingSoundToggle />
    </>
  );
}

export default function DamianMoodboardPage() {
  return (
    <SoundProvider>
      <DamianMoodboardContent />
    </SoundProvider>
  );
}
