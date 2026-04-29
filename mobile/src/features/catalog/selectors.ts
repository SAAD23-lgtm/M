import { brands, getProductsByBrand, products } from '@riq/shared';

export function getFeaturedProducts(limit = 6) {
  return products.slice(0, limit);
}

export function getOfferProducts() {
  return products.filter(
    (product) =>
      typeof product.originalPrice === 'number' && product.originalPrice > product.price
  );
}

export function getDiscountedProducts(limit = 8) {
  return products
    .filter(
      (product) =>
        typeof product.originalPrice === 'number' && product.originalPrice > product.price
    )
    .slice(0, limit);
}

export function getTopRatedProducts(limit = 8) {
  return products.slice(0, limit);
}

export function getInStockProducts(limit = products.length) {
  return products.filter((product) => product.inStock).slice(0, limit);
}

export function getSpotlightBrands(limit = 8) {
  return [...brands]
    .sort((a, b) => getProductsByBrand(b.name).length - getProductsByBrand(a.name).length)
    .slice(0, limit);
}
