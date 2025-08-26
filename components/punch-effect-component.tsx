"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

// TypeScript interfaces for MDX components
interface MDXComponentProps {
  children?: ReactNode;
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  [key: string]: unknown;
}

type MDXComponent = React.ComponentType<MDXComponentProps>;

interface PunchEffectComponentProps {
  onPunchTriggered: () => void;
  onReset: () => void;
  Part1Component: MDXComponent | undefined;
  components: Record<string, React.ComponentType<MDXComponentProps>>;
}

export default function PunchEffectComponent({ 
  onPunchTriggered, 
  onReset
}: PunchEffectComponentProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerPunchEffect = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // After the punch animation completes, trigger the story change
    setTimeout(() => {
      onPunchTriggered();
    }, 8000); // Slightly before the 9s animation ends to ensure smooth transition
  };

  const handleReset = () => {
    setIsAnimating(false);
    onReset();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main content */}
      <div
        className={`flex flex-col items-center justify-center py-16 transition-transform duration-100 ${
          isAnimating ? "animate-screen-shake" : ""
        }`}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready for Impact?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Damian&apos;s story is about to take a dramatic turn. Are you ready to experience the moment that changes everything?
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              onClick={triggerPunchEffect}
              disabled={isAnimating}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnimating ? "Taking Damage..." : "Hit Me!"}
            </motion.button>
            
            {isAnimating && (
              <motion.button
                onClick={handleReset}
                className="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Punch effects overlay - Full screen */}
      {isAnimating && (
        <>
          {/* Multiple punch impacts with better fist silhouettes */}
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-1/4 left-1/3 w-32 h-32 animate-punch-1">
              <div className="w-full h-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-red-500/70">
                  <path d="M25 30 C20 25, 20 15, 30 15 C35 10, 45 10, 50 15 C55 10, 65 10, 70 15 C75 10, 85 10, 90 15 C95 20, 90 30, 85 35 L80 40 C80 50, 75 60, 65 65 L45 65 C35 60, 30 50, 30 40 L25 35 Z M30 40 L30 55 C30 60, 35 65, 40 65 L70 65 C75 65, 80 60, 80 55 L80 40" />
                  <circle cx="35" cy="25" r="3" />
                  <circle cx="50" cy="25" r="3" />
                  <circle cx="65" cy="25" r="3" />
                  <circle cx="80" cy="25" r="3" />
                </svg>
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4 w-40 h-40 animate-punch-2">
              <div className="w-full h-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-orange-500/70">
                  <path d="M20 35 C15 30, 15 20, 25 20 C30 15, 40 15, 45 20 C50 15, 60 15, 65 20 C70 15, 80 15, 85 20 C90 25, 85 35, 80 40 L75 45 C75 55, 70 65, 60 70 L40 70 C30 65, 25 55, 25 45 L20 40 Z M25 45 L25 60 C25 65, 30 70, 35 70 L65 70 C70 70, 75 65, 75 60 L75 45" />
                  <circle cx="30" cy="30" r="3" />
                  <circle cx="45" cy="30" r="3" />
                  <circle cx="60" cy="30" r="3" />
                  <circle cx="75" cy="30" r="3" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/4 w-36 h-36 animate-punch-3">
              <div className="w-full h-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-500/70">
                  <path d="M22 32 C17 27, 17 17, 27 17 C32 12, 42 12, 47 17 C52 12, 62 12, 67 17 C72 12, 82 12, 87 17 C92 22, 87 32, 82 37 L77 42 C77 52, 72 62, 62 67 L42 67 C32 62, 27 52, 27 42 L22 37 Z M27 42 L27 57 C27 62, 32 67, 37 67 L67 67 C72 67, 77 62, 77 57 L77 42" />
                  <circle cx="32" cy="27" r="3" />
                  <circle cx="62" cy="27" r="3" />
                  <circle cx="77" cy="27" r="3" />
                </svg>
              </div>
            </div>
            <div className="absolute top-1/3 right-1/3 w-28 h-28 animate-punch-4">
              <div className="w-full h-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-red-600/70">
                  <path d="M18 38 C13 33, 13 23, 23 23 C28 18, 38 18, 43 23 C48 18, 58 18, 63 23 C68 18, 78 18, 83 23 C88 28, 83 38, 78 43 L73 48 C73 58, 68 68, 58 73 L38 73 C28 68, 23 58, 23 48 L18 43 Z M23 48 L23 63 C23 68, 28 73, 33 73 L63 73 C68 73, 73 68, 73 63 L73 48" />
                  <circle cx="28" cy="33" r="2.5" />
                  <circle cx="43" cy="33" r="2.5" />
                  <circle cx="58" cy="33" r="2.5" />
                  <circle cx="73" cy="33" r="2.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Screen crack effects - Full screen */}
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-black/20 animate-crack-1 origin-top"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-black/20 animate-crack-2 origin-left"></div>
            <div className="absolute top-1/4 right-1/4 w-1 h-1/2 bg-black/20 animate-crack-3 origin-top rotate-45"></div>
          </div>
        </>
      )}

      {/* Eyelid closing effect - Full screen */}
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Top eyelid */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-black origin-top animate-eyelid-top-multiple"></div>
          {/* Bottom eyelid */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black origin-bottom animate-eyelid-bottom-multiple"></div>
        </div>
      )}

      {/* Full screen flash effect */}
      {isAnimating && <div className="fixed inset-0 bg-red-500/10 animate-screen-flash pointer-events-none z-50"></div>}
    </div>
  );
}
