"use client";

import { motion } from "framer-motion";

const characterQuotes = [
  {
    quote: "The shadows don't control me... I control them.",
    context: "During his first successful shadow walk",
    mood: "Determination"
  },
  {
    quote: "Every family has its secrets. Mine just happens to be magical.",
    context: "When asked about his abilities",
    mood: "Wry humor"
  },
  {
    quote: "I'm not running from my past anymore. I'm chasing my future.",
    context: "After deciding to search for his family",
    mood: "Hope"
  },
  {
    quote: "The darkness in me isn't evil. It's just... misunderstood.",
    context: "Reflecting on his nature",
    mood: "Self-acceptance"
  },
  {
    quote: "Blood calls to blood, even across continents.",
    context: "Sensing a family member nearby",
    mood: "Connection"
  }
];

export default function CharacterQuotes() {
  return (
    <motion.section 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        Character Voice
      </motion.h2>
      
      <div className="space-y-6">
        {characterQuotes.map((quote, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-purple-900/20 to-red-900/20 rounded-lg p-6 border border-purple-400/20"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + index * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(139, 0, 0, 0.4)" }}
          >
            <blockquote className="text-white text-lg italic mb-3 leading-relaxed">
              &ldquo;{quote.quote}&rdquo;
            </blockquote>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/70">
                <em>{quote.context}</em>
              </span>
              <span className="text-purple-300 font-medium bg-purple-900/30 px-3 py-1 rounded-full">
                {quote.mood}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
