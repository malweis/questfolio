"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
                : 'text-red-400 hover:text-red-300 hover:scale-105 cursor-pointer'
            }`}
            whileHover={!isFlashing ? { scale: 1.05 } : {}}
            whileTap={!isFlashing ? { scale: 0.95 } : {}}
          >
            {isFlashing ? "Contemplando..." : "Contempla el fuego que ayudaste a crear"}
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
