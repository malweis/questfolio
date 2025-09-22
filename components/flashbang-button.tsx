"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FlashbangButtonProps {
  onFlashbangTriggered: () => void;
  onReset: () => void;
}

export default function FlashbangButton({ 
  onFlashbangTriggered, 
  onReset
}: FlashbangButtonProps) {
  const [isFlashing, setIsFlashing] = useState(false);

  const triggerFlashbang = () => {
    if (isFlashing) return;

    setIsFlashing(true);

    // After the flashbang animation completes, trigger the story change
    setTimeout(() => {
      onFlashbangTriggered();
    }, 3500); // Slightly before the 4s animation ends to ensure smooth transition
  };

  const handleReset = () => {
    setIsFlashing(false);
    onReset();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Flashbang Button */}
      <div className="flex flex-col items-center justify-center py-16">
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
            <Button
              onClick={triggerFlashbang}
              disabled={isFlashing}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg disabled:bg-gray-600"
            >
              {isFlashing ? "FLASHING..." : "💥 FLASHBANG"}
            </Button>
            
            {isFlashing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  onClick={handleReset}
                  size="lg"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-4"
                >
                  Reset
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Flashbang effect overlay - Full screen */}
      {isFlashing && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-full animate-expand-circle" />
        </div>
      )}
    </div>
  );
}
