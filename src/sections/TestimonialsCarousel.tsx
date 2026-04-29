import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Verified } from 'lucide-react';

interface TestimonialsCarouselProps {
  isRTL: boolean;
}

const testimonials = [
  {
    nameAr: 'أحمد بن سالم المطيري',
    nameEn: 'Ahmed Al-Mutairi',
    roleAr: 'مالك مطعم — الرياض',
    roleEn: 'Restaurant Owner — Riyadh',
    rating: 5,
    textAr: 'تعاملنا مع متجر ريق من أول يوم فتحنا فيه المطعم. المياه دائماً طازجة والتوصيل ما يتأخر أبداً. الحين نطلب أسبوعياً وما نفكر نغير الموزع.',
    textEn: 'We\'ve been working with Riq Store since the first day we opened our restaurant. Water is always fresh and delivery never delays. We now order weekly and never think of changing the distributor.',
    avatar: 'أ',
    verified: true,
  },
  {
    nameAr: 'نورة بنت عبدالرحمن',
    nameEn: 'Noura Al-Rahman',
    roleAr: 'ربة منزل — الرياض',
    roleEn: 'Homemaker — Riyadh',
    rating: 5,
    textAr: 'جربت كثير موزعين قبل كذا وكلهم يتأخرون أو يغلطون بالطلب. متجر ريق مختلف — الخدمة سريعة والأسعار ممتازة والتغليف نظيف. عيالي يحبون مياه نوفا وبيرين وكلها متوفرة.',
    textEn: 'I tried many distributors before and they all delayed or messed up orders. Riq Store is different — fast service, excellent prices, and clean packaging. My kids love Nova and Berain water and they\'re all available.',
    avatar: 'ن',
    verified: true,
  },
  {
    nameAr: 'خالد بن فهد العتيبي',
    nameEn: 'Khaled Al-Otaibi',
    roleAr: 'مدير مكتب — الرياض',
    roleEn: 'Office Manager — Riyadh',
    rating: 5,
    textAr: 'اشتركنا بالباقة الشهرية للمكتب وكل شهر يوصلون الكمية المطلوبة بالضبط. وفرنا تقريباً 20% مقارنة بالشراء العادي. أنصح كل الشركات يجربونهم.',
    textEn: 'We subscribed to the monthly package for the office and every month they deliver the exact quantity. We saved about 20% compared to regular purchases. I recommend all companies to try them.',
    avatar: 'خ',
    verified: true,
  },
  {
    nameAr: 'سارة بنت محمد الحربي',
    nameEn: 'Sarah Al-Harbi',
    roleAr: 'منظمة فعاليات — الرياض',
    roleEn: 'Event Planner — Riyadh',
    rating: 5,
    textAr: 'ننسق معاهم لكل فعالياتنا ومناسباتنا. يوفرون كميات كبيرة بأسعار جملة ممتازة والتوصيل دائماً قبل الموعد. فريقهم متعاون ومحترف جداً.',
    textEn: 'We coordinate with them for all our events and occasions. They provide large quantities at excellent wholesale prices and delivery is always ahead of schedule. Their team is very cooperative and professional.',
    avatar: 'س',
    verified: true,
  },
  {
    nameAr: 'فهد بن ناصر الشمري',
    nameEn: 'Fahad Al-Shamri',
    roleAr: 'مدير فندق — الرياض',
    roleEn: 'Hotel Manager — Riyadh',
    rating: 5,
    textAr: 'الفندق يحتاج كميات ضخمة يومياً خاصة بموسم العمرة والحج. متجر ريق ما خذلنا ولا مرة — دائماً الكمية جاهزة والجودة ثابتة.',
    textEn: 'The hotel needs huge quantities daily especially during Umrah and Hajj seasons. Riq Store never let us down — the quantity is always ready and quality is consistent.',
    avatar: 'ف',
    verified: true,
  },
  {
    nameAr: 'عبدالعزيز بن علي الرشيد',
    nameEn: 'Abdulaziz Al-Rashid',
    roleAr: 'صاحب مقهى — الرياض',
    roleEn: 'Cafe Owner — Riyadh',
    rating: 5,
    textAr: 'جودة مياه متجر ريق تفرق كثير في طعم القهوة المختصة عندنا. العملاء لاحظوا الفرق والخدمة تجمل وتوصل في وقت قياسي. شكراً لكم على الاحترافية.',
    textEn: 'The quality of Riq Store water makes a big difference in our specialty coffee. Customers noticed the difference and the service is great and arrives in record time. Thank you for your professionalism.',
    avatar: 'ع',
    verified: true,
  },
  {
    nameAr: 'ليلى بنت سلطان القحطاني',
    nameEn: 'Layla Al-Qahtani',
    roleAr: 'طبيبة — الرياض',
    roleEn: 'Physician — Riyadh',
    rating: 5,
    textAr: 'كمختصة أهتم جداً بجودة ونقاء المياه لعائلتي. متجر ريق يوفر خيارات ممتازة وبأسعار تنافسية. تطبيق سهل وتجربة مستخدم رائعة.',
    textEn: 'As a specialist, I care deeply about the quality and purity of water for my family. Riq Store provides excellent options at competitive prices. Easy app and great user experience.',
    avatar: 'ل',
    verified: true,
  },
  {
    nameAr: 'سلطان بن عبدالله السديري',
    nameEn: 'Sultan Al-Sudairi',
    roleAr: 'مسؤول مبيعات — الرياض',
    roleEn: 'Sales Manager — Riyadh',
    rating: 5,
    textAr: 'التزام بالمواعيد وخدمة عملاء راقية. متجر ريق هو خيارنا الأول دائماً للبيت والمكتب. التنوع في الماركات المتوفرة يريحنا كثير.',
    textEn: 'Commitment to schedule and high-end customer service. Riq Store is always our first choice for home and office. The variety of available brands makes it easy for us.',
    avatar: 'س',
    verified: true,
  },
  {
    nameAr: 'مريم بنت صقر التميمي',
    nameEn: 'Maryam Al-Tamimi',
    roleAr: 'مُصممة جرافيك — الرياض',
    roleEn: 'Graphic Designer — Riyadh',
    rating: 5,
    textAr: 'أفضل شيء في متجر ريق هو سهولة الطلب وسرعة التوصيل. التصميم والموقع يفتحون النفس للتعامل معاهم، وكل شيء منظم وواضح.',
    textEn: 'The best thing about Riq Store is the ease of ordering and fast delivery. The design and website are welcoming to deal with, and everything is organized and clear.',
    avatar: 'م',
    verified: true,
  },
  {
    nameAr: 'إبراهيم بن صالح المحمد',
    nameEn: 'Ibrahim Al-Mohammad',
    roleAr: 'مدير عمليات — الرياض',
    roleEn: 'Operations Manager — Riyadh',
    rating: 5,
    textAr: 'التوصيل إلى مقرنا في جنوب الرياض كان سريع جداً. الأسعار ممتازة لطلبيات الجملة والتغليف كان ممتاز. أنصح فيه بقوة.',
    textEn: 'Delivery to our location in South Riyadh was very fast. Prices are excellent for wholesale orders and the packaging was great. I highly recommend it.',
    avatar: 'إ',
    verified: true,
  },
  {
    nameAr: 'هدى بنت علي الشهراني',
    nameEn: 'Huda Al-Shahrani',
    roleAr: 'معلمة — الرياض',
    roleEn: 'Teacher — Riyadh',
    rating: 5,
    textAr: 'جربت الطلب عن طريق الموقع وكان سهل جداً. الخدمة ممتازة والمياه وصلت لباب البيت في نفس اليوم. شكرًا لمتجر ريق.',
    textEn: 'I tried ordering through the website and it was very easy. The service is excellent and the water reached the door of the house on the same day. Thank you, Riq Store.',
    avatar: 'ه',
    verified: true,
  },
  {
    nameAr: 'رائد بن محمد الشتوي',
    nameEn: 'Raed Al-Shetwi',
    roleAr: 'موظف حكومي — الرياض',
    roleEn: 'Government Employee — Riyadh',
    rating: 5,
    textAr: 'كثير من الشركات تماطل في التوصيل، لكن متجر ريق دقيق جداً في مواعيده. خدمة العملاء عندهم سريعة الاستجابة.',
    textEn: 'Many companies stall in delivery, but Riq Store is very precise with its delivery times. Their customer service is very responsive.',
    avatar: 'ر',
    verified: true,
  },
  {
    nameAr: 'منال بنت حسن الزهراني',
    nameEn: 'Manal Al-Zahrani',
    roleAr: 'أخصائية تغذية — الرياض',
    roleEn: 'Nutritionist — Riyadh',
    rating: 5,
    textAr: 'الجودة هي المعيار الأساسي عندي، ومتجر ريق يوفر أنقى أنواع المياه في السوق. التنوع في الأحجام والماركات ممتاز جداً.',
    textEn: 'Quality is my main criterion, and Riq Store provides the purest types of water in the market. The variety of sizes and brands is very excellent.',
    avatar: 'م',
    verified: true,
  },
  {
    nameAr: 'بندر بن خالد الشمري',
    nameEn: 'Bandar Al-Shamri',
    roleAr: 'مدير مشتريات — الرياض',
    roleEn: 'Procurement Manager — Riyadh',
    rating: 5,
    textAr: 'خدمة دقيقة ومنظمة. نعتمد عليهم في تزويد شركتنا بالمياه أسبوعياً والتعامل معاهم مريح جداً وبدون أي تعقيدات.',
    textEn: 'Precise and organized service. We rely on them to provide our company with water weekly and dealing with them is very comfortable and without any complications.',
    avatar: 'ب',
    verified: true,
  },
  {
    nameAr: 'ريم بنت فهد الدوسري',
    nameEn: 'Reem Al-Dossari',
    roleAr: 'رائدة أعمال — الرياض',
    roleEn: 'Entrepreneur — Riyadh',
    rating: 5,
    textAr: 'أفضل تجربة طلب مياه أونلاين. التصميم مريح للعين، الدفع سهل، والتوصيل سريع جداً. فخورين بوجود مثل هذه الخدمات الاحترافية.',
    textEn: 'Best online water ordering experience. The design is eye-friendly, payment is easy, and delivery is very fast. Proud to have such professional services.',
    avatar: 'ر',
    verified: true,
  },
];

