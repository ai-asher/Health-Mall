import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import PressableScale from './PressableScale';
import { colors } from '../theme/colors';
import { fontSize, weight } from '../theme/typography';
import type { Course } from '../mock/courses';

type Props = {
  course: Course;
  onPress?: () => void;
};

export default function CourseCard({ course, onPress }: Props) {
  return (
    <PressableScale onPress={onPress} style={styles.card}>
      <LinearGradient
        colors={course.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cover}
      >
        <View style={styles.brandBadge}>
          <Text style={styles.brand}>御君方</Text>
        </View>
        <Text style={styles.coverTitle}>{course.title}</Text>
        <Text style={styles.coverSubtitle} numberOfLines={2}>
          {course.subtitle}
        </Text>
        {course.tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{course.tag}</Text>
          </View>
        )}
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={16} color={colors.white} />
          <Text style={styles.playText}>观看</Text>
        </View>
      </LinearGradient>
      <Text style={styles.title} numberOfLines={1}>
        {course.title}
      </Text>
      <Text style={styles.desc} numberOfLines={1}>
        {course.subtitle}
      </Text>
      <View style={styles.foot}>
        <Text style={styles.publisher} numberOfLines={1}>
          {course.doctorTitle}
        </Text>
        <View style={styles.likeRow}>
          <Ionicons name="heart-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.likeNum}>{course.students.toLocaleString()}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
  },
  cover: {
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
    overflow: 'hidden',
  },
  brandBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  brand: { fontSize: 10, color: '#8A4400', fontWeight: weight.bold },
  coverTitle: { color: colors.white, fontWeight: weight.black, fontSize: fontSize.md },
  coverSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 14,
  },
  tag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: { color: colors.white, fontSize: 10, fontWeight: weight.bold },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  playText: { color: colors.white, fontSize: 11, fontWeight: weight.medium, marginLeft: 2 },
  title: { fontSize: fontSize.base, fontWeight: weight.bold, color: colors.text, marginTop: 2 },
  desc: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  publisher: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  likeRow: { flexDirection: 'row', alignItems: 'center' },
  likeNum: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },
});
