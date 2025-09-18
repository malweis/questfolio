"use client";

import { motion } from "framer-motion";

const colorPalette = [
  { name: "Shadow Black", hex: "#1a1a1a", description: "The darkness within" },
  { name: "Crimson Red", hex: "#8B0000", description: "Blood and passion" },
  { name: "Deep Purple", hex: "#4B0082", description: "Mystical energy" },
  { name: "Silver Gray", hex: "#C0C0C0", description: "Cold determination" },
  { name: "Amber Gold", hex: "#FFBF00", description: "Hidden warmth" },
  { name: "Forest Green", hex: "#228B22", description: "Nature's balance" }
];

export default function ColorPalette() {
  return (
    <motion.section 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Color Palette
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {colorPalette.map((color, index) => (
          <motion.div
            key={color.name}
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-3 rounded-lg border-2 border-white/20 shadow-lg"
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <h3 className="text-white font-semibold text-sm mb-1">{color.name}</h3>
            <p className="text-white/60 text-xs mb-2">{color.hex}</p>
            <p className="text-white/80 text-xs italic">{color.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
