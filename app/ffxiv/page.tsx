"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MDXContent from "../../components/mdx-content";

export default function FFXIVPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Top black bar */}
      <motion.div 
        className="h-16 bg-black"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Main content area */}
      <motion.div 
        className="min-h-[calc(100vh-8rem)] p-8 pb-20 gap-8 sm:p-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
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
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Character Name</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Race • Class • Server</p>
        </motion.div>

        {/* Main Lore Section - Full Width */}
        <motion.section 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-purple-400 rounded-full"></span>
              Character Lore & Story
            </h2>
            
            {/* MDX Content */}
            <MDXContent>
              <div className="text-lg text-white/90 leading-relaxed">
                <h1>The Tale of [Character Name]</h1>
                
                <h2>Origins</h2>
                <p>
                  Born in the bustling city of <strong>Ul'dah</strong>, [Character Name] was raised among the merchant class, 
                  learning the value of both coin and cunning from an early age. The desert winds carried whispers of ancient magic, 
                  and young [Character Name] would often sneak away from their studies to listen to the tales of traveling adventurers.
                </p>
                
                <blockquote>
                  <em>"Every coin has two sides, and every story has a beginning."</em> - Their grandfather's favorite saying
                </blockquote>
                
                <h2>The Call to Adventure</h2>
                
                <h3>The First Sign</h3>
                <p>
                  It was during the <strong>Calamity</strong> that [Character Name] first felt the pull of destiny. As the sky burned red 
                  and the earth trembled, they discovered an ancient tome hidden in their family's basement - a grimoire that would change everything.
                </p>
                
                <h3>The Journey Begins</h3>
                <p>
                  Leaving behind the safety of Ul'dah, [Character Name] set out to become a <strong>Warrior of Light</strong>, 
                  though they didn't know it at the time. Their first steps were guided by:
                </p>
                
                <ul>
                  <li><strong>Curiosity</strong> - An insatiable desire to understand the world</li>
                  <li><strong>Courage</strong> - The bravery to face the unknown</li>
                  <li><strong>Compassion</strong> - A heart that couldn't ignore suffering</li>
                </ul>
                
                <h2>Key Relationships</h2>
                
                <h3>Allies & Friends</h3>
                <p>
                  <strong>Alphinaud Leveilleur</strong> - A mentor figure who helped [Character Name] understand their role in the grand scheme of things. 
                  Their relationship is built on mutual respect and shared ideals.
                </p>
                <p>
                  <strong>Y'shtola Rhul</strong> - A mysterious ally whose knowledge of the arcane has saved [Character Name] more than once. 
                  Their bond is one of intellectual curiosity and mutual danger.
                </p>
                
                <h3>Rivals & Enemies</h3>
                <p>
                  <strong>Ascian Emissary</strong> - A shadowy figure who represents everything [Character Name] fights against. 
                  Their confrontations are always tense, filled with philosophical debates about the nature of existence.
                </p>
                
                <h2>Character Development</h2>
                
                <h3>Early Struggles</h3>
                <p>
                  In the beginning, [Character Name] was naive and idealistic. They believed that good would always triumph over evil, 
                  that justice was simple and clear-cut.
                </p>
                
                <h3>Growth Through Adversity</h3>
                <p>
                  The <strong>Crystal Tower</strong> incident taught them that reality is far more complex. Sometimes the greatest evil 
                  comes from good intentions, and sometimes the greatest good requires difficult choices.
                </p>
                
                <h3>Current State</h3>
                <p>
                  Today, [Character Name] is a seasoned adventurer who understands that the world exists in shades of gray. They've learned to:
                </p>
                
                <ul>
                  <li><strong>Question everything</strong> - Even their own motivations</li>
                  <li><strong>Seek understanding</strong> - Before passing judgment</li>
                  <li><strong>Stand firm</strong> - When the path ahead is unclear</li>
                </ul>
                
                <h2>Personal Philosophy</h2>
                <p>
                  [Character Name] believes in the power of <strong>choice</strong> and <strong>consequence</strong>. Every action ripples outward, 
                  affecting not just the individual but the world around them. This philosophy guides their decisions and shapes their relationships.
                </p>
                
                <h3>Core Beliefs</h3>
                <ol>
                  <li><strong>Knowledge is power</strong> - But wisdom is knowing how to use it</li>
                  <li><strong>Strength comes from unity</strong> - No one fights alone</li>
                  <li><strong>Change is inevitable</strong> - But growth is a choice</li>
                </ol>
                
                <h2>Future Aspirations</h2>
                
                <h3>Short-term Goals</h3>
                <ul>
                  <li>Master the advanced techniques of their chosen class</li>
                  <li>Forge stronger bonds with their allies</li>
                  <li>Uncover the truth behind recent mysterious events</li>
                </ul>
                
                <h3>Long-term Vision</h3>
                <p>
                  [Character Name] dreams of a world where people can choose their own destiny, free from the manipulations of ancient forces. 
                  They want to build something lasting - not just defeat enemies, but create a foundation for future generations.
                </p>
                
                <hr />
                
                <p><em>This is the story so far, but every day brings new challenges and opportunities for growth. The tale of [Character Name] is still being written...</em></p>
              </div>
            </MDXContent>
          </div>
        </motion.section>

        {/* Secondary Sections - Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Character Images Section */}
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

          {/* Character Details Section */}
          <motion.section 
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
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
        </div>

        {/* Additional Sections - Single Column */}
        <div className="max-w-4xl mx-auto mt-8">
          
          {/* Character Traits & Goals */}
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

          {/* Character Relationships */}
          <motion.section 
            className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-purple-400 rounded-full"></span>
              Relationships & Connections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Allies & Friends</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white">Alphinaud Leveilleur</h4>
                    <p className="text-white/70 text-sm">Mentor figure and trusted ally</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white">Y'shtola Rhul</h4>
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
        </div>
      </motion.div>
      
      {/* Bottom black bar */}
      <motion.div 
        className="h-16 bg-black"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
