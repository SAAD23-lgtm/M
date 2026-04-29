import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Award, Truck, Headphones, BadgePercent, Droplets, Shield, Clock, Leaf } from 'lucide-react';

export default function Features() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const features = [
    {
      icon: Award,
      title: t('features.quality.title'),
      description: t('features.quality.desc'),
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Truck,
      title: t('features.delivery.title'),
      description: t('features.delivery.desc'),
      color: 'from-[#153b66] to-[#2b648c]',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Headphones,
      title: t('features.support.title'),
      description: t('features.support.desc'),
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: BadgePercent,
      title: t('features.prices.title'),
      description: t('features.prices.desc'),
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
    },
  ];

  const additionalFeatures = [
    { icon: Droplets, text: isRTL ? 'مياه نقية 100%' : '100% Pure Water' },
    { icon: Shield, text: isRTL ? 'معتمدة من الهيئات الصحية' : 'Health Authority Certified' },
    { icon: Clock, text: isRTL ? 'توصيل في نفس اليوم' : 'Same Day Delivery' },
    { icon: Leaf, text: isRTL ? 'صديقة للبيئة' : 'Eco-Friendly' },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#edf4fa] to-white relative overflow-hidden"
    >
      {/* Background Water Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.svg
          className="absolute top-0 left-0 w-full h-32 opacity-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          animate={{ y: [0, 8, 0], opacity: [0.16, 0.24, 0.16] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M0,60 C360,120 1080,0 1440,60 L1440,0 L0,0 Z"
            fill="#153b66"
          />
        </motion.svg>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#153b66]/10 text-[#153b66] rounded-full text-sm font-medium mb-4"
          >
            {isRTL ? 'مميزاتنا' : 'Our Features'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('features.title')}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative ${feature.bgColor} rounded-3xl p-6 overflow-hidden group`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover Effect */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
              />

              {/* Decorative Bubble */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/50 rounded-full blur-xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#153b66] to-[#2b648c] rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 text-white"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { value: '10K+', label: isRTL ? 'طلب شهرياً' : 'Monthly Orders' },
            { value: '50+', label: isRTL ? 'منتج متنوع' : 'Diverse Products' },
            { value: '99%', label: isRTL ? 'عملاء راضون' : 'Satisfied Customers' },
            { value: '24/7', label: isRTL ? 'دعم فني' : 'Technical Support' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#153b66] to-[#2b648c] bg-clip-text text-transparent mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
