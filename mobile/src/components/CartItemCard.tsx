import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { formatSarPrice, localizeText, type Product } from '@riq/shared';
import { resolveWebAssetUrl } from '../services/linking';
import { theme } from '../theme';

type CartItemCardProps = {
  product: Product;
  quantity: number;
  isRTL: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItemCard({
  product,
  quantity,
  isRTL,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const imageUri = resolveWebAssetUrl(product.image);

  return (
    <View style={[styles.card, isRTL && styles.cardRtl]}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" /> : null}
      <View style={styles.body}>
        <Text style={[styles.name, isRTL && styles.alignRight]}>{localizeText(product.name, isRTL)}</Text>
        <Text style={[styles.meta, isRTL && styles.alignRight]}>
          {product.size} • {product.quantity}
        </Text>
        <Text style={[styles.price, isRTL && styles.alignRight]}>
          {formatSarPrice(product.price * quantity, isRTL)}
        </Text>
        <View style={[styles.controls, isRTL && styles.controlsRtl]}>
          <View style={[styles.stepper, isRTL && styles.controlsRtl]}>
            <Pressable onPress={onDecrease} style={styles.stepButton}>
              <Text style={styles.stepText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable onPress={onIncrease} style={styles.stepButton}>
              <Text style={styles.stepText}>+</Text>
            </Pressable>
          </View>
          <Pressable onPress={onRemove}>
            <Text style={styles.removeText}>{isRTL ? 'حذف' : 'Remove'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  cardRtl: {
    flexDirection: 'row-reverse',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: theme.colors.sandStrong,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: theme.colors.muted,
    fontSize: 12,
  },
  price: {
    color: theme.colors.accent,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  controls: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlsRtl: {
    flexDirection: 'row-reverse',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: theme.colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  quantity: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  removeText: {
    color: theme.colors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  alignRight: {
    textAlign: 'right',
  },
});
