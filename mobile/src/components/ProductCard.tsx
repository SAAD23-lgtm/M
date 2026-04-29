import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { formatSarPrice, localizeText, type Product } from '@riq/shared';
import { resolveWebAssetUrl } from '../services/linking';
import { theme } from '../theme';
import { ActionButton } from './ActionButton';

type ProductCardProps = {
  product: Product;
  isRTL: boolean;
  onPress: () => void;
  onAddToCart: () => void;
  compact?: boolean;
  compactWidth?: number;
  showcase?: boolean;
  entranceDelayMs?: number;
};

export function ProductCard({
  product,
  isRTL,
  onPress,
  onAddToCart,
  compact,
  compactWidth,
  showcase,
  entranceDelayMs,
}: ProductCardProps) {
  const imageUri = resolveWebAssetUrl(product.image);
  const shouldAnimateIn = showcase || entranceDelayMs !== undefined;
  const opacity = useRef(new Animated.Value(shouldAnimateIn ? 0 : 1)).current;
  const translateY = useRef(new Animated.Value(shouldAnimateIn ? 16 : 0)).current;
  const scale = useRef(new Animated.Value(shouldAnimateIn ? 0.98 : 1)).current;
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  useEffect(() => {
    if (!shouldAnimateIn) {
      return undefined;
    }

    const animation = Animated.sequence([
      Animated.delay(entranceDelayMs ?? 0),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 320,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 320,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 320,
          useNativeDriver: false,
        }),
      ]),
    ]);

    animation.start();

    return () => {
      animation.stop();
      opacity.stopAnimation();
      translateY.stopAnimation();
      scale.stopAnimation();
    };
  }, [entranceDelayMs, opacity, scale, shouldAnimateIn, translateY]);

  return (
    <Animated.View
      style={[
        shouldAnimateIn && {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <Pressable
        testID={`product-card-${product.id}`}
        onPress={onPress}
        style={[
          styles.card,
          compact && styles.compactCard,
          compact && compactWidth ? { width: compactWidth } : undefined,
          showcase && styles.showcaseCard,
        ]}
      >
        <View style={[styles.mediaWrap, showcase && styles.showcaseMediaWrap]}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={[styles.image, showcase && styles.showcaseImage]}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={[styles.image, showcase && styles.showcaseImage, styles.placeholder]}>
              <Text style={styles.placeholderText}>{product.brand}</Text>
            </View>
          )}
          <View style={styles.badges}>
            {discount ? (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discount}%</Text>
              </View>
            ) : null}
            <View style={styles.countBadge}>
              <Text style={styles.countText}>x{product.quantity}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.brand, isRTL && styles.alignRight]}>
          {isRTL ? product.brandAr : product.brand}
        </Text>
        <Text numberOfLines={2} style={[styles.name, isRTL && styles.alignRight]}>
          {localizeText(product.name, isRTL)}
        </Text>
        <Text
          numberOfLines={compact ? 2 : 3}
          style={[
            styles.description,
            showcase && styles.showcaseDescription,
            isRTL && styles.alignRight,
          ]}
        >
          {localizeText(product.description, isRTL)}
        </Text>
        <View style={[styles.metaRow, isRTL && styles.metaRowRtl]}>
          <Text style={styles.metaText}>{product.size}</Text>
          <Text style={styles.metaText}>x{product.quantity}</Text>
        </View>
        <Text style={[styles.status, isRTL && styles.alignRight]}>
          {product.inStock
            ? isRTL
              ? 'متوفر الآن'
              : 'In stock'
            : isRTL
              ? 'غير متوفر'
              : 'Out of stock'}
        </Text>
        <View style={[styles.priceRow, isRTL && styles.priceRowRtl]}>
          <Text style={[styles.price, isRTL && styles.alignRight]}>
            {formatSarPrice(product.price, isRTL)}
          </Text>
          {product.originalPrice ? (
            <Text style={[styles.originalPrice, isRTL && styles.alignRight]}>
              {formatSarPrice(product.originalPrice, isRTL)}
            </Text>
          ) : null}
        </View>
        <ActionButton
          testID={`add-to-cart-${product.id}`}
          label={isRTL ? 'أضف للسلة' : 'Add to cart'}
          onPress={onAddToCart}
          style={compact ? styles.buttonCompact : undefined}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.card,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.line,
    gap: 8,
  },
  compactCard: {
    width: 260,
  },
  showcaseCard: {
    borderRadius: 30,
    padding: 16,
    gap: 10,
    shadowColor: '#10253f',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 3,
  },
  mediaWrap: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: theme.colors.sandStrong,
    position: 'relative',
  },
  showcaseMediaWrap: {
    borderRadius: 24,
    backgroundColor: theme.colors.sand,
  },
  image: {
    width: '100%',
    height: 156,
  },
  showcaseImage: {
    height: 176,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.accent,
    fontWeight: '700',
  },
  brand: {
    color: theme.colors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
  },
  badges: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountBadge: {
    borderRadius: theme.radius.pill,
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  discountText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  countBadge: {
    borderRadius: theme.radius.pill,
    backgroundColor: '#ffffffeb',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  countText: {
    color: theme.colors.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '800',
    minHeight: 44,
  },
  description: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  showcaseDescription: {
    minHeight: 40,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaRowRtl: {
    flexDirection: 'row-reverse',
  },
  metaText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  status: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 4,
  },
  priceRowRtl: {
    flexDirection: 'row-reverse',
  },
  price: {
    color: theme.colors.accent,
    fontSize: 18,
    fontWeight: '800',
  },
  originalPrice: {
    color: theme.colors.muted,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  buttonCompact: {
    minHeight: 44,
  },
  alignRight: {
    textAlign: 'right',
  },
});
