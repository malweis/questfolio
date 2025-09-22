"use client";

import { useState, useEffect } from 'react';

interface BackgroundSection {
  id: string;
  background?: string;
  image?: string;
  threshold: number;
}

function useMisfitsBackgroundChanger(sections: BackgroundSection[]) {
  const [currentSection, setCurrentSection] = useState<BackgroundSection>(sections[0] || {
    id: "default",
    background: "from-slate-900 via-purple-900 to-slate-900",
    threshold: 0
  });

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
          
          setCurrentSection(activeSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return currentSection;
}

interface MisfitsBackgroundWrapperProps {
  children: React.ReactNode;
  stormTriggered?: boolean;
  currentPart?: number;
}

export default function MisfitsBackgroundWrapper({ 
  children, 
  stormTriggered = false, 
  currentPart = 1 
}: MisfitsBackgroundWrapperProps) {
  // Define background sections based on current part and scroll progress
  const getBackgroundSections = (part: number): BackgroundSection[] => {
    switch (part) {
      case 1:
        return [
          {
            id: "part1-intro",
            image: "/assets/backgrounds/dimitar-ivanov-moon-city-final-2.jpg",
            threshold: 0
          },
        ];
      case 2:
        return [
          {
            id: "part2-intro",
            background: "from-indigo-900 via-blue-800 to-cyan-900",
            threshold: 0
          },
          {
            id: "part2-revelation",
            background: "from-emerald-900 via-green-800 to-lime-900",
            threshold: 0.3
          },
          {
            id: "part2-mastery",
            background: "from-blue-900 via-cyan-800 to-teal-900",
            threshold: 0.6
          },
          {
            id: "part2-prophet",
            image: "/assets/backgrounds/chris-riley-city-05.jpg",
            threshold: 0.8
          }
        ];
      case 3:
        return [
          {
            id: "part3-intro",
            background: "from-purple-900 via-pink-800 to-rose-900",
            threshold: 0
          },
          {
            id: "part3-awakening",
            background: "from-orange-900 via-red-800 to-pink-900",
            threshold: 0.3
          },
          {
            id: "part3-quest",
            background: "from-yellow-900 via-orange-800 to-red-900",
            threshold: 0.6
          },
          {
            id: "part3-destiny",
            image: "/assets/backgrounds/chris-riley-city-05.jpg",
            threshold: 0.8
          }
        ];
      default:
        return [
          {
            id: "default",
            background: "from-slate-900 via-purple-900 to-slate-900",
            threshold: 0
          }
        ];
    }
  };

  const backgroundSections = getBackgroundSections(currentPart);
  const currentSection = useMisfitsBackgroundChanger(backgroundSections);

  return (
    <div 
      className={`min-h-screen overflow-hidden relative ${
        currentSection.image 
          ? 'bg-gray-800' 
          : `bg-gradient-to-br ${currentSection.background || 'from-slate-900 via-purple-900 to-slate-900'}`
      }`}
      style={currentSection.image ? { 
        backgroundImage: `url(${currentSection.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      } : {}}
    >
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
