"use client";

import { motion } from "framer-motion";

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
              <p className="text-sm">Upload your character's main image</p>
            </div>
          </div>
          <p className="text-white/70 text-center text-sm">Main Portrait</p>
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
    </motion.section>
  );
}

