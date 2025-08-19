"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, createContext, useContext, lazy, Suspense } from "react";
import FFXIVInteractive from "../../components/ffxiv-interactive";
import FFXIVBackgroundWrapper from "../../components/ffxiv-background-wrapper";
import { SwordCutEffect } from "../../components/sword-cut-effect";

// Sound Context for global sound control
const SoundContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
});

export const useSoundContext = () => useContext(SoundContext);

// Lazy load heavy sections for better performance
const LazyCharacterImages = lazy(() => import('../../components/character-images-section'));
const LazyCharacterDetails = lazy(() => import('../../components/character-details-section'));
const LazyCharacterTraits = lazy(() => import('../../components/character-traits-section'));
const LazyCharacterRelationships = lazy(() => import('../../components/character-relationships-section'));

// Custom components that can be used in MDX
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-white mb-6 border-b border-purple-400/30 pb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold text-white mt-12 mb-6 text-purple-300" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-white mt-8 mb-4 text-purple-200" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg text-white/90 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside text-lg text-white/90 leading-relaxed mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside text-lg text-white/90 leading-relaxed mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg text-white/90 leading-relaxed" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-purple-400 pl-6 py-4 my-6 bg-purple-900/20 rounded-r-lg italic text-white/80" {...props} />
  ),
  strong: (props: any) => (
    <strong className="text-purple-300 font-semibold" {...props} />
  ),
  em: (props: any) => (
    <em className="text-purple-200 italic" {...props} />
  ),
  hr: (props: any) => (
    <hr className="border-purple-400/30 my-8" {...props} />
  ),
};

export default function FFXIVPage() {
  const [Part1Component, setPart1Component] = useState<any>(null);
  const [Part2Component, setPart2Component] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [manualTrigger, setManualTrigger] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    async function loadMDXContent() {
      try {
        // Use Promise.all for parallel loading - basic optimization
        const [part1Module, part2Module] = await Promise.all([
          import('../../content/ffxiv-lore-part1.mdx'),
          import('../../content/ffxiv-lore-part2.mdx')
        ]);
        
        // Extract the default export content
        setPart1Component(() => part1Module.default);
        setPart2Component(() => part2Module.default);
        setLoading(false);
      } catch (error) {
        console.error('Error loading MDX content:', error);
        setLoading(false);
      }
    }

    loadMDXContent();
  }, []);

  const handleStartAnimation = () => {
    setManualTrigger(true);
    setHasTriggered(true);
  };

  const handleResetAnimation = () => {
    setResetTrigger(true);
    setHasTriggered(false);
    // Reset the trigger after a short delay
    setTimeout(() => setResetTrigger(false), 100);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading character story...</div>
      </div>
    );
  }

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound }}>
      <FFXIVBackgroundWrapper>
        {/* Top black bar */}
        <motion.div 
          className="h-16 bg-black"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Main content area */}
        <motion.div 
          className="min-h-[calc(100vh-8rem)] p-8 pb-20 gap-8 sm:p-20 transition-all duration-1000 ease-in-out"
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
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Character Name</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">Race • Class • Server</p>
            
            {/* Sound Toggle Button */}
            <motion.button
              onClick={toggleSound}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
            </motion.button>
          </motion.div>

          {/* Main Lore Section - Full Width with Sword Cut Effect */}
          <motion.section 
            className="max-w-6xl mx-auto mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <SwordCutEffect 
              manualTrigger={manualTrigger}
              resetTrigger={resetTrigger}
              className="w-full"
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
                  Character Lore & Story
                </h2>
                
                {/* Test Button for Sword Cut Effect */}
                <div className="mb-6 text-center">
                  <button
                    onClick={handleStartAnimation}
                    disabled={hasTriggered}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors duration-200"
                  >
                    🗡️ Test Sword Cut Effect
                  </button>
                  {hasTriggered && (
                    <button
                      onClick={handleResetAnimation}
                      className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-200"
                    >
                      🔄 Reset
                    </button>
                  )}
                </div>
                
                {/* First Part of the Story - Before the Cut */}
                <div className="mb-8">
                  {Part1Component && <Part1Component components={components} />}
                </div>

                {/* Control Buttons */}
                <div className="bg-gradient-to-r from-red-500/20 to-purple-600/20 p-6 rounded-lg border border-white/20 my-12">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">The Great Divide</h3>
                    <p className="text-white/80 mb-6">
                      At this moment in the story, a great challenge awaits. The path forward is unclear, 
                      and only through decisive action can the tale continue...
                    </p>
                    
                    {/* Sword Cut Control Buttons */}
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleStartAnimation}
                        disabled={hasTriggered}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        🗡️ Cut Through the Challenge
                      </button>
                      <button
                        onClick={handleResetAnimation}
                        disabled={!hasTriggered}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        🔄 Restore Unity
                      </button>
                    </div>

                    {/* Immersive Description */}
                    <div className="text-center mt-4">
                      <p className="text-white/60 text-sm italic">
                        {hasTriggered 
                          ? "The story has been cut in half! The two pieces remain separated, creating a lasting visual impact." 
                          : "Click the button above to dramatically cut the story section in half with a sword effect!"
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Part of the Story - After the Cut */}
                <div className="mt-8">
                  {Part2Component && <Part2Component components={components} />}
                </div>
              </div>
            </SwordCutEffect>
          </motion.section>

          {/* Secondary Sections - Grid Layout with Lazy Loading */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Character Images Section - Lazy Loaded */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="aspect-[4/5] bg-gray-800 rounded-xl"></div>
                    <div className="aspect-[4/5] bg-gray-800 rounded-xl"></div>
                  </div>
                </div>
              </motion.section>
            }>
              <LazyCharacterImages />
            </Suspense>

            {/* Character Details Section - Lazy Loaded */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-700 rounded w-20"></div>
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            }>
              <LazyCharacterDetails />
            </Suspense>
          </div>

          {/* Additional Sections - Single Column with Lazy Loading */}
          <div className="max-w-4xl mx-auto mt-8">
            
            {/* Character Traits & Goals - Lazy Loaded */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-3 h-20"></div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-3 h-20"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            }>
              <LazyCharacterTraits />
            </Suspense>

            {/* Character Relationships - Lazy Loaded */}
            <Suspense fallback={
              <motion.section 
                className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-4 h-24"></div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {[...Array(1)].map((_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-4 h-24"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            }>
              <LazyCharacterRelationships />
            </Suspense>
          </div>
        </motion.div>
        
        {/* Bottom black bar */}
        <motion.div 
          className="h-16 bg-black"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </FFXIVBackgroundWrapper>
    </SoundContext.Provider>
  );
}