export default function TestimonialsCarousel({ isRTL }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, []);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 5000);
  };

  const handleNext = () => { next(); resetAutoPlay(); };
  const handlePrev = () => { prev(); resetAutoPlay(); };

  const t = testimonials[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -8 : 8,
    }),
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-[#153b66] via-[#1f4f7b] to-[#0c2340] overflow-hidden relative">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-cyan-300/20 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        />
        {/* Floating quote marks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.03] pointer-events-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              fontSize: `${60 + i * 20}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{ duration: 5 + i, repeat: Infinity }}
          >
            "
          </motion.div>
        ))}
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-5 border border-white/15 backdrop-blur-sm"
          >
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            {isRTL ? 'تجارب حقيقية' : 'Real Experiences'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {isRTL ? 'عملاؤنا يتحدثون عنّا' : 'Our Customers Talk About Us'}
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            {isRTL
              ? 'تجارب حقيقية من عملاء يثقون بنا لتوفير المياه النقية لعائلاتهم وأعمالهم'
              : 'Real experiences from customers who trust us to provide pure water for their families and businesses'}
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[360px] sm:min-h-[320px]" style={{ perspective: 1000 }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80) { handlePrev(); }
                  else if (info.offset.x < -80) { handleNext(); }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/[0.08] backdrop-blur-lg border border-white/[0.12] rounded-3xl p-6 sm:p-10 h-full flex flex-col justify-between">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-300/40 mb-4" />
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/95 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 flex-1"
                  >
                    {isRTL ? t.textAr : t.textEn}
                  </motion.p>

                  {/* Author & Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar with animated ring */}
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-300/30"
                          style={{ padding: -2 }}
                        />
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-cyan-500/20 sm:text-2xl">
                          {t.avatar}
                        </div>
                        {t.verified && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#153b66] sm:w-6 sm:h-6"
                          >
                            <Verified className="w-3 h-3 text-white sm:w-3.5 sm:h-3.5" />
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-bold text-base sm:text-lg">
                          {isRTL ? t.nameAr : t.nameEn}
                        </p>
                        <p className="text-white/60 text-sm">
                          {isRTL ? t.roleAr : t.roleEn}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + i * 0.08, type: 'spring' }}
                        >
                          <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev / Next */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm border border-white/10 sm:w-12 sm:h-12"
              >
                <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm border border-white/10 sm:w-12 sm:h-12"
              >
                <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                    resetAutoPlay();
                  }}
                  whileHover={{ scale: 1.3 }}
                  className="relative"
                >
                  <div className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === current
                      ? 'w-8 bg-gradient-to-r from-cyan-300 to-blue-300'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`} />
                  {index === current && (
                    <motion.div
                      layoutId="activeTestimonialDot"
                      className="absolute inset-0 h-2.5 w-8 rounded-full bg-gradient-to-r from-cyan-300 to-blue-300"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
