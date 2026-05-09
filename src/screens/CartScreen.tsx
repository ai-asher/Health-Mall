import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, Layout, FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { products } from '../mock/products';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import EmptyState from '../components/EmptyState';
import { useCart, type CartItem } from '../store/cart';
import type { RootStackParamList } from '../navigation/RootStack';

export default function CartScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const changeQty = useCart((s) => s.changeQty);
  const remove = useCart((s) => s.remove);
  const [selected, setSelected] = useState<Set<string>>(new Set(items.map((i) => i.productId)));

  React.useEffect(() => {
    setSelected(new Set(items.map((i) => i.productId)));
  }, [items.length]);

  const selectedTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      if (!selected.has(item.productId)) return sum;
      const p = products.find((x) => x.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }, [items, selected]);

  const allSelected = items.length > 0 && selected.size === items.length;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(items.map((i) => i.productId)));
  };

  const handleCheckout = () => {
    const checkoutItems = items.filter((i) => selected.has(i.productId));
    if (checkoutItems.length === 0) return;
    nav.navigate('Checkout', {
      items: checkoutItems.map((i) => ({ productId: i.productId, qty: i.qty, spec: i.spec })),
      total: selectedTotal,
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <PressableScale style={styles.backBtn} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </PressableScale>
        <Text style={styles.headerTitle}>购物车</Text>
        <Text style={styles.headerCount}>({items.length})</Text>
      </SafeAreaView>

      {items.length === 0 ? (
        <EmptyState icon="bag-outline" title="购物车空空如也" subtitle="去逛逛优选好物吧" />
      ) : (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item, i) => (
              <CartRow
                key={item.productId + (item.spec ?? '')}
                item={item}
                index={i}
                selected={selected.has(item.productId)}
                onToggle={() =>
                  setSelected((s) => {
                    const next = new Set(s);
                    if (next.has(item.productId)) next.delete(item.productId);
                    else next.add(item.productId);
                    return next;
                  })
                }
                onChangeQty={(q) => changeQty(item.productId, q)}
                onRemove={() => remove(item.productId)}
              />
            ))}
          </ScrollView>

          <SafeAreaView edges={['bottom']} style={styles.footer}>
            <View style={styles.footRow}>
              <PressableScale style={styles.allRow} onPress={toggleAll}>
                <View style={[styles.checkbox, allSelected && styles.checkboxOn]}>
                  {allSelected && <Ionicons name="checkmark" size={14} color={colors.white} />}
                </View>
                <Text style={styles.allText}>全选</Text>
              </PressableScale>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.totalLabel}>
                  合计：<Text style={styles.totalValue}>¥{selectedTotal.toFixed(2)}</Text>
                </Text>
              </View>
              <PrimaryButton
                title={`结算 (${selected.size})`}
                onPress={handleCheckout}
                fullWidth={false}
                style={{ marginLeft: 12 }}
                size="md"
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
}

function CartRow({
  item,
  index,
  selected,
  onToggle,
  onChangeQty,
  onRemove,
}: {
  item: CartItem;
  index: number;
  selected: boolean;
  onToggle: () => void;
  onChangeQty: (q: number) => void;
  onRemove: () => void;
}) {
  const product = products.find((p) => p.id === item.productId);
  if (!product) return null;

  const renderRight = () => (
    <RectButton style={styles.deleteBtn} onPress={onRemove}>
      <Ionicons name="trash-outline" size={22} color={colors.white} />
      <Text style={styles.deleteText}>删除</Text>
    </RectButton>
  );

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)} layout={Layout.springify()} exiting={FadeOut}>
      <Swipeable renderRightActions={renderRight} overshootRight={false}>
        <View style={styles.row}>
          <PressableScale onPress={onToggle} style={{ marginRight: 12 }}>
            <View style={[styles.checkbox, selected && styles.checkboxOn]}>
              {selected && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>
          </PressableScale>
          <LinearGradient
            colors={product.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.thumb}
          >
            <Text style={styles.thumbText}>{product.title.slice(0, 4)}</Text>
          </LinearGradient>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name} numberOfLines={2}>
              {product.title}
            </Text>
            {item.spec && <Text style={styles.spec}>{item.spec}</Text>}
            <View style={styles.qtyRow}>
              <Text style={styles.price}>¥{product.price.toFixed(2)}</Text>
              <View style={styles.qtyBox}>
                <PressableScale
                  style={styles.qtyBtn}
                  onPress={() => onChangeQty(Math.max(0, item.qty - 1))}
                >
                  <Ionicons name="remove" size={16} color={colors.text} />
                </PressableScale>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <PressableScale style={styles.qtyBtn} onPress={() => onChangeQty(item.qty + 1)}>
                  <Ionicons name="add" size={16} color={colors.text} />
                </PressableScale>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: weight.bold, color: colors.text, marginLeft: 4 },
  headerCount: { fontSize: 14, color: colors.textSecondary, marginLeft: 6 },
  row: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 14,
    marginTop: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbText: { color: colors.white, fontWeight: weight.bold, fontSize: 14 },
  name: { fontSize: 14, color: colors.text, fontWeight: weight.semibold },
  spec: { fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: { fontSize: 16, color: colors.primary, fontWeight: weight.bold },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: 16,
  },
  qtyBtn: { padding: 6, paddingHorizontal: 10 },
  qtyText: { fontSize: 14, fontWeight: weight.semibold, paddingHorizontal: 8 },
  deleteBtn: {
    backgroundColor: colors.error,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginRight: 12,
    borderRadius: 12,
  },
  deleteText: { color: colors.white, fontSize: 12, marginTop: 4 },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  footRow: { flexDirection: 'row', alignItems: 'center' },
  allRow: { flexDirection: 'row', alignItems: 'center' },
  allText: { fontSize: 14, color: colors.text, marginLeft: 6 },
  totalLabel: { fontSize: 13, color: colors.textSecondary },
  totalValue: { fontSize: 20, color: colors.primary, fontWeight: weight.black },
});
