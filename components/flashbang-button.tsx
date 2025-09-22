"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useSound } from "./sound-context";

interface FlashbangButtonProps {
  onFlashbangTriggered: () => void;
  onReset: () => void;
}

export default function FlashbangButton({ 
  onFlashbangTriggered, 
  onReset
}: FlashbangButtonProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    setIsMounted(true);
    
    // Show attention effect periodically to encourage clicking
    const attentionInterval = setInterval(() => {
      setShowAttention(true);
      setTimeout(() => setShowAttention(false), 2000); // Show for 2 seconds
    }, 4000); // Every 4 seconds

    return () => clearInterval(attentionInterval);
  }, []);

  const triggerFlashbang = () => {
    if (isFlashing) return;

    setIsFlashing(true);

    // Play explosion sound immediately when triggered
    playSound('/sounds/explotion.mp3');

    // Trigger the story change during the white flash (when screen is fully white)
    // This masks the content change behind the white overlay
    setTimeout(() => {
      onFlashbangTriggered();
    }, 1000); // Trigger during the white flash phase
  };

  const handleReset = () => {
    setIsFlashing(false);
    onReset();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Interactive Phrase */}
      <div className="flex flex-col items-center justify-center py-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Interactive Spanish phrase */}
          <motion.p
            onClick={isFlashing ? undefined : triggerFlashbang}
            className={`text-2xl sm:text-3xl font-bold mb-6 select-none transition-all duration-300 ${
              isFlashing 
                ? 'text-gray-500 cursor-not-allowed' 
                : showAttention
                ? 'text-white animate-pulse cursor-pointer'
                : 'hot-metal-text cursor-pointer'
            }`}
            whileHover={!isFlashing ? { scale: 1.05 } : {}}
            whileTap={!isFlashing ? { scale: 0.95 } : {}}
          >
            {isFlashing ? "..." : "Contempla el fuego que ayudaste a crear"}
          </motion.p>
          
          {/* Reset button - only show when flashing */}
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <Button
                onClick={handleReset}
                size="sm"
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2"
              >
                Reset
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Flashbang effect overlay - Full screen using portal */}
      {isFlashing && isMounted && createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="bg-white rounded-full animate-expand-circle" />
        </div>,
        document.body
      )}
    </div>
  );
}
