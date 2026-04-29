import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, Filter, FlaskConical, TestTubes,
  PackageCheck, Truck, ShieldCheck, Sparkles
} from 'lucide-react';

interface WaterProcessProps {
  isRTL: boolean;
}

const steps = [
  {
    icon: Droplets,
    titleAr: 'استخراج المياه',
    titleEn: 'Water Extraction',
    descAr: 'نستخرج المياه من أعمق الآبار الارتوازية المعتمدة في المملكة، حيث يتم اختيار المصادر بعناية لضمان نقاء طبيعي لا مثيل له.',
    descEn: 'We extract water from the deepest certified artesian wells in the Kingdom, carefully selecting sources to ensure unmatched natural purity.',
    color: 'from-sky-400 to-cyan-500',
    bg: 'bg-sky-50',
    detailAr: 'عمق الآبار يصل إلى 500 متر',
    detailEn: 'Well depth reaches up to 500 meters',
  },
  {
    icon: Filter,
    titleAr: 'الترشيح المتقدم',
    titleEn: 'Advanced Filtration',
    descAr: 'تمر المياه عبر أنظمة ترشيح متعددة المراحل تشمل الترشيح الميكانيكي والكربوني لإزالة الشوائب والرواسب بالكامل.',
    descEn: 'Water passes through multi-stage filtration systems including mechanical and carbon filtration to completely remove impurities and sediments.',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    detailAr: '7 مراحل ترشيح متتالية',
    detailEn: '7 consecutive filtration stages',
  },
  {
    icon: FlaskConical,
    titleAr: 'التعقيم بالأوزون',
    titleEn: 'Ozone Sterilization',
    descAr: 'نستخدم تقنية التعقيم بالأوزون المعتمدة عالمياً للقضاء على 99.99% من البكتيريا والميكروبات دون أي مواد كيميائية.',
    descEn: 'We use internationally certified ozone sterilization technology to eliminate 99.99% of bacteria and microbes without any chemicals.',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    detailAr: 'القضاء على 99.99% من البكتيريا',
    detailEn: '99.99% bacteria elimination',
  },
  {
    icon: TestTubes,
    titleAr: 'فحص الجودة',
    titleEn: 'Quality Testing',
    descAr: 'يخضع كل دفعة إنتاج لأكثر من 20 اختبار جودة مخبري يومي لضمان مطابقة المواصفات السعودية والمعايير الدولية.',
    descEn: 'Each production batch undergoes more than 20 daily laboratory quality tests to ensure compliance with Saudi specifications and international standards.',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50',
    detailAr: '+20 اختبار جودة يومي',
    detailEn: '20+ daily quality tests',
  },
  {
    icon: PackageCheck,
    titleAr: 'التعبئة المعقمة',
    titleEn: 'Sterile Packaging',
    descAr: 'تتم التعبئة في بيئة معقمة بالكامل باستخدام عبوات مصنوعة من مواد صحية معتمدة خالية من BPA وآمنة للاستخدام اليومي.',
    descEn: 'Packaging is done in a fully sterile environment using containers made from certified BPA-free health-grade materials safe for daily use.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    detailAr: 'عبوات خالية من BPA 100%',
    detailEn: '100% BPA-free containers',
  },
  {
    icon: Truck,
    titleAr: 'التوصيل المبرّد',
    titleEn: 'Refrigerated Delivery',
    descAr: 'شاحناتنا المجهزة بأنظمة تبريد متقدمة تضمن وصول المياه إليك في أفضل حالة، مع الحفاظ على درجة الحرارة المثالية طوال الرحلة.',
    descEn: 'Our trucks equipped with advanced cooling systems ensure water reaches you in optimal condition, maintaining the ideal temperature throughout the journey.',
    color: 'from-teal-400 to-cyan-600',
    bg: 'bg-teal-50',
    detailAr: 'توصيل خلال 24 ساعة',
    detailEn: 'Delivery within 24 hours',
  },
];

