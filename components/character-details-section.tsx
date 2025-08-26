"use client";

import { motion } from "framer-motion";

export default function CharacterDetailsSection() {
  return (
    <motion.section 
      className="md:bg-black/30 md:backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
        Character Details
      </h2>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-white/70">Race:</span>
          <span className="text-white">Hyur</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Class:</span>
          <span className="text-white">Warrior</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Level:</span>
          <span className="text-white">90</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Server:</span>
          <span className="text-white">Crystal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/70">Free Company:</span>
          <span className="text-white">Company Name</span>
        </div>
      </div>
    </motion.section>
  );
}

