import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/RootStack';

const { width: W, height: H } = Dimensions.get('window');
const CONFETTI_COUNT = 30;
const CONFETTI_COLORS = ['#FF6A1A', '#FFB066', '#22C55E', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

export default function OrderSuccessScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'OrderSuccess'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { orderId, total } = route.params;

  const checkScale = useSharedValue(0);
  const checkRotate = useSharedValue(-30);
  const titleOp = useSharedValue(0);

  useEffect(() => {
    checkScale.value = withSequence(
      withTiming(1.25, { duration: 380 }),
      withSpring(1, { damping: 8, stiffness: 180 }),
    );
    checkRotate.value = withSpring(0, { damping: 10, stiffness: 100 });
    titleOp.value = withDelay(280, withTiming(1, { duration: 400 }));
  }, [checkScale, checkRotate, titleOp]);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }, { rotate: `${checkRotate.value}deg` }],
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOp.value,
    transform: [{ translateY: (1 - titleOp.value) * 12 }],
  }));

  const goHome = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      }),
    );
  };

  const goOrders = () => {
    nav.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Tabs' }, { name: 'OrderList' }],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.peachStart, '#FFF6EE', colors.bg]} style={StyleSheet.absoluteFill} />

      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <Confetto key={i} delay={i * 60} />
      ))}

      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <PressableScale onPress={goHome} style={{ padding: 8 }}>
          <Ionicons name="close" size={24} color={colors.text} />
        </PressableScale>
      </SafeAreaView>

      <View style={styles.body}>
        <Animated.View style={[styles.checkCircle, checkStyle]}>
          <Ionicons name="checkmark" size={64} color={colors.white} />
        </Animated.View>

        <Animated.View style={[{ alignItems: 'center' }, titleStyle]}>
          <Text style={styles.title}>下单成功</Text>
          <Text style={styles.subtitle}>感谢您的购买，订单已生成</Text>

          <View style={styles.card}>
            <Row label="订单号" value={orderId} />
            <Row label="实付金额" value={`¥${total.toFixed(2)}`} highlight />
            <Row label="预计发货" value="24 小时内" />
            <Row label="赠送芳华币" value="+200" highlight />
          </View>
        </Animated.View>
      </View>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={{ flexDirection: 'row' }}>
          <PressableScale style={styles.outlineBtn} onPress={goHome}>
            <Text style={styles.outlineText}>返回首页</Text>
          </PressableScale>
          <PrimaryButton title="查看订单" onPress={goOrders} fullWidth={false} style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    </View>
  );
}

function Confetto({ delay }: { delay: number }) {
  const x = Math.random() * W;
  const startY = -40;
  const endY = H + 80;
  const tx = useSharedValue(x);
  const ty = useSharedValue(startY);
  const rot = useSharedValue(0);
  const op = useSharedValue(0);

  useEffect(() => {
    op.value = withDelay(delay, withTiming(1, { duration: 200 }));
    ty.value = withDelay(
      delay,
      withTiming(endY, { duration: 2400 + Math.random() * 1800 }),
    );
    tx.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(x + (Math.random() - 0.5) * 80, { duration: 800 }),
          withTiming(x - (Math.random() - 0.5) * 80, { duration: 800 }),
        ),
        -1,
        true,
      ),
    );
    rot.value = withDelay(
      delay,
      withRepeat(withTiming(360, { duration: 1200 }), -1, false),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { rotate: `${rot.value}deg` }],
    opacity: op.value,
  }));
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.confetto,
        style,
        { backgroundColor: color, width: 8 + Math.random() * 6, height: 12 + Math.random() * 8 },
      ]}
    />
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && { color: colors.primary, fontWeight: weight.bold }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrap: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 8 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  checkCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    marginBottom: 30,
  },
  title: { fontSize: 28, fontWeight: weight.black, color: colors.text },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: { fontSize: 14, color: colors.textSecondary },
  rowValue: { fontSize: 14, color: colors.text },
  footer: { paddingHorizontal: 16, paddingBottom: 12 },
  outlineBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  outlineText: { color: colors.primary, fontWeight: weight.bold, fontSize: 15 },
  confetto: { position: 'absolute', borderRadius: 2 },
});
