import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [maxWidth, setMaxWidth] = useState(256);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click for mobile
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setIsVisible(!isVisible);
    }
  };

  // Handle hover for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  // Calculate tooltip position and size for desktop
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current && !isMobile) {
      const tooltip = tooltipRef.current;
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;

      // Calculate available width
      const availableWidth = viewportWidth - (padding * 2);
      const newMaxWidth = Math.min(384, availableWidth);
      setMaxWidth(newMaxWidth);

      // Set initial width for measurement
      tooltip.style.width = `${newMaxWidth}px`;
      const tooltipRect = tooltip.getBoundingClientRect();

      // Calculate horizontal position
      let xOffset = 0;
      const tooltipCenterX = containerRect.left + (containerRect.width / 2);
      const tooltipLeft = tooltipCenterX - (tooltipRect.width / 2);
      const tooltipRight = tooltipLeft + tooltipRect.width;

      if (tooltipRight > viewportWidth - padding) {
        xOffset = viewportWidth - padding - tooltipRight;
      } else if (tooltipLeft < padding) {
        xOffset = padding - tooltipLeft;
      }

      // Calculate vertical position
      let yOffset = 0;
      const tooltipBottom = containerRect.bottom + tooltipRect.height + 8; // 8px gap

      if (tooltipBottom > viewportHeight - padding) {
        // Position above if not enough space below
        yOffset = -(tooltipRect.height + containerRect.height + 16); // 16px total gap
      }

      setPosition({ x: xOffset, y: yOffset });
    }
  }, [isVisible, maxWidth, isMobile]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible && isMobile) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible, isMobile]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`cursor-pointer ${isMobile ? 'active:opacity-70' : ''}`}
        role={isMobile ? 'button' : undefined}
        tabIndex={isMobile ? 0 : undefined}
      >
        {children}
      </div>
      {isVisible && (
        <>
          {/* Mobile overlay */}
          {isMobile && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsVisible(false)} />
          )}
          
          {/* Tooltip content */}
          <div
            ref={tooltipRef}
            style={{
              maxWidth: `${maxWidth}px`,
              width: '100%',
              ...(isMobile ? {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              } : {
                transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)`,
              })
            }}
            className={`
              ${isMobile 
                ? 'fixed z-50 mx-4' 
                : 'absolute z-10 left-1/2 mt-2'}
              p-4 text-sm text-gray-600 bg-white rounded-lg shadow-lg border border-gray-200
              break-words whitespace-pre-wrap
              ${isMobile ? 'animate-fade-in' : ''}
            `}
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
}