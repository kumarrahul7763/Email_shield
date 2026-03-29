import { useState, useEffect } from 'react';
import emailGif from '../assets/Emails.gif';

/**
 * HeroSection Component
 * Displays animated typewriter text with gradient styling and an image
 */
const HeroSection = () => {
  const texts = [
    'AI-Powered Email Classification',
    'Auto Action System',
    'Smart Email Intelligence'
  ];
  
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isPaused ? 2000 : isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentIndex, texts]);

  return (
    <div className="py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Typewriter Text */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              {displayText}
            </span>
            <span className="inline-block w-1 h-10 md:h-14 bg-gradient-to-b from-pink-500 to-purple-500 ml-1 animate-pulse"></span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Automatically classify, prioritize, and route your emails with advanced AI technology
        </p>

        {/* Hero GIF */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
          <img
            src={emailGif}
            alt="AI Email Classification Animation"
            className="relative w-full h-auto rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
