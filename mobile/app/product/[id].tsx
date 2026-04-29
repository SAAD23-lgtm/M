import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  formatSarPrice,
  getProductById,
  getRelatedProducts,
  localizeText,
} from '@riq/shared';
import { ActionButton } from '../../src/components/ActionButton';
import { AccountEntryButton } from '../../src/components/AccountEntryButton';
import { LanguageToggle } from '../../src/components/LanguageToggle';
import { PageHeader } from '../../src/components/PageHeader';
import { ProductCard } from '../../src/components/ProductCard';
import { ScreenBackground } from '../../src/components/ScreenBackground';
import { useCart } from '../../src/features/cart/CartProvider';
import { resolveWebAssetUrl } from '../../src/services/linking';
import { theme } from '../../src/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { i18n, t } = useTranslation();
  const { addToCart } = useCart();
  const isRTL = i18n.language === 'ar';
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenBackground />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>
            {isRTL ? 'المنتج غير موجود' : 'Product not found'}
          </Text>
          <ActionButton
            label={t('common.backToHome')}
            onPress={() => router.replace('/')}
          />
        </View>
      </View>
    );
  }

  const imageUri = resolveWebAssetUrl(product.image);
  const relatedProducts = getRelatedProducts(product.id, 4);
  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;
  const categoryLabel = product.category === 'large'
    ? (isRTL ? 'عبوة كبيرة' : 'Large pack')
    : product.category === 'medium'
      ? (isRTL ? 'عبوة متوسطة' : 'Medium pack')
      : (isRTL ? 'عبوة صغيرة' : 'Small pack');

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(insets.top, 14) + 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          overline={isRTL ? product.brandAr : product.brand}
          title={localizeText(product.name, isRTL)}
          subtitle={localizeText(product.description, isRTL)}
          align={isRTL ? 'right' : 'left'}
          backButton={{ onPress: () => router.back(), testID: 'product-detail-back' }}
          action={{
            label: t('common.contact'),
            onPress: () => router.push('/contact'),
            variant: 'ghost',
            testID: 'product-detail-contact-header',
          }}
        >
          <>
            <AccountEntryButton testID="product-detail-account-action" variant="secondary" />
            <LanguageToggle />
          </>
        </PageHeader>

        <View style={styles.mediaCard}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
          ) : null}
        </View>

        <View style={styles.priceCard}>
          <View style={[styles.summaryRow, isRTL && styles.summaryRowRtl]}>
            <View style={styles.summaryGroup}>
              <Text style={[styles.price, isRTL && styles.alignRight]}>
                {formatSarPrice(product.price, isRTL)}
              </Text>
              {product.originalPrice ? (
                <Text style={[styles.originalPrice, isRTL && styles.alignRight]}>
                  {formatSarPrice(product.originalPrice, isRTL)}
                </Text>
              ) : null}
            </View>
            <View style={styles.summaryBadge}>
              <Text style={styles.summaryBadgeText}>
                {savings > 0
                  ? (isRTL ? `خصم ${formatSarPrice(savings, isRTL)}` : `Save ${formatSarPrice(savings, isRTL)}`)
                  : categoryLabel}
              </Text>
            </View>
          </View>
          <Text style={[styles.subMeta, isRTL && styles.alignRight]}>
            {product.size} • {product.quantity}{' '}
            {isRTL ? 'وحدة' : 'units'} •{' '}
            {product.inStock
              ? isRTL
                ? 'متوفر الآن'
                : 'In stock now'
              : isRTL
                ? 'غير متوفر'
                : 'Out of stock'}
          </Text>
          {savings > 0 ? (
            <Text style={[styles.savings, isRTL && styles.alignRight]}>
              {isRTL
                ? `توفر ${formatSarPrice(savings, isRTL)} مقارنة بالسعر السابق`
                : `You save ${formatSarPrice(savings, isRTL)} compared with the previous price`}
            </Text>
          ) : null}
          <View style={[styles.actions, isRTL && styles.actionsRtl]}>
            <ActionButton
              testID="product-detail-add-to-cart"
              label={t('common.addToCart')}
              onPress={() => addToCart(product)}
            />
            <ActionButton
              testID="product-detail-contact"
              label={t('common.contact')}
              variant="secondary"
              onPress={() => router.push('/contact')}
            />
          </View>
        </View>

        {product.story ? (
          <View style={styles.block}>
            <Text style={[styles.blockTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'قصة المنتج' : 'Product story'}
            </Text>
            <Text style={[styles.blockBody, isRTL && styles.alignRight]}>
              {localizeText(product.story, isRTL)}
            </Text>
          </View>
        ) : null}

        {product.idealFor?.length ? (
          <View style={styles.block}>
            <Text style={[styles.blockTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'أنسب استخدام' : 'Best for'}
            </Text>
            <View style={[styles.chipsWrap, isRTL && styles.chipsWrapRtl]}>
              {product.idealFor.map((item) => (
                <View key={item.en} style={styles.chip}>
                  <Text style={styles.chipText}>{localizeText(item, isRTL)}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {product.usageMoments?.length ? (
          <View style={styles.block}>
            <Text style={[styles.blockTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'لحظات استخدام مناسبة' : 'Suggested usage moments'}
            </Text>
            <View style={styles.momentStack}>
              {product.usageMoments.map((item) => (
                <View key={item.en} style={styles.momentCard}>
                  <Text style={[styles.momentText, isRTL && styles.alignRight]}>
                    {localizeText(item, isRTL)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {product.purchaseNotes?.length ? (
          <View style={styles.block}>
            <Text style={[styles.blockTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'ملاحظات قبل الطلب' : 'Order notes'}
            </Text>
            <View style={styles.noteStack}>
              {product.purchaseNotes.map((item) => (
                <Text key={item.en} style={[styles.noteText, isRTL && styles.alignRight]}>
                  • {localizeText(item, isRTL)}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {product.quickFacts?.length ? (
          <View style={styles.block}>
            <Text style={[styles.blockTitle, isRTL && styles.alignRight]}>
              {isRTL ? 'حقائق سريعة' : 'Quick facts'}
            </Text>
            {product.quickFacts.map((fact) => (
              <View key={fact.labelEn} style={[styles.factRow, isRTL && styles.actionsRtl]}>
                <Text style={styles.factLabel}>
                  {isRTL ? fact.labelAr : fact.labelEn}
                </Text>
                <Text style={styles.factValue}>
                  {isRTL ? fact.valueAr : fact.valueEn}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {relatedProducts.length ? (
          <View style={styles.section}>
            <PageHeader
              title={isRTL ? 'منتجات مرتبطة' : 'Related products'}
              subtitle={
                isRTL
                  ? 'خيارات قريبة من نفس العلامة أو الفئة لتكملة الطلب.'
                  : 'Nearby picks from the same brand or category to complete the order.'
              }
              align={isRTL ? 'right' : 'left'}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  isRTL={isRTL}
                  compact
                  onPress={() => router.replace(`/product/${related.id}`)}
                  onAddToCart={() => addToCart(related)}
                />
              ))}
            </ScrollView>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
    gap: 18,
  },
  mediaCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  image: {
    width: '100%',
    height: 320,
  },
  priceCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryRowRtl: {
    flexDirection: 'row-reverse',
  },
  summaryGroup: {
    flex: 1,
    gap: 4,
  },
  summaryBadge: {
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.sand,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  summaryBadgeText: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '800',
  },
  price: {
    color: theme.colors.accent,
    fontSize: 28,
    fontWeight: '900',
  },
  originalPrice: {
    color: theme.colors.muted,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  subMeta: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  savings: {
    color: theme.colors.success,
    lineHeight: 22,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionsRtl: {
    flexDirection: 'row-reverse',
  },
  block: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 10,
  },
  blockTitle: {
    color: theme.colors.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  blockBody: {
    color: theme.colors.text,
    lineHeight: 24,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipsWrapRtl: {
    flexDirection: 'row-reverse',
  },
  chip: {
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.sand,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipText: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  momentStack: {
    gap: 10,
  },
  momentCard: {
    borderRadius: 22,
    backgroundColor: theme.colors.sand,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  momentText: {
    color: theme.colors.text,
    lineHeight: 22,
  },
  noteStack: {
    gap: 8,
  },
  noteText: {
    color: theme.colors.text,
    lineHeight: 23,
  },
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  factLabel: {
    color: theme.colors.muted,
  },
  factValue: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  section: {
    gap: 14,
  },
  horizontalList: {
    gap: 12,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  fallbackText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  alignRight: {
    textAlign: 'right',
  },
});
