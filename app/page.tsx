"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import useSound from "use-sound";

export default function Home() {
  // Button sound effects - different sound for each button
  const [playFFXIVSound] = useSound("/sounds/button01.mp3.flac", { volume: 0.6 });
  const [playDamianSound] = useSound("/sounds/button02.mp3.flac", { volume: 0.6 });
  const [playDNDSound] = useSound("/sounds/button03.mp3.flac", { volume: 0.6 });

  // Sound handler functions
  const handleFFXIVClick = () => {
    playFFXIVSound();
  };

  const handleDamianClick = () => {
    playDamianSound();
  };

  const handleDNDClick = () => {
    playDNDSound();
  };
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
        className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-8rem)] p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center text-center">
          
          {/* Title with Animated Torches */}
          <motion.div 
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Left Torch */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <Image
                src="/assets/animated_torch.gif"
                alt="Animated Torch"
                width={80}
                height={120}
                className="drop-shadow-[0_0_20px_rgba(255,165,0,0.6)]"
              />
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'Times New Roman', serif",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.8)",
                letterSpacing: "0.1em"
              }}
            >
              Character Stories
            </motion.h1>
            
            {/* Right Torch */}
            <motion.div
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            >
              <Image
                src="/assets/animated_torch.gif"
                alt="Animated Torch"
                width={80}
                height={120}
                className="drop-shadow-[0_0_20px_rgba(255,165,0,0.6)]"
              />
            </motion.div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            className="flex gap-6 items-center flex-col sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              className="group relative transition-transform duration-200 hover:scale-105"
              href="/ffxiv"
              onClick={handleFFXIVClick}
            >
              <div className="relative">
                <Image
                  src="/assets/buttons/buttonStock1.png"
                  alt="FFXIV Character Button"
                  width={200}
                  height={80}
                  className="transition-opacity duration-200 group-hover:opacity-0"
                />
                <Image
                  src="/assets/buttons/buttonStock1h.png"
                  alt="FFXIV Character Button Hover"
                  width={200}
                  height={80}
                  className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">FFXIV Character</span>
                </div>
              </div>
            </Link>
            <Link
              className="group relative transition-transform duration-200 hover:scale-105"
              href="/damian"
              onClick={handleDamianClick}
            >
              <div className="relative">
                <Image
                  src="/assets/buttons/buttonStock1.png"
                  alt="Damian Button"
                  width={200}
                  height={80}
                  className="transition-opacity duration-200 group-hover:opacity-0"
                />
                <Image
                  src="/assets/buttons/buttonStock1h.png"
                  alt="Damian Button Hover"
                  width={200}
                  height={80}
                  className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">Damian</span>
                </div>
              </div>
            </Link>
            <a
              className="group relative transition-transform duration-200 hover:scale-105"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDNDClick}
            >
              <div className="relative">
                <Image
                  src="/assets/buttons/buttonStock1.png"
                  alt="DND Button"
                  width={200}
                  height={80}
                  className="transition-opacity duration-200 group-hover:opacity-0"
                />
                <Image
                  src="/assets/buttons/buttonStock1h.png"
                  alt="DND Button Hover"
                  width={200}
                  height={80}
                  className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">DND</span>
                </div>
              </div>
            </a>
          </motion.div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
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
