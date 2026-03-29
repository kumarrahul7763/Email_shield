import { useState, useEffect, useRef } from 'react';

/**
 * FeatureCarousel Component
 * Displays auto-scrolling feature cards with glassmorphism styling
 */
const FeatureCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'AI Classification',
      description: 'Advanced machine learning algorithms automatically categorize your emails with high accuracy'
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Auto Action System',
      description: 'Automatically route emails to the right departments and trigger appropriate actions'
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: 'Spam Detection',
      description: 'Intelligent spam filtering keeps your inbox clean and secure from malicious content'
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: 'Bulk Processing',
      description: 'Process thousands of emails at once with our efficient bulk upload system'
    }
  ];

  // Duplicate features for infinite scroll effect
  const duplicatedFeatures = [...features, ...features];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll position when reaching halfway (since we duplicated the array)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <div className="py-6 md:py-10 px-4 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-hidden"
          >
            {duplicatedFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 sm:w-72 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 md:p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-3 md:mb-4 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;
