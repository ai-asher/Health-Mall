import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { products } from '../mock/products';
import PressableScale from '../components/PressableScale';
import EmptyState from '../components/EmptyState';
import { useOrders } from '../store/orders';
import type { RootStackParamList } from '../navigation/RootStack';

const TABS = ['全部', '待发货', '已发货', '已完成'];

const STATUS_COLOR: Record<string, string> = {
  待发货: colors.warning,
  已发货: colors.info,
  已完成: colors.success,
};

export default function OrderListScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const orders = useOrders((s) => s.orders);
  const [tab, setTab] = useState(0);

  const filtered = orders.filter((o) => {
    const t = TABS[tab];
    return t === '全部' || o.status === t;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <PressableScale style={{ padding: 8 }} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </PressableScale>
        <Text style={styles.headerTitle}>我的订单</Text>
        <PressableScale style={{ padding: 8 }}>
          <Ionicons name="search" size={22} color={colors.text} />
        </PressableScale>
      </SafeAreaView>

      <View style={styles.tabs}>
        {TABS.map((t, i) => (
          <PressableScale key={t} onPress={() => setTab(i)} style={styles.tab}>
            <Text style={[styles.tabText, tab === i && styles.tabActive]}>{t}</Text>
            {tab === i && <View style={styles.tabIndicator} />}
          </PressableScale>
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState icon="receipt-outline" title="暂无订单" subtitle="快去优选好物吧" />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {filtered.map((o, i) => (
            <Animated.View
              key={o.id}
              entering={FadeInDown.delay(i * 60).duration(360)}
              style={styles.orderCard}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{o.id}</Text>
                <Text style={[styles.orderStatus, { color: STATUS_COLOR[o.status] }]}>
                  {o.status}
                </Text>
              </View>
              {o.items.map((item, idx) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <View key={idx} style={styles.itemRow}>
                    <LinearGradient
                      colors={p.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.thumb}
                    >
                      <Text style={styles.thumbText}>{p.title.slice(0, 3)}</Text>
                    </LinearGradient>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.itemName} numberOfLines={2}>
                        {p.title}
                      </Text>
                      <Text style={styles.itemSpec}>{p.spec}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.itemPrice}>¥{p.price.toFixed(2)}</Text>
                      <Text style={styles.itemQty}>×{item.qty}</Text>
                    </View>
                  </View>
                );
              })}
              <View style={styles.orderFooter}>
                <Text style={styles.totalText}>
                  合计 <Text style={styles.totalPrice}>¥{o.total.toFixed(2)}</Text>
                </Text>
                {o.status === '待发货' && (
                  <PressableScale style={styles.actionBtn}>
                    <Text style={styles.actionText}>提醒发货</Text>
                  </PressableScale>
                )}
                {o.status === '已发货' && (
                  <PressableScale style={[styles.actionBtn, styles.actionPrimary]}>
                    <Text style={[styles.actionText, { color: colors.white }]}>确认收货</Text>
                  </PressableScale>
                )}
                {o.status === '已完成' && (
                  <PressableScale style={styles.actionBtn}>
                    <Text style={styles.actionText}>再次购买</Text>
                  </PressableScale>
                )}
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 8,
  },
  headerTitle: { fontSize: 17, fontWeight: weight.bold, color: colors.text },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  tabText: { fontSize: 14, color: colors.textSecondary },
  tabActive: { color: colors.primary, fontWeight: weight.bold },
  tabIndicator: {
    marginTop: 4,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  orderId: { fontSize: 13, color: colors.textSecondary },
  orderStatus: { fontSize: 13, fontWeight: weight.semibold },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: { color: colors.white, fontSize: 12, fontWeight: weight.bold },
  itemName: { fontSize: 14, color: colors.text },
  itemSpec: { fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  itemPrice: { fontSize: 14, color: colors.text, fontWeight: weight.semibold },
  itemQty: { fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  totalText: { fontSize: 13, color: colors.textSecondary },
  totalPrice: { fontSize: 17, color: colors.primary, fontWeight: weight.black },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: colors.primary,
  },
  actionPrimary: { backgroundColor: colors.primary },
  actionText: { color: colors.primary, fontWeight: weight.semibold, fontSize: 13 },
});