export default function WaterProcess({ isRTL }: WaterProcessProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  return (
    <section className="overflow-hidden bg-gradient-to-b from-white via-[#f0f9ff] to-white py-12 sm:py-24">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-7 text-center sm:mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#153b66]/10 to-[#2b648c]/10 px-4 py-2 text-sm font-bold text-[#153b66] sm:mb-4"
          >
            <FlaskConical className="w-4 h-4" />
            {isRTL ? 'رحلة النقاء' : 'The Purity Journey'}
          </motion.span>
          <h2 className="mx-auto mb-3 max-w-sm text-2xl font-black leading-tight text-gray-800 sm:mb-4 sm:max-w-none sm:text-3xl md:text-4xl lg:text-5xl">
            {isRTL ? 'كيف نضمن لك أنقى مياه؟' : 'How We Ensure the Purest Water?'}
          </h2>
          <p className="mx-auto max-w-xs text-sm leading-7 text-gray-600 sm:max-w-2xl sm:text-lg">
            {isRTL
              ? 'رحلة من 6 مراحل دقيقة تبدأ من باطن الأرض وتنتهي عند عتبة بابك'
              : 'A journey of 6 precise stages from deep underground to your doorstep'}
          </p>
        </motion.div>

        {/* Step Selector - Horizontal Scroll on Mobile */}
        <div className="mb-6 sm:mb-12">
          <div className="grid grid-cols-2 gap-2 min-[460px]:grid-cols-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex min-w-0 items-center justify-between gap-2 rounded-2xl px-3 py-3 text-start text-xs font-extrabold transition-all duration-300 sm:flex-shrink-0 sm:justify-center sm:gap-2.5 sm:px-5 sm:text-base ${
                  activeStep === index
                    ? 'bg-gradient-to-r from-[#153b66] to-[#2b648c] text-white shadow-lg shadow-[#153b66]/25'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#153b66]/30 hover:bg-[#edf4fa]'
                }`}
              >
                <step.icon className="h-3.5 w-3.5 flex-shrink-0 sm:h-5 sm:w-5" />
                <span className="min-w-0 flex-1 truncate sm:flex-none">{isRTL ? step.titleAr : step.titleEn}</span>
                <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:h-6 sm:w-6 sm:text-xs ${
                  activeStep === index ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {index + 1}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center justify-center gap-1 mt-4">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index <= activeStep ? 'bg-gradient-to-r from-[#153b66] to-[#2b648c]' : 'bg-gray-200'
                }`}
                animate={{ width: index === activeStep ? 48 : 16 }}
              />
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid items-center gap-5 sm:gap-8 lg:grid-cols-[1fr_1.2fr]"
          >
            {/* Visual Side */}
            <div className={`relative flex min-h-[210px] items-center justify-center overflow-hidden rounded-[1.6rem] ${currentStep.bg} p-6 sm:min-h-[380px] sm:rounded-3xl sm:p-12`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `radial-gradient(circle, #153b66 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />
              
              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute right-5 top-5 sm:right-12 sm:top-12"
              >
                <ShieldCheck className="w-6 h-6 text-[#153b66]/20 sm:w-8 sm:h-8" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-5 left-5 sm:bottom-12 sm:left-12"
              >
                <Sparkles className="w-5 h-5 text-[#2b648c]/20 sm:w-6 sm:h-6" />
              </motion.div>

              {/* Main Icon */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className={`flex h-20 w-20 items-center justify-center rounded-[1.35rem] bg-gradient-to-br ${currentStep.color} shadow-2xl sm:h-36 sm:w-36 sm:rounded-3xl`}
                >
                  <currentStep.icon className="h-10 w-10 text-white sm:h-16 sm:w-16" />
                </motion.div>
                
                {/* Step Number Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-lg sm:h-12 sm:w-12"
                >
                  <span className="text-base sm:text-xl font-bold bg-gradient-to-br from-[#153b66] to-[#2b648c] bg-clip-text text-transparent">
                    {activeStep + 1}
                  </span>
                </motion.div>

                {/* Detail Bubble */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-5 left-1/2 w-[min(82vw,18rem)] -translate-x-1/2 rounded-full bg-white px-3 py-2 text-center text-[11px] font-bold leading-5 text-[#153b66] shadow-md sm:-bottom-4 sm:w-auto sm:whitespace-nowrap sm:px-4 sm:text-sm"
                >
                  {isRTL ? currentStep.detailAr : currentStep.detailEn}
                </motion.div>
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#153b66] sm:text-sm">
                    {isRTL ? `المرحلة ${activeStep + 1} من 6` : `Step ${activeStep + 1} of 6`}
                  </span>
                  <h3 className="mt-2 text-2xl font-black text-gray-800 sm:text-3xl">
                    {isRTL ? currentStep.titleAr : currentStep.titleEn}
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 text-sm leading-7 text-gray-600 sm:mt-4 sm:text-lg sm:leading-relaxed"
                >
                  {isRTL ? currentStep.descAr : currentStep.descEn}
                </motion.p>
              </div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-2.5 sm:gap-3"
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                  <ShieldCheck className="w-4 h-4 text-green-500 mb-2 sm:w-5 sm:h-5" />
                  <p className="text-xs text-gray-500">{isRTL ? 'معتمد من' : 'Certified by'}</p>
                  <p className="text-sm font-bold text-gray-800">SFDA & ISO</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
                  <Sparkles className="w-4 h-4 text-amber-500 mb-2 sm:w-5 sm:h-5" />
                  <p className="text-xs text-gray-500">{isRTL ? 'معيار الجودة' : 'Quality Standard'}</p>
                  <p className="text-sm font-bold text-gray-800">HACCP & GMP</p>
                </div>
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-2.5 pt-1 sm:gap-3 sm:pt-2"
              >
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30 sm:text-base"
                >
                  {isRTL ? 'المرحلة السابقة' : 'Previous Step'}
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#153b66] to-[#2b648c] py-3 text-sm font-bold text-white transition-all hover:shadow-lg disabled:opacity-30 sm:text-base"
                >
                  {isRTL ? 'المرحلة التالية' : 'Next Step'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
