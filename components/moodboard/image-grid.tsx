"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const moodboardImages = [
  { src: "/assets/moodboard/shadow-walker.jpg", alt: "Shadow Walker", caption: "The darkness moves" },
  { src: "/assets/moodboard/crimson-storm.jpg", alt: "Crimson Storm", caption: "Power unleashed" },
  { src: "/assets/moodboard/mystical-forest.jpg", alt: "Mystical Forest", caption: "Ancient secrets" },
  { src: "/assets/moodboard/silver-moon.jpg", alt: "Silver Moon", caption: "Cold determination" },
  { src: "/assets/moodboard/amber-light.jpg", alt: "Amber Light", caption: "Hidden warmth" },
  { src: "/assets/moodboard/forest-path.jpg", alt: "Forest Path", caption: "Nature's balance" },
  { src: "/assets/moodboard/dark-castle.jpg", alt: "Dark Castle", caption: "Fortress of shadows" },
  { src: "/assets/moodboard/blood-moon.jpg", alt: "Blood Moon", caption: "Celestial alignment" }
];

export default function ImageGrid() {
  return (
    <motion.section 
      className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        Visual Inspiration
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {moodboardImages.map((image, index) => (
          <motion.div
            key={image.alt}
            className="group relative overflow-hidden rounded-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="aspect-square relative bg-gray-800">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div class="text-center text-white/60">
                          <div class="text-4xl mb-2">🖼️</div>
                          <div class="text-sm">${image.alt}</div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium">{image.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
