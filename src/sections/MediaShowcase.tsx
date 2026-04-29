import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Droplets, Package, Play, ShieldCheck, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductImage from '../components/ProductImage';
import { formatSarPrice, localizeText } from '../lib/utils';

interface MediaShowcaseProps {
  isRTL: boolean;
}

const highlightStats = {
  ar: [
    { icon: Package, label: 'تغليف مرتب', value: 'جاهز للطلبات اليومية' },
    { icon: ShieldCheck, label: 'جودة موثوقة', value: 'علامات معتمدة ومشهورة' },
  ],
  en: [
    { icon: Package, label: 'Clean Packaging', value: 'Ready for daily orders' },
    { icon: ShieldCheck, label: 'Trusted Quality', value: 'Certified popular brands' },
  ],
};

export default function MediaShowcase({ isRTL }: MediaShowcaseProps) {
  const reelProducts = products.slice(0, 4);
  const galleryProducts = products.slice(6, 10);
  const marqueeBase = products.slice(0, 10);
  const marqueeMetaBase = [...products.slice(4, 14), ...products.slice(0, 2)];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = reelProducts[activeIndex] ?? products[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reelProducts.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [reelProducts.length]);

  const copy = {
    badge: isRTL ? 'تجربة أغنى بصريًا' : 'More Visual Energy',
    title: isRTL ? 'صور أكثر، حركة أكثر، وتجربة أمتع' : 'More imagery, more motion, more delight',
    description: isRTL
      ? 'أضفنا ريل بصري متحرك وكولاج صور حي يملأ الصفحة ويعطي كل منتج حضورًا أقوى بدل المساحات الهادية.'
      : 'We added a motion-driven visual reel and a richer image collage so the homepage feels fuller, livelier, and more immersive.',
    reelBadge: isRTL ? 'ريل المنتجات' : 'Product Reel',
    reelTitle: isRTL ? 'واجهة ديناميكية تشبه الفيديو' : 'A dynamic, video-style showcase',
    reelAction: isRTL ? 'شاهد المنتج' : 'View product',
    reelLive: isRTL ? 'يعرض الآن' : 'Now playing',
    galleryTitle: isRTL ? 'لقطات سريعة من التشكيلة' : 'Quick shots from the collection',
    galleryDescription: isRTL
      ? 'شبكة صور متحركة تمنح الصفحة إيقاعًا أسرع وإحساسًا أغنى بالمنتجات والعروض.'
      : 'An animated image grid that gives the page a faster rhythm and a fuller product presence.',
    videoDeckTitle: isRTL ? 'لقطات ماء حية تعمل تلقائيًا' : 'Ambient water clips on autoplay',
    videoDeckDescription: isRTL
      ? 'أضفنا فيديوهات قصيرة للمياه المتحركة ولقطات القوارير لتجعل الصفحة أمتع وأكثر حيوية بدون إزعاج.'
      : 'Short autoplay clips of moving water and bottle moments make the section feel more cinematic and alive.',
    videoLive: isRTL ? 'تشغيل تلقائي' : 'Autoplay',
  };

  const stats = isRTL ? highlightStats.ar : highlightStats.en;
  const brandCount = new Set(products.map((product) => product.brand)).size;
  const averageRating = (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1);
  const showcaseMetrics = [
    {
      label: isRTL ? 'منتج متاح' : 'Available items',
      value: `${products.length}+`,
    },
    {
      label: isRTL ? 'علامة موثوقة' : 'Trusted brands',
      value: `${brandCount}+`,
    },
    {
      label: isRTL ? 'متوسط التقييم' : 'Avg. rating',
      value: averageRating,
    },
  ];
  const showcaseNotes = isRTL
    ? ['نقاء يومي', 'تبريد سريع', 'تغليف مرتب']
    : ['Daily purity', 'Quick cooling', 'Clean packaging'];
  const spotlightProducts = products.slice(10, 13);
  const activeDetailCards =
    activeProduct.quickFacts?.slice(0, 3).map((fact) => ({
      label: isRTL ? fact.labelAr : fact.labelEn,
      value: isRTL ? fact.valueAr : fact.valueEn,
    })) ??
    [
      { label: isRTL ? 'الحجم' : 'Size', value: activeProduct.size },
      { label: isRTL ? 'العبوات' : 'Pack', value: `${activeProduct.quantity}` },
      { label: isRTL ? 'التقييم' : 'Rating', value: `${activeProduct.rating}` },
    ];
  const activeMoments = (activeProduct.usageMoments ?? activeProduct.idealFor ?? [])
    .slice(0, 4)
    .map((item) => localizeText(item, isRTL));
  const videoClips = [
    {
      id: 'pour-glass',
      title: isRTL ? 'صبّة ناعمة في الكوب' : 'Smooth pour into glass',
      subtitle: isRTL ? 'مياه تتحرك بهدوء وأناقة' : 'Calm motion with a premium feel',
      src: 'https://videos.pexels.com/video-files/3756147/3756147-uhd_2160_4096_25fps.mp4',
      className: 'sm:col-span-2 aspect-[16/9]',
    },
    {
      id: 'bottle-fill',
      title: isRTL ? 'لقطة تعبئة القارورة' : 'Bottle filling close-up',
      subtitle: isRTL ? 'تفاصيل نظيفة وحركة واضحة' : 'Clean details and fluid movement',
      src: 'https://videos.pexels.com/video-files/3752527/3752527-hd_1920_1080_24fps.mp4',
      className: 'aspect-[4/5]',
    },
    {
      id: 'water-surface',
      title: isRTL ? 'تموّج المياه' : 'Sparkling water motion',
      subtitle: isRTL ? 'خلفية مريحة بنبض هادئ' : 'A relaxed clip with gentle energy',
      src: 'https://videos.pexels.com/video-files/33608358/14285378_1080_1920_30fps.mp4',
      className: 'aspect-[4/5]',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#06172d] py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_34%)]" />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -right-12 bottom-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            {copy.badge}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            {copy.description}
          </p>
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-full rounded-[2rem] border border-white/10 bg-white/8 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm"
          >
            <div className="relative h-full min-h-[680px] overflow-hidden rounded-[1.6rem] bg-slate-950 lg:min-h-[860px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={isRTL ? activeProduct.name.ar : activeProduct.name.en}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.16)_0%,rgba(2,6,23,0.45)_40%,rgba(2,6,23,0.9)_100%)]" />
              <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(8,47,73,0.5),transparent)]" />

              <div className="relative flex h-full min-h-[520px] flex-col justify-between p-5 sm:p-6 lg:p-7">
                <div
                  className={`hidden xl:flex xl:w-[280px] xl:flex-col xl:gap-4 ${
                    isRTL
                      ? 'xl:absolute xl:inset-y-6 xl:left-6 xl:justify-between'
                      : 'xl:absolute xl:inset-y-6 xl:right-6 xl:justify-between'
                  }`}
                >
                  <div className="rounded-[1.8rem] border border-white/12 bg-slate-950/42 p-5 backdrop-blur-md xl:flex-1">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                      <Droplets className="h-4 w-4" />
                      {isRTL ? 'داخل الواجهة' : 'Inside the experience'}
                    </div>
                    <h4 className="text-xl font-bold text-white">
                      {isRTL ? 'تفاصيل سريعة تملأ المشهد' : 'Quick details that fill the scene'}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {isRTL
                        ? 'مزجنا أرقامًا حقيقية ولقطات سريعة حتى يظل هذا الجزء حيًا ومليئًا بالتفاصيل.'
                        : 'We mixed real stats and quick highlights so this area stays rich and alive.'}
                    </p>

                    <div className="mt-5 grid gap-3">
                      {showcaseMetrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                        >
                          <p className="text-xs text-slate-300">{metric.label}</p>
                          <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/12 bg-black/20 p-4 backdrop-blur-md xl:flex-1">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-100">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />
                      {isRTL ? 'منتجات تحت الضوء' : 'In the spotlight'}
                    </div>
                    <div className="space-y-3">
                      {spotlightProducts.map((product) => (
                        <Link
                          key={`spotlight-${product.id}`}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-2.5 transition-colors hover:bg-white/12"
                        >
                          <ProductImage
                            product={product}
                            isRTL={isRTL}
                            size="thumb"
                            className="h-16 w-16 flex-none rounded-[1rem]"
                          />
                          <div className="min-w-0">
                            <p className="line-clamp-1 text-sm font-semibold text-white">
                              {isRTL ? product.name.ar : product.name.en}
                            </p>
                            <p className="mt-1 text-xs text-slate-300">
                              {formatSarPrice(product.price, isRTL)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-cyan-300/12 bg-cyan-300/8 p-4 backdrop-blur-md">
                    <div className="flex flex-wrap gap-2">
                      {showcaseNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-200">
                      {isRTL
                        ? 'عنصر بصري إضافي يحافظ على امتلاء الواجهة ويقوّي الإحساس بالحركة والثقة.'
                        : 'An extra visual layer that keeps the layout full and reinforces motion and trust.'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm sm:text-sm">
                    <Play className="h-4 w-4 fill-current text-cyan-300" />
                    {copy.reelBadge}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-medium text-emerald-200 ring-1 ring-emerald-300/25 sm:text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    {copy.reelLive}
                  </div>
                </div>

                <div className={`max-w-2xl ${isRTL ? 'xl:pl-[310px]' : 'xl:pr-[310px]'}`}>
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/90">
                    {copy.reelTitle}
                  </p>
                  <h3 className="max-w-xl text-3xl font-bold text-white sm:text-4xl">
                    {isRTL ? activeProduct.name.ar : activeProduct.name.en}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                    {localizeText(activeProduct.story ?? activeProduct.description, isRTL)}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-md"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="rounded-2xl bg-white/12 p-2.5">
                            <item.icon className="h-5 w-5 text-cyan-200" />
                          </div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                        </div>
                        <p className="text-sm leading-6 text-slate-200">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`grid gap-3 ${isRTL ? 'xl:pl-[310px]' : 'xl:pr-[310px]'}`}>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {reelProducts.map((product, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={`group rounded-[1.4rem] border p-3 text-start transition-all ${
                            isActive
                              ? 'border-cyan-300/60 bg-white/14 shadow-[0_12px_40px_rgba(34,211,238,0.18)]'
                              : 'border-white/10 bg-black/15 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              animate={{ width: isActive ? '100%' : '22%' }}
                              transition={{ duration: isActive ? 3 : 0.4, ease: 'linear' }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
                            />
                          </div>
                          <div className="mb-3">
                            <ProductImage
                              product={product}
                              isRTL={isRTL}
                              size="thumb"
                              className="aspect-[4/3] rounded-[1.25rem]"
                            />
                          </div>
                          <p className="line-clamp-1 text-sm font-semibold text-white">
                            {isRTL ? product.name.ar : product.name.en}
                          </p>
                          <div className="mt-1 flex items-center justify-between gap-3 text-xs text-slate-300">
                            <span>{formatSarPrice(product.price, isRTL)}</span>
                            <span>{product.size}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <Link
                    to={`/product/${activeProduct.id}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition-transform hover:scale-[1.02]"
                  >
                    {copy.reelAction}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <div className="grid gap-3 pt-1 sm:grid-cols-3">
                    {activeDetailCards.map((detail) => (
                      <div
                        key={`${activeProduct.id}-${detail.label}`}
                        className="rounded-[1.35rem] border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md"
                      >
                        <p className="text-xs text-slate-300">{detail.label}</p>
                        <p className="mt-2 text-lg font-bold text-white">{detail.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-[1.45rem] border border-cyan-300/15 bg-cyan-300/8 p-4 backdrop-blur-md">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/90">
                        {isRTL ? 'مناسب لـ' : 'Best for'}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeMoments.map((moment) => (
                          <span
                            key={`${activeProduct.id}-${moment}`}
                            className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
                          >
                            {moment}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.45rem] border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                        {isRTL ? 'ملاحظة سريعة' : 'Quick note'}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white">
                        {isRTL
                          ? 'عرض بصري ممتلئ يربط بين المواصفات، الاستخدام، والشراء في نفس المساحة.'
                          : 'A fuller visual block that ties specs, usage, and shopping cues together.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="flex h-full flex-col gap-5"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/90">
                {copy.galleryTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {isRTL ? 'كثافة بصرية أقوى بدون زحمة مزعجة' : 'Higher visual density without feeling cluttered'}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                {copy.galleryDescription}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm sm:p-5 lg:flex lg:flex-1 lg:flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{copy.videoDeckTitle}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                    {copy.videoDeckDescription}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {copy.videoLive}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:flex-1 lg:auto-rows-fr">
                {videoClips.map((clip, index) => (
                  <motion.div
                    key={clip.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -6 }}
                    className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#091e38] lg:min-h-[230px] ${clip.className}`}
                  >
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={clip.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,31,0.05)_10%,rgba(5,16,31,0.4)_55%,rgba(5,16,31,0.88)_100%)]" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,23,45,0.55),transparent)]" />

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-medium text-cyan-100 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {copy.videoLive}
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-white sm:text-xl">{clip.title}</h4>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-200">{clip.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:flex-1 lg:auto-rows-fr">
              {galleryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                  className={`group h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/10 p-3 backdrop-blur-sm ${
                    index === 1 || index === 4 ? 'sm:translate-y-6' : ''
                  }`}
                >
                  <div className="relative h-full">
                    <ProductImage
                      product={product}
                      isRTL={isRTL}
                      size="card"
                      className="h-full min-h-[220px] rounded-[1.4rem]"
                      imageClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-[1.2rem] bg-slate-950/72 p-3 backdrop-blur-md">
                      <p className="line-clamp-1 text-sm font-semibold text-white">
                        {isRTL ? product.brandAr : product.brand}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-300">
                        {isRTL ? product.name.ar : product.name.en}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-8 rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="space-y-4">
            <div className="media-marquee" dir="ltr">
              <div className="media-marquee-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    key={`products-group-${groupIndex}`}
                    aria-hidden={groupIndex === 1}
                    className="media-marquee-group"
                  >
                    {marqueeBase.map((product, index) => (
                      <Link
                        key={`${product.id}-${index}-forward-${groupIndex}`}
                        to={`/product/${product.id}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className="group flex min-w-[250px] items-center gap-3 rounded-[1.4rem] border border-white/10 bg-[#0c223f] px-3 py-3 text-start transition-transform hover:-translate-y-1"
                      >
                        <ProductImage
                          product={product}
                          isRTL={isRTL}
                          size="thumb"
                          className="h-20 w-24 flex-none rounded-[1.1rem]"
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-semibold text-white">
                            {isRTL ? product.name.ar : product.name.en}
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-slate-300">
                            {formatSarPrice(product.price, isRTL)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="media-marquee media-marquee-reverse" dir="ltr">
              <div className="media-marquee-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    key={`meta-group-${groupIndex}`}
                    aria-hidden={groupIndex === 1}
                    className="media-marquee-group"
                  >
                    {marqueeMetaBase.map((product, index) => (
                      <div
                        key={`${product.id}-${index}-reverse-${groupIndex}`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className="flex min-w-[220px] items-center gap-3 rounded-[1.3rem] border border-cyan-200/10 bg-white/6 px-4 py-3 text-start"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-200">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-semibold text-white">
                            {isRTL ? product.brandAr : product.brand}
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-slate-300">
                            {product.size} | {product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
