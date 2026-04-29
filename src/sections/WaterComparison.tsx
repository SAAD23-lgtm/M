import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, ThermometerSun, Beaker,
  Shield, Leaf, ArrowRight, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WaterComparisonProps {
  isRTL: boolean;
}

type WaterType = 'purified' | 'mineral' | 'spring' | 'alkaline';

const waterTypes: { id: WaterType; nameAr: string; nameEn: string; gradient: string; icon: typeof Droplets }[] = [
  { id: 'purified', nameAr: 'مياه معالجة', nameEn: 'Purified Water', gradient: 'from-sky-400 to-blue-500', icon: Droplets },
  { id: 'mineral', nameAr: 'مياه معدنية', nameEn: 'Mineral Water', gradient: 'from-emerald-400 to-teal-500', icon: Beaker },
  { id: 'spring', nameAr: 'مياه ينابيع', nameEn: 'Spring Water', gradient: 'from-green-400 to-emerald-500', icon: Leaf },
  { id: 'alkaline', nameAr: 'مياه قلوية', nameEn: 'Alkaline Water', gradient: 'from-violet-400 to-purple-500', icon: ThermometerSun },
];

const features = [
  {
    nameAr: 'درجة النقاء',
    nameEn: 'Purity Level',
    purified: { textAr: '99.99%', textEn: '99.99%', highlight: true },
    mineral: { textAr: '99.5%', textEn: '99.5%', highlight: true },
    spring: { textAr: '99.2%', textEn: '99.2%', highlight: true },
    alkaline: { textAr: '99.8%', textEn: '99.8%', highlight: true },
  },
  {
    nameAr: 'معادن طبيعية',
    nameEn: 'Natural Minerals',
    purified: { textAr: 'لا', textEn: 'No', highlight: false },
    mineral: { textAr: 'نعم — غنية', textEn: 'Yes — Rich', highlight: true },
    spring: { textAr: 'نعم — متوسطة', textEn: 'Yes — Moderate', highlight: true },
    alkaline: { textAr: 'نعم — محسّنة', textEn: 'Yes — Enhanced', highlight: true },
  },
  {
    nameAr: 'مستوى الـ pH',
    nameEn: 'pH Level',
    purified: { textAr: '7.0 متعادل', textEn: '7.0 Neutral', highlight: false },
    mineral: { textAr: '7.2 طبيعي', textEn: '7.2 Natural', highlight: false },
    spring: { textAr: '7.4 طبيعي', textEn: '7.4 Natural', highlight: true },
    alkaline: { textAr: '8.5 قلوي', textEn: '8.5 Alkaline', highlight: true },
  },
  {
    nameAr: 'مناسبة للأطفال',
    nameEn: 'Safe for Kids',
    purified: { textAr: 'نعم', textEn: 'Yes', highlight: true },
    mineral: { textAr: 'نعم', textEn: 'Yes', highlight: true },
    spring: { textAr: 'نعم', textEn: 'Yes', highlight: true },
    alkaline: { textAr: 'فوق 3 سنوات', textEn: 'Above 3 yrs', highlight: false },
  },
  {
    nameAr: 'الاستخدام المثالي',
    nameEn: 'Ideal Use',
    purified: { textAr: 'الشرب اليومي', textEn: 'Daily drinking', highlight: true },
    mineral: { textAr: 'الرياضة والطاقة', textEn: 'Sports & Energy', highlight: true },
    spring: { textAr: 'المذاق الطبيعي', textEn: 'Natural taste', highlight: true },
    alkaline: { textAr: 'الصحة والتوازن', textEn: 'Health & Balance', highlight: true },
  },
  {
    nameAr: 'متوفر عندنا',
    nameEn: 'Available Here',
    purified: { textAr: 'نعم', textEn: 'Yes', highlight: true, isCheck: true },
    mineral: { textAr: 'نعم', textEn: 'Yes', highlight: true, isCheck: true },
    spring: { textAr: 'نعم', textEn: 'Yes', highlight: true, isCheck: true },
    alkaline: { textAr: 'نعم', textEn: 'Yes', highlight: true, isCheck: true },
  },
];

