import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Line, Path, Polygon, Text as SvgText } from 'react-native-svg';

import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import {
  constitutionRadar,
  constitutionResult,
  heartRate24h,
  stepsByDay,
  todayMetrics,
} from '../mock/healthMetrics';
import PressableScale from '../components/PressableScale';
import type { RootStackParamList } from '../navigation/RootStack';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const { width: W } = Dimensions.get('window');

export default function HealthDataScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const stepsProgress = todayMetrics.steps.value / todayMetrics.steps.goal;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.peachStart, '#FFF6EE', colors.bg]}
        locations={[0, 0.3, 0.7]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <PressableScale style={{ padding: 8 }} onPress={() => nav.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </PressableScale>
          <Text style={styles.headerTitle}>我的健康</Text>
          <PressableScale style={{ padding: 8 }}>
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </PressableScale>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Animated.View entering={FadeInDown.duration(400)} style={styles.heroCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StepRing progress={stepsProgress} value={todayMetrics.steps.value} goal={todayMetrics.steps.goal} />
              <View style={{ marginLeft: 20, flex: 1 }}>
                <Text style={styles.heroLabel}>今日步数</Text>
                <Text style={styles.heroValue}>{todayMetrics.steps.value.toLocaleString()}</Text>
                <Text style={styles.heroSub}>目标 {todayMetrics.steps.goal.toLocaleString()} 步</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <Tag icon="trending-up" text="好棒" />
                  <Tag icon="flame" text={`${todayMetrics.calories.value} 千卡`} />
                </View>
              </View>
            </View>
          </Animated.View>

          <View style={styles.metricRow}>
            <MetricCard
              icon="heart"
              iconColor={colors.like}
              label="心率"
              value={`${todayMetrics.heartRate.value}`}
              unit="bpm"
              sub={`正常范围 ${todayMetrics.heartRate.range}`}
            />
            <MetricCard
              icon="moon"
              iconColor={colors.water}
              label="昨夜睡眠"
              value={`${todayMetrics.sleep.value}`}
              unit="h"
              sub={`目标 ${todayMetrics.sleep.goal}h`}
            />
          </View>

          <View style={styles.metricRow}>
            <MetricCard
              icon="water"
              iconColor={colors.info}
              label="饮水"
              value={`${todayMetrics.water.value}`}
              unit="ml"
              sub={`目标 ${todayMetrics.water.goal}ml`}
            />
            <MetricCard
              icon="scale"
              iconColor={colors.earth}
              label="体重"
              value={`${todayMetrics.weight.value}`}
              unit="kg"
              sub={`本周 ${todayMetrics.weight.change}kg`}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>本周步数</Text>
              <Text style={styles.sectionMeta}>共 53,829 步</Text>
            </View>
            <StepsBar />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(400)} style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>24 小时心率</Text>
              <Text style={styles.sectionMeta}>平均 76 bpm</Text>
            </View>
            <HeartRateChart />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.section}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>中医体质雷达</Text>
              <Text style={[styles.sectionMeta, { color: colors.primary }]}>
                主体质：{constitutionResult.primary}
              </Text>
            </View>
            <ConstitutionRadar />
            <Text style={styles.constitutionDesc}>{constitutionResult.description}</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(340).duration(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>调养建议</Text>
            {constitutionResult.suggestions.map((s) => (
              <View key={s.title} style={styles.tipRow}>
                <View style={styles.tipIcon}>
                  <Ionicons name={s.icon as any} size={18} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tipTitle}>{s.title}</Text>
                  <Text style={styles.tipText}>{s.text}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Tag({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.heroTag}>
      <Ionicons name={icon} size={11} color={colors.primary} />
      <Text style={styles.heroTagText}>{text}</Text>
    </View>
  );
}

function StepRing({ progress, value, goal }: { progress: number; value: number; goal: number }) {
  const r = 50;
  const cx = 60;
  const cy = 60;
  const stroke = 10;
  const C = 2 * Math.PI * r;
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(Math.min(progress, 1), { duration: 1300, easing: Easing.out(Easing.cubic) });
  }, [progress]);

  const animProps = useAnimatedProps(() => ({
    strokeDashoffset: C * (1 - p.value),
  }));

  return (
    <View>
      <Svg width={120} height={120}>
        <Circle cx={cx} cy={cy} r={r} stroke="#FFE0CC" strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={r}
          stroke={colors.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${C} ${C}`}
          animatedProps={animProps}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        <SvgText
          x={cx}
          y={cy + 6}
          fontSize="20"
          fontWeight="900"
          fill={colors.primary}
          textAnchor="middle"
        >
          {Math.round(progress * 100)}%
        </SvgText>
      </Svg>
    </View>
  );
}

function MetricCard({
  icon,
  iconColor,
  label,
  value,
  unit,
  sub,
}: {
  icon: any;
  iconColor: string;
  label: string;
  value: string;
  unit: string;
  sub: string;
}) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricHead}>
        <Ionicons name={icon} size={18} color={iconColor} />
        <Text style={styles.metricLabel}>{label}</Text>
      </View>
      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricUnit}>{unit}</Text>
      </View>
      <Text style={styles.metricSub}>{sub}</Text>
    </View>
  );
}

function StepsBar() {
  const max = Math.max(...stepsByDay.map((d) => d.steps));
  return (
    <View style={styles.barChart}>
      {stepsByDay.map((d, i) => (
        <Bar key={d.day} day={d.day} steps={d.steps} max={max} delay={i * 90} highlight={d.steps === max} />
      ))}
    </View>
  );
}

function Bar({
  day,
  steps,
  max,
  delay,
  highlight,
}: {
  day: string;
  steps: number;
  max: number;
  delay: number;
  highlight: boolean;
}) {
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = withDelay(
      delay,
      withTiming((steps / max) * 120, { duration: 700, easing: Easing.out(Easing.cubic) }),
    );
  }, [steps, max, delay]);
  const aStyle = useAnimatedStyleH(h);
  return (
    <View style={styles.barCol}>
      <Text style={styles.barNum}>{(steps / 1000).toFixed(1)}k</Text>
      <View style={{ height: 120, justifyContent: 'flex-end' }}>
        <Animated.View
          style={[styles.bar, aStyle, highlight && { backgroundColor: colors.primary }]}
        />
      </View>
      <Text style={styles.barLabel}>{day}</Text>
    </View>
  );
}

function useAnimatedStyleH(h: any) {
  const { useAnimatedStyle } = require('react-native-reanimated');
  return useAnimatedStyle(() => ({ height: h.value }));
}

function HeartRateChart() {
  const w = W - 64;
  const h = 120;
  const max = Math.max(...heartRate24h);
  const min = Math.min(...heartRate24h);
  const stepX = w / (heartRate24h.length - 1);
  const points = heartRate24h
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const drawn = useSharedValue(0);
  useEffect(() => {
    drawn.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.cubic) });
  }, []);

  const animProps = useAnimatedProps(() => {
    const PATH_LEN = 1200;
    return {
      strokeDasharray: `${PATH_LEN} ${PATH_LEN}`,
      strokeDashoffset: PATH_LEN * (1 - drawn.value),
    };
  });

  return (
    <Svg width={w} height={h + 20}>
      <G>
        {[0.25, 0.5, 0.75].map((p) => (
          <Line
            key={p}
            x1={0}
            y1={h * p}
            x2={w}
            y2={h * p}
            stroke="#F0F0F0"
            strokeWidth={1}
          />
        ))}
        <AnimatedPath
          d={points}
          stroke={colors.like}
          strokeWidth={2.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          animatedProps={animProps}
        />
      </G>
    </Svg>
  );
}

function ConstitutionRadar() {
  const size = W - 64;
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 24;
  const N = constitutionRadar.length;

  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
  }, []);

  const animProps = useAnimatedProps(() => {
    const points = constitutionRadar
      .map((d, i) => {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const r = (R * d.value * t.value) / 100;
        return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
      })
      .join(' ');
    return { points };
  });

  return (
    <Svg width={size} height={size}>
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <Polygon
          key={scale}
          points={Array.from({ length: N })
            .map((_, i) => {
              const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
              const r = R * scale;
              return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
            })
            .join(' ')}
          stroke="#E5E7EC"
          strokeWidth={1}
          fill="none"
        />
      ))}
      {constitutionRadar.map((d, i) => {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * R;
        const y = cy + Math.sin(angle) * R;
        return (
          <Line key={`l${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke="#E5E7EC" strokeWidth={1} />
        );
      })}
      <AnimatedPolygon
        animatedProps={animProps}
        fill={colors.primary}
        fillOpacity={0.25}
        stroke={colors.primary}
        strokeWidth={2}
      />
      {constitutionRadar.map((d, i) => {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const lr = R + 14;
        const x = cx + Math.cos(angle) * lr;
        const y = cy + Math.sin(angle) * lr;
        return (
          <SvgText
            key={`t${i}`}
            x={x}
            y={y}
            fontSize={11}
            fill={colors.text}
            textAnchor="middle"
          >
            {d.name} {d.value}
          </SvgText>
        );
      })}
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: weight.bold, color: colors.text },
  heroCard: {
    backgroundColor: colors.white,
    margin: 12,
    padding: 16,
    borderRadius: 16,
  },
  heroLabel: { fontSize: 13, color: colors.textSecondary },
  heroValue: { fontSize: 30, fontWeight: weight.black, color: colors.text, marginVertical: 2 },
  heroSub: { fontSize: 12, color: colors.textTertiary },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tagBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 6,
  },
  heroTagText: { fontSize: 11, color: colors.primary, fontWeight: weight.semibold, marginLeft: 4 },
  metricRow: { flexDirection: 'row', paddingHorizontal: 12 },
  metric: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  metricHead: { flexDirection: 'row', alignItems: 'center' },
  metricLabel: { fontSize: 13, color: colors.textSecondary, marginLeft: 6 },
  metricValueRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 4 },
  metricValue: { fontSize: 24, fontWeight: weight.black, color: colors.text },
  metricUnit: { fontSize: 12, color: colors.textTertiary, marginLeft: 2, marginBottom: 4 },
  metricSub: { fontSize: 11, color: colors.textTertiary, marginTop: 4 },
  section: {
    backgroundColor: colors.white,
    margin: 12,
    padding: 14,
    borderRadius: 14,
  },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: weight.bold, color: colors.text },
  sectionMeta: { fontSize: 12, color: colors.textSecondary },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  barCol: { alignItems: 'center', flex: 1 },
  barNum: { fontSize: 10, color: colors.textTertiary, marginBottom: 4 },
  bar: { width: 16, backgroundColor: colors.primaryLight, borderRadius: 4 },
  barLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 6 },
  constitutionDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginTop: 8 },
  tipRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.tagBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tipTitle: { fontSize: 14, fontWeight: weight.semibold, color: colors.text },
  tipText: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
