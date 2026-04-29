import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        products: 'المنتجات',
        brands: 'العلامات التجارية',
        offers: 'العروض',
        contact: 'اتصل بنا',
      },
      hero: {
        title: 'مياه نقية، حياة أفضل',
        subtitle: 'اكتشف تشكيلتنا الواسعة من المياه المعبأة عالية الجودة',
        cta: 'تصفح منتجاتنا',
      },
      brands: {
        title: 'علاماتنا التجارية',
        subtitle: 'نقدم لك أفضل العلامات التجارية العالمية والمحلية',
      },
      products: {
        title: 'منتجاتنا',
        subtitle: 'اختر من مجموعتنا المتنوعة من المياه المعبأة',
        categories: {
          all: 'الكل',
          small: 'مياه صغيرة (200-330ml)',
          medium: 'مياه متوسطة (500-600ml)',
          large: 'مياه كبيرة (1.5-5L)',
          gallons: 'جراكن مياه (16-19L)',
        },
        addToCart: 'أضف إلى السلة',
        viewDetails: 'عرض التفاصيل',
        size: 'الحجم',
        bottles: 'عبوة',
      },
      offers: {
        title: 'عروض خاصة',
        subtitle: 'احصل على أفضل العروض الموسمية',
        orderNow: 'اطلب الآن',
        discount: 'خصم',
      },
      features: {
        title: 'لماذا تختارنا؟',
        quality: {
          title: 'جودة عالية',
          desc: 'نقدم مياه نقية 100% معتمدة من الهيئات الصحية',
        },
        delivery: {
          title: 'توصيل سريع',
          desc: 'نوصل طلباتك في أسرع وقت ممكن لجميع المناطق',
        },
        support: {
          title: 'دعم على مدار الساعة',
          desc: 'فريق خدمة العملاء جاهز لمساعدتك في أي وقت',
        },
        prices: {
          title: 'أسعار تنافسية',
          desc: 'أفضل الأسعار مع عروض وخصومات مستمرة',
        },
      },
      testimonials: {
        title: 'آراء عملائنا',
        subtitle: 'ما يقوله عملاؤنا عنا',
      },
      footer: {
        quickLinks: 'روابط سريعة',
        customerService: 'خدمة العملاء',
        contactUs: 'تواصل معنا',
        rights: 'جميع الحقوق محفوظة',
      },
      language: {
        ar: 'العربية',
        en: 'English',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        products: 'Products',
        brands: 'Brands',
        offers: 'Offers',
        contact: 'Contact Us',
      },
      hero: {
        title: 'Pure Water, Better Life',
        subtitle: 'Discover our wide range of high-quality bottled water',
        cta: 'Browse Products',
      },
      brands: {
        title: 'Our Brands',
        subtitle: 'We offer the best international and local brands',
      },
      products: {
        title: 'Our Products',
        subtitle: 'Choose from our diverse collection of bottled water',
        categories: {
          all: 'All',
          small: 'Small Water (200-330ml)',
          medium: 'Medium Water (500-600ml)',
          large: 'Large Water (1.5-5L)',
          gallons: 'Water Gallons (16-19L)',
        },
        addToCart: 'Add to Cart',
        viewDetails: 'View Details',
        size: 'Size',
        bottles: 'bottles',
      },
      offers: {
        title: 'Special Offers',
        subtitle: 'Get the best seasonal deals',
        orderNow: 'Order Now',
        discount: 'OFF',
      },
      features: {
        title: 'Why Choose Us?',
        quality: {
          title: 'High Quality',
          desc: 'We offer 100% pure water certified by health authorities',
        },
        delivery: {
          title: 'Fast Delivery',
          desc: 'We deliver your orders as quickly as possible to all areas',
        },
        support: {
          title: '24/7 Support',
          desc: 'Our customer service team is ready to help you anytime',
        },
        prices: {
          title: 'Competitive Prices',
          desc: 'Best prices with ongoing offers and discounts',
        },
      },
      testimonials: {
        title: 'Customer Reviews',
        subtitle: 'What our customers say about us',
      },
      footer: {
        quickLinks: 'Quick Links',
        customerService: 'Customer Service',
        contactUs: 'Contact Us',
        rights: 'All Rights Reserved',
      },
      language: {
        ar: 'العربية',
        en: 'English',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    showSupportNotice: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
