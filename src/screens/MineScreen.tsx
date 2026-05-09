import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import PressableScale from '../components/PressableScale';
import { useUser } from '../store/user';
import { useOrders } from '../store/orders';
import type { RootStackParamList } from '../navigation/RootStack';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const ORDER_GRID: { label: string; icon: IconName; route?: keyof RootStackParamList }[] = [
  { label: '问诊订单', icon: 'document-text-outline' },
  { label: '处方订单', icon: 'reader-outline' },
  { label: '健康疗法', icon: 'heart-outline' },
  { label: '售后服务', icon: 'bookmark-outline' },
  { label: '芳华币订单', icon: 'document-text-outline', route: 'OrderList' },
  { label: '中奖记录', icon: 'gift-outline' },
  { label: '直播订单', icon: 'tv-outline' },
  { label: '直播售后', icon: 'archive-outline' },
];

const SERVICE_GRID: { label: string; icon: IconName; route?: keyof RootStackParamList }[] = [
  { label: '我的处方', icon: 'medical-outline' },
  { label: '我的医生', icon: 'person-circle-outline', route: 'DoctorList' },
  { label: '随访服务', icon: 'calendar-outline' },
  { label: '用药咨询', icon: 'chatbubbles-outline' },
  { label: '用药报告', icon: 'document-attach-outline' },
  { label: '健康档案', icon: 'folder-open-outline', route: 'HealthData' },
  { label: '健康周报', icon: 'create-outline', route: 'HealthData' },
];

export default function MineScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useUser();
  const orderCount = useOrders((s) => s.orders.length);

  const navigate = (route?: keyof RootStackParamList) => {
    if (!route) return;
    if (route === 'HealthData' || route === 'OrderList' || route === 'DoctorList' || route === 'Cart') {
      nav.navigate(route as any);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.peachStart, '#FFF6EE', colors.bg]}
        locations={[0, 0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <PressableScale>
            <Ionicons name="scan-outline" size={22} color={colors.text} />
          </PressableScale>
          <Text style={styles.headerTitle}>个人中心</Text>
          <View style={styles.headerRight}>
            <PressableScale style={{ marginRight: 12 }}>
              <Ionicons name="settings-outline" size={22} color={colors.text} />
            </PressableScale>
            <PressableScale>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.text} />
            </PressableScale>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Animated.View entering={FadeInDown.duration(360)} style={styles.profile}>
            <LinearGradient
              colors={colors.gradOrange}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}
            >
              <Ionicons name="person" size={42} color={colors.white} />
            </LinearGradient>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{user.name}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.text} />
              </View>
              <Text style={styles.userId}>用户号：{user.userId}</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(60).duration(360)} style={styles.statRow}>
            {[
              { v: user.coins, l: '芳华币' },
              { v: user.walletBalance, l: '钱包' },
              { v: user.unusedCoupons, l: '待用券' },
              { v: user.usedCoupons, l: '已用券' },
            ].map((s) => (
              <View key={s.l} style={styles.stat}>
                <Text style={styles.statValue}>{s.v}</Text>
                <Text style={styles.statLabel}>{s.l}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).duration(360)}>
            <LinearGradient
              colors={[colors.orangeStart, colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.exchangeBanner}
            >
              <View style={styles.exchangeLeft}>
                <View style={styles.exchangeBadge}>
                  <Text style={styles.exchangeBadgeText}>芳华币兑换</Text>
                </View>
                <Text style={styles.exchangeSub}>0 元好物任性换</Text>
              </View>
              <PressableScale style={styles.exchangeBtn}>
                <Text style={styles.exchangeBtnText}>立即兑换</Text>
              </PressableScale>
            </LinearGradient>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(360)} style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>我的订单</Text>
              <PressableScale style={styles.sectionMore} onPress={() => nav.navigate('OrderList')}>
                <Text style={styles.sectionMoreText}>全部订单 ({orderCount})</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
              </PressableScale>
            </View>
            <View style={styles.gridWrap}>
              {ORDER_GRID.map((g) => (
                <PressableScale key={g.label} style={styles.gridItem} onPress={() => navigate(g.route)}>
                  <Ionicons name={g.icon} size={28} color={colors.primary} />
                  <Text style={styles.gridLabel}>{g.label}</Text>
                </PressableScale>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(240).duration(360)} style={styles.section}>
            <Text style={styles.sectionTitle}>医疗服务</Text>
            <View style={styles.gridWrap}>
              {SERVICE_GRID.map((g) => (
                <PressableScale key={g.label} style={styles.gridItem} onPress={() => navigate(g.route)}>
                  <Ionicons name={g.icon} size={28} color={colors.text} />
                  <Text style={styles.gridLabel}>{g.label}</Text>
                </PressableScale>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(360)} style={styles.section}>
            <Text style={styles.sectionTitle}>常用工具</Text>
            <View style={styles.toolsRow}>
              <PressableScale style={styles.toolItem} onPress={() => nav.navigate('HealthData')}>
                <View style={[styles.toolIcon, { backgroundColor: 'rgba(255,106,26,0.12)' }]}>
                  <Ionicons name="pulse" size={22} color={colors.primary} />
                </View>
                <Text style={styles.toolLabel}>健康数据</Text>
              </PressableScale>
              <PressableScale style={styles.toolItem} onPress={() => nav.navigate('Cart')}>
                <View style={[styles.toolIcon, { backgroundColor: 'rgba(34,197,94,0.12)' }]}>
                  <Ionicons name="bag" size={22} color={colors.success} />
                </View>
                <Text style={styles.toolLabel}>购物车</Text>
              </PressableScale>
              <PressableScale style={styles.toolItem} onPress={() => nav.navigate('DoctorList')}>
                <View style={[styles.toolIcon, { backgroundColor: 'rgba(59,130,246,0.12)' }]}>
                  <Ionicons name="medical" size={22} color={colors.info} />
                </View>
                <Text style={styles.toolLabel}>找医生</Text>
              </PressableScale>
              <PressableScale style={styles.toolItem}>
                <View style={[styles.toolIcon, { backgroundColor: 'rgba(168,85,247,0.12)' }]}>
                  <Ionicons name="people" size={22} color="#A855F7" />
                </View>
                <Text style={styles.toolLabel}>邀请好友</Text>
              </PressableScale>
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: weight.bold, color: colors.text },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 12 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: weight.bold, color: colors.text, marginRight: 4 },
  userId: { fontSize: 14, color: colors.text, marginTop: 4 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingHorizontal: 16,
  },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: weight.bold, color: colors.text },
  statLabel: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  exchangeBanner: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exchangeLeft: { flex: 1 },
  exchangeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFD89A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  exchangeBadgeText: { color: '#8A4400', fontWeight: weight.bold, fontSize: 13 },
  exchangeSub: { color: colors.white, marginTop: 8, fontSize: 14 },
  exchangeBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  exchangeBtnText: { color: colors.primary, fontWeight: weight.bold },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 14,
  },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: weight.bold, color: colors.text, marginBottom: 8 },
  sectionMore: { flexDirection: 'row', alignItems: 'center' },
  sectionMoreText: { fontSize: 12, color: colors.textSecondary, marginRight: 2 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '25%', alignItems: 'center', paddingVertical: 12 },
  gridLabel: { fontSize: 13, color: colors.text, marginTop: 6 },
  toolsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6 },
  toolItem: { alignItems: 'center' },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolLabel: { fontSize: 12, color: colors.text, marginTop: 8 },
});
