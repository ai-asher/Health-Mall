import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const ORDER_GRID: { label: string; icon: IconName }[] = [
  { label: '问诊订单', icon: 'document-text-outline' },
  { label: '处方订单', icon: 'reader-outline' },
  { label: '健康疗法', icon: 'heart-outline' },
  { label: '售后服务', icon: 'bookmark-outline' },
  { label: '芳华币订单', icon: 'document-text-outline' },
  { label: '中奖记录', icon: 'gift-outline' },
  { label: '直播订单', icon: 'tv-outline' },
  { label: '直播售后', icon: 'archive-outline' },
];

const SERVICE_GRID: { label: string; icon: IconName }[] = [
  { label: '我的处方', icon: 'medical-outline' },
  { label: '我的医生', icon: 'person-circle-outline' },
  { label: '随访服务', icon: 'calendar-outline' },
  { label: '用药咨询', icon: 'chatbubbles-outline' },
  { label: '用药报告', icon: 'document-attach-outline' },
  { label: '健康档案', icon: 'folder-open-outline' },
  { label: '健康周报', icon: 'create-outline' },
];

export default function MineScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.peachStart, '#FFF6EE', colors.bg]}
        locations={[0, 0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="scan-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>个人中心</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={{ marginRight: 12 }}>
              <Ionicons name="settings-outline" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={42} color={colors.textSecondary} />
            </View>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>苹果用户7360</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.text} />
              </View>
              <Text style={styles.userId}>用户号：4056899579</Text>
            </View>
          </View>

          <View style={styles.statRow}>
            {[
              { v: '20', l: '芳华币' },
              { v: '0', l: '钱包' },
              { v: '0', l: '待用券' },
              { v: '0', l: '已用券' },
            ].map((s) => (
              <View key={s.l} style={styles.stat}>
                <Text style={styles.statValue}>{s.v}</Text>
                <Text style={styles.statLabel}>{s.l}</Text>
              </View>
            ))}
          </View>

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
            <TouchableOpacity style={styles.exchangeBtn}>
              <Text style={styles.exchangeBtnText}>立即兑换</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>我的订单</Text>
            <View style={styles.gridWrap}>
              {ORDER_GRID.map((g) => (
                <TouchableOpacity key={g.label} style={styles.gridItem}>
                  <Ionicons name={g.icon} size={28} color={colors.primary} />
                  <Text style={styles.gridLabel}>{g.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>医疗服务</Text>
            <View style={styles.gridWrap}>
              {SERVICE_GRID.map((g) => (
                <TouchableOpacity key={g.label} style={styles.gridItem}>
                  <Ionicons name={g.icon} size={28} color={colors.text} />
                  <Text style={styles.gridLabel}>{g.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 12 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EC',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: '700', color: colors.text, marginRight: 4 },
  userId: { fontSize: 14, color: colors.text, marginTop: 4 },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingHorizontal: 16,
  },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.text },
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
  exchangeBadgeText: { color: '#8A4400', fontWeight: '700', fontSize: 13 },
  exchangeSub: { color: colors.white, marginTop: 8, fontSize: 14 },
  exchangeBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  exchangeBtnText: { color: colors.primary, fontWeight: '700' },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text, marginBottom: 8 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '25%', alignItems: 'center', paddingVertical: 12 },
  gridLabel: { fontSize: 13, color: colors.text, marginTop: 6 },
});
