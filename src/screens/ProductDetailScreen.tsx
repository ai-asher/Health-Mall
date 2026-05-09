import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { products } from '../mock/products';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../store/cart';
import type { RootStackParamList } from '../navigation/RootStack';

export default function ProductDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const product = products.find((p) => p.id === route.params.productId);
  const add = useCart((s) => s.add);
  const cartCount = useCart((s) => s.count());

  const [picked, setPicked] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    product?.specs.forEach((s) => (init[s.name] = s.options[0]));
    return init;
  });

  if (!product) return null;

  const specStr = Object.values(picked).join(' / ');

  const handleAdd = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    add(product.id, specStr, 1);
  };

  const handleBuy = () => {
    handleAdd();
    setTimeout(() => nav.navigate('Cart'), 200);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={product.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.coverGradient}
      >
        <SafeAreaView edges={['top']} style={styles.headerWrap}>
          <PressableScale style={styles.headerBtn} onPress={() => nav.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.white} />
          </PressableScale>
          <View style={{ flex: 1 }} />
          <PressableScale style={styles.headerBtn}>
            <Ionicons name="share-social-outline" size={20} color={colors.white} />
          </PressableScale>
          <PressableScale style={[styles.headerBtn, { marginLeft: 8 }]} onPress={() => nav.navigate('Cart')}>
            <Ionicons name="bag-handle-outline" size={20} color={colors.white} />
            {cartCount > 0 && (
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>{cartCount}</Text>
              </View>
            )}
          </PressableScale>
        </SafeAreaView>
        <View style={styles.posterArea}>
          <View style={styles.brandTag}>
            <Text style={styles.brandTagText}>{product.brand}</Text>
          </View>
          <Text style={styles.posterTitle}>{product.title}</Text>
          <Text style={styles.posterSubtitle}>{product.subtitle}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.View entering={FadeInDown.duration(400)} style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>¥{product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>¥{product.originalPrice.toFixed(2)}</Text>
            )}
            {product.coinPrice && (
              <View style={styles.coinTag}>
                <Text style={styles.coinTagText}>{product.coinPrice}芳华币可换</Text>
              </View>
            )}
          </View>
          <Text style={styles.salesText}>
            已售 {product.sales.toLocaleString()} · {product.spec}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{product.rating.toFixed(2)}</Text>
            <Text style={styles.ratingDesc}>· 99% 好评</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(400).delay(80)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>商品简介</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(400).delay(160)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>选择规格</Text>
          {product.specs.map((spec) => (
            <View key={spec.name} style={{ marginTop: 8 }}>
              <Text style={styles.specName}>{spec.name}</Text>
              <View style={styles.specRow}>
                {spec.options.map((opt) => {
                  const active = picked[spec.name] === opt;
                  return (
                    <PressableScale
                      key={opt}
                      onPress={() => setPicked((p) => ({ ...p, [spec.name]: opt }))}
                      style={[styles.specChip, active && styles.specChipActive]}
                    >
                      <Text style={[styles.specChipText, active && styles.specChipTextActive]}>
                        {opt}
                      </Text>
                    </PressableScale>
                  );
                })}
              </View>
            </View>
          ))}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(400).delay(240)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>商品详情</Text>
          {[1, 2, 3].map((i) => (
            <LinearGradient
              key={i}
              colors={product.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.detailImg}
            >
              <Text style={styles.detailImgText}>{product.title} 图 {i}</Text>
            </LinearGradient>
          ))}
        </Animated.View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.footRow}>
          <View style={styles.footIcons}>
            <PressableScale style={styles.footIcon}>
              <Ionicons name="storefront-outline" size={22} color={colors.text} />
              <Text style={styles.footIconText}>店铺</Text>
            </PressableScale>
            <PressableScale style={styles.footIcon}>
              <Ionicons name="chatbubble-outline" size={22} color={colors.text} />
              <Text style={styles.footIconText}>客服</Text>
            </PressableScale>
            <PressableScale style={styles.footIcon}>
              <Ionicons name="heart-outline" size={22} color={colors.text} />
              <Text style={styles.footIconText}>收藏</Text>
            </PressableScale>
          </View>
          <View style={styles.footBtns}>
            <PressableScale onPress={handleAdd} style={styles.addBtn}>
              <Text style={styles.addBtnText}>加入购物车</Text>
            </PressableScale>
            <PrimaryButton title="立即购买" onPress={handleBuy} fullWidth={false} style={styles.buyBtn} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  coverGradient: {
    paddingBottom: 28,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: { color: colors.white, fontSize: 10, fontWeight: weight.bold },
  posterArea: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 4 },
  brandTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 10,
  },
  brandTagText: { fontSize: 12, color: '#8A4400', fontWeight: weight.bold },
  posterTitle: {
    fontSize: 32,
    color: colors.white,
    fontWeight: weight.black,
    lineHeight: 38,
  },
  posterSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 8,
    lineHeight: 20,
  },
  body: { flex: 1, marginTop: -14 },
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 12,
  },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap' },
  price: { fontSize: 28, fontWeight: weight.black, color: colors.primary },
  originalPrice: {
    fontSize: 14,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
    marginBottom: 4,
  },
  coinTag: {
    marginLeft: 'auto',
    backgroundColor: colors.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  coinTagText: { color: colors.primary, fontSize: 12, fontWeight: weight.bold },
  salesText: { fontSize: 12, color: colors.textTertiary, marginTop: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontSize: 12, color: colors.text, fontWeight: weight.bold, marginLeft: 4 },
  ratingDesc: { fontSize: 12, color: colors.textTertiary, marginLeft: 4 },
  section: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: weight.bold, color: colors.text, marginBottom: 8 },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  specName: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  specRow: { flexDirection: 'row', flexWrap: 'wrap' },
  specChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.bg,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  specChipActive: { backgroundColor: colors.tagBg, borderColor: colors.primary },
  specChipText: { color: colors.text, fontSize: 13 },
  specChipTextActive: { color: colors.primary, fontWeight: weight.bold },
  detailImg: {
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailImgText: { color: colors.white, fontSize: 18, fontWeight: weight.bold },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  footRow: { flexDirection: 'row', alignItems: 'center' },
  footIcons: { flexDirection: 'row' },
  footIcon: { alignItems: 'center', marginRight: 12 },
  footIconText: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  footBtns: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 8 },
  addBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#FFCB99',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addBtnText: { color: colors.primary, fontWeight: weight.bold, fontSize: 15 },
  buyBtn: { flex: 1 },
});
