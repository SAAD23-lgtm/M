import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Droplets, Waves, Snowflake, Wind, Sun, Mountain } from 'lucide-react';

interface ParallaxShowcaseProps {
  isRTL: boolean;
}

const waterFacts = [
  {
    icon: Droplets,
    titleAr: 'نقاء لا مثيل له',
    titleEn: 'Unmatched Purity',
    valueAr: '99.99%',
    valueEn: '99.99%',
    descAr: 'درجة نقاء المياه بعد المعالجة السباعية',
    descEn: 'Water purity after 7-stage treatment',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Snowflake,
    titleAr: 'درجة التخزين',
    titleEn: 'Storage Temperature',
    valueAr: '4°C',
    valueEn: '4°C',
    descAr: 'نحافظ على مياهك باردة طوال رحلة التوصيل',
    descEn: 'We keep your water cold throughout delivery',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Mountain,
    titleAr: 'عمق المصدر',
    titleEn: 'Source Depth',
    valueAr: '500م',
    valueEn: '500m',
    descAr: 'من أعماق الآبار الارتوازية المعتمدة',
    descEn: 'From certified deep artesian wells',
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    icon: Wind,
    titleAr: 'سرعة التعبئة',
    titleEn: 'Filling Speed',
    valueAr: '12K',
    valueEn: '12K',
    descAr: 'عبوة في الساعة بخطوط إنتاج متقدمة',
    descEn: 'Bottles per hour with advanced lines',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Sun,
    titleAr: 'حماية من الأشعة',
    titleEn: 'UV Protection',
    valueAr: '100%',
    valueEn: '100%',
    descAr: 'عبوات محمية من أشعة الشمس الضارة',
    descEn: 'Bottles protected from harmful UV rays',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Waves,
    titleAr: 'معادن طبيعية',
    titleEn: 'Natural Minerals',
    valueAr: '20+',
    valueEn: '20+',
    descAr: 'معدن أساسي متوازن في كل قطرة',
    descEn: 'Essential balanced minerals in every drop',
    gradient: 'from-rose-400 to-pink-500',
  },
];

export default function ParallaxShowcase({ isRTL }: ParallaxShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), { stiffness: 100, damping: 30 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), { stiffness: 100, damping: 30 });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#0e2a4a]">
      {/* Animated Water Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Parallax Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-20 top-20 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-16 top-1/3 w-56 h-56 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute left-1/3 bottom-10 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
      />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header with parallax */}
        <motion.div
          style={{ scale }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 'auto' }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 rounded-full text-sm font-medium mb-5 border border-cyan-500/20 backdrop-blur-sm overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Droplets className="w-4 h-4" />
              </motion.div>
              {isRTL ? 'حقائق مائية مذهلة' : 'Amazing Water Facts'}
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {isRTL ? (
                <>
                  أرقام تكشف <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    سر النقاء
                  </span>
                </>
              ) : (
                <>
                  Numbers That Reveal <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    The Secret of Purity
                  </span>
                </>
              )}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {isRTL
                ? 'كل رقم من هذه الأرقام يعكس التزامنا العميق بتقديم أنقى وأجود المياه لك ولعائلتك'
                : 'Each of these numbers reflects our deep commitment to providing the purest and finest water for you and your family'}
            </p>
          </motion.div>
        </motion.div>

        {/* Facts Grid with staggered parallax */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {waterFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.7, type: 'spring' }}
              whileHover={{
                y: -12,
                scale: 1.04,
                rotateY: isRTL ? -3 : 3,
                transition: { duration: 0.3 },
              }}
              style={{ transformPerspective: 1000 }}
              className="group relative bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-3xl p-5 sm:p-7 overflow-hidden cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${fact.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`}
              />

              {/* Animated Border Gradient */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.15), transparent, rgba(14,165,233,0.15))',
                }}
              />

              <div className="relative">
                {/* Icon with pulse */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br ${fact.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/10 group-hover:shadow-cyan-500/25 transition-shadow`}
                >
                  <fact.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </motion.div>

                {/* Value with count-up effect */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight"
                >
                  {isRTL ? fact.valueAr : fact.valueEn}
                </motion.div>

                <h3 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {isRTL ? fact.titleAr : fact.titleEn}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {isRTL ? fact.descAr : fact.descEn}
                </p>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-5 right-5 w-7 h-7 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity sm:w-8 sm:h-8"
                >
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg className={`w-3.5 h-3.5 text-cyan-300 sm:w-4 sm:h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <motion.div
            style={{ rotate }}
            className="flex justify-center -mt-4"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 sm:w-8 sm:h-8"
            >
              <Droplets className="w-3.5 h-3.5 text-white sm:w-4 sm:h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
