import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_LINK } from '../lib/contact';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.8rem)] right-3 z-50 flex items-center justify-end pointer-events-none sm:right-4 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRTL ? -10 : 10, scale: 0.9 }}
            className={`pointer-events-none absolute ${isRTL ? 'left-[4.25rem]' : 'right-[4.25rem]'} whitespace-nowrap bg-white text-[#153b66] px-4 py-2 rounded-2xl shadow-xl font-bold text-sm border border-gray-100 flex items-center gap-2`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {isRTL ? 'نحن هنا لمساعدتك!' : 'We are here to help!'}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        className="relative z-10 flex h-10 w-10 pointer-events-auto items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all group hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] sm:h-14 sm:w-14"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
          className="relative z-10"
        >
          <MessageCircle className="h-5 w-5 text-white sm:h-7 sm:w-7" />
        </motion.div>
        
        {/* Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 bg-green-400 rounded-full -z-10"
        />
        
        {/* Rotating border on hover */}
        <div className="absolute -inset-1 rounded-full border border-green-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.a>
    </div>
  );
}
