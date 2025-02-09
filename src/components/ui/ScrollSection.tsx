import React, { useRef, useEffect } from 'react';

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  autoScroll?: boolean;
}

export function ScrollSection({ id, children, className = '', autoScroll = false }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && sectionRef.current) {
      const hash = window.location.hash.slice(1);
      if (hash === id) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [id, autoScroll]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-8 ${className}`}
    >
      {children}
    </section>
  );
}