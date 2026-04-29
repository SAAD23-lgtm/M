import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Truck,
  Shield,
  Clock,
  Award,
  Package,
  Tag,
  ShoppingCart,
  CircleHelp,
  Info,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import HeroWordmark from '../components/HeroWordmark';
import ProductImage from '../components/ProductImage';
import {
  hasFixedPrice,
  isDiscountedProduct,
  products,
} from '../data/products';
import { cancelIdleTask, scheduleIdleTask } from '../lib/idle';
import { formatSarPrice } from '../lib/utils';

const loadStatsTickerSection = () => import('../sections/StatsTicker');
const loadParallaxShowcaseSection = () => import('../sections/ParallaxShowcase');
const loadTestimonialsCarouselSection = () => import('../sections/TestimonialsCarousel');
const loadPremiumCTASection = () => import('../sections/PremiumCTA');

const StatsTicker = lazy(loadStatsTickerSection);
const ParallaxShowcase = lazy(loadParallaxShowcaseSection);
const TestimonialsCarousel = lazy(loadTestimonialsCarouselSection);
const PremiumCTA = lazy(loadPremiumCTASection);

const HERO_BUBBLE_CONFIGS = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  size: 22 + ((index * 11) % 44),
  left: `${(index * 9.5 + (index % 4) * 8) % 100}%`,
  drift: Math.sin(index * 1.37) * 120,
  duration: 11 + ((index * 3) % 8),
  delay: (index * 0.45) % 6,
}));

const HERO_WORDMARK_ORBS = [
  { id: 1, left: '7%', top: '18%', size: 10, travelX: -10, travelY: -18, duration: 3.8, delay: 0.1 },
  { id: 2, left: '23%', top: '72%', size: 14, travelX: -16, travelY: -12, duration: 4.5, delay: 0.7 },
  { id: 3, left: '76%', top: '20%', size: 12, travelX: 12, travelY: -22, duration: 4.1, delay: 0.35 },
  { id: 4, left: '90%', top: '62%', size: 9, travelX: 14, travelY: -10, duration: 3.6, delay: 1.15 },
];

