"use client";

import { useState, useEffect } from 'react';

interface BackgroundSection {
  id: string;
  background: string;
  threshold: number; // 0-1, when this section should trigger
}

export function useBackgroundChanger(sections: BackgroundSection[]) {
  const [currentBackground, setCurrentBackground] = useState<string>('from-slate-900 via-purple-900 to-slate-900');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Calculate scroll progress (0-1)
          const scrollProgress = scrollTop / (documentHeight - windowHeight);
          
          // Find which section should be active based on scroll progress
          let activeSection = sections[0];
          
          for (let i = sections.length - 1; i >= 0; i--) {
            if (scrollProgress >= sections[i].threshold) {
              activeSection = sections[i];
              break;
            }
          }
          
          setCurrentBackground(activeSection.background);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return currentBackground;
}
