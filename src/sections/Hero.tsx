import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Play } from 'lucide-react';
import gsap from 'gsap';
import { products } from '../data/products';
import ProductImage from '../components/ProductImage';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRTL = i18n.language === 'ar';

  // Water Ripple Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let ripples: Array<{ x: number; y: number; radius: number; opacity: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRipple = (x: number, y: number) => {
      ripples.push({ x, y, radius: 0, opacity: 1 });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#153b66');
      gradient.addColorStop(0.5, '#2b648c');
      gradient.addColorStop(1, '#0c2340');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ripples
      ripples = ripples.filter((ripple) => {
        ripple.radius += 2;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);

    // Auto-create ripples
    const interval = setInterval(() => {
      createRipple(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }, 800);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Text Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      });

      gsap.from('.hero-cta', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const titleChars = t('hero.title').split('');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Water Ripple Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              left: `${Math.random() * 100}%`,
              bottom: -50,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Wave Overlay */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 2 }}>
        <motion.svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          initial={{ y: 20 }}
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 85C672 90 768 90 864 85C960 80 1056 70 1152 70C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center" style={{ zIndex: 3 }}>
        
        {/* Text Content */}
        <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'} pt-20 lg:pt-0`}>
          {/* Sparkle Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`flex justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} gap-4 mb-6`}
          >
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <Sparkles className="w-7 h-7 text-yellow-200 animate-pulse delay-100" />
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse delay-200" />
          </motion.div>

          {/* Title */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            {titleChars.map((char, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-cyan-50 max-w-xl mx-auto lg:mx-0 mb-10 drop-shadow-md">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#153b66] rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 group"
            >
              <span>{t('hero.cta')}</span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
              </motion.span>
            </a>
            
            <a
              href="#about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isRTL ? 'اكتشف المزيد' : 'Discover More'}</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className={`flex flex-wrap justify-center ${isRTL ? 'lg:justify-start' : 'lg:justify-start'} gap-8 mt-12 bg-white/5 p-6 rounded-3xl backdrop-blur-sm border border-white/10`}
          >
            {[
              { value: '50+', label: isRTL ? 'منتج حصري' : 'Products' },
              { value: '15+', label: isRTL ? 'علامة تجارية' : 'Brands' },
              { value: '24/7', label: isRTL ? 'توصيل سريع' : 'Fast Delivery' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -5, scale: 1.1 }}
              >
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-200 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm text-cyan-100/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Floating Bottle Showcase */}
        <div className="hidden lg:flex justify-center items-center relative h-full perspective-[2000px]">
          {/* Glowing Aura */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-[100px] w-96 h-96 mx-auto my-auto"
          />

          <motion.div
            initial={{ y: 50, opacity: 0, rotateY: 30 }}
            animate={{ y: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: 'spring', bounce: 0.4 }}
            className="relative z-10"
          >
            <motion.div
              animate={{ 
                y: [-15, 15, -15],
                rotateX: [5, -5, 5],
                rotateZ: [-2, 2, -2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-80 h-[500px]"
            >
              <ProductImage 
                product={products[0]}
                isRTL={isRTL}
                size="detail"
                className="w-[110%] h-[110%] mx-[-5%] my-[-5%] bg-transparent border-none filter drop-shadow-[0_30px_30px_rgba(34,211,238,0.5)] shadow-none"
              />
              
              {/* Liquid Reflection Overlay on Bottle */}
              <motion.div
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 mix-blend-overlay pointer-events-none"
                style={{ backgroundSize: '200% 200%' }}
              />

              {/* Orbital Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-white/20"
                style={{ padding: -50, scale: 1.2 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
    </section>
  );
}
