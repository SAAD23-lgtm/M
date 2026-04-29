import { FlatList, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../../src/features/cart/CartProvider';
import { getOfferProducts } from '../../../src/features/catalog/selectors';
import { AccountEntryButton } from '../../../src/components/AccountEntryButton';
import { LanguageToggle } from '../../../src/components/LanguageToggle';
import { PageHeader } from '../../../src/components/PageHeader';
import { ProductCard } from '../../../src/components/ProductCard';
import { ScreenBackground } from '../../../src/components/ScreenBackground';

export default function OffersScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const { addToCart } = useCart();
  const isRTL = i18n.language === 'ar';
  const offers = getOfferProducts();

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground />
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <PageHeader
              title={t('offers.title')}
              subtitle={t('offers.subtitle')}
              align={isRTL ? 'right' : 'left'}
            >
              <>
                <AccountEntryButton testID="offers-account-action" />
                <LanguageToggle />
              </>
            </PageHeader>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 120,
    gap: 12,
  },
  headerWrap: {
    marginBottom: 18,
  },
  cardSlot: {
    marginBottom: 12,
  },
});
