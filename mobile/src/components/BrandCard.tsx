import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import type { BrandSummary } from '@riq/shared';
import { resolveWebAssetUrl } from '../services/linking';
import { theme } from '../theme';

type BrandCardProps = {
  brand: BrandSummary;
  productCount: number;
  isRTL: boolean;
  onPress: () => void;
};

export function BrandCard({ brand, productCount, isRTL, onPress }: BrandCardProps) {
  const imageUri = resolveWebAssetUrl(brand.logo);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.logoWrap}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.logo} contentFit="cover" />
        ) : (
          <View style={[styles.logo, styles.placeholder]}>
            <Text style={styles.placeholderText}>{brand.name[0]}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.name, isRTL && styles.alignRight]}>
        {isRTL ? brand.nameAr : brand.name}
      </Text>
      <Text style={[styles.count, isRTL && styles.alignRight]}>
        {isRTL ? `${productCount} منتج` : `${productCount} products`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 10,
  },
  logoWrap: {
    backgroundColor: theme.colors.sandStrong,
    borderRadius: 22,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: 120,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.accent,
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  count: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  alignRight: {
    textAlign: 'right',
  },
});
