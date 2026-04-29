import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      role: isRTL ? 'صاحب مطعم' : 'Restaurant Owner',
      avatar: 'A',
      rating: 5,
      text: isRTL
        ? 'أفضل خدمة توصيل للمياه في المملكة! سرعة في التوصيل وجودة عالية في المنتجات. أنصح الجميع بالتعامل معهم.'
        : 'The best water delivery service in the Kingdom! Fast delivery and high-quality products. I recommend everyone to deal with them.',
    },
    {
      id: 2,
      name: isRTL ? 'سارة عبدالله' : 'Sara Abdullah',
      role: isRTL ? 'ربة منزل' : 'Housewife',
      avatar: 'S',
      rating: 5,
      text: isRTL
        ? 'جودة عالية وأسعار ممتازة. المياه نقية وطعمها رائع. خدمة العملاء ممتازة ويستجيبون بسرعة لجميع الاستفسارات.'
        : 'High quality and excellent prices. The water is pure and tastes great. Excellent customer service and quick response to all inquiries.',
    },
    {
      id: 3,
      name: isRTL ? 'خالد العمري' : 'Khalid Al-Amri',
      role: isRTL ? 'مدير شركة' : 'Company Manager',
      avatar: 'K',
      rating: 5,
      text: isRTL
        ? 'خدمة عملاء رائعة وسريعة. نتعامل معهم منذ سنوات ولم نواجه أي مشاكل. التوصيل دائماً في الموعد.'
        : 'Great and fast customer service. We have been dealing with them for years without any issues. Delivery is always on time.',
    },
    {
      id: 4,
      name: isRTL ? 'فاطمة الزهراني' : 'Fatima Al-Zahrani',
      role: isRTL ? 'طبيبة' : 'Doctor',
      avatar: 'F',
      rating: 5,
      text: isRTL
        ? 'كطبيبة، أهتم كثيراً بجودة المياه التي أشربها. مياه متجر ريق نقية وآمنة ومثالية للصحة.'
        : 'As a doctor, I care a lot about the quality of water I drink. Riq Store water is pure, safe, and ideal for health.',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-[#edf4fa] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
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
            {isRTL ? 'آراء العملاء' : 'Customer Reviews'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Wave Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.svg
              viewBox="0 0 800 400"
              className="w-full h-full opacity-10"
              preserveAspectRatio="none"
              animate={{ x: [0, 12, 0], opacity: [0.08, 0.14, 0.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M0,200 Q200,100 400,200 T800,200"
                fill="none"
                stroke="#153b66"
                strokeWidth="2"
              />
            </motion.svg>
          </div>

          {/* Testimonial Cards */}
          <div className="relative h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 h-full flex flex-col items-center justify-center text-center">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-gradient-to-br from-[#153b66] to-[#2b648c] rounded-full flex items-center justify-center mb-6"
                  >
                    <Quote className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl"
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#153b66] to-[#2b648c] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-800">
                        {testimonials[activeIndex].name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[activeIndex].role}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#153b66] hover:bg-[#153b66] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-[#153b66]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#153b66] hover:bg-[#153b66] hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Floating Avatars */}
        <div className="relative mt-16">
          <div className="flex justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -10 }}
                onClick={() => setActiveIndex(index)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-all ${
                  index === activeIndex
                    ? 'bg-gradient-to-br from-[#153b66] to-[#2b648c] ring-4 ring-[#153b66]/30'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                {testimonial.avatar}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
