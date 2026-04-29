import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

type BrandVisualBrand = {
  name: string;
  nameAr: string;
  logo?: string;
};

type BrandVisualSize = 'compact' | 'card' | 'hero';

interface BrandVisualProps {
  brand: BrandVisualBrand;
  isRTL?: boolean;
  size?: BrandVisualSize;
  className?: string;
  imageClassName?: string;
}

const shellClasses: Record<BrandVisualSize, string> = {
  compact: 'rounded-[1.4rem] p-3',
  card: 'rounded-[1.8rem] p-4 sm:p-5',
  hero: 'rounded-[2rem] p-5 sm:p-6',
};

const imageHeights: Record<BrandVisualSize, string> = {
  compact: 'h-20 sm:h-24',
  card: 'h-36 sm:h-44',
  hero: 'h-44 sm:h-52 lg:h-56',
};

const labelClasses: Record<BrandVisualSize, string> = {
  compact: 'text-[11px] px-2.5 py-1',
  card: 'text-xs px-3 py-1.5',
  hero: 'text-sm px-3.5 py-2',
};

const imageSizes: Record<BrandVisualSize, string> = {
  compact: '(min-width: 640px) 120px, 96px',
  card: '(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 42vw',
  hero: '(min-width: 1280px) 30vw, 80vw',
};

export default function BrandVisual({
  brand,
  isRTL = true,
  size = 'card',
  className,
  imageClassName,
}: BrandVisualProps) {
  const isCriticalImage = size === 'hero';
  const [hasLogoError, setHasLogoError] = useState(false);
  const showFallback = !brand.logo || hasLogoError;

  useEffect(() => {
    setHasLogoError(false);
  }, [brand.logo]);

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden border border-white/70 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.98),rgba(234,248,255,0.96)_46%,rgba(191,219,254,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]',
        shellClasses[size],
        className,
      )}
    >
      <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-white/70 blur-2xl" />
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-sky-200/45 blur-2xl" />
      <div className="absolute inset-[10%] rounded-[inherit] border border-white/45 bg-white/25" />

      <div className="relative h-full">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className={cn('rounded-full bg-[#153b66]/12 font-semibold text-[#153b66]', labelClasses[size])}>
            {isRTL ? brand.nameAr : brand.name}
          </div>
          <div className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Brand
          </div>
        </div>

        <div className={cn('relative flex items-center justify-center overflow-hidden rounded-[1.4rem]', imageHeights[size])}>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.8),rgba(224,242,254,0.48))]" />
          <div className="absolute inset-x-[16%] top-0 h-1/2 rounded-full bg-white/80 blur-3xl" />
          {showFallback ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#153b66]/50">
                {isRTL ? 'العلامة' : 'Brand'}
              </span>
              <span className="mt-3 text-2xl font-black text-[#153b66]">
                {isRTL ? brand.nameAr : brand.name}
              </span>
            </div>
          ) : (
            <img
              src={brand.logo}
              alt={isRTL ? brand.nameAr : brand.name}
              loading={isCriticalImage ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={isCriticalImage ? 'high' : 'auto'}
              sizes={imageSizes[size]}
              onError={() => setHasLogoError(true)}
              className={cn(
                'relative h-full w-full object-contain object-center drop-shadow-[0_18px_30px_rgba(15,23,42,0.18)] transition-transform duration-700',
                imageClassName,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
