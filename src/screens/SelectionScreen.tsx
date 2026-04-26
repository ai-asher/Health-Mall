import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

const CATEGORIES = ['全部', '热门产品', '养生滋补', '米面粮油', '日用百货'];

const PRODUCTS = [
  {
    id: '1',
    title: '食用糯米纸（神农御君方）【预计15天内发货】',
    coin: 2000,
    price: '9.90',
    accent: '#F4C04A',
  },
  {
    id: '2',
    title: '黄精阿胶黑芝麻丸（神农御君方）54g/袋',
    coin: 3900,
    price: '59.00',
    accent: '#3F7F8F',
  },
  {
    id: '3',
    title: '带手柄百洁布清洁刷（随机发货）【预计15天内发货】',
    coin: 1200,
    price: '5.90',
    accent: '#E6A37A',
  },
  {
    id: '4',
    title: '草本精油（浣花颜）【预计15天内发货】',
    coin: 4800,
    price: '79.00',
    accent: '#3FA663',
  },
];

export default function SelectionScreen() {
  const [cat, setCat] = useState(0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFB066', '#FF8A3D', colors.bg]}
        locations={[0, 0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.coinCard}>
            <View style={styles.coinTop}>
              <View>
                <Text style={styles.coinLabel}>我的芳华币</Text>
                <Text style={styles.coinValue}>20</Text>
              </View>
              <TouchableOpacity>
                <LinearGradient
                  colors={[colors.orangeStart, colors.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.coinBtn}
                >
                  <Text style={styles.coinBtnText}>获取芳华币</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.coinBottom}>
              <TouchableOpacity style={styles.coinAction}>
                <Ionicons name="server-outline" size={16} color={colors.primary} />
                <Text style={styles.coinActionText}>获得记录</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.coinAction}>
                <Ionicons name="receipt-outline" size={16} color={colors.primary} />
                <Text style={styles.coinActionText}>芳华币订单</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textTertiary} />
            <Text style={styles.searchText}>搜索商品</Text>
          </View>

          <View style={styles.cats}>
            {CATEGORIES.map((c, i) => (
              <TouchableOpacity key={c} onPress={() => setCat(i)} style={styles.catItem}>
                <Text style={[styles.catText, cat === i && styles.catTextActive]}>{c}</Text>
                {cat === i && <View style={styles.catIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.grid}>
            {PRODUCTS.map((p) => (
              <TouchableOpacity key={p.id} style={styles.product}>
                <View style={[styles.productCover, { backgroundColor: p.accent }]} />
                <Text style={styles.productTitle} numberOfLines={2}>{p.title}</Text>
                <View style={styles.productFoot}>
                  <View style={styles.coinTag}>
                    <Text style={styles.coinTagText}>{p.coin}芳华币</Text>
                  </View>
                  <Text style={styles.productPrice}>价值:{p.price}元</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="bag-handle" size={24} color={colors.primary} />
        </TouchableOpacity>
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
  coinTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinLabel: { color: colors.textSecondary, fontSize: 13 },
  coinValue: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 4 },
  coinBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  coinBtnText: { color: colors.white, fontSize: 14, fontWeight: '700' },
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
    marginBottom: 8,
  },
  searchText: { marginLeft: 8, color: colors.textTertiary },
  cats: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 },
  catItem: { marginRight: 16, alignItems: 'center', paddingVertical: 6 },
  catText: { fontSize: 15, color: colors.text },
  catTextActive: { color: colors.primary, fontWeight: '700' },
  catIndicator: {
    marginTop: 4,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    paddingBottom: 10,
  },
  productCover: { width: '100%', aspectRatio: 1 },
  productTitle: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginHorizontal: 8,
    marginTop: 8,
    minHeight: 40,
  },
  productFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 8,
  },
  coinTag: {
    backgroundColor: colors.tagBg,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  coinTagText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  productPrice: { fontSize: 12, color: colors.textTertiary },
  cartBtn: {
    position: 'absolute',
    right: 18,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
