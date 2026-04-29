import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { brands, getProductsByBrand } from '@riq/shared';
import { AccountEntryButton } from '../../../src/components/AccountEntryButton';
import { BrandCard } from '../../../src/components/BrandCard';
import { LanguageToggle } from '../../../src/components/LanguageToggle';
import { PageHeader } from '../../../src/components/PageHeader';
import { ScreenBackground } from '../../../src/components/ScreenBackground';
import { theme } from '../../../src/theme';

export default function BrandsScreen() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const [query, setQuery] = useState('');
  const isRTL = i18n.language === 'ar';

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return brands.filter((brand) => {
      if (!needle) {
        return true;
      }

      return (
        brand.name.toLowerCase().includes(needle) ||
        brand.nameAr.toLowerCase().includes(needle)
      );
    });
  }, [query]);

  return (
    <View style={styles.root}>
      <ScreenBackground />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <PageHeader
              title={t('brands.title')}
              subtitle={t('brands.subtitle')}
              align={isRTL ? 'right' : 'left'}
            >
              <>
                <AccountEntryButton testID="brands-account-action" />
                <LanguageToggle />
              </>
            </PageHeader>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={isRTL ? 'ابحث عن علامة...' : 'Search a brand...'}
              style={[styles.search, isRTL && styles.alignRight]}
              textAlign={isRTL ? 'right' : 'left'}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardSlot}>
            <BrandCard
              brand={item}
              productCount={getProductsByBrand(item.name).length}
              isRTL={isRTL}
              onPress={() => router.push(`/brand/${item.id}`)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 120,
  },
  headerWrap: {
    gap: 14,
    marginBottom: 18,
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
