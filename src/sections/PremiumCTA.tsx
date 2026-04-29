import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Phone, Sparkles, Gift, Percent, Crown, Zap
} from 'lucide-react';
import { WHATSAPP_LINK } from '../lib/contact';

interface PremiumCTAProps {
  isRTL: boolean;
}

export default function PremiumCTA({ isRTL }: PremiumCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const offers = [
    {
      icon: Crown,
      titleAr: 'باقة VIP الشهرية',
      titleEn: 'Monthly VIP Package',
      descAr: 'اشترك واحصل على خصم 15% + توصيل مجاني',
      descEn: 'Subscribe and get 15% off + free delivery',
      badge: isRTL ? 'الأكثر طلباً' : 'Most Popular',
      gradient: 'from-amber-500 via-yellow-400 to-amber-500',
    },
    {
      icon: Gift,
      titleAr: 'عرض الأسرة',
      titleEn: 'Family Bundle',
      descAr: 'وفر 25% عند طلب 20 كرتون أو أكثر',
      descEn: 'Save 25% when ordering 20+ cartons',
      badge: isRTL ? 'وفر أكثر' : 'Best Value',
      gradient: 'from-emerald-500 via-green-400 to-emerald-500',
    },
    {
      icon: Percent,
      titleAr: 'عرض الشركات',
      titleEn: 'Corporate Deal',
      descAr: 'أسعار خاصة وجدول توصيل مخصص لشركتك',
      descEn: 'Special prices and custom delivery schedule',
      badge: isRTL ? 'حصري' : 'Exclusive',
      gradient: 'from-blue-500 via-cyan-400 to-blue-500',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-[#153b66] via-[#12395f] to-[#0c2340]"
      />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(at 20% 30%, rgba(56,189,248,0.15) 0px, transparent 50%),
          radial-gradient(at 80% 70%, rgba(147,51,234,0.1) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(34,211,238,0.08) 0px, transparent 50%)
        `,
      }} />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white/20" />
          </motion.div>
        ))}
      </div>

      <motion.div style={{ scale: cardScale }} className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white rounded-full text-sm font-medium mb-5 border border-white/15 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            {isRTL ? 'لا تفوت هذا' : "Don't Miss This"}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            {isRTL ? (
              <>
                عروض تستاهل <br />
                <motion.span
                  animate={{ backgroundPosition: ['0%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  كل ريال
                </motion.span>
              </>
            ) : (
              <>
                Deals Worth <br />
                <motion.span
                  animate={{ backgroundPosition: ['0%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  Every Riyal
                </motion.span>
              </>
            )}
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            {isRTL
              ? 'اختر الباقة اللي تناسبك ووفر أكثر مع كل طلب. عروض حصرية لعملائنا الجدد والمشتركين.'
              : 'Choose the package that suits you and save more with every order. Exclusive offers for new and subscribed customers.'}
          </p>
        </motion.div>

        {/* Offer Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateY: isRTL ? -3 : 3,
                transition: { duration: 0.3 },
              }}
              style={{ transformPerspective: 1000 }}
              className="group relative bg-white/[0.07] backdrop-blur-lg border border-white/[0.12] rounded-3xl p-6 sm:p-8 overflow-hidden"
            >
              {/* Animated border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `conic-gradient(from 0deg, transparent, rgba(34,211,238,0.3), transparent, rgba(147,51,234,0.3), transparent)`,
                }}
              />
              <div className="absolute inset-[1px] bg-[#0a1628]/80 rounded-3xl" />

              <div className="relative">
                {/* Badge */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${offer.gradient} rounded-full text-xs font-bold text-white mb-5 shadow-lg`}
                >
                  <Sparkles className="w-3 h-3" />
                  {offer.badge}
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                  className={`w-11 h-11 sm:w-16 sm:h-16 bg-gradient-to-br ${offer.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-xl group-hover:shadow-2xl transition-shadow`}
                >
                  <offer.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {isRTL ? offer.titleAr : offer.titleEn}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6">
                  {isRTL ? offer.descAr : offer.descEn}
                </p>

                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl font-medium transition-all text-sm"
                >
                  {isRTL ? 'استفسر الآن' : 'Inquire Now'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#153b66] rounded-full font-bold text-base sm:text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all hover:scale-[1.03]"
            >
              <span>{isRTL ? 'تصفح جميع المنتجات' : 'Browse All Products'}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.div>
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-base sm:text-lg transition-all hover:scale-[1.03] shadow-2xl shadow-green-500/20"
            >
              <Phone className="w-5 h-5" />
              <span>{isRTL ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
            </a>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-sm mt-6"
          >
            {isRTL ? '✨ لا رسوم مخفية • إرجاع سهل • دفع عند الاستلام' : '✨ No hidden fees • Easy returns • Cash on delivery'}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