function HomeSectionFallback() {
  return (
    <section className="bg-white/60 py-12 sm:py-16">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="h-32 animate-pulse rounded-[2rem] bg-slate-200/80" />
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function Home() {
  const { i18n } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';
  const { totalItems } = useCart();
  const discountedProducts = products.filter(isDiscountedProduct);
  const featuredProducts = discountedProducts.slice(0, 8);
  const discountedCount = discountedProducts.length;
  const brandCount = new Set(products.map((product) => product.brand)).size;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroTravelDistance = typeof window === 'undefined' ? 1400 : window.innerHeight + 220;

  const secondaryHeroLink = totalItems > 0 ? '/cart' : '/offers';
  const secondaryHeroLabel = totalItems > 0
    ? (isRTL ? `راجع السلة (${totalItems})` : `Review Cart (${totalItems})`)
    : (isRTL ? 'المنتجات المخفضة' : 'Discounted Products');

  useEffect(() => {
    const idleHandle = scheduleIdleTask(() => {
      const preloaders = [
        loadStatsTickerSection,
        loadParallaxShowcaseSection,
        loadTestimonialsCarouselSection,
        loadPremiumCTASection,
      ];

      void Promise.all(preloaders.map((preload) => preload().catch(() => null)));
    }, 1000);

    return () => {
      cancelIdleTask(idleHandle);
    };
  }, []);

  const quickDestinations = [
    {
      href: '/app',
      title: isRTL ? 'حمّل التطبيق' : 'Get the App',
      desc: isRTL ? 'ثبّت المتجر على جوالك بسرعة.' : 'Install the store on your phone.',
      icon: Smartphone,
    },
    {
      href: '/products',
      title: isRTL ? 'المنتجات' : 'Products',
      desc: isRTL ? 'اختار الحجم واطلب فورًا.' : 'Pick a size and order.',
      icon: Package,
    },
    {
      href: '/brands',
      title: isRTL ? 'العلامات التجارية' : 'Brands',
      desc: isRTL ? 'قارن بين العلامات بسرعة.' : 'Compare brands quickly.',
      icon: Tag,
    },
    {
      href: '/products#how-to-order',
      title: isRTL ? 'كيف أطلب؟' : 'How to Order?',
      desc: isRTL ? 'الخطوات المختصرة للطلب.' : 'Quick ordering steps.',
      icon: ShoppingCart,
    },
    {
      href: '/contact#faq',
      title: isRTL ? 'الأسئلة الشائعة' : 'FAQ',
      desc: isRTL ? 'إجابات سريعة قبل الطلب.' : 'Fast answers before ordering.',
      icon: CircleHelp,
    },
    {
      href: '/about',
      title: isRTL ? 'من نحن' : 'About Us',
      desc: isRTL ? 'القصة والثقة باختصار.' : 'Story and trust.',
      icon: Info,
    },
    {
      href: '/about#why-choose-riq',
      title: isRTL ? 'لماذا تختار ريق؟' : 'Why Riq?',
      desc: isRTL ? 'أسباب الاختيار بسرعة.' : 'Why choose us.',
      icon: Sparkles,
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_28%,#296087_0%,#245A80_38%,#1E4A6D_100%)]"
      >
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 overflow-hidden">
          {HERO_BUBBLE_CONFIGS.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.left,
                bottom: -100,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0.05))',
              }}
              animate={{
                y: [0, -heroTravelDistance],
                x: [0, bubble.drift],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: 'linear',
              }}
            />
          ))}

          <motion.div
            className="absolute h-[600px] w-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
              top: '10%',
              left: '-10%',
            }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)',
              bottom: '10%',
              right: '-5%',
            }}
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          <motion.svg
            className="absolute bottom-0 left-0 h-32 w-full sm:h-40"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              fill="rgba(255,255,255,0.1)"
              d="M0,60L48,65C96,70,192,80,288,75C384,70,480,50,576,45C672,40,768,50,864,60C960,70,1056,80,1152,75C1248,70,1344,50,1392,40L1440,30L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </motion.svg>
        </motion.div>

        <motion.div
          style={{ scale: heroScale, y: heroY }}
          className="relative z-10 w-full px-4 pb-20 pt-32 text-center sm:px-6 sm:pt-36 lg:px-12 lg:pt-40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.7, type: 'spring' }}
            className="relative mx-auto mb-5 flex w-fit flex-col items-center"
          >
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl"
              animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.32, 0.62, 0.32] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-white/20"
              animate={{ rotate: [0, 360], scale: [0.96, 1.03, 0.96], opacity: [0.22, 0.45, 0.22] }}
              transition={{ duration: 10.5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[66%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[44%] border border-cyan-200/35"
              animate={{ rotate: [360, 0], scale: [1.02, 0.96, 1.02], opacity: [0.16, 0.38, 0.16] }}
              transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {HERO_WORDMARK_ORBS.map((orb) => (
              <motion.span
                key={orb.id}
                className="pointer-events-none absolute rounded-full border border-white/50 bg-white/40 shadow-[0_0_22px_rgba(186,230,253,0.42)] backdrop-blur-sm"
                style={{
                  left: orb.left,
                  top: orb.top,
                  width: orb.size,
                  height: orb.size,
                }}
                animate={{
                  x: [0, orb.travelX, 0],
                  y: [0, orb.travelY, 0],
                  scale: [1, 1.28, 0.92, 1],
                  opacity: [0.36, 0.92, 0.56, 0.36],
                }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  delay: orb.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}

            <motion.div
              className="relative z-10"
              animate={{ y: [0, -4, 0], scale: [1, 1.015, 1] }}
              transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HeroWordmark className="w-[17rem] sm:w-[15.5rem] md:w-[17.5rem]" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {isRTL ? (
              'ريقها وروّق يومك'
            ) : (
              <>
                Pure Water,
                <br />
                <span className="text-yellow-300">Better Life</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mb-8 max-w-3xl px-4 text-base text-white/90 sm:mb-10 sm:text-lg md:text-xl lg:text-2xl"
          >
            {isRTL
              ? 'اطلب مياهك بسرعة، وشوف المنتجات والعروض من أول ضغطة.'
              : 'Order water faster, with products and offers one tap away.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#153b66] transition-all hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg"
            >
              <span>{isRTL ? 'ابدأ الطلب الآن' : 'Start Ordering Now'}</span>
              <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              to={secondaryHeroLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/20 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105 sm:px-8 sm:py-4 sm:text-lg"
            >
              <span>{secondaryHeroLabel}</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-4 flex justify-center px-4"
          >
            <Link
              to="/app"
              className="group inline-flex max-w-2xl items-center gap-3 rounded-[1.7rem] border border-white/25 bg-white/14 px-4 py-3 text-start text-white shadow-[0_18px_40px_-24px_rgba(8,15,30,0.42)] backdrop-blur-md transition hover:bg-white/18 sm:px-5"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/16">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold sm:text-base">
                  {isRTL ? 'ثبّت المتجر على جوالك' : 'Install the Store on Your Phone'}
                </p>
                <p className="mt-1 text-xs text-white/75 sm:text-sm">
                  {isRTL ? 'زر تثبيت سريع للموبايل.' : 'Quick mobile install button.'}
                </p>
              </div>
              <ArrowRight className={`h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-4 px-4 sm:mt-16 sm:gap-8"
          >
            {[
              { value: products.length, suffix: '', label: isRTL ? 'منتج' : 'Products' },
              { value: brandCount, suffix: '', label: isRTL ? 'علامة تجارية' : 'Brands' },
              { value: discountedCount, suffix: '', label: isRTL ? 'منتج مخفض' : 'Discounted' },
              { value: 3, suffix: '', label: isRTL ? 'فئات فعالة' : 'Active Sizes' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="rounded-2xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm sm:px-6 sm:py-4"
              >
                <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/70 sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-white/60 sm:text-sm">{isRTL ? 'اسحب للأسفل' : 'Scroll Down'}</span>
              <ChevronDown className="h-5 w-5 text-white/60 sm:h-6 sm:w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="bg-white py-12 sm:py-14">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                <Tag className="h-4 w-4" />
                <span>{isRTL ? 'عروض مختارة' : 'Selected Offers'}</span>
              </span>
              <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl">
                {isRTL ? 'عروض مميزة من منتجاتنا' : 'Featured deals from our store'}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                {isRTL
                  ? 'عينة سريعة من المنتجات المخفضة فقط، ولو عجبتك كمل على صفحة العروض.'
                  : 'A quick sample of discounted products only, with the full offers page one tap away.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {featuredProducts.length} {isRTL ? 'عروض ظاهرة' : 'shown offers'}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {brandCount} {isRTL ? 'علامة' : 'brands'}
                </span>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  {discountedCount} {isRTL ? 'إجمالي العروض' : 'total deals'}
                </span>
              </div>
            </div>

            <Link
              to="/offers"
              className="inline-flex w-fit items-center gap-2 self-start rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-[0_16px_36px_-24px_rgba(5,150,105,0.75)] transition hover:bg-emerald-700 sm:self-end"
            >
              <span>{isRTL ? 'عرض كل العروض' : 'Browse all offers'}</span>
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group overflow-hidden rounded-[1.35rem] border border-slate-200 bg-slate-50 p-2.5 shadow-[0_18px_55px_-34px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_70px_-34px_rgba(14,165,233,0.2)] sm:rounded-[2rem] sm:p-4"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <ProductImage
                    product={product}
                    isRTL={isRTL}
                    size="card"
                    className="h-32 sm:h-56"
                    imageClassName="group-hover:scale-[1.03]"
                  />
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
                  <span className="rounded-full bg-[#153b66]/10 px-2 py-1 text-[0.65rem] font-semibold text-[#153b66] sm:px-3 sm:py-1.5 sm:text-xs">
                    {isRTL ? product.brandAr : product.brand}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1 text-[0.65rem] font-semibold text-slate-600 ring-1 ring-slate-200 sm:px-3 sm:py-1.5 sm:text-xs">
                    {product.size}
                  </span>
                  <span className="rounded-full bg-white px-2 py-1 text-[0.65rem] font-semibold text-slate-600 ring-1 ring-slate-200 sm:px-3 sm:py-1.5 sm:text-xs">
                    x{product.quantity}
                  </span>
                  {product.pricingMode === 'quote' ? (
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-[0.65rem] font-semibold text-amber-700 sm:px-3 sm:py-1.5 sm:text-xs">
                      {isRTL ? 'اسأل عن السعر' : 'Ask for price'}
                    </span>
                  ) : null}
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-black leading-tight text-slate-900 transition-colors hover:text-[#153b66] sm:mt-4 sm:min-h-0 sm:text-xl">
                    {isRTL ? product.name.ar : product.name.en}
                  </h3>
                </Link>
                <div className="mt-3 flex flex-wrap items-end gap-1.5 sm:mt-4 sm:gap-3">
                  {hasFixedPrice(product) ? (
                    <>
                      <span className="text-base font-black text-[#153b66] sm:text-2xl">
                        {formatSarPrice(product.price, isRTL)}
                      </span>
                      {product.originalPrice ? (
                        <span className="text-xs text-slate-400 line-through sm:text-sm">
                          {formatSarPrice(product.originalPrice, isRTL)}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-sm font-black text-amber-700 sm:text-lg">
                      {isRTL ? 'اسأل عن السعر' : 'Ask for price'}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eef6fb_100%)] py-12 sm:py-14">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#153b66]/10 px-3 py-1.5 text-xs font-bold text-[#153b66]">
                <Sparkles className="h-3.5 w-3.5" />
                {isRTL ? 'اختصارات' : 'Shortcuts'}
              </span>
              <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                {isRTL ? 'وصل بسرعة' : 'Get there fast'}
              </h2>
            </div>
            <Link
              to="/products"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#153b66] shadow-[0_14px_36px_-26px_rgba(15,23,42,0.35)] sm:inline-flex"
            >
              <span>{isRTL ? 'ابدأ الطلب' : 'Order now'}</span>
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid gap-3 lg:grid-cols-[0.95fr_1.35fr] lg:gap-5">
            {quickDestinations.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.045 }}
                whileHover={{ y: index === 0 ? -4 : -2 }}
                className={index === 0 ? 'lg:row-span-3' : ''}
              >
                <Link
                  to={item.href}
                  className={
                    index === 0
                      ? 'group relative flex min-h-[11rem] overflow-hidden rounded-[1.65rem] bg-[#153b66] p-5 text-white shadow-[0_26px_70px_-38px_rgba(21,59,102,0.78)] transition-all hover:bg-[#102f52] sm:min-h-[14rem] sm:p-6 lg:h-full'
                      : 'group flex min-h-[4.75rem] items-center gap-3 rounded-[1.25rem] border border-white/80 bg-white/92 p-3.5 shadow-[0_14px_42px_-32px_rgba(15,23,42,0.25)] transition-all hover:border-sky-100 hover:bg-white sm:min-h-[5.5rem] sm:p-4'
                  }
                >
                  {index === 0 ? (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),rgba(255,255,255,0)_48%)]" />
                      <div className="relative flex h-full w-full flex-col justify-between gap-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-white/14">
                            <item.icon className="h-7 w-7" />
                          </div>
                          <ArrowRight className={`mt-2 h-5 w-5 opacity-75 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black sm:text-3xl">{item.title}</h3>
                          <p className="mt-2 text-sm font-medium leading-7 text-white/78 sm:text-base">{item.desc}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#153b66]/10 text-[#153b66] sm:h-12 sm:w-12">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-black text-slate-900 transition-colors group-hover:text-[#153b66] sm:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-slate-500 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                      <ArrowRight className={`h-4 w-4 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#153b66] ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-6 shadow-sm sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {[
              { icon: Truck, title: isRTL ? 'توصيل سريع' : 'Fast Delivery', desc: isRTL ? '24-48 ساعة' : '24-48 Hours' },
              { icon: Shield, title: isRTL ? 'جودة مضمونة' : 'Quality Guaranteed', desc: isRTL ? '100% نقي' : '100% Pure' },
              { icon: Clock, title: isRTL ? 'دعم 24/7' : '24/7 Support', desc: isRTL ? 'على مدار الساعة' : 'Always Available' },
              { icon: Award, title: isRTL ? 'ضمان الاسترجاع' : 'Easy Returns', desc: isRTL ? '7 أيام' : '7 Days' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#153b66] to-[#2b648c] text-white sm:h-12 sm:w-12">
                  <feature.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 sm:text-base">{feature.title}</h4>
                  <p className="text-xs text-gray-500 sm:text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<HomeSectionFallback />}>
        <StatsTicker isRTL={isRTL} />
      </Suspense>

      <Suspense fallback={<HomeSectionFallback />}>
        <ParallaxShowcase isRTL={isRTL} />
      </Suspense>

      <Suspense fallback={<HomeSectionFallback />}>
        <TestimonialsCarousel isRTL={isRTL} />
      </Suspense>

      <Suspense fallback={<HomeSectionFallback />}>
        <PremiumCTA isRTL={isRTL} />
      </Suspense>
    </main>
  );
}
