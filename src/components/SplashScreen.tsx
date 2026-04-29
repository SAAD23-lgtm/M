import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC, BRAND_NAME_AR, BRAND_NAME_EN } from '../lib/brand';

const SPLASH_DURATION_MS = 4000;

export default function SplashScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const hasSeenSplash = window.sessionStorage.getItem('riq-splash-seen') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return !hasSeenSplash && !prefersReducedMotion;
  });

  useEffect(() => {
    if (!show) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem('riq-splash-seen', 'true');
      setShow(false);
    }, SPLASH_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a1628] overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(circle at 50% 50%, rgba(21,59,102,0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.3) 10%, transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(21,59,102,0.2) 0%, transparent 60%)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          />

          <div className="relative z-10 text-center flex flex-col items-center px-4">
            {/* The Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.55, type: 'spring', bounce: 0.25 }}
              className="relative mb-9 flex h-48 w-48 items-center justify-center sm:mb-10 sm:h-60 sm:w-60"
            >
              {/* Glow behind logo */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
              />
              <div className="relative z-10 h-full w-full overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_32px_68px_-42px_rgba(0,0,0,0.85)] backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),rgba(255,255,255,0)_62%)]" />
                <img
                  src={BRAND_LOGO_SRC}
                  alt={BRAND_LOGO_ALT}
                  className="relative z-10 h-full w-full scale-[1.22] object-cover object-center drop-shadow-[0_14px_36px_rgba(125,211,252,0.2)]"
                />
              </div>
            </motion.div>

            {/* Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="text-4xl sm:text-[4.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white tracking-tighter leading-none"
            >
              {BRAND_NAME_EN}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.35 }}
              className="mt-2 mb-4 text-xl sm:text-[2.1rem] font-bold tracking-tight text-cyan-100 leading-none"
            >
              {BRAND_NAME_AR}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24, duration: 0.3 }}
              className="text-cyan-200/60 font-medium tracking-[0.2em] text-sm sm:text-base uppercase"
            >
              Pure Water Delivery
            </motion.p>
          </div>

          {/* Loading Progress Bar */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: SPLASH_DURATION_MS / 1000, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
