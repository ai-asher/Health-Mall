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
import { doctors, departments } from '../mock/doctors';
import PressableScale from '../components/PressableScale';
import PrimaryButton from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/RootStack';

export default function DoctorListScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [dept, setDept] = useState(0);

  const filtered = useMemo(() => {
    const d = departments[dept];
    if (d === '全部') return doctors;
    return doctors.filter((doc) => doc.department === d);
  }, [dept]);

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
          <Text style={styles.headerTitle}>找医生</Text>
          <PressableScale style={{ padding: 8 }}>
            <Ionicons name="search" size={22} color={colors.text} />
          </PressableScale>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
        >
          {departments.map((d, i) => (
            <PressableScale
              key={d}
              onPress={() => setDept(i)}
              style={[styles.deptChip, dept === i && styles.deptChipActive]}
            >
              <Text style={[styles.deptText, dept === i && styles.deptTextActive]}>{d}</Text>
            </PressableScale>
          ))}
        </ScrollView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 12, paddingBottom: 32 }}
        >
          {filtered.map((d, i) => (
            <Animated.View key={d.id} entering={FadeInDown.delay(i * 60).duration(360)}>
              <View style={styles.card}>
                <LinearGradient
                  colors={d.avatarColor}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatar}
                >
                  <Ionicons name="person" size={32} color={colors.white} />
                </LinearGradient>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{d.name}</Text>
                    <Text style={styles.title}>{d.title}</Text>
                    {d.online && (
                      <View style={styles.onlineDot}>
                        <View style={styles.onlineInner} />
                        <Text style={styles.onlineText}>在线</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.dept}>{d.department} · {d.hospital}</Text>
                  <Text style={styles.expertise} numberOfLines={1}>
                    擅长：{d.expertise.join('、')}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={12} color={colors.warning} />
                      <Text style={styles.metaText}>{d.rating}</Text>
                    </View>
                    <Text style={styles.metaText}>· 接诊 {d.consultations.toLocaleString()}</Text>
                    <Text style={[styles.metaText, { marginLeft: 'auto', color: colors.primary, fontWeight: weight.bold }]}>
                      ¥{d.fee}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardFoot}>
                <PressableScale style={styles.outlineBtn}>
                  <Text style={styles.outlineText}>图文咨询</Text>
                </PressableScale>
                <View style={{ width: 8 }} />
                <View style={{ flex: 1 }}>
                  <PrimaryButton title="立即问诊" size="sm" onPress={() => {}} />
                </View>
              </View>
            </Animated.View>
          ))}
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
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: weight.bold, color: colors.text },
  deptChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  deptChipActive: { backgroundColor: colors.primary },
  deptText: { fontSize: 13, color: colors.text },
  deptTextActive: { color: colors.white, fontWeight: weight.bold },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  name: { fontSize: 17, fontWeight: weight.bold, color: colors.text },
  title: { fontSize: 13, color: colors.textSecondary, marginLeft: 8 },
  onlineDot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  onlineInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 4,
  },
  onlineText: { fontSize: 10, color: colors.success, fontWeight: weight.bold },
  dept: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  expertise: { fontSize: 12, color: colors.textTertiary, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 4 },
  metaText: { fontSize: 12, color: colors.textSecondary, marginLeft: 2 },
  cardFoot: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
  },
  outlineBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: { color: colors.primary, fontWeight: weight.semibold, fontSize: 13 },
});
