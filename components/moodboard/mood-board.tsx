"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const moodBoardItems = [
  {
    type: "image",
    src: "/assets/moodboard/damian-concept.jpg",
    alt: "Damian Concept Art",
    title: "Character Concept",
    description: "The original vision for Damian's appearance and aura"
  },
  {
    type: "text",
    title: "Core Themes",
    description: "The fundamental elements that define Damian's character",
    content: [
      "Shadow Mastery",
      "Family Bonds",
      "Redemption Arc",
      "Hidden Power",
      "Wanderer's Spirit"
    ]
  },
  {
    type: "image",
    src: "/assets/moodboard/symbols.jpg",
    alt: "Mystical Symbols",
    title: "Symbols & Runes",
    description: "Ancient markings that appear when Damian uses his powers"
  },
  {
    type: "text",
    title: "Emotional Journey",
    description: "The emotional states Damian experiences throughout his story",
    content: [
      "Isolation → Connection",
      "Fear → Acceptance",
      "Anger → Control",
      "Loss → Hope",
      "Doubt → Purpose"
    ]
  }
];

export default function MoodBoard() {
  return (
    <motion.section 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        Character Mood Board
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {moodBoardItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg p-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(139, 0, 0, 0.3)" }}
          >
            {item.type === "image" ? (
              <div className="space-y-4">
                <div className="aspect-[4/3] relative bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                            <div class="text-center text-white/60">
                              <div class="text-6xl mb-4">🎨</div>
                              <div class="text-lg font-medium">${item.title}</div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 mb-4">{item.description}</p>
                </div>
                <div className="space-y-2">
                  {item.content?.map((contentItem, contentIndex) => (
                    <motion.div
                      key={contentIndex}
                      className="bg-purple-900/30 border border-purple-400/20 rounded-lg p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 + contentIndex * 0.05 }}
                    >
                      <span className="text-purple-200 font-medium">{contentItem}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
