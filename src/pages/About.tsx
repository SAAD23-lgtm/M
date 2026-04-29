import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { 
  Target, Eye, Heart, Award, Users, 
  Check, ArrowRight, Droplets,
  Zap, Shield, Calendar, Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_NAME_AR, BRAND_NAME_EN } from '../lib/brand';
import LogoMark from '../components/LogoMark';
import { brands, products } from '../data/products';
import TrustBadges from '../sections/TrustBadges';
import WaterProcess from '../sections/WaterProcess';

export default function About() {
  const { i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';
  const fullBleedSectionClassName = '-mx-3 sm:-mx-4 lg:-mx-8 xl:-mx-16';

  const values = [
    { 
      icon: Heart, 
      title: isRTL ? 'الجودة أولاً' : 'Quality First', 
      desc: isRTL ? 'نلتزم بأعلى معايير الجودة في جميع منتجاتنا ونضمن نقاء المياه 100%' : 'We adhere to the highest quality standards in all our products and guarantee 100% water purity',
      color: 'from-red-400 to-red-600'
    },
    { 
      icon: Users, 
      title: isRTL ? 'رضا العملاء' : 'Customer Satisfaction', 
      desc: isRTL ? 'نسعى دائماً لتحقيق رضا عملائنا وتجاوز توقعاتهم في كل طلب' : 'We always strive to achieve customer satisfaction and exceed their expectations with every order',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      icon: Shield, 
      title: isRTL ? 'الموثوقية' : 'Reliability', 
      desc: isRTL ? 'نحن شريك موثوق يمكن الاعتماد عليه دائماً لتوفير المياه في الوقت المحدد' : 'We are a reliable partner you can always count on to provide water on time',
      color: 'from-green-400 to-green-600'
    },
    { 
      icon: Zap, 
      title: isRTL ? 'الابتكار' : 'Innovation', 
      desc: isRTL ? 'نسعى دائماً للتطوير ومواكبة أحدث التقنيات في مجال المياه المعبأة' : 'We always strive for development and keeping up with the latest technologies in bottled water',
      color: 'from-yellow-400 to-orange-500'
    },
  ];

  const stats = [
    { value: '10+', label: isRTL ? 'سنوات من الخبرة' : 'Years of Experience', icon: Calendar },
    { value: '50K+', label: isRTL ? 'عميل سعيد' : 'Happy Customers', icon: Users },
    { value: `${products.length}+`, label: isRTL ? 'منتج متنوع' : 'Diverse Products', icon: Droplets },
    { value: `${brands.length}+`, label: isRTL ? 'علامة تجارية' : 'Brands', icon: Award },
  ];

  const milestones = [
    { year: '2014', title: isRTL ? 'تأسيس الشركة' : 'Company Founded', desc: isRTL ? 'بدأنا رحلتنا في تقديم أفضل المياه المعبأة في الرياض' : 'We started our journey in providing the best bottled water in Riyadh' },
    { year: '2016', title: isRTL ? 'التوسع الأول' : 'First Expansion', desc: isRTL ? 'أضفنا 5 علامات تجارية جديدة إلى محفظتنا ووسعنا فريقنا' : 'We added 5 new brands to our portfolio and expanded our team' },
    { year: '2018', title: isRTL ? 'خدمة التوصيل' : 'Delivery Service', desc: isRTL ? 'أطلقنا خدمة التوصيل لجميع مناطق المملكة العربية السعودية' : 'We launched delivery service to all regions of Saudi Arabia' },
    { year: '2020', title: isRTL ? 'التوسع الرقمي' : 'Digital Expansion', desc: isRTL ? 'أطلقنا منصتنا الإلكترونية لتسهيل الطلبات للعملاء' : 'We launched our online platform to facilitate orders for customers' },
    { year: '2024', title: isRTL ? 'الريادة في السوق' : 'Market Leadership', desc: isRTL ? 'أصبحنا من أكبر موزعي المياه في المملكة مع أكثر من 50 ألف عميل' : 'We became one of the largest water distributors in the Kingdom with over 50,000 customers' },
  ];

  const team = [
    { name: isRTL ? 'أحمد العلي' : 'Ahmed Al-Ali', role: isRTL ? 'المؤسس والمدير التنفيذي' : 'Founder & CEO', image: 'A' },
    { name: isRTL ? 'سارة محمد' : 'Sarah Mohammed', role: isRTL ? 'مديرة العمليات' : 'Operations Manager', image: 'S' },
    { name: isRTL ? 'خالد عبدالله' : 'Khaled Abdullah', role: isRTL ? 'مدير المبيعات' : 'Sales Manager', image: 'K' },
    { name: isRTL ? 'نورة أحمد' : 'Noura Ahmed', role: isRTL ? 'مديرة خدمة العملاء' : 'Customer Service Manager', image: 'N' },
  ];

  const certifications = [
    { name: isRTL ? 'ISO 22000' : 'ISO 22000', desc: isRTL ? 'نظام إدارة سلامة الغذاء' : 'Food Safety Management' },
    { name: isRTL ? 'GMP' : 'GMP', desc: isRTL ? 'الممارسات التصنيعية الجيدة' : 'Good Manufacturing Practice' },
    { name: isRTL ? 'HACCP' : 'HACCP', desc: isRTL ? 'نظام تحليل المخاطر' : 'Hazard Analysis System' },
    { name: isRTL ? 'SFDA' : 'SFDA', desc: isRTL ? 'الهيئة العامة للغذاء والدواء' : 'Saudi Food & Drug Authority' },
  ];

  const experiencePillars = [
    {
      title: isRTL ? 'سلسلة توريد مضبوطة' : 'Controlled supply chain',
      desc: isRTL ? 'نراجع التوريد والتخزين والتوصيل كمسار واحد لضمان تجربة ثابتة ومريحة.' : 'We treat sourcing, storage, and delivery as one controlled journey to keep the experience consistent.',
      accent: 'from-cyan-400 to-sky-500',
    },
    {
      title: isRTL ? 'اختيار ذكي للعلامات' : 'Smarter brand curation',
      desc: isRTL ? 'لا نضيف أي علامة فقط لزيادة العدد، بل نختار ما يغطي الاستخدام اليومي والمناسبات وطلبات الشركات.' : 'We do not add brands just for quantity, but to cover daily use, events, and business needs.',
      accent: 'from-emerald-400 to-teal-500',
    },
    {
      title: isRTL ? 'خدمة تبني الثقة' : 'Trust-building service',
      desc: isRTL ? 'نهتم بسرعة الرد ووضوح المعلومات لأن تجربة العميل لا تقل أهمية عن جودة المنتج نفسه.' : 'We care about response speed and clarity because service quality matters as much as product quality.',
      accent: 'from-indigo-400 to-blue-600',
    },
  ];

  return (
    <main ref={sectionRef} className="min-h-screen relative z-10 py-16 sm:py-20">
      <div className="w-full px-3 sm:px-4 lg:px-8 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            className="inline-block px-4 py-2 bg-[#153b66]/10 text-[#153b66] rounded-full text-sm font-medium mb-4"
          >
            {isRTL ? 'من نحن' : 'About Us'}
          </motion.span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 flex flex-col items-center gap-6">
            <div className="w-36 h-36 sm:h-44 sm:w-44 rounded-[2rem] bg-[#1E4B6F] flex items-center justify-center overflow-hidden shadow-2xl shadow-[#153b66]/18 border border-[#d8e6f3] ring-1 ring-[#edf4fa] hover:scale-105 transition-transform duration-500">
              <LogoMark
                variant="trimmed"
                size="h-full w-full"
                className="rounded-[2rem]"
              />
            </div>
            <span className="flex flex-col items-center gap-2 leading-none">
              <span>{BRAND_NAME_EN}</span>
              <span className="text-lg sm:text-2xl font-bold text-[#153b66]">{BRAND_NAME_AR}</span>
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            {isRTL 
              ? 'وجهتك الأولى للمياه المعبأة عالية الجودة في المملكة العربية السعودية. نقدم تشكيلة واسعة من أفضل العلامات التجارية العالمية والمحلية مع خدمة توصيل سريعة وموثوقة.'
              : 'Your first destination for high-quality bottled water in Saudi Arabia. We offer a wide range of the best international and local brands with fast and reliable delivery service.'}
          </p>
        </motion.div>

        {/* Experience Layers */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="mb-12 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#153b66] via-[#1f4f7b] to-[#5a87aa] p-6 text-white shadow-[0_25px_70px_-30px_rgba(21,59,102,0.6)] sm:p-8">
            <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                <Droplets className="h-4 w-4" />
                <span>{isRTL ? 'عمق أكثر في قصة العلامة' : 'More depth in the brand story'}</span>
              </div>
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                {isRTL ? 'لسنا مجرد متجر مياه، بل تجربة منظمة من التوريد حتى وصول الطلب' : 'We are not just a water store, but an organized experience from sourcing to doorstep delivery'}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                {isRTL
                  ? 'هذه الصفحة صُممت لتُظهر كيف نفكر في الجودة والخدمة والثقة كمنظومة واحدة، وليس كعناصر منفصلة. كل مرحلة في الرحلة لها معيار واضح وتجربة مقصودة.'
                  : 'This page was designed to show how we think of quality, service, and trust as one system, not separate ideas. Every stage of the journey follows a clear standard and an intentional experience.'}
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {experiencePillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.32 + index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-[1.7rem] border border-sky-100 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]"
              >
                <div className={`mb-3 h-2 w-24 rounded-full bg-gradient-to-r ${pillar.accent}`} />
                <h3 className="mb-2 text-lg font-bold text-gray-900">{pillar.title}</h3>
                <p className="text-sm leading-7 text-gray-500">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index + 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-[#153b66] to-[#2b648c] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-white"
            >
              <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 opacity-80" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg"
          >
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#edf4fa] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Eye className="w-5 h-5 sm:w-8 sm:h-8 text-[#153b66]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              {isRTL ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {isRTL 
                ? 'أن نكون الوجهة الأولى والأكثر موثوقية في توفير المياه المعبأة عالية الجودة في المملكة العربية السعودية، وأن نساهم في تحسين جودة الحياة من خلال توفير مياه نقية وصحية لجميع الأسر والمؤسسات في جميع أنحاء المملكة.'
                : 'To be the first and most reliable destination for providing high-quality bottled water in Saudi Arabia, and to contribute to improving the quality of life by providing pure and healthy water for all families and institutions throughout the Kingdom.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg"
          >
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#edf4fa] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <Target className="w-5 h-5 sm:w-8 sm:h-8 text-[#153b66]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              {isRTL ? 'مهمتنا' : 'Our Mission'}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {isRTL 
                ? 'توفير مياه معبأة عالية الجودة من أفضل العلامات التجارية العالمية والمحلية، مع ضمان خدمة توصيل سريعة وموثوقة، والحفاظ على أعلى معايير الجودة والسلامة في جميع مراحل التوريد، وبناء علاقات طويلة الأمد مع عملائنا.'
                : 'To provide high-quality bottled water from the best international and local brands, while ensuring fast and reliable delivery service, maintaining the highest quality and safety standards at all stages of supply, and building long-term relationships with our customers.'}
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
            {isRTL ? 'قيمنا' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index + 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg text-center"
              >
                <div className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center`}>
                  <value.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
            {isRTL ? 'رحلتنا' : 'Our Journey'}
          </h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#153b66]/20 sm:-translate-x-1/2" />
            <div className="space-y-6 sm:space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index + 0.7 }}
                  className={`relative flex items-start gap-4 sm:gap-8 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-left' : 'sm:text-right'} pl-10 sm:pl-0`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg inline-block">
                      <span className="text-[#153b66] font-bold text-base sm:text-lg">{milestone.year}</span>
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 mt-1">{milestone.title}</h3>
                      <p className="text-gray-600 mt-2 text-xs sm:text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-[#153b66] rounded-full border-2 sm:border-4 border-white shadow-lg z-10 sm:-translate-x-1/2 mt-2" />
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
            {isRTL ? 'شهاداتنا' : 'Our Certifications'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * index + 0.7 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center"
              >
                <Trophy className="w-7 h-7 sm:w-10 sm:h-10 text-[#153b66] mx-auto mb-2 sm:mb-3" />
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">{cert.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {false && (
        <>
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
            {isRTL ? 'فريقنا' : 'Our Team'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index + 0.8 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-[#153b66] to-[#2b648c] rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white">{member.image}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">{member.name}</h3>
                <p className="text-[#153b66] text-xs sm:text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        </>
        )}

        <div
          id="why-trust-us"
          className={`${fullBleedSectionClassName} mb-12 scroll-mt-28 sm:mb-16 sm:scroll-mt-32`}
        >
          <TrustBadges isRTL={isRTL} />
        </div>

        <div
          id="water-process"
          className={`${fullBleedSectionClassName} mb-12 scroll-mt-28 sm:mb-16 sm:scroll-mt-32`}
        >
          <WaterProcess isRTL={isRTL} />
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          id="why-choose-riq"
          className="scroll-mt-28 rounded-2xl bg-gradient-to-br from-[#153b66] to-[#0c2340] p-6 text-white sm:scroll-mt-32 sm:rounded-3xl sm:p-10 lg:p-12"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              {isRTL ? 'لماذا تختار متجر ريق؟' : 'Why Choose Riq Store?'}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
              {isRTL 
                ? 'نحن نقدم لك تجربة فريدة في عالم المياه المعبأة مع ضمان الجودة والخدمة الممتازة'
                : 'We offer you a unique experience in the world of bottled water with guaranteed quality and excellent service'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              isRTL ? 'مياه نقية 100% معتمدة' : '100% Certified Pure Water',
              isRTL ? 'توصيل سريع لجميع المناطق' : 'Fast Delivery to All Areas',
              isRTL ? 'أسعار تنافسية وعروض مستمرة' : 'Competitive Prices & Ongoing Offers',
              isRTL ? 'دعم فني على مدار الساعة' : '24/7 Technical Support',
              isRTL ? 'تشكيلة واسعة من الماركات' : 'Wide Range of Brands',
              isRTL ? 'جودة مضمونة وثقة عالية' : 'Guaranteed Quality & High Trust',
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.05 * index + 0.9 }}
                className="flex items-center gap-2 sm:gap-3 bg-white/10 rounded-xl p-3 sm:p-4"
              >
                <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm sm:text-base">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#153b66] rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
            >
              <span>{isRTL ? 'تصفح منتجاتنا' : 'Browse Our Products'}</span>
              <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
