import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { products } from '../mock/products';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../store/cart';
import { useOrders } from '../store/orders';
import type { RootStackParamList } from '../navigation/RootStack';

const PAY_METHODS = [
  { id: 'wechat', name: '微信支付', icon: 'logo-wechat' as const, color: '#06C160' },
  { id: 'alipay', name: '支付宝', icon: 'wallet' as const, color: '#1296DB' },
  { id: 'coin', name: '芳华币抵扣', icon: 'star' as const, color: colors.primary },
];

export default function CheckoutScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Checkout'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { items, total } = route.params;

  const clearCart = useCart((s) => s.clear);
  const removeItem = useCart((s) => s.remove);
  const createOrder = useOrders((s) => s.createOrder);
  const [pay, setPay] = useState(0);

  const shipping = 0;
  const discount = 5;
  const final = Math.max(0, total + shipping - discount);

  const submit = () => {
    const order = createOrder(items, final, '北京市朝阳区望京街 1 号');
    items.forEach((i) => removeItem(i.productId));
    nav.replace('OrderSuccess', { orderId: order.id, total: final });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <PressableScale style={{ padding: 8 }} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </PressableScale>
        <Text style={styles.headerTitle}>结算</Text>
        <View style={{ width: 38 }} />
      </SafeAreaView>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.addressCard}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.addrName}>张先生</Text>
              <Text style={styles.addrPhone}>138****8888</Text>
            </View>
            <Text style={styles.addrText}>北京市朝阳区望京街 1 号 · 望京 SOHO T1 - 1801</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>商品清单</Text>
          {items.map((item) => {
            const p = products.find((x) => x.id === item.productId);
            if (!p) return null;
            return (
              <View key={item.productId + (item.spec ?? '')} style={styles.itemRow}>
                <LinearGradient
                  colors={p.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.itemThumb}
                >
                  <Text style={styles.itemThumbText}>{p.title.slice(0, 3)}</Text>
                </LinearGradient>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {p.title}
                  </Text>
                  {item.spec && <Text style={styles.itemSpec}>{item.spec}</Text>}
                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemPrice}>¥{p.price.toFixed(2)}</Text>
                    <Text style={styles.itemQty}>×{item.qty}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>支付方式</Text>
          {PAY_METHODS.map((m, i) => (
            <PressableScale
              key={m.id}
              onPress={() => setPay(i)}
              style={styles.payRow}
            >
              <Ionicons name={m.icon} size={22} color={m.color} />
              <Text style={styles.payName}>{m.name}</Text>
              <View style={[styles.radio, pay === i && styles.radioOn]}>
                {pay === i && <View style={styles.radioDot} />}
              </View>
            </PressableScale>
          ))}
        </View>

        <View style={styles.section}>
          <SummaryRow label="商品金额" value={`¥${total.toFixed(2)}`} />
          <SummaryRow label="运费" value="包邮" />
          <SummaryRow label="优惠" value={`-¥${discount.toFixed(2)}`} highlight />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>实付</Text>
            <Text style={styles.totalAmount}>¥{final.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.footRow}>
          <View>
            <Text style={styles.footLabel}>实付金额</Text>
            <Text style={styles.footPrice}>¥{final.toFixed(2)}</Text>
          </View>
          <PrimaryButton title="提交订单" onPress={submit} fullWidth={false} style={{ flex: 1, marginLeft: 16 }} size="lg" />
        </View>
      </SafeAreaView>
    </View>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, highlight && { color: colors.primary }]}>{value}</Text>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  headerTitle: { fontSize: 17, fontWeight: weight.bold, color: colors.text },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    margin: 12,
    padding: 14,
    borderRadius: 12,
  },
  addrName: { fontSize: 15, fontWeight: weight.bold, color: colors.text },
  addrPhone: { fontSize: 13, color: colors.textSecondary, marginLeft: 8 },
  addrText: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 12,
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: weight.bold, color: colors.text, marginBottom: 10 },
  itemRow: { flexDirection: 'row', marginTop: 10 },
  itemThumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemThumbText: { color: colors.white, fontWeight: weight.bold, fontSize: 12 },
  itemName: { fontSize: 14, fontWeight: weight.semibold, color: colors.text },
  itemSpec: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  itemPriceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  itemPrice: { fontSize: 14, color: colors.primary, fontWeight: weight.bold },
  itemQty: { fontSize: 13, color: colors.textSecondary },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  payName: { flex: 1, fontSize: 14, color: colors.text, marginLeft: 12 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, color: colors.text },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  totalLabel: { fontSize: 14, color: colors.text, fontWeight: weight.semibold },
  totalAmount: { fontSize: 22, color: colors.primary, fontWeight: weight.black },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  footRow: { flexDirection: 'row', alignItems: 'center' },
  footLabel: { fontSize: 12, color: colors.textSecondary },
  footPrice: { fontSize: 22, color: colors.primary, fontWeight: weight.black },
});
