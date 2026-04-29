import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorDotX = useMotionValue(-100);
  const cursorDotY = useMotionValue(-100);

  // Smooth out the main cursor (the trailing circle)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // The dot is faster, almost instant
  const dotSpringConfig = { damping: 100, stiffness: 2000 };
  const dotXSpring = useSpring(cursorDotX, dotSpringConfig);
  const dotYSpring = useSpring(cursorDotY, dotSpringConfig);

  useEffect(() => {
    // Only show on desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      cursorDotX.set(e.clientX - 4);
      cursorDotY.set(e.clientY - 4);
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
    };

    const mouseEnterHandler = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);
    document.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
      document.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, [cursorX, cursorY, cursorDotX, cursorDotY, isVisible]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't render on mobile
  }

  return (
    <div className="hidden lg:block pointer-events-none z-[9999] fixed inset-0 overflow-hidden">
      {/* Outer Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full mix-blend-difference pointer-events-none flex items-center justify-center border-2 border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none shadow-[0_0_10px_rgba(255,255,255,1)]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
