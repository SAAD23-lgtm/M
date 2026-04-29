import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categories, products } from '@riq/shared';
import { useCart } from '../../../src/features/cart/CartProvider';
import { AccountEntryButton } from '../../../src/components/AccountEntryButton';
import { EmptyState } from '../../../src/components/EmptyState';
import { LanguageToggle } from '../../../src/components/LanguageToggle';
import { PageHeader } from '../../../src/components/PageHeader';
import { ProductCard } from '../../../src/components/ProductCard';
import { ScreenBackground } from '../../../src/components/ScreenBackground';
import { theme } from '../../../src/theme';

type SortKey = 'featured' | 'price-low' | 'price-high' | 'name';
type QuickFilter = 'all' | 'in-stock' | 'discounted' | 'large';

export default function ProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { i18n, t } = useTranslation();
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('featured');
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all');
  const isRTL = i18n.language === 'ar';

  const sortOptions = [
    { id: 'featured' as const, label: isRTL ? 'الأبرز' : 'Featured' },
    { id: 'name' as const, label: isRTL ? 'الاسم' : 'Name' },
    { id: 'price-low' as const, label: isRTL ? 'الأقل سعرًا' : 'Lowest price' },
    { id: 'price-high' as const, label: isRTL ? 'الأعلى سعرًا' : 'Highest price' },
  ];

  const quickFilters = [
    { id: 'all' as const, label: isRTL ? 'الكل' : 'All' },
    { id: 'in-stock' as const, label: isRTL ? 'متوفر' : 'In stock' },
    { id: 'discounted' as const, label: isRTL ? 'مخفض' : 'Discounted' },
    { id: 'large' as const, label: isRTL ? '1.5 لتر' : '1.5L' },
  ];

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let result = products.filter((product) => {
      const matchesCategory = categoryId === 'all' || product.category === categoryId;
      const matchesQuery =
        !needle ||
        product.name.ar.toLowerCase().includes(needle) ||
        product.name.en.toLowerCase().includes(needle) ||
        product.brand.toLowerCase().includes(needle) ||
        product.brandAr.toLowerCase().includes(needle);

      return matchesCategory && matchesQuery;
    });

    if (quickFilter === 'in-stock') {
      result = result.filter((product) => product.inStock);
    }

    if (quickFilter === 'discounted') {
      result = result.filter(
        (product) =>
          typeof product.originalPrice === 'number' && product.originalPrice > product.price
      );
    }

    if (quickFilter === 'large') {
      result = result.filter((product) => product.category === 'large');
    }

    const sorted = [...result];

    if (sortKey === 'price-low') {
      sorted.sort((left, right) => left.price - right.price);
    } else if (sortKey === 'price-high') {
      sorted.sort((left, right) => right.price - left.price);
    } else if (sortKey === 'name') {
      sorted.sort((left, right) =>
        isRTL
          ? left.name.ar.localeCompare(right.name.ar)
          : left.name.en.localeCompare(right.name.en)
      );
    }

    return sorted;
  }, [categoryId, isRTL, query, quickFilter, sortKey]);

  const collectionCards = [
    {
      id: 'daily',
      title: isRTL ? 'استخدام يومي' : 'Daily picks',
      body: isRTL
        ? 'منتجات سريعة للمنازل والطلبات المتكررة.'
        : 'Fast-moving options for homes and repeat orders.',
      count: products.filter((product) => ['small', 'medium'].includes(product.category))
        .length,
      onPress: () => {
        setCategoryId('small');
        setSortKey('featured');
        setQuickFilter('all');
      },
    },
    {
      id: 'discounted',
      title: isRTL ? 'منتجات مخفضة' : 'Discounted picks',
      body: isRTL
        ? 'كل المنتجات التي عليها سعر سابق واضح ومتوفر للطلب الآن.'
        : 'Products with a visible previous price and a current discount.',
      count: products.filter((product) =>
        typeof product.originalPrice === 'number' && product.originalPrice > product.price
      ).length,
      onPress: () => {
        setCategoryId('all');
        setSortKey('featured');
        setQuickFilter('discounted');
      },
    },
    {
      id: 'large',
      title: isRTL ? 'أحجام كبيرة' : 'Large packs',
      body: isRTL
        ? 'عبوات 1.5 لتر للطلبات المنزلية أو التوريد الكبير.'
        : '1.5L packs for home stock and larger supply needs.',
      count: products.filter((product) => product.category === 'large').length,
      onPress: () => {
        setCategoryId('large');
        setQuickFilter('large');
        setSortKey('price-low');
      },
    },
  ];

  return (
    <View style={styles.root}>
      <ScreenBackground />
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(insets.top, 14) + 12 },
        ]}
        columnWrapperStyle={styles.columns}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <PageHeader
              title={t('products.title')}
              subtitle={t('products.subtitle')}
              align={isRTL ? 'right' : 'left'}
            >
              <>
                <AccountEntryButton testID="products-account-action" />
                <LanguageToggle />
              </>
            </PageHeader>

            <View style={styles.summaryCard}>
              <Text
                testID="products-results-count"
                style={[styles.summaryTitle, isRTL && styles.alignRight]}
              >
                {isRTL
                  ? `${filtered.length} منتج بعد التصفية الحالية`
                  : `${filtered.length} products match the current filters`}
              </Text>
              <Text style={[styles.summaryBody, isRTL && styles.alignRight]}>
                {isRTL
                  ? 'النتائج الآن مرتبة من نفس كتالوج الإكسل المشترك مع أحجام أوضح وفلاتر أبسط.'
                  : 'These results now come from the same shared spreadsheet-backed catalog with clearer sizes and simpler filters.'}
              </Text>
            </View>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={t('products.search')}
              style={[styles.search, isRTL && styles.alignRight]}
              textAlign={isRTL ? 'right' : 'left'}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rowChips}
            >
              {quickFilters.map((item) => {
                const active = item.id === quickFilter;
                return (
                  <Pressable
                    key={item.id}
                    testID={`products-quick-filter-${item.id}`}
                    onPress={() => setQuickFilter(item.id)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rowChips}
            >
              {sortOptions.map((item) => {
                const active = item.id === sortKey;
                return (
                  <Pressable
                    key={item.id}
                    testID={`products-sort-${item.id}`}
                    onPress={() => setSortKey(item.id)}
                    style={[styles.sortChip, active && styles.sortChipActive]}
                  >
                    <Text
                      style={[styles.sortChipText, active && styles.sortChipTextActive]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rowChips}
            >
              {categories.map((item) => {
                const active = item.id === categoryId;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setCategoryId(item.id)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {isRTL ? item.nameAr : item.nameEn}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.collectionWrap}>
              {collectionCards.map((item) => (
                <Pressable
                  key={item.id}
                  testID={`products-collection-${item.id}`}
                  onPress={item.onPress}
                  style={styles.collectionCard}
                >
                  <Text style={[styles.collectionTitle, isRTL && styles.alignRight]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.collectionBody, isRTL && styles.alignRight]}>
                    {item.body}
                  </Text>
                  <Text style={[styles.collectionCount, isRTL && styles.alignRight]}>
                    {isRTL ? `${item.count} منتج` : `${item.count} products`}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardSlot}>
            <ProductCard
              product={item}
              isRTL={isRTL}
              onPress={() => router.push(`/product/${item.id}`)}
              onAddToCart={() => addToCart(item)}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title={isRTL ? 'لا توجد نتائج مطابقة' : 'No matching products'}
            body={
              isRTL
                ? 'جرّب تغيير الفئة أو الفرز أو عبارة البحث للوصول لنتائج أقرب.'
                : 'Try changing the category, sort order, or search query to find a better match.'
            }
            ctaLabel={isRTL ? 'إعادة ضبط سريعة' : 'Quick reset'}
            onPress={() => {
              setQuery('');
              setCategoryId('all');
              setQuickFilter('all');
              setSortKey('featured');
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  headerWrap: {
    gap: 14,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 6,
  },
  summaryTitle: {
    color: theme.colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  summaryBody: {
    color: theme.colors.muted,
    lineHeight: 21,
  },
  search: {
    height: 52,
    borderRadius: 24,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    color: theme.colors.text,
  },
  rowChips: {
    gap: 10,
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  chipActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  chipText: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  chipTextActive: {
    color: theme.colors.white,
  },
  sortChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.sand,
    borderWidth: 1,
    borderColor: theme.colors.sandStrong,
  },
  sortChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  sortChipText: {
    color: theme.colors.accent,
    fontWeight: '700',
  },
  sortChipTextActive: {
    color: theme.colors.white,
  },
  collectionWrap: {
    gap: 12,
  },
  collectionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  collectionTitle: {
    color: theme.colors.ink,
    fontSize: 17,
    fontWeight: '800',
  },
  collectionBody: {
    color: theme.colors.muted,
    lineHeight: 21,
  },
  collectionCount: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  columns: {
    gap: 12,
  },
  cardSlot: {
    flex: 1,
    marginBottom: 12,
  },
  alignRight: {
    textAlign: 'right',
  },
});
