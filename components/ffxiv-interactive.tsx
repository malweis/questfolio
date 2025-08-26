"use client";

import { useState } from "react";
import { SwordCutEffect } from "./sword-cut-effect";

export default function FFXIVInteractive() {
  const [manualTrigger, setManualTrigger] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleStartAnimation = () => {
    if (!hasTriggered) {
      setManualTrigger(true);
      setResetTrigger(false);
    }
  };

  const handleResetAnimation = () => {
    setHasTriggered(false);
    setManualTrigger(false);
    setResetTrigger(true);
    // Reset the resetTrigger after a brief moment
    setTimeout(() => setResetTrigger(false), 100);
  };

  const handleTriggerComplete = () => {
    setHasTriggered(true);
    setManualTrigger(false);
  };

  return (
    <div className="my-12">
      <SwordCutEffect
        manualTrigger={manualTrigger}
        resetTrigger={resetTrigger}
        onTriggerComplete={handleTriggerComplete}
      >
        <div className="bg-gradient-to-r from-red-500/20 to-purple-600/20 p-6 rounded-lg border border-white/20">
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
      </SwordCutEffect>
    </div>
  );
}
