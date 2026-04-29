import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, PackageSearch } from 'lucide-react';

export default function NotFound() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <main className="min-h-screen relative z-10 py-20 sm:py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-12"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#153b66]/10 text-[#153b66] sm:h-24 sm:w-24">
            <PackageSearch className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#153b66]/70">
            404
          </p>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            {isRTL ? 'هذه الصفحة غير موجودة' : 'This page doesn\'t exist'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            {isRTL
              ? 'قد يكون الرابط قديماً أو تم نقل المحتوى. روح للرئيسية أو استكشف كاتالوجنا الكامل من المياه والعروض.'
              : 'The link might be outdated or content has moved. Head home or explore our complete water catalog and offers.'}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <Home className="h-4 w-4" />
              <span>{isRTL ? 'العودة للرئيسية' : 'Back Home'}</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#153b66]/20 bg-white px-6 py-3 text-sm font-semibold text-[#153b66] transition-colors hover:bg-[#153b66]/5"
            >
              <span>{isRTL ? 'تصفح المنتجات' : 'Browse Products'}</span>
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
