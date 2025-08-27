"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden" style={{
      backgroundImage: 'url(/assets/wall.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px'
    }}>
      {/* Top black bar */}
      <motion.div 
        className="hidden md:block h-16 bg-black"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Main content area */}
      <motion.div 
        className="min-h-[calc(100vh-8rem)] p-8 pb-20 gap-8 sm:p-20 transition-all duration-1000 ease-in-out"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Credits & Attributions</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Acknowledging the creators and contributors whose work makes this project possible
          </p>
        </motion.div>

        {/* Credits Content */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Creative Commons Section */}
          <motion.section 
            className="mb-12 p-8 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #2C2C2C, #404040, #2C2C2C)',
              border: '4px solid',
              borderImage: 'linear-gradient(45deg, #8B7355, #D2B48C, #8B7355) 1',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">🎨 Creative Commons Assets</h2>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Animated Torch</h3>
                <p className="text-white/80 mb-2">Animated torch with flame effects</p>
                <p className="text-white/60 text-sm">Author: William.Thompsonj, HughSpectrum, Sharm</p>
                <p className="text-white/60 text-sm">License: CC-BY 4.0, CC-BY 3.0, GPL 3.0, GPL 2.0, OGA-BY 3.0</p>
                <a href="https://opengameart.org/content/lpc-animated-torch" className="text-amber-400 hover:text-amber-300 text-sm">https://opengameart.org/content/lpc-animated-torch</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Button Assets</h3>
                <p className="text-white/80 mb-2">Various button textures and UI elements</p>
                <p className="text-white/60 text-sm">Author: StumpyStrust</p>
                <p className="text-white/60 text-sm">License: CC0 (Public Domain)</p>
                <a href="https://opengameart.org/content/ui-button" className="text-amber-400 hover:text-amber-300 text-sm">https://opengameart.org/content/ui-button</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Additional Button Assets</h3>
                <p className="text-white/80 mb-2">Dark fantasy and RPG style buttons</p>
                <p className="text-white/60 text-sm">Author: StumpyStrust</p>
                <p className="text-white/60 text-sm">License: CC-BY 3.0</p>
                <a href="https://opengameart.org/content/ui-button-and-extra" className="text-amber-400 hover:text-amber-300 text-sm">https://opengameart.org/content/ui-button-and-extra</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Button Click Sounds</h3>
                <p className="text-white/80 mb-2">16 button click sound effects</p>
                <p className="text-white/60 text-sm">Author: Independent.nu (Submitted by qubodup)</p>
                <p className="text-white/60 text-sm">License: CC0 (Public Domain)</p>
                <a href="https://opengameart.org/content/16-button-clicks" className="text-amber-400 hover:text-amber-300 text-sm">https://opengameart.org/content/16-button-clicks</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Game Assets Collection</h3>
                <p className="text-white/80 mb-2">Various game assets and textures</p>
                <p className="text-white/60 text-sm">Author: Kenney</p>
                <p className="text-white/60 text-sm">License: CC0 (Public Domain)</p>
                <a href="https://kenney.nl/assets" className="text-amber-400 hover:text-amber-300 text-sm">https://kenney.nl/assets</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Sound Effect</h3>
                <p className="text-white/80 mb-2">Lightning and thunder audio</p>
                <p className="text-white/60 text-sm">Author: JanuHesselink</p>
                <p className="text-white/60 text-sm">License: Attribution NonCommercial 4.0</p>
                <a href="https://freesound.org/s/796588/" className="text-amber-400 hover:text-amber-300 text-sm">https://freesound.org/s/796588/</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Sword Slice Sound Effect</h3>
                <p className="text-white/80 mb-2">Sword cutting and slicing audio</p>
                <p className="text-white/60 text-sm">Author: Black Snow</p>
                <p className="text-white/60 text-sm">License: Attribution 4.0</p>
                <a href="https://freesound.org/s/109410/" className="text-amber-400 hover:text-amber-300 text-sm">https://freesound.org/s/109410/</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Wall Textures</h3>
                <p className="text-white/80 mb-2">Seamless handpainted wall texture with stone blocks and bricks</p>
                <p className="text-white/60 text-sm">Author: Kutejnikov</p>
                <p className="text-white/60 text-sm">License: CC0 (Public Domain)</p>
                <a href="https://opengameart.org/content/wall-texture-1" className="text-amber-400 hover:text-amber-300 text-sm">https://opengameart.org/content/wall-texture-1</a>
              </div>
            </div>
          </motion.section>

          {/* Open Source Libraries Section */}
          <motion.section 
            className="mb-12 p-8 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #2C2C2C, #404040, #2C2C2C)',
              border: '4px solid',
              borderImage: 'linear-gradient(45deg, #8B7355, #D2B48C, #8B7355) 1',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">📚 Open Source Libraries</h2>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Next.js</h3>
                <p className="text-white/80 mb-2">React framework for production</p>
                <p className="text-white/60 text-sm">License: MIT</p>
                <a href="https://nextjs.org" className="text-amber-400 hover:text-amber-300 text-sm">https://nextjs.org</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Framer Motion</h3>
                <p className="text-white/80 mb-2">Animation library for React</p>
                <p className="text-white/60 text-sm">License: MIT</p>
                <a href="https://framer.com/motion" className="text-amber-400 hover:text-amber-300 text-sm">https://framer.com/motion</a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">Tailwind CSS</h3>
                <p className="text-white/80 mb-2">Utility-first CSS framework</p>
                <p className="text-white/60 text-sm">License: MIT</p>
                <a href="https://tailwindcss.com" className="text-amber-400 hover:text-amber-300 text-sm">https://tailwindcss.com</a>
              </div>
            </div>
          </motion.section>

          {/* Special Thanks Section */}
          <motion.section 
            className="p-8 rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #2C2C2C, #404040, #2C2C2C)',
              border: '4px solid',
              borderImage: 'linear-gradient(45deg, #8B7355, #D2B48C, #8B7355) 1',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">🙏 Special Thanks</h2>
            <div className="text-center">
              <p className="text-white/80 text-lg mb-4">
                To all the creators, developers, and contributors who make open source and Creative Commons possible.
              </p>
              <p className="text-white/60">
                This project wouldn&apos;t exist without your generosity and commitment to sharing knowledge and resources.
              </p>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
      
      {/* Bottom black bar */}
      <motion.div 
        className="hidden md:block h-16 bg-black"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
