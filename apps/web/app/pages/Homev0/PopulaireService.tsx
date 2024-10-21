import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import LogoDesign from '@/assets/categoriesIcon/logo-design.webp';
import WordPress from '@/assets/categoriesIcon/wordpress.webp';
import VoiceOver from '@/assets/categoriesIcon/voice-over.webp';
import VideoEditing from '@/assets/categoriesIcon/video-editing.webp';
import SocialMedia from '@/assets/categoriesIcon/social-media.webp';
import SEO from '@/assets/categoriesIcon/seo.webp';
import ContentWriting from '@/assets/categoriesIcon/content-writing.webp';
import UIUXDesign from '@/assets/categoriesIcon/ui-ux-design.webp';
import MobileAppDev from '@/assets/categoriesIcon/mobile-app-dev.webp';
import DigitalMarketing from '@/assets/categoriesIcon/digital-marketing.webp';

const services = [
    { name: 'Logo Design', icon: LogoDesign },
    { name: 'WordPress', icon: WordPress },
    { name: 'Voice Over', icon: VoiceOver },
    { name: 'Video Editing', icon: VideoEditing },
    { name: 'Social Media', icon: SocialMedia },
    { name: 'SEO', icon: SEO },
    { name: 'Content Writing', icon: ContentWriting },
    { name: 'UI/UX Design', icon: UIUXDesign },
    { name: 'Mobile App Dev', icon: MobileAppDev },
    { name: 'Digital Marketing', icon: DigitalMarketing },
  ];

const PopularServices: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const updateButtonVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateButtonVisibility);
      updateButtonVisibility();
      return () => scrollContainer.removeEventListener('scroll', updateButtonVisibility);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -scrollContainerRef.current.clientWidth : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative px-4 py-12 bg-gray-50">
      <div className="mb-10 inline-block">
        <h2 className="text-xl font-bold text-gray-800">Services populaires</h2>
        <div className="h-[1px] bg-gray-300 w-full mt-1"></div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-hidden -mx-2"
      >
        {services.map((service) => (
          <div 
            key={service.name} 
            className="flex-none w-1/5 px-2"
          >
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="w-16 h-16 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={service.name}
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xs font-medium text-center text-gray-700">{service.name}</h3>
            </div>
          </div>
        ))}
      </div>
      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-[calc(50%+2.5rem)] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          aria-label="Scroll left"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      )}
      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-[calc(50%+2.5rem)] transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          aria-label="Scroll right"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default PopularServices;