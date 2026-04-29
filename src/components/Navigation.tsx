import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  ShoppingCart,
  Search,
  ChevronRight,
  Home,
  Package,
  Tag,
  Info,
  Phone,
  CircleHelp,
  ShieldCheck,
  Sparkles,
  Smartphone,
  UserRound,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWebAuth } from '../features/auth/WebAuthProvider';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from '../lib/contact';
import { BRAND_NAME_AR, BRAND_NAME_EN } from '../lib/brand';
import LogoMark from './LogoMark';

const NAV_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type NavLinkItem = {
  href: string;
  label: string;
  icon: typeof Home;
};

export default function Navigation() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { totalItems } = useCart();
  const { authReady, isConfigured, session, openAccountDialog } = useWebAuth();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isRTL = i18n.language === 'ar';
  const isHome = location.pathname === '/';
  const isHeroMode = isHome && !isScrolled;
  const showAccountEntry = isConfigured || Boolean(session);
  const brandTextClassName = 'text-[#1f2f46]';
  const brandSubTextClassName = 'text-[#6b7f92]';
  const brandLockupClassName = 'rounded-[1.2rem] px-1 py-1 sm:px-1.5 sm:py-1.5';
  const brandTextWrapClassName = isRTL ? 'items-end text-right' : 'items-start text-left';
  const surfaceClassName = isHeroMode
    ? 'border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(239,247,253,0.86))] shadow-[0_18px_60px_-36px_rgba(8,15,30,0.62)] backdrop-blur-2xl'
    : 'border-[#dbe7f3] bg-white/95 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.42)] backdrop-blur-2xl';
  const actionButtonClassName = isHeroMode
    ? 'border-[#d6e4f2] bg-white/92 text-[#153b66] shadow-[0_14px_34px_-24px_rgba(21,59,102,0.6)] hover:bg-white hover:text-[#0f2f53]'
    : 'border-[#dbe7f3] bg-white text-slate-700 hover:bg-[#f8fbff]';
  const logoPanelClassName = isHeroMode
    ? 'border-[#2b648c] bg-[linear-gradient(135deg,#14375d,#21527c_55%,#2b648c)] shadow-[0_14px_34px_-24px_rgba(21,59,102,0.42)]'
    : 'border-[#214d76]/20 bg-[linear-gradient(135deg,#14375d,#21527c_55%,#2b648c)] shadow-[0_12px_24px_-22px_rgba(15,23,42,0.26)]';
  const desktopNavRailClassName = isHeroMode
    ? 'border-[#d5e4f2] bg-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]'
    : 'border-[#dbe7f3] bg-white/88';
  const desktopLinkActiveClassName = 'text-white';
  const desktopLinkInactiveClassName = 'text-[#40566f] hover:text-[#153b66]';
  const desktopActivePillClassName = isHeroMode
    ? 'border-[#78b6df]/80 bg-[linear-gradient(135deg,#2b648c,#5f9fc9)] shadow-[0_14px_30px_-18px_rgba(43,100,140,0.7)]'
    : 'border-[#78b6df]/80 bg-[linear-gradient(135deg,#245a80,#5f9fc9)] shadow-[0_14px_30px_-18px_rgba(43,100,140,0.6)]';

  useEffect(() => {
    let frameId = 0;

    const updateScrollState = () => {
      frameId = 0;
      setIsScrolled(window.scrollY > 50);
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleSearchToggle = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen((current) => !current);
  };

  const handleMenuToggle = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen((current) => !current);
  };

  const desktopNavLinks: NavLinkItem[] = [
    { href: '/', label: isRTL ? 'الرئيسية' : 'Home', icon: Home },
    { href: '/products', label: isRTL ? 'المنتجات' : 'Products', icon: Package },
    { href: '/brands', label: isRTL ? 'العلامات' : 'Brands', icon: Tag },
    { href: '/offers', label: isRTL ? 'العروض' : 'Offers', icon: Tag },
    { href: '/about', label: isRTL ? 'من نحن' : 'About', icon: Info },
    { href: '/app', label: isRTL ? 'التطبيق' : 'App', icon: Smartphone },
    { href: '/contact', label: isRTL ? 'اتصل بنا' : 'Contact', icon: Phone },
  ];

  const mobileNavLinks: NavLinkItem[] = [
    { href: '/', label: isRTL ? 'الرئيسية' : 'Home', icon: Home },
    { href: '/products', label: isRTL ? 'المنتجات' : 'Products', icon: Package },
    { href: '/brands', label: isRTL ? 'العلامات التجارية' : 'Brands', icon: Tag },
    { href: '/offers', label: isRTL ? 'العروض' : 'Offers', icon: Tag },
    { href: '/products#how-to-order', label: isRTL ? 'كيف أطلب؟' : 'How to Order?', icon: ShoppingCart },
    { href: '/about', label: isRTL ? 'من نحن' : 'About', icon: Info },
    { href: '/contact', label: isRTL ? 'التواصل' : 'Contact', icon: Phone },
    { href: '/about#why-trust-us', label: isRTL ? 'ليش تثق فينا؟' : 'Why Trust Us?', icon: ShieldCheck },
    { href: '/about#why-choose-riq', label: isRTL ? 'لماذا تختار متجر ريق؟' : 'Why Choose Riq?', icon: Sparkles },
    { href: '/contact#faq', label: isRTL ? 'الأسئلة الشائعة' : 'FAQ', icon: CircleHelp },
    { href: '/app', label: isRTL ? 'التطبيق' : 'App', icon: Smartphone },
  ];

  const isActive = (href: string) => {
    const [path, hash] = href.split('#');

    if (path === '/') {
      if (location.pathname !== '/') {
        return false;
      }

      return hash ? location.hash === `#${hash}` : true;
    }

    if (!location.pathname.startsWith(path)) {
      return false;
    }

    if (!hash) {
      return true;
    }

    return location.hash === `#${hash}`;
  };

  const linkStatusText = (active: boolean) => (
    active
      ? (isRTL ? 'أنت هنا الآن' : 'You are here now')
      : (isRTL ? 'انتقال مباشر لهذا القسم' : 'Direct access to this section')
  );

  const accountLabel = !authReady
    ? (isRTL ? 'الحساب' : 'Account')
    : session
      ? (isRTL ? 'حسابي' : 'My Account')
      : (isRTL ? 'سجّل' : 'Sign in');

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-3 lg:px-6 xl:px-10">
        <motion.nav
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.16 : 0.48, ease: NAV_EASE }}
          className="pointer-events-auto mx-auto max-w-[86rem]"
        >
          <motion.div
            layout
            transition={{ duration: prefersReducedMotion ? 0.16 : 0.42, ease: NAV_EASE }}
            className={`relative overflow-hidden rounded-[1.45rem] border px-2.5 py-2 sm:px-3.5 sm:py-2.5 ${surfaceClassName}`}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className={`absolute inset-0 ${isHeroMode ? 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),rgba(255,255,255,0)_60%)]' : 'bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),rgba(255,255,255,0)_62%)]'}`} />
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-36 ${isHeroMode ? 'bg-[linear-gradient(90deg,rgba(212,229,244,0.45),rgba(255,255,255,0))]' : 'bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0))]'} blur-2xl`} />
            </div>

            <div className="relative flex min-w-0 items-center justify-between gap-2 sm:gap-3">
              <Link to="/" className={`group flex min-w-0 shrink items-center gap-3 sm:gap-3.5 ${brandLockupClassName}`}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.28, ease: NAV_EASE }}
                  className={`relative flex h-10 w-[3.45rem] flex-shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border sm:h-[3.05rem] sm:w-[4.18rem] ${logoPanelClassName}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),rgba(255,255,255,0)_62%)]" />
                  <LogoMark tone="white" scaleClassName="scale-[1.05] sm:scale-[1.08]" />
                </motion.div>
                <div className={`hidden min-w-0 flex-col justify-center leading-none md:flex ${brandTextWrapClassName} ${brandTextClassName}`}>
                  <span className="truncate text-[1rem] font-black tracking-tight xl:text-[1.06rem]">{BRAND_NAME_EN}</span>
                  <span className={`mt-1.5 truncate text-[11px] font-semibold xl:text-xs ${brandSubTextClassName}`}>{BRAND_NAME_AR}</span>
                </div>
              </Link>

              <div className={`hidden items-center gap-1 rounded-full border px-1.5 py-1 lg:flex ${desktopNavRailClassName}`}>
                {desktopNavLinks.map((link) => {
                  const active = isActive(link.href);
                  const isContactLink = link.href === '/contact';

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-bold tracking-[0.01em] transition-all ${
                        isContactLink
                          ? 'border border-[#7db5dd]/70 bg-[linear-gradient(135deg,#dff0fb,#b9dbf2)] text-[#174369] shadow-[0_12px_26px_-22px_rgba(43,100,140,0.5)] hover:border-[#6aa9d3] hover:bg-[linear-gradient(135deg,#e9f6fd,#c8e5f6)] hover:text-[#102f52]'
                          : active ? desktopLinkActiveClassName : desktopLinkInactiveClassName
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="desktop-nav-pill"
                          className={`absolute inset-0 rounded-full border ${isContactLink ? 'border-[#6aa9d3] bg-[linear-gradient(135deg,#a7d4ef,#5f9fc9)] shadow-[0_14px_30px_-18px_rgba(43,100,140,0.58)]' : desktopActivePillClassName}`}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                        isContactLink
                          ? active ? 'bg-white/28 text-white' : 'bg-[#2b648c]/12 text-[#174369] group-hover:bg-[#2b648c]/18'
                          : ''
                      }`}>
                        <link.icon className={`h-4 w-4 transition-transform duration-300 ${active ? 'scale-100' : 'scale-95 group-hover:scale-100'}`} />
                      </span>
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {showAccountEntry ? (
                  <motion.button
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    onClick={openAccountDialog}
                    className={`hidden items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-bold tracking-[0.01em] transition-all md:inline-flex sm:text-sm ${actionButtonClassName}`}
                  >
                    <UserRound className="h-4 w-4" />
                    <span>{accountLabel}</span>
                  </motion.button>
                ) : null}

                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={handleSearchToggle}
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:h-10 sm:w-10 ${actionButtonClassName}`}
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={toggleLanguage}
                  className={`hidden items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-bold tracking-[0.01em] transition-all sm:inline-flex sm:text-sm ${actionButtonClassName}`}
                >
                  <Globe className="h-4 w-4" />
                  <span>{isRTL ? 'EN' : 'العربية'}</span>
                </motion.button>

                <Link
                  to="/cart"
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all sm:h-10 sm:w-10 ${actionButtonClassName}`}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <AnimatePresence>
                    {totalItems > 0 ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-r from-[#153b66] to-[#2b648c] px-1 text-[10px] font-bold text-white shadow-[0_10px_20px_-12px_rgba(21,59,102,0.7)]"
                      >
                        {totalItems > 99 ? '99+' : totalItems}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </Link>

                {showAccountEntry ? (
                  <motion.button
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    onClick={openAccountDialog}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all md:hidden sm:h-10 sm:w-10 ${actionButtonClassName}`}
                  >
                    <UserRound className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.button>
                ) : null}

                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={handleMenuToggle}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all lg:hidden sm:h-10 sm:w-10 ${actionButtonClassName}`}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={prefersReducedMotion ? { opacity: 0 } : { rotate: -70, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { rotate: 70, opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.14 : 0.22 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={prefersReducedMotion ? { opacity: 0 } : { rotate: 70, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { rotate: -70, opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.14 : 0.22 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isSearchOpen ? (
          <div className="fixed inset-x-0 top-[4.25rem] z-40 px-2.5 sm:top-[4.9rem] sm:px-4 lg:px-6 xl:px-10">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: prefersReducedMotion ? 0.14 : 0.32, ease: NAV_EASE }}
              className="mx-auto max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/75 bg-white/[0.86] px-4 py-4 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.5)] backdrop-blur-2xl sm:px-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),rgba(255,255,255,0)_62%)]" />
                <div className="relative">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {isRTL ? 'ابحث بسهولة داخل المتجر' : 'Search the store with ease'}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {isRTL ? 'منتجات، علامات، وعروض في واجهة أنعم وأوضح.' : 'Products, brands, and offers in a softer, clearer overlay.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition hover:text-slate-900"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:h-5 sm:w-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={isRTL ? 'ابحث عن منتج أو علامة...' : 'Search for a product or brand...'}
                      className={`w-full rounded-[1.25rem] border border-slate-200/80 bg-white/90 py-3.5 text-sm text-slate-900 outline-none transition focus:border-[#9cc4e6] focus:ring-4 focus:ring-[#153b66]/10 sm:text-base ${
                        isRTL ? 'pl-12 pr-12 sm:pl-14 sm:pr-14' : 'pr-12 pl-12 sm:pr-14 sm:pl-14'
                      }`}
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/36 backdrop-blur-[3px] lg:hidden"
            />

            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { x: isRTL ? '8%' : '-8%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: isRTL ? '8%' : '-8%', opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.16 : 0.34, ease: NAV_EASE }}
              className="fixed bottom-3 top-3 z-50 w-[min(22.5rem,calc(100vw-1.5rem))] overflow-hidden rounded-[2rem] border border-white/70 bg-white/[0.88] shadow-[0_28px_90px_-40px_rgba(15,23,42,0.62)] backdrop-blur-2xl lg:hidden"
              style={{ [isRTL ? 'right' : 'left']: '0.75rem' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),rgba(255,255,255,0)_52%),linear-gradient(180deg,rgba(234,244,252,0.6),rgba(255,255,255,0.86))]" />

              <div className="relative flex h-full flex-col">
                <div className="border-b border-white/35 bg-gradient-to-br from-[#153b66] via-[#1f4e7c] to-[#2b648c] px-5 pb-5 pt-6 text-white">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-16 w-24 items-center justify-center rounded-[1.4rem] border border-white/12 bg-[linear-gradient(135deg,rgba(17,53,89,0.92),rgba(43,100,140,0.82))]">
                        <LogoMark tone="white" scaleClassName="scale-[1.08]" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xl font-black tracking-tight">{BRAND_NAME_EN}</p>
                        <p className="mt-1 truncate text-sm font-medium text-white/80">{BRAND_NAME_AR}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                </div>

                <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
                  <nav className="space-y-2">
                    {mobileNavLinks.map((link, index) => {
                      const active = isActive(link.href);

                      return (
                        <motion.div
                          key={link.href}
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: isRTL ? 16 : -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: prefersReducedMotion ? 0 : index * 0.04, duration: prefersReducedMotion ? 0.14 : 0.24 }}
                        >
                          <Link
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`group relative flex items-center gap-3 overflow-hidden rounded-[1.35rem] px-4 py-3.5 transition-all ${
                              active
                                ? 'border border-[#78b6df]/80 bg-[linear-gradient(135deg,#245a80,#5f9fc9)] text-white shadow-[0_18px_40px_-26px_rgba(43,100,140,0.55)]'
                                : 'border border-[#e2ebf3] bg-white/82 text-slate-700 shadow-[0_12px_28px_-28px_rgba(15,23,42,0.24)] hover:bg-white'
                            }`}
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              active ? 'bg-white/18 text-white' : 'bg-[#f3f7fb] text-slate-600'
                            }`}>
                              <link.icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={`truncate text-sm font-extrabold sm:text-base ${active ? 'text-white' : 'text-[#24364b]'}`}>{link.label}</p>
                              <p className={`mt-1 text-xs font-medium ${active ? 'text-white/80' : 'text-[#73869a]'}`}>
                                {linkStatusText(active)}
                              </p>
                            </div>
                            <ChevronRight className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${isRTL ? 'rotate-180' : ''} ${active ? 'text-white/85' : 'text-slate-300 group-hover:translate-x-0.5'}`} />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.22, duration: prefersReducedMotion ? 0.14 : 0.24 }}
                    className="mt-6 space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAccountDialog();
                      }}
                      className={showAccountEntry
                        ? "flex w-full items-center gap-3 rounded-[1.35rem] border border-[#dfebf5] bg-white/84 px-4 py-3.5 text-slate-700 shadow-[0_12px_28px_-28px_rgba(15,23,42,0.24)] transition hover:bg-white [&_p:first-of-type]:font-extrabold [&_p:first-of-type]:text-[#24364b] [&_p:last-of-type]:font-medium [&_p:last-of-type]:text-[#73869a]"
                        : "hidden"}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7fb] text-slate-600">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <p className="text-sm font-bold">{accountLabel}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {session
                            ? (isRTL ? 'افتح حسابك وطلباتك المحفوظة' : 'Open your account and saved orders')
                            : (isRTL ? 'سجّل بالإيميل لحفظ بياناتك وطلباتك' : 'Sign in with email to save your details and orders')}
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        toggleLanguage();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-[1.35rem] border border-[#dfebf5] bg-white/84 px-4 py-3.5 text-slate-700 shadow-[0_12px_28px_-28px_rgba(15,23,42,0.24)] transition hover:bg-white [&_p:first-of-type]:font-extrabold [&_p:first-of-type]:text-[#24364b] [&_p:last-of-type]:font-medium [&_p:last-of-type]:text-[#73869a]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7fb] text-slate-600">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <p className="text-sm font-bold">{isRTL ? 'تغيير اللغة' : 'Change language'}</p>
                        <p className="mt-1 text-xs text-slate-400">{isRTL ? 'بدّل سريعًا بين العربية والإنجليزية' : 'Switch quickly between Arabic and English'}</p>
                      </div>
                    </button>

                    <a
                      href={CONTACT_PHONE_HREF}
                      className="flex items-center gap-3 rounded-[1.35rem] border border-[#dfebf5] bg-white/84 px-4 py-3.5 text-slate-700 shadow-[0_12px_28px_-28px_rgba(15,23,42,0.24)] transition hover:bg-white [&_p:first-of-type]:font-extrabold [&_p:first-of-type]:text-[#24364b] [&_p:last-of-type]:font-medium [&_p:last-of-type]:text-[#73869a]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7fb] text-slate-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold">{isRTL ? 'تواصل معنا' : 'Contact us'}</p>
                        <p className="mt-1 truncate text-xs text-slate-400">{CONTACT_PHONE_DISPLAY}</p>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
