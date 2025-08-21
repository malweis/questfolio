"use client";

import { useBackgroundChanger } from "./use-background-changer";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  stormTriggered?: boolean;
}

export default function FFXIVBackgroundWrapper({ children, stormTriggered = false }: BackgroundWrapperProps) {
  // Define background sections based on scroll progress through the lore
  const backgroundSections = [
    {
      id: "character-title",
      background: "from-slate-900 via-purple-900 to-slate-900", // Default
      threshold: 0
    },
    {
      id: "origins",
      background: "from-amber-900 via-orange-800 to-red-900", // Warm desert colors for Ul'dah section
      threshold: 0.15
    },
    {
      id: "call-to-adventure",
      background: "from-red-900 via-purple-800 to-indigo-900", // Dramatic colors for adventure section
      threshold: 0.3
    },
    {
      id: "relationships",
      background: "from-blue-900 via-cyan-800 to-teal-900", // Cool colors for relationships section
      threshold: 0.45
    },
    {
      id: "character-development",
      background: "from-emerald-900 via-green-800 to-lime-900", // Growth colors for development section
      threshold: 0.6
    },
    {
      id: "personal-philosophy",
      background: "from-violet-900 via-purple-800 to-fuchsia-900", // Philosophical colors
      threshold: 0.75
    },
    {
      id: "future-aspirations",
      background: "from-indigo-900 via-blue-800 to-cyan-900", // Future/hope colors
      threshold: 0.9
    }
  ];

  const currentBackground = useBackgroundChanger(backgroundSections);

  return (
    <div className={`min-h-screen bg-black overflow-hidden bg-gradient-to-br ${currentBackground} relative`}>
      {/* Rain Effect - Appears when storm is triggered */}
      {stormTriggered && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 100 }).map((_, i) => {
            const duration = Math.random() * 1 + 1.5;
            const delay = Math.random() * 2;
            const left = Math.random() * 100;
            const height = Math.random() * 100 + 50;
            const startTop = -(height + 50);
            
            return (
              <div
                key={i}
                className="absolute w-0.5 bg-gradient-to-b from-blue-200/60 via-blue-300/40 to-transparent rain-drop"
                style={{
                  left: `${left}%`,
                  height: `${height}px`,
                  top: `${startTop}px`,
                  animation: `rain ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
}
