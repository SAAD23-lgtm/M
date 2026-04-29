import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brands } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Brands() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: isRTL ? '20%' : '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [isRTL]);

  // Duplicate brands for infinite scroll effect
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-[#edf4fa] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#153b66]/10 text-[#153b66] rounded-full text-sm font-medium mb-4"
          >
            {isRTL ? 'شركاؤنا' : 'Our Partners'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('brands.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('brands.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Brands Track */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#edf4fa] to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex gap-8 py-8"
          style={{ perspective: '1000px' }}
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              initial={{ opacity: 0, rotateY: -30 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                rotateY: 0,
                z: 50,
                transition: { duration: 0.3 },
              }}
              className="flex-shrink-0 w-64 h-80 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden group"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${(index % 3 - 1) * 5}deg)`,
              }}
            >
              {/* Card Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-6">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#153b66]/5 to-[#2b648c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Brand Logo Placeholder */}
                <div className="relative w-32 h-32 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full rounded-full bg-gradient-to-br from-[#153b66] to-[#2b648c] flex items-center justify-center"
                  >
                    <span className="text-3xl font-bold text-white">
                      {brand.name.charAt(0)}
                    </span>
                  </motion.div>
                  {/* Liquid Fill Effect */}
                  <motion.div
                    initial={{ height: '0%' }}
                    whileHover={{ height: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#153b66] to-[#2b648c] rounded-full opacity-20"
                  />
                </div>

                {/* Brand Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {isRTL ? brand.nameAr : brand.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {isRTL ? 'مياه معبأة نقية' : 'Pure Bottled Water'}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '60%' }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-6 h-1 bg-gradient-to-r from-[#153b66] to-[#2b648c] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {[
            { value: '15+', label: isRTL ? 'علامة تجارية' : 'Brands' },
            { value: '100%', label: isRTL ? 'جودة مضمونة' : 'Quality Assured' },
            { value: '50K+', label: isRTL ? 'عميل سعيد' : 'Happy Customers' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center px-8 py-4 bg-white rounded-2xl shadow-md"
            >
              <div className="text-2xl font-bold text-[#153b66]">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
