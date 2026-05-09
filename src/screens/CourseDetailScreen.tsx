import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Layout,
} from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import { courses } from '../mock/courses';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/RootStack';

const { width: W } = Dimensions.get('window');
const HEADER_H = 280;

const TABS = ['课程介绍', '章节', '评价'] as const;

export default function CourseDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CourseDetail'>>();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const course = courses.find((c) => c.id === route.params.courseId);
  const [tab, setTab] = useState(0);
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set());

  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      y.value = e.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const scale = interpolate(y.value, [-150, 0], [1.5, 1], Extrapolate.CLAMP);
    const ty = interpolate(y.value, [0, HEADER_H], [0, -HEADER_H * 0.4], Extrapolate.CLAMP);
    return { transform: [{ scale }, { translateY: ty }] };
  });

  const navBgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, [HEADER_H * 0.4, HEADER_H * 0.7], [0, 1], Extrapolate.CLAMP),
  }));

  if (!course) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: HEADER_H }, headerStyle]}>
        <LinearGradient
          colors={course.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.posterCenter}>
          <View style={styles.brandBadge}>
            <Text style={styles.brand}>御君方</Text>
          </View>
          <Text style={styles.posterTitle}>{course.title}</Text>
          <Text style={styles.posterSubtitle}>{course.subtitle}</Text>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_H, paddingBottom: 100 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <View style={styles.titleCard}>
            <Text style={styles.title}>{course.title}</Text>
            <Text style={styles.subtitle}>{course.subtitle}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.lessons}</Text>
                <Text style={styles.metaLabel}>课时</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.duration}</Text>
                <Text style={styles.metaLabel}>总时长</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.students.toLocaleString()}</Text>
                <Text style={styles.metaLabel}>学员</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaValue}>{course.rating}</Text>
                <Text style={styles.metaLabel}>评分</Text>
              </View>
            </View>
          </View>

          <View style={styles.doctorCard}>
            <LinearGradient
              colors={course.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.doctorAvatar}
            >
              <Ionicons name="person" size={24} color={colors.white} />
            </LinearGradient>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.doctorName}>{course.doctor}</Text>
              <Text style={styles.doctorTitle}>{course.doctorTitle}</Text>
            </View>
            <PressableScale style={styles.followBtn}>
              <Text style={styles.followText}>+ 关注</Text>
            </PressableScale>
          </View>

          <View style={styles.tabs}>
            {TABS.map((t, i) => (
              <PressableScale key={t} onPress={() => setTab(i)} style={styles.tab}>
                <Text style={[styles.tabText, tab === i && styles.tabActive]}>{t}</Text>
                {tab === i && <View style={styles.tabIndicator} />}
              </PressableScale>
            ))}
          </View>

          {tab === 0 && (
            <Animated.View entering={FadeInDown.duration(300)} style={styles.section}>
              <Text style={styles.desc}>{course.description}</Text>
              <View style={{ marginTop: 16 }}>
                {[
                  { icon: 'school', text: '由资深名医亲授，理论结合实践' },
                  { icon: 'time', text: '每节课 15-25 分钟，碎片时间随学随用' },
                  { icon: 'download', text: '可下载离线观看，永久回看' },
                  { icon: 'people', text: '学员社群，每周直播答疑' },
                ].map((b) => (
                  <View key={b.icon} style={styles.benefit}>
                    <Ionicons name={b.icon as any} size={18} color={colors.primary} />
                    <Text style={styles.benefitText}>{b.text}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          {tab === 1 && (
            <Animated.View entering={FadeInDown.duration(300)} style={styles.section}>
              {course.chapters.map((ch, idx) => {
                const isOpen = openChapters.has(ch.id);
                return (
                  <Animated.View key={ch.id} layout={Layout.springify()}>
                    <PressableScale
                      onPress={() =>
                        setOpenChapters((s) => {
                          const next = new Set(s);
                          if (next.has(ch.id)) next.delete(ch.id);
                          else next.add(ch.id);
                          return next;
                        })
                      }
                      style={styles.chapterRow}
                    >
                      <Text style={styles.chapterIdx}>{String(idx + 1).padStart(2, '0')}</Text>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.chapterTitle}>{ch.title}</Text>
                          {ch.free && (
                            <View style={styles.freeBadge}>
                              <Text style={styles.freeText}>免费</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.chapterDuration}>{ch.duration}</Text>
                      </View>
                      <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.textTertiary}
                      />
                    </PressableScale>
                    {isOpen && (
                      <Animated.View entering={FadeInDown.duration(200)} style={styles.chapterDetail}>
                        <Text style={styles.chapterDetailText}>
                          本章节将系统讲解核心知识点，配套案例分析与实操演示。
                        </Text>
                        <PressableScale style={styles.playBtn}>
                          <Ionicons name="play" size={14} color={colors.white} />
                          <Text style={styles.playBtnText}>立即观看</Text>
                        </PressableScale>
                      </Animated.View>
                    )}
                  </Animated.View>
                );
              })}
            </Animated.View>
          )}

          {tab === 2 && (
            <Animated.View entering={FadeInDown.duration(300)} style={styles.section}>
              {[
                { name: '陈**', stars: 5, text: '内容专业，讲解清晰，适合新手入门也有进阶内容', date: '2 天前' },
                { name: '王**', stars: 5, text: '名师出高徒，受益匪浅，已经推荐给家人', date: '5 天前' },
                { name: '李**', stars: 4, text: '案例丰富，建议增加问答环节', date: '1 周前' },
              ].map((r, i) => (
                <View key={i} style={styles.review}>
                  <View style={styles.reviewHead}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewAvatarText}>{r.name[0]}</Text>
                    </View>
                    <Text style={styles.reviewName}>{r.name}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Ionicons
                          key={k}
                          name="star"
                          size={12}
                          color={k < r.stars ? colors.warning : '#E5E7EC'}
                        />
                      ))}
                    </View>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                  <Text style={styles.reviewText}>{r.text}</Text>
                </View>
              ))}
            </Animated.View>
          )}
        </View>
      </Animated.ScrollView>

      <Animated.View style={[styles.navBg, navBgStyle]} pointerEvents="none" />
      <SafeAreaView edges={['top']} style={styles.navBar} pointerEvents="box-none">
        <PressableScale style={styles.navBtn} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </PressableScale>
        <View style={{ flex: 1 }} />
        <PressableScale style={styles.navBtn}>
          <Ionicons name="share-social-outline" size={20} color={colors.white} />
        </PressableScale>
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <View style={styles.footRow}>
          <PressableScale style={styles.footIcon}>
            <Ionicons name="heart-outline" size={22} color={colors.text} />
            <Text style={styles.footIconText}>收藏</Text>
          </PressableScale>
          <PressableScale style={styles.footIcon}>
            <Ionicons name="chatbubble-outline" size={22} color={colors.text} />
            <Text style={styles.footIconText}>咨询</Text>
          </PressableScale>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <PrimaryButton title="立即学习" onPress={() => {}} size="lg" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  posterCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandBadge: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 14,
  },
  brand: { fontSize: 12, color: '#8A4400', fontWeight: weight.bold },
  posterTitle: { fontSize: 32, fontWeight: weight.black, color: colors.white, textAlign: 'center' },
  posterSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.92)', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  navBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: colors.white,
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  body: { paddingHorizontal: 12 },
  titleCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: weight.black, color: colors.text },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  metaItem: { flex: 1, alignItems: 'center' },
  metaValue: { fontSize: 16, fontWeight: weight.bold, color: colors.text },
  metaLabel: { fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  metaDivider: { width: 1, height: 24, backgroundColor: colors.divider },
  doctorCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorName: { fontSize: 15, fontWeight: weight.bold, color: colors.text },
  doctorTitle: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  followText: { color: colors.primary, fontSize: 13, fontWeight: weight.semibold },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  tabText: { fontSize: 14, color: colors.textSecondary },
  tabActive: { color: colors.primary, fontWeight: weight.bold },
  tabIndicator: {
    marginTop: 6,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  section: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 16,
  },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  benefit: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  benefitText: { fontSize: 13, color: colors.text, marginLeft: 10 },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  chapterIdx: { fontSize: 18, fontWeight: weight.bold, color: colors.primary, width: 32 },
  chapterTitle: { fontSize: 14, color: colors.text, fontWeight: weight.semibold },
  freeBadge: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 6,
  },
  freeText: { color: colors.primary, fontSize: 10, fontWeight: weight.bold },
  chapterDuration: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  chapterDetail: {
    backgroundColor: colors.bg,
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 44,
  },
  chapterDetailText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  playBtnText: { color: colors.white, fontSize: 12, fontWeight: weight.bold, marginLeft: 4 },
  review: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  reviewHead: { flexDirection: 'row', alignItems: 'center' },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { color: colors.white, fontWeight: weight.bold },
  reviewName: { fontSize: 13, color: colors.text, fontWeight: weight.semibold, marginLeft: 8 },
  reviewDate: { marginLeft: 'auto', fontSize: 11, color: colors.textTertiary },
  reviewText: { fontSize: 13, color: colors.textSecondary, marginTop: 8, lineHeight: 18 },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  footRow: { flexDirection: 'row', alignItems: 'center' },
  footIcon: { alignItems: 'center', marginRight: 12 },
  footIconText: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
});
