import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, brands } from '../data/products';
import ProductImage from '../components/ProductImage';
import BrandVisual from '../components/BrandVisual';
import { formatSarPrice } from '../lib/utils';

interface InfiniteScrollProps {
  isRTL: boolean;
}

export default function InfiniteScroll({ isRTL }: InfiniteScrollProps) {
  const row1 = products.slice(0, 8);
  const row2 = products.slice(8, 16);
  const brandsList = brands.slice(0, 12);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-[#f8fcff] overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {isRTL ? 'تشكيلة لا تنتهي من المنتجات' : 'An Endless Collection'}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {isRTL ? 'اسحب لاستكشاف المزيد من منتجاتنا وعلاماتنا التجارية' : 'Scroll to explore more of our products and brands'}
          </p>
        </motion.div>
      </div>

      {/* Row 1 - Products scrolling right */}
      <div className="mb-4 sm:mb-6 overflow-hidden">
        <motion.div
          className="flex gap-4 will-change-transform"
          animate={{ x: isRTL ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...row1, ...row1, ...row1, ...row1, ...row1, ...row1, ...row1, ...row1].map((product, index) => (
            <Link
              key={`row1-${index}`}
              to={`/product/${product.id}`}
              className="group flex-shrink-0 w-[220px] sm:w-[260px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#153b66]/20"
            >
              <div className="relative overflow-hidden">
                <ProductImage
                  product={product}
                  isRTL={isRTL}
                  size="card"
                  className="h-36 sm:h-44"
                  imageClassName="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#153b66] transition-colors">
                  {isRTL ? product.name.ar : product.name.en}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#153b66] font-bold text-sm">{formatSarPrice(product.price, isRTL)}</span>
                  <span className="text-xs text-gray-400">{product.size}</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - Products scrolling left */}
      <div className="mb-4 sm:mb-6 overflow-hidden">
        <motion.div
          className="flex gap-4 will-change-transform"
          animate={{ x: isRTL ? ['50%', '0%'] : ['-50%', '0%'] }}
          transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...row2, ...row2, ...row2, ...row2, ...row2, ...row2, ...row2, ...row2].map((product, index) => (
            <Link
              key={`row2-${index}`}
              to={`/product/${product.id}`}
              className="group flex-shrink-0 w-[200px] sm:w-[240px] bg-gradient-to-br from-[#153b66] to-[#0c2340] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden">
                <ProductImage
                  product={product}
                  isRTL={isRTL}
                  size="card"
                  className="h-32 sm:h-36"
                  imageClassName="group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-sm font-semibold text-white line-clamp-1">
                  {isRTL ? product.name.ar : product.name.en}
                </p>
                <span className="text-yellow-300 font-bold text-sm mt-1 inline-block">{formatSarPrice(product.price, isRTL)}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Row 3 - Brands scrolling right */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 will-change-transform"
          animate={{ x: isRTL ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...brandsList, ...brandsList, ...brandsList, ...brandsList, ...brandsList, ...brandsList, ...brandsList, ...brandsList].map((brand, index) => (
            <Link
              key={`brand-${index}`}
              to={`/brand/${brand.id}`}
              className="group flex-shrink-0 w-[140px] sm:w-[170px] bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#153b66]/15 text-center"
            >
              <BrandVisual
                brand={brand}
                isRTL={isRTL}
                size="compact"
                imageClassName="group-hover:scale-110 transition-transform duration-500"
              />
              <p className="mt-2 text-xs sm:text-sm font-bold text-gray-700 group-hover:text-[#153b66] transition-colors truncate">
                {isRTL ? brand.nameAr : brand.name}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