export default function WaterComparison({ isRTL }: WaterComparisonProps) {
  const [activeType, setActiveType] = useState<WaterType>('purified');

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#f0f9ff] to-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4"
          >
            <Beaker className="w-4 h-4" />
            {isRTL ? 'دليل المياه' : 'Water Guide'}
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {isRTL ? 'اعرف الفرق بين أنواع المياه' : 'Know the Difference Between Water Types'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {isRTL
              ? 'كل نوع مياه له مميزاته — اختر اللي يناسب احتياجك واحتياج عائلتك'
              : 'Each water type has its advantages — choose what suits your and your family\'s needs'}
          </p>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden lg:block max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gradient-to-r from-gray-50 to-white">
              <div className="p-5 border-b border-gray-100">
                <Shield className="w-6 h-6 text-gray-400 mb-2" />
                <p className="font-bold text-gray-800 text-sm">
                  {isRTL ? 'المواصفات' : 'Feature'}
                </p>
              </div>
              {waterTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 text-center border-b border-gray-100"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`w-12 h-12 mx-auto bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md`}
                  >
                    <type.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="font-bold text-gray-800 text-sm">{isRTL ? type.nameAr : type.nameEn}</p>
                </motion.div>
              ))}
            </div>

            {/* Table Rows */}
            {features.map((feature, fIndex) => (
              <motion.div
                key={fIndex}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: fIndex * 0.05 }}
                className={`grid grid-cols-5 ${fIndex % 2 === 0 ? 'bg-white' : 'bg-[#f8fcff]'} hover:bg-[#edf4fa]/30 transition-colors`}
              >
                <div className="p-4 flex items-center font-medium text-gray-700 text-sm border-r border-gray-50">
                  {isRTL ? feature.nameAr : feature.nameEn}
                </div>
                {waterTypes.map((type) => {
                  const val = feature[type.id] as { textAr: string; textEn: string; highlight: boolean; isCheck?: boolean };
                  return (
                    <div key={type.id} className="p-4 text-center flex items-center justify-center">
                      {val.isCheck ? (
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </motion.div>
                      ) : (
                        <span className={`text-sm font-medium ${val.highlight ? 'text-[#153b66] font-bold' : 'text-gray-500'}`}>
                          {isRTL ? val.textAr : val.textEn}
                        </span>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden">
          {/* Type Selector */}
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory mb-6">
            {waterTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex-shrink-0 snap-center flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeType === type.id
                    ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg`
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <type.icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{isRTL ? type.nameAr : type.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Active Type Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              {(() => {
                const type = waterTypes.find(t => t.id === activeType)!;
                return (
                  <div className={`bg-gradient-to-r ${type.gradient} p-5 text-white text-center`}>
                    <type.icon className="w-8 h-8 mx-auto mb-2 sm:w-10 sm:h-10" />
                    <h3 className="text-xl font-bold">{isRTL ? type.nameAr : type.nameEn}</h3>
                  </div>
                );
              })()}

              {/* Features List */}
              <div className="divide-y divide-gray-50">
                {features.map((feature, fIndex) => {
                  const val = feature[activeType] as { textAr: string; textEn: string; highlight: boolean; isCheck?: boolean };
                  return (
                    <motion.div
                      key={fIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: fIndex * 0.05 }}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <span className="text-sm text-gray-600 font-medium">
                        {isRTL ? feature.nameAr : feature.nameEn}
                      </span>
                      {val.isCheck ? (
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center sm:w-6 sm:h-6">
                          <Check className="w-3 h-3 text-green-600 sm:w-3.5 sm:h-3.5" />
                        </div>
                      ) : (
                        <span className={`text-sm ${val.highlight ? 'text-[#153b66] font-bold' : 'text-gray-500'}`}>
                          {isRTL ? val.textAr : val.textEn}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-14"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#153b66] to-[#2b648c] text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
          >
            <span>{isRTL ? 'اختر مياهك المناسبة' : 'Choose Your Ideal Water'}</span>
            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
