import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';

const TOP_TABS = ['名家讲堂', '学习中心', '医疗服务', '健康管理'];
const CATEGORY_TABS = ['精选', '病症', '名家', '养生'];

const COURSES = [
  {
    id: '1',
    title: '九种体质养生',
    desc: '知体质，辨健康，九种体质…',
    publisher: '御君方名医堂',
    likes: 3748,
    accent: '#B83A2B',
  },
  {
    id: '2',
    title: '健康好油：甘油二酯油',
    desc: '减少甘油三酯摄入，日常煎炒烹炸均可',
    publisher: '中医健康达人',
    likes: 643,
    accent: '#5B3F8F',
  },
  {
    id: '3',
    title: '芳华杯病例大赛',
    desc: '首届"芳华杯"病例大赛全国总决赛',
    publisher: '御君方互联网医院',
    likes: 2104,
    accent: '#1E3A8A',
  },
  {
    id: '4',
    title: '星光贺岁 解锁新春',
    desc: 'VIP 福气满屏 快来围观',
    publisher: '中医健康达人',
    likes: 8821,
    accent: '#A21D26',
  },
];

export default function HealthScreen() {
  const [topIdx, setTopIdx] = useState(0);
  const [catIdx, setCatIdx] = useState(0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.peachStart, '#FFF6EE', colors.bg]}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topTabs}>
          {TOP_TABS.map((tab, i) => (
            <TouchableOpacity key={tab} onPress={() => setTopIdx(i)} style={styles.topTab}>
              <Text style={[styles.topTabText, topIdx === i && styles.topTabTextActive]}>
                {tab}
              </Text>
              {topIdx === i && <View style={styles.topTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.textTertiary} />
            <Text style={styles.searchPlaceholder}>搜索课程内容</Text>
          </View>

          <LinearGradient
            colors={['#1F6E3E', '#3FA663']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerLeft}>
              <Text style={styles.bannerTitle}>药食同源 茯苓粉</Text>
              <Text style={styles.bannerSub}>湿气去一去</Text>
              <Text style={styles.bannerSub}>脾胃养一养</Text>
              <Text style={styles.bannerSub}>吃饭香精神旺</Text>
              <View style={styles.bannerCta}>
                <Text style={styles.bannerCtaText}>养生常备 {'>>>'}</Text>
              </View>
            </View>
            <View style={styles.bannerProductBox}>
              <Text style={styles.bannerProductText}>茯苓粉</Text>
            </View>
          </LinearGradient>

          <View style={styles.bannerDots}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>名医讲堂</Text>
            <TouchableOpacity style={styles.moreRow}>
              <Text style={styles.more}>更多讲堂</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.catTabs}>
            {CATEGORY_TABS.map((c, i) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCatIdx(i)}
                style={[styles.catTab, catIdx === i && styles.catTabActive]}
              >
                <Text style={[styles.catTabText, catIdx === i && styles.catTabTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.courseGrid}>
            {COURSES.map((c) => (
              <TouchableOpacity key={c.id} style={styles.courseCard}>
                <View style={[styles.courseCover, { backgroundColor: c.accent }]}>
                  <Text style={styles.courseCoverTitle}>{c.title}</Text>
                  <View style={styles.playOverlay}>
                    <Ionicons name="play" size={22} color={colors.white} />
                  </View>
                </View>
                <Text style={styles.courseTitle} numberOfLines={1}>{c.title}</Text>
                <Text style={styles.courseDesc} numberOfLines={1}>{c.desc}</Text>
                <View style={styles.courseFoot}>
                  <Text style={styles.coursePublisher} numberOfLines={1}>{c.publisher}</Text>
                  <View style={styles.likeRow}>
                    <Ionicons name="heart-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.likeNum}>{c.likes}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topTabs: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  topTab: { marginRight: 20, paddingVertical: 8, alignItems: 'center' },
  topTabText: { fontSize: 18, color: colors.text, fontWeight: '500' },
  topTabTextActive: { color: colors.primary, fontWeight: '700', fontSize: 22 },
  topTabIndicator: {
    marginTop: 4,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: { marginLeft: 8, color: colors.textTertiary, fontSize: 14 },
  banner: {
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 160,
  },
  bannerLeft: { flex: 1 },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: colors.white, marginBottom: 6 },
  bannerSub: { fontSize: 14, color: colors.white, lineHeight: 20 },
  bannerCta: {
    marginTop: 10,
    backgroundColor: '#FFB066',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bannerCtaText: { color: colors.white, fontWeight: '700' },
  bannerProductBox: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#0F4D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerProductText: { color: '#F5C84B', fontWeight: '700', fontSize: 18 },
  bannerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9DDE3',
    marginHorizontal: 3,
  },
  dotActive: { width: 14, backgroundColor: colors.white },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  moreRow: { flexDirection: 'row', alignItems: 'center' },
  more: { fontSize: 13, color: colors.textSecondary, marginRight: 2 },
  catTabs: { flexDirection: 'row', paddingHorizontal: 12, marginTop: 12 },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  catTabActive: { backgroundColor: colors.white },
  catTabText: { fontSize: 14, color: colors.text },
  catTabTextActive: { color: colors.primary, fontWeight: '700' },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  courseCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 8,
    marginBottom: 12,
  },
  courseCover: {
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  courseCoverTitle: { color: colors.white, fontWeight: '900', fontSize: 14 },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginTop: 2 },
  courseDesc: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  courseFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  coursePublisher: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  likeRow: { flexDirection: 'row', alignItems: 'center' },
  likeNum: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },
});
