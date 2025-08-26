"use client";

import { motion } from "framer-motion";

export default function CharacterRelationshipsSection() {
  return (
    <motion.section 
      className="md:bg-black/30 md:backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
        Relationships & Connections
      </h2>
      <p className="text-lg text-white/80 text-center max-w-2xl mx-auto">
        No one walks this path alone. Every relationship, whether forged in friendship or tempered in conflict, shapes the journey. Here&apos;s who matters most.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Allies & Friends</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white">Alphinaud Leveilleur</h4>
              <p className="text-white/70 text-sm">Mentor figure and trusted ally</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white">Y&apos;shtola Rhul</h4>
              <p className="text-white/70 text-sm">Mysterious ally with arcane knowledge</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Rivals & Enemies</h3>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-medium text-white">Ascian Emissary</h4>
              <p className="text-white/70 text-sm">Shadowy figure representing ancient forces</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

