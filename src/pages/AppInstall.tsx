import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  Globe,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  UserRound,
} from 'lucide-react';
import { useWebAuth } from '../features/auth/WebAuthProvider';
import { BRAND_NAME_AR, BRAND_NAME_EN } from '../lib/brand';
import {
  clearDeferredInstallPrompt,
  ensurePwaInstallTracking,
  getAndroidAppUrl,
  getIosAppUrl,
  isIosDevice,
  isStandaloneDisplayMode,
  subscribeToDeferredInstallPrompt,
  type BeforeInstallPromptEvent,
  type InstallPromptOutcome,
} from '../lib/pwa';

type FeatureCard = {
  icon: typeof Sparkles;
  title: string;
  description: string;
};

type ExperienceCard = {
  title: string;
  subtitle: string;
  points: string[];
};

function buildFeatureCards(isRTL: boolean): FeatureCard[] {
  return [
    {
      icon: ShoppingCart,
      title: isRTL ? 'طلب أسرع' : 'Faster Ordering',
      description: isRTL
        ? 'تنقّل أسرع بين المنتجات، أضف إلى السلة بسهولة، وأكمِل طلبك من تجربة مصممة للموبايل بشكل عملي وواضح.'
        : 'Browse products faster, add to cart more easily, and complete your order from a mobile-first experience.',
    },
    {
      icon: Sparkles,
      title: isRTL ? 'واجهة أنظف وأسهل' : 'Cleaner Everyday Experience',
      description: isRTL
        ? 'تجربة أقرب للتطبيق الحقيقي، مع فتح سريع من رابط التطبيق الرسمي وتصميم مرتب يناسب الاستخدام اليومي على الجوال.'
        : 'A native-app-focused flow with official download access and a cleaner layout built for everyday mobile use.',
    },
    {
      icon: Clock3,
      title: isRTL ? 'المتجر أقرب لك دائمًا' : 'Quick Access Anytime',
      description: isRTL
        ? 'افتح المتجر في ثوانٍ وقت ما تحتاجه، بدون الرجوع كل مرة للمتصفح أو البحث عن الرابط من جديد.'
        : 'Open the store in seconds whenever you need it, without going back through the browser each time.',
    },
    {
      icon: ShieldCheck,
      title: isRTL ? 'حساب اختياري لحفظ معلوماتك' : 'Optional Saved Account',
      description: isRTL
        ? 'إذا رغبت، تقدر تسجل بإيميلك لحفظ معلوماتك الأساسية وطلباتك في مكان منظم واحترافي، مع بقاء الطلب بدون تسجيل متاحًا.'
        : 'If you want, you can sign in with your email to keep your basic details and orders organized, while guest ordering stays available.',
    },
  ];
}

function buildExperienceCards(isRTL: boolean): ExperienceCard[] {
  return [
    {
      title: isRTL ? 'اكتشف المنتجات بسرعة' : 'Discover Products Quickly',
      subtitle: isRTL ? 'كل الأصناف في مكان واحد' : 'Everything in one place',
      points: isRTL
        ? [
            'الوصول السريع للعلامات التجارية والأحجام المختلفة.',
            'واجهة مناسبة للشاشة الصغيرة بدون تعقيد.',
            'صفحات منتجات أسهل في التصفح أثناء الحركة.',
          ]
        : [
            'Fast access to brands and product sizes.',
            'A layout tuned for smaller screens.',
            'Product pages that are easier to navigate on the go.',
          ],
    },
    {
      title: isRTL ? 'أكمِل الطلب بسلاسة' : 'Complete Orders Smoothly',
      subtitle: isRTL ? 'من السلة حتى إتمام الطلب' : 'From cart to checkout',
      points: isRTL
        ? [
            'إضافة المنتجات ومراجعتها من واجهة سريعة وواضحة.',
            'تنقل أسهل بين المنتجات والسلة بدون تشتيت.',
            'تجربة يومية أقرب لتطبيق فعلي على الموبايل.',
          ]
        : [
            'Add and review products from a clearer, faster interface.',
            'Move between products and cart with less friction.',
            'A daily flow that feels closer to a native app on mobile.',
          ],
    },
    {
      title: isRTL ? 'احفظ بياناتك إذا حبيت' : 'Save Your Details If You Want',
      subtitle: isRTL ? 'ميزة اختيارية وليست إجبارية' : 'Optional, never required',
      points: isRTL
        ? [
            'إمكانية التسجيل بالإيميل لحفظ بيانات التواصل والتوصيل في مكان واحد.',
            'الرجوع لطلباتك السابقة بسهولة ومعرفة تفاصيلها بشكل أوضح.',
            'الميزة اختيارية بالكامل، وتقدر تكمل طلبك حتى بدون إنشاء حساب.',
          ]
        : [
            'Optional email sign-in keeps your contact and delivery details in one place.',
            'Makes it easier to review past orders and come back with better context.',
            'Completely optional, so you can still place orders without creating an account.',
          ],
    },
    {
      title: isRTL ? 'ارجع للعروض أسرع' : 'Follow Offers Faster',
      subtitle: isRTL ? 'كل الجديد أقرب لك' : 'Fresh deals, easier to reach',
      points: isRTL
        ? [
            'العروض تبقى أقرب لك من التطبيق الرسمي.',
            'الرجوع للمتجر يتم بضغطة واحدة.',
            'مناسب للرجوع السريع أكثر من مرة خلال اليوم.',
          ]
        : [
            'Deals stay close through the official app path.',
            'Returning to the store takes a single tap.',
            'Ideal for quick repeat visits throughout the day.',
          ],
    },
  ];
}

