"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, lazy, Suspense, ReactNode } from "react";
import FFXIVBackgroundWrapper from "../../components/ffxiv-background-wrapper";
import FullStorySection from "../../components/full-story-section";
import { AnimatePresence } from "framer-motion";
import { SoundProvider, useSound } from "../../components/sound-context";
import SoundConsentOverlay from "../../components/sound-consent-overlay";
import FloatingSoundToggle from "../../components/floating-sound-toggle";
import PunchEffectComponent from "../../components/punch-effect-component";

// Lazy load heavy sections for better performance
const LazyCharacterImages = lazy(() => import('../../components/character-images-section'));
const LazyCharacterDetails = lazy(() => import('../../components/character-details-section'));
const LazyCharacterTraits = lazy(() => import('../../components/character-traits-section'));
const LazyCharacterRelationships = lazy(() => import('../../components/character-relationships-section'));

// TypeScript interfaces for MDX components
interface MDXComponentProps {
  children?: ReactNode;
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  [key: string]: unknown;
}

type MDXComponent = React.ComponentType<MDXComponentProps>;

// Custom components that can be used in MDX
const components = {
  h1: (props: MDXComponentProps) => (
    <h1 className="text-4xl font-bold text-white mb-6 border-b border-purple-400/30 pb-4" {...props} />
  ),
  h2: (props: MDXComponentProps) => (
    <h2 className="text-3xl font-semibold text-white mt-12 mb-6 text-purple-300" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="text-2xl font-semibold text-white mt-8 mb-4 text-purple-200" {...props} />
  ),
  p: (props: MDXComponentProps) => (
    <p className="text-lg text-white/90 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: MDXComponentProps) => (
    <ul className="list-disc list-inside text-lg text-white/90 leading-relaxed mb-4 space-y-2" {...props} />
  ),
  ol: (props: MDXComponentProps) => (
    <ol className="list-decimal list-inside text-lg text-white/90 leading-relaxed mb-4 space-y-2" {...props} />
  ),
  li: (props: MDXComponentProps) => (
    <li className="text-lg text-white/90 leading-relaxed" {...props} />
  ),
  blockquote: (props: MDXComponentProps) => (
    <blockquote className="border-l-4 border-purple-400 pl-6 py-4 my-6 bg-purple-900/20 rounded-r-lg italic text-white/80" {...props} />
  ),
  strong: (props: MDXComponentProps) => (
    <strong className="text-purple-300 font-semibold" {...props} />
  ),
  em: (props: MDXComponentProps) => (
    <em className="text-purple-200 italic" {...props} />
  ),
  hr: (props: MDXComponentProps) => (
    <hr className="border-purple-400/30 my-8" {...props} />
  ),
};

function DamianPageContent() {
  const [Part1Component, setPart1Component] = useState<MDXComponent | undefined>(undefined);
  const [Part2Component, setPart2Component] = useState<MDXComponent | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [manualTrigger, setManualTrigger] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [punchTriggered, setPunchTriggered] = useState(false);
  const { setSoundConsent } = useSound();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Show consent overlay when the page loads
    setShowConsent(true);
  }, []);

  useEffect(() => {
    async function loadMDXContent() {
      try {
        // Use Promise.all for parallel loading - basic optimization
        const [part1Module, part2Module] = await Promise.all([
          import('../../content/damian-lore-part1.mdx'),
          import('../../content/damian-lore-part2.mdx')
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

  const handlePunchTriggered = () => {
    setPunchTriggered(true);
    // Scroll to top when punch is triggered to show the beginning of the new component
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePunchReset = () => {
    setPunchTriggered(false);
    setHasTriggered(false);
    setManualTrigger(false);
    setResetTrigger(false);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const handleConsent = () => {
    setSoundConsent(true);
    setShowConsent(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading character story...</div>
      </div>
    );
  }

  return (
    <>
      <FFXIVBackgroundWrapper stormTriggered={punchTriggered}>
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
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Damian</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">Shadow Walker • Blood Moon Born</p>
            
            {/* Sound Toggle Button */}
            <motion.button
              onClick={toggleSound}
              className="mt-4 px-4 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
            </motion.button>
          </motion.div>

          {/* Main Lore Section - Punch Effect Flow */}
          <motion.section 
            className="max-w-6xl mx-auto mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {!punchTriggered ? (
                <div className="max-w-4xl mx-auto">
                  {/* First Part Content */}
                  <motion.section 
                    className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="prose prose-invert max-w-none">
                      {Part1Component && <Part1Component components={components} />}
                    </div>
                  </motion.section>
                  
                  {/* Punch Effect Component */}
                  <PunchEffectComponent
                    onPunchTriggered={handlePunchTriggered}
                    onReset={handlePunchReset}
                    Part1Component={Part1Component}
                    components={components}
                  />
                </div>
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

      {/* Sound Consent Overlay - Only show when needed */}
      {showConsent && <SoundConsentOverlay onConsent={handleConsent} />}
      
      {/* Floating Sound Toggle - Always visible on Damian page */}
      <FloatingSoundToggle />
    </>
  );
}

export default function DamianPage() {
  return (
    <SoundProvider>
      <DamianPageContent />
    </SoundProvider>
  );
}
