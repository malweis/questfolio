"use client";

import { motion } from "framer-motion";

export default function CharacterTraitsSection() {
  return (
    <motion.section 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
        Personality & Goals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Personality Traits</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Brave</h4>
              <p className="text-white/70 text-xs">Faces challenges head-on</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Loyal</h4>
              <p className="text-white/70 text-xs">Devoted to friends and causes</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Curious</h4>
              <p className="text-white/70 text-xs">Always seeking knowledge</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Goals & Aspirations</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Master the Warrior Arts</h4>
              <p className="text-white/70 text-xs">Become the ultimate protector</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Explore Ancient Ruins</h4>
              <p className="text-white/70 text-xs">Uncover lost knowledge</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-medium text-white text-sm">Build a Strong Community</h4>
              <p className="text-white/70 text-xs">Help others grow stronger</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

