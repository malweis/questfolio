"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CharacterImagesSection() {
  return (
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
              <p className="text-sm">Upload your character&apos;s main image</p>
            </div>
          </div>
          <p className="text-lg text-white/80 text-center max-w-2xl mx-auto">
            Every scar tells a story, every mark a memory. These aren&apos;t just images - they&apos;re windows into moments that shaped who this character has become.
          </p>
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
      
      {/* Moodboard Button */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Link
          href="/damian/moodboard"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <span>🎨</span>
          View Character Moodboard
          <span>→</span>
        </Link>
        <p className="text-white/60 text-sm mt-2">
          Explore Damian&apos;s visual inspiration and themes
        </p>
      </motion.div>
    </motion.section>
  );
}

