import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

function AnimatedBackground() {
  const particleConfigs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        travelY: Math.random() * -60 - 35,
        scale: Math.random() * 1.2 + 0.8,
        duration: Math.random() * 4 + 6,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Animated Mesh Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-cyan-200/40 to-blue-300/40 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-tl from-sky-200/30 to-indigo-200/30 rounded-full blur-[100px]"
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Sparkles/Particles */}
      {particleConfigs.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, particle.travelY],
            opacity: [0, 0.6, 0],
            scale: [0, particle.scale, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

export default memo(AnimatedBackground);
