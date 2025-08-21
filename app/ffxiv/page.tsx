"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, createContext, useContext } from "react";
import FFXIVInteractive from "../../components/ffxiv-interactive";
import FFXIVBackgroundWrapper from "../../components/ffxiv-background-wrapper";
import { SwordCutEffect } from "../../components/sword-cut-effect";
import LightningAnimation from "../../components/lightning-animation";
import StormTrigger from "../../components/storm-trigger";
import FullStorySection from "../../components/full-story-section";
import { AnimatePresence } from "framer-motion";

// Sound Context for global sound control
const SoundContext = createContext({
  soundEnabled: true,
  toggleSound: () => {},
});

export const useSoundContext = () => useContext(SoundContext);

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
  const [stormTriggered, setStormTriggered] = useState(false);

  useEffect(() => {
    async function loadMDXContent() {
      try {
        // Dynamic imports to load MDX content
        const part1Module = await import('../../content/ffxiv-lore-part1.mdx');
        const part2Module = await import('../../content/ffxiv-lore-part2.mdx');
        
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

  const handleStormTriggered = () => {
    setStormTriggered(true);
  };

  const handleStormReset = () => {
    setStormTriggered(false);
    setHasTriggered(false);
    setManualTrigger(false);
    setResetTrigger(false);
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

          {/* Main Lore Section - Storm Trigger Flow */}
          <motion.section 
            className="max-w-6xl mx-auto mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {!stormTriggered ? (
                <StormTrigger
                  key="storm-trigger"
                  onStormTriggered={handleStormTriggered}
                  onReset={handleStormReset}
                  Part1Component={Part1Component}
                  components={components}
                />
              ) : (
                <FullStorySection
                  key="full-story"
                  Part1Component={Part1Component}
                  Part2Component={Part2Component}
                  components={components}
                  manualTrigger={manualTrigger}
                  resetTrigger={resetTrigger}
                  hasTriggered={hasTriggered}
                  onStartAnimation={handleStartAnimation}
                  onResetAnimation={handleResetAnimation}
                />
              )}
            </AnimatePresence>
          </motion.section>

          {/* Secondary Sections - Grid Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Character Images Section */}
            <motion.section 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
                Character Images
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-gray-800 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                    <div className="text-center text-white/50">
                      <div className="text-4xl mb-2">📸</div>
                      <p>Main Portrait</p>
                      <p className="text-sm">Upload your character's main image</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-center text-sm">Main Portrait</p>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-gray-800 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                    <div className="text-center text-white/50">
                      <div className="text-4xl mb-2">🎭</div>
                      <p>Action Shot</p>
                      <p className="text-sm">In combat or adventure</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-center text-sm">Action Shot</p>
                </div>
              </div>
            </motion.section>

            {/* Character Details Section */}
            <motion.section 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
                Character Details
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Race:</span>
                  <span className="text-white">Hyur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Class:</span>
                  <span className="text-white">Warrior</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Level:</span>
                  <span className="text-white">90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Server:</span>
                  <span className="text-white">Crystal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Free Company:</span>
                  <span className="text-white">Company Name</span>
                </div>
              </div>
            </motion.section>

            {/* Character Relationships */}
            <motion.section 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
                Relationships & Connections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Allies & Friends</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Alphinaud Leveilleur</h4>
                      <p className="text-white/70 text-sm">Mentor figure and trusted ally</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Y'shtola Rhul</h4>
                      <p className="text-white/70 text-sm">Mysterious ally with arcane knowledge</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Rivals & Enemies</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Ascian Emissary</h4>
                      <p className="text-white/70 text-sm">Shadowy figure representing ancient forces</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Additional Sections - Single Column */}
          <div className="max-w-4xl mx-auto mt-8">
            
            {/* Character Traits & Goals */}
            <motion.section 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
                Personality & Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Personality Traits</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Brave</h4>
                      <p className="text-white/70 text-xs">Faces challenges head-on</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Loyal</h4>
                      <p className="text-white/70 text-xs">Devoted to friends and causes</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Curious</h4>
                      <p className="text-white/70 text-xs">Always seeking knowledge</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Goals & Aspirations</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Master the Warrior Arts</h4>
                      <p className="text-white/70 text-xs">Become the ultimate protector</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Explore Ancient Ruins</h4>
                      <p className="text-white/70 text-xs">Uncover lost knowledge</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="font-medium text-white text-sm">Build a Strong Community</h4>
                      <p className="text-white/70 text-xs">Help others grow stronger</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Character Relationships */}
            <motion.section 
              className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
                Relationships & Connections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Allies & Friends</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Alphinaud Leveilleur</h4>
                      <p className="text-white/70 text-sm">Mentor figure and trusted ally</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Y'shtola Rhul</h4>
                      <p className="text-white/70 text-sm">Mysterious ally with arcane knowledge</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Rivals & Enemies</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-medium text-white">Ascian Emissary</h4>
                      <p className="text-white/70 text-sm">Shadowy figure representing ancient forces</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
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
