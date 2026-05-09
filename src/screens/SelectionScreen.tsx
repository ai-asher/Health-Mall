import React, { useMemo, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { products, productCategories } from '../mock/products';
import ProductCard from '../components/ProductCard';
import PressableScale from '../components/PressableScale';
import { useUser } from '../store/user';
import { useCart } from '../store/cart';
import type { RootStackParamList } from '../navigation/RootStack';

export default function SelectionScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [cat, setCat] = useState(0);
  const coins = useUser((s) => s.coins);
  const cartCount = useCart((s) => s.count());

  const cartScale = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    if (cartCount === 0) return;
    Animated.sequence([
      Animated.timing(cartScale, { toValue: 1.3, duration: 120, useNativeDriver: true }),
      Animated.spring(cartScale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  }, [cartCount, cartScale]);

  const filtered = useMemo(() => {
    const name = productCategories[cat];
    if (name === '全部') return products;
    if (name === '热门产品') return [...products].sort((a, b) => b.sales - a.sales).slice(0, 6);
    return products.filter((p) => p.category === name);
  }, [cat]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFB066', '#FF8A3D', colors.bg]}
        locations={[0, 0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.coinCard}>
            <View style={styles.coinTop}>
              <View>
                <Text style={styles.coinLabel}>我的芳华币</Text>
                <Text style={styles.coinValue}>{coins}</Text>
              </View>
              <PressableScale>
                <LinearGradient
                  colors={[colors.orangeStart, colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.coinBtn}
                >
                  <Text style={styles.coinBtnText}>获取芳华币</Text>
                </LinearGradient>
              </PressableScale>
            </View>
            <View style={styles.coinBottom}>
              <PressableScale style={styles.coinAction}>
                <Ionicons name="server-outline" size={16} color={colors.primary} />
                <Text style={styles.coinActionText}>获得记录</Text>
              </PressableScale>
              <View style={styles.divider} />
              <PressableScale style={styles.coinAction}>
                <Ionicons name="receipt-outline" size={16} color={colors.primary} />
                <Text style={styles.coinActionText}>芳华币订单</Text>
              </PressableScale>
            </View>
          </View>

          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textTertiary} />
            <Text style={styles.searchText}>搜索商品</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            {productCategories.map((c, i) => (
              <PressableScale key={c} onPress={() => setCat(i)} style={{ marginRight: 16 }}>
                <Text style={[styles.catText, cat === i && styles.catTextActive]}>{c}</Text>
                {cat === i && <View style={styles.catIndicator} />}
              </PressableScale>
            ))}
          </ScrollView>

          <View style={styles.grid}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onPress={() => nav.navigate('ProductDetail', { productId: p.id })}
              />
            ))}
          </View>
        </ScrollView>

        <PressableScale style={styles.cartBtn} onPress={() => nav.navigate('Cart')}>
          <Animated.View style={{ transform: [{ scale: cartScale }] }}>
            <Ionicons name="bag-handle" size={26} color={colors.primary} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </Animated.View>
        </PressableScale>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  coinCard: {
    margin: 16,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
  },
  coinTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  coinLabel: { color: colors.textSecondary, fontSize: 13 },
  coinValue: { color: colors.text, fontSize: 30, fontWeight: weight.black, marginTop: 4 },
  coinBtn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24 },
  coinBtnText: { color: colors.white, fontSize: 14, fontWeight: weight.bold },
  coinBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  coinAction: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  coinActionText: { color: colors.text, fontSize: 14, marginLeft: 6 },
  divider: { width: 1, backgroundColor: colors.divider },
  search: {
    marginHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: { marginLeft: 8, color: colors.textTertiary },
  catText: { fontSize: 15, color: colors.text, paddingVertical: 6 },
  catTextActive: { color: colors.primary, fontWeight: weight.bold },
  catIndicator: {
    marginTop: 2,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    marginTop: 6,
  },
  cartBtn: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: colors.white, fontSize: 11, fontWeight: weight.bold },
});
