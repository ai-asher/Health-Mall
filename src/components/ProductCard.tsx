import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import PressableScale from './PressableScale';
import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import type { Product } from '../mock/products';

type Props = {
  product: Product;
  onPress?: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <PressableScale onPress={onPress} style={styles.card}>
      <LinearGradient
        colors={product.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cover}
      >
        <View style={styles.brandBadge}>
          <Text style={styles.brand}>{product.brand}</Text>
        </View>
        <Text style={styles.posterTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.posterSub} numberOfLines={2}>
          {product.subtitle}
        </Text>
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </LinearGradient>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}（{product.brand}）
        </Text>
        <View style={styles.foot}>
          {product.coinPrice ? (
            <View style={styles.coinTag}>
              <Text style={styles.coinTagText}>{product.coinPrice}芳华币</Text>
            </View>
          ) : (
            <Text style={styles.price}>¥{product.price.toFixed(2)}</Text>
          )}
          <Text style={styles.value}>价值:{product.price.toFixed(2)}元</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
    padding: 10,
    overflow: 'hidden',
  },
  brandBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  brand: { fontSize: 10, color: '#8A4400', fontWeight: weight.bold },
  posterTitle: { color: colors.white, fontWeight: weight.black, fontSize: fontSize.lg },
  posterSub: { color: 'rgba(255,255,255,0.9)', fontSize: 11, marginTop: 6, lineHeight: 14 },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: weight.bold },
  body: { paddingHorizontal: 10, paddingVertical: 8 },
  title: { fontSize: fontSize.base, color: colors.text, fontWeight: weight.semibold, minHeight: 36 },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  coinTag: {
    backgroundColor: colors.tagBg,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  coinTagText: { color: colors.primary, fontSize: 11, fontWeight: weight.bold },
  price: { fontSize: fontSize.md, color: colors.primary, fontWeight: weight.bold },
  value: { fontSize: 11, color: colors.textTertiary },
});
