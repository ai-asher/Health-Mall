import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { courses, courseCategories } from '../mock/courses';
import Banner, { type BannerSlide } from '../components/Banner';
import CourseCard from '../components/CourseCard';
import PressableScale from '../components/PressableScale';
import type { RootStackParamList } from '../navigation/RootStack';

const TOP_TABS = ['名家讲堂', '学习中心', '医疗服务', '健康管理'];

const BANNERS: BannerSlide[] = [
  {
    id: 'b1',
    title: '药食同源 茯苓粉',
    subtitle: '湿气去一去 脾胃养一养 吃饭香精神旺',
    cta: '养生常备',
    gradient: ['#1F6E3E', '#3FA663'] as const,
    posterText: '茯苓粉',
    posterSubtext: '90g/盒',
  },
  {
    id: 'b2',
    title: '黄精阿胶黑芝麻丸',
    subtitle: '九蒸九晒 匠心传承 营养高钙',
    cta: '立即购买',
    gradient: ['#1E40AF', '#3B82F6'] as const,
    posterText: '阿胶丸',
    posterSubtext: '54g/袋',
  },
  {
    id: 'b3',
    title: '九种体质对症养',
    subtitle: '名医开课 精准辨识体质',
    cta: '免费学习',
    gradient: ['#7F1D1D', '#DC2626'] as const,
    posterText: '九体质',
    posterSubtext: '中医精讲',
  },
  {
    id: 'b4',
    title: '24 节气养生',
    subtitle: '顺应天时 未病先防',
    cta: '观看课程',
    gradient: ['#7C3AED', '#A855F7'] as const,
    posterText: '节气养生',
    posterSubtext: '4 季 24 课',
  },
];

export default function HealthScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [topIdx, setTopIdx] = useState(0);
  const [catIdx, setCatIdx] = useState(0);

  const filteredCourses = useMemo(() => {
    const cat = courseCategories[catIdx];
    return courses.filter((c) => c.category === cat);
  }, [catIdx]);

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
            <PressableScale key={tab} onPress={() => setTopIdx(i)} style={styles.topTab}>
              <Text style={[styles.topTabText, topIdx === i && styles.topTabTextActive]}>
                {tab}
              </Text>
              {topIdx === i && <View style={styles.topTabIndicator} />}
            </PressableScale>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.textTertiary} />
            <Text style={styles.searchPlaceholder}>搜索课程内容</Text>
          </View>

          <View style={{ marginTop: 14 }}>
            <Banner slides={BANNERS} />
          </View>

          <View style={styles.quickRow}>
            {[
              { icon: 'medical', label: '在线问诊', color: colors.primary, action: () => nav.navigate('DoctorList') },
              { icon: 'pulse', label: '健康数据', color: colors.like, action: () => nav.navigate('HealthData') },
              { icon: 'storefront', label: '芳华商城', color: colors.success },
              { icon: 'school', label: '名家讲堂', color: colors.info },
              { icon: 'gift', label: '芳华兑换', color: colors.warning },
            ].map((q) => (
              <PressableScale key={q.label} onPress={q.action} style={styles.quickItem}>
                <View style={[styles.quickIcon, { backgroundColor: `${q.color}22` }]}>
                  <Ionicons name={q.icon as any} size={22} color={q.color} />
                </View>
                <Text style={styles.quickLabel}>{q.label}</Text>
              </PressableScale>
            ))}
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>名医讲堂</Text>
            <PressableScale style={styles.moreRow}>
              <Text style={styles.more}>更多讲堂</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
            </PressableScale>
          </View>

          <View style={styles.catTabs}>
            {courseCategories.map((c, i) => (
              <PressableScale
                key={c}
                onPress={() => setCatIdx(i)}
                style={[styles.catTab, catIdx === i && styles.catTabActive]}
              >
                <Text style={[styles.catTabText, catIdx === i && styles.catTabTextActive]}>
                  {c}
                </Text>
              </PressableScale>
            ))}
          </View>

          <View style={styles.courseGrid}>
            {filteredCourses.map((c, i) => (
              <Animated.View key={c.id} entering={FadeInDown.delay(i * 60).duration(360)} style={{ width: '48%' }}>
                <CourseCard
                  course={c}
                  onPress={() => nav.navigate('CourseDetail', { courseId: c.id })}
                />
              </Animated.View>
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
  topTabText: { fontSize: 18, color: colors.text, fontWeight: weight.medium },
  topTabTextActive: { color: colors.primary, fontWeight: weight.black, fontSize: 22 },
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
  quickRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: 'space-between',
  },
  quickItem: { alignItems: 'center', flex: 1 },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: { fontSize: 12, color: colors.text, marginTop: 6 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionTitle: { fontSize: 18, fontWeight: weight.bold, color: colors.text },
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
  catTabTextActive: { color: colors.primary, fontWeight: weight.bold },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
  },
});
