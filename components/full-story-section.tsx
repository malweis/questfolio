"use client"

import { SwordCutEffect } from "./sword-cut-effect"
import { ReactNode } from "react"

// TypeScript interfaces for MDX components
interface MDXComponentProps {
  children?: ReactNode;
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  [key: string]: unknown;
}

type MDXComponent = React.ComponentType<MDXComponentProps>;

interface FullStorySectionProps {
  Part1Component?: MDXComponent;
  Part2Component?: MDXComponent;
  components?: Record<string, React.ComponentType<MDXComponentProps>>;
  manualTrigger?: boolean;
  resetTrigger?: boolean;
  hasTriggered?: boolean;
  onStartAnimation?: () => void;
  onResetAnimation?: () => void;
}

export default function FullStorySection({
  Part1Component,
  Part2Component,
  components,
  manualTrigger,
  resetTrigger,
  hasTriggered,
  onStartAnimation,
  onResetAnimation
}: FullStorySectionProps) {
  return (
    <div className="relative">
      {/* SwordCutEffect wraps the entire visual container to cut everything */}
      <SwordCutEffect 
        manualTrigger={manualTrigger}
        resetTrigger={resetTrigger}
        className="w-full"
      >
        <div
          className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10 relative"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
            The Full Story Unfolds
          </h2>
          
          {/* Test Button for Sword Cut Effect */}
          <div className="mb-6 text-center">
            <button
              onClick={onStartAnimation}
              disabled={hasTriggered}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors duration-200"
            >
              🗡️ Test Sword Cut Effect
            </button>
            {hasTriggered && (
              <button
                onClick={onResetAnimation}
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
                  onClick={onStartAnimation}
                  disabled={hasTriggered}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                >
                  🗡️ Cut Through the Challenge
                </button>
                <button
                  onClick={onResetAnimation}
                  disabled={!hasTriggered}
                  className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
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
    </div>
  )
}
