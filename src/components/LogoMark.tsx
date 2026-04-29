import { cn } from '../lib/utils';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '../lib/brand';

type LogoMarkProps = {
  className?: string;
  size?: string;
  scaleClassName?: string;
  tone?: 'brand' | 'white';
  variant?: 'default' | 'trimmed';
};

export default function LogoMark({
  className,
  size,
  scaleClassName,
  tone = 'brand',
  variant = 'default',
}: LogoMarkProps) {
  return (
    <img
      src={BRAND_LOGO_SRC}
      alt={BRAND_LOGO_ALT}
      className={cn(
        'object-cover object-center',
        variant === 'trimmed'
          ? 'rounded-[0.9rem] shadow-none'
          : 'rounded-full shadow-[0_12px_30px_rgba(15,23,42,0.12)]',
        tone === 'white' ? 'ring-1 ring-white/20' : '',
        size ?? 'h-full w-full',
        scaleClassName,
        className,
      )}
    />
  );
}
