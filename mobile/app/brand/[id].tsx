import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { brands, getProductsByBrand } from '@riq/shared';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionButton } from '../../src/components/ActionButton';
import { AccountEntryButton } from '../../src/components/AccountEntryButton';
import { LanguageToggle } from '../../src/components/LanguageToggle';
import { PageHeader } from '../../src/components/PageHeader';
import { ProductCard } from '../../src/components/ProductCard';
import { ScreenBackground } from '../../src/components/ScreenBackground';
import { useCart } from '../../src/features/cart/CartProvider';
import { theme } from '../../src/theme';

export default function BrandDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { i18n } = useTranslation();
  const { addToCart } = useCart();
  const isRTL = i18n.language === 'ar';
  const brand = brands.find((item) => item.id === id);

  if (!brand) {
    return (
      <View style={{ flex: 1 }}>
        <ScreenBackground />
        <View style={styles.fallback}>
          <Text style={styles.fallbackText}>{isRTL ? 'العلامة غير موجودة' : 'Brand not found'}</Text>
        </View>
      </View>
    );
  }

  const brandProducts = getProductsByBrand(brand.name);

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: Math.max(insets.top, 14) + 10 },
        ]}
      >
        <PageHeader
          overline={isRTL ? 'العلامة التجارية' : 'Brand'}
          title={isRTL ? brand.nameAr : brand.name}
          subtitle={
            isRTL
              ? `${brandProducts.length} منتج متاح حاليًا داخل التطبيق.`
              : `${brandProducts.length} products currently available in the app.`
          }
          align={isRTL ? 'right' : 'left'}
          backButton={{ onPress: () => router.back(), testID: 'brand-detail-back' }}
        >
          <>
            <AccountEntryButton testID="brand-detail-account-action" />
            <LanguageToggle />
          </>
        </PageHeader>
        <View style={styles.hero}>
          <Text style={[styles.heroText, isRTL && styles.alignRight]}>
            {isRTL
              ? 'واجهة موبايل مركزة لعرض العلامة ثم النزول مباشرة إلى المنتجات المرتبطة بها.'
              : 'A focused native brand surface that leads directly into the matching product set.'}
          </Text>
          <ActionButton
            label={isRTL ? 'العودة للعلامات' : 'Back to brands'}
            variant="secondary"
            onPress={() => router.back()}
          />
        </View>

        <View style={styles.list}>
          {brandProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isRTL={isRTL}
              onPress={() => router.push(`/product/${product.id}`)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 18,
  },
  hero: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 12,
  },
  heroText: {
    color: theme.colors.text,
    lineHeight: 24,
  },
  list: {
    gap: 12,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