function isAndroidDevice() {
  if (typeof window === 'undefined') {
    return false;
  }

  return /Android/i.test(window.navigator.userAgent);
}

export default function AppInstall() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { isConfigured, session, openAccountDialog } = useWebAuth();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(() => isStandaloneDisplayMode());
  const [promptOutcome, setPromptOutcome] = useState<InstallPromptOutcome | null>(null);
  const [isPrompting, setIsPrompting] = useState(false);
  const iosDevice = isIosDevice();
  const androidDevice = isAndroidDevice();
  const iosAppUrl = getIosAppUrl();
  const androidAppUrl = getAndroidAppUrl();
  const hasNativeIosDownload = Boolean(iosAppUrl);
  const hasNativeAndroidDownload = Boolean(androidAppUrl);
  const canTriggerBrowserInstall = !iosDevice && !androidDevice && !isInstalled && deferredPrompt !== null;
  const featureCards = buildFeatureCards(isRTL);
  const experienceCards = buildExperienceCards(isRTL);

  useEffect(() => {
    const syncInstalledState = () => {
      setIsInstalled(isStandaloneDisplayMode());
    };

    const handleAppInstalled = () => {
      syncInstalledState();
      setDeferredPrompt(null);
      setPromptOutcome('accepted');
    };

    ensurePwaInstallTracking();
    syncInstalledState();
    const unsubscribePrompt = subscribeToDeferredInstallPrompt((event) => {
      setDeferredPrompt(event);
      if (event) {
        setPromptOutcome(null);
      }
    });

    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('focus', syncInstalledState);

    return () => {
      unsubscribePrompt();
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('focus', syncInstalledState);
    };
  }, []);

  const handleBrowserInstallClick = async () => {
    if (!deferredPrompt || isPrompting) {
      return;
    }

    setIsPrompting(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      setPromptOutcome(outcome);
      clearDeferredInstallPrompt();
      setDeferredPrompt(null);

      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    } finally {
      setIsPrompting(false);
    }
  };

  const availabilityText = isInstalled
    ? (isRTL
        ? 'التطبيق مثبت بالفعل على هذا الجهاز وجاهز للاستخدام.'
        : 'The app is already installed on this device and ready to use.')
    : iosDevice && hasNativeIosDownload
      ? (isRTL
          ? 'اضغط الزر وثبّت تطبيق iPhone من TestFlight مباشرة.'
          : 'Tap the button and install the iPhone app directly from TestFlight.')
      : iosDevice
        ? (isRTL
            ? 'تطبيق iPhone يحتاج رابط TestFlight.'
            : 'The iPhone app needs a TestFlight link.')
        : androidDevice && hasNativeAndroidDownload
          ? (isRTL
              ? 'يمكنك تنزيل تطبيق Android مباشرة من الموقع وتثبيته من ملف APK.'
              : 'You can download the Android app directly from the website and install it from the APK file.')
          : canTriggerBrowserInstall
            ? (isRTL
                ? 'يمكنك تثبيت التطبيق على هذا الجهاز مباشرة من المتصفح.'
                : 'You can install the app on this device directly from the browser.')
            : promptOutcome === 'dismissed'
              ? (isRTL
                  ? 'يمكنك إعادة المحاولة لاحقًا من هذه الصفحة أو من قائمة المتصفح.'
                  : 'You can try again later from this page or from the browser menu.')
          : (isRTL
              ? 'التثبيت غير ظاهر حاليًا على هذا المتصفح. جرّب Chrome أو Edge بعد نشر الموقع.'
              : 'Install is not currently available in this browser. Try Chrome or Edge after the site is deployed.');

  return (
    <main className="overflow-x-hidden bg-[linear-gradient(180deg,#eef6fb_0%,#ffffff_22%,#f4f9fc_100%)] pt-28 sm:pt-32">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-12 h-48 w-48 rounded-full bg-sky-200/45 blur-3xl" />
          <div className="absolute right-[6%] top-32 h-56 w-56 rounded-full bg-[#153b66]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-56 w-[70%] -translate-x-1/2 rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative w-full px-4 pb-14 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#153b66] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                <Smartphone className="h-4 w-4" />
                <span>{isRTL ? 'تجربة التطبيق على الجوال' : 'The Mobile App Experience'}</span>
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-[#10263f] sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
                {isRTL ? (
                  <>
                    كل اللي تحتاجه من <span className="text-[#153b66]">{BRAND_NAME_AR}</span>
                    <br />
                    في تجربة مريحة على جوالك
                  </>
                ) : hasNativeAndroidDownload && androidDevice ? (
                  <a
                    href={androidAppUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(21,59,102,0.65)] transition hover:bg-[#0f2f53]"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>{isRTL ? 'نزّل تطبيق Android' : 'Download the Android App'}</span>
                  </a>
                ) : (
                  <>
                    Everything you need from <span className="text-[#153b66]">{BRAND_NAME_EN}</span>
                    <br />
                    in a mobile-friendly app experience
                  </>
                )}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {isRTL
                  ? 'الصفحة دي تجمع لك فكرة التطبيق بالكامل: سرعة الوصول، سهولة الطلب، متابعة العروض، ومع إمكانية اختيارية لتسجيل الإيميل وحفظ بياناتك وطلباتك بشكل منظم واحترافي يسهل رجوعك في كل مرة.'
                  : 'This page brings the full app picture together: faster access, easier ordering, offer discovery, and an optional email sign-in that helps keep your details and orders organized for future visits.'}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {isConfigured ? (
                <button
                  type="button"
                  onClick={openAccountDialog}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#153b66]/15 bg-white/90 px-6 py-3 text-base font-semibold text-[#153b66] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)] transition hover:border-[#153b66]/35 hover:bg-white"
                >
                  <UserRound className="h-5 w-5" />
                  <span>
                    {session
                      ? (isRTL ? 'افتح حسابك المحفوظ' : 'Open Your Saved Account')
                      : (isRTL ? 'سجّل بالإيميل لحفظ بياناتك' : 'Sign in with Email to Save Your Details')}
                  </span>
                </button>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-base font-semibold text-slate-500 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]">
                    <UserRound className="h-5 w-5" />
                    {isRTL ? 'الطلب السريع متاح بدون حساب' : 'Guest ordering is available without an account'}
                  </span>
                )}

                {isInstalled ? (
                  <span className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(5,150,105,0.65)]">
                    <CheckCircle2 className="h-5 w-5" />
                    {isRTL ? 'التطبيق مثبت بالفعل' : 'App Already Installed'}
                  </span>
                ) : iosDevice && hasNativeIosDownload ? (
                  <a
                    href={iosAppUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(21,59,102,0.65)] transition hover:bg-[#0f2f53]"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>{isRTL ? 'نزّل تطبيق iPhone الآن' : 'Download the iPhone App Now'}</span>
                  </a>
                ) : iosDevice ? (
                  <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#153b66]/15 bg-white/90 px-6 py-3 text-base font-semibold text-[#153b66] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]">
                    <Smartphone className="h-5 w-5" />
                    {isRTL ? 'iPhone يحتاج رابط TestFlight' : 'iPhone needs a TestFlight link'}
                  </span>
                ) : androidDevice && hasNativeAndroidDownload ? (
                  <a
                    href={androidAppUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(21,59,102,0.65)] transition hover:bg-[#0f2f53] disabled:cursor-wait disabled:opacity-75"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>{isRTL ? 'نزّل تطبيق Android' : 'Download the Android App'}</span>
                  </a>
                ) : canTriggerBrowserInstall ? (
                  <button
                    type="button"
                    onClick={handleBrowserInstallClick}
                    disabled={isPrompting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#153b66] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_-24px_rgba(21,59,102,0.65)] transition hover:bg-[#0f2f53] disabled:cursor-wait disabled:opacity-75"
                  >
                    <Download className="h-5 w-5" />
                    <span>
                      {isPrompting
                        ? (isRTL ? 'جاري فتح نافذة التثبيت' : 'Opening Install Prompt')
                        : (isRTL ? 'ثبّت على الديسكتوب' : 'Install on Desktop')}
                    </span>
                  </button>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-base font-semibold text-slate-500 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)]">
                    <Globe className="h-5 w-5" />
                    {isRTL ? 'التثبيت غير ظاهر حاليًا على هذا المتصفح' : 'Install is not currently available in this browser'}
                  </span>
                )}

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#153b66]/15 bg-white/90 px-6 py-3 text-base font-semibold text-[#153b66] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.2)] transition hover:border-[#153b66]/35 hover:bg-white"
                >
                  <span>{isRTL ? 'ابدأ من المنتجات' : 'Start with Products'}</span>
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/80 bg-white/75 px-5 py-4 text-sm leading-7 text-slate-600 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur-xl">
                <p className="font-semibold text-slate-800">{availabilityText}</p>
                <p className="mt-2">
                  {isRTL
                    ? 'ومن داخل تجربة التطبيق نفسها يمكن إضافة خيار حساب بالإيميل لحفظ معلوماتك وطلباتك والرجوع لها بسهولة، مع بقاء الطلب السريع بدون تسجيل متاحًا.'
                    : 'Within the app experience, an optional email-based account can help save your details and order context, while fast guest ordering remains available.'}
                </p>
                {!isConfigured ? (
                  <p className="mt-2 text-[#153b66]">
                    {isRTL
                      ? 'حالياً يمكنك تنزيل تطبيق Android مباشرة، وسيعمل زر iPhone فور إضافة رابط TestFlight.'
                      : 'Right now you can download the Android app directly, and the iPhone button will work as soon as the TestFlight link is added.'}
                  </p>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <div className="absolute inset-x-[14%] top-8 h-24 rounded-full bg-cyan-200/65 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(160deg,#153b66_0%,#1f4f7b_52%,#2b648c_100%)] p-5 text-white shadow-[0_38px_90px_-46px_rgba(15,23,42,0.7)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),rgba(255,255,255,0)_55%)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white/75">{isRTL ? 'لماذا التطبيق؟' : 'Why the App?'}</p>
                      <p className="mt-2 text-2xl font-black">{isRTL ? 'تجربة أقرب لك' : 'A Store That Stays Close'}</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.7rem] border border-white/20 bg-white/10">
                      <Smartphone className="h-8 w-8" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {[
                      {
                        icon: Package,
                        title: isRTL ? 'تصفح المنتجات بسرعة' : 'Quick Product Browsing',
                        text: isRTL
                          ? 'كل الأصناف والعلامات في تجربة واحدة أخف وأسهل على الموبايل.'
                          : 'All products and brands in one experience that feels lighter on mobile.',
                      },
                      {
                        icon: ShoppingCart,
                        title: isRTL ? 'السلة والطلب أوضح' : 'Smoother Ordering Flow',
                        text: isRTL
                          ? 'راجع طلبك وأكمِل بسهولة من واجهة يومية مرتبة وواضحة.'
                          : 'Review and complete your order faster from a clearer daily flow.',
                      },
                      {
                        icon: ShieldCheck,
                        title: isRTL ? 'حفظ بياناتك بشكل اختياري' : 'Optional Account Saving',
                        text: isRTL
                          ? 'إذا حبيت، تقدر تسجل بإيميلك لحفظ بياناتك وطلباتك السابقة والرجوع لها بسهولة، بدون ما يكون التسجيل شرطًا.'
                          : 'If you want, you can sign in with your email to keep your details and past orders easy to revisit, without making sign-up mandatory.',
                      },
                      {
                        icon: MapPin,
                        title: isRTL ? 'مناسب للاستخدام أثناء الحركة' : 'Built for On-the-Go Use',
                        text: isRTL
                          ? 'افتح المتجر من التطبيق الرسمي في ثوانٍ بدون رجوع متكرر للمتصفح.'
                          : 'Launch the store from the official app path in seconds without repeated browser steps.',
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/14">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-base font-bold">{item.title}</p>
                            <p className="mt-1 text-sm leading-7 text-white/75">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.6rem] bg-white/95 px-4 py-4 text-[#153b66] shadow-[0_22px_44px_-30px_rgba(8,15,30,0.45)]">
                    <p className="text-sm font-semibold text-[#4c6784]">{isRTL ? 'ملخص سريع' : 'Quick Summary'}</p>
                    <p className="mt-2 text-lg font-black text-[#14375d]">
                      {isRTL
                        ? 'التطبيق يخلي المتجر أقرب لك: أسرع في التصفح، أسهل في الطلب، ومع خيار حساب اختياري يحفظ معلوماتك وطلباتك للرجوع لها وقت ما تحتاج.'
                        : 'The app keeps the store close: faster to browse, easier to order from, and ready for an optional saved account whenever you want it.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="mb-8 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b738a]">
              {isRTL ? 'مميزات التطبيق' : 'App Highlights'}
            </p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              {isRTL ? 'تجربة مصممة للطلب السريع وحفظ معلوماتك بسهولة' : 'Built for quick ordering and easier saved details'}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07 }}
                className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_28px_80px_-50px_rgba(15,23,42,0.42)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#153b66,#2b648c)] text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="rounded-[2.2rem] border border-white/80 bg-[linear-gradient(145deg,#ffffff_0%,#eef6fb_100%)] p-6 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="mb-8 flex flex-col gap-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b738a]">
                {isRTL ? 'كيف يفيدك التطبيق؟' : 'How the App Helps'}
              </p>
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                {isRTL ? 'من أول تصفح حتى حفظ معلوماتك للطلبات القادمة' : 'From first browse to easier repeat orders'}
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {experienceCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.24)]"
                >
                  <p className="text-sm font-semibold text-[#5a7289]">{card.subtitle}</p>
                  <h3 className="mt-2 text-xl font-black text-slate-900">{card.title}</h3>
                  <div className="mt-5 space-y-3">
                    {card.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#edf4fa] text-[#153b66]">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm leading-7 text-slate-600">{point}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="rounded-[2.2rem] bg-[linear-gradient(135deg,#153b66,#1f4f7b_55%,#2b648c)] p-6 text-white shadow-[0_30px_90px_-50px_rgba(15,23,42,0.7)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
                  {isRTL ? 'جاهز تبدأ؟' : 'Ready to Start?'}
                </p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                  {isRTL ? 'خلّي المتجر أقرب لك كل يوم' : 'Keep the store one tap away every day'}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 sm:text-base">
                  {isRTL
                    ? 'نزّل تطبيق Android مباشرة، أو استخدم رابط TestFlight عند توفره لتثبيت iPhone. ويمكن لاحقًا إضافة حساب بالإيميل لحفظ معلوماتك وطلباتك.'
                    : 'Download the Android app directly, or use the TestFlight link when available to install on iPhone. An optional email account can organize your details later.'}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#153b66] transition hover:bg-[#f6fbff]"
                >
                  <Package className="h-4 w-4" />
                  <span>{isRTL ? 'تصفح المنتجات' : 'Browse Products'}</span>
                </Link>
                <Link
                  to="/offers"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/14"
                >
                  <Star className="h-4 w-4" />
                  <span>{isRTL ? 'استكشف العروض' : 'Explore Offers'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
