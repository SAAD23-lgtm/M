import { motion, useReducedMotion } from 'framer-motion';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '../lib/brand';
import { cn } from '../lib/utils';

type HeroWordmarkProps = {
  className?: string;
};

export default function HeroWordmark({ className }: HeroWordmarkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('relative inline-block will-change-transform', className)}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [0, -6, 0],
              scale: [1, 1.02, 1],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      <div className="relative overflow-hidden rounded-[2rem]">
        <img
          src={BRAND_LOGO_SRC}
          alt={BRAND_LOGO_ALT}
          className="block h-auto w-full object-cover object-center"
          loading="eager"
        />
      </div>
    </motion.div>
  );
}
